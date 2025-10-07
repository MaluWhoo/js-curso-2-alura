// let titulo = document.querySelector('h1');
// innerHTML --> A propriedade innerHTML é usada para obter ou definir o conteúdo HTML de um elemento no DOM.
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;

    // Speak Voice arrumado
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

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
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido); // push --> Adiciona item ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
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