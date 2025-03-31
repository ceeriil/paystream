# 🚀 Paystream

Programmable payroll app to automate payments and track payments using **Streamflow**.

## 🎥 Demo

![Watch the demo](https://paystreamfi.vercel.app/img/demo.mov)

## ✨ Features (MVP)

- ✅ Automate payments via **Streamflow**
- ✅ Track and manage payments
- ✅ Add and manage employees
- ✅ Use on TestNet or DevNet (support for USDC only for now)
- ✅ Secure and transparent transaction history
- ✅ View Contract details and some stats
- ✅ Smart accounts - log in with socials and fund wallet

## 🔮 Future Enhancements

- 🚀 Multi-chain support for payments
- 🚀 Multi-token (this is already set up)
- 🚀 Advanced analytics and reporting

---

## ⚡ Tech Stack

- **Frontend:** [`Next.js`](https://nextjs.org/) & [`TypeScript`](https://typescriptlang.org/)
- **Styling:** [`Styled Components`](https://styled-components.com/)
- **Linting & Formatting:** [`ESLint`](https://eslint.org/), [`Prettier`](https://prettier.io/)
- **Version Control & Hooks:** [`Husky`](https://github.com/typicode/husky)
- **Blockchain Integration:** [Streamflow](https://streamflow.finance/) [Reown](https://reown.com/)

---

## 🛠️ Getting Started

### 🏰 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/ceeriil/paystream.git
cd paystream
yarn install
```

### 🚀 Running the Project

```sh
yarn dev     # Start development server
yarn build   # Build for production
yarn start   # Run the production build
```

### 🔧 Environment Variables Setup

Before running the project, you need to set up your environment variables.

1. Copy `.env.example` to `.env` or `.env.local`:

   ```sh
   cp .env.example .env
   ```

2. Populate the environment variables with the necessary credentials:

   - **Reown Project ID**: To get a `NEXT_PUBLIC_PROJECT_ID`, go to [Reown](https://reown.com), create a project, and obtain the project ID.
   - **Helius RPC**: Obtain your Helius RPC URL by creating an account on [Helius](https://helius.dev) and generating an RPC endpoint. Alternatively, you can use another Solana RPC provider.
   - **Firebase Config**: Get your Firebase environment variables by creating a project on [Firebase](https://firebase.google.com). If you are working in a test or development environment, you can use the Firebase emulator instead.

### 📝 Environment Variables File (`.env`)

```
NEXT_PUBLIC_PROJECT_ID="reown project id"
NEXT_PUBLIC_HELIUS_MAINNET_RPC=""
NEXT_PUBLIC_HELIUS_DEVNET_RPC=""
NEXT_PUBLIC_ETH_ALCHEMY_SEPOLIA_RPC=""
NEXT_PUBLIC_ETH_ALCHEMY_MAINNET_RPC=""

NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
GOOGLE_APPLICATION_CREDENTIALS=""
FIREBASE_SERVICE_ACCOUNT_KEY=""
```

If you encounter any issues, feel free to contact me for support.
