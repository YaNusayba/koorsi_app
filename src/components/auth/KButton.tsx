// components/auth/KButton.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
    FadeInUp, useAnimatedStyle, useSharedValue, withSpring,
} from 'react-native-reanimated';

type Theme = ReturnType<typeof getTheme>;

interface KButtonProps {
    label: string;
    onPress: () => void;
    theme: Theme;
    delay?: number;
}

export const KButton = ({ label, onPress, theme, delay = 0 }: KButtonProps) => {
    const scale = useSharedValue(1);
    const btnAnim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
    const { gentle, bouncy } = KorsiTheme.animation.spring;

    return (
        <Animated.View
            entering={FadeInUp.delay(delay).duration(KorsiTheme.animation.duration.slow).springify().damping(22)}
            style={btnAnim}
        >
            <TouchableOpacity
                style={[styles.btn, {
                    backgroundColor: theme.primary,
                    borderRadius: KorsiTheme.radius.lg,
                    shadowColor: theme.primary,
                }]}
                onPressIn={() => { scale.value = withSpring(0.97, gentle); }}
                onPressOut={() => { scale.value = withSpring(1, bouncy); }}
                onPress={onPress}
                activeOpacity={1}
            >
                <Text style={[styles.label, {
                    color: theme.onPrimary,
                    fontFamily: KorsiTheme.fonts.sansBold,
                    fontSize: KorsiTheme.fontSizes.md,
                }]}>
                    {label}
                </Text>
                <ChevronRight size={18} color={theme.onPrimary} strokeWidth={2.5} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: KorsiTheme.spacing[5] - 3,
        gap: KorsiTheme.spacing[2],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 16,
        elevation: KorsiTheme.elevation.lg,
    },
    label: {},
});