"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from '@/components/ui/switch';

type Check = boolean;
export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Utiliser onCheckedChange au lieu de onClick
  const toggleTheme = (checked :Check) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={theme === "dark"} 
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </div>
  );
}