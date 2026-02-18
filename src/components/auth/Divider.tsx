// components/auth/Divider.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type Theme = ReturnType<typeof getTheme>;

interface DividerProps {
    theme: Theme;
    label?: string;
}

export const Divider = ({ theme, label = 'ou continuer avec' }: DividerProps) => (
    <Animated.View entering={FadeIn.delay(300).duration(400)} style={styles.row}>
        <View style={[styles.line, { backgroundColor: theme.border }]} />
        <Text style={[styles.text, {
            color: theme.muted,
            fontFamily: KorsiTheme.fonts.sans,
            fontSize: KorsiTheme.fontSizes.sm,
        }]}>
            {label}
        </Text>
        <View style={[styles.line, { backgroundColor: theme.border }]} />
    </Animated.View>
);

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: KorsiTheme.spacing[3] },
    line: { flex: 1, height: 1 },
    text: {},
});