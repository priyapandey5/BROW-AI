// src/screens/StockDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function StockDetailScreen({ route, navigation, stock, onBack }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [simulated, setSimulated] = useState(false);
  const [alertActive, setAlertActive] = useState(false);

  const data = route?.params?.stock || stock || {
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
    invalidation: 'Daily close below ₹955 cluster',
    riskReward: '1 : 3.8',
    aiThesis: 'Cup and handle continuation breakout backed by heavy institutional accumulation.',
  };

  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    } else if (onBack) {
      onBack();
    }
  };

  const handleSimulate = () => {
    setSimulated(true);
    Alert.alert(
      'Virtual Order Executed',
      `Bought 10 qty of ${data.symbol} at ${data.currentPrice} in Paper Book.`,
      [{ text: 'OK' }]
    );
  };

  const handleScheduleTaskAlert = () => {
    setAlertActive(!alertActive);
    Alert.alert(
      alertActive ? 'Alert Removed' : 'Scheduled Alert Active',
      alertActive
        ? `Task alert cancelled for ${data.symbol}.`
        : `Scheduled Task: You will be notified instantly if ${data.symbol} approaches invalidation: ${data.invalidation}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Row with Back and Scheduled Alert Bell */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBtn} onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>{data.symbol}</Text>
            <Text style={styles.headerSub}>{data.companyName} • {data.exchange}</Text>
          </View>
          <TouchableOpacity
            style={[styles.headerBtn, alertActive && styles.headerBtnAlertActive]}
            onPress={handleScheduleTaskAlert}
          >
            <Ionicons
              name={alertActive ? 'notifications' : 'notifications-outline'}
              size={18}
              color={alertActive ? COLORS.primaryLight : COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Live Price & Day PnL */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{data.currentPrice}</Text>
          <View style={styles.percentPill}>
            <Ionicons name="caret-up" size={14} color={COLORS.bullish} />
            <Text style={styles.percentText}>{data.dayPercent}</Text>
          </View>
        </View>

        {/* Timeframe Chips */}
        <View style={styles.timeframeRow}>
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <TouchableOpacity
              key={tf}
              style={[styles.tfPill, selectedTimeframe === tf && styles.activeTfPill]}
              onPress={() => setSelectedTimeframe(tf)}
            >
              <Text style={[styles.tfText, selectedTimeframe === tf && styles.activeTfText]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive Line Chart */}
        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels: ['9:15', '11:00', '12:30', '1:45', '3:30'],
              datasets: [
                {
                  data: [960, 968, 964, 978, 984.5],
                  strokeWidth: 2,
                  color: () => COLORS.bullish,
                },
              ],
            }}
            width={screenWidth - 32}
            height={180}
            withDots={true}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundGradientFrom: COLORS.surface,
              backgroundGradientTo: COLORS.surface,
              decimalPlaces: 0,
              color: () => COLORS.bullish,
              labelColor: () => COLORS.textMuted,
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: COLORS.bullish,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* AI Structural Trade Thesis */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="sparkles" size={16} color={COLORS.primaryLight} />
              <Text style={styles.cardTitle}>BROW Trade Thesis</Text>
            </View>
            <View style={styles.convictionBadge}>
              <Text style={styles.convictionText}>Conviction {data.signalStrength}%</Text>
            </View>
          </View>
          <Text style={styles.thesisText}>{data.aiThesis}</Text>
        </View>

        {/* Structured Execution Parameters */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Structured Execution Parameters</Text>
          <View style={styles.grid}>
            <View style={styles.paramBox}>
              <Text style={styles.paramLabel}>ENTRY ZONE</Text>
              <Text style={styles.paramValue}>{data.entryZone}</Text>
            </View>
            <View style={styles.paramBox}>
              <Text style={styles.paramLabel}>STOP LOSS</Text>
              <Text style={[styles.paramValue, { color: COLORS.bearish }]}>{data.stopLoss}</Text>
            </View>
            <View style={styles.paramBox}>
              <Text style={styles.paramLabel}>TARGET 1</Text>
              <Text style={[styles.paramValue, { color: COLORS.bullish }]}>{data.target1}</Text>
            </View>
            <View style={styles.paramBox}>
              <Text style={styles.paramLabel}>TARGET 2</Text>
              <Text style={[styles.paramValue, { color: COLORS.bullish }]}>{data.target2}</Text>
            </View>
          </View>

          <View style={styles.invalidationCard}>
            <Ionicons name="warning-outline" size={16} color={COLORS.bearish} />
            <Text style={styles.invalidationText}>Invalidation: {data.invalidation}</Text>
          </View>
        </View>

        {/* Action Button: Simulate Virtual Paper Trade */}
        <TouchableOpacity
          style={[styles.actionBtn, simulated && styles.actionBtnDone]}
          activeOpacity={0.85}
          onPress={handleSimulate}
        >
          <Ionicons
            name={simulated ? 'checkmark-circle' : 'add-circle-outline'}
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.actionBtnText}>
            {simulated ? 'Position Active in Paper Portfolio' : 'Simulate Paper Trade (+10 Qty)'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 16, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  headerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  headerBtnAlertActive: { borderColor: COLORS.primaryLight, backgroundColor: '#38BDF820' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  headerSub: { fontSize: 11, color: COLORS.textMuted },
  priceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginVertical: 8 },
  priceText: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
  percentPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00E67618', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 2 },
  percentText: { color: COLORS.bullish, fontSize: 13, fontWeight: '700' },
  timeframeRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 12 },
  tfPill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  activeTfPill: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  tfText: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  activeTfText: { color: '#000000' },
  chartWrapper: { backgroundColor: COLORS.surface, borderRadius: 14, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  chart: { borderRadius: 14 },
  card: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  convictionBadge: { backgroundColor: '#38BDF820', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  convictionText: { fontSize: 11, fontWeight: '800', color: COLORS.primaryLight },
  thesisText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  paramBox: { width: '48%', backgroundColor: COLORS.surfaceElevated, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  paramLabel: { fontSize: 9, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.8 },
  paramValue: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, marginTop: 4 },
  invalidationCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FF3B3012', padding: 10, borderRadius: 8, marginTop: 12 },
  invalidationText: { fontSize: 11, color: COLORS.bearish, fontWeight: '600', flex: 1 },
  actionBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 12, marginTop: 6 },
  actionBtnDone: { backgroundColor: COLORS.bullish },
  actionBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});