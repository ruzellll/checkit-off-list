import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskGrid } from "@/components/TaskGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">("all");

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

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
        <div className="flex justify-end mb-6">
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as typeof filter)}>
            <TabsList className="[&>*]:data-[state=active]:shadow-none [&>*]:data-[state=active]:transition-none">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="uncompleted">Uncompleted</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <TaskGrid
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default Index;