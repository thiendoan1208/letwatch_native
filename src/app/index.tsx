import fbIcon from "@/assets/auth/facebook.png";
import ggIcon from "@/assets/auth/google.png";
import bg from "@/assets/auth/welcome-background.png";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/constant/app_color";
import { Link, useRouter, Redirect } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

function WelcomePage() {
  const router = useRouter();

  if (true) {
    return <Redirect href={"/(main)/home"} />;
  }

  return (
    <ImageBackground
      source={bg}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* Welcome */}
        <View style={styles.container_welcome}>
          <Text style={styles.container_welcome_text}>Welcome to</Text>
          <Text style={styles.container_welcome_logo}>LetWatch</Text>

          {/* Slogan */}
          <Text style={styles.container_welcome_slogan}>
            Your favorite film app.
          </Text>
        </View>
        {/* Information */}
        <View style={styles.container_info}>
          <View style={styles.container_info_space}>
            <Text style={styles.container_info_space_text}>Sign in with</Text>
          </View>

          <View style={styles.container_info_login_method}>
            <ShareButton
              icon={<Image source={fbIcon} />}
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
              textStyle={{
                fontSize: 20,
              }}
              pressStyle={{
                flex: 1,
              }}
              title="FACEBOOK"
              onPress={() => {
                alert("In developing");
              }}
            />
            <ShareButton
              icon={<Image source={ggIcon} />}
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
              textStyle={{
                fontSize: 20,
              }}
              pressStyle={{
                flex: 1,
              }}
              title="GOOGLE"
              onPress={() => {
                alert("In developing");
              }}
            />
          </View>

          <View style={styles.container_info_email_button}>
            <ShareButton
              buttonStyle={styles.container_info_email_button_inner}
              textStyle={styles.container_info_email_button_text}
              pressStyle={styles.container_info_email_button_press}
              title="Start with your email"
              onPress={() => {
                router.navigate("/(auth)/signup");
              }}
            />
          </View>

          <View style={styles.container_info_footer}>
            <Text style={styles.container_info_footer_text}>
              Already have an account?
            </Text>

            <Link
              href={"/(auth)/signin"}
              style={styles.container_info_footer_link}
            >
              Sign in
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },

  container_welcome: {
    flex: 1,
    justifyContent: "center",
  },

  container_info: {
    flex: 0.6,
  },

  container_welcome_text: {
    fontSize: 50,
    fontWeight: 800,
  },

  container_welcome_logo: {
    fontSize: 45,
    fontWeight: 700,
    color: APP_COLOR.MAIN_COLOR,
  },

  container_welcome_slogan: {
    fontSize: 20,
    color: "gray",
  },

  container_info_space: {
    flexDirection: "row",
    justifyContent: "center",
  },

  container_info_space_text: {
    fontSize: 14,
    fontWeight: 500,
    transform: [{ translateY: 15 }],
    padding: 5,
    paddingHorizontal: 10,
  },

  container_info_login_method: {
    flexDirection: "row",
    marginTop: 30,
    gap: 12,
  },

  container_info_email_button: {
    marginTop: 16,
  },

  container_info_email_button_press: {
    alignSelf: "stretch",
  },

  container_info_email_button_inner: {
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },

  container_info_email_button_text: {
    fontSize: 17,
    fontWeight: 600,
    color: "#111827",
  },

  container_info_footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  container_info_footer_text: {
    fontSize: 15,
    color: "#6b7280",
  },

  container_info_footer_link: {
    fontSize: 15,
    color: APP_COLOR.MAIN_COLOR,
    fontWeight: 700,
    textDecorationLine: "underline",
  },
});

export default WelcomePage;
