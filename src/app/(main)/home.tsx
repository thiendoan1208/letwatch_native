import CustomCarousel from "@/components/button/carousel";
import CustomFlatList from "@/components/custom_flatlist";
import { BANNER_IMAGE_ROUTES, ICON_IMAGE_ROUTES } from "@/data/image_routes";
import Entypo from "@expo/vector-icons/Entypo";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const data = Array(10);

/**
 *
 */
function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={() => <View style={styles.item} />}
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
                  Search dishes, restaurants
                </Text>
              </View>
              <View style={styles.fakeInputAction}></View>
            </View>
          </View>
        }
        TopListElementComponent={
          <View style={styles.topList}>
            <CustomCarousel
              items={BANNER_IMAGE_ROUTES}
              styles={{
                width: width,
                height: width / 3.7,
                resizeMode: "cover",
              }}
            />
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceHorizontal={false}
            >
              <FlatList
                style={{
                  flex: 1,
                  marginTop: 10,
                  alignSelf: "flex-start",
                }}
                numColumns={Math.ceil(ICON_IMAGE_ROUTES.length / 2)}
                showsHorizontalScrollIndicator={false}
                data={ICON_IMAGE_ROUTES}
                renderItem={({ item }) => (
                  <View
                    key={item.key}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Image
                      source={item.src}
                      style={{
                        width: 35,
                        height: 35,
                      }}
                    />
                    <Text>{item.name}</Text>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
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
  item: {
    borderColor: "green",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  list: {
    overflow: "hidden",
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
    minHeight: 32,
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
    height: 16,
    justifyContent: "center",
    width: 32,
  },
  topList: {
    width: "100%",
  },
});

export default HomePage;
