document.addEventListener('DOMContentLoaded', (event) => {
    // Carregar funcionários do cache ou cookies
    carregarFuncionarios();

    document.getElementById('adicionarFuncionario').addEventListener('click', adicionarFuncionario);
});

function adicionarFuncionario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    if (!nome || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Adicionar à tabela
    const tableBody = document.querySelector('#tabelaFuncionarios tbody');
    const newRow = tableBody.insertRow();

    const nomeCell = newRow.insertCell(0);
    const cpfCell = newRow.insertCell(1);
    const acaoCell = newRow.insertCell(2);

    nomeCell.textContent = nome;
    cpfCell.textContent = cpf;

    // Botão de remover
    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'X';
    removerBtn.className = 'removerBtn';
    removerBtn.addEventListener('click', () => {
        removerFuncionario(nome, cpf, newRow);
    });
    acaoCell.appendChild(removerBtn);

    // Salvar no cache ou cookies
    salvarFuncionario(nome, cpf);

    // Limpar campos
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
}

function salvarFuncionario(nome, cpf) {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push({ nome, cpf });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

function carregarFuncionarios() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const tableBody = document.querySelector('#tabelaFuncionarios tbody');

    funcionarios.forEach(funcionario => {
        const newRow = tableBody.insertRow();

        const nomeCell = newRow.insertCell(0);
        const cpfCell = newRow.insertCell(1);
        const acaoCell = newRow.insertCell(2);

        nomeCell.textContent = funcionario.nome;
        cpfCell.textContent = funcionario.cpf;

        // Botão de remover
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'X';
        removerBtn.className = 'removerBtn';
        removerBtn.addEventListener('click', () => {
            removerFuncionario(funcionario.nome, funcionario.cpf, newRow);
        });
        acaoCell.appendChild(removerBtn);
    });
}

function removerFuncionario(nome, cpf, row) {
    // Remover da tabela
    row.remove();

    // Remover do armazenamento local
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios = funcionarios.filter(func => func.nome !== nome || func.cpf !== cpf);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}
