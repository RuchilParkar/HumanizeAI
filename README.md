# HumanizeAI

**Bypass the machine. Write like a human.**

HumanizeAI is a premium, open-source tool built to transform rigid, AI-generated text into fluent, engaging, and highly readable human-like content. With a striking Neo-Brutalist design and robust multi-provider AI infrastructure, it guarantees reliable and rapid text generation.

---

## ⚡ Features

- **Multi-Model AI Infrastructure**: Unified abstraction layer across **Groq (Primary)**, **Gemini (Fallback)**, and **OpenRouter (Final Fallback)** to ensure zero downtime.
- **Neo-Brutalist Design**: Stark, industrial, and high-contrast UI replacing the generic "glowing AI tool" look.
- **Intelligent Controls**: Finely tune the *Tone*, *Intensity*, and automatically *Fix Grammar*.
- **Rate Limiting**: Securely rate-limited via **Upstash Redis** (10 requests/hour by default) to prevent abuse.
- **Production-Ready Next.js 15**: Built on the cutting-edge Next.js App Router and Turbopack for maximum performance.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Framer Motion (Neo-Brutalism Theme)
- **UI Components:** Shadcn UI + Lucide React
- **AI Providers:** Groq, Google Gemini, OpenRouter
- **Database / Rate Limiting:** Upstash Redis
- **Validation:** Zod

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RuchilParkar/HumanizeAI.git
cd HumanizeAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key

# Upstash Redis for Rate Limiting
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔒 Security & Privacy

Your API keys are securely managed server-side. HumanizeAI uses strictly server-side Next.js Route Handlers, ensuring that sensitive credentials are never exposed to the client bundle or browser.
