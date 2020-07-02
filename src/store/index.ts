import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface ListItemModel {
  id: number;
  name: string;
  tasks: string[];
}

export const STORAGE_KEY = 'todo-list';

export const updateLocalStorage = (list: ListItemModel[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default new Vuex.Store({
  state: {
    list: []
  },

  mutations: {

    LIST_UPDATE: (state, payload) => {
      state.list = payload
    },

    LIST_CREATE: (state: { list: ListItemModel[] }, payload: { uniqueId: number; listName: string }) => {
      state.list.unshift({
        id: payload.uniqueId,
        name: payload.listName,
        tasks: []
      })
      updateLocalStorage(state.list)
    },

    LIST_EDIT: (state, payload: { listId: number; listName: string }) => {
      state.list.map((list: ListItemModel) => {
        if (list.id === payload.listId) {
          list.name = payload.listName
        }
      })
      updateLocalStorage(state.list)
    },

    LIST_DELETE: (state, payload: { listId: number }) => {
      state.list = state.list.filter((list: ListItemModel) => list.id !== payload.listId)
      updateLocalStorage(state.list)
    },

    TASK_CREATE: (state, payload: { listId: number; newTask: string }) => {
      state.list.map((list: ListItemModel) => {
        if (list.id === payload.listId) {
          list.tasks.unshift(payload.newTask)
        }
      });
      updateLocalStorage(state.list)
    },

    TASK_UPDATE: (state, payload: { listId: number; taskId: number; newValue: string }) => {
      state.list.map((list: ListItemModel) => {
        if (list.id === payload.listId) {
          list.tasks.splice(payload.taskId, 1, payload.newValue)
        }
      });
      updateLocalStorage(state.list)
    },

    TASK_DELETE: (state, payload: { listId: number; taskId: number }) => {
      state.list.map((list: ListItemModel) => {
        if (list.id === payload.listId) {
          list.tasks.splice(payload.taskId, 1)
        }
      });
      updateLocalStorage(state.list)
    },

  },

  actions: {
    fetchTodoList(context) {
        context.commit('LIST_UPDATE', JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    },

    listCreate(context, payload) {
      context.commit('LIST_CREATE', payload)
    },

    listEdit(context, payload) {
      context.commit('LIST_EDIT', payload)
    },

    listDelete(context, payload) {
      context.commit('LIST_DELETE', payload)
    },

    taskCreate(context, payload) {
      context.commit('TASK_CREATE', payload)
    },

    taskUpdate(context, payload) {
      context.commit('TASK_UPDATE', payload)
    },

    taskDelete(context, payload) {
      context.commit('TASK_DELETE', payload)
    },
  },

  getters: {
    getListById: (state) => (id: number) => {
      return state.list.filter((list: ListItemModel) => list.id === id)[0]
    }
  }
})
