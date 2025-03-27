import React, { useState } from "react";
import MissingPersonCard from "./MissingPersonCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Filter, MapPin, Calendar } from "lucide-react";

interface MissingPerson {
  id: string;
  name: string;
  age: number;
  lastSeen: string;
  lastSeenDate: string;
  description: string;
  imageUrl: string;
  status: "active" | "found" | "resolved";
  matchConfidence?: number;
}

interface MissingPersonsGridProps {
  persons?: MissingPerson[];
  isLoading?: boolean;
  onViewDetails?: (id: string) => void;
  onReportSighting?: (id: string) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
}

const MissingPersonsGrid = ({
  persons = [
    {
      id: "mp-001",
      name: "Sarah Johnson",
      age: 19,
      lastSeen: "Downtown Seattle, WA",
      lastSeenDate: "2023-10-12",
      description:
        "Last seen wearing a red hoodie and black jeans. Has a butterfly tattoo on right wrist.",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      status: "active",
      matchConfidence: 0,
    },
    {
      id: "mp-002",
      name: "Michael Chen",
      age: 32,
      lastSeen: "Central Park, New York",
      lastSeenDate: "2023-09-28",
      description:
        "Last seen in business attire. Has a distinctive scar on left cheek.",
      imageUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
      status: "active",
      matchConfidence: 65,
    },
    {
      id: "mp-003",
      name: "Emma Rodriguez",
      age: 16,
      lastSeen: "Miami Beach, FL",
      lastSeenDate: "2023-10-05",
      description:
        "Last seen wearing school uniform. Has braces and long brown hair.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      status: "active",
      matchConfidence: 82,
    },
    {
      id: "mp-004",
      name: "David Wilson",
      age: 45,
      lastSeen: "Chicago Loop, IL",
      lastSeenDate: "2023-09-15",
      description: "Last seen wearing a gray coat. Has glasses and a beard.",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      status: "found",
      matchConfidence: 0,
    },
    {
      id: "mp-005",
      name: "Olivia Thompson",
      age: 28,
      lastSeen: "Golden Gate Park, San Francisco",
      lastSeenDate: "2023-10-01",
      description:
        "Last seen in running clothes. Has a small heart tattoo on ankle.",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      status: "active",
      matchConfidence: 45,
    },
    {
      id: "mp-006",
      name: "James Peterson",
      age: 52,
      lastSeen: "Pike Place Market, Seattle",
      lastSeenDate: "2023-09-20",
      description:
        "Last seen wearing a blue raincoat. Has a limp in right leg.",
      imageUrl:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80",
      status: "resolved",
      matchConfidence: 0,
    },
  ],
  isLoading = false,
  onViewDetails = (id) => console.log(`View details for ${id}`),
  onReportSighting = (id) => console.log(`Report sighting for ${id}`),
  onSearch = (query) => console.log(`Searching for: ${query}`),
  onFilter = (filters) => console.log("Applied filters:", filters),
}: MissingPersonsGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = () => {
    onFilter({
      status: activeTab !== "all" ? activeTab : null,
      location: locationFilter,
      date: dateFilter,
    });
  };

  const filteredPersons = persons.filter((person) => {
    // Filter by status tab
    if (activeTab !== "all" && person.status !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Additional filters would be applied here in a real implementation
    return true;
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Missing Persons</h2>
        <p className="text-gray-600">
          Browse recent missing person reports or search for specific
          individuals
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All locations</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All dates</SelectItem>
                <SelectItem value="last-week">Last 7 days</SelectItem>
                <SelectItem value="last-month">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleFilterChange}>Apply Filters</Button>
        </div>
      )}

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Missing</TabsTrigger>
          <TabsTrigger value="found">Found</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px] place-items-center">
          <div className="col-span-full text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2 text-gray-600">
              Loading missing persons data...
            </p>
          </div>
        </div>
      ) : filteredPersons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersons.map((person) => (
            <MissingPersonCard
              key={person.id}
              id={person.id}
              name={person.name}
              age={person.age}
              lastSeen={person.lastSeen}
              lastSeenDate={person.lastSeenDate}
              description={person.description}
              imageUrl={person.imageUrl}
              status={person.status}
              matchConfidence={person.matchConfidence}
              onViewDetails={onViewDetails}
              onReportSighting={onReportSighting}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-2">
            No missing persons found matching your criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
              setLocationFilter("");
              setDateFilter("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default MissingPersonsGrid;
