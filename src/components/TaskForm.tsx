import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
}

export const TaskForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  isEditing = false,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    onSubmit(title, description);
    if (!isEditing) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-center">
        TaskHub
      </h1>
      <div className="space-y-2">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Button
        type="submit"
        className="w-full transition-all transform hover:scale-[1.02]"
      >
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
};
