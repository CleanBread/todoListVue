// States
export const state = () => ({
	lists: [],
	id: 0
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

		list.todos.unshift(todo)
	},
	DELETE_TODO_LIST(state, id) {
		state.lists = state.lists.filter(item => item.id !== id)
	},
	SAFE_TODO_LIST(state, newList) {
		let oldList = state.lists.find(item => item.id === newList.id)
		
		for(let key in oldList) {
			oldList[key] = newList[key]
		}
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
	safeTodoList({ commit }, newList) {
		commit('SAFE_TODO_LIST', newList)
	}
}

// Getters
export const getters = {
	getLists: (state) => state.lists
}