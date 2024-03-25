import { View, Text, Image, StyleSheet } from 'react-native';

export function BookCardDetails ({ route }) {
  const {book} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Image source={{ uri: book.cover }} style={styles.image} />
        <View style={styles.horizontalInfos}>
          <Text>Genre: {book.genre}</Text>
          <Text>Rating: {book.rating}/5</Text>
        </View>
        <Text style={styles.synopsis}>Author: {book.author}</Text>
        <Text style={styles.synopsis}>Publisher: {book.publisher}</Text>
        <Text style={styles.synopsis}>Publication Year: {book.publication_year}</Text>
        <Text style={styles.synopsis}>Synopsis: {book.synopsis}</Text>
        <Text style={styles.synopsis}>Format: {book.format}</Text>
        <Text style={styles.synopsis}>Pages: {book.pages}</Text>
        <Text style={styles.synopsis}>Language: {book.language}</Text>
        <Text style={styles.synopsis}>ISBN: {book.ISBN}</Text>
        <Text style={styles.price}>Price R${book.price}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
    alignItems: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: '#c8ad8d',
  },
  title: {
    fontSize: '1.5em',
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
  },
  image: {
    width: '100%',
    height: 400,
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
