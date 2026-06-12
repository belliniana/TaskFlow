const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

const searchInput =
    document.getElementById("searchInput");

const taskCount =
    document.getElementById("taskCount");

const filterButtons =
    document.querySelectorAll(".filter-btn");

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

let currentFilter = "all";

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function updateCount() {

    taskCount.textContent =
        `${tasks.length} tarefas`;

}

function renderTasks() {

    taskList.innerHTML = "";

    const search =
        searchInput.value.toLowerCase();

    let filtered =
        tasks.filter(task => {

            const matchesSearch =
                task.text
                    .toLowerCase()
                    .includes(search);

            if (currentFilter === "pending") {

                return !task.completed &&
                    matchesSearch;

            }

            if (currentFilter === "completed") {

                return task.completed &&
                    matchesSearch;

            }

            return matchesSearch;

        });

    filtered.forEach(task => {

        const li =
            document.createElement("li");

        li.classList.add(
            "task-item"
        );

        if (task.completed) {

            li.classList.add(
                "completed"
            );

        }

        li.innerHTML = `

        <span class="
        task-text
        ${task.completed ? "completed" : ""}
        ">
            ${task.text}
        </span>

        <div class="task-actions">

            <button
                class="complete-btn">

                ✓

            </button>

            <button
                class="edit-btn">

                Editar

            </button>

            <button
                class="delete-btn">

                X

            </button>

        </div>

        `;

        const completeBtn =
            li.querySelector(
                ".complete-btn"
            );

        const editBtn =
            li.querySelector(
                ".edit-btn"
            );

        const deleteBtn =
            li.querySelector(
                ".delete-btn"
            );

        completeBtn.addEventListener(
            "click",
            () => {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();

            }
        );

        editBtn.addEventListener(
            "click",
            () => {

                const novoTexto =
                    prompt(
                        "Editar tarefa:",
                        task.text
                    );

                if (novoTexto) {

                    task.text =
                        novoTexto;

                    saveTasks();

                    renderTasks();

                }

            }
        );

        deleteBtn.addEventListener(
            "click",
            () => {

                tasks =
                    tasks.filter(
                        t => t !== task
                    );

                saveTasks();

                renderTasks();

            }
        );

        taskList.appendChild(li);

    });

    updateCount();

}

addTaskBtn.addEventListener(
    "click",
    () => {

        const text =
            taskInput.value.trim();

        if (!text) return;

        tasks.push({

            text,
            completed: false

        });

        taskInput.value = "";

        saveTasks();

        renderTasks();

    }
);

searchInput.addEventListener(
    "input",
    renderTasks
);

filterButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                b => b.classList.remove("active")
            );

            btn.classList.add("active");

            currentFilter =
                btn.dataset.filter;

            renderTasks();

        }
    );

});

renderTasks();