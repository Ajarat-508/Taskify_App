// CREATE TODO FUNCTION

// UTILITY FUNCTION
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/*
-Get todo from user input
-Add todo to local storage
*/ 

const dB_Name = 'todo_Db';

const createTodo = () => {
    const todoInput = document.querySelector('#todoInput');
    const errorMessageSpan = document.querySelector("#error-message")
    
    if(!todoInput.value){
        errorMessageSpan.innerHTML = "Kindly Enter a todo title";
        errorMessageSpan.classList.remove("hidden");
        errorMessageSpan.classList.add("text-base", "text-red-400");

        setTimeout(() =>{
            errorMessageSpan.classList.add("hidden")
        }, 4000);

        return;
    } 

    const newTodo = {
        id: uuid(),
        title: todoInput.value,
        date: Date.now(),
    };

    // check id local storage is empty
    const todo_Db = JSON.parse(localStorage.getItem('todo_Db')) || [];
   
    // Add new todo to Db array
    const newTodo_DB = [...todo_Db, newTodo];
  
    // add new todo to local storage
    localStorage.setItem(dB_Name, JSON.stringify(newTodo_DB));
    // To display it on the UI whe User enters a to Item
    fetchTodo();
    // setting the input field to empty after clicking the add todo button
    todoInput.value = " ";
}


// READ TODO FUNCTION
const fetchTodo = () => {
    const todo_Db = JSON.parse(localStorage.getItem(dB_Name)) || [];
    const emptyTodo = todo_Db.length === 0;
    const todoListContainer = document.querySelector('#todo-list-container');
    
    if (emptyTodo) {
        todoListContainer.innerHTML = `<p class="text-center text slate-400">Your todos will appear here</p>`;
        return;
    }

    // Sort the todos by date in descending order
    todo_Db.sort((a, b) => b.date - a.date);

    const todos = todo_Db.map((todo) => {
        return `
        <div class="group flex justify-between items-center py-3 px-2.5 bg-slate-100 rounded-lg hover:bg-slate-100">
            <a href="">${todo.title}</a>
            
            
            <section class="flex gap-4 hidden group-hover:block">
                
                <button onclick="handleEditMode('${todo.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" 
                        stroke-linejoin="round"
                         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>

                <button onclick="deleteTodo('${todo.id}')"
                type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>  
                </button>

                
                
            </section>
        </div>
        <span class="text-blue-900 flex gap-2 justify-center items-center">Date Added: ${new Date(todo.date).toLocaleString()}</span>
        `;
    });

    // Render the sorted todos on the UI
    todoListContainer.innerHTML = todos.join('');
};

// Call fetchTodo to populate the UI with sorted todos
fetchTodo();


//     const todo_Db = JSON.parse(localStorage.getItem(dB_Name)) || [];
//     const emptyTodo = todo_Db.length === 0;
//     const todoListContainer = document.querySelector('#todo-list-container');
//     if(emptyTodo){
//         todoListContainer.innerHTML = `<p class="text-center text slate-400 ">Your todos will appear Here</p>`

//         return;
//     } 
       
    
    
//     const todos = todo_Db.sort((a, b) => b.date - a.date).map((todo) => {
//         return `
//         <div class="group flex justify-between items-center py-3 px-2.5 rounded-lg hover:bg-slate-100">
               
//                 <a href="">${todo.title}</a>
                
                // <section class="flex gap-4 hidden group-hover:block">
                    
                //     <button onclick="handleEditMode('${todo.id}')">
                //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                //             stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                //             <path stroke-linecap="round" 
                //             stroke-linejoin="round"
                //              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                //         </svg>
                //     </button>

                //     <button onclick="deleteTodo('${todo.id}')"
                //     type="button">
                //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                //             <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                //         </svg>  
                //     </button>
    
                    
                    
                // </section>
//             </div>
//         `
        
            
//     });


// // to render the input value dynamically on the UI
// todoListContainer.innerHTML = todos.join('');
// };


// UPDATE TODO FUNCTION
function handleEditMode(id){
const todo_Db = JSON.parse(localStorage.getItem(dB_Name)) || [];
const todo_to_update = todo_Db.find((todo) => todo.id === id);
if(!todo_to_update){
    return;
}

const todoInput = document.querySelector('#todoInput');
todoInput.value = todo_to_update.title 

const updateTodoBtn = document.querySelector("#update_todo_btn")
updateTodoBtn.classList.remove("hidden") // show updateTodoBtn
updateTodoBtn.setAttribute("todo_id_to_update", id)

const addBtn = document.querySelector("#add_todo_btn")
addBtn.classList.add("hidden")  // show addBtn
};

const updateTodo = () =>{
    const todoInput = document.querySelector('#todoInput');

    if(!todoInput.value){
        errorMessageSpan.innerHTML = "Kindly Enter a todo title";
        errorMessageSpan.classList.remove("hidden");
        errorMessageSpan.classList.add("text-base", "text-red-400");

        setTimeout(() =>{
            errorMessageSpan.classList.add("hidden")
        }, 4000);

        return;
    } 

    const updateTodoBtn = document.querySelector("#update_todo_btn")
    const todo_id_to_update= updateTodoBtn.getAttribute("todo_id_to_update")
    const todo_Db = JSON.parse(localStorage.getItem(dB_Name)) || [];
    const updated_todo_Db = todo_Db.map((todo) => {
        if(todo.id === todo_id_to_update){
    return{...todo, title: todoInput.value}
        } else{
            return todo;
        }
    });
   
    console.log(updated_todo_Db) 

    localStorage.setItem(dB_Name, JSON.stringify(updated_todo_Db))
    fetchTodo();
    todoInput.value = " ";

    
updateTodoBtn.classList.add("hidden") // hide updateTodoBtn


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

            
        // get  todo from local storage
        const todo_Db = JSON.parse(localStorage.getItem(dB_Name));
       
        // filter out todos that doesn't match the id
        const new_todo_Db = todo_Db.filter((todo) => todo.id !== id)
        
    
        // set todos without the todo that matches the ID to the ls
        localStorage.setItem(dB_Name, JSON.stringify(new_todo_Db));
        fetchTodo()
        } else{
            return;
        }
        
      })
    
}
fetchTodo();