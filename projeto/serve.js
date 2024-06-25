const express = require('express');
const app = express();
const axios = require('axios');
const ExcelJS = require('exceljs');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const port = 3000;

// Middleware para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// Rota para receber os dados e gerar o arquivo Excel
app.post('/salvar-dados', async (req, res) => {
    const formData = req.body;

    try {
        // Gerar o arquivo Excel com os dados recebidos
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Dados do Formulário');

        // Cabeçalho da planilha
        sheet.addRow(['Hora', 'Solicitante', 'Setor', 'OP', 'Etapa', 'Item', 'Código', 'Tamanho', 'Quantidade', 'Defeito', 'Observações']);
        
        // Dados do formulário
        sheet.addRow([
            formData.hora,
            formData.solicitante,
            formData.setor,
            formData.op,
            formData.etapa,
            formData.item,
            formData.codigo,
            formData.tamanho,
            formData.quantidade,
            formData.defeito,
            formData.observacoes
        ]);

        // Gerar o arquivo Excel
        const filePath = path.join(__dirname, 'public', 'dados_formulario.xlsx');
        await workbook.xlsx.writeFile(filePath);

        // Enviar o caminho do arquivo Excel de volta para o cliente
        res.send({ filePath });
    } catch (error) {
        console.error('Erro ao gerar o arquivo Excel:', error);
        res.status(500).send('Erro ao processar os dados');
    }
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
