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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskCard
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleComplete={onToggleComplete}
          />
        </div>
      ))}
    </div>
  );
};