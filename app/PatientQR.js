import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { COLORS } from "../constants";
import styles from "../components/home/welcome/welcome.style";
import Web3 from 'web3'; // Importe o módulo web3

const QR = ({ navigation }) => {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    // Função para conectar à carteira MetaMask
    const connectToMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        // Solicitar permissão ao usuário
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
      }
    };

    connectToMetaMask();
  }, []);

  const qrData = `https://medicaldapp.com/patient/${userAddress}`;

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.lightWhite }}>
      <Text style={styles.welcomeMessage}>Escaneie o QRCode Abaixo</Text>
      <QRCode
        value={qrData}
        size={200} // Tamanho do QR code
        color="black" // Cor dos módulos do QR code
        backgroundColor="white" // Cor de fundo do QR code
      />
      <Text style={{ marginTop: 20, fontSize: 16 }}>{qrData}</Text>
    </View>
  );
};

export default QR;
