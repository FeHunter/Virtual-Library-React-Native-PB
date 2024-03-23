import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export function RegisterImage() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync();
      setPhotoUri(picture.uri);
      setPhotos(prevPhotos => [...prevPhotos, picture.uri]);
      alert("Photo captured");
    }
  };

  if (hasPermission === false) {
    return <Text>Acesso negado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a picture</Text>
      <Camera 
        style={styles.cameraView}
        type={type}
        ref={ref => setCamera(ref)}
      />
      <Image 
        source={{ uri: photoUri }} 
        style={{ width: 200, height: 200, resizeMode: "contain" }} 
      />
      <Pressable onPress={takePicture}>
        <Text style={styles.button}>Take Picture</Text>
      </Pressable>

      <View style={{ height: 200 }}>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageGallery} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  cameraView: {
    flex: 1,
    width: '70%',
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  imageGallery: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
