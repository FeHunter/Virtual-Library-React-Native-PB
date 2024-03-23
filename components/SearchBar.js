import { View, Text, TextInput, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';

export function SearchBar({ setSearch, setSelectFilter }) {
  const [type, setType] = useState('');
  const [selected, setSelected] = useState('Nenhum');
  const selectGenre = [
    'Nenhum',
    'Ficção Distópica',
    'Ficção de Crescimento',
    'Ficção Filosófica',
    'Ficção Clássica',
    'Realismo Mágico',
    'Romance Clássico',
    'Fantasia',
    'Realismo',
    'Alegoria Política',
    'Suspense',
    'Literatura Clássica'
    ];

  function click(e) {
    setType(e.target.value);
    setSearch(e.target.value);
  }
  function setSelection (selected){
    setSelectFilter(selected);
  } 

  return (
    <View style={styles.searchBar}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputSearch}
          id="searchBar"
          type="text"
          placeholder="type to search..."
          value={type}
          onChange={click}
        />
        <View style={styles.dropdown}>
          <Text style={styles.filterTitle}>Filter:</Text>
          <SelectDropdown
            buttonStyle={styles.button}
            data={selectGenre}
            defaultValue={selected}
            onSelect={(selectedItem, index) => {
              setSelected(selectedItem);
              setSelection(selectedItem);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    backgroundColor: '#aea79c',
  },
  inputArea: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  inputSearch: {
    padding: 5,
    fontSize: '1em',
    border: '1px solid gray',
    backgroundColor: '#aea79c',
    color: 'white'
  },
  title: {
    fontSize: '1.2em',
    textAlign: 'center',
  },
  filterTitle: {
    display: 1,
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.1em',
  },
  button: {
    width: '80%',
    backgroundColor: '#aea79c',
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#aea79c',
  },
});

