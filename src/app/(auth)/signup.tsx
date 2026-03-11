import fbIcon from "@/assets/auth/facebook.png";
import ggIcon from "@/assets/auth/google.png";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/constant/app_color";
import { signUp } from "@/services/auth_api";
import { FormSignUp } from "@/types/user";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

function SignUpPage() {
  const router = useRouter();

  const [focusedField, setFocusedField] = useState<
    "fullName" | "email" | "password" | null
  >(null);

  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(true);

  const [signUpForm, setSignUpForm] = useState<FormSignUp>({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const user = await signUp(signUpForm);

      Toast.show(user.message, {
        duration: Toast.durations.LONG,
      });

      if (user?.success) {
        router.navigate("/(auth)/signin");
      }
    } catch (error) {
      console.log(error);
      Toast.show("ERROR", {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            value={signUpForm.username}
            onChangeText={(text) => {
              setSignUpForm((pre) => ({ ...pre, username: text }));
            }}
            onFocus={() => {
              setFocusedField("fullName");
            }}
            onBlur={() => {
              setFocusedField(null);
            }}
            style={[
              styles.input,
              focusedField === "fullName" && styles.inputFocused,
            ]}
            placeholder="Enter your name"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={signUpForm.email}
            onChangeText={(text) => {
              setSignUpForm((pre) => ({ ...pre, email: text }));
            }}
            onFocus={() => {
              setFocusedField("email");
            }}
            onBlur={() => {
              setFocusedField(null);
            }}
            style={[
              styles.input,
              focusedField === "email" && styles.inputFocused,
            ]}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={signUpForm.password}
            onChangeText={(text) => {
              setSignUpForm((pre) => ({ ...pre, password: text }));
            }}
            onFocus={() => {
              setFocusedField("password");
            }}
            onBlur={() => {
              setFocusedField(null);
            }}
            style={[
              styles.input,
              focusedField === "password" && styles.inputFocused,
            ]}
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={isPasswordSecure}
          />
          <AntDesign
            onPress={() => {
              if (isPasswordSecure) {
                setIsPasswordSecure(false);
              } else {
                setIsPasswordSecure(true);
              }
            }}
            name={!isPasswordSecure ? "eye" : "eye-invisible"}
            size={24}
            color="black"
            style={styles.eye}
          />
        </View>

        <View style={styles.signUpButtonWrap}>
          <ShareButton
            title="SIGN UP"
            onPress={handleSignUp}
            buttonStyle={styles.signUpButton}
            textStyle={styles.signUpButtonText}
            pressStyle={styles.fullWidthPress}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href={"/(auth)/signin"} style={styles.footerLink}>
          Sign in
        </Link>
      </View>

      <View style={styles.socialDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtons}>
        <ShareButton
          icon={<Image source={fbIcon} style={styles.socialIcon} />}
          buttonStyle={styles.socialButton}
          textStyle={styles.socialButtonText}
          pressStyle={styles.fullWidthPress}
          title="FACEBOOK"
          onPress={() => {
            alert("In developing");
          }}
        />
        <ShareButton
          icon={<Image source={ggIcon} style={styles.socialIcon} />}
          buttonStyle={styles.socialButton}
          textStyle={styles.socialButtonText}
          pressStyle={styles.fullWidthPress}
          title="GOOGLE"
          onPress={() => {
            alert("In developing");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },

  header: {
    marginTop: 12,
    marginBottom: 24,
  },

  title: {
    fontSize: 45,
    fontWeight: 700,
    color: "#111827",
  },

  form: {
    gap: 16,
  },

  field: {
    position: "relative",
    gap: 6,
  },

  label: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: 500,
  },

  input: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: "#f9fafb",
    fontSize: 16,
    color: "#111827",
  },

  inputFocused: {
    borderColor: APP_COLOR.MAIN_COLOR,
    borderWidth: 1.5,
  },

  eye: {
    position: "absolute",
    right: 10,
    top: "50%",
  },

  signUpButtonWrap: {
    marginTop: 6,
  },

  signUpButton: {
    backgroundColor: APP_COLOR.MAIN_COLOR,
    justifyContent: "center",
    paddingVertical: 14,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5,
  },

  signUpButtonText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  fullWidthPress: {
    alignSelf: "stretch",
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  footerText: {
    fontSize: 15,
    color: "#6b7280",
  },

  footerLink: {
    fontSize: 15,
    color: APP_COLOR.MAIN_COLOR,
    fontWeight: 700,
  },

  socialDivider: {
    marginTop: 24,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },

  dividerText: {
    fontSize: 13,
    color: "#9ca3af",
  },

  socialButtons: {
    gap: 12,
  },

  socialButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 14,
  },

  socialButtonText: {
    fontSize: 17,
    fontWeight: 600,
    color: "#111827",
  },

  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default SignUpPage;
