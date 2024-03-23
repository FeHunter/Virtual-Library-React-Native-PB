import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from '../Assets/Firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Routes from '../Assets/Routes';

export function SignIn({navigation}) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [userAuth, setUserAuth] = useState(false);

  function login (){
    setIsLoading(true);
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((credentials) => {
      // console.log(credentials.user);
      setUserAuth(true);
      setStatus("Logado com sucesso!");
    })
    .catch((error) => {
      if (error.message === "Firebase: Error (auth/invalid-credential)."){
        setStatus("Email ou Senha icorreto");
      }
    })
    .then(()=>{
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
      <Text style={styles.title}>Sign In Page</Text>
      <TextInput style={styles.input} placeholder="User name / E-mail" onChangeText={setUserEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={setUserPassword} />
      <Button
        title="Sign In"
        color="black"
        onPress={() => {
          login();
        }}
      />
      {status !== '' && <Text style={styles.status}>{status}</Text>}
      <Button
        title='Create a account'
        color='black'
        onPress={()=>{navigation.navigate(Routes.signUpPage)}}
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
