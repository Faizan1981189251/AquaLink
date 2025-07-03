import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { X, Mic, MicOff, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

interface VoiceOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onOrderComplete: (orderData: any) => void;
}

export default function VoiceOrderModal({ visible, onClose, onOrderComplete }: VoiceOrderModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startListening = () => {
    if (Platform.OS === 'web') {
      // Web Speech API implementation
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';
        
        recognition.onstart = () => {
          setIsListening(true);
          speak("I'm listening. Please tell me what you'd like to order.");
        };
        
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            processVoiceOrder(finalTranscript);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          Alert.alert('Error', 'Speech recognition failed. Please try again.');
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        Alert.alert('Not Supported', 'Speech recognition is not supported in this browser.');
      }
    } else {
      // For mobile, you would use expo-speech or react-native-voice
      Alert.alert('Voice Order', 'Voice ordering is available on web. Mobile implementation requires additional setup.');
    }
  };

  const stopListening = () => {
    setIsListening(false);
    // Stop speech recognition
  };

  const speak = (text: string) => {
    Speech.speak(text, {
      language: 'en-IN',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  const processVoiceOrder = async (voiceText: string) => {
    setIsProcessing(true);
    
    try {
      // Simple NLP processing for demo
      const orderData = parseVoiceOrder(voiceText.toLowerCase());
      
      if (orderData.items.length > 0) {
        speak(`I understood you want ${orderData.items.map((item: any) => `${item.quantity} ${item.name}`).join(' and ')}. Shall I place this order?`);
        
        setTimeout(() => {
          onOrderComplete(orderData);
          onClose();
        }, 3000);
      } else {
        speak("I didn't understand your order. Please try again with items like '2 twenty liter jars' or '12 one liter bottles'.");
      }
    } catch (error) {
      console.error('Error processing voice order:', error);
      speak("Sorry, I couldn't process your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const parseVoiceOrder = (text: string) => {
    const items: any[] = [];
    
    // Simple pattern matching for demo
    const patterns = [
      { regex: /(\d+)\s*(twenty|20)\s*(liter|litre|l)\s*(jar|jars|bottle|bottles)/g, item: '20L Jar', price: 50 },
      { regex: /(\d+)\s*(one|1)\s*(liter|litre|l)\s*(bottle|bottles)/g, item: '1L Bottle', price: 10 },
      { regex: /(\d+)\s*(five hundred|500)\s*(ml|milliliter)\s*(bottle|bottles)/g, item: '500ml Bottle', price: 4 },
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.regex.exec(text)) !== null) {
        const quantity = parseInt(match[1]);
        if (quantity > 0) {
          items.push({
            name: pattern.item,
            quantity,
            price: pattern.price * quantity
          });
        }
      }
    });
    
    return {
      items,
      total: items.reduce((sum, item) => sum + item.price, 0),
      orderType: 'voice',
      timestamp: new Date().toISOString()
    };
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Voice Order</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Voice Interface */}
        <View style={styles.content}>
          <View style={styles.voiceContainer}>
            <View style={[styles.micContainer, isListening && styles.micContainerActive]}>
              <TouchableOpacity
                style={[styles.micButton, isListening && styles.micButtonActive]}
                onPress={isListening ? stopListening : startListening}
                disabled={isProcessing}
              >
                {isListening ? (
                  <MicOff size={48} color="#FFFFFF" />
                ) : (
                  <Mic size={48} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
            
            <Text style={styles.statusText}>
              {isProcessing 
                ? 'Processing your order...' 
                : isListening 
                  ? 'Listening... Speak now' 
                  : 'Tap to start voice order'
              }
            </Text>
            
            {transcript && (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptLabel}>You said:</Text>
                <Text style={styles.transcriptText}>{transcript}</Text>
              </View>
            )}
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>How to order by voice:</Text>
            <View style={styles.instructionsList}>
              <Text style={styles.instructionItem}>• "I want 2 twenty liter jars"</Text>
              <Text style={styles.instructionItem}>• "Order 12 one liter bottles"</Text>
              <Text style={styles.instructionItem}>• "Get me 24 five hundred ml bottles"</Text>
              <Text style={styles.instructionItem}>• "I need 1 twenty liter jar and 6 one liter bottles"</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => {
                speak("Welcome to AquaLink voice ordering. You can say things like 'I want 2 twenty liter jars' or 'Order 12 one liter bottles'.");
              }}
            >
              <Volume2 size={20} color="#2563EB" />
              <Text style={styles.quickActionText}>Hear Instructions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  voiceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  micContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  micContainerActive: {
    backgroundColor: '#FEE2E2',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#DC2626',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
  },
  transcriptContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  transcriptText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  quickActions: {
    alignItems: 'center',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 8,
  },
});