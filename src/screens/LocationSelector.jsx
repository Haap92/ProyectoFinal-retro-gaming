import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapPreview from "../components/MapPreview";
import { googleAPI } from "../firebase/googleAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../features/auth/authSlice";
import { usePostUserLocationMutation } from "../services/shopService";
import CustomButton from "./../components/CustomButton.jsx";
import { commonStyles } from '../global/commonStyles';

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const {localId} = useSelector((state) => state.authReducer.value);
  const [triggerPostAddress] = usePostUserLocationMutation();

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
    <View style={commonStyles.headerContainer}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>My Adress</Text>
        {location.latitude ? (
          <View style={commonStyles.noLocationContainer}>
            <Text style={commonStyles.text}>
              Lat: {location.latitude}, long: {location.longitude}
            </Text>
            <MapPreview location={location} />
            <Text style={commonStyles.text}>{address}</Text>
            <CustomButton
              title="Confirm Address"
              onPress={onConfirmAddress}
            />
          </View>
        ) : (
          <Text style={commonStyles.text}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default LocationSelector;