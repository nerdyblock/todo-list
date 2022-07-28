const todo = document.getElementById('todo');


function generateTaskUi() 
{
    todo.insertAdjacentHTML('beforeend', `
        <div class="task">
            <div class="status" data-status></div>
            <p class="title" data-title></p>
            <p class="date" data-date></p>
            <button class="task-delete" data-delete>&#10060;</button>
        </div>
    `);

    let title = document.querySelector('#todo > .task:last-child [data-title]');
    let duedate = document.querySelector('#todo > .task:last-child [data-date]');

    return {
        title, 
        duedate
    };
    // todo.append(taskDiv)
    // todo.innerHTML += taskDiv;

    // todo.append(taskDiv);
    // let task = document.createElement('div');
    // task.classList.add('task');
    // let titleContainer = document.createElement('div');
    // titleContainer.classList.add('title-container');
    // let priority = document.createElement('div');
    // priority.classList.add('priority');
    // let title = document.createElement('p');
    // title.classList.add('title');
    // titleContainer.append(priority, title)
    // let duedate = document.createElement('p');
    // duedate.classList.add('due-date');

    // task.append(titleContainer, duedate);
    // todo.append(task);
    // return {
    //     priority,
    //     title,
    //     duedate
    // }
}

export function uiAddTask() {
    let taskList = JSON.parse(localStorage.getItem('task'));
    todo.innerHTML = '';
    taskList.forEach(element => {
        let dom = generateTaskUi();
        dom.title.innerText = element.title;
        dom.duedate.textContent = element.dueDate;
    });
}

