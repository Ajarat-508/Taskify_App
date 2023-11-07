// "use strict"
// Database Name
const dB_Name = 'todo_Db';

// GLobal Variables
const todoInput = document.querySelector('#todoInput');
const updateTodoBtn = document.querySelector("#update_todo_btn");
const addTodoBtn = document.querySelector("#add_todo_btn");

// Create Todo
const createTodo =  (e) => {
    e.preventDefault();
    try {    
    if(!todoInput.value){
      
        showMessage("Kindly Enter a task title");
        return;
    } 
    

    const newTodo = {
        id: uuid(),
        title: todoInput.value,
        date: Date.now(),
    };

    // check if local storage is empty
    
    const todo_Db = getDb(dB_Name)

    const newTodo_DB = [...todo_Db, newTodo];
  
    // add new todo to local storage
    setDb(dB_Name, newTodo_DB);
    fetchTodo();
    // setting the input field to empty after clicking the add todo button
    resetFormInput();
}
catch (error) {
    showMessage(error.message);  
}
};

// READ TODO FUNCTION
const fetchTodo = () => {
    const todo_Db = getDb(dB_Name);
    
    const emptyTodo = todo_Db.length === 0;
    const todoListContainer = document.querySelector('#todo-list-container');
    
    if (emptyTodo) {
        todoListContainer.innerHTML = `<p class="text-center text-slate-200">Your tasks will appear here</p>`;
        return;
    }

    // Sort the todos by date in descending order
    const todos = sortTodosByDate(todo_Db).map((todo) => {
        return `
        <div class="group flex justify-between items-center py-3 px-2.5 bg-slate-100 rounded-lg hover:bg-slate-100">
      <button onclick="handle_Preview_Todo('${todo.id}')"> ${todo.title} </button>
            
            <section class="flex gap-4 hidden group-hover:block">
                
                <button onclick="handleEditMode('${todo.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-600 font-bold">
                        <path stroke-linecap="round" 
                        stroke-linejoin="round"
                         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>

                <button onclick="deleteTodo('${todo.id}')"
                type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>  
                </button>
                
            </section>
        </div>
        <span class="text-slate-400  text-sm flex gap-2 justify-center items-center">Date Added: ${new Date(todo.date).toLocaleString()}</span>
        `;
    });

    todoListContainer.innerHTML = todos.join('');
};

fetchTodo();

// UPDATE TODO FUNCTION
function handleEditMode(id){
const todo_Db = getDb(dB_Name);
const todo_to_update = todo_Db.find((todo) => todo.id === id);
if(!todo_to_update){
    return;
}


todoInput.value = todo_to_update.title 

const updateTodoBtn = document.querySelector("#update_todo_btn");
updateTodoBtn.classList.remove("hidden"); // Show the Update button

updateTodoBtn.setAttribute("todo_id_to_update", id);

const addBtn = document.querySelector("#add_todo_btn");
addBtn.classList.add("hidden"); // Hide the Add button

const cancelBtn = document.querySelector("#cancel_todo_btn");
cancelBtn.classList.remove("hidden"); // Show the Cancel button

// Add an event listener to hide the Cancel button and show the Add button when Update or Cancel is clicked
updateTodoBtn.addEventListener("click", function() {
  cancelBtn.classList.add("hidden"); // Hide the Cancel button
  addBtn.classList.remove("hidden"); // Show the Add button
});

cancelBtn.addEventListener("click", () => {
    resetFormInput();
  cancelBtn.classList.add("hidden"); // Hide the Cancel button
  addBtn.classList.remove("hidden"); // Show the Add button
  updateTodoBtn.classList.add("hidden");
});



};

const updateTodo = (e) =>{
    e.preventDefault();
    if(!todoInput.value){
      showMessage("Kindly enter a task title to update")
        return;
    } 

    
    const todo_id_to_update= updateTodoBtn.getAttribute("todo_id_to_update")
    const todo_Db = getDb(dB_Name);
    const updated_todo_Db = todo_Db.map((todo) => {
        if(todo.id === todo_id_to_update){
    return{...todo, title: todoInput.value}
        } else{
            return todo;
        }
    });
   
   

    // localStorage.setItem(dB_Name, JSON.stringify(updated_todo_Db))
    setDb(dB_Name, updated_todo_Db);
    fetchTodo();
    resetFormInput();

    
updateTodoBtn.classList.add("hidden") // hide updateTodoBtn
const cancelBtn = document.querySelector("#cancel_todo_btn");
cancelBtn.classList.remove("hidden"); // show cancelBtn

const addBtn = document.querySelector("#add_todo_btn")
addBtn.classList.remove("hidden")  // show addBtn


};
// DELETE TODO FUNCTION
const deleteTodo = (id) => {
    Swal.fire({
        title: 'Delete Todo',
        text: 'Do you want to delete this todo',
        icon: 'warning',
        confirmButtonText: 'Yes!',
        showCancelButton: true, 
        cancelButtonText: 'No, cancel!',
      }).then((res) => {

        if(res.isConfirmed){
        const todo_Db = getDb(dB_Name);
        const new_todo_Db = todo_Db.filter((todo) => todo.id !== id)
        
        setDb(dB_Name, new_todo_Db);
        fetchTodo()
        } else{
            return;
        }
        
      });
    
};

const handle_Preview_Todo = function (id) {
    setDb("current_Preview_Todo", id);
    window.location.href = "/preview_todo.html";
  };
  
