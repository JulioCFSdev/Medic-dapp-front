import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { COLORS } from '../constants';
import styles from "../components/home/welcome/welcome.style";

import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Coloque a Câmera do seu dispositivo sobre o código QR');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })();
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData ' + data)
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Aguardando Permissão da Câmera</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Acesso Negado</Text>
                <TouchableOpacity title={'Permitir Acesso'} onPress={() => askForCameraPermission()}></TouchableOpacity>
            </View>
        )
    }

    // Verificar se o ambiente é a web
    if (Platform.OS === 'web') {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
                <Text>Leitura de QR Code não é suportada na web.</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400, marginLeft: -55, marginTop: -200 }}
            />
            <Text style={{ marginTop: 50 }}>{text}</Text>

            {scanned && <TouchableOpacity title={'Escanear Novamente?'} onPress={() => setScanned(false)} />}

        </View>
    )
}

export default Scanner;
