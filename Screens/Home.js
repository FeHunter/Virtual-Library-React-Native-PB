import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonCard } from '../components/Home/ButtonCard';
import Routes from '../Assets/Routes';

export function Home ({navigation, route}){

    const { userAuth } = route.params || {};
    const [logado, setLogado] = useState(userAuth);

    useEffect(()=>{
        setTimeout(() => {
            setLogado(userAuth);
        }, 1000);
    }, [userAuth])

    function navigateToLoginOrProfile (){
        if (logado){
            navigation.navigate(Routes.profile)
        }else{
            navigation.navigate(Routes.signInPage)
        }
    }

    function navigateToGallary (){
        if (logado){
            navigation.navigate(Routes.gallary);
        }else{
            alert("Para acessa a galeria é necessário esta logado.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bem vindo a Tech-Library</Text>
                {logado ? <Text style={styles.logadoText}>logado</Text> : <Text style={styles.logadoText}>Não logado</Text>}
                <Icon name='user' size={30} color={'white'} />
            </View>
            <ScrollView >
                <View style={styles.body}>
                    <ButtonCard label={"Profile"} icon={"user"} onPress={()=>{navigateToLoginOrProfile()}} />
                    <ButtonCard label={"Lista de livros"} icon={"book"} onPress={()=>{navigation.navigate(Routes.bookList)}} />
                    <ButtonCard label={"Galeria"} icon={"image"} onPress={()=>{navigateToGallary()}} />
                    <ButtonCard label={"Sobre nós"} icon={"question"} onPress={()=>{navigation.navigate(Routes.aboutUs)}} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#654321',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: '2em',
        textAlign: 'center',
        marginVertical: 5,
        color: 'white',
    },
    logadoText: {
        fontSize: '1em',
        color: 'whitesmoke',
        fontStyle: 'italic',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 50,
    },
});
