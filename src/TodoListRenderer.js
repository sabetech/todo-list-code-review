import _ from 'lodash';
import threedots from './icons8-menu-vertical-30.png';
import trashcan from './icons8-trash-can-50.png';

const todoListEl = document.querySelector('.todo-list-el');

export default function renderTodos(todoStorage) {
  todoListEl.innerHTML = '';
  _.orderBy(todoStorage.getExistingTodos(), ['index'], ['asc']).forEach((todo) => {
    todoListEl.innerHTML += `<li id='lst_${todo.index}'>
            <input id='chk_${todo.index}' type='checkbox' class='checkbox-item' ${todo.completed ? 'checked' : ''} >
            <input id='txt_${todo.index}' type='text' class='todo-desc ${todo.completed ? 'strikethrough-text' : ''}' value='${todo.description}' >
            <img id='img_${todo.index}' class='list-action-icon' alt='action icon' src='${threedots}'>
        </li>`;
  });

  const taskItemCheckboxes = document.querySelectorAll('.checkbox-item');
  const taskitemLabelInputs = document.querySelectorAll('.todo-desc');

  taskItemCheckboxes.forEach((checkboxItem) => {
    checkboxItem.addEventListener('change', (ev) => {
      if (ev.target.checked) {
        document.querySelector(`#txt_${ev.target.id.substring(ev.target.id.indexOf('_') + 1)}`).classList.add('strikethrough-text');
        todoStorage.markAsComplete(parseInt(ev.target.id.split('_')[1], 10));
      } else {
        document.querySelector(`#txt_${ev.target.id.substring(ev.target.id.indexOf('_') + 1)}`).classList.remove('strikethrough-text');
        todoStorage.revertMarkAsComplete(parseInt(ev.target.id.split('_')[1], 10));
      }
    });
  });

  taskitemLabelInputs.forEach((labelInput) => {
    labelInput.addEventListener('focus', (ev) => {
      labelInput.parentElement.classList.add('li-background-highlight-edit');
      labelInput.classList.add('li-background-highlight-edit');
      const deleteEl = document.querySelector(`#img_${ev.target.id.split('_')[1]}`);
      deleteEl.src = trashcan;
      deleteEl.addEventListener('click', () => {
        todoStorage.delete(parseInt(ev.target.id.split('_')[1], 10));
      });
    });

    labelInput.addEventListener('blur', (ev) => {
      labelInput.parentElement.classList.remove('li-background-highlight-edit');
      labelInput.classList.remove('li-background-highlight-edit');
      document.querySelector(`#img_${ev.target.id.split('_')[1]}`).src = threedots;
    });

    labelInput.addEventListener('keypress', (ev) => {
      if ((ev.key === 'Enter') && (ev.target.value !== '')) {
        todoStorage.edit(parseInt(ev.target.id.split('_')[1], 10), ev.target.value);
        ev.target.blur();
      }
    });
  });

  const clearSelectedTodos = document.querySelector('.clear-all-selected');
  clearSelectedTodos.addEventListener('click', () => todoStorage.clearCompletedTasks());
}