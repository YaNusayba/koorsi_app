// components/auth/KInput.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
    FadeInDown, useAnimatedStyle, useSharedValue, withSpring,
} from 'react-native-reanimated';

type Theme = ReturnType<typeof getTheme>;

interface KInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (t: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: any;
    icon: any;
    theme: Theme;
    delay?: number;
    autoCapitalize?: any;
}

export const KInput = ({
    label, placeholder, value, onChangeText,
    secureTextEntry, keyboardType, icon: Icon,
    theme, delay = 0, autoCapitalize = 'none',
}: KInputProps) => {
    const [focused, setFocused] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const focusAnim = useSharedValue(0);

    const containerAnim = useAnimatedStyle(() => ({
        borderColor: focusAnim.value === 1 ? theme.borderPrimary : theme.border,
        transform: [{ scale: withSpring(focused ? 1.01 : 1, KorsiTheme.animation.spring.gentle) }],
    }));

    const labelAnim = useAnimatedStyle(() => ({
        color: focusAnim.value === 1 ? theme.primary : theme.textSecondary,
    }));

    return (
        <Animated.View
            entering={FadeInDown.delay(delay).duration(KorsiTheme.animation.duration.slow).springify().damping(22)}
            style={styles.wrapper}
        >
            <Animated.Text style={[
                styles.label,
                { fontFamily: KorsiTheme.fonts.sansMedium, fontSize: KorsiTheme.fontSizes.sm },
                labelAnim,
            ]}>
                {label}
            </Animated.Text>

            <Animated.View style={[
                styles.container,
                {
                    backgroundColor: theme.card,
                    borderColor: focused ? theme.borderPrimary : theme.border,
                    borderRadius: KorsiTheme.radius.lg,
                },
                containerAnim,
            ]}>
                <Icon size={18} color={focused ? theme.primary : theme.muted} strokeWidth={2} />

                <TextInput
                    style={[styles.input, {
                        color: theme.text,
                        fontFamily: KorsiTheme.fonts.sans,
                        fontSize: KorsiTheme.fontSizes.base,
                    }]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.muted}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => { setFocused(true); focusAnim.value = 1; }}
                    onBlur={() => { setFocused(false); focusAnim.value = 0; }}
                    secureTextEntry={secureTextEntry && !showPwd}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPwd(!showPwd)} hitSlop={8}>
                        {showPwd
                            ? <EyeOff size={18} color={theme.muted} strokeWidth={2} />
                            : <Eye size={18} color={theme.muted} strokeWidth={2} />}
                    </TouchableOpacity>
                )}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: { gap: KorsiTheme.spacing[1] },
    label: {},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: KorsiTheme.spacing[3],
        borderWidth: 1,
        paddingHorizontal: KorsiTheme.spacing[4],
        paddingVertical: KorsiTheme.spacing[4] - 2,
    },
    input: { flex: 1, padding: 0 },
});