import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { searchHotels } from "../../redux/global/globalAction";
import HotelCard from "../component/HotelCard";

const SearchScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { searchQuery } = route.params;
  useEffect(() => {
    dispatch(searchHotels(searchQuery));
  }, [dispatch, searchQuery]);

  const { searchResults, isLoading, error } = useSelector(
    (state) => state.hotels
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : searchResults.length === 0 || error ? (
        <View style={styles.errorContainer}>
          <Text>No results found for "{searchQuery}"</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {searchResults.map((item, index) => (
            <HotelCard key={index} hotel={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
