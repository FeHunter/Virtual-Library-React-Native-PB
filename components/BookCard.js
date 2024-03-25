import { View, Pressable, Text, Image, StyleSheet, Platform } from 'react-native';
import Routes from '../Assets/Routes';

export function BookCard({ book, navigation }) {
  return (
    <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate(Routes.bookDetails, { book, navigation })
        }>
        <Text style={styles.title}>{book?.title}</Text>
        <Image source={{ uri: book?.cover }} style={styles.image} />
        <View style={styles?.horizontalInfos}>
          <Text>{book?.genre}</Text>
          <Text>{book?.rating}/5</Text>
        </View>
        <Text style={styles.synopsis}>Author: {book?.author}</Text>
        <Text style={styles.synopsis}>{book?.synopsis}</Text>
        <Text style={styles.synopsis}>Pages: {book?.pages}</Text>
        <Text style={styles.price}>R${book?.price}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'space-between',
    width: 400,
    height: 400,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#a69b6f',
  },
  title: {
    fontSize: '1.5em',
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
  },
  image: {
    width: '100%',
    height: 170,
    marginVertical: 5,
    resizeMode: 'center',
  },
  horizontalInfos: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  synopsis: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  price: {
    fontSize: '1em',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
