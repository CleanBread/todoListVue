<template>
  <div class="main">
    <div class="main__add">
      <add-item :settings="addTodoListSettings"  @add-todo-list="addTodoList"></add-item>
    </div>
    <todo-list v-for="(list, i) in getTodoLists" :key="i" :data="list"></todo-list>
  </div>
</template>

<script>
import addItem from '~/components/addItem'
import todoList from '~/components/todoList'
export default {
  components: {
    todoList, addItem
  },
  data() {
    return {
			addTodoListSettings: {
				placeholder: 'Добавить цель',
				action: 'add-todo-list'
			}
    }
  },
  computed: {
    getTodoLists() {
      return this.$store.getters['todoLists/getLists']
    }
  },
  methods: {
    addTodoList(newListHeadline) {
      const newList = {
        headline: newListHeadline,
        todos: []
      }

      this.$store.dispatch('todoLists/setList', newList)
    }
  }
}
</script>

<style lang="sass">
.main
  display: flex
  flex-direction: column
  align-items: center
  padding: 100px 0 100px
  width: 700px
  margin: 0 auto
  &__add
    width: 100%
    margin-bottom: 150px
</style>