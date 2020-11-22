import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permission from 'expo-permissions';

import Constants from 'expo-constants';

export default function ImagePickerExample() {
  const [image, setImage] = useState({});

  const uploadImage = () => {
    const data = new FormData();

    data.append('image', {
      uri: image.uri,
      type: image.type
    })

    console.log(data);

    //await Axios.post('/upload', data);
  }

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  const getStorageImage = async () => {
    // if(Constants.platform.ios) {
    //   const { status } = await Permission.askAsync(Permission.CAMERA_ROLL);

    //   if(!status === 'garanted'){
    //     alert("Precisamos dessa permissão")
    //     return
    //   }
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    const img = {
      type: result.type,
      uri: result.uri,
    }

    if (!result.cancelled) {
      setImage(img);
      uploadImage();
    }
  };

  const getCamImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    const img = {
      type: result.type,
      uri: result.uri,
    }

    if (!result.cancelled) {
      setImage(img);
      uploadImage();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={getStorageImage} />
      {image?.uri && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}