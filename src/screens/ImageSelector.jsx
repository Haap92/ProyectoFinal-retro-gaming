import { Image, Pressable, StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/auth/authSlice";
import { usePostProfileImageMutation } from "../services/shopService";
import { colors } from "../global/colors.js"

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { localId } = useSelector((state) => state.authReducer.value);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();
  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const confirmImage = () => {
    dispatch(setCameraImage(image));
    triggerSaveProfileImage({ localId, image });
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
        <View style={styles.container}>
        {image ? (
            <View  style={styles.centerContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <Pressable onPress={pickImage}>
                    <Text style={styles.text}>Take another photo</Text>
                </Pressable>
                <Pressable onPress={confirmImage}>
                    <Text style={styles.text}>Confirm photo</Text>
                </Pressable>
            </View>
        ) : (
            <View style={styles.noPhotoContainer}>
                <Text style={styles.text}>No photo to show...</Text>
                <Pressable onPress={pickImage}>
                    <Text style={styles.text}>Take a photo</Text>
                </Pressable>
            </View>
        )}
        <Button 
            style={styles.goBack}  
            color={colors.mustard0} 
            title="Go Back!!" 
            onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
};

export default ImageSelector;

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
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
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
