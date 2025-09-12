import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function StoreProfile() {
  const [form, setForm] = useState({ fullName: "", description: "" });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const router = useRouter();

  // 📸 Choisir image
  const pickImage = async (setImage: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2], // Cover en mode bannière
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = () => {
    if (!form.fullName || !form.description) {
      Alert.alert("⚠️ Please complete all fields");
      return;
    }
    console.log("Profile saved:", form, "Profile:", profileImage, "Cover:", coverImage);
    router.push("/merchant-dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Cover */}
      <TouchableOpacity style={styles.header} onPress={() => pickImage(setCoverImage)}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <Text style={styles.coverBtn}>Add cover picture</Text>
        )}
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
          <Image
            source={{
              uri:
                profileImage ||
                "https://img.icons8.com/ios/100/user-male-circle.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.addPhoto}>Tap to add profile picture</Text>
      </View>

      {/* Form */}
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={form.fullName}
        onChangeText={(t) => setForm({ ...form, fullName: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(t) => setForm({ ...form, description: t })}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  header: {
    height: 150,
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  coverBtn: { color: "white", fontWeight: "bold" },
  coverImage: { width: "100%", height: "100%", resizeMode: "cover" },
  avatarContainer: { alignItems: "center", marginTop: -40 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "lightgray" },
  addPhoto: { marginTop: 5, color: "gray" },
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
