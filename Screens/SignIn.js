import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function SignIn() {

  const [userName, setUserName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Page</Text>
      <TextInput style={styles.input} placeholder="User name / E-mail" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      <Button
        title="Sign In"
        color="black"
        onPress={() => {
          alert('logado');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.2em',
    marginVertical: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginVertical: 2,
  },
});
