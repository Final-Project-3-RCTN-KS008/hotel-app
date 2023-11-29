import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "../component/navbar"; // Import the NavBar component
import SearchScreen from "../screens/searchscreen";
import DetailScreen from "../screens/detailscreen";
import BookingScreen from "../screens/bookingscreen";
import LoginScreen from "../screens/loginscreen";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={NavBar} // Use NavBar as a screen in the Stack Navigator
        options={{ headerShown: false }} // Hide the header for the bottom tabs
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* Define other screens or nested navigators here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
