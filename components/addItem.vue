<template>
	<form @submit.prevent="submit" class="add">
		<input type="text" class="add__input" :placeholder="settings.placeholder" v-model="text">
	</form>
</template>

<script>
export default {
	props: {
		settings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			text: ''
		}
	},
	methods: {
		submit() {
			if(this.text.length > 0) {
				this.$emit(this.settings.action, this.text)
				this.text = ''
			} else {
				this.text = ''
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.add
	border: 1px solid #dfdfdf
	border-radius: 10px
	width: 100%
	overflow: hidden
	&__input
		padding: 10px
		font-size: 24px
		width: 100%
</style>