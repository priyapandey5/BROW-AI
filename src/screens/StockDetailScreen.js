import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = Math.min(width - 48, 480);
const CHART_HEIGHT = 160;

export default function StockDetailScreen({ route, navigation }) {
  const incomingStock = route?.params?.stock;

  const stock = {
    symbol: incomingStock?.symbol || 'RELIANCE',
    companyName: incomingStock?.companyName || 'Reliance Industries Ltd',
    currentPrice: incomingStock?.currentPrice || '₹1,287.60',
    dayPercent: incomingStock?.dayPercent || '-1.03%',
    verdict: incomingStock?.verdict || 'ACCUMULATION ZONE',
    signalStrength: incomingStock?.signalStrength || 88,
    entryZone: incomingStock?.entryZone || '₹1,275 - ₹1,290',
    target1: incomingStock?.target1 || '₹1,340.00',
    target2: incomingStock?.target2 || '₹1,385.00',
    stopLoss: incomingStock?.stopLoss || '₹1,254.00',
    riskReward: incomingStock?.riskReward || '1 : 3.2',
    aiThesis: incomingStock?.aiThesis || 'Smart money absorption near 200 EMA demand zone.',
  };

  const isBullish = !stock.dayPercent.startsWith('-');
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [orderQty, setOrderQty] = useState('10');
  const [alertActive, setAlertActive] = useState(false);

  const timeframes = ['15M', '1H', '4H', '1D', '1W'];

  // Smooth Line Chart Curves (Coordinates normalized to SVG viewbox)
  const lineCurves = {
    '15M': 'M 10 110 Q 70 140 140 90 T 260 70 T 360 40 T 440 30',
    '1H':  'M 10 130 Q 80 150 160 110 T 280 80 T 370 60 T 440 25',
    '4H':  'M 10 100 Q 90 60 170 120 T 270 95 T 380 50 T 440 35',
    '1D':  'M 10 120 Q 80 140 160 90 T 270 110 T 370 50 T 440 20',
    '1W':  'M 10 140 Q 90 120 180 80 T 280 70 T 380 40 T 440 15',
  };

  // Secondary comparative benchmark line (jaise Brow AI web par Nifty vs Stock trend line hai)
  const benchmarkCurve = 'M 10 135 Q 90 110 170 125 T 280 105 T 370 90 T 440 80';

  const activePath = lineCurves[activeTimeframe] || lineCurves['1D'];

  const executePaperOrder = (type) => {
    const qty = parseInt(orderQty, 10) || 1;
    Alert.alert(
      'Order Submitted',
      `Paper ${type.toUpperCase()}: ${qty} shares of ${stock.symbol} @ ${stock.currentPrice} executed.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#F8FAFC" />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerSymbol}>{stock.symbol}</Text>
            <Text style={styles.headerCompany}>{stock.companyName}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setAlertActive(!alertActive)}>
            <Ionicons 
              name={alertActive ? 'notifications' : 'notifications-outline'} 
              size={20} 
              color={alertActive ? '#00F2FE' : '#94A3B8'} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Price Header */}
          <View style={styles.priceContainer}>
            <Text style={styles.mainPrice}>{stock.currentPrice}</Text>
            <View style={[styles.badgePercent, isBullish ? styles.badgeGreen : styles.badgeRed]}>
              <Text style={isBullish ? styles.changeGreen : styles.changeRed}>
                {stock.dayPercent}
              </Text>
            </View>
          </View>

          {/* Timeframe Chips */}
          <View style={styles.tfContainer}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[styles.tfChip, activeTimeframe === tf && styles.tfChipActive]}
                onPress={() => setActiveTimeframe(tf)}
              >
                <Text style={[styles.tfText, activeTimeframe === tf && styles.tfTextActive]}>
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Intraday Market Trends Line Chart (Brow AI Style) */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>INTRADAY MARKET TRENDS</Text>
                <Text style={styles.chartSubtitle}>Normalized % performance from session open</Text>
              </View>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>

            {/* SVG Wave Line Canvas */}
            <View style={styles.svgWrapper}>
              <Svg width="100%" height={CHART_HEIGHT} viewBox="0 0 460 160">
                <Defs>
                  <LinearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#00F2FE" stopOpacity="0.35" />
                    <Stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>

                {/* Grid guidelines */}
                <Line x1="10" y1="40" x2="450" y2="40" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
                <Line x1="10" y1="80" x2="450" y2="80" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
                <Line x1="10" y1="120" x2="450" y2="120" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />

                {/* Comparative Benchmark Line (Grey/Blue) */}
                <Path
                  d={benchmarkCurve}
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />

                {/* Primary Asset Glowing Curve */}
                <Path
                  d={activePath}
                  fill="none"
                  stroke={isBullish ? "#00F2FE" : "#EF4444"}
                  strokeWidth="2.5"
                />
              </Svg>
            </View>

            {/* Trend Legend Strip */}
            <View style={styles.chartLegendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendIndicator, { backgroundColor: isBullish ? '#00F2FE' : '#EF4444' }]} />
                <Text style={styles.legendLabel}>{stock.symbol} ({stock.dayPercent})</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendIndicator, { backgroundColor: '#64748B' }]} />
                <Text style={styles.legendLabel}>NIFTY 50 (+0.86%)</Text>
              </View>
            </View>
          </View>

          {/* Thesis & Setup Parameters */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Institutional Thesis & Risk Setup</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Strategy Verdict</Text>
              <Text style={styles.levelValCyan}>{stock.verdict}</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>AI Signal Strength</Text>
              <Text style={styles.levelVal}>{stock.signalStrength}% Conviction</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Recommended Entry Zone</Text>
              <Text style={styles.levelVal}>{stock.entryZone}</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Target 1 (Primary)</Text>
              <Text style={styles.levelValGreen}>{stock.target1}</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Target 2 (Extended)</Text>
              <Text style={styles.levelValGreen}>{stock.target2}</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Stop-Loss (Invalidation)</Text>
              <Text style={styles.levelValRed}>{stock.stopLoss}</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Risk-to-Reward Ratio</Text>
              <Text style={styles.levelValCyan}>{stock.riskReward}</Text>
            </View>

            <View style={styles.thesisBox}>
              <Text style={styles.thesisLabel}>AI Alpha Thesis:</Text>
              <Text style={styles.thesisText}>{stock.aiThesis}</Text>
            </View>
          </View>

          {/* Paper Trading Simulator */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Paper Trading Simulator</Text>
            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Quantity (Lots/Shares):</Text>
              <TextInput
                style={styles.qtyInput}
                keyboardType="numeric"
                value={orderQty}
                onChangeText={setOrderQty}
              />
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.buyBtn} onPress={() => executePaperOrder('BUY')}>
                <Text style={styles.btnText}>BUY / LONG</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sellBtn} onPress={() => executePaperOrder('SELL')}>
                <Text style={styles.btnText}>SELL / SHORT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#090D14' },
  container: { flex: 1, backgroundColor: '#090D14' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  iconBtn: {
    padding: 8,
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  headerTitles: { alignItems: 'center' },
  headerSymbol: { fontSize: 16, fontWeight: '800', color: '#F8FAFC' },
  headerCompany: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 12,
  },
  mainPrice: { fontSize: 26, fontWeight: '800', color: '#F8FAFC' },
  badgePercent: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeGreen: { backgroundColor: '#10B98120' },
  badgeRed: { backgroundColor: '#EF444420' },
  changeGreen: { fontSize: 13, fontWeight: '700', color: '#10B981' },
  changeRed: { fontSize: 13, fontWeight: '700', color: '#EF4444' },
  tfContainer: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tfChip: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  tfChipActive: { backgroundColor: '#00F2FE15', borderColor: '#00F2FE' },
  tfText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  tfTextActive: { color: '#00F2FE' },
  chartCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chartTitle: { color: '#F8FAFC', fontSize: 12, fontWeight: '800', letterSpacing: 0.6 },
  chartSubtitle: { color: '#64748B', fontSize: 10, marginTop: 2 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98115',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  liveText: { color: '#10B981', fontSize: 10, fontWeight: '800' },
  svgWrapper: {
    marginVertical: 6,
    alignItems: 'center',
  },
  chartLegendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendIndicator: { width: 12, height: 3, borderRadius: 2 },
  legendLabel: { color: '#94A3B8', fontSize: 11, fontWeight: '600' },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 16,
  },
  cardHeading: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B30',
  },
  levelLabel: { color: '#94A3B8', fontSize: 12 },
  levelVal: { color: '#F8FAFC', fontSize: 12, fontWeight: '600' },
  levelValCyan: { color: '#00F2FE', fontSize: 12, fontWeight: '700' },
  levelValRed: { color: '#EF4444', fontSize: 12, fontWeight: '700' },
  levelValGreen: { color: '#10B981', fontSize: 12, fontWeight: '700' },
  thesisBox: {
    backgroundColor: '#090D14',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  thesisLabel: { color: '#00F2FE', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  thesisText: { color: '#94A3B8', fontSize: 11, lineHeight: 16 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 12 },
  qtyLabel: { color: '#94A3B8', fontSize: 13 },
  qtyInput: {
    backgroundColor: '#090D14',
    borderWidth: 1,
    borderColor: '#1E293B',
    color: '#F8FAFC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 80,
    fontSize: 13,
    fontWeight: '700',
  },
  btnRow: { flexDirection: 'row', gap: 10 },
  buyBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sellBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
});