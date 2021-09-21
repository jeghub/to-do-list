let taskLists = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskLists);
let ul_element = document.getElementById("task-list");
console.log(ul_element);
if(taskLists.length > 0) {
    ul_element.innerHTML = taskLists;
}

let button_add = document.getElementById("add-task-button");
let button_delete = document.getElementsByClassName("delete-btn");
let checkboxs = document.querySelectorAll("input[type='checkbox']");
let spans = document.getElementsByClassName("task");

console.log(button_add);
console.log(button_delete);
console.log(checkboxs);

for (let i= 0; i < spans.length; i++) {
    if(spans[i].classList.contains("checked_task")) {
        checkboxs[i].checked = true;
    }
}

for (let i = 0; i < button_delete.length; i++) {
    button_delete[i].onclick = delete_task;
}

for (let i = 0; i < checkboxs.length; i++) {
    checkboxs[i].onclick = check_task;
}

function check_task (e) {
    let x = e.target;
    if (x.checked == true) {
        if(x.classList.contains("checked_task") == false) {
            x.nextElementSibling.classList.add("checked_task");
        }
    } else {
        x.nextElementSibling.classList.remove("checked_task");
    }

    store_data();
}

function add_task() {
    let input_task = document.getElementById("input-task");
    let val = input_task.value;
    if (val.length == 0) {
        return;
    }

    let ul_elem = document.getElementById("task-list");
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.onclick = check_task;
    li.appendChild(input);
    let span = document.createElement("span");
    span.setAttribute("class","task");
    span.appendChild(document.createTextNode(input_task.value));
    let button = document.createElement("button");
    button.setAttribute("class","delete-btn");
    let img = document.createElement("img");
    img.setAttribute("src","images/x-button.png");
    img.setAttribute("alt","delete-icon");
    button.appendChild(img);
    button.onclick = delete_task;
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    ul_elem.appendChild(li);
    input_task.value = "";

    store_data();
}

function delete_task(event) {
    let x = event.target.parentElement;
    if (x.tagName.toLowerCase() === "li") {
        x.remove();
    } else {
      x.parentElement.remove();
    }

    store_data();
}

function store_data() {
    localStorage.clear();
    let tasklist = document.getElementById("task-list");
    localStorage.setItem("tasks",JSON.stringify(tasklist.innerHTML));
}

button_add.onclick = add_task;