// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { MARKET_INDICES, AI_FEATURED_SETUPS, MACRO_NEWS } from '../constants/mockData';

const ECONOMIC_EVENTS = [
  { id: '1', date: 'Nov 06', event: 'US Non-Farm Payrolls', consensus: '165K', prior: '142K', impact: 'HIGH' },
  { id: '2', date: 'Nov 08', event: 'RBI MPC Policy Decision', consensus: '6.50% (Hold)', prior: '6.50%', impact: 'CRITICAL' },
  { id: '3', date: 'Nov 12', event: 'India CPI Inflation (YoY)', consensus: '5.20%', prior: '5.49%', impact: 'HIGH' },
];

export default function HomeScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Watchlist' | 'Breakouts'
  const [bookmarkedIds, setBookmarkedIds] = useState(['tatamotors']);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedStocks = activeFilter === 'Watchlist'
    ? AI_FEATURED_SETUPS.filter((s) => bookmarkedIds.includes(s.id))
    : AI_FEATURED_SETUPS;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeSub}>BROW INTELLIGENCE</Text>
            <Text style={styles.welcomeTitle}>Live Market Deck</Text>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>SYSTEM LIVE</Text>
          </View>
        </View>

        {/* Market Indices Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.indicesContainer}
        >
          {MARKET_INDICES.map((item) => (
            <View key={item.id} style={styles.indexCard}>
              <Text style={styles.indexName}>{item.name}</Text>
              <Text style={styles.indexPrice}>{item.price}</Text>
              <View style={[styles.percentBadge, { backgroundColor: item.isUp ? '#00E67620' : '#FF3B3020' }]}>
                <Ionicons
                  name={item.isUp ? 'caret-up' : 'caret-down'}
                  size={12}
                  color={item.isUp ? COLORS.bullish : COLORS.bearish}
                />
                <Text style={[styles.percentText, { color: item.isUp ? COLORS.bullish : COLORS.bearish }]}>
                  {item.percent}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Filter Pills with Watchlist */}
        <View style={styles.filterRow}>
          {['All Setups', 'Watchlist', 'High Conviction'].map((tab) => {
            const key = tab === 'All Setups' ? 'All' : tab;
            const isSelected = activeFilter === key;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterChip, isSelected && styles.activeFilterChip]}
                onPress={() => setActiveFilter(key)}
              >
                {tab === 'Watchlist' && (
                  <Ionicons
                    name="bookmark"
                    size={12}
                    color={isSelected ? '#000' : COLORS.primaryLight}
                    style={{ marginRight: 4 }}
                  />
                )}
                <Text style={[styles.filterChipText, isSelected && styles.activeFilterChipText]}>
                  {tab} {tab === 'Watchlist' ? `(${bookmarkedIds.length})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="sparkles" size={16} color={COLORS.primaryLight} />
            <Text style={styles.sectionTitle}>
              {activeFilter === 'Watchlist' ? 'My Saved Watchlist' : 'Disciplined AI Setups'}
            </Text>
          </View>
          <Text style={styles.badgeText}>Real-Time Rules</Text>
        </View>

        {/* AI Setup Cards */}
        {displayedStocks.map((stock) => (
          <TouchableOpacity
            key={stock.id}
            style={styles.setupCard}
            activeOpacity={0.7}
            onPress={() => {
              if (navigation) {
                navigation.navigate('StockDetail', { stock: stock });
              }
            }}
          >
            <View style={styles.cardTopRow}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                  <Text style={styles.exchangeBadge}>{stock.exchange}</Text>
                  <TouchableOpacity
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() => toggleBookmark(stock.id)}
                  >
                    <Ionicons
                      name={bookmarkedIds.includes(stock.id) ? 'bookmark' : 'bookmark-outline'}
                      size={16}
                      color={bookmarkedIds.includes(stock.id) ? COLORS.primaryLight : COLORS.textMuted}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.companyName}>{stock.companyName}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.stockPrice}>{stock.currentPrice}</Text>
                <Text style={styles.stockChange}>{stock.dayPercent}</Text>
              </View>
            </View>

            <View style={styles.verdictRow}>
              <View style={styles.verdictChip}>
                <Ionicons name="shield-checkmark" size={14} color={COLORS.bullish} />
                <Text style={styles.verdictText}>{stock.verdict}</Text>
              </View>
              <Text style={styles.rrText}>R:R {stock.riskReward}</Text>
            </View>

            <View style={styles.riskGaugeContainer}>
              <View style={styles.gaugeLabels}>
                <Text style={styles.gaugeLabelStop}>Stop: {stock.stopLoss}</Text>
                <Text style={styles.gaugeLabelTarget}>Target: {stock.target1}</Text>
              </View>
              <View style={styles.gaugeTrack}>
                <View style={styles.gaugeStopSegment} />
                <View style={styles.gaugeTargetSegment} />
              </View>
            </View>

            <Text style={styles.thesisText} numberOfLines={2}>
              {stock.aiThesis}
            </Text>

            <View style={styles.invalidationBox}>
              <Ionicons name="alert-circle-outline" size={14} color={COLORS.textMuted} />
              <Text style={styles.invalidationText} numberOfLines={1}>
                Invalidation: {stock.invalidation}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Macro Calendar & News Intelligence Header */}
        <View style={[styles.sectionHeader, { marginTop: 16 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="newspaper-outline" size={16} color={COLORS.primaryLight} />
            <Text style={styles.sectionTitle}>Macro & Economic Intelligence</Text>
          </View>
          <TouchableOpacity
            style={styles.calendarToggleBtn}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Ionicons name="calendar-outline" size={13} color={COLORS.primaryLight} />
            <Text style={styles.calendarToggleText}>
              {showCalendar ? 'Hide Calendar' : 'Economic Cal'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Expandable Economic Calendar */}
        {showCalendar && (
          <View style={styles.calendarBox}>
            <Text style={styles.calendarHeading}>Key Central Bank & Macro Triggers</Text>
            {ECONOMIC_EVENTS.map((item) => (
              <View key={item.id} style={styles.calendarItem}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 8 }}>
                  <Text style={styles.eventText}>{item.event}</Text>
                  <Text style={styles.eventSub}>Cons: {item.consensus} | Prior: {item.prior}</Text>
                </View>
                <View style={[styles.impactBadge, { backgroundColor: item.impact === 'CRITICAL' ? '#FF3B3020' : '#38BDF820' }]}>
                  <Text style={[styles.impactBadgeText, { color: item.impact === 'CRITICAL' ? COLORS.bearish : COLORS.primaryLight }]}>
                    {item.impact}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* News Feed */}
        {MACRO_NEWS.map((news) => (
          <View key={news.id} style={styles.newsCard}>
            <View style={styles.newsTopRow}>
              <Text style={styles.newsTag}>{news.tag}</Text>
              <Text style={styles.newsTime}>{news.time}</Text>
            </View>
            <Text style={styles.newsHeadline}>{news.headline}</Text>
            <View style={styles.impactRow}>
              <Ionicons name="trending-up-outline" size={14} color={COLORS.bullish} />
              <Text style={styles.newsImpact}>{news.impact}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  welcomeSub: { fontSize: 11, color: COLORS.primaryLight, fontWeight: '800', letterSpacing: 1.2 },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.bullish },
  liveText: { fontSize: 10, fontWeight: '700', color: COLORS.bullish },
  indicesContainer: { gap: 12, marginBottom: 18 },
  indexCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, width: 135 },
  indexName: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' },
  indexPrice: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginVertical: 4 },
  percentBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 2 },
  percentText: { fontSize: 11, fontWeight: '700' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  activeFilterChip: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  filterChipText: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  activeFilterChipText: { color: '#000000' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  badgeText: { fontSize: 11, color: COLORS.textMuted },
  calendarToggleBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  calendarToggleText: { fontSize: 11, color: COLORS.primaryLight, fontWeight: '700' },
  calendarBox: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 14 },
  calendarHeading: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  calendarItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  dateBadge: { backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4 },
  dateText: { fontSize: 10, fontWeight: '700', color: COLORS.primaryLight },
  eventText: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  eventSub: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  impactBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  impactBadgeText: { fontSize: 9, fontWeight: '800' },
  setupCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 14 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  stockSymbol: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  exchangeBadge: { fontSize: 10, backgroundColor: COLORS.surfaceElevated, color: COLORS.textSecondary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  companyName: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  stockPrice: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  stockChange: { fontSize: 12, fontWeight: '700', color: COLORS.bullish },
  verdictRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  verdictChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#00E67615', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  verdictText: { color: COLORS.bullish, fontSize: 11, fontWeight: '800' },
  rrText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
  riskGaugeContainer: { marginVertical: 6 },
  gaugeLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  gaugeLabelStop: { fontSize: 10, color: COLORS.bearish, fontWeight: '600' },
  gaugeLabelTarget: { fontSize: 10, color: COLORS.bullish, fontWeight: '600' },
  gaugeTrack: { height: 4, backgroundColor: COLORS.border, borderRadius: 2, flexDirection: 'row', overflow: 'hidden' },
  gaugeStopSegment: { flex: 1, backgroundColor: COLORS.bearish },
  gaugeTargetSegment: { flex: 3, backgroundColor: COLORS.bullish },
  thesisText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 16, marginTop: 6 },
  invalidationBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.surfaceElevated, padding: 8, borderRadius: 6, marginTop: 10 },
  invalidationText: { fontSize: 11, color: COLORS.textMuted, flex: 1 },
  newsCard: { backgroundColor: COLORS.surface, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  newsTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  newsTag: { fontSize: 10, color: COLORS.primaryLight, fontWeight: '700' },
  newsTime: { fontSize: 10, color: COLORS.textMuted },
  newsHeadline: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 18, marginVertical: 4 },
  impactRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  newsImpact: { fontSize: 11, color: COLORS.bullish, fontWeight: '600' },
});