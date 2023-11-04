// Primeiro, uma função simples ao botão de limpar, para resetar o formulário:
document.getElementById('idLimpar').addEventListener('click', function() {
    document.getElementById('idNome').value = '';
    document.getElementById('idTamanho').value = '';
    document.getElementById('idPreco').value = '';
});

// Temos que prever a possível tentativa do usuário colocar valores como 0 para o tamanho ou preço, nesse caso:
function validarTamanho() {
    let tamanho = document.getElementById('idTamanho').value;
    if (tamanho <= 0) {
        alert('O tamanho da pizza deve ser maior que zero.');
        return false;
    }
    return true;
}

function validarPreco() {
    let preco = document.getElementById('idPreco').value;
    if (preco <= 0) {
        alert('O preço da pizza deve ser maior que zero.');
        return false;
    }
    return true;
}

// Podemos juntar as duas funções de validação em uma:
function validarFormulario() {
    return validarTamanho() && validarPreco();
}

var registrar = document.getElementById('idRegistrar');
registrar.addEventListener('click', function(e) {
    e.preventDefault();

    // Verifica se a resposta será true da função validarFormulario, se não for, a função de registrar será executada, por isso o '!'.
    if (!validarFormulario()) {
        return;
    }

    let nome = document.getElementById('idNome').value;
    let tamanho = parseFloat(document.getElementById('idTamanho').value);
    let preco = parseFloat(document.getElementById('idPreco').value);
    let pizzas = [];
    // Primeiro, ao registrar a pizza, cria-se as variaveis para fazerem o cálculo da área e preço por cm²
    let raio = tamanho / 2;
    let area = Math.PI * Math.pow(raio, 2);
    let precoPorCm2 = preco / area;
    // Calculos feitos, agora adicionar ao array
    pizzas.push([nome, tamanho, preco, precoPorCm2, 0])

    /*
    var melhorCB = pizzas[0];
    for (var i = 1; i < pizzas.length; i++) {
        if (pizzas[i][3] > melhorCB[3]) {
            melhorCB = pizzas[i];
        }
    }
    */ 
    /* 
    if (pizzas.length > 1) {
        var melhorCB = pizzas.reduce(function (prev, current) {
            return (prev[3] < current[3]) ? prev : current;
        });
    };   
    */
    let melhorCB = pizzas.sort((a, b) => (a.preco / a.precoPorCm2) - (b.preco / b.precoPorCm2))[0];

    // Ordenamos pelo custo benefício, mas agora precisamos calcular a diferença (em porcentagem):

    function calcularDiferencaPercentual(pizzas, melhorCB) {
        // Calcula a diferença de cada pizza em relação à melhor pizza
        pizzas.forEach(function (pizza) {
            pizza.diferencaPercentual = ((pizza.preco - melhorCB.preco) / melhorCB.preco) * 100;
        });   
        return pizzas;
    }

    pizzas = calcularDiferencaPercentual(pizzas, melhorCB);
    atualizarTabela(pizzas);
    return pizzas;
});

// Com a lógica de cálculos feita, precisamos criar a tabela que sairá como resultado na tela:

function atualizarTabela(dados) {
    let container = document.querySelector('.pizzas');
    // Selecionamos o array de pizzas

    // Para isso, precisamos criar uma tabela com os dados
    let tabela = document.createElement('table');
    tabela.classList.add('pizzas-table');

    // Percorre o array de pizzas e cria uma nova linha para cada pizza adicionada
    dados.forEach(function (pizza) {
        let linha = document.createElement('tr');

        // Adiciona as colunas à linha criada
        for (let coluna in pizza) {
            let celula = document.createElement('td');
            celula.textContent = pizza[coluna];
            linha.appendChild(celula);
        }

        // Adiciona a linha à tabela, e a tabela ao container, finalizando o processo
        tabela.appendChild(linha);
    });
    container.appendChild(tabela);
}
