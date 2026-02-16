document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Initialize the ToDo List application
 */
function initializeApp() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Add event listener for form submission
  todoForm.addEventListener('submit', handleFormSubmit);

  /**
   * Handle form submission for adding new tasks
   * @param {Event} event - The form submit event
   */
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    
    const taskText = todoInput.value.trim();
    
    if (taskText) {
      addTodoItem(taskText);
      todoInput.value = ''; // Clear input field
      todoInput.focus(); // Return focus to input
    }
  }

  /**
   * Create and add a new todo item to the list
   * @param {string} taskText - The text of the task
   */
  function addTodoItem(taskText) {
    // Create list item
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    
    // Create span for task text
    const taskSpan = document.createElement('span');
    taskSpan.className = 'todo-text';
    taskSpan.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete task');

    // Add event listeners
    checkbox.addEventListener('change', handleCheckboxChange);
    deleteButton.addEventListener('click', handleDeleteClick);

    // Assemble the todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(taskSpan);
    todoItem.appendChild(deleteButton);

    // Add to the list
    todoList.appendChild(todoItem);

    // Update empty state
    updateEmptyState();
  }

  /**
   * Handle checkbox change event
   * @param {Event} event - The change event
   */
  function handleCheckboxChange(event) {
    const checkbox = event.target;
    const todoItem = checkbox.closest('.todo-item');
    const taskSpan = todoItem.querySelector('.todo-text');
    
    taskSpan.classList.toggle('completed', checkbox.checked);
  }

  /**
   * Handle delete button click event
   * @param {Event} event - The click event
   */
  function handleDeleteClick(event) {
    const deleteButton = event.target;
    const todoItem = deleteButton.closest('.todo-item');
    
    todoItem.remove(); // Remove from DOM
    
    // Clean up: remove event listeners
    const checkbox = todoItem.querySelector('.todo-checkbox');
    checkbox.removeEventListener('change', handleCheckboxChange);
    deleteButton.removeEventListener('click', handleDeleteClick);
    
    // Update empty state
    updateEmptyState();
  }

  /**
   * Update empty state message when list is empty
   */
  function updateEmptyState() {
    const existingEmptyState = todoList.querySelector('.empty-state');
    
    if (todoList.children.length === 0) {
      if (!existingEmptyState) {
        const emptyState = document.createElement('li');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No tasks yet. Add one above!';
        todoList.appendChild(emptyState);
      }
    } else {
      if (existingEmptyState) {
        existingEmptyState.remove();
      }
    }
  }

  // Initial empty state
  updateEmptyState();
}