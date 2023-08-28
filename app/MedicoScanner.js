import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS } from '../constants';
import styles from "../components/home/welcome/welcome.style";
import { jsQR } from "jsqr";

const Scanner = ({ navigation }) => {
    const jsQR = require("jsqr");
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('insira o código do paciente abaixo ou coloque o QR Code na câmera');
    const [inputText, setInputText] = useState(''); // Novo estado para o input de texto

    const handleScan = (code) => {
        if (code) {
            setScanned(true);
            setText(code.data);
            console.log('Data:', code.data);

            if (isValidUrl(code.data)) {
                window.open(code.data, '_blank');
            }
        } else {
            console.error("Não foi possível decodificar o código QR");
        }
    }

    const handleScanAgain = () => {
        setScanned(false);
        setText('Coloque a Câmera do seu dispositivo sobre o código QR');
    }

    const handleSend = () => {
        if (inputText.trim() !== '') {
            // Trate o texto inserido pelo usuário
            console.log("Texto inserido:", inputText);
        }
    }

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        const videoElement = document.createElement('video');
        videoElement.id = 'video';
        document.body.appendChild(videoElement);

        const constraints = {
            video: true,
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                videoElement.srcObject = stream;

                const canvasElement = document.createElement('canvas');
                const canvasContext = canvasElement.getContext('2d');

                const scan = () => {
                    if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                        canvasElement.width = videoElement.videoWidth;
                        canvasElement.height = videoElement.videoHeight;
                        canvasContext.drawImage(videoElement, 50, 0, canvasElement.width, canvasElement.height);

                        const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
                        const code = jsQR(imageData.data, imageData.width, imageData.height, {
                            inversionAttempts: "dontInvert",
                        });

                        if (code) {
                            handleScan(code);
                        }

                        requestAnimationFrame(scan);
                    } else {
                        requestAnimationFrame(scan);
                    }
                };

                videoElement.play();
                requestAnimationFrame(scan);
            })
            .catch((error) => {
                console.error('Erro ao acessar a câmera:', error);
            });

        return () => {
            const videoElement = document.getElementById('video');
            if (videoElement) {
                videoElement.srcObject.getTracks().forEach(track => track.stop());
                document.body.removeChild(videoElement);
            }
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
            <Text style={{ marginTop: 20 }}>{text}</Text>

            {scanned && <TouchableOpacity title={'Escanear Novamente?'} onPress={handleScanAgain} />}

            <TextInput
                style={{ marginTop: 20, paddingHorizontal: 10, width: 200, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Insira o código do paciente..."
                value={inputText}
                onChangeText={setInputText}
            />
            <TouchableOpacity title={'Enviar'} onPress={handleSend}>
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Scanner;