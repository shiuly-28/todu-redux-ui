import {Calendar, Edit3, Trash2, Check} from 'lucide-react';
import {useDispatch} from "react-redux";
import {toggleTodo, updateTodo} from "../store/todoSlice.js";
import {useState} from "react";
import {TodoForm} from "./todoForm.jsx";


export const TodoItem = ({filterTodo, index}) => {
    const dispatch = useDispatch();
    const [isDeleting , setIsDeleting] = useState(false);
    const [isEditing , setIsEditing] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-Us',{
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }
    const  handleToggle = () => {
        dispatch(toggleTodo(filterTodo.id))
    }
    const  handleDelete = () => {
        setIsDeleting(true)
        setTimeout(() => {
            dispatch(toggleTodo(filterTodo.id))
        }, 400)
    }

    const handleUpdate = (text) => {
        dispatch(updateTodo({
            id: filterTodo.id,
            updates: {
                text: text.trim()
            }
            }))
        setIsEditing(false)
    }

    if(isEditing){
        return (
            <div className="p-4 bg-gray-100">
                <TodoForm
                initialValue={filterTodo.text}
                Onsubmit={handleUpdate}
                Oncancel={() => setIsEditing(false)}
                placeholder='Updated your todo'
                ></TodoForm>
            </div>
        )
    }

  return (
      <div className={`group p-4 hover:bg-gray-100 transition-all duration-200 ${isDeleting ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
      ${filterTodo.completed ? 'opacity-75' : ""}`} style={{
          animationDelay: `${index * 50}ms,`,
          animation:'slideInUp 0.3s case-out forwards'
      }}>
          <div className="flex items-start gap-3">
              <button onClick={handleToggle} className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 
              ${filterTodo.completed ? 'bg-green-500 border-green-500 text-black hover:bg-green-600' : 'border-gray-400 hover:border-green-500 hover:bg-green-50'}`}>
                  {filterTodo.completed && <Check size={14}/>}
              </button>
              <div className="flex-1 min-w-0">
                  <div className="text-gray-800 leading-relaxed">{filterTodo.text}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>Created At: {formatDate(filterTodo.createdAt)}</span>
                      </div>
                      <span>Updated At: {formatDate(filterTodo.updatedAt)}</span>
                  </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button onClick={() => setIsDeleting(true)} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200">
                      <Edit3 size={16} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-lg transition-all duration-200">
                      <Trash2 onClick={handleDelete} size={16} />
                  </button>
              </div>
          </div>
      </div>
  )
}
