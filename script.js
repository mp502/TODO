let addBtn = document.getElementById("add");
let totalTask = 0;
let currTask = 0;
const noTask = document.querySelector(".no-task");
const showTask = document.querySelector(".show-task");
const form = document.querySelector(".show-task>form");
const input = document.querySelector(".task-name");
const row1Count = document.querySelector(".row1 .count");
const row1hpCount = document.querySelector(".row1 .hp .count");


const state={};
const inputForm = document.querySelector(".input");

addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (!input.value) { alert("Please Write Something"); return; }
    totalTask++;
    if (totalTask === 1) {
        toggle();
    }

    let task = document.createElement("div");
    let taskTime = new Date(inputForm['datetime'].value);
    let currTime = new Date();

    task.id = `task${++currTask}`;
    task.classList.add("task");
    task.innerHTML = `<input type="checkbox" name="${task.id}">
        <div class="task-name" contenteditable="true" style='padding:10px'>${input.value}</div>
        <div>${taskTime}</div>`;

    let delBtn = document.createElement("button");
    delBtn.classList.add('material-symbols-outlined', 'delete');
    delBtn.id = `delete${currTask}`;
    delBtn.innerText = "delete";
    task.appendChild(delBtn);

    let editBtn = document.createElement("button");
    editBtn.classList.add('material-symbols-outlined', 'edit');
    editBtn.id = `edit${currTask}`;
    editBtn.innerText = "edit";
    task.appendChild(editBtn);

    let saveBtn = document.createElement("button");
    saveBtn.classList.add('material-symbols-outlined', 'save');
    saveBtn.id = `save${currTask}`;
    saveBtn.innerText = "save";
    task.appendChild(saveBtn);
    saveBtn.style.display = "none";

    input.value = "";
    form.appendChild(task);

    delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        deleteTask(task.id);
    });

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        editTask(task);
    });

    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveTask(task);
    });

    row1Count.innerText = totalTask;
    setTask(task, taskTime - currTime);
    inputForm.reset();
});

input.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        console.log(e.code);
        addBtn.click();
    }
})

function toggle() {
    if (showTask.style.display === "flex" && totalTask === 1) return;

    if (showTask.style.display === "none") {
        showTask.style.display = "flex";
        noTask.style.display = "none";
        return;
    }

    showTask.style.display = "none";
    noTask.style.display = "flex";
}

let priorityCount = 0;
form.addEventListener('change', (e) => {
    formChange(e);
});
/*from Change*/


function formChange(e) {
    if (e.target.checked) {
        priorityCount++;
        console.log(e.parentNode);
    }
    else priorityCount--;

    row1hpCount.innerHTML = `${priorityCount} of ${totalTask}`
    if (priorityCount === 0) row1hpCount.innerHTML = '0';
    console.log(e.target);
}

var startedTaskForm = document.querySelector(".started-task")

var startedCount = 0;
var startedHpCount = 0;
var row2Count = document.querySelector(".row2 .count");
var row2HpCount = document.querySelectorAll(".row2 .count");

function setTask(ele, time) {
    setTimeout(function () {
        startedTaskForm.appendChild(ele);
        ++startedCount;
        totalTask--;
        row2Count.innerHTML = startedCount;

        if (ele.childNodes[0].checked) {
            startedHpCount++;
        }

        row2HpCount[1].innerHTML = startedHpCount === 0 ? "0" : `${startedHpCount} of ${startedCount}`;
        row1Count.innerHTML = totalTask;

    }, time);
}

startedTaskForm.addEventListener('change', (e) => {
    e.preventDefault();
    if (e.target.checked) {
        startedHpCount++;
        row2HpCount[1].innerHTML = `${startedHpCount} of ${startedCount}`;
    } else {
        startedHpCount--;
        row2HpCount[1].innerHTML = startedHpCount === 0 ? "0" : `${startedHpCount} of ${startedCount}`;
    }
});

function deleteTask(taskId) {
    let curr = document.getElementById(taskId);

    if (curr.parentNode.classList[0] === 'show-task') {
        curr.parentNode.removeChild(curr);

        totalTask--;
        row1Count.innerText = totalTask;
        var childNodes = curr.childNodes;

        if (childNodes[0].checked) {
            priorityCount--;
            row1hpCount.innerHTML = priorityCount === 0 ? "0" : `${priorityCount} of ${totalTask}`;
        }

        if (totalTask === 0) {
            toggle();
        }
    } else if (curr.parentNode.classList[0] === 'started-task') {
        curr.parentNode.removeChild(curr);
        startedCount--;
        row2Count.innerHTML = startedCount;
        console.log(curr.childNodes[0].checked);
        if (curr.childNodes[0].checked) {
            startedHpCount--;
            row2HpCount[1].innerHTML = startedHpCount === 0 ? `0` : `${startedHpCount} of ${startedCount}`;
        }
    }
}

function editTask(task) {
    let taskNameDiv = task.querySelector('.task-name');
    let saveBtn = task.querySelector('.save');
    let editBtn = task.querySelector('.edit');

    taskNameDiv.contentEditable = true;
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
}

function saveTask(task) {
    let taskNameDiv = task.querySelector('.task-name');
    let saveBtn = task.querySelector('.save');
    let editBtn = task.querySelector('.edit');

    taskNameDiv.contentEditable = false;
    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";
}

showTask.addEventListener('change', (e) => {
    formChange(e);
});


let searchBtn = document.getElementById("search-btn");
let searchValue = document.getElementById("search-value");

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let taskList = document.getElementsByClassName("task");
    let inputValue = searchValue.value.toLowerCase(); // Convert the search value to lowercase for case-insensitive comparison
    if (inputValue)
        for (const key in taskList) {
            if (taskList.hasOwnProperty(key)) {
                let taskName = taskList[key].querySelector('.task-name').innerText.toLowerCase(); // Convert task name to lowercase for case-insensitive comparison
                if (taskName.includes(inputValue)) {
                    // If the task name contains the search value, display the task
                    taskList[key].style.display = "flex";
                } else {
                    // If the task name does not contain the search value, hide the task
                    taskList[key].style.display = "none";
                }
            }
        }
});

searchValue.addEventListener('keyup', (e) => {
    if (!searchValue.value) {
        let taskList = document.getElementsByClassName("task");
        let inputValue = searchValue.value.toLowerCase(); // Convert the search value to lowercase for case-insensitive comparison
        if (inputValue)
            for (const key in taskList) {
                if (taskList.hasOwnProperty(key)) {
                    let taskName = taskList[key].querySelector('.task-name').innerText.toLowerCase(); // Convert task name to lowercase for case-insensitive comparison
                  
                        // If the task name contains the search value, display the task
                        taskList[key].style.display = "flex";
                }
            }
    }
});


