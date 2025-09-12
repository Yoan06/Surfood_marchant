import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function RequestOtp() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSend = () => {
    if (!email) {
      Alert.alert("⚠️ Error", "Please enter your email");
      return;
    }

    // 🔹 Simulation : génération d’un code OTP aléatoire
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("📩 OTP sent to email:", email, "Code:", generatedOtp);

    Alert.alert("✅ Success", `OTP sent to ${email}`);

    // 🔹 On passe le code généré comme paramètre
    router.push({
      pathname: "/enter-otp",
      params: { otp: generatedOtp, email },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request OTP code</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "orangered", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "orangered",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
