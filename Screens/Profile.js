import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Profile ({navigation}){
    return (
        <View style={styles.container}>
            <Text style={styles.textWarning}>Volte mais tarde, estamos trabalhando aqui...</Text>
            <Icon name='gear' size={100} color={'black'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    textWarning: {
        fontSize: 30,
        color: 'red',
        textAlign: 'center',
    },
});