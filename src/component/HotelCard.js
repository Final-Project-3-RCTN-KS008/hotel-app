import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/global/globalSlice";
import { useNavigation } from "@react-navigation/native";
const HotelCard = ({ hotel }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.hotels.favorites);
  const isFavorite = favorites.some((fav) => fav.name === hotel.name);
  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(hotel));
    } else {
      dispatch(addToFavorites(hotel));
    }
  };
  const handlePress = () => {
    navigation.navigate("DetailScreen", { hotel });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card} key={hotel.id}>
        <Image source={{ uri: hotel.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.location}>{hotel.address}</Text>
          <View style={styles.row}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{hotel.rating}</Text>
            </View>
            <TouchableOpacity onPress={handleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: "90%",
    aspectRatio: 2 / 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 130,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
  },
  // Additional styles for other details
});

export default HotelCard;
