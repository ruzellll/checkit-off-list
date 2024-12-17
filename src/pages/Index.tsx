import { useState, useEffect } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskGrid } from "@/components/TaskGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const API_URL = "http://localhost:8000/api";

const Index = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">("all");
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/tasks/`);
      return response.data;
    },
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id" | "completed">) => {
      const response = await axios.post(`${API_URL}/tasks/`, newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Task> & { id: string }) => {
      const response = await axios.put(`${API_URL}/tasks/${id}/`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/tasks/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleAddTask = (title: string, description: string) => {
    addTaskMutation.mutate({ title, description });
  };

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const handleUpdateTask = (id: string, title: string, description: string) => {
    updateTaskMutation.mutate({ id, title, description });
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) {
      updateTaskMutation.mutate({ id, completed: !task.completed });
    }
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 mb-8 bg-white border rounded-lg shadow-lg">
          <TaskForm onSubmit={handleAddTask} />
        </div>
        <div className="flex justify-end mb-6">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setFilter(value as typeof filter)}
          >
            <TabsList className="bg-[#CB9DF0] [&>*]:data-[state=active]:shadow-none [&>*]:data-[state=active]:transition-none">
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