import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// Importando constantes de cores e estilos
import { COLORS } from '../constants';
import styles from "../components/home/welcome/welcome.style";

// Importando a biblioteca jsQR para decodificação de QR Code
import { jsQR } from "jsqr";

// Definindo o componente Scanner para digitalização de QR Code
const Scanner = ({ navigation }) => {
    const jsQR = require("jsqr");

    // Estado para controlar se o código foi escaneado
    const [scanned, setScanned] = useState(false);

    // Estado para exibir o texto de saída
    const [text, setText] = useState('Insira o código do paciente abaixo ou coloque o QR Code na câmera');

    // Estado para armazenar o texto inserido pelo usuário
    const [inputText, setInputText] = useState('');

    // Função para lidar com o resultado do scan
    const handleScan = (code) => {
        if (code) {
            setScanned(true);
            setText(code.data);
            console.log('Data:', code.data);

            // Verificar se o dado escaneado é uma URL válida
            if (isValidUrl(code.data)) {
                window.open(code.data, '_blank');
            }
        } else {
            console.error("Não foi possível decodificar o código QR");
        }
    }

    // Função para lidar com o pressionamento de escanear novamente
    const handleScanAgain = () => {
        setScanned(false);
        setText('Coloque a Câmera do seu dispositivo sobre o código QR');
    }

    // Função para lidar com o envio do texto inserido
    const handleSend = () => {
        if (inputText.trim() !== '') {
            // Trate o texto inserido pelo usuário
            console.log("Texto inserido:", inputText);
        }
    }

    // Função para verificar se uma string é uma URL válida
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Efeito para inicializar a câmera e realizar a digitalização
    useEffect(() => {
        // Criação do elemento de vídeo
        const videoElement = document.createElement('video');
        videoElement.id = 'video';
        document.body.appendChild(videoElement);

        // Configuração das restrições de mídia
        const constraints = {
            video: true,
        };

        // Aquisição da permissão para acessar a câmera
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                // Associação do stream de vídeo ao elemento de vídeo
                videoElement.srcObject = stream;

                // Criação do elemento de canvas para manipulação de imagem
                const canvasElement = document.createElement('canvas');
                const canvasContext = canvasElement.getContext('2d');

                // Função de digitalização
                const scan = () => {
                    if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                        canvasElement.width = videoElement.videoWidth;
                        canvasElement.height = videoElement.videoHeight;
                        canvasContext.drawImage(videoElement, 50, 0, canvasElement.width, canvasElement.height);

                        const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);

                        // Decodificação do QR Code usando a biblioteca jsQR
                        const code = jsQR(imageData.data, imageData.width, imageData.height, {
                            inversionAttempts: "dontInvert",
                        });

                        // Lidar com o resultado do scan
                        if (code) {
                            handleScan(code);
                        }

                        // Próximo ciclo de animação
                        requestAnimationFrame(scan);
                    } else {
                        // Próximo ciclo de animação
                        requestAnimationFrame(scan);
                    }
                };

                // Iniciar a reprodução do vídeo e iniciar a digitalização
                videoElement.play();
                requestAnimationFrame(scan);
            })
            .catch((error) => {
                console.error('Erro ao acessar a câmera:', error);
            });

        // Função de limpeza ao desmontar o componente
        return () => {
            const videoElement = document.getElementById('video');
            if (videoElement) {
                // Parar e liberar o stream de vídeo
                videoElement.srcObject.getTracks().forEach(track => track.stop());
                // Remover o elemento de vídeo do corpo do documento
                document.body.removeChild(videoElement);
            }
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
            {/* Exibir o texto de saída */}
            <Text style={{ marginTop: 20 }}>{text}</Text>

            {/* Botão para escanear novamente */}
            {scanned && <TouchableOpacity title={'Escanear Novamente?'} onPress={handleScanAgain} />}

            {/* Input de texto para inserir o código manualmente */}
            <TextInput
                style={{ marginTop: 20, paddingHorizontal: 10, width: 200, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Insira o código do paciente..."
                value={inputText}
                onChangeText={setInputText}
            />

            {/* Botão para enviar o texto inserido */}
            <TouchableOpacity title={'Enviar'} onPress={handleSend}>
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}

// Exportar o componente Scanner como padrão
export default Scanner;
