import React, { useState } from 'react';
import { View, TextInput, Pressable, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../components/home/welcome/welcome.style';
import { COLORS } from '../constants';

const Exam = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [pickedFile, setPickedFile] = useState(null);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      setExamDate(currentDate.toDateString()); // Atualizar a data do exame
      toggleDatePicker(); // Fechar o DatePicker
    }
    toggleDatePicker(); // Fechar o DatePicker sem selecionar uma data
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadFileToPinata(selectedFile);
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
        const data = await response.json();
        console.log('Arquivo foi pinado no IPFS:', data);
        // Aqui você pode manipular a resposta do IPFS, por exemplo, armazenar o CID em algum lugar ou usá-lo de alguma forma.
      } else {
        console.error('Erro ao pinar o arquivo no IPFS');
      }
    } catch (error) {
      console.error('Erro ao pinar o arquivo no IPFS:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Título do Exame</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Título do Exame"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Médico Responsável</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Médico Responsável"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data do Exame</Text>
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/aa"
            value={examDate}
            placeholderTextColor="black"
            editable={false}
          />
        </Pressable>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Local Realizado</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Local Realizado"
        />
      </View>

    
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Inserir Arquivo do Exame (PDF)</Text>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </View>

      <TouchableOpacity style={styles.ConBtn2} onPress={() => {}}>
        <Text style={{ color: 'white' }}>Submeter</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Exam;