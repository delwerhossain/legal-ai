"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      className="fixed top-4 right-4 text-white hover:bg-white/10"
      onClick={toggleLanguage}
    >
      {language === 'en' ? 'বাংলা' : 'English'}
    </Button>
  );
}