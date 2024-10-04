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