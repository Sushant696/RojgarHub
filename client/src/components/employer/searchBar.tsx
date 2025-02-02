import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBarSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Add search logic here (e.g., filtering data or calling an API)
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
      />
    </div>
  );
}
