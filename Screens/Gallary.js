import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, FlatList, StyleSheet, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Routes from '../Assets/Routes';
import FirebaseRoutes from '../Assets/FirebaseRoutes';

export function Gallary ({navigation}){

  const [gallary, setGallary] = useState([]);

  useEffect(()=>{
    fetch(`${FirebaseRoutes.mainURL}${FirebaseRoutes.gallary}.json`)
    .then(res => {return res.json()})
    .then(res => { setGallary(res) })
    .catch(error => {
      console.log(error.message);
    })
  }, [navigation]);

  // Orientation
  const [horizontal, setHorizontal] = useState(false);
  useEffect(()=>{
    const onChange = ({window: {width, height}}) => {
      setHorizontal(width > height ? true : false);
    }
  
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha galeria</Text>
      <Pressable style={styles.button} onPress={()=>{navigation.navigate(Routes.registerImage)}}>
        <Text style={styles.buttonText}>Tirar novas fotos</Text>
        <Icon name='camera' size={20} color={'white'} />
      </Pressable>
      <ScrollView contentContainerStyle={[styles.imgContainer, horizontal && { flexDirection: 'row' }]}>
        { gallary === null ?
          <Text>Galeria Vazia</Text>
          :
          <FlatList
            data={gallary}
            keyExtractor={(item, index) => index.toString()}
            horizontal={horizontal}
            renderItem={ ({item}) => {
              return <Image source={{uri: item}} style={styles.image} />
            } }
          />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
  imgContainer: {
    height: 700,
  },
  image: {
    width: '100%',
    height: 250,
    margin: 10,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#556b2f'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
});
