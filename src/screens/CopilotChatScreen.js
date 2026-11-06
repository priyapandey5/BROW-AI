import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function CopilotChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'copilot',
      text: 'Hello Priya, I am your institutional trading copilot. Ask me about breakout setups, factor rankings, or portfolio risk assessments.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const pastSessions = [
    { id: 's1', title: 'NIFTY 50 Expiry Structure Review', time: 'Yesterday, 3:30 PM' },
    { id: 's2', title: 'Breakout Scans: IT & Pharma Squeeze', time: 'Nov 4, 11:20 AM' },
    { id: 's3', title: 'Stop-Loss Sizing for Momentum Book', time: 'Nov 2, 02:15 PM' }
  ];

  const quickPrompts = [
    'Audit my risk on RELIANCE',
    'Scan top VWAP breakouts',
    'Explain US CPI impact on FIIs'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated Copilot intelligence response
    setTimeout(() => {
      let replyText = `Analyzing market depth for: "${query}". Momentum is strong with sustained institutional participation above VWAP. Keep trailing stop at prior swing low.`;
      
      if (query.toLowerCase().includes('risk') || query.toLowerCase().includes('reliance')) {
        replyText = 'RELIANCE: Current structure is bullish above ₹2,950. Recommended stop-loss is ₹2,910 with 1:2.4 Risk-to-Reward ratio.';
      } else if (query.toLowerCase().includes('cpi')) {
        replyText = 'Macro Outlook: US CPI expectation is 2.4%. Any figure lower signals rate cuts, positive for emerging market equities (NIFTY).';
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'copilot',
        text: replyText
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const renderMessageItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.msgWrapper, isUser ? styles.msgWrapperUser : styles.msgWrapperCopilot]}>
        <View style={[styles.msgBubble, isUser ? styles.msgBubbleUser : styles.msgBubbleCopilot]}>
          <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextCopilot]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header Bar */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>AI Trade Copilot</Text>
              <Text style={styles.headerSubtitle}>Conversational Alpha Assistant</Text>
            </View>
            <TouchableOpacity 
              style={styles.historyBtn}
              onPress={() => setShowHistoryModal(true)}
            >
              <Ionicons name="time-outline" size={22} color="#00F2FE" />
            </TouchableOpacity>
          </View>

          {/* Quick Starter Chips */}
          <View style={styles.chipsContainer}>
            <FlatList
              horizontal
              data={quickPrompts}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.chip}
                  onPress={() => handleSend(item)}
                >
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Messages Feed */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
          />

          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask Copilot about stocks, setups or risk..."
              placeholderTextColor="#64748B"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={() => handleSend()}
            >
              <Ionicons name="arrow-up" size={20} color="#090D14" />
            </TouchableOpacity>
          </View>

          {/* History Drawer Modal */}
          <Modal
            visible={showHistoryModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowHistoryModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Past Copilot Sessions</Text>
                  <TouchableOpacity onPress={() => setShowHistoryModal(false)}>
                    <Ionicons name="close" size={24} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {pastSessions.map((session) => (
                  <TouchableOpacity 
                    key={session.id} 
                    style={styles.historyItem}
                    onPress={() => {
                      setShowHistoryModal(false);
                      handleSend(session.title);
                    }}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#00F2FE" />
                    <View style={styles.historyTextContainer}>
                      <Text style={styles.historyItemTitle}>{session.title}</Text>
                      <Text style={styles.historyItemTime}>{session.time}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  headerSub: { fontSize: 11, color: COLORS.primaryLight, marginTop: 2 },
  historyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  chatArea: { flex: 1 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 12, marginBottom: 12 },
  aiBubble: { backgroundColor: COLORS.surface, alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border },
  userBubble: { backgroundColor: COLORS.primary, alignSelf: 'flex-end' },
  bubbleText: { fontSize: 13, color: COLORS.textPrimary, lineHeight: 18 },
  quickPrompts: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 8 },
  promptChip: { backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  promptChipText: { fontSize: 11, color: COLORS.primaryLight, fontWeight: '600' },
  inputBox: { flexDirection: 'row', padding: 12, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, alignItems: 'center' },
  chatInput: { flex: 1, height: 40, backgroundColor: COLORS.surfaceElevated, borderRadius: 20, paddingHorizontal: 14, color: COLORS.textPrimary, fontSize: 13 },
  sendButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  sessionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sessionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  sessionMeta: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
});