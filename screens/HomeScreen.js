import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";

const fetchHomes = async () => {
  const response = await fetch("https://678f678849875e5a1a91b27f.mockapi.io/houses");
  return response.json();
};

const HomeScreen = ({ navigation }) => {
  const { data: homes, isLoading, error } = useQuery({
    queryKey: ["homes"],
    queryFn: fetchHomes,
  });

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error loading homes</Text>;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {homes.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate("Detail", { home: item })}>
              <View style={styles.card}>
                <Image 
                  source={{ uri: item.imagerUrl }} 
                  style={styles.image} 
                  onError={() => console.log("Image load failed for:", item.imagerUrl)}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.address}>{item.address || "No Address Provided"}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={homes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Detail", { home: item })}>
              <View style={styles.card}>
                <Image 
                  source={{ uri: item.imagerUrl }} 
                  style={styles.image} 
                  onError={() => console.log("Image load failed for:", item.imagerUrl)}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.address}>{item.address || "No Address Provided"}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  address: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  error: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});

export default HomeScreen;
