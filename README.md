# ✦ Mansehaj Preet Singh — Personal Portfolio & Technical Archive

> **Computer Engineering undergraduate at Thapar Institute of Engineering & Technology (TIET), Patiala (Class of 2027)**  
> *Autonomous Systems • Computer Vision • Predictive Machine Learning • Full-Stack Web Applications*

[![GitHub](https://img.shields.io/badge/GitHub-Mansehaj12-111110?style=flat-square&logo=github)](https://github.com/Mansehaj12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mansehajpreet-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mansehajpreet)
[![Kaggle](https://img.shields.io/badge/Kaggle-Global%20Expert-20BEFF?style=flat-square&logo=kaggle)](https://www.kaggle.com/sehaj1104)
[![License: MIT](https://img.shields.io/badge/License-MIT-F97316?style=flat-square)](LICENSE)

---

## 📖 Overview

This repository houses the personal portfolio website of **Mansehaj Preet Singh**. Designed with a warm cream editorial aesthetic inspired by modern award-winning personal sites, the portfolio delivers an ultra-smooth browsing experience powered by **Lenis physics momentum scrolling**, categorized project showcases, an interactive skills matrix, and a verified credentials vault.

### 🌟 Key Highlights & Accolades
* **Kaggle Global Expert**: Ranked in the top tier globally across Datasets & Notebooks for open data engineering and algorithmic modeling benchmarks.
* **NVIDIA Certified**: Deep learning competence verified by the NVIDIA Deep Learning Institute (DLI) for neural network architectures, transfer learning, and CUDA GPU acceleration.
* **Featured Capstone**: *Scenario-Based ODD Safety Framework for Automation in Indian Road Environments* (PyTorch SegNet + YOLOv8 + CARLA + Leaflet.js).
* **Commercial Client Deployments**: Production PWAs and e-commerce platforms engineered for live regional businesses (*Divine Cafe*, *The Home Delight Bakery*, *FlawlessTips by MK*).

---

## 🎨 Visual Design & Interaction Architecture

| Design Element | Specification |
| :--- | :--- |
| **Color Palette** | Warm Cream Canvas (`#F2EFE9`), Deep Ink Charcoal (`#111110`), Subtle Borders (`rgba(17,17,16,0.12)`), Energetic Orange Accent (`#F97316`) |
| **Typography** | **Space Grotesk** (Headlines & UI), **Instrument Serif Italic** (Editorial Warmth & Emphasis), **JetBrains Mono** (Code & Telemetry) |
| **Smooth Scrolling** | **Lenis** inertia-weighted smooth momentum scrolling with exponential ease-out curve (`Math.min(1, 1.001 - 2^(-10t))`) |
| **Modal Isolation** | Scroll hijacking prevention via `data-lenis-prevent="true"`, wheel stop propagation, and automated Lenis bounds resizing |
| **Background Grid** | Fixed SVG radial dot canvas overlay matching minimalist Swiss editorial layouts |

---

## 📁 Sections & System Features

### 1. Hero & Photographic Showcase (`Hero.jsx`)
* **Editorial Typography**: Hero title combining bold Swiss grotesk with cursive serif-italic accents (`singh`).
* **Multi-Frame Photo Card**: Interactive photo frame switcher showcasing portrait moments with smooth dot controls.
* **Live Time Indicator**: Real-time IST (Patiala, Punjab) timezone telemetry tracker.
* **Infinite Marquee Ticker**: Continuous high-contrast marquee ribbon highlighting core stack keywords (`PyTorch`, `YOLOv8`, `SegNet`, `React.js`, `Flask`, `PostgreSQL`, etc.).

### 2. Categorized Projects Showcase (`Projects.jsx` & `ProjectModal.jsx`)
Organized into 3 dedicated domain sections with interactive filter pills:

```
├── 01 // AI, Computer Vision & Autonomous Systems (4 Projects)
│   ├── Scenario-Based ODD Safety Framework (Capstone: SegNet + YOLOv8 + CARLA)
│   ├── CareerLens: AI Job Intelligence & Predictive Placement Analytics (Ridge + NLP)
│   ├── GameIQ: Player Churn Prediction & Analytics Pipeline (Random Forest, 90k logs)
│   └── MediSmart: AI-Assisted E-Pharmacy & Generic Swap Portal (Tesseract.js OCR)
│
├── 02 // Production & Commercial Client Products (3 Projects)
│   ├── Divine Cafe: Installable PWA & 1-Tap WhatsApp Ordering (52 Dishes, Offline Cache)
│   ├── The Home Delight Bakery: Festive Hamper Catalogue & QR Generator
│   └── FlawlessTips by MK: Luxury Nail Studio SaaS & Booking Portal (Next.js 16 + Prisma)
│
└── 03 // Data Telemetry & Systems Utilities (3 Projects)
    ├── PowerMRO: High-Frequency Industrial Telemetry & RUL Estimator (<15ms latency)
    ├── Robust Weather & Environmental Dashboard (Async REST API & LocalStorage Caching)
    └── Real-Time Financial Converter Engine (150+ Currencies Live Exchange Rates)
```
* **Deep-Dive System Architecture Modal**: Step-by-step 5-layer execution pipelines, key performance metrics, and verified GitHub/live demo links.

### 3. Background & Academic Journey (`About.jsx`)
* **Direct & Honest Narrative**: Clean, grounded biography free of generic buzzwords.
* **Origin & Present Contrast**: Side-by-side photo studio contrast comparing childhood roots (`Origin • 2004`) with present engineering pursuits (`Present • 2026`).
* **Education Timeline**: Academic history spanning Thapar Institute (COE), Senior Secondary (PSEB), and Secondary (CBSE).

### 4. Interactive Skills Matrix (`Skills.jsx`)
* **Horizontal Matrix Layout**: Minimalist list inspired by modern design portfolios, split into 5 core competencies:
  1. `01` **Languages**: Python, C / C++, JavaScript (ES6+), TypeScript, SQL, R, HTML5, CSS3
  2. `02` **Frontend & UI**: React.js, Next.js 16, Tailwind CSS, Framer Motion, PWA, Leaflet.js, GeoJSON, Recharts
  3. `03` **Backend & Data**: Flask, Node.js, Express, FastAPI, PostgreSQL, MySQL, SQLite, Prisma ORM, Firebase Auth, REST APIs
  4. `04` **AI & ML**: PyTorch, TensorFlow, scikit-learn, YOLOv8, SegNet, OpenCV, CARLA Simulator, Transfer Learning, Neural Networks, CUDA Acceleration
  5. `05` **Data & Analytics**: pandas, NumPy, Matplotlib, Seaborn, Git & GitHub, GitHub Actions, PyTest, Postman, Jupyter, Kaggle CLI
* **Dynamic Hover Animation**: Hovering any category smoothly transforms the row into an inky black capsule card (`bg-[#111110]`), morphing the category number into a solid bright orange disc with inverted badges.
* **Curriculum Modal**: Complete 7-semester Computer Engineering curriculum scheme from Thapar Institute (Sem 1 to Sem 7) accessible via an interactive popup drawer.

### 5. Verified Credentials Vault (`Achievements.jsx`)
* **Flagship Highlights on Page**: Spotlight card for Kaggle Global Expert status + 4 top certifications (NVIDIA Deep Learning Institute, IBM Generative AI, Deloitte Data Analytics, IBM Python Analytics).
* **Full 18-Certificate Interactive Vault**: Popup modal cataloging all 18 authentic credentials across Deep Learning, Data Science, and Cloud Big Data, featuring real-time category filtering, search, and embedded in-browser PDF preview.

### 6. AI Recruiter Assistant (`AIChatbot.jsx`)
* **Google Gemini AI Integration**: Multi-model failover engine (`gemini-flash-latest` ➔ `gemini-2.5-flash` ➔ `gemini-3.5-flash` ➔ `gemma-4-31b-it`).
* **Comprehensive System Prompt**: Knowledgeable about Mansehaj's projects, coursework, metrics, and Kaggle standings.
* **Standalone Serverless Endpoint**: Vercel-ready serverless function in `api/chatbot.js` for zero-configuration cloud deployment.

### 7. Global Command Palette (`CommandPalette.jsx`)
* Accessible globally via `Ctrl + K` (or `Cmd + K` on macOS).
* Provides rapid keyboard navigation across sections, instant resume downloading, and direct links.

---

## 🛠️ Technology Stack

```
Frontend:
├── React.js 19 (Component Hierarchy)
├── Vite 8 (Ultra-Fast Bundler & HMR)
├── Tailwind CSS 3 (Utility-First Styling)
├── Framer Motion 12 (Fluid Layout Animations)
├── Lenis (Physics Smooth Momentum Scroll)
└── Lucide React (Minimalist Iconography)

Backend & Serverless:
├── Node.js & Express (Local Dev Server)
├── Vercel Serverless Functions (/api/chatbot.js)
├── Google Gemini API (Multi-Model Quota Failover)
├── Nodemailer (Automated Email Dispatch)
└── Mongoose / Local JSON (Resilient Data Storage)
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Mansehaj12/Personal_Portfolio.git
cd Personal_Portfolio
```

### 2. Install Dependencies
```bash
# Install root, backend, and frontend packages in one command
npm run install-all
```

### 3. Environment Variables
Create a `.env` file inside the `backend` directory (optional for local chatbot AI features):
```env
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RECEIVER_EMAIL=your_email@gmail.com

# Google Gemini API Key (Free from https://aistudio.google.com)
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server
```bash
npm run dev
```
* **Frontend Web App**: `http://localhost:5173/`
* **Backend API**: `http://localhost:5000/`

### 5. Build for Production
```bash
npm run build --prefix frontend
```

---

## 📬 Contact & Connect

* **Developer**: Mansehaj Preet Singh
* **Email**: [sehajpreetsingh480@gmail.com](mailto:sehajpreetsingh480@gmail.com)
* **Location**: Patiala, Punjab, India
* **GitHub**: [@Mansehaj12](https://github.com/Mansehaj12)
* **LinkedIn**: [linkedin.com/in/mansehajpreet](https://linkedin.com/in/mansehajpreet)
* **Kaggle**: [kaggle.com/sehaj1104](https://www.kaggle.com/sehaj1104)

---

&copy; 2026 Mansehaj Preet Singh. Released under the [MIT License](LICENSE).
