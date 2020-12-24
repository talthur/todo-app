// DECLARAÇÃO DE VARIAVEIS PARA SELECIONAR OS TRECHOS DO HTML
var toDoEntryBox  = document.getElementById("todo-list-form");
var toDoList = document.getElementById("todo-list");



//BLOCO PARA QUE A TECLA ENTER FUNCIONE PARA ENVIAR OS DADOS ALÉM DO BOTÃO SUBMIT
toDoEntryBox.onkeydown = function(e){
    if(e.keyCode == 13){
        addToList();
        return false;
    }
}


//ADICIONA O EVENT LISTENER AO BOTÃO SUBMIT E EXECUTA FUNÇÃO DE INSERIR NOMES
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToList);


//ATRIBUI O TEXTO DIGITADO NO FORM A UMA VARIAVEL E A PASSA COMO PARAMETRO PARA A FUNÇÃO NEWTODOITEM, PASSA O PARAMETRO 'COMPLETED' COMO FALSE
function addToList(){
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false)
};


//CRIA UM ELEMENTO DO TIPO LISTA(LI) E INSERE O CONTEÚDO DA VARIAVEL DA FUNÇÃO ANTERIOR DENTRO DO ELEMENTO. ADICION
function newToDoItem(itemText, completed){

    var toDoItem = document.createElement("li"); //cria elemento LI
    var toDoText = document.createTextNode(itemText);//cria variável com o conteúdo do texto digitado
    toDoItem.appendChild(toDoText);//faz um append como filho do texto digitado ao elemento LI

    if (completed){
        toDoItem.classList.add("completed");//caso o parametro 'completed' for verdadeiro adiciona a classe 'completed' ao elemento LI
    }

    toDoItem.addEventListener("dblclick", toggleToDoItemState); //adiciona o listener para quando tocar duas vezes iniciar a função de trocar classe
    toDoList.appendChild(toDoItem);//adiciona o elemento LI agora com conteúdo ao elemento pai OL
    
};



//TROCA A CLASSE DA TAG. SE ESTIVER COM A CLASSE 'COMPLETED' ADIONA A CLASSE, CASO CONTRÁRIO A REMOVE
function toggleToDoItemState(){
    if (this.classList.contains("completed")){
        this.classList.remove("completed")
    } else {
        this.classList.add("completed")
    }

}



//ADICIONA O EVENT LISTENER AO BOTÃO LIMPAR COMPLETADAS
var clearCompleted = document.getElementById("clear-complete-button");
clearCompleted.addEventListener("click", clearCompletedItems);


//LIMPA ITENS COMPLETADOS DA LISTA
function clearCompletedItems(){

    var allCompletedItems = toDoList.getElementsByClassName("completed")//cria uma variável selecionando somente os elementos da classe "completed" presentes na OL

    while (allCompletedItems.length > 0) { 

        allCompletedItems.item(0).remove();
    }// faz um laço removendo cada elemento com a classe "completed"
};



//ADICIONA O EVENT LISTENER AO BOTÃO ESVAZIAR LISTA
var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

//LIMPA TODOS ITENS DA LISTA
function emptyList(){

    var allItemsToRemove = toDoList.getElementsByTagName("li");

    while (allItemsToRemove.length > 0) {

        allItemsToRemove.item(0).remove();

    }//cria uma variavel com todos elementos "li" dentro da OL e os remove um por um atráves de um laço


};


//ADICIONA O EVENT LISTENER AO BOTÃO SALVAR LISTA
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);


function saveList(){

    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++){
        var toDo = toDoList.children.item(i)

        var toDoInfo = {
            "task":toDo.innerText,
            "completed":toDo.classList.contains("completed")
        }

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));

};

function loadList(){
    if (localStorage.getItem("toDos") != null) {

        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for (var i = 0; i < toDos.length; i++){
            var toDo = toDos[i]
            newToDoItem(toDo.task, toDo.completed);
        }

    }

    else{
        newToDoItem("Exemplo",false)
        newToDoItem("Exemplo",true)
    }
}

loadList()




