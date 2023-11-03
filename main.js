
var registrar = document.getElementById('idRegistrar');
registrar.addEventListener('click', function(e) {
    e.preventDefault();

    var nome = document.getElementById('idNome').value;
    var tamanho = parseFloat(document.getElementById('idTamanho').value);
    var preco = parseFloat(document.getElementById('idPreco').value);
    var pizzas = [];
    // Primeiro, ao registrar a pizza, cria-se as variaveis para fazerem o cálculo da área e preço por cm²
    let raio = tamanho / 2;
    let area = Math.PI * Math.pow(raio, 2);
    let precoPorCm2 = preco / area;
    // Calculos feitos, agora adicionar ao array
    pizzas.push([nome, tamanho, preco, precoPorCm2, 0])

    if (pizzas.length > 1) {
        var melhorCB = pizzas.reduce(function (prev, current) {
            return (prev[3] < current[3]) ? prev : current;
        });
    };
});

var calcular = document.getElementById('idCalcular');
calcular.addEventListener('click', function (e) {
    e.preventDefault();
})