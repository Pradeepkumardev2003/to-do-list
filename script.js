let inputEl=document.getElementById("input-el")
let addBtn=document.getElementById("add-btn")
let listEl=document.getElementById("list-el")

let tasks=JSON.parse(localStorage.getItem("tasks")) || []
let isEditing=false
let editIndex=-1

renderTask()

addBtn.addEventListener("click",function(){
    let task=inputEl.value
    if(task==="")
    {
        return
    }

    if(isEditing)
    {
        tasks[editIndex]=task
        isEditing=false
        addBtn.textContent="Add"
    }
    else{
        tasks.push(task)
    }

    inputEl.value=""
    saveTask()
    renderTask()
})

function renderTask(){
    listEl.innerHTML=""

    tasks.forEach((task,index)=>{
        let list=document.createElement("li")
        list.classList.add("task-items")

        list.innerHTML=`
        <span class="listText">${task}</span>
        <div class="list-buttons">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
        `
        listEl.appendChild(list)
    })
}

function editTask(index)
{
    inputEl.value=tasks[index]
    isEditing=true
    editIndex=index
    addBtn.textContent="Update"
}

function deleteTask(index)
{
    tasks.splice(index,1)
    saveTask()
    renderTask()
}

function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}