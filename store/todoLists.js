// States
export const state = () => ({
	lists: [],
	id: 0,
	previewsStateList: []
})
// mutations
export const mutations = {
	SET_LIST(state, list) {
		state.id++
		list.id = state.id
		state.lists.unshift(list)
	},
	ADD_TODO_IN_LIST(state, [id, todo]) {
		let list = state.lists.find(item => item.id === id) 
		state.previewsStateList.push(JSON.stringify(list))
		list.todos.unshift(todo)
	},
	DELETE_TODO_LIST(state, id) {
		state.lists = state.lists.filter(item => item.id !== id)
	},
	CHANGE_TODO_LIST(state, newList) {
		let addedList = JSON.parse(newList)
		let oldList = state.lists.find(item => item.id === addedList.id)
		
		for(let key in oldList) {
			oldList[key] = addedList[key]
		}
	},
	DELETE_PREVIEWS_STATES(state) {
		state.previewsStateList = []
	}
}

// actions
export const actions = {
	setList({ commit }, list) {
		commit('SET_LIST', list)
	},
	addTodoInList({ commit }, id, todo) {
		commit('ADD_TODO_IN_LIST', id, todo)
	},
	deleteTodoList({ commit }, id) {
		commit('DELETE_TODO_LIST', id)
	},
	changeTodoList({ commit }, newList) {
		commit('CHANGE_TODO_LIST', newList)
	},
	deletePreviewsStates({commit}) {
		commit('DELETE_PREVIEWS_STATES')
	}
}

// Getters
export const getters = {
	getLists: (state) => state.lists,
	getpreviewsStateList: (state) => state.previewsStateList
}