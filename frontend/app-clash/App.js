import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Estado para todos os parâmetros necessários
  const [card, setCard] = useState(''); // Carta X
  const [card2, setCard2] = useState(''); // Carta X
  const [percentage, setPercentage] = useState(''); // Porcentagem X
  const [timestamps1Inicio, setTimestamps1Inicio] = useState(''); // Intervalo de timestamps
  const [timestamps1Fim, setTimestamps1Fim] = useState(''); // Intervalo de timestamps
  const [timestamps2, setTimestamps2] = useState(''); // Intervalo de timestamps
  const [timestamps3, setTimestamps3] = useState(''); // Intervalo de timestamps
  const [timestamps4, setTimestamps4] = useState(''); // Intervalo de timestamps
  const [comboCards, setComboCards] = useState(''); // Combo de cartas (X1,X2,...)
  const [trophyPercentage, setTrophyPercentage] = useState(''); // Z%
  const [duration, setDuration] = useState(''); // Duração da partida
  const [towerCount, setTowerCount] = useState(''); // Número de torres derrubadas
  const [comboSize, setComboSize] = useState(''); // Tamanho N do combo
  const [victoryPercentage, setVictoryPercentage] = useState(''); // Y%


  const calcularVitorias = async () => {
    try {
      const response = await fetch(`http://localhost:5000/vitorias?carta_id=${card}&start_time=${timestamps1Inicio}&end_time=${timestamps1Fim}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Porcentagem de vitórias:', data);
        // Aqui você pode armazenar os dados na sua state, se necessário
      } else {
        console.error('Erro:', data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };


  return (
    <>
      <View style={styles.app}>      
        <View style={styles.gridContainer}>

          {/* 1. Calcule a porcentagem de vitórias e derrotas utilizando a carta X */}
          <Card style={styles.card}>
            <Card.Content>
              <Text>Calcule a porcentagem de vitórias e derrotas</Text>
              <TextInput
                label="Digite a carta (X)"
                value={card}
                onChangeText={setCard}
                mode="outlined" 
                style={styles.input}
              />
              {/* <TextInput
                label="Digite o intervalo de timestamps"
                value={}
                onChangeText={}
                mode="outlined" 
                style={styles.input}
              /> */}

              <DatePicker 
              style={styles.DatePicker}
                selected={timestamps1Inicio} 
                onChange={setTimestamps1Inicio} 
                dateFormat="dd-MM-yyyy" // Formato da data
                placeholderText="data inicio"
              />

              <DatePicker 
                style={styles.DatePicker}
                selected={timestamps1Fim} 
                onChange={setTimestamps1Fim} 
                dateFormat="dd-MM-yyyy" // Formato da data
                placeholderText="data final"
              />

              {/* <TextInput
                label="Digite o intervalo de timestamps"
                value={timestamps1Fim}
                onChangeText={setTimestamps1Fim}
                mode="outlined" 
                style={styles.input}
              /> */}
            
            </Card.Content>
            <Button 
              mode="contained" 
              onPress={calcularVitorias} 
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

          {/* 2. Liste os decks completos que produziram mais de X% de vitórias */}
          <Card style={styles.card}>
            <Card.Content>
              <Text>Liste decks com mais de X% de vitórias</Text>
              <TextInput
                label="Digite a porcentagem (X)"
                value={percentage}
                onChangeText={setPercentage}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Digite o intervalo de timestamps"
                value={timestamps2}
                onChangeText={setTimestamps2}
                mode="outlined" 
                style={styles.input}
              />
            </Card.Content>
            <Button 
              mode="contained" 
              onPress={() => console.log('Porcentagem e Timestamp:', percentage, timestamps2)} 
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

          {/* 3. Calcule a quantidade de derrotas utilizando o combo de cartas */}
          <Card style={styles.card}>
            <Card.Content>
              <Text>Calcule derrotas com combo de cartas</Text>
              <TextInput
                label="Digite o combo de cartas (X1,X2,...)"
                value={comboCards}
                onChangeText={setComboCards}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Digite o intervalo de timestamps"
                value={timestamps3} // Reutilizando o primeiro timestamp
                onChangeText={setTimestamps3}
                mode="outlined" 
                style={styles.input}
              />
            </Card.Content>
            <Button 
              mode="contained" 
              onPress={() => console.log('Combo de cartas e Timestamp:', comboCards, timestamps3)} 
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

          {/* 4. Calcule a quantidade de vitórias envolvendo a carta X */}
          <Card style={styles.card}>
            <Card.Content>
              <Text>Vitórias com carta X e condições específicas</Text>
              <TextInput
                label="Digite a carta (X)"
                value={card2}
                onChangeText={setCard2}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Digite Z% (menos troféus)"
                value={trophyPercentage}
                onChangeText={setTrophyPercentage}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />             
            </Card.Content>
            <Button 
              mode="contained" 
              onPress={() => console.log('Carta, Z%, Duração e Torres:', card, trophyPercentage, duration, towerCount)} 
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

          {/* 5. Liste o combo de cartas de tamanho N que produziu mais de Y% de vitórias */}
          <Card style={styles.card}>
            <Card.Content>
              <Text>Combo de cartas de tamanho N com mais de Y% de vitórias</Text>
              <TextInput
                label="Digite o tamanho do combo (N)"
                value={comboSize}
                onChangeText={setComboSize}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Digite a porcentagem (Y)"
                value={victoryPercentage}
                onChangeText={setVictoryPercentage}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Digite o intervalo de timestamps"
                value={timestamps3} // Reutilizando o primeiro timestamp
                onChangeText={setTimestamps4}
                mode="outlined" 
                style={styles.input}
              />
            </Card.Content>
            <Button 
              mode="contained" 
              onPress={() => console.log('Tamanho do combo, Y% e Timestamp:', comboSize, victoryPercentage, timestamps4)} 
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>         
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '5%'
  },
  gridContainer: { 
    flexDirection: 'row',          
    flexWrap: 'wrap',              
    justifyContent: 'center', 
    width: '100%',                
    paddingHorizontal: 10,      
  },
  card: {
    width: '45%',
    marginVertical: '2%',
    marginHorizontal: '2%',
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center'
  },
  DatePicker: {
    zIndex:9999,
    position:'relative'
  }
});
