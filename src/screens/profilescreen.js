import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLoginRedirect = () => {
    navigation.navigate("LoginScreen");
  };
  const handleSettingsNavigation = () => {
    navigation.navigate("SettingScreen");
  };
  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        // Show profile information when user is authenticated
        <>
          <Text style={styles.title}>{user.name}'s Profile Information</Text>
          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.info}>{user?.username}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.info}>{user?.name}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.info}>{user?.email}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.label}>Contact Number:</Text>
              <Text style={styles.info}>
                {user?.phoneNumber ? user.phoneNumber : "N/A"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsNavigation}
          >
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>You're currently not logged in</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginRedirect}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
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
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  info: {
    marginLeft: 10,
  },
  settingsButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20, // Adjust the spacing from the previous element as needed
  },

  settingsButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
