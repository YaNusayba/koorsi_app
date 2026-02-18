import { BookOpen, Brain, TrendingUp, Tv } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { getTheme, KorsiTheme } from '../themes/theme'; // hors de app/

// ─── Données ───────────────────────────────────────────────────────────────────

const features = [
    {
        icon: BookOpen,
        title: 'Lectures',
        description: 'Suis ta progression de lecture, note tes livres favoris et découvre de nouvelles pépites.',
        accentColor: '#A78BFA',
        accentBg: 'rgba(167, 139, 250, 0.12)',
        tag: 'Livres · Ebooks · Audio',
    },
    {
        icon: Tv,
        title: 'Animes & Dramas',
        description: 'Garde une trace de chaque épisode, saison et série. Ne perds plus jamais le fil.',
        accentColor: '#34D399',
        accentBg: 'rgba(52, 211, 153, 0.12)',
        tag: 'Saisons · Épisodes',
    },
    {
        icon: Brain,
        title: 'Mémorisation',
        description: 'Organise et suis ta mémorisation du Coran avec précision et des révisions structurées.',
        accentColor: '#FBBF24',
        accentBg: 'rgba(251, 191, 36, 0.12)',
        tag: 'Coran · Révisions',
    },
    {
        icon: TrendingUp,
        title: 'Progression',
        description: 'Visualise ta croissance avec des statistiques claires et motivantes sur tes habitudes.',
        accentColor: '#FB7185',
        accentBg: 'rgba(251, 113, 133, 0.12)',
        tag: 'Stats · Graphiques',
    },
];

// ─── Card individuelle ─────────────────────────────────────────────────────────

type FeatureCardProps = (typeof features)[0] & { index: number };

const FeatureCard = ({
    icon: Icon,
    title,
    description,
    accentColor,
    accentBg,
    tag,
    index,
}: FeatureCardProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(24)).current;
    const scaleAnim = useRef(new Animated.Value(0.97)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                damping: 20,
                stiffness: 160,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                damping: 20,
                stiffness: 160,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY }, { scale: scaleAnim }],
                    borderColor: accentColor + '28',
                },
            ]}
        >
            <View style={[styles.cardInner, { backgroundColor: 'rgba(20, 18, 24, 0.72)' }]}>

                {/* Icône */}
                <View style={[styles.iconBox, { backgroundColor: accentBg }]}>
                    <Icon size={20} color={accentColor} strokeWidth={2} />
                </View>

                {/* Texte */}
                <View style={styles.textBlock}>
                    <Text style={[
                        styles.cardTitle,
                        { color: 'rgba(255,255,255,0.90)', fontFamily: KorsiTheme.fonts.serif },
                    ]}>
                        {title}
                    </Text>
                    <Text style={[
                        styles.cardDesc,
                        { color: 'rgba(255,255,255,0.50)', fontFamily: KorsiTheme.fonts.sans },
                    ]}>
                        {description}
                    </Text>
                </View>

                {/* Tag */}
                <View style={[styles.tag, { backgroundColor: accentBg }]}>
                    <View style={[styles.tagDot, { backgroundColor: accentColor }]} />
                    <Text style={[
                        styles.tagText,
                        { color: accentColor, fontFamily: KorsiTheme.fonts.sansSemiBold },
                    ]}>
                        {tag}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

// ─── Grille de features ────────────────────────────────────────────────────────

const FeaturesGrid = () => {
    const colorScheme = useColorScheme();
    const theme = getTheme(colorScheme);

    const headerFade = useRef(new Animated.Value(0)).current;
    const headerY = useRef(new Animated.Value(16)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerFade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(headerY, {
                toValue: 0,
                damping: 22,
                stiffness: 160,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* En-tête de section */}
            <Animated.View
                style={[
                    styles.sectionHeader,
                    { opacity: headerFade, transform: [{ translateY: headerY }] },
                ]}
            >
                <View style={[
                    styles.sectionBadge,
                    { borderColor: theme.primary + '40', backgroundColor: theme.primarySubtle },
                ]}>
                    <Text style={[
                        styles.sectionBadgeText,
                        { color: theme.primary, fontFamily: KorsiTheme.fonts.sansSemiBold },
                    ]}>
                        CE QUE TU PEUX SUIVRE
                    </Text>
                </View>

                <Text style={[
                    styles.sectionTitle,
                    { color: theme.text, fontFamily: KorsiTheme.fonts.serif },
                ]}>
                    Tout ton univers culturel,{' '}
                    <Text style={{ color: theme.primary }}>en un seul endroit</Text>
                </Text>

                <Text style={[
                    styles.sectionSubtitle,
                    { color: theme.textSecondary, fontFamily: KorsiTheme.fonts.sans },
                ]}>
                    Koorsi s'adapte à tous tes contenus, de la première page au dernier épisode.
                </Text>
            </Animated.View>

            {/* Cards en grille 2 colonnes */}
            <View style={styles.grid}>
                {features.map((feature, index) => (
                    <FeatureCard key={feature.title} {...feature} index={index} />
                ))}
            </View>
        </ScrollView>
    );
};

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20, paddingBottom: 40, gap: 24 },

    sectionHeader: { gap: 12, alignItems: 'center', paddingVertical: 8 },
    sectionBadge: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
    sectionBadgeText: { fontSize: 11, letterSpacing: 1.2 },
    sectionTitle: { fontSize: 26, lineHeight: 34, letterSpacing: -0.4, textAlign: 'center' },
    sectionSubtitle: { fontSize: 14, lineHeight: 22, textAlign: 'center', maxWidth: 300 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

    card: { width: '48%', borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    cardInner: { padding: 16, gap: 12, flex: 1 },
    iconBox: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    textBlock: { gap: 6, flex: 1 },
    cardTitle: { fontSize: 15, lineHeight: 20, letterSpacing: -0.2 },
    cardDesc: { fontSize: 12, lineHeight: 18 },

    tag: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, alignSelf: 'flex-start' },
    tagDot: { width: 5, height: 5, borderRadius: 999 },
    tagText: { fontSize: 10, letterSpacing: 0.2 },
});

export default FeaturesGrid;