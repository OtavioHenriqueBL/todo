addEventListener("DOMContentLoaded", () => checkCookie());

let tasks = [];

function addTask(taskname, done) {
    if(taskname == '') {
        return;
    }
    const list = document.getElementById('list');
    const newRow = document.createElement("tr");
    const newDescription = document.createElement("td");
    newDescription.textContent = taskname;
    const newStatus = document.createElement("td");
    const buttonStatus = document.createElement("td");
    const theButton = document.createElement("button");
    const deleteButton = document.createElement("td");
    const theButtonDelete = document.createElement("button");
    done ? newStatus.textContent = "Done" : newStatus.textContent = "Not Done";
    done ? theButton.textContent = "Mark as undone" : theButton.textContent = "Mark as done";
    theButton.setAttribute("onclick", 'changeStatus(this)');
    theButtonDelete.textContent = "Delete Task";
    theButtonDelete.setAttribute("onclick", "deleteTask(this)");
    list.appendChild(newRow);
    newRow.appendChild(newDescription);
    newRow.appendChild(newStatus);
    newRow.appendChild(buttonStatus);
    buttonStatus.appendChild(theButton);
    newRow.appendChild(deleteButton);
    deleteButton.appendChild(theButtonDelete);
    document.getElementById('add').value = '';
    tasks.push(taskname + ':' + done);
    setCookie('tasks', 100);
};

function setCookie(cookieName, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 40000));
    let expires = "expires=" + date.toUTCString();
    let taskString ="";
    tasks.forEach((t) => {
        taskString += t.toString() + '|';
    });
    document.cookie = cookieName + '=' + taskString + ';' + expires + '; path=/';
};

function checkCookie() {
    if (document.cookie !== '') {
        const string = document.cookie.split('=')[1];
        const tasksString = string.split("|");
        tasksString.pop("");
        tasksString.forEach((t) => {
            const values = t.split(':');
            const done = values[1] === "true" ? true : false;
            addTask(values[0], done);
        });
    } 
};

function checkEnter() {
    addEventListener("keypress", (pressed) => {
        if(pressed.key === "Enter") {
            addTask(document.getElementById('add').value);
        } 
    });

};

function changeStatus(task) {
    const row = task.parentNode.parentNode.rowIndex;
    const taskName = task.parentElement.parentElement.children[0].innerText;
    if (tasks[row - 1].split(':')[0] === taskName) {
        tasks[row - 1].split(':')[1] === 'true' ? tasks[row - 1] = tasks[row - 1].replace('true', 'false') : tasks[row - 1] = tasks[row - 1].replace('false', 'true');
        document.cookie = "";
        setCookie("tasks", 100);
    }
    document.getElementById("list").replaceChildren();
    document.location.reload();
};

function deleteTask(task) {
    const row = task.parentNode.parentNode.rowIndex;
    tasks.splice((row - 1), 1);
    document.cookie = "";
    setCookie("tasks", 100);
    document.getElementById("list").replaceChildren();
    document.location.reload();
}
