import fbIcon from "@/assets/auth/facebook.png";
import ggIcon from "@/assets/auth/google.png";
import ShareButton from "@/components/button/share.button";
import { SignInSchema } from "@/config/validate_schema";
import { APP_COLOR } from "@/constant/app_color";
import { signIn } from "@/services/auth_api";
import { FormSignIn } from "@/types/user";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

function SignInPage() {
  const router = useRouter();

  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null,
  );

  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(true);

  const handleSignIn = async (value: FormSignIn) => {
    try {
      const user = await signIn(value);

      Toast.show(user.message, {
        duration: Toast.durations.LONG,
      });

      if (user?.success) {
        router.navigate("/(main)/home");
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
        <Text style={styles.title}>Sign in</Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleSignIn(values);
        }}
        validationSchema={SignInSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={values.email}
                onChangeText={handleChange("email")}
                onFocus={() => {
                  setFocusedField("email");
                }}
                onBlur={(e) => {
                  setFocusedField(null);
                  handleBlur("email")(e);
                }}
                style={[
                  styles.input,
                  focusedField === "email" && styles.inputFocused,
                ]}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
              />
              {errors.email && touched.email ? (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  {errors.email}
                </Text>
              ) : null}
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={values.password}
                onChangeText={handleChange("password")}
                onFocus={() => {
                  setFocusedField("password");
                }}
                onBlur={(e) => {
                  setFocusedField(null);
                  handleBlur("password")(e);
                }}
                style={[
                  styles.input,
                  focusedField === "password" && styles.inputFocused,
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={isPasswordSecure}
              />
              {errors.password && touched.password ? (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  {errors.password}
                </Text>
              ) : null}
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={styles.footerLink}>Forgot password?</Text>
            </View>
            <View style={styles.signUpButtonWrap}>
              <ShareButton
                title="SIGN IN"
                onPress={handleSubmit}
                buttonStyle={styles.signUpButton}
                textStyle={styles.signUpButtonText}
                pressStyle={styles.fullWidthPress}
              />
            </View>
          </View>
        )}
      </Formik>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
        <Link href={"/(auth)/signup"} style={styles.footerLink}>
          Sign up
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

export default SignInPage;
