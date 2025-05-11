import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Alert from "@/components/Alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    groupe: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes for the form fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (
      !formData.name ||
      !formData.role ||
      !formData.email ||
      !formData.groupe ||
      !formData.password
    ) {
      setError("Please add all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create Role");
      }

      setSuccess("User created successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
        groupe: "",
        password: "",
      });
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-400 cursor-pointer hover:bg-green-300"
        >
          Add New User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>User info</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Username
              </Label>
              <Input
                id="name"
                value={formData.username}
                name="name"
                placeholder="name"
                onChange={handleChange}
                autoComplete="off"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                name="email"
                placeholder="user@gmail.com"
                onChange={handleChange}
                autoComplete="off"
                className="col-span-3"
              />
            </div>

            {/* select menu */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="MANAGER">MANAGER</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* end of select */}

            {/* group */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, groupe: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Group</SelectLabel>
                    <SelectItem value="SIR">SIR</SelectItem>
                    <SelectItem value="QOD">QOD</SelectItem>
                    <SelectItem value="Couverture">Couverture</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                value={formData.password}
                name="password"
                placeholder="password"
                onChange={handleChange}
                autoComplete="off"
                className="col-span-3"
              />
            </div>
          </div>

          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
            {loading ? <Spinner /> : "Add User"}
          </Button>
        </form>
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
      </DialogContent>
    </Dialog>
  );
}
