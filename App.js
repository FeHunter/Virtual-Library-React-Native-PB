import { SafeAreaView, StyleSheet } from 'react-native';

// Screens
import { BookList } from './Screens/BookList';
import { BookCardDetails } from './components/BookCardDetails';
import { SignIn } from './Screens/SignIn';
import { SignUp } from './Screens/SignUp';
import { Gallary } from './Screens/Gallary';
import { RegisterImage } from './Screens/RegisterImage';

import Routes from './Assets/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.signInPage}>
            <Stack.Screen name={Routes.home} component={BookList} />
            <Stack.Screen name={Routes.bookDetails} component={BookCardDetails} />
            <Stack.Screen name={Routes.signInPage} component={SignIn} />
            <Stack.Screen name={Routes.signUpPage} component={SignUp} />
            <Stack.Screen name={Routes.gallary} component={Gallary} />
            <Stack.Screen name={Routes.registerImage} component={RegisterImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
