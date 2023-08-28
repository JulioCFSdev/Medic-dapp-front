import React, { useState } from 'react';
import { View, TextInput, Pressable, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Web3 from 'web3';
import styles from '../components/home/welcome/welcome.style';
import { COLORS } from '../constants';
import dataABI from '../components/dataABI.json';
import { debug } from 'react-native-reanimated';

const Exam = () => {
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickedFile, setPickedFile] = useState(null);
  const [ipfsHash, setIPFSHASH] = useState('');

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDoctorChange = (text) => {
    setDoctor(text);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      // ... (restante da lógica para formatar a data)
    }
    toggleDatePicker();
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      setExamDate(currentDate.toDateString());
      toggleDatePicker();
    }
    toggleDatePicker();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPickedFile(selectedFile);
    }
  };

  const uploadFileToPinata = async (file) => {
    const apiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const apiKey = '2950368f2865e792233f'; // Substitua pelo seu próprio API Key da Pinata

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'pinata_api_key': apiKey,
          'pinata_secret_api_key': '346c7884040db7f07357c75c30af1ae32f82b1fd235abaabb7a7771c9aa332b1', // Substitua pelo seu próprio Secret API Key da Pinata
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setIPFSHASH(responseData.IpfsHash);
        console.log('Arquivo foi pinado no IPFS:', responseData);
        // Aqui você pode manipular a resposta do IPFS, por exemplo, armazenar o CID em algum lugar ou usá-lo de alguma forma.
      } else {
        console.error('Erro ao pinar o arquivo no IPFS');
      }
    } catch (error) {
      console.error('Erro ao pinar o arquivo no IPFS:', error);
    }
  };

  const handleSubmission = async () => {
    try {
      // Upload file to Pinata and obtain IPFS hash
      if (pickedFile) {
        await uploadFileToPinata(pickedFile);
      }
  
      // Rest of your code for Ethereum interaction remains the same
      const formattedDate = date.getDate().toString() +"/"+ date.getUTCMonth.toString() +"/"+ date.getFullYear().toString();
      console.log("Valores que serão passados para result:", title, doctor, formattedDate, location, ipfsHash);
  
      if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);

        const contractAddress = '0x4f04c93DB616931973a7865b97be771a6AC7858F'; // Endereço do contrato ExamStorage
        const contract = new web3.eth.Contract(dataABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        // Estimate gas
        const estimatedGas = await contract.methods
          .addExam(title, doctor, formattedDate, location, ipfsHash)
          .estimateGas({
            from: senderAddress,
          });

        // Send transaction
        const result = await contract.methods
          .addExam(title, doctor, formattedDate, location, ipfsHash)
          .send({
            from: senderAddress,
            gas: estimatedGas,
        });

      console.log('Transaction items', result);
      console.log('Transaction hash:', result.transactionHash);
    } else {
      console.error('MetaMask not available');
    }
  } catch (error) {
    console.error('Error during submission:', error);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Título do Exame</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Título do Exame"
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Médico Responsável</Text>
        <TextInput
          style={styles.input}
          value={doctor}
          onChangeText={handleDoctorChange}
          placeholder="Médico Responsável"
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data do Exame</Text>
        {/* Restante do código para o campo de data */}
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Local Realizado</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={handleLocationChange}
          placeholder="Consultório Médico"
        />
      </View>
    
      <View style={styles.fieldContainer}>
        <Text style={styles.label}></Text>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </View>

      <TouchableOpacity onPress={handleSubmission}>
        <Text>Submeter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Exam;