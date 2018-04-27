var timerId = null; // Variável que armazena a chamada da função Timeout

function iniciajogo(){
	
	var url = window.location.search;
	
	var nivel_jogo = url.replace("?","");

	var tempo_segundos = 0;


	if(nivel_jogo == 1) { // 1 Fácil -> 120 segundos
		tempo_segundos = 120;

	}

	if(nivel_jogo == 2) { // 2 Normal -> 60 segundos
		tempo_segundos = 60;


	}

	if(nivel_jogo == 3) { // 3 Difícil -> 30 segundos
		tempo_segundos = 30;
	}

	//INSERINDO SEGUNDOS NO SPAN
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// QUANTIDADE DE BALÕES
	var qtde_baloes = 40;

	criar_baloes(qtde_baloes);

	//IMPRIMIR QUANTIDADE DE BALÕES INTEIROS
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos);

}
	
function contagem_tempo(segundos){

	segundos =  segundos - 1;

	if (segundos == -1) {
		clearTimeout(timerId); // PARA A EXECUÇÃO DA FUNÇÃO SETTIMEOUT
		game_over();
		return false;

	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")",1000);

}

function game_over(){
	alert ('Fim de jogo, acabou o tempo!')

}

function criar_baloes(qtde_baloes) {

		for (var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id = 'b' + i;
		balao.onclick = function () {estourar(this);
			
		}

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e) {

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","")  // REMOVE A FUNÇÃO ONDE CLICARIA MAIS DE UMA VEZ

	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'

	pontuacao(-1);

}

function pontuacao(acao) {
	
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt (baloes_inteiros);
	baloes_estourados = parseInt (baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo (baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
	
	if (baloes_inteiros== 0){
		alert('Parebéns, você venceu!');
		parar_jogo();
	}
}

function parar_jogo() {
	clearTimeout(timerId);
}