import { defineStore } from 'pinia'

const storageKey = 'todos';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
    search: ''
  }),
  getters: {

  },
  actions: {
    addTodo(data) {
      const todos = localStorage.getItem(storageKey) && JSON.parse(localStorage.getItem(storageKey));

      if (todos) {
        localStorage.setItem(storageKey, JSON.stringify([...todos, data]));
        return;
      }

      localStorage.setItem(storageKey, JSON.stringify([data]));
      this.todos = JSON.parse(localStorage.getItem(storageKey));
    },
    deleteTodo(todoId) {
      if (!localStorage.getItem('todos_history')) {
        localStorage.setItem('todos_history', JSON.stringify([]))
      }

      localStorage.setItem('todos_history', JSON.stringify([...JSON.parse(localStorage.getItem('todos_history')), this.todos.find(t => t.id === todoId)]));
      localStorage.setItem(storageKey, JSON.stringify(this.todos.filter(t => t.id !== todoId)));

      this.todos = JSON.parse(localStorage.getItem(storageKey));
    },
    editTodo(id, data) {
      const todoIndex = this.todos.findIndex(t => t.id === id);
      this.todos[todoIndex] = data;

      localStorage.setItem(storageKey, JSON.stringify(this.todos));
    },
    favoriteChange(id) {
      const todoIndex = this.todos.findIndex(t => t.id === id);
      this.todos[todoIndex].is_favorite = !this.todos[todoIndex].is_favorite;

      localStorage.setItem(storageKey, JSON.stringify(this.todos));
    },
    changeTodoStatus(id, status) {
      const todoIndex = this.todos.findIndex(t => t.id === id);
      this.todos[todoIndex].status = status;

      localStorage.setItem(storageKey, JSON.stringify(this.todos));
    },
    fetchTodos() {
      this.todos = JSON.parse(localStorage.getItem(storageKey));
    },
  },
})