import { motion, AnimatePresence } from "framer-motion";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskGridProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskGrid = ({
  tasks,
  onDelete,
  onUpdate,
  onToggleComplete,
}: TaskGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-fade-in">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onToggleComplete={onToggleComplete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};