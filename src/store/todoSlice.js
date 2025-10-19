import {createSlice} from '@reduxjs/toolkit';

const loadTodos = () =>{
    try {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    }
    catch {
       return []
    }
}
const saveTodos = (todo) =>{
    try {
        localStorage.setItem('todos', JSON.stringify(todo))
    }
    catch (error){
        console.error(error)
    }
}
const initialState = {
  items: loadTodos(),
  filter: 'all',
  isAddingTodo: false
}
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setIsAddingTodo: (state, action) => {
      state.isAddingTodo = action.payload
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()

      }
      state.items.unshift(newTodo)
      state.isAddingTodo = false
    },
      setFiler: (state, action) => {
        state.filter = action.payload
      },

      toggleTodo: (state, action) =>{
        const todo = state.items.find(filterTodo => filterTodo.id === action.payload)
          if(todo){
              todo.completed = !todo.completed
          }
      },
      deleteTodo: (state, action) => {
          state.items = state.items.filter(filterTodo => filterTodo.id !== action.payload)
      },
      updateTodo:(state, action) =>{
        const {id, updates} = action.payload
          const todo = state.items.find(filteTodo => filteTodo.id === id)
          if(todo){
              Object.assign(todo, updates, {
                  updatedAt: new Date().toISOString()
              })
          }
      },
      markAllComplete: state =>{
        const hasInComplete = state.items(filterTodo => !filterTodo.completed)
          state.items.forEach(filterTodo => {
              filterTodo.completed = hasInComplete
          })
          saveTodos(state.items)

      },
      clearItems: state => {
        state.items = state.items(filterTodo => !filterTodo.completed)
      }
  }

})
export const {setIsAddingTodo, addTodo, setFiler,
    toggleTodo, deleteTodo, updateTodo,
    markAllComplete
} = todoSlice.actions
export default todoSlice.reducer
