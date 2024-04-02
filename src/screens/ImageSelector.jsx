import { Image, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage, setProfileImage } from "../features/auth/authSlice";
import { usePostProfileImageMutation } from "../services/shopService";
import CustomButton from "./../components/CustomButton.jsx";
import { commonStyles } from '../global/commonStyles';

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const {localId} = useSelector((state) => state.authReducer.value);
  const [triggerSaveProfileImage] = usePostProfileImageMutation();
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
        aspect: [10, 10],
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
    dispatch(setProfileImage(image));
    triggerSaveProfileImage({ localId, image });
    navigation.goBack();
  };

  return (
    <View style={commonStyles.headerContainer}>
        <View style={commonStyles.container}>
        {image ? (
            <View  style={commonStyles.centerContainer}>
                <Image source={{ uri: image }} style={commonStyles.photo} />
                <CustomButton
                  title="Take another photo"
                  onPress={pickImage}
                />
                <CustomButton
                  title="Confirm photo"
                  onPress={confirmImage}
                />
            </View>
        ) : (
            <View style={commonStyles.noPhotoContainer}>
                <Text style={commonStyles.text}>No photo to show...</Text>
                <CustomButton
                  title="Take a photo"
                  onPress={pickImage}
                />
            </View>
        )}
        <CustomButton
          title="Go Back!!"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default ImageSelector;
