import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  items: [],
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
      }

  }
})
export const {setIsAddingTodo, addTodo, setFiler, toggleTodo, deleteTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer
