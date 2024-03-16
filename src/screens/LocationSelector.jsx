import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { colors } from "../global/colors";
import MapPreview from "../components/MapPreview";
import { googleAPI } from "../firebase/googleAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../features/auth/authSlice";
import { usePostUserLocationMutation } from "../services/shopService";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const { localId } = useSelector((state) => state.authReducer.value);
  const [triggerPostAddress, result] = usePostUserLocationMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddress(data.results[0].formatted_address);
        }
      } catch (err) {}
    })();
  }, [location]);

  const onConfirmAddress = () => {
    const locationFormatted = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: address,
    };
    dispatch(setUserLocation(locationFormatted));

    triggerPostAddress({localId, location: locationFormatted});
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>My Adress</Text>
        {location.latitude ? (
          <View style={styles.noLocationContainer}>
            <Text style={styles.text}>
              Lat: {location.latitude}, long: {location.longitude}
            </Text>
            <MapPreview location={location} />
            <Text style={styles.text}>{address}</Text>
            <Pressable style={styles.button} onPress={onConfirmAddress}>
              <Text style={styles.text}>Confirm Address</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.text}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  headerContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      backgroundColor: colors.grayScale0
  },
  container: {
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      marginTop: 50
  },
  centerContainer:{
      alignItems: "center",
      justifyContent: "center",
  },
  noLocationContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
      fontSize: 16,
      color: colors.mustard0,
      fontFamily: "oswaldRegular",
      margin: 10
  },
  goBack:{
    width: 100,
    height: 50,
    color: "white",
    borderRadius: 25
  }
});

