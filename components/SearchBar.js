import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';

export function SearchBar({ setSearch, setSelectFilter }) {
  const [type, setType] = useState('');
  const [selected, setSelected] = useState('Sem filtro');
  const selectGenre = [
    'Sem filtro',
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
      <TextInput
          style={styles.inputSearch}
          id="searchBar"
          type="text"
          placeholder="type to search..."
          value={type}
          onChange={click}
        />
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
  );
}

const styles = StyleSheet.create({
  ...Platform.select({
    android: {
      searchBar: {
        width: '100%',
      },
      inputSearch: {
        padding: 5,
        fontSize: '1em',
        border: '1px solid gray',
        color: 'white',
        width: '60%',
        backgroundColor: '#556b2f',
      },
      button: {
        width: '40%',
        backgroundColor: '#556b2f',
      },
    },
    ios: {
      searchBar: {
        width: '100%',
      },
      inputSearch: {
        padding: 5,
        fontSize: '1em',
        border: '1px solid gray',
        color: 'white',
        width: '60%',
        backgroundColor: '#191970',
      },
      button: {
        width: '40%',
        backgroundColor: '#191970',
      },
    },
    web: {
      searchBar: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      inputSearch: {
        padding: 5,
        fontSize: '1em',
        border: '1px solid gray',
        color: 'white',
        width: '60%',
        backgroundColor: '#800020',
      },
      button: {
        width: '40%',
        backgroundColor: '#800020',
      },
    }
  }),
});

