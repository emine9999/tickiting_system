import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Alert from "@/components/Alert";

type Title = {
  title: string;
  icon: React.ReactNode;
  groupename?: string;
};

export default function PopoverDemo({ title, icon, groupename }: Title) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupename) {
      setError("Group name is required to delete the group.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/group", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupename }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete group");
      }

      const data = await res.json();
      setSuccess(data.message || "Group deleted successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-none shadow-none cursor-pointer"
          aria-label={`Open ${title} popover`}
        >
          {icon}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0 shadow-none border-none">
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : title}
          </Button>
          {success && <Alert type="success" message={success} />}
          {error && <Alert type="error" message={error} />}
        </form>
      </PopoverContent>
    </Popover>
  );
}
