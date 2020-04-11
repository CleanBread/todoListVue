<template>
	<div class="t-list">
		<div class="t-list__head">
			<input class="t-list__headline" :readonly="isMainPage" :value="data.headline" ref="headline">
			<div class="t-list__controls">
				<nuxt-link v-if="isMainPage" :to="`change/${data.id}`" class="t-list__button button">Изменить</nuxt-link>
				<button class="t-list__button button button_delete" v-if="isMainPage" @click="deleteTodoList">Удалить</button>
				<button class="t-list__button button button_safe" v-if="!isMainPage" @click="safeTodoList">Сохранить</button>
			</div>
		</div>
		<div class="t-list__add" v-if="!isMainPage">
			<add-item :settings="addTodoSettings" @add-todo="addTodo"></add-item>
		</div>
		<div class="t-list__box">
			<todo-item v-for="(todo, i) in data.todos" :key="i" :todo="todo"></todo-item>
		</div>
	</div>
</template>

<script>
import todoItem from '~/components/todo'
import addItem from '~/components/addItem'
export default {
	props: {
		data: {
			type: Object,
			required: false
		}
	},
	components: {
		todoItem, addItem
	},
	data() {
		return {
			isMainPage: this.$route.path === '/',
			addTodoSettings: {
				placeholder: 'Добавить задачу',
				action: 'add-todo'
			},
			todos: []
		}
	},
	methods: {
		addTodo(textTodo) {
			const newTodo = {
				text: textTodo,
				completed: false
			}
			
			this.$store.dispatch('todoLists/addTodoInList', [this.data.id, newTodo])
			// this.todos.unshift(newTodo)
			// console.log(newTodo)
		},
		deleteTodoList() {
			this.$store.dispatch('todoLists/deleteTodoList', this.data.id)
		},
		safeTodoList() {
			const newList = {
				id: this.data.id,
				headline: this.$refs.headline.value,
				todos: this.data.todos
			}
			this.$emit('safe-list', newList)
		}
	}
}
</script>

<style lang="sass" scoped>
.t-list
	& + &
		margin-top: 50px
	&__headline
		font-size: 36px
		border: 0
		width: 100%
		&:focus
			outline: none
		&:read-only
			cursor: default
	&__head
		display: flex
		justify-content: space-between
		border-bottom: 2px solid #dfdfdf
		padding: 20px 0
	&__controls
		margin-left: 50px
		display: flex
	&__button
		cursor: pointer
		& + &
			margin-left: 10px
	&__add
		margin: 20px 0
</style>