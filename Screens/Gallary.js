import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const gallary = [
  "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
  "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
  "https://images.pexels.com/photos/574087/pexels-photo-574087.jpeg",
  "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg",
  "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
  "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
  "https://images.pexels.com/photos/574087/pexels-photo-574087.jpeg",
  "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg",
  
]

export function Gallary (){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My book's gallary</Text>
      <View style={styles.imgContainer}>
        <FlatList
          data={gallary}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item}) => {
            return <Image source={{uri: item}} style={styles.image} />
          } }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '1.2em',
    textAlign: 'center',
    marginVertical: 5,
  },
  imgContainer: {
    height: 800,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  }
});