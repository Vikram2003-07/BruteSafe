# 🔐 BruteSafe

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)]()

> A comprehensive, all-in-one password security toolkit to generate secure passwords, analyze their strength, and detect potential data breaches — everything handled securely within your browser.

## 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Security & Privacy](#security--privacy)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## ✨ Features

### 🔑 Password Generator

- Generate cryptographically strong, random passwords
- Customizable options: length, uppercase, lowercase, numbers, symbols
- One-click copy to clipboard
- Real-time password preview

### 🛡️ Password Strength Analyzer

- Advanced strength assessment using [zxcvbn](https://github.com/dropbox/zxcvbn) algorithm
- Entropy calculation for true randomness measurement
- Visual strength meter with detailed feedback
- Pattern detection (common words, dates, keyboard patterns)

### 🔍 Data Breach Checker

- Check if emails/usernames have been compromised in known data breaches
- Integration with breach databases
- Detailed breach history information

### 🎨 Modern UI/UX

- Beautiful, accessible interface built with [shadcn/ui](https://ui.shadcn.com/)
- Dark/Light theme support
- Fully responsive design
- Smooth animations with [tw-animate-css](https://github.com/nickcis/tw-animate-css)

## 🛠 Tech Stack

| Category              | Technology                                                                |
| --------------------- | ------------------------------------------------------------------------- |
| **Framework**         | [Next.js 16](https://nextjs.org/)                                         |
| **Language**          | [TypeScript 5.7](https://www.typescriptlang.org/)                         |
| **UI Library**        | [React 19](https://react.dev/)                                            |
| **Styling**           | [Tailwind CSS 4](https://tailwindcss.com/)                                |
| **Components**        | [shadcn/ui](https://ui.shadcn.com/)                                       |
| **Password Strength** | [@zxcvbn-ts](https://zxcvbn.js.org/)                                      |
| **State Management**  | [Zustand](https://zustand-demo.pmnd.rs/)                                  |
| **Forms**             | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons**             | [Lucide React](https://lucide.dev/)                                       |
| **Animations**        | [tw-animate-css](https://github.com/nickcis/tw-animate-css)               |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9.x or later (or yarn/pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/BruteSafe.git
   cd BruteSafe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
BruteSafe/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── tools/             # Tools section
│       └── page.tsx       # Password tools page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── breach-display.tsx
│   ├── footer.tsx
│   ├── navbar.tsx
│   ├── password-card.tsx
│   ├── strength-meter.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/                   # Utility functions
│   ├── constants/         # Constants & wordlists
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   └── utils/
│       ├── breach-db.ts   # Breach database utilities
│       ├── entropy.ts     # Entropy calculations
│       └── password-gen.ts # Password generation
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🔐 Security & Privacy

### Local Processing

All password calculations, strength assessments, and entropy calculations are performed **entirely in your browser**. No sensitive data is ever transmitted to external servers.

### What We Don't Do

- ❌ We never store your passwords
- ❌ We never send passwords over the network
- ❌ We don't use cookies for sensitive data

### What We Do

- ✅ Client-side password generation using secure random number generators
- ✅ Local entropy calculation
- ✅ Browser-based strength analysis
- ✅ Optional breach checking (only email/username, never passwords)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

Please make sure to update tests as appropriate.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [zxcvbn](https://github.com/dropbox/zxcvbn) - Password strength estimation
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible UI components
- [Have I Been Pwned](https://haveibeenpwned.com/) - Breach database concepts
- [OWASP](https://owasp.org/) - Password security guidelines
- [All Contributors](https://github.com/your-username/BruteSafe/graphs/contributors)

---

<div align="center">

Made with ❤️ for a Privacy-Conscious Users.

</div>
