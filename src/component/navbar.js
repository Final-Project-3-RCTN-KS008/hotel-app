import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homescreen"; // Import the correct path to HomeScreen
import BookingScreen from "../screens/bookingscreen";
import ProfileScreen from "../screens/profilescreen";
import LoginScreen from "../screens/loginscreen";
import Icon from "react-native-vector-icons/Ionicons";
import FavoriteScreen from "../screens/favoritescreen";
const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            focused ? (iconName = "home") : (iconName = "home-outline");
          }
          if (route.name === "Favorite") {
            focused ? (iconName = "heart") : (iconName = "heart-outline");
          }
          if (route.name === "Profile") {
            focused
              ? (iconName = "person-circle")
              : (iconName = "person-circle-outline");
          }
          // if (route.name === "Book") {
          //   focused ? (iconName = "calendar") : (iconName = "calendar-outline");
          // }
          return <Icon name={iconName} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      {/* <Tab.Screen name="Book" component={BookingScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />

      {/* <Tab.Screen name="Login" component={LoginScreen} /> */}
      {/* Add other screens here as Tab.Screen */}
    </Tab.Navigator>
  );
};

export default NavBar;
