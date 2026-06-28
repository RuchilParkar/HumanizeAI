# HumanizeAI

> **Bypass the machine. Write like a human.**

HumanizeAI is a modern, open-source AI writing assistant that transforms rigid, AI-generated text into natural, fluent, and engaging content. Built with a resilient multi-provider AI architecture, HumanizeAI automatically switches between multiple language models to deliver fast, reliable rewriting with minimal interruption.

Whether you're refining AI-generated drafts, improving readability, or adjusting tone, HumanizeAI provides a seamless writing experience through a clean, responsive interface powered by Next.js 15.

---

## ✨ Features

* 🤖 **Multi-Provider AI Architecture**

  * Groq (Primary)
  * Google Gemini (Fallback)
  * OpenRouter (Final Fallback)

* ✍️ Human-like text rewriting while preserving original meaning

* 🎯 Multiple writing tones

  * Natural
  * Professional
  * Casual
  * Academic
  * Friendly
  * Creative
  * Technical
  * Confident

* ⚙️ Rewrite controls

  * Rewrite Intensity
  * Grammar Correction
  * Readability Improvements
  * Preserve Formatting
  * Preserve Keywords

* 📊 Live text statistics

  * Character Count
  * Word Count
  * Reading Time
  * Sentence Count

* 🔄 Automatic AI provider fallback

* 🚦 Built-in rate limiting using Upstash Redis

* 📱 Fully responsive modern interface

* 🌙 Dark mode optimized

---

# 🛠 Tech Stack

| Category      | Technology                        |
| ------------- | --------------------------------- |
| Framework     | Next.js 15 (App Router)           |
| Language      | TypeScript                        |
| Styling       | Tailwind CSS v4                   |
| Animation     | Framer Motion                     |
| UI Components | Shadcn UI                         |
| Icons         | Lucide React                      |
| AI Providers  | Groq • Google Gemini • OpenRouter |
| Validation    | Zod                               |
| Rate Limiting | Upstash Redis                     |

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/RuchilParkar/HumanizeAI.git
cd HumanizeAI
```

## Install dependencies

```bash
npm install
```

## Create a `.env.local` file

```env
GROQ_API_KEY=

GEMINI_API_KEY=

OPENROUTER_API_KEY=

UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=
```

---

# 📂 Project Structure

```text
app/
components/
hooks/
lib/
 ├── ai/
 │    ├── provider.ts
 │    ├── groq.ts
 │    ├── gemini.ts
 │    ├── openrouter.ts
 │    └── prompt.ts
public/
styles/
```

---

# 🎨 Highlights

* Modern AI-powered writing experience
* Automatic provider failover
* Production-ready architecture
* Clean and modular codebase
* Responsive design across all devices
* Optimized performance with Next.js 15

---

# 🤝 Contributing

Contributions, issues, and feature requests are always welcome.

If you'd like to improve HumanizeAI, feel free to fork the repository, create a feature branch, and submit a pull request.

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub. It helps others discover the project and motivates future improvements.

---

<p align="center">
Made with ❤️ by <strong>Ruchil Parkar</strong>
</p>
