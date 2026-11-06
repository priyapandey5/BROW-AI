import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';
import { MOCK_STOCKS, ECONOMIC_CALENDAR } from '../constants/mockData';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'WATCHLIST'
  const [watchlist, setWatchlist] = useState(['RELIANCE', 'HDFCBANK']);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleWatchlist = (symbol) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(watchlist.filter((item) => item !== symbol));
    } else {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const displayedStocks = activeTab === 'WATCHLIST'
    ? MOCK_STOCKS.filter((stock) => watchlist.includes(stock.symbol))
    : MOCK_STOCKS;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>BROW AI</Text>
            <Text style={styles.headerSubtitle}>Institutional Alpha Desk</Text>
          </View>
          <TouchableOpacity 
            style={styles.calendarToggleBtn}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Ionicons 
              name={showCalendar ? "calendar" : "calendar-outline"} 
              size={22} 
              color={THEME.colors.neonCyan || "#00F2FE"} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Real-Time Indices Ticker Strip */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tickerContainer}>
            <View style={styles.tickerItem}>
              <Text style={styles.tickerName}>NIFTY 50</Text>
              <Text style={styles.tickerPrice}>24,360.50</Text>
              <Text style={styles.tickerGreen}>+0.62%</Text>
            </View>
            <View style={styles.tickerItem}>
              <Text style={styles.tickerName}>BANKNIFTY</Text>
              <Text style={styles.tickerPrice}>51,940.20</Text>
              <Text style={styles.tickerGreen}>+0.41%</Text>
            </View>
            <View style={styles.tickerItem}>
              <Text style={styles.tickerName}>BTC/USD</Text>
              <Text style={styles.tickerPrice}>$68,450</Text>
              <Text style={styles.tickerRed}>-1.12%</Text>
            </View>
            <View style={styles.tickerItem}>
              <Text style={styles.tickerName}>GOLD</Text>
              <Text style={styles.tickerPrice}>$2,740</Text>
              <Text style={styles.tickerGreen}>+0.18%</Text>
            </View>
          </ScrollView>

          {/* Expandable Macro Economic Calendar */}
          {showCalendar && (
            <View style={styles.calendarCard}>
              <Text style={styles.sectionHeading}>Economic Calendar</Text>
              {ECONOMIC_CALENDAR.map((event, idx) => (
                <View key={idx} style={styles.calendarRow}>
                  <View style={styles.calendarLeft}>
                    <Text style={styles.calendarDate}>{event.date}</Text>
                    <Text style={styles.calendarEvent}>{event.event}</Text>
                  </View>
                  <View style={styles.calendarRight}>
                    <Text style={styles.calendarImpact}>{event.impact}</Text>
                    <Text style={styles.calendarForecast}>Fcst: {event.forecast}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Filter Tabs */}
          <View style={styles.tabFilterRow}>
            <TouchableOpacity 
              style={[styles.filterChip, activeTab === 'ALL' && styles.filterChipActive]}
              onPress={() => setActiveTab('ALL')}
            >
              <Text style={[styles.filterChipText, activeTab === 'ALL' && styles.filterChipTextActive]}>
                All Setups ({MOCK_STOCKS.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterChip, activeTab === 'WATCHLIST' && styles.filterChipActive]}
              onPress={() => setActiveTab('WATCHLIST')}
            >
              <Text style={[styles.filterChipText, activeTab === 'WATCHLIST' && styles.filterChipTextActive]}>
                Watchlist ({watchlist.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stock Breakout Cards */}
          <View style={styles.cardsContainer}>
            {displayedStocks.map((stock) => {
              const isSaved = watchlist.includes(stock.symbol);
              return (
                <TouchableOpacity 
                  key={stock.id} 
                  style={styles.stockCard}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('StockDetail', { stock })}
                >
                  <View style={styles.stockCardHeader}>
                    <View>
                      <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                      <Text style={styles.stockCompany}>{stock.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleWatchlist(stock.symbol)}>
                      <Ionicons 
                        name={isSaved ? "bookmark" : "bookmark-outline"} 
                        size={22} 
                        color={isSaved ? (THEME.colors.neonCyan || "#00F2FE") : "#64748B"} 
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{stock.price}</Text>
                    <Text style={stock.change >= 0 ? styles.priceChangeGreen : styles.priceChangeRed}>
                      {stock.change >= 0 ? `+${stock.change}%` : `${stock.change}%`}
                    </Text>
                  </View>

                  {/* Visual Risk-to-Reward Gauge */}
                  <View style={styles.gaugeContainer}>
                    <View style={styles.gaugeBarBackground}>
                      <View style={[styles.gaugeStopLossTrack, { flex: 1 }]} />
                      <View style={[styles.gaugeTargetTrack, { flex: 2 }]} />
                    </View>
                    <View style={styles.gaugeLabels}>
                      <Text style={styles.gaugeLabelText}>SL: ₹{stock.stopLoss}</Text>
                      <Text style={styles.gaugeLabelText}>Target: ₹{stock.target}</Text>
                    </View>
                  </View>

                  {/* Strategy Badge & Conviction */}
                  <View style={styles.cardFooter}>
                    <View style={styles.strategyTag}>
                      <Text style={styles.strategyText}>{stock.strategy}</Text>
                    </View>
                    <Text style={styles.convictionText}>
                      Conviction: <Text style={styles.convictionHighlight}>{stock.conviction}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
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