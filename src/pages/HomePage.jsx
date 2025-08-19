import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, X } from 'lucide-react';
import TaskList from '../components/TaskList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import { COLORS } from '../lib/constants.jsx';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('neo-brutalism-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('neo-brutalism-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now() + Math.random(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setShowTaskForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-black border-4 border-black p-6 mb-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 transform -rotate-1">
              NEO BRUTAL
            </h1>
            <p className="text-xl md:text-2xl font-bold text-yellow-400 transform rotate-1">
              TODO DESTROYER
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-red-500 border-4 border-black p-4 text-center transform -rotate-1"
            >
              <div className="text-2xl md:text-3xl font-black text-white">{stats.total}</div>
              <div className="text-sm font-bold text-black">TOTAL</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="bg-yellow-400 border-4 border-black p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-black">{stats.active}</div>
              <div className="text-sm font-bold text-black">ACTIVE</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-green-500 border-4 border-black p-4 text-center transform rotate-1"
            >
              <div className="text-2xl md:text-3xl font-black text-white">{stats.completed}</div>
              <div className="text-sm font-bold text-black">DONE</div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-black py-3 px-6 border-4 border-black transform hover:rotate-1 transition-all duration-200 flex items-center gap-2"
            >
              {showTaskForm ? <X size={20} /> : <Plus size={20} />}
              {showTaskForm ? 'CANCEL' : 'ADD TASK'}
            </motion.button>

            {stats.completed > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCompletedTasks}
                className="bg-red-500 hover:bg-red-600 text-white font-black py-3 px-6 border-4 border-black transform hover:-rotate-1 transition-all duration-200 flex items-center gap-2"
              >
                <Trash2 size={20} />
                CLEAR DONE
              </motion.button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {['all', 'active', 'completed'].map((filterType) => (
              <motion.button
                key={filterType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterType)}
                className={`font-black py-2 px-4 border-4 border-black whitespace-nowrap ${
                  filter === filterType
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                {filterType.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </motion.header>

        {/* Task Form */}
        <AnimatePresence>
          {showTaskForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <TaskForm 
                onSubmit={addTask}
                onCancel={() => setShowTaskForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <main>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-200 border-4 border-black p-8 transform rotate-1">
                <h2 className="text-2xl font-black text-black mb-2">
                  {filter === 'all' 
                    ? 'NO TASKS YET!' 
                    : filter === 'active' 
                    ? 'NO ACTIVE TASKS!' 
                    : 'NO COMPLETED TASKS!'
                  }
                </h2>
                <p className="text-lg font-bold text-gray-600">
                  {filter === 'all' && 'Add your first task to get started'}
                  {filter === 'active' && 'All tasks are completed! 🎉'}
                  {filter === 'completed' && 'Complete some tasks to see them here'}
                </p>
              </div>
            </motion.div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
              onUpdateTask={updateTask}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;