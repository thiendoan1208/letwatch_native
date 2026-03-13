import { StyleSheet, Text, View } from "react-native";

function FavoritesPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default FavoritesPage;
