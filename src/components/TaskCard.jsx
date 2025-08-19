import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import { Trash2, Edit3 } from 'lucide-react'
import { COLORS } from '../lib/constants.jsx'

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => {
    if (typeof onToggle === 'function') {
      onToggle(task.id)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (typeof onDelete === 'function') {
      onDelete(task.id)
    }
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    if (typeof onEdit === 'function') {
      onEdit(task)
    }
  }

  const getRandomColor = () => {
    const colorKeys = Object.keys(COLORS)
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
    return COLORS[randomKey]
  }

  const cardColor = getRandomColor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, rotate: 0.5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card 
        className={`
          border-4 border-black shadow-brutal hover:shadow-brutal-lg 
          transition-all duration-200 cursor-pointer
          ${task.completed ? 'opacity-70' : ''}
        `}
        style={{ backgroundColor: cardColor }}
        onClick={handleToggle}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Checkbox
                checked={task.completed}
                onChange={handleToggle}
                className="mt-1 flex-shrink-0 border-2 border-black data-[state=checked]:bg-black"
              />
              <div className="flex-1 min-w-0">
                <h3 
                  className={`
                    font-bold text-lg leading-tight break-words
                    ${task.completed ? 'line-through text-gray-600' : 'text-black'}
                  `}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p 
                    className={`
                      mt-2 text-sm leading-relaxed break-words
                      ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}
                    `}
                  >
                    {task.description}
                  </p>
                )}
                {task.dueDate && (
                  <div className="mt-2">
                    <span 
                      className={`
                        inline-block px-2 py-1 text-xs font-bold 
                        bg-white border-2 border-black shadow-brutal-sm
                        ${task.completed ? 'opacity-60' : ''}
                      `}
                    >
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className="p-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all duration-200"
                aria-label="Edit task"
              >
                <Edit3 size={16} className="text-black" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="p-2 bg-red-400 border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all duration-200"
                aria-label="Delete task"
              >
                <Trash2 size={16} className="text-black" />
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TaskCard