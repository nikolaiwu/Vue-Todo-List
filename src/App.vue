<template>
  <div id="app" class="container">
    <h1 class="text-center">
      <router-link :to="{ path: '/' }">
        <font-awesome-icon icon="stream" />Todo List
        <font-awesome-icon icon="stream" />
      </router-link>
    </h1>

    <div class="loader" v-if="loading">
        <font-awesome-icon icon="spinner" spin />
    </div>

    <div class="row">
      <div class="col-lg">

        <div v-if="!loading">
          <section class="create-list-nav">
            <router-link :to="{ name: 'createList', path: '/create-new-list' }">
              <font-awesome-icon icon="plus-square" />
              Create New List
            </router-link>
          </section>

          <nav class="todo-list">
            <div class="no-records" v-if="!list.length">No records</div>
            <div v-for="listItem in list" :key="listItem.id">
              <router-link :to="{ name: 'tasks', params: { listId: listItem.id }}">
                <font-awesome-icon icon="list-ul" />
                {{ listItem.name }}
              </router-link>
            </div>
          </nav>
        </div>
      </div>

      <div class="col-lg">
        <router-view name="tasks" :key="$route.fullPath" />
        <router-view name="createList" :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  get loading() {
    return this.$store.state.loading
  }

  get list() {
    return this.$store.state.list
  }

  mounted() {
    this.$store.dispatch('fetchTodoList')
  }
}
</script>
