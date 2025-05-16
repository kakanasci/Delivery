require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // importar cors
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // habilitar CORS para qualquer origem

const PORT = process.env.PORT_BACKEND || 4000; // usar porta 4000 por padrão

app.post('/gerar-pix', async (req, res) => {
  const { valor } = req.body;

  if (!valor || isNaN(valor)) {
    return res.status(400).json({ error: 'Valor inválido' });
  }

  try {
    const response = await axios.post(
      'https://api.pushinpay.com.br/api/pix/cashIn',
      {
        value: Math.round(valor * 100), // valor em centavos
        webhook_url: "" // opcional
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PUSHINPAY_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      copiaecola: response.data.qr_code,
      qrcode: response.data.qr_code_base64,
      id: response.data.id
    });

  } catch (error) {
    if (error.response) {
      console.error("Erro ao gerar Pix:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Erro inesperado:", error.message);
    }
    res.status(500).json({ error: 'Erro ao gerar Pix' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
