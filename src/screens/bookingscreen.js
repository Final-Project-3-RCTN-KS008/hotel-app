import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const BookingScreen = ({ route }) => {
  const { hotel } = route.params;
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Proceeding to checkout for:", hotel.name);
    // Add logic to complete the booking process
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bookingDetails}>Booking Details:</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Hotel Name: {hotel.name}</Text>
        {/* Display other booking details */}
      </View>
      {/* Display total amount or other booking summary */}

      {/* Checkout button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bookingDetails: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Add more styles as needed
});

export default BookingScreen;
