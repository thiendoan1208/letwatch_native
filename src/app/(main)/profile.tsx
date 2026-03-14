import { GetCurrentUser } from "@/context/user_context";
import Feather from "@expo/vector-icons/Feather";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROFILE_SECTIONS = [
  {
    icon: "map-pin" as const,
    title: "Saved Addresses",
    subtitle: "Manage delivery locations",
  },
  {
    icon: "credit-card" as const,
    title: "Payment Methods",
    subtitle: "Cards, wallets and billing",
  },
  {
    icon: "clock" as const,
    title: "Order History",
    subtitle: "Check your recent orders",
  },
  {
    icon: "help-circle" as const,
    title: "Help Center",
    subtitle: "Support and FAQs",
  },
];

function ProfilePage() {
  const { user } = GetCurrentUser();
  const displayName = user.username?.trim() || "Guest User";
  const displayEmail = user.email?.trim() || "No email connected";
  const avatarText = displayName.slice(0, 2).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.sectionKicker}>My Account</Text>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarText}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{displayName}</Text>
              <Text style={styles.userEmail}>{displayEmail}</Text>
            </View>
            <View style={styles.editBadge}>
              <Feather name="edit-2" size={16} color="#F97316" />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Saved Places</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>240</Text>
            <Text style={styles.statLabel}>Reward Pts</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.menuList}>
            {PROFILE_SECTIONS.map((item) => (
              <View key={item.title} style={styles.menuItem}>
                <View style={styles.menuIconWrap}>
                  <Feather name={item.icon} size={18} color="#F97316" />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#A8A29E" />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.logoutCard}>
            <Feather name="log-out" size={18} color="#DC2626" />
            <Text style={styles.logoutText}>Sign out</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F1",
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: "#FFF1E6",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionKicker: {
    color: "#C2410C",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 16,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    flexDirection: "row",
    padding: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#FDBA74",
    borderRadius: 999,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  avatarText: {
    color: "#7C2D12",
    fontSize: 22,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    color: "#1C1917",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  userEmail: {
    color: "#78716C",
    fontSize: 14,
    fontWeight: "500",
  },
  editBadge: {
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
  },
  statValue: {
    color: "#EA580C",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
    textAlign: "center",
  },
  statLabel: {
    color: "#78716C",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    marginTop: 22,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#292524",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  menuList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  menuItem: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 74,
  },
  menuIconWrap: {
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  menuTextWrap: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    color: "#1C1917",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 3,
  },
  menuSubtitle: {
    color: "#78716C",
    fontSize: 12,
    fontWeight: "500",
  },
  logoutCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    paddingVertical: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default ProfilePage;
