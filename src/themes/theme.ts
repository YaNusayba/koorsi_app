// ─────────────────────────────────────────────
//  KorsiTheme — Design System v2
//  Mobile (React Native) + Web (CSS variables)
// ─────────────────────────────────────────────

// ── 1. Palette fondamentale ──────────────────
const palette = {
    // Violets — couleur de marque
    violet50: '#F5F3FF',
    violet100: '#EDE9FE',
    violet200: '#DDD6FE',
    violet300: '#C4B5FD',
    violet400: '#A78BFA',
    violet500: '#8B5CF6',
    violet600: '#7C3AED',
    violet700: '#6D28D9',
    violet800: '#5B21B6',
    violet900: '#4C1D95',

    // Ambre — accent chaud pour les highlights
    amber300: '#FCD34D',
    amber400: '#FBBF24',
    amber500: '#F59E0B',

    // Émeraude — succès / progression
    emerald400: '#34D399',
    emerald500: '#10B981',

    // Rose — erreur / abandon
    rose400: '#FB7185',
    rose500: '#F43F5E',

    // Neutres chauds (pas du gris pur)
    warmWhite: '#FAFAF9',
    warmGray50: '#F5F5F4',
    warmGray100: '#E7E5E4',
    warmGray200: '#D6D3D1',
    warmGray400: '#A8A29E',
    warmGray500: '#78716C',
    warmGray600: '#57534E',
    warmGray700: '#44403C',
    warmGray800: '#292524',
    warmGray900: '#1C1917',
    warmGray950: '#0C0A09',

    // Noir / blanc purs
    white: '#FFFFFF',
    black: '#0D0D0F',
};

// ── 2. Tokens sémantiques ────────────────────



export const KorsiTheme = {

    // ── Mode clair ────────────────────────────
    light: {
        // Surfaces
        background: palette.warmGray50,
        backgroundAlt: palette.warmWhite,
        surface: palette.white,
        surfaceRaised: palette.white,
        card: palette.white,
        cardHover: palette.violet50,

        // Marque
        primary: palette.violet600,
        primaryLight: palette.violet400,
        primarySoft: palette.violet100,
        primarySubtle: palette.violet50,

        // Accents
        accent: palette.amber400,
        accentSoft: '#FEF3C7',
        success: palette.emerald500,
        successSoft: '#D1FAE5',
        danger: palette.rose500,
        dangerSoft: '#FFE4E6',

        // Typographie
        text: palette.warmGray900,
        textSecondary: palette.warmGray600,
        muted: palette.warmGray400,
        placeholder: palette.warmGray200,
        onPrimary: palette.white,

        // Bordures
        border: palette.warmGray100,
        borderStrong: palette.warmGray200,
        borderPrimary: palette.violet200,

        // Ombres (valeurs pour `elevation` sur RN ou `box-shadow` sur web)
        shadowSm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        shadowMd: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        shadowLg: '0 10px 30px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        shadowGlow: '0 0 20px rgba(139, 92, 246, 0.25), 0 4px 12px rgba(139, 92, 246, 0.15)',

        // Overlay (modals, drawers)
        overlay: 'rgba(15, 15, 20, 0.45)',

        // Glassmorphism (web only)
        glass: {
            background: 'rgba(255, 255, 255, 0.65)',
            border: 'rgba(255, 255, 255, 0.80)',
            backdrop: 'blur(16px) saturate(180%)',
            shadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
    },

    // ── Mode sombre ───────────────────────────
    dark: {
        // Surfaces
        background: palette.warmGray950,
        backgroundAlt: palette.black,
        surface: palette.warmGray900,
        surfaceRaised: palette.warmGray800,
        card: palette.warmGray800,
        cardHover: palette.warmGray700,

        // Marque
        primary: palette.violet400,
        primaryLight: palette.violet300,
        primarySoft: 'rgba(139, 92, 246, 0.18)',
        primarySubtle: 'rgba(139, 92, 246, 0.08)',

        // Accents
        accent: palette.amber300,
        accentSoft: 'rgba(252, 211, 77, 0.12)',
        success: palette.emerald400,
        successSoft: 'rgba(52, 211, 153, 0.12)',
        danger: palette.rose400,
        dangerSoft: 'rgba(251, 113, 133, 0.12)',

        // Typographie
        text: palette.warmGray50,
        textSecondary: palette.warmGray400,
        muted: palette.warmGray500,
        placeholder: palette.warmGray700,
        onPrimary: palette.white,

        // Bordures
        border: palette.warmGray700,
        borderStrong: palette.warmGray600,
        borderPrimary: 'rgba(167, 139, 250, 0.35)',

        // Ombres
        shadowSm: '0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20)',
        shadowMd: '0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.20)',
        shadowLg: '0 10px 30px rgba(0,0,0,0.40), 0 4px 8px rgba(0,0,0,0.25)',
        shadowGlow: '0 0 24px rgba(167, 139, 250, 0.30), 0 4px 16px rgba(167, 139, 250, 0.20)',

        // Overlay
        overlay: 'rgba(0, 0, 0, 0.65)',

        // Glassmorphism (web only)
        glass: {
            background: 'rgba(28, 25, 23, 0.70)',
            border: 'rgba(255, 255, 255, 0.08)',
            backdrop: 'blur(20px) saturate(160%)',
            shadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        },
    },

    // ── Typographie ───────────────────────────
    fonts: {
        // React Native (fichiers dans assets/fonts/)
        serif: 'Lora-Bold',
        serifItalic: 'Lora-BoldItalic',
        sans: 'PlusJakartaSans-Regular',
        sansMedium: 'PlusJakartaSans-Medium',
        sansSemiBold: 'PlusJakartaSans-SemiBold',
        sansBold: 'PlusJakartaSans-Bold',
        mono: 'JetBrainsMono-Regular', // pour ISBN, codes, etc.
    },

    fontSizes: {
        xs: 11,
        sm: 13,
        base: 15,
        md: 17,
        lg: 20,
        xl: 24,
        '2xl': 30,
        '3xl': 38,
        '4xl': 48,
    },

    lineHeights: {
        tight: 1.2,
        snug: 1.35,
        normal: 1.5,
        relaxed: 1.65,
        loose: 1.85,
    },

    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.4,
        wider: 0.8,
        widest: 1.5,
    },

    // ── Spacing ───────────────────────────────
    spacing: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
        10: 40,
        12: 48,
        16: 64,
        20: 80,
        24: 96,
    },

    // ── Border radius ─────────────────────────
    radius: {
        sm: 6,
        md: 10,
        lg: 16,
        xl: 22,
        '2xl': 30,
        full: 9999,
    },

    // ── Animations (Reanimated / CSS) ─────────
    animation: {
        // Durées en ms
        duration: {
            instant: 80,
            fast: 150,
            normal: 280,
            slow: 450,
            slower: 600,
        },
        // Courbes d'easing (utilisables comme string dans CSS ou Reanimated Easing)
        easing: {
            spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // rebond léger
            out: 'cubic-bezier(0.16, 1, 0.3, 1)',      // ease-out expo
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
        },
        // Configs Reanimated withSpring
        spring: {
            gentle: { damping: 20, stiffness: 120, mass: 0.8 },
            bouncy: { damping: 14, stiffness: 180, mass: 0.6 },
            snappy: { damping: 28, stiffness: 300, mass: 0.7 },
        },
    },

    // ── Opacités sémantiques ──────────────────
    opacity: {
        disabled: 0.38,
        subtle: 0.60,
        medium: 0.80,
        full: 1.0,
    },

    // ── Élévations React Native ───────────────
    elevation: {
        none: 0,
        sm: 2,
        md: 6,
        lg: 12,
        xl: 20,
    },

    // ── Palette brute (pour cas avancés) ──────
    palette,
};

// ── 3. Helpers utilitaires ───────────────────

/** Ajoute de l'opacité à une couleur HEX — ex: hexAlpha('#8B5CF6', 0.2) */
export function hexAlpha(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Retourne le thème courant selon le scheme passé */
export function getTheme(scheme: 'light' | 'dark' | null | undefined): typeof KorsiTheme.light {
    return scheme === 'dark' ? KorsiTheme.dark : KorsiTheme.light;
}

// Export default requis pour que le fichier ne soit pas traité
// comme une route par Expo Router (à combiner avec le déplacement hors de app/)
export default KorsiTheme;