import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from '../Assets/Firebase';

export function SignUp() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  function verificarUser() {
    setIsLoading(true);
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(credentials => {
        console.log(credentials.user);
        setStatus("Cadastrado com sucesso!");
      })
      .catch(error => {
        setStatus(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Library - Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setUserEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setUserPassword}
      />
      <Button
        title="Sign Up"
        color="black"
        onPress={verificarUser}
      />
      {status !== '' && <Text style={styles.status}>{status}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  status: {
    fontSize: 20,
    marginVertical: 20,
    color: 'gray',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginVertical: 2,
  },
});
