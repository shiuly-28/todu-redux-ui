import React from 'react'
import {CheckCircle, Clock, List} from 'lucide-react';

export const TodoFilter = () => {
  const filters = [
    {key: 'all', label: 'All', icon: List },
    {key: 'active', label: 'Active', icon: Clock },
    {key: 'completed', label: 'Completed', icon: CheckCircle  },
  ]
  return (
    <div className='flex items-center justify-center'>
      <div className='inline-flex bg-gray-200 rounded-lg p-1'>
        {
          filters.map(({key, label, icon: Icon }) => (
            <button key={key}>
              <Icon size={16}/>
              <span>{label}</span>
            </button>
          ))


        }
      </div>
    </div>
  )
}
