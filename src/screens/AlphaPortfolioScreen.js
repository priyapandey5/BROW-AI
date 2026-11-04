// src/screens/AlphaPortfolioScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const TOP_MF_FUNDS = [
  { id: '1', name: 'Quant Active Fund (Direct-G)', category: 'Multi Cap', alpha: '+6.82%', aum: '₹14,250 Cr', rating: '5★', topHolding: 'Reliance, HDFC Bank' },
  { id: '2', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', alpha: '+4.95%', aum: '₹72,100 Cr', rating: '5★', topHolding: 'ITC, Bajaj Holdings' },
  { id: '3', name: 'ICICI Prudential Value Discovery', category: 'Value Fund', alpha: '+3.40%', aum: '₹46,800 Cr', rating: '4★', topHolding: 'ONGC, Bharti Airtel' },
];

export default function AlphaPortfolioScreen() {
  const [tab, setTab] = useState('portfolio'); // 'portfolio' | 'factors' | 'mf'

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subTitle}>ALPHA & HOLDINGS</Text>
          <Text style={styles.mainTitle}>Portfolio & Alpha Hub</Text>
        </View>

        {/* 3-Pill Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, tab === 'portfolio' && styles.activeSegmentBtn]}
            onPress={() => setTab('portfolio')}
          >
            <Text style={[styles.segmentBtnText, tab === 'portfolio' && styles.activeSegmentBtnText]}>
              Portfolio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, tab === 'factors' && styles.activeSegmentBtn]}
            onPress={() => setTab('factors')}
          >
            <Text style={[styles.segmentBtnText, tab === 'factors' && styles.activeSegmentBtnText]}>
              Factors
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, tab === 'mf' && styles.activeSegmentBtn]}
            onPress={() => setTab('mf')}
          >
            <Text style={[styles.segmentBtnText, tab === 'mf' && styles.activeSegmentBtnText]}>
              MF Analyser
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Virtual Paper Trading Portfolio */}
        {tab === 'portfolio' && (
          <View>
            <View style={styles.portfolioCard}>
              <Text style={styles.cardMutedLabel}>TOTAL VIRTUAL VALUE</Text>
              <Text style={styles.portfolioValue}>₹1,24,580.00</Text>
              <View style={styles.pnlRow}>
                <Ionicons name="trending-up" size={16} color={COLORS.bullish} />
                <Text style={styles.pnlText}>+₹24,580.00 (+24.58%) All-Time</Text>
              </View>
            </View>

            <Text style={styles.sectionHeading}>Tracked Paper Positions</Text>
            {[
              { symbol: 'TATAMOTORS', qty: 50, buy: '₹890', ltp: '₹984.50', pnl: '+₹4,725.00' },
              { symbol: 'RELIANCE', qty: 35, buy: '₹1,240', ltp: '₹1,287.60', pnl: '+₹1,666.00' },
              { symbol: 'ZOMATO', qty: 200, buy: '₹190', ltp: '₹264.20', pnl: '+₹14,840.00' },
            ].map((pos) => (
              <View key={pos.symbol} style={styles.positionRow}>
                <View>
                  <Text style={styles.posSymbol}>{pos.symbol}</Text>
                  <Text style={styles.posQty}>Qty {pos.qty} • Avg {pos.buy}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.posLtp}>{pos.ltp}</Text>
                  <Text style={styles.posPnl}>{pos.pnl}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Tab 2: Factor Ranking (Momentum / Quality / Value) */}
        {tab === 'factors' && (
          <View>
            <View style={styles.factorWeightCard}>
              <Text style={styles.factorHeading}>Quantitative Factor Model Weights</Text>
              <View style={styles.factorBarRow}>
                <Text style={styles.factorLabel}>Momentum (25%)</Text>
                <View style={styles.barBackground}><View style={[styles.barFill, { width: '80%' }]} /></View>
              </View>
              <View style={styles.factorBarRow}>
                <Text style={styles.factorLabel}>Quality (20%)</Text>
                <View style={styles.barBackground}><View style={[styles.barFill, { width: '65%' }]} /></View>
              </View>
              <View style={styles.factorBarRow}>
                <Text style={styles.factorLabel}>Value (15%)</Text>
                <View style={styles.barBackground}><View style={[styles.barFill, { width: '50%' }]} /></View>
              </View>
            </View>
          </View>
        )}

        {/* Tab 3: Institutional Mutual Fund Analyser */}
        {tab === 'mf' && (
          <View>
            <Text style={styles.sectionHeading}>Top Institutional Alpha Funds</Text>
            {TOP_MF_FUNDS.map((fund) => (
              <View key={fund.id} style={styles.mfCard}>
                <View style={styles.mfTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.mfName}>{fund.name}</Text>
                    <Text style={styles.mfCategory}>{fund.category} • AUM {fund.aum}</Text>
                  </View>
                  <View style={styles.alphaBadge}>
                    <Text style={styles.alphaText}>Alpha {fund.alpha}</Text>
                  </View>
                </View>
                <View style={styles.mfBottomRow}>
                  <Text style={styles.mfHoldings}>Key Holdings: {fund.topHolding}</Text>
                  <Text style={styles.mfRating}>{fund.rating}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

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
  segmentedControl: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 10, padding: 4, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  segmentBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeSegmentBtn: { backgroundColor: COLORS.surfaceElevated },
  segmentBtnText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary },
  activeSegmentBtnText: { color: COLORS.textPrimary, fontWeight: '700' },
  portfolioCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  cardMutedLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1 },
  portfolioValue: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, marginVertical: 6 },
  pnlRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pnlText: { fontSize: 13, fontWeight: '700', color: COLORS.bullish },
  sectionHeading: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  positionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: COLORS.surface, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8 },
  posSymbol: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  posQty: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  posLtp: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  posPnl: { fontSize: 12, fontWeight: '700', color: COLORS.bullish, marginTop: 2 },
  factorWeightCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  factorHeading: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 14 },
  factorBarRow: { marginBottom: 12 },
  factorLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },
  barBackground: { height: 6, backgroundColor: COLORS.surfaceElevated, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: COLORS.primaryLight, borderRadius: 3 },
  mfCard: { backgroundColor: COLORS.surface, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  mfTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mfName: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  mfCategory: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  alphaBadge: { backgroundColor: '#00E67618', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  alphaText: { fontSize: 11, fontWeight: '800', color: COLORS.bullish },
  mfBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.border },
  mfHoldings: { fontSize: 11, color: COLORS.textSecondary, flex: 1 },
  mfRating: { fontSize: 12, color: '#FACC15', fontWeight: '700', marginLeft: 8 },
});