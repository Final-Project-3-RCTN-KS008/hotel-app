import React from "react";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { hotel } = route.params;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLoginRedirect = () => {
    navigation.navigate("LoginScreen");
  };
  const handleBooking = () => {
    // Implement your booking logic here
    navigation.navigate("BookingScreen", { hotel });
  };
  // Use 'hotel' data to display details

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={{ marginLeft: 5 }}>{hotel.rating}</Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="blue" />
        <Text style={styles.address}>{hotel.address}</Text>
      </View>
      <Text style={styles.hotelDescription}>{hotel.description}</Text>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={!isAuthenticated ? handleLoginRedirect : handleBooking}
      >
        <Text style={styles.bookingButtonText}>Book Now</Text>
      </TouchableOpacity>
      {/* Display other details of the hotel */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  hotelImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  address: {
    fontSize: 24,
    fontWeight: "300",
    marginVertical: 10,
  },
  hotelDescription: {
    fontSize: 16,
    textAlign: "justify",
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 5,
  },
  bookingButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  bookingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Add more styles as needed
});
export default DetailScreen;
