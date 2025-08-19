import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'
import { TASK_STATUSES } from '../lib/constants'

const TaskList = ({ tasks = [], onToggleComplete, onDeleteTask, onEditTask }) => {
  const groupedTasks = {
    [TASK_STATUSES.TODO]: tasks.filter(task => task.status === TASK_STATUSES.TODO),
    [TASK_STATUSES.IN_PROGRESS]: tasks.filter(task => task.status === TASK_STATUSES.IN_PROGRESS),
    [TASK_STATUSES.COMPLETED]: tasks.filter(task => task.status === TASK_STATUSES.COMPLETED)
  }

  const getColumnTitle = (status) => {
    switch (status) {
      case TASK_STATUSES.TODO:
        return 'TO DO'
      case TASK_STATUSES.IN_PROGRESS:
        return 'IN PROGRESS'
      case TASK_STATUSES.COMPLETED:
        return 'COMPLETED'
      default:
        return status
    }
  }

  const getColumnColor = (status) => {
    switch (status) {
      case TASK_STATUSES.TODO:
        return 'bg-red-400'
      case TASK_STATUSES.IN_PROGRESS:
        return 'bg-yellow-400'
      case TASK_STATUSES.COMPLETED:
        return 'bg-green-400'
      default:
        return 'bg-gray-400'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const columnVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  if (tasks.length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <div className="text-8xl mb-4">📝</div>
          <h3 className="text-2xl font-black mb-2 text-black">NO TASKS YET</h3>
          <p className="text-gray-600 font-bold">CREATE YOUR FIRST TASK TO GET STARTED!</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <motion.div 
          key={status}
          className="space-y-4"
          variants={columnVariants}
        >
          {/* Column Header */}
          <div className="sticky top-0 z-10">
            <div className={`${getColumnColor(status)} border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <h3 className="text-lg font-black text-black text-center">
                {getColumnTitle(status)} ({statusTasks.length})
              </h3>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-4 min-h-[200px]">
            <AnimatePresence mode="popLayout">
              {statusTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State for Column */}
            {statusTasks.length === 0 && (
              <motion.div 
                className="border-4 border-dashed border-gray-300 p-8 text-center bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-500 font-bold text-sm">
                  {status === TASK_STATUSES.TODO && "NO TASKS TO DO"}
                  {status === TASK_STATUSES.IN_PROGRESS && "NO TASKS IN PROGRESS"}
                  {status === TASK_STATUSES.COMPLETED && "NO COMPLETED TASKS"}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TaskList