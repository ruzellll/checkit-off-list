import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  pinned: boolean;
}

interface PinnedTasksSectionProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onToggleComplete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const PinnedTasksSection = ({
  tasks,
  onDelete,
  onUpdate,
  onToggleComplete,
  onTogglePin,
}: PinnedTasksSectionProps) => {
  const pinnedTasks = tasks.filter((task) => task.pinned);

  if (pinnedTasks.length === 0) {
    return (
      <div className="p-6 text-center bg-white border rounded-lg">
        <p className="text-gray-500">No pinned tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pinnedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onToggleComplete={onToggleComplete}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
};