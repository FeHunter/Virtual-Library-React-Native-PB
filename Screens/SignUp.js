import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from '../Assets/Firebase';
import Routes from '../Assets/Routes';

export function SignUp({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [userAuth, setUserAuth] = useState(false);

  function verificarUser() {
    setIsLoading(true);
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(credentials => {
        // console.log(credentials.user);
        setUserAuth(true);
        setStatus("Cadastrado com sucesso!");
      })
      .catch(error => {
        if (error.message === "Firebase: Error (auth/email-already-in-use)."){
          return setStatus("Email já cadastrado");
        }else if (error.message === "Firebase: Error (auth/invalid-email)."){
          return setStatus("Email ou Senha icorreto");
        }
        setStatus(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(()=>{
    if (userAuth){
      setTimeout(() => {
        navigation.navigate(Routes.home, {userAuth});
      }, 1000);
    }
  }, [userAuth]);

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
      <Button
        title='Login'
        color='black'
        onPress={()=>{navigation.navigate(Routes.signInPage)}}
      />
      {status !== '' && <Text style={styles.status}>{status}</Text>}
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
  status: {
    fontSize: '1.2em',
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
