# Gautam Taneja — Senior Software Engineer Portfolio

A modern, production-ready developer portfolio and architecture showcase built for a **Senior Software Engineer & Full-Stack Developer with ~5 years of experience**.

The website is engineered for speed, clean typography, responsive accessibility, SEO optimization, and deploys to **GitHub Pages with ₹0 / $0 recurring infrastructure costs**.

It includes a fully functioning serverless contact form powered by **Google Apps Script + Gmail**, with zero reliance on paid email services or always-on node servers.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React + TypeScript** | Strongly typed component architecture with strict null checks |
| **Build Tool** | **Vite** | Ultra-fast ESM compilation with portable base-path resolution |
| **Styling** | **Tailwind CSS** | Custom dark/light design system with zero runtime CSS overhead |
| **Animations** | **Framer Motion** | Microanimations respecting `prefers-reduced-motion` |
| **Icons** | **Lucide React + SVGs** | Clean, accessible developer icons and badges |
| **Testing** | **Vitest** | Unit test suite for validation and sanitization |
| **Contact Backend** | **Google Apps Script** | Serverless Web App with rate throttling & Gmail routing |
| **CI/CD Automation** | **GitHub Actions** | Automated type checking, testing, and deployment |
| **Hosting** | **GitHub Pages** | Static hosting with custom 404 handler and SSL |

---

## 🚀 Key Features & Highlights

1. **Clean Developer Aesthetic**:
   - Deep charcoal background (`#0b0f17`), subtle gradients, and restrained slate/sky accents.
   - Fully functional **Dark / Light mode toggle** with localStorage persistence.
   - Architecture case studies (including an EF Core + Dapper CQRS read optimization reducing API latency by 62%).
   - No generic Bootstrap layouts; no distracting neon canvas spam.

2. **Serverless Contact Form (Google Apps Script + Gmail)**:
   - Hidden sandbox `<iframe>` targeting with **cross-origin `postMessage` correlation token verification**.
   - Honeypot bot protection (`website_hp`) silently dropping automated scrapers.
   - Server-side length enforcement and regex validation.
   - Anti-flood rate throttling via Apps Script `CacheService` and `LockService`.
   - Honest fallback states: If browser privacy extensions block cross-origin postMessage, transitions to a neutral "Dispatched" state with a 1-click direct email fallback.

3. **SEO & Accessibility**:
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Open Graph & Twitter Cards for social sharing.
   - JSON-LD Structured Data (`Person` schema).
   - Validated `robots.txt`, `sitemap.xml`, and standalone `404.html`.
   - Accessible focus indicators (`focus-visible:ring-2`) and aria labels.

4. **Dual GitHub Pages Compatibility**:
   - Works seamlessly as a **User Site** (`https://username.github.io/`) or a **Project Site** (`https://username.github.io/portfolio/`).
   - Uses portable relative asset paths by default, customizable via `VITE_BASE_PATH`.

---

## 📁 Repository Structure

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── google-apps-script/
│   ├── Code.gs                   # Serverless form processor & email dispatcher
│   └── README.md                 # Step-by-step Apps Script setup guide
├── public/
│   ├── 404.html                  # Custom GitHub Pages 404 handler
│   ├── favicon.svg               # Sleek monogram developer icon
│   ├── resume.pdf                # Downloadable resume document
│   ├── robots.txt                # Search engine crawler instructions
│   └── sitemap.xml               # Canonical site map
├── src/
│   ├── components/
│   │   ├── About.tsx             # Biography & architectural overview
│   │   ├── Contact.tsx           # Contact form with Google Apps Script iframe
│   │   ├── Education.tsx         # Academic background & degree
│   │   ├── Experience.tsx        # Career timeline & achievements
│   │   ├── Footer.tsx            # Copyright, tech disclosure & back-to-top
│   │   ├── Hero.tsx              # Animated headline, experience chips & CTA
│   │   ├── Highlights.tsx        # Measurable engineering metrics (1.2s -> 450ms)
│   │   ├── Icons.tsx             # Pixel-perfect SVG brand icons (GitHub, LinkedIn)
│   │   ├── Navbar.tsx            # Sticky navigation with scrollspy & theme toggle
│   │   ├── Projects.tsx          # Case study cards with engineering challenges
│   │   ├── ScrollToTop.tsx       # Floating scroll-to-top action button
│   │   ├── Skills.tsx            # Categorized core competencies
│   │   └── ThemeToggle.tsx       # Accessible light/dark theme switch
│   ├── config/
│   │   └── portfolio.ts          # Centralized portfolio data & metadata
│   ├── hooks/
│   │   ├── useScrollSpy.ts       # Section visibility tracker
│   │   └── useTheme.ts           # Theme state & localStorage persistence
│   ├── lib/
│   │   ├── utils.ts              # Tailwind class merge utility
│   │   └── validation.ts         # Pure form validation & sanitization
│   ├── styles/
│   │   └── globals.css           # Tailwind v4 import & custom scrollbars
│   ├── App.tsx                   # Main layout container
│   ├── main.tsx                  # React DOM root entrypoint
│   └── vite-env.d.ts             # Vite environment typings
├── test/
│   └── validation.test.ts        # Vitest suite for form validation & honeypot
├── .env.example                  # Environment variable reference
├── index.html                    # HTML5 template with SEO & JSON-LD
├── package.json                  # NPM dependencies & scripts
├── tsconfig.json                 # TypeScript strict compiler config
└── vite.config.ts                # Vite bundler & base path configuration
```

---

## 💻 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

### 2. Configure Local Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` to set your preferences:
```ini
# Leave empty during initial testing to see the setup banner, or add your deployed Apps Script URL
VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx.../exec"
VITE_CONTACT_EMAIL="gautamtaneja.dev@gmail.com"
VITE_GITHUB_URL="https://github.com/your-username"
VITE_LINKEDIN_URL="https://linkedin.com/in/your-profile"
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Tests
```bash
npm run test
```

### 5. Type-Check & Production Build
```bash
npm run build
```

---

## 📬 Google Apps Script Backend Setup (Free ₹0 Email Routing)

The contact form uses a free Google Apps Script Web App to forward inquiries to your Gmail inbox.

### Step 1: Create the Apps Script Project
1. Navigate to [https://script.google.com/home](https://script.google.com/home).
2. Click **+ New project**.
3. Name it **Portfolio Contact Service**.
4. Paste the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) into the editor.

### Step 2: Set Recipient Email
1. In `Code.gs`, change `DEFAULT_CONFIG.RECIPIENT_EMAIL` to your target email.
2. Select the function **`setupScriptProperties`** in the top toolbar dropdown.
3. Click **Run** and approve the Gmail permissions prompt.

### Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Select type: **Web app**.
3. **Execute as**: **Me (`your_email@gmail.com`)**.
4. **Who has access**: **Anyone**.
5. Click **Deploy** and copy the resulting Web App URL ending in `/exec`.
6. Add this URL to your local `.env` and your GitHub repository variables as `VITE_APPS_SCRIPT_URL`.

For detailed security boundaries, honeypot explanations, and quota limits (100 emails/day for free Gmail, 1,500/day for Workspace), see [`google-apps-script/README.md`](./google-apps-script/README.md).

---

## 🌐 Deploying to GitHub Pages

### 1. Configure GitHub Repository Settings
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete modern portfolio application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to:
   **Settings** > **Pages**
3. Under **Build and deployment** > **Source**, select:
   **GitHub Actions** (Do NOT choose "Deploy from a branch").

### 2. Configure Repository Variables
Go to **Settings** > **Secrets and variables** > **Actions** > **Variables**:
- `VITE_APPS_SCRIPT_URL`: Your deployed Apps Script `/exec` URL.
- `VITE_BASE_PATH`:
  - If deploying to `https://USERNAME.github.io/`, set to `/`
  - If deploying to `https://USERNAME.github.io/portfolio/`, set to `/portfolio/`
  - If left blank, defaults to portable relative path `./`.
- `VITE_CONTACT_EMAIL`: Your public contact email.
- `VITE_GITHUB_URL`: Your GitHub profile URL.
- `VITE_LINKEDIN_URL`: Your LinkedIn profile URL.

> ⚠️ **Security Notice**: All `VITE_*` environment variables are bundled into client-side JavaScript. **Never put private API keys, passwords, or database credentials in `VITE_*` variables.**

### 3. Automated Deployment
Every push to the `main` branch automatically triggers the workflow defined in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):
1. Installs dependencies via `npm ci`
2. Runs TypeScript type checking (`tsc --noEmit`)
3. Runs unit tests (`vitest run`)
4. Builds optimized assets (`vite build`)
5. Deploys directly to GitHub Pages via official GitHub Actions.

---

## ✏️ Customization Guide

All portfolio content is decoupled from layout components and centralized in:

[`src/config/portfolio.ts`](./src/config/portfolio.ts)

- **Bio & Identity**: Edit `portfolioConfig.personal`
- **Career Timeline**: Edit `portfolioConfig.experiences`
- **Skill Badges**: Edit `portfolioConfig.skills`
- **Case Studies**: Edit `portfolioConfig.projects`
- **Metrics**: Edit `portfolioConfig.highlights`
- **Education**: Edit `portfolioConfig.education`
- **Resume File**: Place your updated PDF at `public/resume.pdf`

---

## 📄 License

MIT License — Feel free to use and adapt this portfolio codebase.
