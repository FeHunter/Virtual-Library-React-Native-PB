import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

export function RegisterImage() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(true);
  const {camera, setCamera} = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  }, []);

  const takePicture = async () => {
    if (camera){
      const picture = await camera.takePictureAsync();
      console.log(picture.uri);
    }
  }

  if (hasPermission === false){
    return <Text>Acesso negado</Text>
  }

  // ref={(refCamera) => setCamera(refCamera)} para camera

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a picture</Text>
      <Camera style={styles.cameraView}  type={type} />
      <Button title="Take Picture" color="black" onPress={()=>{takePicture()}} />
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
    fontSize: '1.1em',
    textAlign: 'center',
    marginVertical: 10,
  },
  cameraView: {
    width: '100%',
    height: 50,
    backgroundColor: 'tomato',
  },
});
