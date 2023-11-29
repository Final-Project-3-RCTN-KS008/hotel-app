import React from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const bookings = useSelector((state) => state.hotels.bookings);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bookings.length ? (
        bookings.map((booking, index) => (
          <View style={styles.card} key={index}>
            <Image source={{ uri: booking.Image }} style={styles.image} />
            <Text style={styles.hotelName}>{booking.Name}</Text>
            <Text>{booking.Address}</Text>
            <Text>Check-in Date: {booking.checkInDate.toDateString()}</Text>
            <Text>Check-out Date: {booking.checkOutDate.toDateString()}</Text>
            <Text>Name: {booking.name}</Text>
            <Text>Email: {booking.email}</Text>
            <Text>Contact Number: {booking.contactNumber}</Text>
            <Text>
              Total Price:{" "}
              {booking.totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.noBookingsContainer}>
          <Text>No bookings yet.</Text>
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
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: "90%",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default BookingPage;
