const taskInput = document.getElementById('task-input');
        const addTaskBtn = document.getElementById('add-task-btn');
        const taskList = document.getElementById('task-list');
        const taskCounter = document.getElementById('task-counter');
        const progressBar = document.getElementById('progress-bar');

        let tasks = [];

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText) {
                tasks.push({ text: taskText, completed: false });
                taskInput.value = '';
                renderTasks();
            }
        });

        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

                const taskText = document.createElement('span');
                taskText.textContent = task.text;
                taskText.addEventListener('click', () => {
                    tasks[index].completed = !tasks[index].completed;
                    renderTasks();
                });

                const editBtn = document.createElement('button');
                editBtn.textContent = '✏';
                editBtn.addEventListener('click', () => {
                    const newText = prompt('Edit task:', task.text);
                    if (newText) tasks[index].text = newText;
                    renderTasks();
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '🗑';
                deleteBtn.className = 'delete';
                deleteBtn.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    renderTasks();
                });

                taskItem.appendChild(taskText);
                taskItem.appendChild(editBtn);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            });

            updateCounter();
            updateProgressBar();
        }

        function updateCounter() {
            const completedTasks = tasks.filter(task => task.completed).length;
            taskCounter.textContent = `${completedTasks}/${tasks.length}`;
        }

        function updateProgressBar() {
            const completedTasks = tasks.filter(task => task.completed).length;
            const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }