import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { addBooking } from "../../redux/global/globalSlice";
import HotelCard from "../component/HotelCard";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const BookingScreen = ({ route }) => {
  const { hotel } = route.params;
  const today = new Date();
  const bookingDetails = {
    Name: hotel.name,
    Address: hotel.address,
    Image: hotel.image,
    Rating: hotel.rating,
  };
  const dispatch = useDispatch();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [mode, setMode] = useState("date");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const navigation = useNavigation();
  const handleCheckInChange = (e, selectedDate) => {
    setShowCheckIn(false);
    if (selectedDate) {
      setCheckInDate(selectedDate);
    }
  };

  const handleCheckOutChange = (e, selectedDate) => {
    setShowCheckOut(false);
    if (selectedDate) {
      setCheckOutDate(selectedDate);
    }
  };

  const showDatePicker = (modeToShow) => {
    if (modeToShow === "checkIn") {
      setShowCheckIn(true);
      setShowCheckOut(false);
      setMode("date");
    } else {
      setShowCheckOut(true);
      setShowCheckIn(false);
      setMode("date");
    }
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const daysStay = moment(checkOutDate).diff(moment(checkInDate), "days");

  const totalPrice = hotel.price * daysStay;
  const handleBookingConfirmation = () => {
    const bookingData = {
      ...bookingDetails,
      checkInDate,
      checkOutDate,
      name,
      email,
      contactNumber,
      totalPrice,
    };
    navigation.navigate("Book");
    dispatch(addBooking(bookingData));
    ToastAndroid.show("Booking Successful", ToastAndroid.SHORT);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.datePickerContainer}>
        <HotelCard hotel={hotel} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showDatePicker("checkIn")}
        >
          <Text style={{ color: "#FFFFFF" }}>Select Check-in Date </Text>
        </TouchableOpacity>
        {showCheckIn && (
          <DateTimePicker
            value={checkInDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleCheckInChange}
            minimumDate={today}
          />
        )}
        <Text>Check-in: {checkInDate.toDateString()}</Text>
      </View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showDatePicker("checkOut")}
        >
          <Text style={{ color: "#FFFFFF" }}>Select Check-out Date</Text>
        </TouchableOpacity>
        {showCheckOut && (
          <DateTimePicker
            value={checkOutDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleCheckOutChange}
            minimumDate={today}
          />
        )}
        <Text>Check-out: {checkOutDate.toDateString()}</Text>
      </View>
      <Text style={styles.priceText}>
        Total Price:{" "}
        {totalPrice.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleBookingConfirmation}
      >
        <Text style={{ color: "white" }}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerContainer: {
    alignItems: "center",
  },
  dateButton: {
    backgroundColor: "#4C4DDC",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: "#4C4DDC",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  priceText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BookingScreen;
