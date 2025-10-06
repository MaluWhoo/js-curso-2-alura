// let titulo = document.querySelector('h1');
// innerHTML --> A propriedade innerHTML é usada para obter ou definir o conteúdo HTML de um elemento no DOM.
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
}

function exibirMensagemInicial(){
    exibirTextoTela('h1', 'Jogo do número secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // Pega somente o valor digitado no input
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTextoTela('h1', `Você acertou!`);
        let tentativaPalavra = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${tentativaPalavra}!`;
        exibirTextoTela('p', mensagemTentativas);

        // Habilitar o botão de reiniciar
         document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoTela('p', `O número secreto é menor.`);
        } else {
            exibirTextoTela('p', `O número secreto é maior.`);
        }
        tentativas++;

        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    return parseInt(Math.random() * 10 + 1);
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // O número secreto será sorteado.
    limparCampo(); // Limpa o campo de input.
    tentativas = 1; // Zera o número de tentativas.
    exibirMensagemInicial(); 
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Desabilita o botão de reiniciar.
}