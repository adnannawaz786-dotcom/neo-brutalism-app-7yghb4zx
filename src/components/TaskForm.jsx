import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COLORS } from '../lib/constants.jsx';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const TaskForm = ({ onAddTask, onClose, isOpen }) => {
  const [taskText, setTaskText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskText || typeof taskText !== 'string') return;
    
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    
    try {
      if (typeof onAddTask === 'function') {
        await onAddTask(trimmedText);
        setTaskText('');
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && typeof onClose === 'function') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && typeof onClose === 'function') {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
        style={{ backgroundColor: COLORS.background }}
      >
        <div 
          className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              ADD NEW TASK
            </h2>
            <Button
              onClick={() => {
                if (typeof onClose === 'function') {
                  onClose();
                }
              }}
              variant="ghost"
              size="sm"
              className="p-1 hover:bg-black hover:text-white transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                className="w-full border-4 border-black text-lg font-bold p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white"
                disabled={isSubmitting}
                autoFocus
                maxLength={200}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!taskText.trim() || isSubmitting}
                className="flex-1 font-black text-lg py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.success }}
              >
                <Plus size={20} className="mr-2" />
                {isSubmitting ? 'ADDING...' : 'ADD TASK'}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  if (typeof onClose === 'function') {
                    onClose();
                  }
                }}
                variant="outline"
                className="px-6 font-black text-lg py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide bg-white hover:bg-gray-100"
                disabled={isSubmitting}
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;