// Primeiro, uma função simples ao botão de limpar formulário, para resetar o formulário:
document.getElementById('idLimpar').addEventListener('click', function() {
    document.getElementById('idNome').value = '';
    document.getElementById('idTamanho').value = '';
    document.getElementById('idPreco').value = '';
});

// E uma função ao botão de limpar tabela, para resetar a tabela de pizzas:
document.getElementById('idLimparTabela').addEventListener('click', function() {
    let tabela = document.querySelector('.pizzas-table');
    tabela.innerHTML = '';
});

// Temos que prever a possível tentativa do usuário colocar valores como 0 para o tamanho ou preço, nesse caso:
function validarTamanho() {
    let tamanho = document.getElementById('idTamanho').value;
    if (tamanho <= 0 || tamanho.trim() === '') {
        alert('O tamanho da pizza deve existir e ser maior que zero.');
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

var pizzas = [];
var melhorCB = null; // Inicializando o melhorCB como nulo

// Função para calcular pizza
function calcularPizza() {
    let nome = document.getElementById('idNome').value;
    let tamanho = document.getElementById('idTamanho').value;
    let preco = parseFloat(document.getElementById('idPreco').value).toFixed(2);

    // Ao registrar a pizza, cria-se as variaveis para fazerem o cálculo da área e preço por cm²
    // Porém, antes disso é necessário verificar se a pizza é retangular/quadrada ou circular
    if (tamanho.includes('x') || tamanho.includes('X')) {
        // Pizza retangular/quadrada
        let medidas = tamanho.split(/[xX]/);
        let comprimento = parseFloat(medidas[0]);
        let largura = parseFloat(medidas[1]);
        area = comprimento * largura;
    } else {
        // Pizza redonda
        let raio = parseFloat(tamanho / 2);
        let area = Math.PI * Math.pow(raio, 2);
    }
    
    let precoPorCm2 = (preco / area).toFixed(3);
    
    let pizza = [nome, tamanho, preco, precoPorCm2, 'Melhor custo benefício!' ];
    pizzas.push(pizza)

    return pizzas;
}

// Evento listener que ocorre ao clicar no botão registrar:

var registrar = document.getElementById('idRegistrar');
registrar.addEventListener('click', function(e) {
    e.preventDefault();

    // Verifica se a resposta será true da função validarFormulario, se não for, a função de registrar será executada, por isso o '!'.
    if (!validarFormulario()) {
        return;
    }
    
    // Chama a função que calcula o tamanho da pizza e fornece os dados da mesma
    calcularPizza()

    // Verificação do melhor custo beneficio
    if (pizzas.length > 1) {
        var melhorCB = pizzas.reduce(function (prev, current) {
            return (prev[3] < current[3]) ? prev : current;
        });
        
        pizzas.forEach(function (pizza) {
            var diferencaPercentual = ((pizza[3] - melhorCB[3]) / melhorCB[3]) * 100;
            if (diferencaPercentual === 0) {
                pizza[4] = 'Melhor custo benefício!'
            } else {
                pizza[4] = '+' + diferencaPercentual.toFixed(2) + '%';
            }
        });
    }
    atualizarTabela(pizzas);
    return pizzas;
});

// Com a lógica de cálculos feita, precisamos criar a tabela que sairá como resultado na tela:

function atualizarTabela(dados) {
    // Seleciona o elemento da tabela
    let tabela = document.querySelector('.pizzas-table');
    
    // Se o elemento da tabela existir, atualiza-o
    if (tabela) {
        tabela.innerHTML = '';
        
        // Ordena os dados com base no "Preço por cm²"
        dados.sort((a, b) => a[3] - b[3]);
        
        // Percorre o array de pizzas e cria uma nova linha para cada pizza adicionada
        dados.forEach(function (pizza) {
            var linha = document.createElement('tr');
            
            // Adiciona as colunas à linha criada
            for (let i = 0; i < pizza.length; i++) {
                let celula = document.createElement('td');
                celula.textContent = pizza[i];
                linha.appendChild(celula);
            }
            
            // Adiciona a linha à tabela
            tabela.appendChild(linha);
        });
    }
}




/*
TRECHO DE CÓDIGOS QUE ESTAVAM SENDO USADOS MAS FORAM ALTERADOS/DESCARTADOS:
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
*/