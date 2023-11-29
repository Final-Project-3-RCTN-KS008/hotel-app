import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SectionList,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels, searchHotels } from "../../redux/global/globalAction";
import { useNavigation } from "@react-navigation/native";
import { popularDestinations, indonesianCities } from "../../data/destination";
import HotelCard from "../component/HotelCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);
  const { hotels, isLoading, error } = useSelector((state) => state.hotels);
  // console.log(hotels[0].image);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    Keyboard.dismiss();
    navigation.navigate("SearchScreen", {
      searchQuery: searchQuery,
    });
  };

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === "Enter") {
      handleSearch();
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.destinationItem} key={item.id}>
        <ImageBackground
          source={item.image}
          style={styles.destinationImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.imageTextContainer}>
            <Text style={styles.destinationText}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={[styles.errorContainer]}>
          <Text>Error: {error}</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
            onKeyPress={handleKeyPress}
          />
          <Text style={styles.header}>Popular Destinations</Text>
          <SectionList
            sections={popularDestinations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            contentContainerStyle={styles.sectionListContainer}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.header}>Explore Indonesia</Text>
          <SectionList
            sections={indonesianCities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            contentContainerStyle={styles.sectionListContainer}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.hotelContainer}>
            {hotels.map((item, index) => (
              <HotelCard key={index} hotel={item} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sectionListContainer: {
    marginLeft: 20,
  },
  destinationItem: {
    display: "flex",
    borderColor: "#ccc",
    borderRadius: 9,
    marginRight: 8,
    padding: 10,
    position: "relative",
  },
  destinationImage: {
    height: 150,
    width: 200,
  },
  header: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "80%", // Adjust width as needed
    fontSize: 18,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  hotelContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 100,
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  destinationText: {
    color: "#fff",
    textAlign: "center",
  },
  // Add more styles for other components as needed
});

export default HomeScreen;
