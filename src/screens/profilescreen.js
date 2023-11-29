import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLoginRedirect = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        // Show profile information when user is authenticated
        <>
          <Text style={styles.title}>Profile Information</Text>
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
          </View>
        </>
      ) : (
        // Redirect to login screen if user is not authenticated
        <View>
          <Text style={styles.title}>Please log in</Text>
          <Button title="Login" onPress={handleLoginRedirect} />
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
});
export default ProfileScreen;
