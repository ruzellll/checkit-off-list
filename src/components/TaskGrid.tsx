import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  pinned: boolean;
}

interface TaskGridProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onToggleComplete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const TaskGrid = ({
  tasks,
  onDelete,
  onUpdate,
  onToggleComplete,
  onTogglePin,
}: TaskGridProps) => {
  const unpinnedTasks = tasks.filter((task) => !task.pinned);

  return (
    <div className="grid grid-cols-1 gap-4">
      {unpinnedTasks.map((task) => (
        <div key={task.id}>
          <TaskCard
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleComplete={onToggleComplete}
            onTogglePin={onTogglePin}
          />
        </div>
      ))}
    </div>
  );
};