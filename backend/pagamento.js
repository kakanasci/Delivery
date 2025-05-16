document.addEventListener('DOMContentLoaded', () => {
  const pedido = JSON.parse(localStorage.getItem('pedido')) || {};
  let total = parseFloat(pedido.total) || 0;

  document.getElementById('totalPagamento').textContent = `R$ ${total.toFixed(2)}`;

  document.getElementById('gerarPix').addEventListener('click', async () => {
    document.getElementById('statusPix').textContent = 'Gerando PIX, aguarde...';
    document.getElementById('qrCodeContainer').innerHTML = '';
    document.getElementById('chavePix').textContent = '';
    document.getElementById('pixChave').classList.add('hidden');

    try {
      const res = await fetch('http://localhost:3000/gerar-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: total })
      });

      if (!res.ok) throw new Error('Erro ao gerar Pix');

      const data = await res.json();

      document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.qrcode}" alt="QR Code Pix">`;
      document.getElementById('chavePix').textContent = data.copiaecola;
      document.getElementById('pixChave').classList.remove('hidden');
      document.getElementById('statusPix').textContent = 'Use o QR Code ou copie a chave Pix abaixo.';
    } catch (e) {
      console.error('Erro ao gerar Pix:', e);
      document.getElementById('statusPix').textContent = 'Erro ao gerar Pix.';
    }
  });
});
