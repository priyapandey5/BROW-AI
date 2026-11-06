# BROW AI Mobile — Financial Market Intelligence Engine 📱📈

A mobile-first market intelligence and quantitative analysis app built with **React Native & Expo (SDK 58)**, inspired by **BROW AI**. The application condenses complex institutional derivatives, factor models, and real-time equity flows into an intuitive mobile interface with disciplined execution parameters.

---

## 🚀 Key Highlights & Mobile Innovations

- **Obsidian Dark Theme**: Modern institutional fintech UI with neon-cyan accents and clear contrast tags.
- **Instant Preview (Guest Bypass)**: Quick access mode on the authentication screen for instant evaluator testing without signup hurdles.
- **Visual Risk-to-Reward Gauges**: Clear visual tracks comparing Stop Loss vs. Target zones directly on stock cards.
- **Interactive Paper Trading**: Single-tap virtual order simulation (`+10 Qty`) with automated portfolio balance tracking.
- **Task & Level Alerts**: Real-time scheduled alerts on trade invalidation points.

---

## 📱 Feature Breakdown (12 Web Modules Consolidated)

The 12 desktop-based modules are consolidated into a clean, mobile-optimized 4-tab workflow:

### 1. Markets Deck (Workspace & Macro)
- Real-time market indices ticker (`NIFTY 50`, `BANKNIFTY`, `BTC/USD`, `GOLD`).
- High-conviction AI breakout cards with entry zones, target levels, and invalidation criteria.
- **Watchlist Filter**: Filter by saved stocks with instant bookmark toggling.
- **Macro & News Intelligence**: Live market digest paired with an expandable **Economic Calendar** (RBI MPC, US CPI, Non-Farm Payrolls).

### 2. Liquidity Radar (Markets & Screeners)
- Live cross-market institutional flow detection.
- Real-time signals tracking Volume Surges, VWAP Clusters, and Options Open Interest (OI) buildup.
- Dynamic search and filter pills (`Breakouts`, `Accumulation`, `F&O Flow`).

### 3. AI Copilot (Conversational Intelligence)
- Interactive AI chat assistant for trade thesis audits and multi-timeframe structure checks.
- Pre-configured prompt chips for rapid analysis.
- **Session History**: Modal drawer to access older chat sessions and reviews.

### 4. Alpha Hub & Holdings (Quantitative Factor Engine)
- **Paper Portfolio**: Track virtual equity positions, quantity, average price, and live P&L.
- **Factor Ranking**: Quantitative factor model visualizer (weights across Momentum, Quality, and Value).
- **MF Analyser**: Curated breakdown of top institutional mutual funds with category alpha and major holdings.

### 5. Stock Deep-Dive Screen
- Interactive multi-timeframe trend chart (`1D`, `1W`, `1M`, `3M`, `1Y`).
- Structured parameters table: Entry Zone, Disciplined Stop Loss, Target 1 & 2.
- Scheduled alert trigger to monitor invalidation rules.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React Native / Expo (SDK 58)
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **Charts**: React Native Chart Kit & SVG
- **Icons**: Expo Vector Icons (Ionicons)
- **State & Data**: Component-driven state architecture with realistic mock data

---

## 📂 Project Architecture 

brow-ai-mobile/
├── assets/                  # App icons and splash assets
├── src/
│   ├── constants/
│   │   ├── theme.js         # Design system tokens (colors, typography)
│   │   └── mockData.js      # Structured trade setups & macro indicators
│   ├── navigation/
│   │   └── BottomTabNavigator.js  # 4-Tab bottom navigation
│   └── screens/
│       ├── AuthScreen.js            # Authentication & Guest preview
│       ├── HomeScreen.js            # Markets deck & Economic calendar
│       ├── StockDetailScreen.js     # Trend charts, thesis & trade execution
│       ├── RadarScreen.js           # Liquidity scanner & flow anomalies
│       ├── CopilotChatScreen.js     # AI Copilot with chat history
│       └── AlphaPortfolioScreen.js  # Paper Book, Factor model & MF Analyser
├── App.js                   # Navigation root and entry point
├── app.json                 # Expo configuration
├── eas.json                 # Build configuration for standalone APK
└── package.json

---

## 💻 Running the App Locally

### Prerequisites
- Node.js (>= 22.13.0 recommended)
- Expo CLI

### Steps
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/priyapandey5/BROW-AI.git](https://github.com/priyapandey5/BROW-AI.git)
   cd BROW-AI

   Install dependencies:

Bash
1. npm install
Start the development server:

2. Bash
npx expo start -c

3. Testing Options:
Real Device: Scan the QR code using the Expo Go app on Android or iOS.

Web / Simulator: Press w in the terminal to open the web view, then use Developer Tools (F12) to toggle device mode.

📦 Standalone APK Build
This app is configured for Expo Application Services (EAS) cloud builds.

Bash
# Install EAS CLI
npm install -g eas-cli

# Configure build
eas build:configure

# Generate direct APK
eas build -p android --profile preview

