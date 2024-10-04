export const calcularVitorias = async (card, timestamps1Inicio, timestamps1Fim) => {
    const start_time = timestamps1Inicio ? timestamps1Inicio.toISOString().split('T')[0] : '';
    const end_time = timestamps1Fim ? timestamps1Fim.toISOString().split('T')[0] : '';
  
    try {
      const response = await fetch(`http://localhost:5000/vitorias?carta_id=${card}&start_time=${start_time}&end_time=${end_time}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Porcentagem de vitórias:', data);
        // Aqui você pode retornar os dados para armazená-los no estado se necessário
        return data;
      } else {
        console.error('Erro:', data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };


  export const DecksPorcentagem = async (percentage, timestamps2Inicio, timestamps2Fim) => {
    const start_time = timestamps2Inicio ? timestamps2Inicio.toISOString().split('T')[0] : '';
    const end_time = timestamps2Fim ? timestamps2Fim.toISOString().split('T')[0] : '';

    try {
        const response = await fetch(`http://localhost:5000/decks?percentage=${percentage}&start_time=${start_time}&end_time=${end_time}`);
        const data = await response.json();

        if (response.ok) {
            console.log('Decks com mais de X% de vitórias:', data);           
            return data;
        } else {
            console.error('Erro:', data.error);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};


export const comboCardsVictoryPercentage = async (comboCards, victoryPercentage, timestamps5Inicio, timestamps5Fim) => {
    const start_time = timestamps5Inicio ? timestamps5Inicio.toISOString().split('T')[0] : '';
    const end_time = timestamps5Fim ? timestamps5Fim.toISOString().split('T')[0] : '';
  
    try {
      const response = await fetch(`http://localhost:5000/combo_vitorias?combo=${comboCards}&victory_percentage=${victoryPercentage}&start_time=${start_time}&end_time=${end_time}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Dados do combo de cartas:', data);
        // Aqui você pode retornar os dados para armazená-los no estado se necessário
        return data;
      } else {
        console.error('Erro:', data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };