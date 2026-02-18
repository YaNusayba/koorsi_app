// screens/auth/LoginScreen.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { AuthHeader, AuthWrapper, Divider, KButton, KInput } from '../../components/auth';

const LoginScreen = () => {
    const router = useRouter();
    const theme = getTheme(useColorScheme());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthWrapper theme={theme} glowColor={theme.primarySubtle}>

            {/* Logo */}
            <Animated.View
                entering={FadeInDown.duration(500).springify().damping(22)}
                style={styles.logoRow}
            >
                <Animated.View
                    entering={ZoomIn.delay(100).springify().damping(18)}
                    style={[styles.logoBox, {
                        backgroundColor: theme.primary,
                        borderRadius: KorsiTheme.radius.md,
                    }]}
                >
                    <Text style={[styles.logoLetter, {
                        fontFamily: KorsiTheme.fonts.sansBold,
                        color: theme.onPrimary,
                    }]}>
                        K
                    </Text>
                </Animated.View>
                <Text style={[{
                    color: theme.text,
                    fontFamily: KorsiTheme.fonts.sansBold,
                    fontSize: KorsiTheme.fontSizes.lg,
                }]}>
                    Koorsi
                </Text>
            </Animated.View>

            <AuthHeader
                title="Bon retour 👋"
                subtitle="Connecte-toi pour reprendre là où tu t'es arrêté."
                theme={theme}
                accentColor={theme.primary}
            />

            <View style={styles.form}>
                <KInput label="Email" placeholder="ton@email.com" value={email}
                    onChangeText={setEmail} keyboardType="email-address"
                    icon={Mail} theme={theme} delay={150} />

                <KInput label="Mot de passe" placeholder="••••••••" value={password}
                    onChangeText={setPassword} secureTextEntry
                    icon={Lock} theme={theme} delay={200} />

                <Animated.View entering={FadeInDown.delay(250).duration(400)}>
                    <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/ForgotPassword')}>
                        <Text style={[{
                            color: theme.primary,

                            fontSize: KorsiTheme.fontSizes.sm,
                        }]}>
                            Mot de passe oublié ?
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <KButton label="Se connecter" onPress={() => { }} theme={theme} delay={300} />

                <Divider theme={theme} />

                {/* Social buttons */}
                <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.socialRow}>
                    {['Google', 'Apple'].map((provider) => (
                        <TouchableOpacity
                            key={provider}
                            style={[styles.socialBtn, {
                                borderColor: theme.border,
                                backgroundColor: theme.card,
                                borderRadius: KorsiTheme.radius.lg,
                            }]}
                            activeOpacity={0.75}
                        >
                            <Text style={[{
                                color: theme.text,
                                fontFamily: KorsiTheme.fonts.sansMedium,
                                fontSize: KorsiTheme.fontSizes.sm,
                            }]}>
                                {provider}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            </View>

            {/* Footer */}
            <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.footer}>
                <Text style={[{ color: theme.muted, fontFamily: KorsiTheme.fonts.sans, fontSize: KorsiTheme.fontSizes.sm }]}>
                    Pas encore de compte ?
                </Text>
                <TouchableOpacity onPress={() => router.push('/Register')}>
                    <Text style={[{ color: theme.primary, fontFamily: KorsiTheme.fonts.sansBold, fontSize: KorsiTheme.fontSizes.sm }]}>
                        {' '}S'inscrire
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </AuthWrapper>
    );
};

const styles = StyleSheet.create({
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: KorsiTheme.spacing[2] },
    logoBox: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    logoLetter: { fontSize: 18 },
    form: { gap: KorsiTheme.spacing[4] },
    forgotBtn: { alignSelf: 'flex-end', marginTop: -KorsiTheme.spacing[1] },
    socialRow: { flexDirection: 'row', gap: KorsiTheme.spacing[3] },
    socialBtn: { flex: 1, paddingVertical: KorsiTheme.spacing[4] - 2, borderWidth: 1, alignItems: 'center' },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});

export default LoginScreen;