import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

function showAlert(title: string, message?: string) {
  if (Platform.OS === "web") {
    alert(`${title}\n${message || ""}`);
  } else {
    Alert.alert(title, message);
  }
}

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    if (!form.email) {
      showAlert("Error", "Please enter your email first");
      return;
    }
    setShowModal(true);
  };

  const confirmEmail = () => {
    setShowModal(false);
    showAlert("Success", "Email confirmed ✅");
    router.push("/login");
  };

  const cancelAction = () => {
    setShowModal(false);
    showAlert("Cancelled", "You stayed on the register page");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register 👤</Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={form.firstName}
        onChangeText={(t) => setForm({ ...form, firstName: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={form.lastName}
        onChangeText={(t) => setForm({ ...form, lastName: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={form.email}
        onChangeText={(t) => setForm({ ...form, email: t })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email password"
        secureTextEntry
        value={form.password}
        onChangeText={(t) => setForm({ ...form, password: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={form.phone}
        onChangeText={(t) => setForm({ ...form, phone: t })}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Are you sure of email</Text>
            <Text style={styles.modalEmail}>{form.email}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.yesButton} onPress={confirmEmail}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelAction}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "orangered", marginBottom: 20 },
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalEmail: { fontSize: 16, color: "gray", marginBottom: 20 },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  yesButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  yesText: { color: "white", fontWeight: "bold" },
  cancelText: { color: "black", fontWeight: "bold" },
});
