import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, FlatList, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Routes from '../Assets/Routes';
import FirebaseRoutes from '../Assets/FirebaseRoutes';
import { ImageCard } from '../components/Gallary/ImageCard';

export function Gallary ({navigation}){

  const [gallary, setGallary] = useState([]);
  const [status, setStatus] = useState('');

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

  function removeFoto (photo){
      let update = [];
      update = [... gallary];
      if (update.indexOf(photo) > 0){
        update.splice(update.indexOf(photo), 1)
      }else {
        update.shift();
      }
      setGallary(update);
      setStatus('removendo...');

      fetch(`${FirebaseRoutes.mainURL}${FirebaseRoutes.gallary}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
        })
        .then(res => {
          setStatus("Foto removida");
          setTimeout(() => {
            setStatus('');
          }, 1000);
        })
        .catch(error => console.log(error.message));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha galeria</Text>
      <Pressable style={styles.button} onPress={()=>{navigation.navigate(Routes.registerImage)}}>
        <Text style={styles.buttonText}>Tirar novas fotos</Text>
        <Icon name='camera' size={20} color={'white'} />
      </Pressable>
      {status !== '' && <Text>{status}</Text>}
      <ScrollView contentContainerStyle={[styles.imgContainer, horizontal && { flexDirection: 'row' }]}>
        { gallary === null ?
          <Text>Galeria Vazia</Text>
          :
          <FlatList
            data={gallary}
            keyExtractor={(item, index) => index.toString()}
            horizontal={horizontal}
            renderItem={ ({item}) => {
              return <ImageCard image={item} removeFoto={removeFoto} />
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
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  ...Platform.select({
    android: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#556b2f',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    ios: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#191970',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    web: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#800020',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    }
  })
});
