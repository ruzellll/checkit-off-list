import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskGrid } from "@/components/TaskGrid";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: string, title: string, description: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Tasks</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>
        <div className="p-6 mb-8 bg-white border rounded-lg shadow-lg">
          <TaskForm onSubmit={handleAddTask} />
        </div>
        <TaskGrid
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default Index;