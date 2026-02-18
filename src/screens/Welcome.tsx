import { useRouter } from 'expo-router';
import {
  BookOpen,
  ChevronRight,
  Plus,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  interpolateColor,
  Layout,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOut
} from 'react-native-reanimated';
import { getTheme, KorsiTheme } from '../themes/theme';

const { width, height } = Dimensions.get('window');

const SPRING_CONFIG = { damping: 22, stiffness: 180, mass: 0.8 };
const SPRING_BOUNCY = { damping: 16, stiffness: 220, mass: 0.7 };

const SUGGESTIONS = [
  { label: '📚 Livres', color: '#A78BFA' },
  { label: '🎌 Animes', color: '#34D399' },
  { label: '🕌 Coran', color: '#FBBF24' },
  { label: '🎙️ Podcasts', color: '#FB7185' },
  { label: '📺 Séries', color: '#60A5FA' },
  { label: '🎓 Cours', color: '#F97316' },
  { label: '📖 Hadiths', color: '#A3E635' },
  { label: '🎮 Jeux vidéo', color: '#E879F9' },
];

const SLIDES = [
  {
    id: '1',
    type: 'standard' as const,
    badge: 'Découvrir',
    badgeIcon: Sparkles,
    preTitle: 'Tout ce que tu',
    highlight: 'apprends',
    description: 'Lectures, animes, dramas, podcasts… Centralise toute ta vie culturelle dans un espace pensé pour toi.',
    image: require('../../assets/images/f1.png'),
    accentColor: '#A78BFA',
    glowColor: '#7C3AED',
  },
  {
    id: '2',
    type: 'standard' as const,
    badge: 'Mémoriser',
    badgeIcon: Star,
    preTitle: 'Ne perds plus',
    highlight: 'le fil',
    description: "Koorsi se souvient exactement où tu t'es arrêté — page par page, épisode par épisode, sourate par sourate.",
    image: require('../../assets/images/f2-.png'),
    accentColor: '#34D399',
    glowColor: '#059669',
  },
  {
    id: '3',
    type: 'standard' as const,
    badge: 'Progresser',
    badgeIcon: Zap,
    preTitle: 'Mesure ta',
    highlight: 'croissance',
    description: "Des statistiques claires, des révisions intelligentes, une vue d'ensemble sur ton parcours culturel et spirituel.",
    image: require('../../assets/images/image copy 2.png'),
    accentColor: '#FBBF24',
    glowColor: '#D97706',
  },
  {
    id: '4',
    type: 'custom' as const,
    accentColor: '#A78BFA',
    glowColor: '#7C3AED',
  },
];

const AnimatedDot = ({ index, currentIndex, accentColor, borderColor }: any) => {
  const isActive = index === currentIndex;
  const dotStyle = useAnimatedStyle(() => ({
    width: withSpring(isActive ? 24 : 6, SPRING_BOUNCY),
    opacity: withSpring(isActive ? 1 : 0.4, SPRING_CONFIG),
    backgroundColor: isActive ? accentColor : borderColor,
  }));
  return <Animated.View style={[styles.dot, dotStyle]} />;
};

const StandardSlide = ({ item, index, scrollX, theme }: any) => {
  if (item.type !== 'standard') return null;
  const BadgeIcon = item.badgeIcon;

  const imageParallaxStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, [(index - 1) * width, index * width, (index + 1) * width], [-width * 0.2, 0, width * 0.2]);
    const scale = interpolate(scrollX.value, [(index - 1) * width, index * width, (index + 1) * width], [1.1, 1, 1.1]);
    return { transform: [{ translateX }, { scale }] };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollX.value, [(index - 0.6) * width, index * width, (index + 0.6) * width], [0, 1, 0]);
    const translateY = interpolate(scrollX.value, [(index - 0.5) * width, index * width, (index + 0.5) * width], [20, 0, -20]);
    return { opacity, transform: [{ translateY }] };
  });

  const badgeStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, [(index - 0.4) * width, index * width, (index + 0.4) * width], [0.8, 1, 0.8]);
    const opacity = interpolate(scrollX.value, [(index - 0.5) * width, index * width, (index + 0.5) * width], [0, 1, 0]);
    return { transform: [{ scale }], opacity };
  });

  return (
    <View style={styles.slide}>
      <View style={[styles.imageWrapper, { backgroundColor: theme.card }]}>
        <Animated.Image source={item.image} style={[styles.illustration, imageParallaxStyle]} resizeMode="cover" />
        <View style={[styles.imageOverlay, { backgroundColor: item.accentColor + '20' }]} />
        <View style={[styles.imageGradient, { backgroundColor: theme.background }]} />
      </View>

      <Animated.View style={[styles.textBlock, textStyle]}>
        {/* CORRECTION WARNING: Wrapper pour séparer Layout (textStyle) et Transform (badgeStyle) */}
        <Animated.View style={[styles.badge, { backgroundColor: item.accentColor + '18' }, badgeStyle]}>
          <BadgeIcon size={12} color={item.accentColor} strokeWidth={2.5} />
          <Text style={[styles.badgeText, { color: item.accentColor, fontFamily: KorsiTheme.fonts.sansSemiBold }]}>{item.badge}</Text>
        </Animated.View>

        <Text style={[styles.title, { color: theme.text, fontFamily: KorsiTheme.fonts.serif }]}>
          {item.preTitle} <Text style={{ color: item.accentColor }}>{item.highlight}</Text>
        </Text>

        <Text style={[styles.description, { color: theme.textSecondary, fontFamily: KorsiTheme.fonts.sans }]}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};

const FreedomSlide = ({ theme, selectedItems, onAdd, onRemove }: any) => {
  const [inputValue, setInputValue] = useState('');
  const availableSuggestions = SUGGESTIONS.filter((s) => !selectedItems.find((si: any) => si.label === s.label));

  const handleAddCustom = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || selectedItems.find((s: any) => s.label === trimmed)) return;
    const colors = ['#A78BFA', '#34D399', '#FBBF24', '#FB7185', '#60A5FA', '#F97316'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    onAdd({ label: trimmed, color });
    setInputValue('');
  };

  return (
    <KeyboardAvoidingView style={styles.slide} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.freedomHeader}>
        <View style={[styles.badge, { backgroundColor: '#A78BFA18', alignSelf: 'flex-start' }]}>
          <Sparkles size={12} color="#A78BFA" strokeWidth={2.5} />
          <Text style={[styles.badgeText, { color: '#A78BFA', fontFamily: KorsiTheme.fonts.sansSemiBold }]}>À toi de choisir</Text>
        </View>
        <Text style={[styles.title, { color: theme.text, fontFamily: KorsiTheme.fonts.serif }]}>
          Qu'est-ce que tu veux <Text style={{ color: '#A78BFA' }}>suivre ?</Text>
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary, fontFamily: KorsiTheme.fonts.sans }]}>
          Koorsi s'adapte à toi. Choisis ou invente tes propres catégories.
        </Text>
      </View>

      <View style={[styles.inputRow, { borderColor: theme.borderPrimary, backgroundColor: theme.card }]}>
        <TextInput
          style={[styles.input, { color: theme.text, fontFamily: KorsiTheme.fonts.sans }]}
          placeholder="Ex : Cours de droit, Hadiths…"
          placeholderTextColor={theme.muted}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddCustom}
          returnKeyType="done"
        />
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: inputValue.trim() ? '#A78BFA' : theme.border }]} onPress={handleAddCustom} activeOpacity={0.8}>
          <Plus size={16} color="#FFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {availableSuggestions.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
          {availableSuggestions.map((s) => (
            <TouchableOpacity key={s.label} style={[styles.suggestionChip, { borderColor: s.color + '50', backgroundColor: s.color + '12' }]} onPress={() => onAdd(s)} activeOpacity={0.7}>
              <Text style={[styles.suggestionText, { color: s.color, fontFamily: KorsiTheme.fonts.sansMedium }]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.selectedGrid}>
        {selectedItems.map((item: any) => (
          <Animated.View key={item.label} entering={ZoomIn.springify().damping(18).stiffness(220)} exiting={ZoomOut.duration(200)} layout={Layout.springify()} style={[styles.selectedCard, { borderColor: item.color + '35', backgroundColor: item.color + '10' }]}>
            <Text style={[styles.selectedCardText, { color: item.color, fontFamily: KorsiTheme.fonts.sansSemiBold }]}>{item.label}</Text>
            <TouchableOpacity onPress={() => onRemove(item.label)} hitSlop={8}>
              <X size={13} color={item.color} strokeWidth={2.5} />
            </TouchableOpacity>
          </Animated.View>
        ))}
        {selectedItems.length === 0 && (
          <Animated.View entering={FadeIn.duration(400)} style={[styles.emptyHint, { borderColor: theme.border }]}>
            <Text style={[styles.emptyHintText, { color: theme.muted, fontFamily: KorsiTheme.fonts.sans }]}>Tes catégories apparaîtront ici ✦</Text>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const Welcome = () => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<{ label: string; color: string }[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const isLastSlide = currentIndex === SLIDES.length - 1;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => { scrollX.value = event.contentOffset.x; },
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      runOnJS(setCurrentIndex)(idx);
    }
  }, []);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  const goToNext = () => { flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true }); };

  const handleAdd = (item: any) => { setSelectedItems((prev) => [...prev, item]); };
  const handleRemove = (label: string) => { setSelectedItems((prev) => prev.filter((i) => i.label !== label)); };

  const glowStyle = useAnimatedStyle(() => {
    const inputRange = SLIDES.map((_, i) => i * width);
    const bgColor = interpolateColor(scrollX.value, inputRange, SLIDES.map((s) => s.glowColor + '14'));
    return { backgroundColor: bgColor };
  });

  const nextBtnStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isLastSlide ? 0 : 1, { duration: 250 }),
    transform: [{ translateY: withSpring(isLastSlide ? -12 : 0, SPRING_CONFIG) }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isLastSlide ? 1 : 0, { duration: 350, easing: Easing.out(Easing.cubic) }),
    transform: [{ translateY: withSpring(isLastSlide ? 0 : 18, SPRING_CONFIG) }],
  }));

  // REDIRECTIONS CORRIGÉES
  const handleFinish = () => { router.push('/Register'); };
  const goToLogin = () => { router.push('/Login'); };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.bgGlow, glowStyle]} pointerEvents="none" />

      <Animated.View entering={FadeInDown.duration(500).springify().damping(22)} style={styles.header}>
        <Animated.View entering={ZoomIn.delay(100).springify().damping(18)} style={[styles.logoBox, { backgroundColor: theme.primary }]}>
          <BookOpen size={18} color="#FFF" strokeWidth={2.5} />
        </Animated.View>
        <Text style={[styles.logoText, { color: theme.text, fontFamily: KorsiTheme.fonts.sansBold }]}>Koorsi</Text>
        <TouchableOpacity style={styles.skipBtn} activeOpacity={0.6} onPress={goToLogin}>
          <Text style={[styles.skipText, { color: theme.muted, fontFamily: KorsiTheme.fonts.sansMedium }]}>Passer</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          item.type === 'custom'
            ? <FreedomSlide theme={theme} selectedItems={selectedItems} onAdd={handleAdd} onRemove={handleRemove} />
            : <StandardSlide item={item} index={index} scrollX={scrollX} theme={theme} />
        )}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <AnimatedDot key={i} index={i} currentIndex={currentIndex} accentColor={SLIDES[currentIndex].accentColor} borderColor={theme.border} />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {/* CORRECTION WARNING: Wrapper parent pour le Layout (FadeInUp) et enfant pour le Transform (nextBtnStyle) */}
          <Animated.View entering={FadeInUp.delay(200).springify()} pointerEvents={isLastSlide ? 'none' : 'auto'} style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.btnPrimaryContainer, nextBtnStyle]}>
              <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: theme.primary }]} onPress={goToNext} activeOpacity={0.85}>
                <Text style={[styles.btnPrimaryText, { fontFamily: KorsiTheme.fonts.sansBold }]}>Suivant</Text>
                <ChevronRight size={18} color="#FFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View pointerEvents={isLastSlide ? 'auto' : 'none'}>
            <Animated.View style={ctaStyle}>
              <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: theme.primary }]} activeOpacity={0.85} onPress={handleFinish}>
                <Text style={[styles.btnPrimaryText, { fontFamily: KorsiTheme.fonts.sansBold }]}>
                  {selectedItems.length > 0 ? `Commencer avec ${selectedItems.length} catégories` : "Commencer l'aventure"}
                </Text>
                <ChevronRight size={18} color="#FFF" strokeWidth={2.5} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.6} onPress={goToLogin}>
                <Text style={[styles.btnSecondaryText, { color: theme.textSecondary, fontFamily: KorsiTheme.fonts.sansMedium }]}>J'ai déjà un compte</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGlow: { position: 'absolute', top: -height * 0.2, right: -width * 0.25, width: width * 0.9, height: width * 0.9, borderRadius: width * 0.45 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 8 },
  logoBox: { padding: 7, borderRadius: 10 },
  logoText: { fontSize: 19, fontWeight: '700', letterSpacing: -0.3 },
  skipBtn: { marginLeft: 'auto' },
  skipText: { fontSize: 14 },
  flatList: { flex: 1 },
  slide: { width, flex: 1, paddingHorizontal: 24, paddingTop: 16, gap: 20 },
  imageWrapper: { width: '100%', flex: 1, maxHeight: height * 0.38, borderRadius: 24, overflow: 'hidden' },
  illustration: { width: '100%', height: '100%' },
  imageOverlay: { ...StyleSheet.absoluteFillObject },
  imageGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, opacity: 0.6 },
  textBlock: { gap: 12, paddingBottom: 4 },
  freedomHeader: { gap: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, letterSpacing: 0.2 },
  title: { fontSize: 32, lineHeight: 40, letterSpacing: -0.5 },
  description: { fontSize: 15, lineHeight: 24 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  input: { flex: 1, fontSize: 15, padding: 0 },
  addBtn: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  suggestionsRow: { gap: 8, paddingRight: 8 },
  suggestionChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  suggestionText: { fontSize: 13 },
  selectedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, flex: 1, alignContent: 'flex-start' },
  selectedCard: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, borderWidth: 1 },
  selectedCardText: { fontSize: 13 },
  emptyHint: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14, alignSelf: 'flex-start' },
  emptyHintText: { fontSize: 13 },
  footer: { paddingHorizontal: 24, paddingBottom: 44, gap: 20 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
  buttonContainer: { height: 120, justifyContent: 'flex-start' },
  btnPrimaryContainer: { width: '100%' },
  btnPrimary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 28,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  btnPrimaryText: { color: '#FFF', fontSize: 16, letterSpacing: -0.1 },
  btnSecondary: { paddingVertical: 12, alignItems: 'center' },
  btnSecondaryText: { fontSize: 14 },
});

export default Welcome;