<template>
    <div class="change">
        <todo-list v-if="currentList" @change-list-text="changeListText" @change-todo-text="changeTodoText" @change-comp="changeTodoCompleted" @go-back="goPreviewsState" @safe-list="safeList" @add-todo="addTodo" :data="currentList" :safed="safed" :previewState="previewsStateList"></todo-list>
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
        if(!this.currentList) {
            this.$store.dispatch('todoLists/setCurrentList', +this.$route.params.change)
        }
    },
    beforeRouteLeave(to, from, next) {

        if(!this.currentList.safed) {
            next(false)
            this.dialog(next)
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
			this.$store.dispatch('todoLists/addTodoInList', newTodo)
        },
        changeTodoCompleted(todoId) {
            this.$store.dispatch('todoLists/changeTodoCompleted', todoId)
        },
        changeTodoText(todoId, text) {
            this.$store.dispatch('todoLists/changeTodoText', [todoId, text])
        },
        changeListText(text) {
            this.$store.dispatch('todoLists/changeListText', text)
        },
        safeList() {
            this.$store.dispatch('todoLists/safeCurrentList')
        },
        goPreviewsState() {
            this.$store.dispatch('todoLists/changeTodoList', this.previewsStateList[0])
            this.$store.dispatch('todoLists/deletePreviewsStates')
        },
        dialog(next) {
            let self = this
            this.$vueConfirm.confirm(
                {
                    auth: false,
                    message: `Сохранить Ваши изменения?`,
                    button: {
                        yes: 'Да',
                        no: 'Нет'
                    }
                },
                function(confirm) {
                    if (confirm == true) {
                        self.$store.dispatch('todoLists/safeCurrentList')
                    } else {
                        self.$store.dispatch('todoLists/changeTodoList', self.previewsStateList[0])
                    }
                    self.$store.dispatch('todoLists/deletePreviewsStates')
                    if(next) {
                        next()
                    }
                }
            )
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