let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatório();
let input = document.querySelector('input');
let botaoChute = document.querySelector('.botao_chutar');
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  tagSelecionada = document.querySelector(tag);
  tagSelecionada.innerHTML = texto;

  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = input.value;

  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

    exibirTextoNaTela('h1', 'Acertou!');
    exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
    input.style.display = 'none';
    botaoChute.style.display = 'none';
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
    } else {
      exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatório() {
  let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);

  if (listaDeNumerosSorteados.length == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroSorteado)) {
    return gerarNumeroAleatório();
  } else {
    listaDeNumerosSorteados.push(numeroSorteado);
    console.log(numeroSorteado);
    return numeroSorteado;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatório();
  input.style.display = 'block';
  botaoChute.style.display = 'block';
  limparCampo();
  exibirMensagemInicial();
  tentativas = 1;
  document.getElementById('reiniciar').setAttribute('disabled', true);
}