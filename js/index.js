(function(){

	const inputTarefa = document.querySelector('[data-js="tarefa"]');
	const btn = document.querySelector('[data-js="btn"]');
	const listaTarefas = document.querySelector('[data-js="listaTarefas"]');
	const quantidadeTarefas = document.querySelector('[data-js="quantidadeTarefas"]');
	const body = document.querySelector('body');

	btn.addEventListener('click', validarCampo);

	function validarCampo(event) {
		event.preventDefault();
		const valor = inputTarefa.value.trim();
		if(valor) {
			addTarefa();
		}
	}

	function addTarefa() {

		const fragment = document.createDocumentFragment();
		const btnApagar = document.createElement('button');
		const btnApagarContent = document.createTextNode('Apagar tarefa');
		btnApagar.classList.add('apagar');
		const novaTarefa = document.createElement('li');
		const span = document.createElement('span');
		const novaTarefaContent = document.createTextNode(inputTarefa.value);
		const tarefaConcluida = document.createElement('input');
		tarefaConcluida.setAttribute('type', 'checkbox')

		span.appendChild(novaTarefaContent)
		btnApagar.appendChild(btnApagarContent);
		fragment.appendChild(span);
		fragment.appendChild(tarefaConcluida);
		fragment.appendChild(btnApagar);

		novaTarefa.appendChild(fragment);
		listaTarefas.appendChild(novaTarefa);

		limparCampo();
		atualizarQuantidadeTarefas();
	}

	function limparCampo() {
		inputTarefa.value = '';
		inputTarefa.focus();
	}

	function atualizarQuantidadeTarefas() {
		const lis = getLis();
		const qtd = Array.from(lis)
					.filter(li => !li.firstElementChild.classList.contains('concluida'))
					.length;

		if(qtd != 1) {
			quantidadeTarefas.textContent = `${qtd} tarefas a serem concluídas`;
		} else {
			quantidadeTarefas.textContent = `${qtd} tarefa a ser concluída`;
		}

	}

	body.addEventListener('click', function(event) {
		const target = event.target;
		
		if(target.classList.contains('apagar')) {
			target.parentNode.parentNode.removeChild(target.parentNode);
			atualizarQuantidadeTarefas();
			limparDiv();
		}

		if(target.getAttribute('type') == 'checkbox') {
			target.parentNode.firstElementChild.classList.toggle('concluida');
			atualizarQuantidadeTarefas();
		}

	});

	function limparDiv() {
		const qtd = getLis().length;
		if(qtd == 0) {
			quantidadeTarefas.textContent = '';
		}
	}

	function getLis() {
		return document.querySelectorAll('li');
	}

})();