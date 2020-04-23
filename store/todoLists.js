// States
export const state = () => ({
	lists: [],
	id: 0,
	previewsStateList: [],
	currentList: null
})
// mutations
export const mutations = {
	SET_LIST(state, list) {
		state.id++
		list.id = state.id
		list.safed = true

		state.lists.unshift(list)
	},
	ADD_TODO_IN_LIST(state, todo) {
		let list = state.currentList 

		state.id++
		todo.id = state.id

		state.previewsStateList.push(JSON.stringify(list))

		list.safed = false
		list.todos.unshift(todo)
	},
	CHANGE_LIST_TEXT(state, text) {
		let list = state.currentList

		state.previewsStateList.push(JSON.stringify(list))

		list.safed = false
		list.headline = text
	},
	CHANGE_TODO_COMPLETED(state, idTodo) {
		let list = state.currentList,
			todo = list.todos.find(item => item.id === idTodo)

		list.safed = false
		todo.completed = !todo.completed
	},
	CHANGE_TODO_TEXT(state, [idTodo, text]) {
		let list = state.currentList,
			todo = list.todos.find(item => item.id === idTodo)
		
		state.previewsStateList.push(JSON.stringify(list))

		list.safed = false
		todo.text = text
	},
	DELETE_TODO_LIST(state, id) {
		state.lists = state.lists.filter(item => item.id !== id)
	},
	CHANGE_TODO_LIST(state, newList) {
		let addedList = JSON.parse(newList)
		let oldList = state.currentList
		
		for(let key in oldList) {
			oldList[key] = addedList[key]
		}
	},
	DELETE_PREVIEWS_STATES(state) {
		state.previewsStateList = []
	},
	SET_CURRENT_LIST(state, id) {
		state.currentList = state.lists.find(item => item.id === id)
	},
	SAFE_CURRENT_LIST(state) {
		state.currentList.safed = true
	}
}

// actions
export const actions = {
	setList({ commit }, list) {
		commit('SET_LIST', list)
	},
	addTodoInList({ commit }, todo) {
		commit('ADD_TODO_IN_LIST', todo)
	},
	deleteTodoList({ commit }, id) {
		commit('DELETE_TODO_LIST', id)
	},
	changeTodoList({ commit }, newList) {
		commit('CHANGE_TODO_LIST', newList)
	},
	deletePreviewsStates({commit}) {
		commit('DELETE_PREVIEWS_STATES')
	},
	changeTodoCompleted({commit}, idTodo) {
		commit('CHANGE_TODO_COMPLETED', idTodo)
	},
	changeTodoText({commit}, idTodo, text) {
		commit('CHANGE_TODO_TEXT', idTodo, text)
	},
	setCurrentList({commit}, id) {
		commit('SET_CURRENT_LIST', id)
	},
	changeListText({commit}, text) {
		commit('CHANGE_LIST_TEXT', text)
	},
	safeCurrentList({commit}) {
		commit('SAFE_CURRENT_LIST')
	}
}

// Getters
export const getters = {
	getLists: (state) => state.lists,
	getPreviewsStateList: (state) => state.previewsStateList,
	getCurrentList: (state) => state.currentList
}