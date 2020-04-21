<template>
    <div class="change">
        <todo-list v-if="currentList" @change-todo-text="changeTodoText" @change-comp="changeTodoCompleted" @go-back="goPreviewsState" @safe-list="safeList" @add-todo="addTodo" :data="currentList" :safed="safed" :previewState="previewsStateList"></todo-list>
    </div>  
</template>

<script>
import todoList from '~/components/todoList'
export default {
    components: {
        todoList
    },
    data() {
        return {
            todos: [],
            safed: true,
            changed: false
        }
    },
    computed: {
        currentList() {
            return this.$store.getters['todoLists/getCurrentList']
        },
        previewsStateList() {
            return this.$store.getters['todoLists/getPreviewsStateList']
        }
    },
    mounted() {
        this.$store.dispatch('todoLists/setCurrentList', +this.$route.params.change)
    },
    beforeRouteLeave(to, from, next) {
        let len = this.previewsStateList
        if(!this.safed) {
            // next(false)
            // let confirm = confirm('Do you want save changes')
            this.$store.dispatch('todoLists/changeTodoList', this.previewsStateList[0])
            this.$store.dispatch('todoLists/deletePreviewsStates')
            next()
        } else {
            this.$store.dispatch('todoLists/deletePreviewsStates')
            next()
        }
    },
    methods: {
		addTodo(textTodo) {
			const newTodo = {
				text: textTodo,
				completed: false
            }
            this.safed = false
			this.$store.dispatch('todoLists/addTodoInList', newTodo)
        },
        changeTodoCompleted(todoId) {
            this.safed = false
            this.$store.dispatch('todoLists/changeTodoCompleted', todoId)
        },
        changeTodoText(todoId, text) {
            this.safed = false
            this.$store.dispatch('todoLists/changeTodoText', [todoId, text])
        },
        safeList() {
            this.safed = true
        },
        goPreviewsState() {
            this.$store.dispatch('todoLists/changeTodoList', this.previewsStateList[0])
            this.$store.dispatch('todoLists/deletePreviewsStates')
        }
    }
}
</script>

<style lang="sass" scoped>
.change
    max-width: 700px
    margin: 0 auto
    padding: 100px 0
</style>