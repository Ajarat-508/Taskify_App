"use strict";

const dB_Name = "todo_db";
const handlePreviewEdit = function (e) {
  e.preventDefault();
  document.querySelector("#preview_form").classList.remove("hidden");
  const editTitle = document.querySelector("#title_edit").value;
  const todoDescription = document.querySelector("#todo_description").value;

  const todo_db = getDb("todo_Db");
  const currentPreviewtaskID = getDb("current_Preview_Todo");
  const taskID = todo_db.findIndex((todo) => todo.id === currentPreviewtaskID);

  if (taskID !== -1) {
    // Update the currentTodo with the new title and added description
    if (editTitle === "" || todoDescription === "") {
      return;
    } else {
      const updatedCurrentTodo = {
        ...todo_db[taskID],
        title: editTitle,
        description: todoDescription,
      };
      // Update the todo_db in local storage with the modified currentTodo
      todo_db[taskID] = updatedCurrentTodo;
      setDb("todo_Db", todo_db);
    }
   
    document.querySelector("#preview_form").classList.add("hidden");
    renderPreviewtaskID();
  } else {
    console.error("Task not found in the database.");
  }
};

const renderPreviewtaskID = function () {
  const todo_db = getDb("todo_Db");
  const currentPreviewtaskID = getDb("current_Preview_Todo");
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewtaskID);

  const { title, id, date, description } = currentTodo;
  const todo_Preview_Container = document.querySelector("#description");

  return (todo_Preview_Container.innerHTML = ` 
  <section id="description">
            <section class="flex justify-between items-center">
            <h3 class="text-xl text-slate-200 font-bold" ><input class="p-3" type="checkbox" name="done" 
                id="complete" onchange="pending()"/>
                ${title}</h3>
            <div class="flex items-center gap-2">
                <button onclick="previewEditForm(event)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" stroke="currentColor"
                         class="w-5 h-5 text-slate-200 hover:text-slate-300 hover:font-bold
                         hover:w-6 hover:h-6">
                        <path stroke-linecap="round" 
                        stroke-linejoin="round"
                         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
    
                <button onclick="deleteTodo('${id}')"
                type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-5 h-5 text-red-500 hover:text-red-300 
                     hover:font-bold  hover:w-6 hover:h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>  
                </button>
            </div>
        </section>

          <section class=""
          >
                <p class="text-sm text-slate-300" > ${
                  description || "Your description will appear here"
                }</p>
                <section class="mt-4">

                    <span class="text-slate-200 text-sm">
                    ${getDate(date)}
                    </span>
                    <span class="mx-2 text-white">&middot;</span>
                    <span 
                    class=" text-slate-100 bg-amber-600 
                    text-sm px-2 py-1 rounded-full"
                    id="task">
                        Pending
                    </span>
                </section>
                </section>
        </section>`);
};

renderPreviewtaskID();
const previewEditForm = (e) => {
  e.preventDefault();
 
  document.querySelector("#preview_form").classList.toggle("hidden");
};

// Delete todo
const deleteTodo = function (id) {
  Swal.fire({
    title: "Delete Todo",
    text: "Do you want to delete this todo",
    icon: "warning",
    confirmButtonText: "Yes!",
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      const todo_db = getDb(dB_Name);
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);

      setDb(dB_Name, new_todo_db);
      window.location.href = "/index.html";
    } else {
      return;
    }
  });
};

const pending = function () {
  const taskStatus = document.querySelector("#task");
  const checkTask = document.querySelector("#complete");

  if (checkTask.checked === true) {
    taskStatus.textContent = "Completed";
    taskStatus.classList.remove("bg-amber-600");
    taskStatus.classList.add("bg-green-400");
  } else {
    taskStatus.textContent = "Pending";
    taskStatus.classList.remove("bg-green-400");
    taskStatus.classList.add("bg-amber-600");
  }
};
pending();
