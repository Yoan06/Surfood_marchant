import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EnterOtp() {
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const { otp: expectedOtp, email } = useLocalSearchParams<{ otp: string; email: string }>();

  const handleConfirm = () => {
    if (otp === expectedOtp) {
      Alert.alert("✅ Success", "OTP verified successfully!");
      router.push("/reset-password");
    } else {
      Alert.alert("❌ Error", "Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("📩 New OTP sent to:", email, "Code:", newOtp);

    Alert.alert("🔄 OTP resent", `New OTP sent to ${email}`);

    // ⚡ Mettre à jour le nouvel OTP attendu
    router.setParams({ otp: newOtp });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP received</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit code"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
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
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 10,
  },
  resend: { color: "gray", textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
