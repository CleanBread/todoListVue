<template>
	<div class="todo">
		<input class="todo__completed" type="checkbox" @change="changeCompleted($event)" :disabled="this.$route.path === '/'" :checked="todo.completed">
		<input class="todo__text" @change="changeText" :readonly="this.$route.path === '/'" :value="todo.text">
	</div>
</template>

<script>
export default {
	props: {
		todo: {
			type: Object,
			required: false
		}
	},
	methods: {
		changeCompleted() {
			this.$emit('change-comp', this.todo.id)
		},
		changeText(e) {
			this.$emit('change-todo-text', this.todo.id, e.target.value)
		}
	}
}
</script>

<style lang="sass" scoped>
.todo
	display: flex
	align-items: center
	margin-top: 20px
	flex-direction: row-reverse
	border: 1px solid #dfdfdf
	padding-right: 20px
	& + &
		margin-top: -1px
	&__text
		font-size: 24px
		padding: 20px
		border: none
		margin-right: 30px
		width: 100%
		&:read-only
			cursor: default
		&:focus
			outline: none
	&__completed:checked + &__text
		text-decoration: line-through
</style>