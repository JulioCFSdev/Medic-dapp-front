import react from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../constants';
import styles from "../components/home/welcome/welcome.style";


const QR = ({ navigation }) => {
    const data = 'https://open.spotify.com/intl-pt/album/2rWL18jMYe1D6JsE4CHSF6?si=DAt6hoSgQ1ujmpaE0U7BoQ';


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
            <Text style={styles.welcomeMessage}>Escaneie o QRCode Abaixo</Text>
            <QRCode
                value={data}
                size={200} // Tamanho do QR code
                color="black" // Cor dos módulos do QR code
                backgroundColor="white" // Cor de fundo do QR code
            />
        </View>
    )
}

export default QR;

