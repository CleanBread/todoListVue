<template>
    <div class="change">
        <todo-list v-if="currentList" @safe-list="safeList" :data="currentList"></todo-list>
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
            currentList: null
        }
    },
    computed: {
        getTodoLists() {
            return this.$store.getters['todoLists/getLists']
        }
    },
    mounted() {
        setTimeout(() => {
            this.currentList = this.getTodoLists.find(item => item.id === +this.$route.params.change)
        }, 0)
    },
    methods: {
        safeList(list) {
            // console.log(list)
            this.$store.dispatch('todoLists/safeTodoList', list)
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