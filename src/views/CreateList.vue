<template>
  <section>
    <h2>Create List</h2>
    <div class="input-group create-list">
      <input
        class="form-control form-control-lg"
        v-model="listName"
        ref="listNameElement"
        v-on:keydown.enter="createList()"
      />
      <div class="input-group-append">
        <button class="btn btn-success btn-lg" v-on:click="createList()">
          <font-awesome-icon icon="greater-than" />
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ListItemModel } from '@/store'

@Component
export default class CreateList extends Vue {
  $refs!: { listNameElement: HTMLFormElement };
  listName!: string;

  data() {
    return {
      listName: ''
    };
  }

  get list() {
    return this.$store.state.list
  }

  mounted() {
    this.$refs.listNameElement.focus()
  }

  createList() {
    const listName = this.listName
    const uniqueId =
      this.list
        .map((item: ListItemModel) => item.id)
        .sort((a: number, b: number) => a - b)
        .reduce((a: number, c: number) => c, 0) + 1

    this.$store.dispatch('listCreate', {
      uniqueId,
      listName
    })

    this.$router.push({
      name: 'tasks',
      params: {
        listId: uniqueId
      }
    })
  }
}
</script>
