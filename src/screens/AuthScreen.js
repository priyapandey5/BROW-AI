// src/screens/AuthScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleContinue = () => {
    // Navigation setup aane tak instant transition trigger karega
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Brand Header */}
          <View style={styles.brandContainer}>
            <View style={styles.logoBadge}>
              <Ionicons name="hardware-chip-outline" size={28} color={COLORS.primaryLight} />
            </View>
            <Text style={styles.brandTitle}>BROW AI</Text>
            <Text style={styles.brandSubtitle}>
              Market intelligence that <Text style={styles.highlightText}>thinks in structure</Text>
            </Text>
            <Text style={styles.brandDescription}>
              Indian equity, futures, options, crypto and global markets — analyzed, tracked and explained by BROW.
            </Text>
          </View>

          {/* Value Proposition Highlights */}
          <View style={styles.featureGrid}>
            <View style={styles.featurePill}>
              <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.bullish} />
              <Text style={styles.featurePillText}>Disciplined Risk & Stops</Text>
            </View>
            <View style={styles.featurePill}>
              <Ionicons name="flash-outline" size={16} color={COLORS.primaryLight} />
              <Text style={styles.featurePillText}>Real-Time Liquidity Flow</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isSignUp ? 'Create Workspace' : 'Welcome back'}
            </Text>
            <Text style={styles.formSub}>
              {isSignUp ? 'Start your institutional market journey' : 'Sign in to your workspace'}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Main Action Button */}
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleContinue}>
              <Text style={styles.primaryButtonText}>
                {isSignUp ? 'Get Started' : 'Sign In'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            {/* Fast Guest Bypass for Reviewers */}
            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.replace('MainTabs')}>
            <Text style={styles.guestButtonText}>Sign in as Guest</Text>
            </TouchableOpacity>

            {/* Switch Sign in / Sign up */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isSignUp ? 'Already have an account?' : 'New to BROW AI?'}
              </Text>
              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.switchAction}>
                  {isSignUp ? ' Sign In' : ' Create an account'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            Analysis & intelligence tools — not investment advice. Markets carry risk.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    marginBottom: 20,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 6,
    lineHeight: 28,
  },
  highlightText: {
    color: COLORS.primaryLight,
  },
  brandDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  featurePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  featurePillText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  formSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  guestButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  guestButtonText: {
    color: COLORS.primaryLight,
    fontSize: 13,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
  },
  switchText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  switchAction: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  disclaimer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 24,
    lineHeight: 14,
  },
});