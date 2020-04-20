<template>
	<div class="t-list">
		<div class="t-list__head">
			<input class="t-list__headline" :readonly="isMainPage" :value="data.headline">
			<div class="t-list__controls">
				<nuxt-link v-if="isMainPage" :to="`change/${data.id}`" class="t-list__button button">Изменить</nuxt-link>
				<button class="t-list__button button button_delete" v-if="isMainPage" @click="deleteTodoList">Удалить</button>
				<button class="t-list__button button" v-if="!isMainPage && safed && previewState.length" @click="goPreviewsState">go back</button>
				<button class="t-list__button button button_safe" v-if="!isMainPage && !safed" @click="safeTodoList">Сохранить</button>
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
		},
		safed: {
			type: Boolean,
			required: false
		},
		previewState: {
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
			}
		}
	},
	methods: {
		addTodo(textTodo) {
			this.$emit('add-todo', textTodo)
		},
		deleteTodoList() {
			this.$store.dispatch('todoLists/deleteTodoList', this.data.id)
		},
		safeTodoList() {
			this.$emit('safe-list')
		},
		goPreviewsState() {
			this.$$emit('go-back')
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