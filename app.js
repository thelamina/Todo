let tasks = [];

class Task {
  constructor(taskName) {
    this.name = taskName;
  }

  addTask() {
    tasks.push(this.name);
  }

  addTaskToHTML() {
    const list = document.querySelector("ul");
    const elem = document.createElement("li");
    elem.classList = "task-item";
    elem.innerHTML = `${this.name}
                      <a href="#" class="delete-task">x</a>`;
    list.appendChild(elem);
  }

  clearInput() {
    document.querySelector("input").value = "";
  }

  showAlert(message, alertClass) {
    const form = document.querySelector("form");
    const paragraph = document.createElement("p");
    paragraph.className = `alert ${alertClass}`;
    paragraph.appendChild(document.createTextNode(message));

    const container = document.querySelector(".task");
    container.insertBefore(paragraph, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1000);
  }

  deleteTask() {
    let del = tasks.indexOf(`${this.name}`);
    tasks.splice(del, 1);
  }

  clearTask() {
    tasks = [];
    const list = document.querySelector("ul");
    let item = list.querySelectorAll("li");
    for (const prop of item) {
      prop.className += " shrink";
      setInterval(() => {
        prop.remove();
      }, 500);
    }
  }

  searchTask() {}
}

document.querySelector("form").addEventListener("submit", function (e) {
  const title = document.querySelector("input").value;
  const task = new Task(title);
  if (title != "") {
    task.addTask();
    task.addTaskToHTML();
    task.clearInput();
    task.showAlert("New task added!", "success");
  } else {
    task.showAlert("Task field cannot be empty", "error");
  }
  e.preventDefault();
});

document.body.addEventListener("click", function (e) {
  if (e.target.className === "delete-task") {
    let delItem = e.target.parentElement.firstChild.textContent.trim();
    const task = new Task(delItem);
    // task.deleteTask();
    task.showAlert("Task removed...", "success");

    let anim = e.target.closest("li");
    anim.className += " shrink";
    // console.log(anim);

    setInterval(() => {
      e.target.parentElement.remove();
    }, 500);
  }
});

// clear task

document.querySelector(".clear").addEventListener("click", function (e) {
  const task = new Task();
  if (tasks.length > 0) {
    task.clearTask();
  } else {
    task.showAlert("No task in the list...", "error");
  }
  e.preventDefault();
});
