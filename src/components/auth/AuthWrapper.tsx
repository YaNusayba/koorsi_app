// components/auth/AuthWrapper.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import React from 'react';
import {
    Dimensions, KeyboardAvoidingView, Platform,
    ScrollView, StyleSheet, View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
type Theme = ReturnType<typeof getTheme>;

interface AuthWrapperProps {
    children: React.ReactNode;
    theme: Theme;
    glowColor: string;
}

export const AuthWrapper = ({ children, theme, glowColor }: AuthWrapperProps) => (
    <KeyboardAvoidingView
        style={[styles.screen, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <View style={[styles.glow, { backgroundColor: glowColor }]} pointerEvents="none" />
        <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    screen: { flex: 1 },
    glow: {
        position: 'absolute',
        top: -(height * 0.15),
        right: -(width * 0.2),
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: width * 0.425,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: KorsiTheme.spacing[6],
        paddingTop: KorsiTheme.spacing[16],
        paddingBottom: KorsiTheme.spacing[10],
        gap: KorsiTheme.spacing[6],
    },
});