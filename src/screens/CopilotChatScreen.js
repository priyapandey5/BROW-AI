// src/screens/CopilotChatScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const OLDER_CHATS = [
  { id: '1', title: 'NIFTY Expiry Gamma Walk', time: 'Yesterday', messages: 6 },
  { id: '2', title: 'Tata Motors Invalidation Check', time: '2 days ago', messages: 4 },
  { id: '3', title: 'Crude Oil Impact on Paints', time: 'Nov 01', messages: 8 },
];

export default function CopilotChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: 'Hi Buddy, I am BROW AI Copilot. Ask me about multi-timeframe breakouts, institutional order flows, or risk auditing.',
    }
  ]);
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const sendQuery = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Analysis for "${query}": Structure indicates neutral-to-bullish continuation with key invalidation at ₹24,100 support. Institutional accumulation index remains high at 84%.`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const loadPastSession = (session) => {
    setShowHistory(false);
    setMessages([
      { id: '1', sender: 'user', text: session.title },
      { id: '2', sender: 'ai', text: `Restored session from ${session.time}. Key parameters verified.` },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with History Clock Icon */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>BROW AI Copilot</Text>
          <Text style={styles.headerSub}>Structured Intelligence Engine</Text>
        </View>
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => setShowHistory(true)}
        >
          <Ionicons name="time-outline" size={20} color={COLORS.primaryLight} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 16 }}>
        {messages.map((m) => (
          <View
            key={m.id}
            style={[styles.bubble, m.sender === 'user' ? styles.userBubble : styles.aiBubble]}
          >
            {m.sender === 'ai' && (
              <Ionicons name="sparkles" size={14} color={COLORS.primaryLight} style={{ marginBottom: 4 }} />
            )}
            <Text style={styles.bubbleText}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Suggested Quick Prompts */}
      <View style={styles.quickPrompts}>
        {['Top Breakouts Today', 'Audit Reliance Risk', 'NIFTY Expiry OI Walk'].map((p) => (
          <TouchableOpacity key={p} style={styles.promptChip} onPress={() => sendQuery(p)}>
            <Text style={styles.promptChipText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Input Box */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Ask BROW anything..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.chatInput}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendQuery(input)}>
          <Ionicons name="arrow-up" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Older Chats Modal */}
      <Modal visible={showHistory} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Older Copilot Sessions</Text>
              <TouchableOpacity onPress={() => setShowHistory(false)}>
                <Ionicons name="close" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
            {OLDER_CHATS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.sessionItem}
                onPress={() => loadPastSession(item)}
              >
                <View>
                  <Text style={styles.sessionTitle}>{item.title}</Text>
                  <Text style={styles.sessionMeta}>{item.time} • {item.messages} prompts</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

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