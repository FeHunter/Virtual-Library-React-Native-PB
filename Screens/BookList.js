import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';

export function BookList({ navigation }) {

  const urlAPI = 'https://t3t4-dfe-pb-grl-m1-default-rtdb.firebaseio.com';
  const resource = '/books.json';

  const [books, setBooks] = useState([]);

  // Filter
  const [search, setSearch] = useState('');
  const [selectFilter, setSelectFilter] = useState('Sem filtro');
  function getTerm(searchTerm) {
    setSearch(searchTerm);
  }
  function getSelectedTerm(selectedItem) {
    setSelectFilter(selectedItem);
  }

  useEffect(() => {
    fetch(urlAPI + resource)
      .then((res) => res.json())
      .then((res) => {
        setBooks(convertData(res));
      });
  }, []);

  function convertData(data) {
    const ids = Object.keys(data);
    const objs = Object.values(data);
    return objs.map((obj, i) => {
      return { id: ids[i], ...obj };
    });
  }

  useEffect(() => {
    if (selectFilter !== 'Sem filtro') {
      setSearch(selectFilter);
      FilterBooks();
    } else {
      setSearch('');
    }
  }, [selectFilter]);

  function FilterBooks() {
    let updateList = [...books];
    updateList = updateList.filter((book) => {
      return (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genre.toLowerCase().includes(search.toLowerCase())
      );
    });
    return (
      <FlatList
        contentContainerStyle={styles.listView}
        data={updateList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <BookCard book={item} navigation={navigation} />;
        }}
      />
    );
  }

  let showBooks =
    books.length > 0 && search.length === 0 ? (
      <FlatList
        contentContainerStyle={styles.listView}
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <BookCard book={item} navigation={navigation} />;
        }}
      />
    ) : (
      FilterBooks()
    );

  return (
    <View style={styles.container}>
      <SearchBar setSearch={getTerm} setSelectFilter={getSelectedTerm} />
      <ScrollView style={{height: 700, width: '100%'}}>{showBooks}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 'auto',
    backgroundColor: '#ebe6ea',
  },
  listView: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebe6ea',
  },
});
