<template>
    <div class="change">
        <todo-list v-if="currentList" @go-back="goPreviewsState" @safe-list="safeList" @add-todo="addTodo" :data="currentList" :safed="safed" :previewState="previewsStateList"></todo-list>
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
            currentList: null,
            todos: [],
            safed: true,
            changed: false
        }
    },
    computed: {
        getTodoList() {
            return this.$store.getters['todoLists/getLists'].find(item => item.id === +this.$route.params.change)
        },
        previewsStateList() {
            return this.$store.getters['todoLists/getpreviewsStateList']
        }
    },
    mounted() {
        setTimeout(() => {
            this.currentList = this.getTodoList
        }, 0)
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
			this.$store.dispatch('todoLists/addTodoInList', [this.currentList.id, newTodo])
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