import CustomCarousel from "@/components/button/carousel";
import CustomFlatList from "@/components/custom_flatlist";
import { BANNER_IMAGE_ROUTES, ICON_IMAGE_ROUTES } from "@/data/image_routes";
import { getFilmCollection } from "@/services/film_api";
import { HomeFilmSection } from "@/types/film";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

const HOME_SECTIONS: Omit<HomeFilmSection, "data">[] = [
  {
    endpoint: "/api/category/phim-le?page=1&limit=10",
    key: "feature-films",
    title: "Feature Films",
  },
  {
    endpoint: "/api/category/phim-bo?page=1&limit=10",
    key: "series",
    title: "Series",
  },
  {
    endpoint: "/api/category/hoat-hinh?page=1&limit=10",
    key: "animation",
    title: "Animation",
  },
];

function HomePage() {
  const router = useRouter();
  const [filmSections, setFilmSections] = useState<HomeFilmSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadHomeFilms = async () => {
      try {
        const sections = await Promise.all(
          HOME_SECTIONS.map(async (section) => ({
            ...section,
            data: await getFilmCollection(section.endpoint),
          })),
        );

        if (isMounted) {
          setFilmSections(sections);
        }
      } catch (error) {
        console.log("Load home films error:", error);

        if (isMounted) {
          setFilmSections(
            HOME_SECTIONS.map((section) => ({
              ...section,
              data: [],
            })),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadHomeFilms();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={filmSections}
        style={styles.list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {item.data.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.posterRow}
              >
                {item.data.map((film) => (
                  <Pressable
                    key={film.id}
                    onPress={() => {
                      router.navigate("/(detail)/film_detail");
                    }}
                    style={styles.posterCard}
                  >
                    {film.posterUrl ? (
                      <Image
                        source={{ uri: film.posterUrl }}
                        style={styles.posterImage}
                      />
                    ) : (
                      <View style={[styles.posterImage, styles.posterFallback]}>
                        <Feather name="film" size={24} color="#F97316" />
                      </View>
                    )}
                    <Text numberOfLines={2} style={styles.posterTitle}>
                      {film.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.posterSubtitle}>
                      {film.subtitle || "Now streaming"}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptySection}>
                <Feather name="inbox" size={18} color="#F97316" />
                <Text style={styles.emptySectionText}>
                  No films available for this topic right now.
                </Text>
              </View>
            )}
          </View>
        )}
        HeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Current Location</Text>
            <View style={styles.locationRow}>
              <View style={styles.locationPinWrap}>
                <Entypo name="location-pin" size={18} color="#F97316" />
              </View>
              <View style={styles.locationTextBlock}>
                <Text style={styles.locationTitle}>Deliver to</Text>
                <Text style={styles.locationValue}>1261 Dufferin Street</Text>
              </View>
            </View>
          </View>
        }
        StickyElementComponent={
          <View style={styles.sticky}>
            <View style={styles.fakeInput}>
              <View style={styles.fakeInputLeft}>
                <Entypo name="magnifying-glass" size={18} color="#94A3B8" />
                <Text style={styles.fakeInputPlaceholder}>
                  Search films, actors, genres
                </Text>
              </View>
              <View style={styles.fakeInputAction}>
                <Feather name="sliders" size={14} color="#F97316" />
              </View>
            </View>
          </View>
        }
        TopListElementComponent={
          <View style={styles.topList}>
            <CustomCarousel
              items={BANNER_IMAGE_ROUTES}
              styles={{
                height: width / 3.7,
                resizeMode: "cover",
                width: width,
              }}
            />

            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled
              alwaysBounceHorizontal={false}
              contentContainerStyle={styles.iconScroller}
            >
              {ICON_IMAGE_ROUTES.map((item) => (
                <View key={item.key} style={styles.iconCard}>
                  <Image source={item.src} style={styles.iconImage} />
                  <Text numberOfLines={1} style={styles.iconLabel}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.discoveryHeader}>
              <View>
                <Text style={styles.discoveryKicker}>Fresh Picks</Text>
                <Text style={styles.discoveryTitle}>Browse By Topic</Text>
              </View>
              {isLoading ? (
                <ActivityIndicator color="#F97316" />
              ) : (
                <Feather name="zap" size={18} color="#F97316" />
              )}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  list: {
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#FFF7ED",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%",
  },
  headerLabel: {
    color: "#9A3412",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  locationPinWrap: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: 40,
  },
  locationTextBlock: {
    flex: 1,
  },
  locationTitle: {
    color: "#78716C",
    fontSize: 12,
    marginBottom: 2,
  },
  locationValue: {
    color: "#1C1917",
    fontSize: 18,
    fontWeight: "700",
  },
  sticky: {
    backgroundColor: "#FFF7ED",
    paddingBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%",
  },
  fakeInput: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#FED7AA",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44,
    paddingHorizontal: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  fakeInputLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  fakeInputPlaceholder: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "500",
  },
  fakeInputAction: {
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  topList: {
    paddingBottom: 8,
    width: "100%",
  },
  iconScroller: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  iconCard: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 64,
  },
  iconImage: {
    height: 35,
    marginBottom: 6,
    width: 35,
  },
  iconLabel: {
    color: "#57534E",
    fontSize: 11,
    textAlign: "center",
  },
  discoveryHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  discoveryKicker: {
    color: "#C2410C",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  discoveryTitle: {
    color: "#1C1917",
    fontSize: 22,
    fontWeight: "800",
  },
  sectionBlock: {
    marginTop: 22,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#1C1917",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionLink: {
    color: "#F97316",
    fontSize: 13,
    fontWeight: "700",
  },
  posterRow: {
    paddingHorizontal: 20,
  },
  posterCard: {
    marginRight: 14,
    width: 132,
  },
  posterImage: {
    backgroundColor: "#E7E5E4",
    borderRadius: 20,
    height: 186,
    marginBottom: 10,
    width: "100%",
  },
  posterFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  posterTitle: {
    color: "#1C1917",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
    marginBottom: 4,
  },
  posterSubtitle: {
    color: "#78716C",
    fontSize: 12,
    fontWeight: "500",
  },
  emptySection: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptySectionText: {
    color: "#57534E",
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
  },
});

export default HomePage;
