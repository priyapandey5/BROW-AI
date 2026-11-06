import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function StockDetailScreen({ route, navigation }) {
  const { stock } = route.params || {
    stock: {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2980.50,
      change: 1.45,
      entryZone: '2950 - 2970',
      stopLoss: 2910,
      target: 3120,
      target2: 3200,
      strategy: 'Breakout Accumulation',
      conviction: 'HIGH',
      thesis: 'Institutional accumulation observed above 20-day EMA with expanding delivery volume.'
    }
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [orderQty, setOrderQty] = useState(10);
  const [orderExecuted, setOrderExecuted] = useState(false);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  const handleSimulateTrade = () => {
    setOrderExecuted(true);
    Alert.alert(
      'Virtual Order Executed',
      `Filled ${orderQty} shares of ${stock.symbol} at ₹${stock.price}. Added to Paper Portfolio.`,
      [{ text: 'OK' }]
    );
  };

  const toggleAlert = () => {
    const nextState = !alertEnabled;
    setAlertEnabled(nextState);
    Alert.alert(
      nextState ? 'Alert Activated' : 'Alert Disabled',
      nextState 
        ? `You will receive a notification if ${stock.symbol} crosses ₹${stock.stopLoss} (SL) or ₹${stock.target} (Target).`
        : `Notifications paused for ${stock.symbol}.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Navigation Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#00F2FE" />
          </TouchableOpacity>
          <View style={styles.navCenter}>
            <Text style={styles.headerSymbol}>{stock.symbol}</Text>
            <Text style={styles.headerCompany}>{stock.name}</Text>
          </View>
          <TouchableOpacity onPress={toggleAlert} style={styles.iconButton}>
            <Ionicons 
              name={alertEnabled ? "notifications" : "notifications-outline"} 
              size={22} 
              color={alertEnabled ? "#00F2FE" : "#64748B"} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Price & Change Banner */}
          <View style={styles.priceSection}>
            <Text style={styles.priceText}>₹{stock.price}</Text>
            <Text style={stock.change >= 0 ? styles.changeGreen : styles.changeRed}>
              {stock.change >= 0 ? `+${stock.change}%` : `${stock.change}%`}
            </Text>
          </View>

          {/* Timeframe Selectors */}
          <View style={styles.timeframeRow}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[styles.tfChip, selectedTimeframe === tf && styles.tfChipActive]}
                onPress={() => setSelectedTimeframe(tf)}
              >
                <Text style={[styles.tfText, selectedTimeframe === tf && styles.tfTextActive]}>
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Execution Parameters Table */}
          <View style={styles.tableCard}>
            <Text style={styles.cardHeading}>Institutional Trade Levels</Text>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Entry Zone</Text>
              <Text style={styles.tableValue}>{stock.entryZone || 'Market Price'}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Strict Stop-Loss</Text>
              <Text style={styles.tableValueRed}>₹{stock.stopLoss}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Target 1</Text>
              <Text style={styles.tableValueGreen}>₹{stock.target}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Target 2 (Extended)</Text>
              <Text style={styles.tableValueGreen}>₹{stock.target2 || stock.target}</Text>
            </View>
          </View>

          {/* Trade Thesis Card */}
          <View style={styles.thesisCard}>
            <Text style={styles.cardHeading}>AI Trade Thesis</Text>
            <Text style={styles.thesisBody}>{stock.thesis}</Text>
            <View style={styles.strategyPill}>
              <Text style={styles.strategyLabel}>{stock.strategy} • Conviction: {stock.conviction}</Text>
            </View>
          </View>

          {/* Virtual Execution Action Box */}
          <View style={styles.actionBox}>
            <View style={styles.qtyControlRow}>
              <Text style={styles.qtyLabel}>Simulated Order Size:</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity 
                  style={styles.stepBtn}
                  onPress={() => setOrderQty(Math.max(1, orderQty - 5))}
                >
                  <Text style={styles.stepBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{orderQty} Qty</Text>
                <TouchableOpacity 
                  style={styles.stepBtn}
                  onPress={() => setOrderQty(orderQty + 5)}
                >
                  <Text style={styles.stepBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.tradeButton, orderExecuted && styles.tradeButtonExecuted]}
              onPress={handleSimulateTrade}
            >
              <Text style={styles.tradeButtonText}>
                {orderExecuted ? `Order Added (${orderQty} Qty)` : `Simulate Buy Order (+${orderQty})`}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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