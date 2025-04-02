"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from '@/components/ui/switch';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center  bg-blue p-2">
      <Switch onClick={toggleTheme} checked={theme === "dark"} />
      {theme === "light" ? <Sun className="ml-2" /> : <Moon className="ml-2" />}
    </div>
  );
}
