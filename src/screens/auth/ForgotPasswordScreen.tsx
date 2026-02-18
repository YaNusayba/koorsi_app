// screens/auth/ForgotPasswordScreen.tsx
import { getTheme, KorsiTheme } from '@/src/themes/theme';
import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { AuthHeader, AuthWrapper, KButton, KInput } from '../../components/auth';



// ─── État succès ──────────────────────────────────────────────────────────────
const SentView = ({
    email, onBack, theme,
}: {
    email: string;
    onBack: () => void;
    theme: ReturnType<typeof getTheme>;
}) => (
    <View style={[styles.centeredScreen, { backgroundColor: theme.background }]}>
        <View style={[styles.glow, { backgroundColor: theme.accentSoft }]} pointerEvents="none" />

        <Animated.View
            entering={ZoomIn.springify().damping(18)}
            style={[styles.successIcon, { backgroundColor: theme.accentSoft, borderRadius: KorsiTheme.radius.full }]}
        >
            <Mail size={40} color={theme.accent} strokeWidth={1.5} />
        </Animated.View>

        <Animated.Text
            entering={FadeInDown.delay(200).duration(400)}
            style={[{
                color: theme.text,
                fontFamily: KorsiTheme.fonts.serif,
                fontSize: KorsiTheme.fontSizes['2xl'],
                textAlign: 'center',
            }]}
        >
            Email envoyé ✓
        </Animated.Text>

        <Animated.Text
            entering={FadeInDown.delay(300).duration(400)}
            style={[{
                color: theme.textSecondary,
                fontFamily: KorsiTheme.fonts.sans,
                fontSize: KorsiTheme.fontSizes.base,
                lineHeight: KorsiTheme.fontSizes.base * KorsiTheme.lineHeights.relaxed,
                textAlign: 'center',
                paddingHorizontal: KorsiTheme.spacing[6],
            }]}
        >
            Vérifie ta boîte mail — un lien de réinitialisation a été envoyé à {email}
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.backBtnWrapper}>
            <KButton label="Retour à la connexion" onPress={onBack} theme={theme} />
        </Animated.View>
    </View>
);

// ─── Écran principal ──────────────────────────────────────────────────────────
const ForgotPasswordScreen = () => {
    const router = useRouter();
    const theme = getTheme(useColorScheme());
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const goToLogin = () => {
        router.push('/Login');
    };
    if (sent) {
        return (
            <SentView
                email={email}
                onBack={goToLogin}
                theme={theme}
            />
        );
    }

    return (
        <AuthWrapper theme={theme} glowColor={theme.accentSoft}>
            <AuthHeader
                title="Mot de passe oublié ?"
                subtitle="Pas de panique. Entre ton email et on t'envoie un lien pour le réinitialiser."
                onBack={goToLogin}
                theme={theme}
                accentColor={theme.accent}
            />

            <View style={styles.form}>
                <KInput label="Email" placeholder="ton@email.com" value={email}
                    onChangeText={setEmail} keyboardType="email-address"
                    icon={Mail} theme={theme} delay={150} />

                <KButton label="Envoyer le lien" onPress={() => setSent(true)} theme={theme} delay={250} />
            </View>
        </AuthWrapper>
    );
};

const styles = StyleSheet.create({
    centeredScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: KorsiTheme.spacing[4],
    },
    glow: {
        position: 'absolute',
        top: -200,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
    },
    successIcon: {
        width: 88,
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: KorsiTheme.spacing[2],
    },
    backBtnWrapper: {
        width: '100%',
        paddingHorizontal: KorsiTheme.spacing[6],
    },
    form: { gap: KorsiTheme.spacing[4] },
});
export default ForgotPasswordScreen;