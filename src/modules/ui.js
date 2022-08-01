const todo = document.getElementById('todo');

function generateTaskUi() 
{
    todo.innerHTML += `
        <div class="task">
            <div class="right">
                <div class="status" data-status></div>
                <p class="title" data-title></p>
            </div>
            <div class="left">
                <p class="date" data-date></p>
                <button class="task-delete" data-delete>&#10060;</button>
            </div>
        </div>
    `

}

function selectDomElements() {
    generateTaskUi();
    let title = document.querySelector('#todo > .task:last-child [data-title]');
    let duedate = document.querySelector('#todo > .task:last-child [data-date]');

    return {
        title, 
        duedate,
    };
}

export function uiShowTask() {
    let taskList = JSON.parse(localStorage.getItem('task'));
    todo.innerHTML = '';
    taskList.forEach(element => {
        let dom = selectDomElements();
        dom.title.innerText = element.title;
        dom.duedate.textContent = element.dueDate;
        dom.title.setAttribute('id', element.taskId);
    });
}