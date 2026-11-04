// src/screens/RadarScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const MOCK_SIGNALS = [
  { id: '1', symbol: 'ZOMATO', segment: 'India Equity', price: '₹264.20', type: 'Volume Surge', score: 92, action: 'Institutional Accumulation', isBullish: true, time: '2m ago' },
  { id: '2', symbol: 'NIFTY 23700 CE', segment: 'India F&O', price: '₹142.10', type: 'OI Build-up', score: 87, action: 'Bullish Flow Addition', isBullish: true, time: '6m ago' },
  { id: '3', symbol: 'INFY', segment: 'India Equity', price: '₹1,845.00', type: 'VWAP Cluster', score: 74, action: 'Distribution Detected', isBullish: false, time: '14m ago' },
  { id: '4', symbol: 'TCS', segment: 'India Equity', price: '₹4,120.00', type: 'Breakout Confirmed', score: 89, action: 'Smart Money Buy', isBullish: true, time: '22m ago' }
];

export default function RadarScreen() {
  const [filter, setFilter] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subTitle}>REAL-TIME FLOW</Text>
          <Text style={styles.mainTitle}>Liquidity Radar</Text>
        </View>

        {/* Search Bar with AI Filter */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={COLORS.textMuted} />
          <TextInput
            placeholder='Ask BROW e.g. "Volume spike above 500"'
            placeholderTextColor={COLORS.textMuted}
            style={styles.input}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.pillsRow}>
          {['All', 'Breakouts', 'Accumulation', 'F&O Flow'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.pill, filter === item && styles.activePill]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.pillText, filter === item && styles.activePillText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Signal Cards */}
        <Text style={styles.sectionHeading}>Live Cross-Market Signals</Text>
        {MOCK_SIGNALS.map((sig) => (
          <View key={sig.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.symbol}>{sig.symbol}</Text>
                  <Text style={styles.segmentBadge}>{sig.segment}</Text>
                </View>
                <Text style={styles.detectedPrice}>{sig.price}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: sig.isBullish ? '#00E67620' : '#FF3B3020' }]}>
                <Text style={[styles.scoreText, { color: sig.isBullish ? COLORS.bullish : COLORS.bearish }]}>
                  Score {sig.score}
                </Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <Ionicons
                name={sig.isBullish ? 'arrow-up-circle-outline' : 'arrow-down-circle-outline'}
                size={16}
                color={sig.isBullish ? COLORS.bullish : COLORS.bearish}
              />
              <Text style={styles.actionText}>{sig.action}</Text>
              <Text style={styles.timeText}>• {sig.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 16, paddingBottom: 30 },
  header: { marginBottom: 16 },
  subTitle: { fontSize: 11, fontWeight: '800', color: COLORS.primaryLight, letterSpacing: 1.2 },
  mainTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    height: 44,
  },
  input: { flex: 1, marginLeft: 8, color: COLORS.textPrimary, fontSize: 13 },
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  pill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: COLORS.surfaceElevated, borderWidth: 1, borderColor: COLORS.border },
  activePill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  pillText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  activePillText: { color: '#FFF' },
  sectionHeading: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  symbol: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  segmentBadge: { fontSize: 10, color: COLORS.textMuted, backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  detectedPrice: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  scoreBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  scoreText: { fontSize: 11, fontWeight: '800' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.border },
  actionText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  timeText: { fontSize: 11, color: COLORS.textMuted },
});