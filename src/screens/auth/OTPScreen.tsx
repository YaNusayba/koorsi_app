// screens/auth/OTPScreen.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AuthHeader, AuthWrapper, KButton } from '../../components/auth';

type AuthScreen = 'login' | 'register' | 'forgot' | 'otp';

interface OTPScreenProps {
    onNavigate: (s: AuthScreen) => void;
    email?: string;
}

const OTPScreen = ({ onNavigate, email = 'ton@email.com' }: OTPScreenProps) => {
    const theme = getTheme(useColorScheme());
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (value.length > 1) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 5) inputs.current[index + 1]?.focus();
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <AuthWrapper theme={theme} glowColor={theme.dangerSoft}>

            <AuthHeader
                title="Vérifie ton email"
                subtitle={`On a envoyé un code à 6 chiffres à ${email}`}
                onBack={() => onNavigate('register')}
                theme={theme}
                accentColor={theme.danger}
            />

            <View style={styles.form}>
                {/* Champs OTP */}
                <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.otpRow}>
                    {otp.map((digit, i) => (
                        <TextInput
                            key={i}
                            ref={(r) => { inputs.current[i] = r; }}
                            style={[styles.otpInput, {
                                backgroundColor: theme.card,
                                borderColor: digit ? theme.danger : theme.border,
                                color: theme.text,
                                fontFamily: KorsiTheme.fonts.sansBold,
                                fontSize: KorsiTheme.fontSizes.xl,
                                borderRadius: KorsiTheme.radius.lg,
                            }]}
                            value={digit}
                            onChangeText={(v) => handleChange(v, i)}
                            onKeyPress={(e) => handleKeyPress(e, i)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                            selectTextOnFocus
                        />
                    ))}
                </Animated.View>

                <KButton label="Vérifier le code" onPress={() => { }} theme={theme} delay={200} />

                {/* Renvoyer */}
                <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.resendRow}>
                    <Text style={[{ color: theme.muted, fontFamily: KorsiTheme.fonts.sans, fontSize: KorsiTheme.fontSizes.sm }]}>
                        Tu n'as pas reçu de code ?{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text style={[{ color: theme.danger, fontFamily: KorsiTheme.fonts.sansMedium, fontSize: KorsiTheme.fontSizes.sm }]}>
                            Renvoyer
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

        </AuthWrapper>
    );
};

const styles = StyleSheet.create({
    form: { gap: KorsiTheme.spacing[4] },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: KorsiTheme.spacing[2] },
    otpInput: { flex: 1, aspectRatio: 0.85, borderWidth: 1.5, textAlign: 'center' },
    resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
export default OTPScreen;