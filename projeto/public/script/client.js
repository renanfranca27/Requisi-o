// Seu script JavaScript para o cliente
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            hora: document.getElementById('hora').value,
            solicitante: document.getElementById('solicitante').value,
            setor: document.getElementById('setor').value,
            op: document.getElementById('op').value,
            etapa: document.getElementById('etapa').value,
            item: document.getElementById('item').value,
            codigo: document.getElementById('codigo').value,
            tamanho: document.getElementById('tamanho').value,
            quantidade: document.getElementById('quantidade').value,
            defeito: document.getElementById('defeito').value,
            observacoes: document.getElementById('observacoes').value
        };

        axios.post('http://localhost:3000/salvar-dados', formData)
            .then(response => {
                alert('Dados enviados com sucesso!');
                console.log(response.data); // Aqui você pode lidar com a resposta do servidor, se necessário
            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao enviar dados. Verifique o console para mais detalhes.');
            });
    });
});
