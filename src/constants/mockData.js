// src/constants/mockData.js
export const MARKET_INDICES = [
  { id: 'nifty', name: 'NIFTY 50', price: '23,641.30', change: '+200.50', percent: '+0.86%', isUp: true },
  { id: 'banknifty', name: 'BANKNIFTY', price: '50,812.45', change: '-120.30', percent: '-0.24%', isUp: false },
  { id: 'btc', name: 'BTC / USD', price: '$70,750.00', change: '+42.50', percent: '+0.06%', isUp: true },
  { id: 'gold', name: 'GOLD COMEX', price: '$3,031.90', change: '-27.70', percent: '-0.91%', isUp: false },
];

export const AI_FEATURED_SETUPS = [
  {
    id: 'tatamotors',
    symbol: 'TATAMOTORS',
    exchange: 'NSE',
    companyName: 'Tata Motors Ltd',
    currentPrice: '₹984.50',
    dayPercent: '+2.97%',
    verdict: 'BULLISH BREAKOUT',
    signalStrength: 94,
    entryZone: '₹978 - ₹985',
    target1: '₹1,020.00',
    target2: '₹1,065.00',
    stopLoss: '₹958.00',
    invalidation: 'Daily close below ₹955',
    riskReward: '1 : 3.8',
    aiThesis: 'Cup and handle continuation breakout backed by heavy institutional accumulation.',
  },
  {
    id: 'reliance',
    symbol: 'RELIANCE',
    exchange: 'NSE',
    companyName: 'Reliance Industries Ltd',
    currentPrice: '₹1,287.60',
    dayPercent: '-1.03%',
    verdict: 'ACCUMULATION ZONE',
    signalStrength: 88,
    entryZone: '₹1,275 - ₹1,290',
    target1: '₹1,340.00',
    target2: '₹1,385.00',
    stopLoss: '₹1,254.00',
    invalidation: 'Sustained close below ₹1,250 cluster',
    riskReward: '1 : 3.2',
    aiThesis: 'Smart money absorption near 200 EMA demand zone. Derivative long addition.',
  }
];

export const MACRO_NEWS = [
  {
    id: '1',
    headline: 'Federal Reserve holds interest rate steady; hints at disinflation trends',
    tag: 'Macro / Global',
    impact: 'Bullish for Emerging Markets',
    time: '1h ago',
  },
  {
    id: '2',
    headline: 'Crude Oil dips below $74/bbl boosting Indian manufacturing margins',
    tag: 'Commodities',
    impact: 'Positive for Paints & Autos',
    time: '3h ago',
  }
];