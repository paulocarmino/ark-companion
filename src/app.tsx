import { CompanionProvider } from "@/context/companion-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/app-layout";

export default function App() {
  return (
    <CompanionProvider>
      <TooltipProvider>
        <AppLayout />
      </TooltipProvider>
    </CompanionProvider>
  );
}
