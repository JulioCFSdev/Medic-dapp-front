import react from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import QRCode from 'react-native-qrcode-svg';


const QR = ({ navigation }) => {
    const data = 'https://chat.openai.com/c/bf1db05b-0973-41b1-b141-156c70352490';


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <QRCode
                value={data}
            />
            <Text>Scan QR Code</Text>
        </View>
    )
}

export default QR;

