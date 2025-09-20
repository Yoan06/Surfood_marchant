import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in 🔐</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Link href="/request-otp" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>I forgot password</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>I don’t have an account</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/location-choice" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white", 
    padding: 20, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "orangered", 
    marginBottom: 20, 
    textAlign: "center" 
  },
  input: {
    borderWidth: 1,
    borderColor: "orangered",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  link: { 
    color: "gray", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  button: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold" 
  },
});
