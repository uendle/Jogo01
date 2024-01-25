// let titulo = document.querySelector('h1');//selecionou a tag h1
// titulo.innerHTML = 'Jogo do numero secreto';//adiciona um texto na tag h1

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Selecione um numero entre 1 e 10 ? '

// melhorando o codigo
let listaDeNumeroSorteados = [];
let lista = ['','Primeira','Segunda','Terceira','Quarta','Quinta','Sexta','Setima','Oitava','Nona','Decima']
let numeroLimite = 5;
let numeroSecreto = gerarNumeroAleastorio();
let tentativa = 0;
let PalavraTentativa;
exibirMensagemInicial();

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do numero secreto');
    exibirTextoNaTela('p','Selecione um numero entre 1 e 10 ? ');
}


function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function gerarNumeroAleastorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleastorio();
    }else{
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function verificarChute(){
    tentativa++;
    PalavraTentativa = tentativa > 1 ? 'tentativas':'tentativa';
    let chute = document.querySelector('input').value; 
    console.log(numeroSecreto);

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1',`Acertou com ${tentativa} ${PalavraTentativa}!!`);
        exibirTextoNaTela('p','voce descobriu o numero secreto!!');
        document.getElementById('reiniciar').removeAttribute('disabled');
       
    }else if (chute < numeroSecreto){
            exibirTextoNaTela('h1',`${lista[tentativa]} ${PalavraTentativa}`);
            exibirTextoNaTela('p','O numero secreto e maior!!!');
        }else{
            exibirTextoNaTela('h1',`${lista[tentativa]} ${PalavraTentativa}`);
            exibirTextoNaTela('p','O numero secreto e menor!!!');
        }
    limparCampo();
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleastorio();
    limparCampo();
    tentativa = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
