var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToList);

var toDoEntryBox  = document.getElementById("todo-list-form");
var toDoList = document.getElementById("todo-list");

toDoList.onkeyup = function(e){
    if(e.keyCode == 13){
        addToList();
    }
}

function addToList(){
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false)
};

function newToDoItem(itemText, completed){

    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed){
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);


};

function toggleToDoItemState(){
    if (this.classList.contains("completed")){
        this.classList.remove("completed")
    } else {
        this.classList.add("completed")
    }

}

var clearCompleted = document.getElementById("clear-complete-button");
clearCompleted.addEventListener("click", clearCompletedItems);

function clearCompletedItems(){

    var allCompletedItems = toDoList.getElementsByClassName("completed")
    console.log(allCompletedItems);

    while (allCompletedItems.length > 0) {

        allCompletedItems.item(0).remove();

    }
};


var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

function saveList(){
    alert("Botao funcionando")
};


var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

function emptyList(){

    var allItemsToRemove = toDoList.getElementsByTagName("li");

    while (allItemsToRemove.length > 0) {

        allItemsToRemove.item(0).remove();

    }



    
    // alert("botao funcionando");
};

