import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/authSlice";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const navigation = useNavigation();
  const currentUserData = {
    name: user.name,
    username: user.username,
  };
  const handleSaveChanges = () => {
    const user = {
      ...currentUserData,
      email,
      phoneNumber,
    };
    dispatch(updateUser(user));
    ToastAndroid.show("Change data success", ToastAndroid.SHORT);
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        // Show user settings if authenticated
        <>
          <Text style={styles.title}>Update User Details</Text>
          <TextInput style={styles.input} value={user.name} editable={false} />
          <TextInput
            style={styles.input}
            value={user.username}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Redirect to login screen if user is not authenticated
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Please log in</Text>
          {/* You can add a login button here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
