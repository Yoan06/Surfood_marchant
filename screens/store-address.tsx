import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function StoreAddress() {
  const [form, setForm] = useState({ address: "", city: "", country: "" });
  const router = useRouter();

  const handleConfirm = () => {
    if (!form.address || !form.city || !form.country) {
      Alert.alert("⚠️ Error", "Please fill all fields.");
      return;
    }

    console.log("Address confirmed:", form);

    // 👉 Navigation vers store-profile
    router.push("/store-profile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your store’s address</Text>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={(t) => setForm({ ...form, address: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.city}
        onChangeText={(t) => setForm({ ...form, city: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={form.country}
        onChangeText={(t) => setForm({ ...form, country: t })}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "orangered", marginBottom: 20 },
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
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
