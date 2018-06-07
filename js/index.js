(function(){

	const inputTarefa = document.querySelector('[data-js="tarefa"]');
	const btn = document.querySelector('[data-js="btn"]');
	const listaTarefas = document.querySelector('[data-js="listaTarefas"]');
	const quantidadeTarefas = document.querySelector('[data-js="quantidadeTarefas"]');

	btn.addEventListener('click', validarCampo);
	inputTarefa.addEventListener('keydown', enter);

	function validarCampo(event) {
		event.preventDefault();
		if(inputTarefa.value) {
			addTarefa();
		}
	}

	function addTarefa() {

		const btnApagar = document.createElement('button');
		const btnApagarContent = document.createTextNode('Apagar tarefa');
		btnApagar.classList.add('apagar');
		const novaTarefa = document.createElement('li');
		const novaTarefaContent = document.createTextNode(inputTarefa.value);

		btnApagar.appendChild(btnApagarContent);
		novaTarefa.appendChild(novaTarefaContent);
		novaTarefa.appendChild(btnApagar);

		listaTarefas.appendChild(novaTarefa);

		limparCampo();
		atualizarQuantidadeTarefas();
	}

	function limparCampo() {
		inputTarefa.value = '';
		inputTarefa.focus();
	}

	function enter(event) {
		if(event.keyCode == 8) {
			validarCampo();
		}
	}

	function atualizarQuantidadeTarefas() {
		const lis = document.querySelectorAll('li');
		console.log(lis);
		if(lis.length > 0) {
			const qtd = lis.length;
			quantidadeTarefas.textContent = qtd == 1 ? `1 tarefa a ser concluída` : `${qtd} tarefas a serem concluídas`;
		}
	}

	document.querySelector('body').addEventListener('click', function(event) {
		if(event.target.tagName == 'BUTTON') {
			if(event.target.classList.contains('apagar')) {
				event.target.parentNode.parentNode.removeChild(event.target.parentNode);
				atualizarQuantidadeTarefas();
				limparDiv();
			}
		}
	});

	function limparDiv() {
		const lis = document.querySelectorAll('li');
		if(lis.length == 0) {
			quantidadeTarefas.textContent = '';
		}
	}

})();