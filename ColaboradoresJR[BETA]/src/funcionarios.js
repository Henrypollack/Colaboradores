document.addEventListener('DOMContentLoaded', (event) => {
    carregarFuncionarios();

    document.getElementById('adicionarFuncionario').addEventListener('click', adicionarFuncionario);
});

function carregarFuncionarios() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const tabelaFuncionarios = document.querySelector('#tabelaFuncionarios tbody');

    tabelaFuncionarios.innerHTML = ''; // Limpar tabela

    funcionarios.forEach((funcionario, index) => {
        const row = tabelaFuncionarios.insertRow();

        const nomeCell = row.insertCell(0);
        const cpfCell = row.insertCell(1);
        const acaoCell = row.insertCell(2);

        nomeCell.textContent = funcionario.nome;
        cpfCell.textContent = funcionario.cpf;

        const deletarButton = document.createElement('button');
        deletarButton.textContent = 'Deletar';
        deletarButton.addEventListener('click', () => deletarFuncionario(index));
        acaoCell.appendChild(deletarButton);
    });
}

function adicionarFuncionario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    if (!nome || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push({ nome, cpf });

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    carregarFuncionarios();
}

function deletarFuncionario(index) {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.splice(index, 1);

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    carregarFuncionarios();
}
