<template>
  <div v-if="list">
    <section class="d-flex justify-content-between align-items-center task-heading">
      <div
        class="d-flex align-items-center flex-fill ml-3 mr-2 task-heading--title"
        v-if="list.name"
      >
        <span class="mr-2 text-nowrap">
          Tasks for
          <strong v-show="!editMode">{{ list.name }}</strong>
        </span>
        <span class="input-group" v-show="editMode">
          <input
            class="form-control"
            ref="listNameElement"
            :value="list.name"
            v-on:keyup.enter="saveListName()"
          />
          <div class="input-group-append">
            <button class="btn btn-success btn-lg" v-on:click="saveListName()">
              <font-awesome-icon icon="save" />
            </button>
          </div>
        </span>
      </div>
      <button class="btn btn-primary btn-lg rounded-pill mr-2" v-on:click="toggleEditList()">
        <font-awesome-icon icon="edit" />
        <!-- Edit -->
      </button>
      <button class="btn btn-danger btn-lg rounded-pill" v-on:click="deleteList()">
        <font-awesome-icon icon="trash" />
        <!-- Delete List -->
      </button>
    </section>
    <section class="task-list">
      <div class="input-group">
        <input
          ref="newTaskElement"
          class="form-control"
          v-model="newTask"
          v-on:keyup.enter="createTask(newTask); newTask = ''"
          placeholder="Create new task"
        />
        <div clasa="input-group-append">
          <button
            class="btn btn-primary rounded-pill ml-2"
            v-bind:disabled="!newTask"
            v-on:click="createTask(newTask); newTask = ''"
          >
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div class="input-group" v-for="(task, i) in list.tasks" :key="i">
        <input
          class="form-control"
          v-model="list.tasks[i]"
          v-on:input="updateTask(i, list.tasks[i])"
          v-on:keyup.enter="focusNewTask()"
        />
        <div clasa="input-group-append">
          <button class="btn btn-primary rounded-pill ml-2" v-on:click="deleteTask(i)">
            <font-awesome-icon icon="check" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Debounce } from 'vue-debounce-decorator'

@Component
export default class Tasks extends Vue {
  $refs!: {
    newTaskElement: HTMLFormElement;
    listNameElement: HTMLFormElement;
  };
  editMode!: boolean

  get list() {
    return this.$store.getters.getListById(+this.$route.params.listId)
  }

  data() {
    return {
      newTask: '',
      editMode: false
    }
  }

  mounted() {
    if (this.$refs.newTaskElement) {
      this.focusNewTask()
    }
  }

  toggleEditList() {
    this.editMode = true
    this.$nextTick(() => {
      this.$refs.listNameElement.focus()
    });
  }

  saveListName() {
    const listName = this.$refs.listNameElement.value
    const listId = this.list.id
    if (listName) {
      this.$store.dispatch('listEdit', { listId, listName })
      this.editMode = false
    }
  }

  createTask(newTask: string) {
    const listId = this.list.id
    if (newTask) {
      this.$store.dispatch('taskCreate', { listId, newTask })
      this.focusNewTask()
    }
  }

  @Debounce(500)
  updateTask(taskId: number, newValue: string) {
    const listId = this.list.id
    this.$store.dispatch('taskUpdate', { listId, taskId, newValue })
  }

  deleteTask(taskId: number) {
    const listId = this.list.id
    this.$store.dispatch('taskDelete', { listId, taskId })
  }

  deleteList() {
    const listId = this.list.id
    this.$store.dispatch('listDelete', { listId })
    this.$router.push({ path: '/' })
  }

  focusNewTask() {
    this.$refs.newTaskElement.focus()
  }
}
</script>
