import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Modal, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

const COLORS = THEME?.colors || {
  background: '#090D14',
  primaryLight: '#00F2FE',
  cardBg: '#111827',
  border: '#1E293B',
  textPrimary: '#F8FAFC',
  subText: '#94A3B8',
};

export default function CopilotChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'copilot',
      text: 'Hello Buddie, I am your institutional trading copilot. Ask me about breakout setups, factor rankings, or portfolio risk assessments.'
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
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>AI Trade Copilot</Text>
              <Text style={styles.headerSub}>Conversational Alpha Assistant</Text>
            </View>
            <TouchableOpacity 
              style={styles.historyBtn}
              onPress={() => setShowHistoryModal(true)}
            >
              <Ionicons name="time-outline" size={22} color="#00F2FE" />
            </TouchableOpacity>
          </View>

          {/* Quick Prompts */}
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

          {/* Message Feed */}
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
  safeArea: { 
    flex: 1, 
    backgroundColor: '#090D14' 
  },
  keyboardContainer: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    backgroundColor: '#090D14' 
  },
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
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#F8FAFC' 
  },
  headerSub: { 
    fontSize: 11, 
    color: '#00F2FE', 
    marginTop: 2 
  },
  historyBtn: {
    padding: 8,
    backgroundColor: '#1E293B',
    borderRadius: 8,
  },
  chipsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  msgWrapper: {
    marginVertical: 6,
    maxWidth: '85%',
  },
  msgWrapperUser: {
    alignSelf: 'flex-end',
  },
  msgWrapperCopilot: {
    alignSelf: 'flex-start',
  },
  msgBubble: {
    padding: 12,
    borderRadius: 14,
  },
  msgBubbleUser: {
    backgroundColor: '#00F2FE',
    borderBottomRightRadius: 2,
  },
  msgBubbleCopilot: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderBottomLeftRadius: 2,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  msgTextUser: {
    color: '#090D14',
    fontWeight: '600',
  },
  msgTextCopilot: {
    color: '#F8FAFC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#090D14',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#111827',
    color: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#00F2FE',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  historyTextContainer: {
    marginLeft: 12,
  },
  historyItemTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  historyItemTime: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
});