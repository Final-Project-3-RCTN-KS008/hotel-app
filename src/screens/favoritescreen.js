import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import HotelCard from "../component/HotelCard"; // Assuming HotelCard is in a separate file
import { useSelector } from "react-redux";
const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.hotels.favorites);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length ? (
        favorites.map((hotel, index) => <HotelCard key={index} hotel={hotel} />)
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text>No favorites yet.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default FavoritesScreen;
