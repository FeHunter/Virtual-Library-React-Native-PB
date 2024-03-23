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
      setPhotos(photos => [...photos, picture.uri]);
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
      {/* {photoUri != null ?
        <Image 
          source={{ uri: photoUri }} 
          style={styles.lastPic} 
        />
        :
        ''
      } */}
      <Pressable onPress={takePicture}>
        <Text style={styles.button}>Take Picture</Text>
      </Pressable>

      <View style={styles.gallary}>
        <Text style={styles.title}>My Photos</Text>
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
    height: 200,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  cameraView: {
    flex: 1,
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    resizeMode: 'contain',
  },
  lastPic: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  gallary: {
    width: '100%',
    height: 450,
  },
  imageGallery: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
});
