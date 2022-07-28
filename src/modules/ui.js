const todo = document.getElementById('todo');


function generateTaskUi() 
{
    todo.innerHTML += `
        <div class="task">
            <div class="status" data-status></div>
            <p class="title" data-title></p>
            <p class="date" data-date></p>
            <button class="task-delete" data-delete>&#10060;</button>
        </div>
    `

    let title = document.querySelector('#todo > .task:last-child [data-title]');
    let duedate = document.querySelector('#todo > .task:last-child [data-date]');

    return {
        title, 
        duedate
    };
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

