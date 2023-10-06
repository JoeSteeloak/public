"use strict";
// Variabler
let newToDoEl = document.getElementById("newtodo");
let newToDoButtonEl = document.getElementById("newtodobutton");
let clearButtonEl = document.getElementById("clearbutton");
let toDoListEl = document.getElementById("todolist");
let messageEl = document.getElementById("message");
let i;

// Händelsehanterare
window.onload = setup;
newToDoEl.addEventListener("keyup", checkInput, false);
newToDoButtonEl.addEventListener("click", addToDo, false);
clearButtonEl.addEventListener("click", clearList, false);

// startfunktioner
function setup() {

    // inaktivera "lägg till"-knappen
    newToDoButtonEl.disabled = true;
    newToDoButtonEl.style.backgroundColor = "#DCDCDC";

    // läs in "att göra"-listan
    loadStorage();
}

// kontrollera input i textfältet
function checkInput() {
    let input = newToDoEl.value;

    // kontrollera korrekt längd
    if (input.length > 4) {
        messageEl.innerHTML = "";
        newToDoButtonEl.disabled = false;
        newToDoButtonEl.style.backgroundColor = "#D07E00";
    } else {
        messageEl.innerHTML = "Måste innehålla minst fem tecken!";
        newToDoButtonEl.disabled = true;
        newToDoButtonEl.style.backgroundColor = "#DCDCDC";
    }
}

// Lägg till "to do"-text
function addToDo() {
    let input = newToDoEl.value;

    //skapa nytt element
    let newEl = document.createElement("section");
    let newTextNode = document.createTextNode(input);
    newEl.appendChild(newTextNode);
    newEl.className = "toDo";

    // Lägg till till "to do"-listan
    toDoListEl.appendChild(newEl);

    // Lägg till klickhanterare för att ta bort det nya elementet
    newEl.addEventListener("click", function (e) {
        e.target.remove();
    });

    // Radera input-fältet
    newToDoEl.value = "";
    newToDoButtonEl.disabled = true;
    newToDoButtonEl.style.backgroundColor = "#DCDCDC";

    // Anropa lagring
    saveStorage();
}

// Rensa listan på sidan och i Web Storage
function clearList() {
    let toDoList = document.getElementById("todolist");
    while (toDoList.hasChildNodes()) {
        toDoList.removeChild(toDoList.firstChild);
    }
    localStorage.clear();
}


// Lagra "to-do"-listan i Web Storage
function saveStorage() {
    let toDos = document.getElementsByClassName("toDo");

    let tempArr = [];

    // Loopa igenom listan och lagra i en temp array
    for (i = 0; i < toDos.length; i++) {
        tempArr.push(toDos[i].innerHTML);
    }

    // Konvertera till JSON-sträng
    let jsonStr = JSON.stringify(tempArr);

    // Lagra till Web Storage
    localStorage.setItem("toDos", jsonStr);
}

// Läs in listan
function loadStorage() {
    // Läs in och konvertera från JSON till array
    let toDos = JSON.parse(localStorage.getItem("toDos"));

    // Loopa genom arrayen
    for (i = 0; i < toDos.length; i++) {

        //skapar nytt element

        let newEl = document.createElement("section");
        let newTextNode = document.createTextNode(toDos[i]);
        newEl.appendChild(newTextNode);
        newEl.className = "toDo";

        // Lägg till till "to do"-listan
        toDoListEl.appendChild(newEl);

        // Lägg till klickhanterare för att ta bort det nya elementet
        newEl.addEventListener("click", function (e) {
            e.target.remove();

            // Anropa lagring
            saveStorage();
        });


    }
}