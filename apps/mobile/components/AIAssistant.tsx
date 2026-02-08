import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated as RNAnimated,
} from "react-native";
import { useTheme } from "@repo/ui";

export type AIAssistantProps = {
  visible: boolean;
  onClose: () => void;
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const SUGGESTIONS = [
  "Order room service",
  "Book spa appointment",
  "Request housekeeping",
  "Find nearby restaurants",
  "Check pool hours",
];

const AI_RESPONSES: Record<string, string> = {
  "order room service": "I'd be happy to help you order room service! 🍽️\n\nWould you like to see our menu? We have breakfast, lunch, dinner, and late-night options available 24/7.",
  "book spa appointment": "Great choice! 💆‍♀️\n\nOur spa offers massages, facials, and wellness treatments. The earliest available slot is today at 2:00 PM. Would you like me to book that for you?",
  "request housekeeping": "I'll arrange housekeeping for you right away! 🧹\n\nWould you like:\n• Full room cleaning\n• Fresh towels only\n• Turndown service\n\nJust let me know your preference.",
  "find nearby restaurants": "Here are some top-rated restaurants nearby: 🍴\n\n1. **La Terrazza** - Italian (0.2 mi)\n2. **Sakura** - Japanese (0.3 mi)\n3. **The Grill House** - American (0.4 mi)\n\nWould you like me to make a reservation?",
  "check pool hours": "Our pool facilities are open: 🏊\n\n• Indoor Pool: 6 AM - 10 PM\n• Outdoor Pool: 7 AM - 8 PM\n• Hot Tub: 8 AM - 10 PM\n\nTowels are available poolside. Enjoy!",
  "default": "I'm here to help make your stay amazing! 🌟\n\nI can assist you with:\n• Room service & dining\n• Spa & wellness bookings\n• Housekeeping requests\n• Local recommendations\n• Hotel amenities info\n\nWhat would you like help with?",
};

export function AIAssistant({ visible, onClose }: AIAssistantProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    accent: "#6750A4",
    accentLight: isDark ? "#D0BCFF" : "#EADDFF",
    border: isDark ? "#49454F" : "#CAC4D0",
    userBubble: "#6750A4",
    aiBubble: isDark ? "#2B2930" : "#F3EDF7",
  };

  useEffect(() => {
    if (visible) {
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      // Welcome message
      if (messages.length === 0) {
        setTimeout(() => {
          addAIMessage("Hello! 👋 I'm your Self-Service AI assistant. How can I help make your stay exceptional today?");
        }, 300);
      }
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const addAIMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date(),
    }]);
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const lowerText = messageText.toLowerCase();
      const response = Object.entries(AI_RESPONSES).find(([key]) => 
        lowerText.includes(key)
      )?.[1] || AI_RESPONSES.default;
      addAIMessage(response);
    }, 1000 + Math.random() * 500);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSuggestionPress = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleClose = () => {
    setMessages([]);
    setInputText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <RNAnimated.View
          style={[
            styles.overlay,
            { opacity: fadeAnim },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleClose}
          />
        </RNAnimated.View>

        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <View style={styles.headerLeft}>
              <View style={[styles.avatarContainer, { backgroundColor: colors.accentLight }]}>
                <Text style={[styles.avatarIcon, { color: colors.accent }]}>✦</Text>
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Self-Service AI</Text>
                <Text style={[styles.headerSubtitle, { color: colors.subtle }]}>Always here to help</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={[styles.closeIcon, { color: colors.subtle }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userBubble : styles.aiBubble,
                  {
                    backgroundColor: message.isUser ? colors.userBubble : colors.aiBubble,
                  },
                ]}
              >
                {!message.isUser && (
                  <Text style={styles.aiIcon}>✦</Text>
                )}
                <Text
                  style={[
                    styles.messageText,
                    { color: message.isUser ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            ))}

            {isTyping && (
              <View style={[styles.messageBubble, styles.aiBubble, { backgroundColor: colors.aiBubble }]}>
                <Text style={styles.aiIcon}>✦</Text>
                <Text style={[styles.typingText, { color: colors.subtle }]}>typing...</Text>
              </View>
            )}

            {/* Suggestions (show when no messages or few messages) */}
            {messages.length <= 1 && !isTyping && (
              <View style={styles.suggestionsContainer}>
                <Text style={[styles.suggestionsTitle, { color: colors.subtle }]}>
                  Quick actions
                </Text>
                <View style={styles.suggestionsList}>
                  {SUGGESTIONS.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={[styles.suggestionChip, { backgroundColor: colors.backgroundStrong, borderColor: colors.border }]}
                      onPress={() => handleSuggestionPress(suggestion)}
                    >
                      <Text style={[styles.suggestionText, { color: colors.text }]}>
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputContainer, { backgroundColor: colors.backgroundStrong, borderTopColor: colors.border }]}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Ask me anything..."
              placeholderTextColor={colors.subtle}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? colors.accent : colors.border },
              ]}
              onPress={() => handleSend()}
              disabled={!inputText.trim()}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    height: "85%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "500",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 14,
    borderRadius: 18,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  aiIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  typingText: {
    fontSize: 15,
    fontStyle: "italic",
  },
  suggestionsContainer: {
    marginTop: 16,
  },
  suggestionsTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  suggestionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1,
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
