import react, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { COLORS } from '../constants';
import styles from "../components/home/welcome/welcome.style";

import { useState} from "react";
import {BarCodeScanner} from 'expo-barcode-scanner';
import { Button } from "react-native-web";


const Scanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Coloque a Câmera do seu dispositivo sobre o código QR');

    const askForCameraPermission = () =>{
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    useEffect (() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData ' + data)
    }

    if(hasPermission == null){
        return(
            <View style ={styles.container}>
                <Text>Aguardando Permissão da Camera</Text>
            </View>
        )
    }

    if(hasPermission == false){
        return(
            <View style ={styles.container}>
                <Text style ={{margin: 10}}>Acesso Negado</Text>
                <TouchableOpacity title= {'Permitir Acesso'} onPress={() => askForCameraPermission()}></TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
            <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
                style = {{height: 400, width: 400, marginLeft: -55, marginTop: -200}}
            />
            <Text style={{marginTop:50}}>{text}</Text>
                
            {scanned && <TouchableOpacity title = {'Escanear Novamente?'} onPress={() => setScanned(false)}/>}
    
        </View>
    )
}

export default Scanner;

