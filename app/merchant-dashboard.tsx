import React, { JSX, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Offer = {
  id: string;
  name: string;
  expiryDate: string;
  price: string;
  photo?: string | null;
};

const mockStats = {
  ordersToday: 3,
  orders7d: 12,
  orders30d: 45,
  revenueToday: "20€",
  revenue7d: "150€",
  revenue30d: "1 200€",
  activeOffersToday: 1,
  activeOffers7d: 3,
  activeOffers30d: 5,
};

export default function MerchantDashboard(): JSX.Element {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: "", expiryDate: "", price: "" });
  const [photo, setPhoto] = useState<string | null>(null);

  // 📸 Galerie
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // 📸 Caméra
  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Active la caméra dans les réglages.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // ✅ Enregistrer une offre
  const handleSaveOffer = () => {
    if (!form.name || !form.expiryDate || !form.price) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    const newOffer: Offer = {
      id: Date.now().toString(),
      name: form.name,
      expiryDate: form.expiryDate,
      price: form.price,
      photo,
    };

    setOffers([...offers, newOffer]);
    setForm({ name: "", expiryDate: "", price: "" });
    setPhoto(null);
    setModalVisible(false);
  };

  // ❌ Annuler remplissage
  const handleCancel = () => {
    setForm({ name: "", expiryDate: "", price: "" });
    setPhoto(null);
    setModalVisible(false);
  };

  // 🗑️ Supprimer une offre
  const handleDeleteOffer = (id: string) => {
    Alert.alert("Supprimer", "Voulez-vous supprimer cette offre ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setOffers(offers.filter((o) => o.id !== id));
        },
      },
    ]);
  };

  const renderOffer = ({ item }: { item: Offer }) => (
    <View style={styles.offerRow}>
      <View style={[styles.offerCell, styles.photoCell]}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.offerPhoto} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="image" size={18} color="#888" />
          </View>
        )}
      </View>
      <Text style={styles.offerCell}>{item.name}</Text>
      <Text style={styles.offerCell}>{item.expiryDate}</Text>
      <Text style={styles.offerCell}>{item.price}</Text>

      <TouchableOpacity onPress={() => handleDeleteOffer(item.id)}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome Merchant name</Text>

        {/* separator */}
        <View style={styles.divider} />

        {/* Statistics table */}
        <View style={styles.tableWrapper}>
          <View style={[styles.row, styles.tableHeaderRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Statistics</Text>
            <Text style={[styles.cell, styles.headerCell]}>Today</Text>
            <Text style={[styles.cell, styles.headerCell]}>last 7 days</Text>
            <Text style={[styles.cell, styles.headerCell]}>Last 30 days</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cell}>Orders made :</Text>
            <Text style={styles.cell}>{mockStats.ordersToday}</Text>
            <Text style={styles.cell}>{mockStats.orders7d}</Text>
            <Text style={styles.cell}>{mockStats.orders30d}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cell}>Revenue :</Text>
            <Text style={styles.cell}>{mockStats.revenueToday}</Text>
            <Text style={styles.cell}>{mockStats.revenue7d}</Text>
            <Text style={styles.cell}>{mockStats.revenue30d}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cell}>Active offers :</Text>
            <Text style={styles.cell}>{offers.length}</Text>
            <Text style={styles.cell}>-</Text>
            <Text style={styles.cell}>-</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My active offers :</Text>

        {/* Offers table header */}
        <View style={[styles.row, styles.offersHeader]}>
          <Text style={[styles.offerHeaderCell, styles.photoCell]}>Photo</Text>
          <Text style={styles.offerHeaderCell}>Name</Text>
          <Text style={styles.offerHeaderCell}>Expiry date</Text>
          <Text style={styles.offerHeaderCell}>Price</Text>
          <Text style={styles.offerHeaderCell}>Actions</Text>
        </View>

        {/* Offers list */}
        <FlatList
          data={offers}
          keyExtractor={(i) => i.id}
          renderItem={renderOffer}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No active offers</Text>}
          scrollEnabled={false}
        />

        {/* Add Offer button */}
        <TouchableOpacity
          style={styles.addOfferBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={28} color="white" />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 8 }}>
            Add Offer
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="storefront" size={22} color="orangered" />
          <Text style={[styles.navText, styles.active]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={22} color="#ddd" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart" size={22} color="#ddd" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={22} color="#ddd" />
          <Text style={styles.navText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={22} color="#ddd" />
          <Text style={styles.navText}>User</Text>
        </TouchableOpacity>
      </View>

      {/* Add Offer Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Offer</Text>

            <TextInput
              style={styles.input}
              placeholder="Offer name"
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry date (YYYY-MM-DD)"
              value={form.expiryDate}
              onChangeText={(t) => setForm({ ...form, expiryDate: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={form.price}
              onChangeText={(t) => setForm({ ...form, price: t })}
            />

            {/* Photo preview */}
            {photo && <Image source={{ uri: photo }} style={styles.preview} />}

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity onPress={pickFromGallery} style={styles.photoBtn}>
                <Text style={{ color: "white" }}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickFromCamera} style={styles.photoBtn}>
                <Text style={{ color: "white" }}>Camera</Text>
              </TouchableOpacity>
            </View>

            {/* Action buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={handleCancel}
                style={[styles.modalBtn, { backgroundColor: "gray" }]}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveOffer}
                style={[styles.modalBtn, { backgroundColor: "orangered" }]}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16, paddingBottom: 110 },
  title: { fontSize: 22, color: "orangered", fontWeight: "700", marginBottom: 8 },
  divider: { height: 1, backgroundColor: "orangered", marginVertical: 8 },

  /* Table styles */
  tableWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#e6e6e6" },
  tableHeaderRow: { backgroundColor: "#f7f7f7" },
  headerCell: { fontWeight: "700", textAlign: "center" },
  cell: { flex: 1, padding: 10, textAlign: "center" },

  /* Offers */
  sectionTitle: { marginTop: 18, fontSize: 16, fontWeight: "700", color: "orangered" },
  offersHeader: {
    marginTop: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offerHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    textAlign: "center",
    fontWeight: "700",
  },
  offerRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  offerCell: { flex: 1, textAlign: "center", paddingHorizontal: 6 },
  photoCell: { flex: 0.9, alignItems: "center", justifyContent: "center" },
  offerPhoto: { width: 48, height: 48, borderRadius: 6 },
  photoPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  itemSeparator: { height: 1, backgroundColor: "#f0f0f0" },
  emptyText: { padding: 12, color: "#777", textAlign: "center" },

  /* Add Offer */
  addOfferBtn: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "orangered",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "orangered", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  preview: { width: 80, height: 80, borderRadius: 8, marginBottom: 12, alignSelf: "center" },
  photoBtn: {
    backgroundColor: "orangered",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 100,
    alignItems: "center",
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalBtn: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalBtnText: { color: "white", fontWeight: "bold" },

  /* Bottom nav */
  navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: "#0f1020",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#ddd", fontSize: 11, marginTop: 4 },
  active: { color: "orangered", fontWeight: "700" },
});
