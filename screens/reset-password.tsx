import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // TODO: API call pour changer mot de passe
    Alert.alert("Success", "Password changed successfully!");
    router.replace("/login"); // retour login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set a new password</Text>

      <TextInput
        style={styles.input}
        placeholder="New password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change password</Text>
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
  },
  button: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
