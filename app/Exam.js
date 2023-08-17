import React, { useState } from 'react';
import { View, TextInput, Pressable, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../components/home/welcome/welcome.style';
import { COLORS } from '../constants';

import { DocumentPicker } from 'react-native-document-picker'


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

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });
      if (doc) {
        console.log(doc);
        setPickedFile(doc);
      } else {
        console.log('Seleção de documento cancelada');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Seleção de arquivo cancelada');
      } else {
        console.log(err);
      }
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

      <TouchableOpacity style={styles.FileBtn2} onPress={selectDoc}>
        <Text style={{ color: 'white' }}>Inserir Arquivo do Exame</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ConBtn2} onPress={() => {}}>
        <Text style={{ color: 'white' }}>Submeter</Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
};

export default Exam;
