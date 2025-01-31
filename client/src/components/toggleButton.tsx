import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

interface ToggleUserProps {
  setCurrentUser: (userType: string) => void;
}

export default function ToggleUser({ setCurrentUser }: ToggleUserProps) {
  const [alignment, setAlignment] = useState("candidate");

  useEffect(() => {
    setCurrentUser(alignment);
  }, [alignment, setCurrentUser]);

  return (
    <Tabs
      value={alignment}
      onValueChange={(value) => setAlignment(value)}
      className="w-full"
    >
      <TabsList className="flex w-full gap-2 py-8 rounded-lg bg-gray-100 dark:bg-gray-800">
        {/* Candidate Tab */}
        <TabsTrigger
          value="candidate"
          className="flex-1 m-1 py-2 regular-text font-medium transition-all duration-200 rounded-md shadow-sm focus:outline-none data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-500 hover:text-white dark:data-[state=active]:bg-blue-700 dark:hover:bg-blue-700"
        >
          Candidate
        </TabsTrigger>

        {/* Employer Tab */}
        <TabsTrigger
          value="employer"
          className="flex-1 m-1 py-2 regular-text font-medium transition-all duration-200 rounded-md shadow-sm focus:outline-none data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-500 hover:text-white dark:data-[state=active]:bg-blue-700 dark:hover:bg-blue-700"
        >
          Employer
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
