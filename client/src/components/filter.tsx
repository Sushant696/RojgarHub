import { Search, AlignJustify, Grid } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterProps {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  salaryRange: string;
  setSalaryRange: Dispatch<SetStateAction<string>>;
  jobType: string;
  setJobType: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

function Filter({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  salaryRange,
  setSalaryRange,
  jobType,
  setJobType,
  sortBy,
  setSortBy,
}: FilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search jobs..."
            className="pl-10 bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 nth-last-3:  w-full lg:w-auto">
          <div className="w-full sm:w-auto hidden sm:flex ">
            <Select value={salaryRange} onValueChange={setSalaryRange}>
              <SelectTrigger className="w-[140px] bg-slate-50">
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranges</SelectItem>
                <SelectItem value="17000-30000">17000-30000</SelectItem>
                <SelectItem value="31000-50000">31000-50000</SelectItem>
                <SelectItem value="51000-70000">51000-70000</SelectItem>
                <SelectItem value="71000-120000">71000-120000</SelectItem>
                <SelectItem value="120000">Above 120000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="w-[140px] bg-slate-50">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-slate-50">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Job</SelectItem>
              <SelectItem value="low_to_high">Salary Low to High</SelectItem>
              <SelectItem value="high_to_low">Salary High to Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-4">
            <button
              className={`p-2 hover:bg-blue-500 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-blue-400 text-white" : "text-gray-600"
              }`}
              onClick={() => setViewMode("list")}
            >
              <AlignJustify size={20} />
            </button>
            <button
              className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-blue-400 text-white" : "text-gray-600"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
