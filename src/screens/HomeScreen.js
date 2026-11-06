import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MARKET_INDICES, AI_FEATURED_SETUPS, MACRO_NEWS } from '../constants/mockData';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [watchlist, setWatchlist] = useState(['TATAMOTORS']);
  const [showNews, setShowNews] = useState(false);

  const toggleWatchlist = (symbol) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(watchlist.filter((item) => item !== symbol));
    } else {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const displayedSetups = activeTab === 'WATCHLIST'
    ? (AI_FEATURED_SETUPS || []).filter((item) => watchlist.includes(item.symbol))
    : (AI_FEATURED_SETUPS || []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeSub}>MARKET INTELLIGENCE</Text>
            <Text style={styles.headerTitle}>BROW AI</Text>
          </View>
          <TouchableOpacity 
            style={styles.newsToggleBtn}
            onPress={() => setShowNews(!showNews)}
          >
            <Ionicons 
              name={showNews ? "newspaper" : "newspaper-outline"} 
              size={22} 
              color="#00F2FE" 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Market Indices Ticker Strip */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tickerContainer}>
            {(MARKET_INDICES || []).map((idx) => (
              <View key={idx.id} style={styles.tickerItem}>
                <Text style={styles.tickerName}>{idx.name}</Text>
                <Text style={styles.tickerPrice}>{idx.price}</Text>
                <Text style={idx.isUp ? styles.tickerGreen : styles.tickerRed}>
                  {idx.percent}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Macro News Section */}
          {showNews && (
            <View style={styles.newsCard}>
              <Text style={styles.sectionHeading}>Macro Triggers & Catalysts</Text>
              {(MACRO_NEWS || []).map((item) => (
                <View key={item.id} style={styles.newsRow}>
                  <Text style={styles.newsTag}>{item.tag} • {item.time}</Text>
                  <Text style={styles.newsHeadline}>{item.headline}</Text>
                  <Text style={styles.newsImpact}>{item.impact}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Filters */}
          <View style={styles.tabFilterRow}>
            <TouchableOpacity 
              style={[styles.filterChip, activeTab === 'ALL' && styles.filterChipActive]}
              onPress={() => setActiveTab('ALL')}
            >
              <Text style={[styles.filterChipText, activeTab === 'ALL' && styles.filterChipTextActive]}>
                All Breakouts ({AI_FEATURED_SETUPS?.length || 0})
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

          {/* Featured AI Trade Setups */}
          <View style={styles.cardsContainer}>
            {displayedSetups.map((setup) => {
              const isSaved = watchlist.includes(setup.symbol);
              const isBullish = !setup.dayPercent.startsWith('-');

              return (
                <TouchableOpacity 
                  key={setup.id} 
                  style={styles.stockCard}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('StockDetail', { stock: setup })}
                >
                  <View style={styles.stockCardHeader}>
                    <View>
                      <Text style={styles.stockSymbol}>{setup.symbol}</Text>
                      <Text style={styles.stockCompany}>{setup.companyName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleWatchlist(setup.symbol)}>
                      <Ionicons 
                        name={isSaved ? "bookmark" : "bookmark-outline"} 
                        size={22} 
                        color={isSaved ? "#00F2FE" : "#64748B"} 
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>{setup.currentPrice}</Text>
                    <Text style={isBullish ? styles.priceChangeGreen : styles.priceChangeRed}>
                      {setup.dayPercent}
                    </Text>
                  </View>

                  {/* Verdict & Signal Gauge */}
                  <View style={styles.verdictRow}>
                    <View style={styles.verdictBadge}>
                      <Text style={styles.verdictText}>{setup.verdict}</Text>
                    </View>
                    <Text style={styles.signalScore}>Signal: {setup.signalStrength}%</Text>
                  </View>

                  {/* Execution Levels */}
                  <View style={styles.levelsGrid}>
                    <Text style={styles.levelText}>SL: <Text style={styles.redVal}>{setup.stopLoss}</Text></Text>
                    <Text style={styles.levelText}>T1: <Text style={styles.greenVal}>{setup.target1}</Text></Text>
                    <Text style={styles.levelText}>R:R: <Text style={styles.cyanVal}>{setup.riskReward}</Text></Text>
                  </View>

                  <Text style={styles.aiThesis} numberOfLines={2}>{setup.aiThesis}</Text>
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
  safeArea: { flex: 1, backgroundColor: '#090D14' },
  container: { flex: 1, backgroundColor: '#090D14' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B'
  },
  welcomeSub: { fontSize: 10, color: '#00F2FE', fontWeight: '800', letterSpacing: 1.2 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC' },
  newsToggleBtn: { padding: 8, backgroundColor: '#1E293B', borderRadius: 8 },
  tickerContainer: { marginVertical: 14 },
  tickerItem: {
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  tickerName: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  tickerPrice: { fontSize: 14, fontWeight: '700', color: '#F8FAFC', marginTop: 2 },
  tickerGreen: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 2 },
  tickerRed: { fontSize: 11, color: '#EF4444', fontWeight: '700', marginTop: 2 },
  newsCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sectionHeading: { color: '#F8FAFC', fontSize: 13, fontWeight: '700', marginBottom: 8 },
  newsRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  newsTag: { color: '#00F2FE', fontSize: 10, fontWeight: '700' },
  newsHeadline: { color: '#F8FAFC', fontSize: 12, marginTop: 2, fontWeight: '600' },
  newsImpact: { color: '#94A3B8', fontSize: 11, marginTop: 2 },
  tabFilterRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  filterChipActive: { backgroundColor: '#00F2FE15', borderColor: '#00F2FE' },
  filterChipText: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  filterChipTextActive: { color: '#00F2FE' },
  cardsContainer: { gap: 12 },
  stockCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  stockCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  stockSymbol: { fontSize: 16, fontWeight: '800', color: '#F8FAFC' },
  stockCompany: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10 },
  currentPrice: { fontSize: 20, fontWeight: '800', color: '#F8FAFC' },
  priceChangeGreen: { fontSize: 13, fontWeight: '700', color: '#10B981' },
  priceChangeRed: { fontSize: 13, fontWeight: '700', color: '#EF4444' },
  verdictRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  verdictBadge: { backgroundColor: '#1E293B', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  verdictText: { color: '#00F2FE', fontSize: 11, fontWeight: '700' },
  signalScore: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  levelsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  levelText: { fontSize: 11, color: '#94A3B8' },
  redVal: { color: '#EF4444', fontWeight: '700' },
  greenVal: { color: '#10B981', fontWeight: '700' },
  cyanVal: { color: '#00F2FE', fontWeight: '700' },
  aiThesis: { color: '#64748B', fontSize: 11, marginTop: 4, fontStyle: 'italic' }
});