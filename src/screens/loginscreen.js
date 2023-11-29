import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authAction";
import { useNavigation } from "@react-navigation/native"; // Adjust the path as per your project structure

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const navigation = useNavigation();

  const handleLogin = () => {
    dispatch(
      login({
        username: "Username",
        password: "password",
      })
    );
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Main");
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      /> */}
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
