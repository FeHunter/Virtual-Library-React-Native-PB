import { Pressable, Text, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export function ButtonCard ({label, icon, onPress}){
    return (
        <Pressable style={styles.cardBtn} onPress={onPress}>
            <Icon name={icon} size={30} color={'white'} />
            <Text style={styles.cardText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    ...Platform.select({
        android: {
            cardBtn: {
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#556b2f',
                borderRadius: 10,
                margin: 10,
            },
            cardText: {
                fontSize: '1.2em',
                textAlign: 'center',
                color: 'white'
            },
        },
        ios: {
            cardBtn: {
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#191970',
                borderRadius: 10,
                margin: 10,
            },
            cardText: {
                fontSize: '1.2em',
                textAlign: 'center',
                color: 'white'
            },
        },
        web: {
            cardBtn: {
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#800020',
                borderRadius: 10,
                margin: 10,
            },
            cardText: {
                fontSize: '1.2em',
                textAlign: 'center',
                color: 'white'
            },
        }
    })
});