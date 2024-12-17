import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskForm } from "./TaskForm";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskCard = ({
  task,
  onDelete,
  onUpdate,
  onToggleComplete,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (title: string, description: string) => {
    onUpdate(task.id, title, description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-6 transition-all bg-white border rounded-lg shadow-lg hover:shadow-xl"
      >
        <TaskForm
          onSubmit={handleUpdate}
          initialTitle={task.title}
          initialDescription={task.description}
          isEditing
        />
        <Button
          variant="outline"
          onClick={() => setIsEditing(false)}
          className="w-full mt-2"
        >
          Cancel
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-6 transition-all bg-white border rounded-lg shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="w-5 h-5"
        />
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
      </div>
      <p className="mb-4 text-gray-600">{task.description}</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(task.id)}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
};