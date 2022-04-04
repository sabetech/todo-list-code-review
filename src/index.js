import './style.css';
import TodoStorage from './storage.js';
import renderTodos from './TodoListRenderer.js';
import RefreshIcon from './icons8-refresh-30.png';

const todoListInputEl = document.querySelector('.type-todo-here');
const imgRefreshEl = document.querySelector('.refresh-icon');
imgRefreshEl.src = RefreshIcon;

const myTodoStorage = new TodoStorage();

window.onload = () => renderTodos(myTodoStorage);

todoListInputEl.addEventListener('keypress', (e) => {
  if ((e.key === 'Enter') && (e.target.value !== '')) {
    myTodoStorage.saveTodoEntry(e.target.value);
    e.target.value = '';
  }
});