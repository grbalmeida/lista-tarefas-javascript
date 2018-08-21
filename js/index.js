(function(){

	const inputTarefa = document.querySelector('[data-js="tarefa"]');
	const btn = document.querySelector('[data-js="btn"]');
	const listaTarefas = document.querySelector('[data-js="listaTarefas"]');
	const quantidadeTarefas = document.querySelector('[data-js="quantidadeTarefas"]');
	const body = document.querySelector('body');

	btn.addEventListener('click', validarCampo);

	function validarCampo(event) {
		event.preventDefault();
		if(inputTarefa.value.trim()) {
			addTarefa();
		}
	}

	function addTarefa() {

		const fragment = document.createDocumentFragment();
		const btnApagar = criarTagComConteudo('button', 'Apagar tarefa');
		const novaTarefa = document.createElement('li');
		const tarefaConcluida = document.createElement('input');
		
		btnApagar.classList.add('apagar');
		tarefaConcluida.setAttribute('type', 'checkbox');

		fragment.appendChild(criarTagComConteudo('span', inputTarefa.value));
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

	function criarTagComConteudo(tag, conteudo) {
		const newTag = document.createElement(tag);
		const newConteudo = document.createTextNode(conteudo);
		newTag.appendChild(newConteudo);
		return newTag;
	}

	function atualizarQuantidadeTarefas() {
		const qtd = Array.from(getLis())
					.filter(li => !li.firstElementChild.classList.contains('concluida'))
					.length;

		if(qtd != 1) {
			setContent(`${qtd} tarefas a serem concluídas`);
		} else {
			setContent(`${qtd} tarefa a ser concluída`);
		}

	}

	body.addEventListener('click', function(event) {
		const target = event.target;
		const parent = target.parentNode;
		
		if(target.classList.contains('apagar')) {
			parent.parentNode.removeChild(parent);
			atualizarQuantidadeTarefas();
			limparDiv();
		}

		if(target.getAttribute('type') == 'checkbox') {
			parent.firstElementChild.classList.toggle('concluida');
			atualizarQuantidadeTarefas();
		}

	});

	function limparDiv() {
		if(getLis().length == 0) {
			setContent();
		}
	}

	function setContent(content = '') {
		quantidadeTarefas.textContent = content;
	}

	function getLis() {
		return document.querySelectorAll('li');
	}

})();