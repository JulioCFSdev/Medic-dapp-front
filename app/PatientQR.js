import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { COLORS } from "../constants";
import styles from "../components/home/welcome/welcome.style";
import Web3 from 'web3'; 

// Definindo o componente QR que gera e exibe um QR Code
const QR = ({ navigation }) => {
  // Estado para armazenar o endereço do usuário da carteira MetaMask
  const [userAddress, setUserAddress] = useState('');

  // Efeito para conectar à carteira MetaMask ao carregar o componente
  useEffect(() => {
    // Função para conectar à carteira MetaMask
    const connectToMetaMask = async () => {
      // Verificar se a carteira MetaMask está instalada no navegador
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        // Solicitar permissão ao usuário para acessar a carteira
        await window.ethereum.enable();

        // Obter os endereços da carteira MetaMask
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
      }
    };

    // Chamar a função de conexão à carteira MetaMask
    connectToMetaMask();
  }, []);

  // Dados para o QR Code, contendo o endereço do usuário
  const qrData = `Código do Paciente: ${userAddress}`;

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.lightWhite }}>
      {/* Mensagem de boas-vindas */}
      <Text style={styles.welcomeMessage}>Escaneie o QRCode Abaixo</Text>
      
      {/* Componente QR Code */}
      <QRCode
        value={qrData}
        size={200} // Tamanho do QR code
        color="black" // Cor dos módulos do QR code
        backgroundColor="white" // Cor de fundo do QR code
      />
      
      {/* Exibição dos dados do QR Code */}
      <Text style={{ marginTop: 20, fontSize: 16 }}>{qrData}</Text>
    </View>
  );
};

// Exportando o componente QR como padrão
export default QR;
