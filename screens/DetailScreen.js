import React from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";

const DetailScreen = ({ route, navigation }) => {
  const { home } = route.params; // ✅ Get home details from navigation

  if (!home) {
    return <Text style={styles.error}>Home details not found</Text>;
  }

  console.log("DetailScreen Home Data:", home); // ✅ Debugging API response

  // ✅ Use `imagerUrl` for images
  const imageUrl = home.imagerUrl && home.imagerUrl.startsWith("http")
    ? home.imagerUrl
    : "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"; // Placeholder if missing

  // ✅ Convert latitude & longitude to numbers for better formatting
  const latitude = parseFloat(home.latitude).toFixed(4);
  const longitude = parseFloat(home.longitude).toFixed(4);

  const handleUnlock = async () => {
    try {
      const response = await fetch("https://mock-unlock-api.com/unlock", {
        method: "POST",
      });
      const result = await response.json();
      Alert.alert(result.success ? "Unlocked!" : "Failed to unlock");
    } catch {
      Alert.alert("Error unlocking the home");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.address}>{home.address || "No Address Provided"}</Text>
      <Text style={styles.description}>{home.description}</Text>
      
      {/* ✅ Show latitude & longitude */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>📍 Latitude: {latitude}</Text>
        <Text style={styles.locationText}>📍 Longitude: {longitude}</Text>
      </View>

      {/* ✅ Unlock Button */}
      <Button title="Unlock Home" onPress={handleUnlock} />

      {/* ✅ Back to Home Button */}
      <View style={styles.backButton}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  address: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  locationContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  backButton: {
    marginTop: 15,
  },
  error: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});

export default DetailScreen;
