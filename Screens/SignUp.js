import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [verifyEmail, setverifyEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Library - Sign Up</Text>
      <TextInput style={styles.input} placeholder="Create user name" />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Verificar E-mail"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Verificar Password"
        secureTextEntry={true}
      />
      <Button
        title="Sign Up"
        color="black"
        onPress={() => {
          alert('Inscrito com sucesso');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
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
