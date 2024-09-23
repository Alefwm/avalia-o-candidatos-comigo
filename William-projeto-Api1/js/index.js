// Adiciona um evento de "submit" ao formulário com ID 'ticket-form'
document.getElementById('ticket-form').addEventListener('submit', async function(e) {
    // Previne o comportamento padrão do formulário (como o recarregamento da página)
    e.preventDefault();

    // Obtém os valores dos campos do formulário
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    // Elemento onde será exibida a resposta para o usuário
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = '';  // Limpa a mensagem anterior (se houver)

    try {
        // Envia uma requisição POST para a API com os dados do formulário
        const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST', // Método HTTP POST, usado para enviar dados
            headers: {
                'Content-Type': 'application/json' // Define o cabeçalho da requisição como JSON
            },
            // Converte os dados do formulário para JSON e os envia no corpo da requisição
            body: JSON.stringify({ title, description, priority })
        });

        // Converte a resposta da API para um objeto JavaScript
        const data = await response.json();

        // Verifica se a resposta não está dentro do intervalo 200-299 (indicando um erro)
        if (!response.ok) {
            // Extrai as mensagens de erro do campo 'errors', caso existam
            // Caso não exista o campo 'errors', usa a mensagem de erro padrão
            const errorMessages = data.errors 
                ? Object.values(data.errors).join('<br>') // Junta todas as mensagens de erro separadas por <br>
                : data.message || 'Ocorreu um erro desconhecido.'; // Se não houver 'errors', exibe a mensagem padrão

            // Exibe a mensagem de erro para o usuário
            responseElement.style.color = 'red'; // Cor vermelha para indicar erro
            responseElement.innerHTML = `Erro: <br> ${errorMessages}`;
        } else {
            // Se a requisição foi bem-sucedida (status 2xx)
            // Exibe a mensagem de sucesso
            responseElement.style.color = 'green'; // Cor verde para sucesso
            responseElement.innerHTML = 'Ticket cadastrado com sucesso!';
        }
    } catch (error) {
        // Caso ocorra um erro durante o envio da requisição ou na resposta da API
        responseElement.style.color = 'red'; // Cor vermelha para indicar erro
        responseElement.innerHTML = 'Erro ao cadastrar o ticket. Tente novamente mais tarde.';
    }
});