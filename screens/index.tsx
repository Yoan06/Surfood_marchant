import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* 🔙 Bouton retour */}
      <TouchableOpacity style={styles.backBtn}>
        <Text style={{ color: "orangered", fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>LET’S START{"\n"}SAVING MONEY</Text>

      {/* Logo arbre depuis assets */}
      <Image
        source={require("../assets/images/logo_marchand.png")} // 📌 chemin relatif vers ton image
        style={styles.logo}
      />

      {/* Boutons de connexion */}
      <TouchableOpacity style={[styles.button, { backgroundColor: "black" }]}>
        <Text style={styles.buttonText}> Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#1877F2" }]}>
        <Text style={styles.buttonText}>f Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "lightgray" }]}>
        <Text style={[styles.buttonText, { color: "black" }]}>
          Continue with Email
        </Text>
      </TouchableOpacity>

      {/* 👉 Bouton Se connecter actif */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "orangered", marginTop: 20 }]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Autres routes mises en commentaire */}
      {/*
      <Button title="Aller à Home" onPress={() => router.push('/home')} />
      <Button title="Aller à Profile" onPress={() => router.push('/profile')} />
      <Button title="Créer un compte" onPress={() => router.push('/register')} />
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "orangered",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: "contain", // ✅ garde bien les proportions
  },
  button: {
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
