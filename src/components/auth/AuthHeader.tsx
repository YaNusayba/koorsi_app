// components/auth/AuthHeader.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

type Theme = ReturnType<typeof getTheme>;

interface AuthHeaderProps {
    title: string;
    subtitle: string;
    onBack?: () => void;
    theme: Theme;
    accentColor: string;
}

export const AuthHeader = ({ title, subtitle, onBack, theme, accentColor }: AuthHeaderProps) => (
    <Animated.View entering={FadeInDown.duration(500).springify().damping(22)}>
        {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack} hitSlop={12}>
                <ArrowLeft size={20} color={theme.text} strokeWidth={2} />
            </TouchableOpacity>
        )}

        <View style={styles.block}>
            <Animated.View
                entering={ZoomIn.delay(100).springify().damping(18)}
                style={[styles.accentBar, { backgroundColor: accentColor }]}
            />
            <Text style={[styles.title, {
                color: theme.text,
                fontFamily: KorsiTheme.fonts.serif,
                fontSize: KorsiTheme.fontSizes['2xl'],
                letterSpacing: KorsiTheme.letterSpacing.tight,
            }]}>
                {title}
            </Text>
            <Text style={[styles.subtitle, {
                color: theme.textSecondary,
                fontFamily: KorsiTheme.fonts.sans,
                fontSize: KorsiTheme.fontSizes.base,
                lineHeight: KorsiTheme.fontSizes.base * KorsiTheme.lineHeights.normal,
            }]}>
                {subtitle}
            </Text>
        </View>
    </Animated.View>
);

const styles = StyleSheet.create({
    backBtn: { marginBottom: KorsiTheme.spacing[6], alignSelf: 'flex-start' },
    block: { gap: KorsiTheme.spacing[2] },
    accentBar: { width: 28, height: 4, borderRadius: 2, marginBottom: KorsiTheme.spacing[1] },
    title: { lineHeight: 40 },
    subtitle: {},
});