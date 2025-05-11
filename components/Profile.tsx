"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
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

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to Update your Profile");
      }

      setSuccess("Profile updated successfully!");
      setFormData({
        name: "",
        email: "",
        image :"",
        password: "",
      });

      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto w-full px-4 md:p-6 md:py-13 lg:pb-15 ">
      <div className="w-full max-w-3xl mx-auto">
        <Card className="border-gray-50 dark:border-slate-700 shadow-sm">
          <CardHeader className="border-b border-gray-50 dark:border-slate-700 pb-4">
            <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
              Edit your Profile
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Update your personal information and credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-3">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="username"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="name"
                      placeholder="Your Username"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="profilePicture"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Profile Picture
                  </Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="border-gray-100 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
              </div>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700 mt-5">
            {loading ? <Spinner /> : "Edit profile"}
          </Button>
            </form>
     
          </CardContent>

        
     
         
          {error && <Alert type="error" message={error} duration={1000} />}
          {success && <Alert type="success" message={success} duration={1000} />}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
