# Google Apps Script Contact Form Backend

A **100% free (₹0/mo), serverless, maintenance-free contact form backend** powered by Google Apps Script and Gmail. It enables secure, validated email notifications sent directly to your personal or work inbox without hosting servers, backend microservices, or paid third-party email providers (like SendGrid, Resend, or Formspree).

---

## Architecture & How It Works

```
┌─────────────────────────────────┐
│ Visitor Browser (Portfolio UI)  │
└────────────────┬────────────────┘
                 │ 1. Generates unguessable correlationToken
                 │ 2. Validates inputs & checks honeypot
                 │ 3. Submits native HTML Form to hidden <iframe>
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Google Apps Script Web App (doPost endpoint)            │
│ 1. Acquires LockService to prevent concurrency races     │
│ 2. Validates inputs & length server-side                │
│ 3. Verifies honeypot field is empty (blocks spam bots)  │
│ 4. Rate-limits sender using CacheService                │
│ 5. Dispatches formatted HTML email via MailApp.sendEmail │
│ 6. Returns iframe HTML containing postMessage()         │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ 4. postMessage({ type, correlationToken, success, message })
                 ▼
┌─────────────────────────────────┐
│ Visitor Browser Parent Window   │
│ - Verifies correlationToken     │
│ - Displays verified success UI  │
│ - Graceful timeout fallback     │
└─────────────────────────────────┘
```

### Why Hidden iframe + postMessage instead of raw `fetch()`?
Google Apps Script Web Apps automatically issue a **302 Redirect** to `googleusercontent.com` upon receiving a `POST` request. In standard browser `fetch(..., { mode: 'cors' })`, this cross-origin redirect fails due to missing CORS headers on Google's redirect response. 

If you use `mode: 'no-cors'`, the request succeeds on the network, but JavaScript receives an **opaque response** (status `0`), meaning your frontend cannot verify whether the script actually succeeded, hit a quota, or crashed.

Our design solves this cleanly and reliably:
1. The form targets a hidden sandbox `<iframe>`.
2. Apps Script responds with HTML that runs `window.parent.postMessage(...)` containing an **unguessable correlation token** created by your frontend for that specific submission.
3. The parent window verifies the correlation token before marking the submission as verified.
4. If an ad-blocker or iframe restriction blocks the postMessage, the frontend detects the timeout after 10 seconds and transitions to an honest neutral "Dispatched" status with a one-click direct fallback link.

---

## Step-by-Step Deployment Guide

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com/home](https://script.google.com/home).
2. Sign in with the Google account where you want to receive contact notifications.
3. Click **+ New project** (top-left).
4. Rename the project from "Untitled project" to **Portfolio Contact Service**.

### Step 2: Copy the Script Code
1. Delete any default code in `Code.gs`.
2. Open [`google-apps-script/Code.gs`](./Code.gs) from this repository.
3. Copy the entire file content and paste it into the Apps Script editor.
4. Press `Cmd + S` (macOS) or `Ctrl + S` (Windows/Linux) to save.

### Step 3: Configure Your Recipient Email
There are two easy ways to set your email:

#### Method A: Using the built-in setup function (Recommended)
1. In `Code.gs`, locate `DEFAULT_CONFIG.RECIPIENT_EMAIL` (around line 19) and replace `'gautamtaneja.dev@gmail.com'` with your actual email address.
2. In the Apps Script toolbar dropdown (next to "Debug"), select the function **`setupScriptProperties`**.
3. Click **Run**.
4. A prompt will appear: "Authorization required". Click **Review permissions**.
5. Select your Google account.
6. If Google shows *"Google hasn't verified this app"*, click **Advanced** (bottom left), then click **Go to Portfolio Contact Service (unsafe)**.
7. Click **Allow** to grant Gmail sending permission.
8. Look at the Execution Log at the bottom; you should see:
   `Configured RECIPIENT_EMAIL as: your_email@example.com`.

#### Method B: Project Settings UI
1. Click the **Gear icon (Project Settings)** on the left sidebar.
2. Scroll down to **Script Properties**.
3. Click **Add script property**:
   - Property: `RECIPIENT_EMAIL`
   - Value: `your_email@example.com`
4. Click **Save script properties**.

### Step 4: Verify with a Test Email (Optional but Recommended)
1. Switch the function dropdown back in the editor to **`testSendMail`**.
2. Click **Run**.
3. Open your Gmail inbox; you should receive a test message with the subject `[Test] Portfolio Mailer Diagnostics`.

### Step 5: Deploy as a Public Web App
1. At the top-right of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Configure the deployment settings:
   - **Description**: `Portfolio Contact Form Production v1`
   - **Execute as**: **Me (your_email@example.com)** *(Crucial: This ensures emails send using your Gmail quota)*
   - **Who has access**: **Anyone** *(Crucial: Allows visitors without Google sign-in to submit the form)*
4. Click **Deploy**.
5. Copy the **Web App URL**. It will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
   > ⚠️ **IMPORTANT**: Ensure the URL ends in `/exec`, NOT `/dev`. The `/dev` endpoint requires Google sign-in and will fail in production.

### Step 6: Connect to Your Portfolio
1. In your local repository root, create or update `.env`:
   ```bash
   VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx.../exec"
   ```
2. For GitHub Pages automated deployments, add this URL as a GitHub Repository Secret or Variable:
   - Go to your repository on GitHub: **Settings** > **Secrets and variables** > **Actions**
   - Click **New repository variable**
   - Name: `VITE_APPS_SCRIPT_URL`
   - Value: `https://script.google.com/macros/s/AKfycbx.../exec`
   - Click **Add variable**.

---

## Free Quotas & Limitations

Google Apps Script is generous and runs on Google Cloud infrastructure:

| Feature | Personal Gmail Account | Google Workspace Account |
| :--- | :--- | :--- |
| **Email Recipients / Day** | **100 / day** | **1,500 / day** |
| **Script Invocations / Day**| Unlimited (within fair-use execution limits) | Unlimited |
| **Execution Time / Call**  | 6 minutes | 6 minutes |
| **Monthly Cost**           | **₹0 / $0** | Included in Workspace |

For a personal developer portfolio receiving inquiry messages from recruiters and collaborators, 100 emails/day is more than sufficient.

---

## Security & Anti-Spam Architecture

1. **Honeypot Trap**: An invisible form field (`website_hp`) hidden from human visitors and screen-readers. Automated spam bots fill every input field they encounter; any submission with this field filled is dropped immediately without using email quota.
2. **Server-Side Validation**: All lengths (Name 2-100, Subject 3-200, Message 10-5000 chars) and email formats are re-validated inside `Code.gs`.
3. **Abuse Rate Throttling**: Apps Script `CacheService` tracks submissions by sender key, capping submissions at 5 per 10 minutes to protect against flood attacks.
4. **HTML Sanitization**: User input is escaped before rendering into the notification HTML to prevent email client styling attacks or script injection.
5. **Safe Reply-To**: The email is sent with your address as the sender (authenticated via Google) and the visitor's email in the `replyTo` header. Clicking "Reply" in your email client replies directly to the visitor.
6. **No Secret Tokens in Frontend**: The Apps Script URL is public by design; no passwords, API keys, or email credentials exist anywhere in the frontend code.

---

## Updating the Script

If you ever modify `Code.gs`:
1. Click **Deploy** > **Manage deployments**.
2. Click the **Pencil icon (Edit)** next to your active deployment.
3. In the **Version** dropdown, select **New version**.
4. Click **Deploy**. (The `/exec` URL remains unchanged).
