import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../Assets/Firebase';
import firebaseRoutes from '../Assets/FirebaseRoutes';

export function RegisterImage() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`${firebaseRoutes.mainURL}${firebaseRoutes.gallary}.json`)
    .then(res => {return res.json()})
    .then(res => setPhotos(res))
    .then(res => console.log(res))
    .catch(error => { console.log(error.message);
  })

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
      setPhotos(prevPhotos => {
        if (!Array.isArray(prevPhotos)) {
          return [picture.uri];
        }
        return [...prevPhotos, picture.uri];
      });
      salvePictures();
    }
  };
  
  
  const salvePictures = async () => {
    fetch(`${firebaseRoutes.mainURL}${firebaseRoutes.gallary}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(photos)
      })
      .then(res => console.log('enviado com sucesso'))
      .catch(error => console.log(error.message));
  }

  if (hasPermission === false) {
    return <Text>Acesso negado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera</Text>
      <Camera 
        style={styles.cameraView}
        type={type}
        ref={ref => setCamera(ref)}
      />
      <Pressable style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Tirar foto</Text>
        <Icon name='camera-retro' size={20} color={'white'} />
      </Pressable>
      <View style={styles.gallary}>
        <Text style={styles.title}>Fotos</Text>
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
    borderColor: '#556b2f',
    resizeMode: 'contain',
  },
  lastPic: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#556b2f'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
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
