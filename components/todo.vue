<template>
	<div class="todo">
		<input class="todo__completed" type="checkbox" :checked="todo.completed">
		<input class="todo__text" readonly :value="todo.text">
	</div>
</template>

<script>
export default {
	props: {
		todo: {
			type: Object,
			required: false
		}
	}
}
</script>

<style lang="sass" scoped>
.todo
	width: 100%
	display: flex
	align-items: center
	margin-top: 20
	flex-direction: row-reverse
	border: 1px solid #dfdfdf
	padding: 20px
	& + &
		margin-top: -1px
	&__text
		font-size: 24px
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