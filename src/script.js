document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('adicionarConjunto').addEventListener('click', adicionarConjunto);
    document.getElementById('gerarTextoButton').addEventListener('click', gerarTexto);

    // Estrutura para armazenar os mercados e suas informações
    window.mercados = {};

    // Valores padrão
    window.ultimoMercado = 'Condor Água Verde';
    window.ultimaArea = 'Corte Hortfruit';
    window.ultimaHoraEntrada = '08:00';
});

function adicionarConjunto() {
    const mercado = document.querySelector('.conjunto .mercado').value;
    const area = document.querySelector('.conjunto .area').value;
    const horaEntrada = document.querySelector('.conjunto .horaEntrada').value;

    // Adicionar ou atualizar o mercado na estrutura de dados
    if (!window.mercados[mercado]) {
        window.mercados[mercado] = [];
    }
    window.mercados[mercado].push({ area, horaEntrada });

    // Adicionar à tabela
    const tableBody = document.querySelector('#tabelaConjuntos tbody');
    const newRow = tableBody.insertRow();

    const mercadoCell = newRow.insertCell(0);
    const areaCell = newRow.insertCell(1);
    const horaEntradaCell = newRow.insertCell(2);

    mercadoCell.textContent = mercado;
    areaCell.textContent = area;
    horaEntradaCell.textContent = horaEntrada;

    // Atualizar valores padrão
    window.ultimoMercado = mercado;
    window.ultimaArea = area;
    window.ultimaHoraEntrada = horaEntrada;

    // Redefinir os campos de seleção com os valores padrão
    document.querySelector('.conjunto .mercado').value = window.ultimoMercado;
    document.querySelector('.conjunto .area').value = window.ultimaArea;
    document.querySelector('.conjunto .horaEntrada').value = window.ultimaHoraEntrada;
}

function gerarTexto() {
    const dia = document.getElementById('dia').value;
    const data = new Date(dia + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    let texto = `${dataFormatada}\n\n`;

    for (const [mercado, infos] of Object.entries(window.mercados)) {
        texto += `*${mercado}*\n`;
        infos.forEach(info => {
            texto += `_${info.area} ${info.horaEntrada}_\n`;
        });
        texto += `\n`; // Quebra de linha após cada mercado
    }

    const textoGerado = document.getElementById('textoGerado');
    textoGerado.value = texto;
}
