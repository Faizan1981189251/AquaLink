import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Send, Bot, User, MessageCircle, Zap, Package, MapPin, CreditCard, Headphones } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
  orderInfo?: any;
}

interface AIChatbotProps {
  visible: boolean;
  onClose: () => void;
}

export default function AIChatbot({ visible, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm AquaBot, your AI assistant. I can help you with orders, deliveries, payments, and any water delivery questions. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      quickReplies: ['Track my order', 'Order water', 'Payment issue', 'Delivery problem', 'Account help']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickSuggestions = [
    { text: 'Where is my order?', icon: <Package size={16} color="#2563EB" /> },
    { text: 'Change delivery address', icon: <MapPin size={16} color="#2563EB" /> },
    { text: 'Payment failed', icon: <CreditCard size={16} color="#2563EB" /> },
    { text: 'Emergency water delivery', icon: <Zap size={16} color="#DC2626" /> },
  ];

  const aiResponses = {
    'track my order': {
      text: "I can help you track your order! Let me check your recent orders...\n\nYour latest order #AQ001234 (2x 20L Jars) is currently out for delivery and should arrive in 5-8 minutes. Would you like me to share the live tracking link?",
      quickReplies: ['Yes, share tracking', 'Call delivery person', 'Change delivery time']
    },
    'order water': {
      text: "I'd be happy to help you order water! What would you like to order today?",
      quickReplies: ['20L Jars', '1L Bottles', '500ml Bottles', 'Bulk order for office']
    },
    'payment issue': {
      text: "I understand you're having a payment issue. Let me help you resolve this quickly. What specific problem are you experiencing?",
      quickReplies: ['Payment failed', 'Refund request', 'Wrong amount charged', 'Update payment method']
    },
    'delivery problem': {
      text: "I'm sorry to hear about the delivery issue. Let me help you resolve this immediately. What's the problem with your delivery?",
      quickReplies: ['Delivery is late', 'Wrong items delivered', 'Delivery person not reachable', 'Quality issue']
    },
    'account help': {
      text: "I can help you with your account settings and preferences. What would you like to do?",
      quickReplies: ['Update profile', 'Change password', 'Manage addresses', 'Subscription settings']
    },
    'where is my order': {
      text: "Let me check your order status right away!\n\n📦 Order #AQ001234: Out for delivery\n🚚 Delivery person: Rajesh Kumar\n📍 Current location: 0.5 km away\n⏰ ETA: 5-8 minutes\n\nWould you like me to send you the live tracking link?",
      quickReplies: ['Send tracking link', 'Call delivery person', 'Reschedule delivery']
    },
    'change delivery address': {
      text: "I can help you change your delivery address. For active orders, I'll need to contact the delivery person. For future orders, I can update your saved addresses.\n\nWhich would you like to do?",
      quickReplies: ['Change current order address', 'Update saved addresses', 'Add new address']
    },
    'payment failed': {
      text: "I'm sorry your payment failed. Let me help you complete the payment quickly. Here are a few options:\n\n💳 Retry with same card\n🔄 Try different payment method\n📞 Contact bank for authorization\n💰 Pay cash on delivery\n\nWhich option would you prefer?",
      quickReplies: ['Retry payment', 'Use different card', 'Cash on delivery', 'Contact support']
    },
    'emergency water delivery': {
      text: "🚨 Emergency delivery activated! I understand you need water urgently.\n\n⚡ Express delivery available in your area\n⏰ Delivery time: 8-12 minutes\n💰 Express fee: ₹20 extra\n\nShall I place an emergency order for you?",
      quickReplies: ['Yes, place emergency order', 'Check regular delivery', 'Find nearest supplier']
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    const matchedKey = Object.keys(aiResponses).find(key => 
      lowerMessage.includes(key.toLowerCase())
    );

    if (matchedKey) {
      const response = aiResponses[matchedKey as keyof typeof aiResponses];
      return {
        id: Date.now().toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: response.quickReplies
      };
    }

    // Default intelligent responses based on keywords
    if (lowerMessage.includes('order') && lowerMessage.includes('status')) {
      return {
        id: Date.now().toString(),
        text: "I can check your order status! Your most recent order #AQ001234 is currently being prepared and will be out for delivery in 10-15 minutes. Would you like me to set up delivery notifications?",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Yes, notify me', 'Check other orders', 'Contact supplier']
      };
    }

    if (lowerMessage.includes('cancel')) {
      return {
        id: Date.now().toString(),
        text: "I can help you cancel your order. Please note that orders can only be cancelled before they're out for delivery. Which order would you like to cancel?",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Cancel latest order', 'View all orders', 'Reschedule instead']
      };
    }

    if (lowerMessage.includes('refund')) {
      return {
        id: Date.now().toString(),
        text: "I'll help you with your refund request. Refunds are typically processed within 3-5 business days. What's the reason for the refund?",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Quality issue', 'Wrong order', 'Delivery problem', 'Other reason']
      };
    }

    if (lowerMessage.includes('subscription')) {
      return {
        id: Date.now().toString(),
        text: "I can help you manage your water delivery subscription! You currently have a daily delivery subscription active. What would you like to do?",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Pause subscription', 'Change frequency', 'Update quantity', 'Cancel subscription']
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: "I understand your concern. Let me connect you with our specialized support team who can provide detailed assistance with your specific issue. In the meantime, here are some quick actions:",
      isBot: true,
      timestamp: new Date(),
      quickReplies: ['Track order', 'Contact support', 'View FAQ', 'Call customer care']
    };
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.botAvatar}>
              <Bot size={24} color="#FFFFFF" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>AquaBot AI Assistant</Text>
              <View style={styles.statusIndicator}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>Online • Instant replies</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Quick Suggestions */}
        <View style={styles.quickSuggestions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => sendMessage(suggestion.text)}
              >
                {suggestion.icon}
                <Text style={styles.suggestionText}>{suggestion.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              <View style={[
                styles.messageBubble,
                message.isBot ? styles.botMessage : styles.userMessage
              ]}>
                {message.isBot && (
                  <View style={styles.messageHeader}>
                    <Bot size={16} color="#2563EB" />
                    <Text style={styles.botName}>AquaBot</Text>
                  </View>
                )}
                <Text style={[
                  styles.messageText,
                  message.isBot ? styles.botMessageText : styles.userMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isBot ? styles.botMessageTime : styles.userMessageTime
                ]}>
                  {formatTime(message.timestamp)}
                </Text>
              </View>

              {/* Quick Replies */}
              {message.quickReplies && (
                <View style={styles.quickReplies}>
                  {message.quickReplies.map((reply, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickReplyButton}
                      onPress={() => handleQuickReply(reply)}
                    >
                      <Text style={styles.quickReplyText}>{reply}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#94A3B8"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Send size={20} color={inputText.trim() ? "#FFFFFF" : "#94A3B8"} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputFooter}>
            <View style={styles.aiPowered}>
              <Zap size={12} color="#F59E0B" />
              <Text style={styles.aiPoweredText}>Powered by AI • Instant responses</Text>
            </View>
            <TouchableOpacity style={styles.humanSupportButton}>
              <Headphones size={12} color="#2563EB" />
              <Text style={styles.humanSupportText}>Human Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#64748B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSuggestions: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 6,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  botName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginLeft: 6,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#1E293B',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  botMessageTime: {
    color: '#94A3B8',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  quickReplyButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickReplyText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
    marginHorizontal: 2,
  },
  typingDot1: {
    // Animation would be added here in a real implementation
  },
  typingDot2: {
    // Animation would be added here in a real implementation
  },
  typingDot3: {
    // Animation would be added here in a real implementation
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#2563EB',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiPowered: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiPoweredText: {
    fontSize: 10,
    color: '#64748B',
    marginLeft: 4,
  },
  humanSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  humanSupportText: {
    fontSize: 10,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
  },
});