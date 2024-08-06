document.addEventListener('DOMContentLoaded', (event) => {
    carregarFuncionarios(); // Carregar funcionários cadastrados
    carregarSelecoes(); // Carregar seleções salvas
    
    document.getElementById('adicionarConjunto').addEventListener('click', adicionarConjunto);
    document.getElementById('gerarTextoButton').addEventListener('click', gerarTexto);
    
    // Adicionar eventos para salvar as seleções
    document.querySelector('.mercado').addEventListener('change', salvarSelecoes);
    document.querySelector('.area').addEventListener('change', salvarSelecoes);
    document.querySelector('.horaEntrada').addEventListener('change', salvarSelecoes);
    document.querySelector('.nomeFuncionario').addEventListener('change', salvarSelecoes);
    document.getElementById('dia').addEventListener('change', salvarSelecoes);
});

function carregarFuncionarios() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const selectFuncionario = document.querySelector('.nomeFuncionario');

    selectFuncionario.innerHTML = ''; // Limpar opções existentes

    funcionarios.forEach(funcionario => {
        const option = document.createElement('option');
        option.value = funcionario.nome;
        option.textContent = `${funcionario.nome} - \n${funcionario.cpf}`;
        selectFuncionario.appendChild(option);
    });
}

function carregarSelecoes() {
    const mercado = localStorage.getItem('mercado') || '';
    const area = localStorage.getItem('area') || '';
    const horaEntrada = localStorage.getItem('horaEntrada') || '';
    const nomeFuncionario = localStorage.getItem('nomeFuncionario') || '';
    const dia = localStorage.getItem('dia') || '';

    document.querySelector('.mercado').value = mercado;
    document.querySelector('.area').value = area;
    document.querySelector('.horaEntrada').value = horaEntrada;
    document.querySelector('.nomeFuncionario').value = nomeFuncionario;
    document.getElementById('dia').value = dia;
}

function salvarSelecoes() {
    const mercado = document.querySelector('.mercado').value;
    const area = document.querySelector('.area').value;
    const horaEntrada = document.querySelector('.horaEntrada').value;
    const nomeFuncionario = document.querySelector('.nomeFuncionario').value;
    const dia = document.getElementById('dia').value;

    localStorage.setItem('mercado', mercado);
    localStorage.setItem('area', area);
    localStorage.setItem('horaEntrada', horaEntrada);
    localStorage.setItem('nomeFuncionario', nomeFuncionario);
    localStorage.setItem('dia', dia);
}

function adicionarConjunto() {
    const mercado = document.querySelector('.mercado').value;
    const area = document.querySelector('.area').value;
    const horaEntrada = document.querySelector('.horaEntrada').value;
    const nomeFuncionario = document.querySelector('.nomeFuncionario').value;

    if (!mercado || !area || !horaEntrada || !nomeFuncionario) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tableBody = document.querySelector('#tabelaConjuntos tbody');
    const newRow = tableBody.insertRow();

    const mercadoCell = newRow.insertCell(0);
    const areaCell = newRow.insertCell(1);
    const horaCell = newRow.insertCell(2);
    const nomeFuncionarioCell = newRow.insertCell(3);

    mercadoCell.textContent = mercado;
    areaCell.textContent = area;
    horaCell.textContent = horaEntrada;
    nomeFuncionarioCell.textContent = nomeFuncionario;

    // Não limpar os campos após adicionar o conjunto
}

function gerarTexto() {
    const diaInput = document.getElementById('dia').value;
    const rows = document.querySelectorAll('#tabelaConjuntos tbody tr');
    let texto = '';
    let mercadosAdicionados = new Set(); // Armazena os mercados já adicionados

    if (!diaInput) {
        alert('Por favor, selecione um dia.');
        return;
    }

    // Formatar a data no formato DD/MM/AAAA
    const [ano, mes, dia] = diaInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    texto += `${dataFormatada}\n\n`; // Adiciona o dia no formato DD/MM/AAAA

    rows.forEach(row => {
        const mercado = row.cells[0].textContent;
        const area = row.cells[1].textContent;
        const hora = row.cells[2].textContent;
        const nomeFuncionario = row.cells[3].textContent;

        // Adiciona o mercado ao texto somente se ainda não foi adicionado
        if (!mercadosAdicionados.has(mercado)) {
            texto += `*${mercado}*\n`;
            mercadosAdicionados.add(mercado);
        }

        texto += `_${area} ${hora}_\n`;

        // Encontrar o CPF correspondente ao nome do funcionário
        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        const funcionario = funcionarios.find(f => f.nome === nomeFuncionario);

        if (funcionario) {
            texto += `${funcionario.nome}\n${funcionario.cpf}\n\n`;
        } else {
            texto += `${nomeFuncionario}\n\n`; // Se não encontrar o CPF, ainda mostra o nome
        }
    });

    document.getElementById('textoGerado').value = texto.trim();
}
