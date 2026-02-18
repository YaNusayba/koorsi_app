// screens/auth/RegisterScreen.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { useRouter } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { AuthHeader, AuthWrapper, KButton, KInput } from '../../components/auth';

type AuthScreen = 'login' | 'register' | 'forgot' | 'otp';

const RegisterScreen = () => {
    const router = useRouter();
    const theme = getTheme(useColorScheme());
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const strengthLevel =
        password.length === 0 ? 0 :
            password.length < 6 ? 1 :
                password.length < 10 ? 2 : 4;

    const strengthColor =
        strengthLevel <= 1 ? theme.danger :
            strengthLevel === 2 ? theme.accent :
                theme.success;

    const strengthLabel =
        strengthLevel === 0 ? '' :
            strengthLevel === 1 ? 'Faible' :
                strengthLevel === 2 ? 'Moyen' : 'Fort';

    return (
        <AuthWrapper theme={theme} glowColor={theme.successSoft}>

            <AuthHeader
                title="Crée ton compte"
                subtitle="Rejoins Koorsi et commence à traquer tes apprentissages."
                onBack={() => router.push('/Login')}
                theme={theme}
                accentColor={theme.success}
            />

            <View style={styles.form}>
                <KInput label="Nom d'utilisateur" placeholder="@tonpseudo" value={username}
                    onChangeText={setUsername} icon={User} theme={theme} delay={100} />

                <KInput label="Email" placeholder="ton@email.com" value={email}
                    onChangeText={setEmail} keyboardType="email-address"
                    icon={Mail} theme={theme} delay={150} />

                <KInput label="Mot de passe" placeholder="••••••••" value={password}
                    onChangeText={setPassword} secureTextEntry
                    icon={Lock} theme={theme} delay={200} />

                <KInput label="Confirmer le mot de passe" placeholder="••••••••" value={confirm}
                    onChangeText={setConfirm} secureTextEntry
                    icon={Lock} theme={theme} delay={250} />

                {/* Indicateur de force */}
                {password.length > 0 && (
                    <Animated.View entering={FadeIn.duration(300)} style={styles.strengthRow}>
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} style={[
                                styles.strengthBar,
                                {
                                    backgroundColor: i <= strengthLevel ? strengthColor : theme.border,
                                    borderRadius: KorsiTheme.radius.sm,
                                },
                            ]} />
                        ))}
                        <Text style={[{
                            color: strengthColor,
                            fontFamily: KorsiTheme.fonts.sansMedium,
                            fontSize: KorsiTheme.fontSizes.xs,
                            width: 40,
                        }]}>
                            {strengthLabel}
                        </Text>
                    </Animated.View>
                )}

                <KButton label="Créer mon compte" onPress={() => router.push('/(auth)/otp' as any)} theme={theme} delay={300} />

                {/* CGU */}
                <Animated.View entering={FadeInUp.delay(350).duration(400)}>
                    <Text style={[{
                        color: theme.muted,
                        fontFamily: KorsiTheme.fonts.sans,
                        fontSize: KorsiTheme.fontSizes.xs,
                        lineHeight: KorsiTheme.fontSizes.xs * KorsiTheme.lineHeights.relaxed,
                        textAlign: 'center',
                    }]}>
                        En continuant, tu acceptes nos{' '}
                        <Text style={{ color: theme.primary }}>Conditions d'utilisation</Text>
                        {' '}et notre{' '}
                        <Text style={{ color: theme.primary }}>Politique de confidentialité</Text>
                    </Text>
                </Animated.View>
            </View>

            {/* Footer */}
            <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.footer}>
                <Text style={[{ color: theme.muted, fontFamily: KorsiTheme.fonts.sans, fontSize: KorsiTheme.fontSizes.sm }]}>
                    Déjà un compte ?
                </Text>
                <TouchableOpacity onPress={() => router.push('/Login')}>
                    <Text style={[{ color: theme.primary, fontFamily: KorsiTheme.fonts.sansBold, fontSize: KorsiTheme.fontSizes.sm }]}>
                        {' '}Se connecter
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </AuthWrapper>
    );
};

const styles = StyleSheet.create({
    form: { gap: KorsiTheme.spacing[4] },
    strengthRow: { flexDirection: 'row', alignItems: 'center', gap: KorsiTheme.spacing[1] + 2, marginTop: -KorsiTheme.spacing[1] },
    strengthBar: { flex: 1, height: 3 },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});

export default RegisterScreen;