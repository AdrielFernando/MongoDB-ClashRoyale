import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DecksPorcentagem, comboCardsVictoryPercentage, calcularVitorias } from './services';


export default function App() {
  const [card, setCard] = useState('');
  const [card2, setCard2] = useState('');
  const [percentage, setPercentage] = useState('');
  const [timestamps1Inicio, setTimestamps1Inicio] = useState(null);
  const [timestamps1Fim, setTimestamps1Fim] = useState(null);
  const [timestamps2Inicio, setTimestamps2Inicio] = useState(null);
  const [timestamps2Fim, setTimestamps2Fim] = useState(null);
  const [timestamps3Inicio, setTimestamps3Inicio] = useState(null);
  const [timestamps3Fim, setTimestamps3Fim] = useState(null);
  const [timestamps4, setTimestamps4] = useState(null);
  const [timestamps5Inicio, setTimestamps5Inicio] = useState(null);
  const [timestamps5Fim, setTimestamps5Fim] = useState(null);
  const [comboCards, setComboCards] = useState('');
  const [trophyPercentage, setTrophyPercentage] = useState('');
  const [comboSize, setComboSize] = useState('');
  const [victoryPercentage, setVictoryPercentage] = useState('');

  const handleCalcularVitorias = async () => {
    await calcularVitorias(card, timestamps1Inicio, timestamps1Fim);
  };


  const handleListDecks = async () => {
    try {
      const response = await DecksPorcentagem(percentage, timestamps2Inicio, timestamps2Fim);
      console.log('Resposta do Flask:', response.data);
    } catch (error) {
      console.error('Erro ao listar decks:', error);
    }
  };


  const handleCalcularCombo = async () => {
    const data = await comboCardsVictoryPercentage(comboCards, victoryPercentage, timestamps5Inicio, timestamps5Fim);
    console.log('Resposta do serviço de combo:', data);
  };

  return (
    <>
      <View style={styles.app}>
        <View style={styles.gridContainer}>

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
              <View style={styles.datePickerContainer}>
                <DatePicker
                  selected={timestamps1Inicio}
                  onChange={(date) => setTimestamps1Inicio(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data início"
                  className="datePicker-wrapper"
                  popperPlacement="top" // Abrindo para cima
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5', // Ajusta o offset do calendário
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper" // Class para estilização
                />
                <DatePicker
                  selected={timestamps1Fim}
                  onChange={(date) => setTimestamps1Fim(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data final"
                  className="datePicker-wrapper"
                  popperPlacement="top" // Abrindo para cima
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5', // Ajusta o offset do calendário
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper" // Class para estilização
                />
              </View>
            </Card.Content>
            <Button
              mode="contained"
              onPress={handleCalcularVitorias}
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

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
    <View style={styles.datePickerContainer}>
      <DatePicker
        selected={timestamps2Inicio}
        onChange={(date) => setTimestamps2Inicio(date)}
        dateFormat="dd-MM-yyyy"
        placeholderText="Data início"
        className="datePicker-wrapper"
        popperPlacement="top" 
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '0, -5', 
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
          },
        }}
        wrapperClassName="datePicker-wrapper" 
      />
      <DatePicker
        selected={timestamps2Fim}
        onChange={(date) => setTimestamps2Fim(date)}
        dateFormat="dd-MM-yyyy"
        placeholderText="Data final"
        className="datePicker-wrapper"
        popperPlacement="top" 
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '0, -5', 
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
          },
        }}
        wrapperClassName="datePicker-wrapper" 
      />
    </View>
  </Card.Content>
  <Button
    mode="contained"
    onPress={handleListDecks}
    style={styles.button}
  >
    Procurar
  </Button>
</Card>

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
              <View style={styles.datePickerContainer}>
                <DatePicker
                  selected={timestamps3Inicio}
                  onChange={(date) => setTimestamps3Inicio(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data início"
                  className="datePicker-wrapper"
                  popperPlacement="top" // Abrindo para cima
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5', // Ajusta o offset do calendário
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper" // Class para estilização
                />
                <DatePicker
                  selected={timestamps3Fim}
                  onChange={(date) => setTimestamps3Fim(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data final"
                  className="datePicker-wrapper"
                  popperPlacement="top" // Abrindo para cima
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5', // Ajusta o offset do calendário
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper" // Class para estilização
                />
              </View>
            </Card.Content>
            <Button
              mode="contained"
              onPress={() => console.log('Combo de cartas e Timestamp:', comboCards, timestamps3)}
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

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
              onPress={() => console.log('Carta, Z%, Duração e Torres:', card2, trophyPercentage, duration, towerCount)}
              style={styles.button}
            >
              Procurar
            </Button>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text>Calcule a porcentagem de vitórias de combos</Text>
              <TextInput
                label="Digite a porcentagem de vitórias"
                value={victoryPercentage}
                onChangeText={setVictoryPercentage}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
              <View style={styles.datePickerContainer}>
                <DatePicker
                  selected={timestamps5Inicio}
                  onChange={(date) => setTimestamps5Inicio(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data início"
                  className="datePicker-wrapper"
                  popperPlacement="top"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5',
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper"
                />
                <DatePicker
                  selected={timestamps5Fim}
                  onChange={(date) => setTimestamps5Fim(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Data final"
                  className="datePicker-wrapper"
                  popperPlacement="top"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: '0, -5',
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  wrapperClassName="datePicker-wrapper"
                />
              </View>
            </Card.Content>
            <Button
              mode="contained"
              onPress={handleCalcularCombo}
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
    paddingTop: '8%'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
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
    marginTop: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
