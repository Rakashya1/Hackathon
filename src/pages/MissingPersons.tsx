import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MissingPersonsGrid from "@/components/dashboard/MissingPersonsGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Search, Filter, AlertTriangle } from "lucide-react";

const MissingPersonsPage = () => {
  const [missingPersons, setMissingPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchMissingPersons = async () => {
      try {
        const { data, error } = await supabase
          .from("missing_persons")
          .select("*");

        if (error) throw error;
        setMissingPersons(data || []);
      } catch (err) {
        console.error("Error fetching missing persons:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingPersons();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Missing Persons</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Browse through our database of missing individuals. If you have
              any information, please report a sighting.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-2/3 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name, location, or description"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="status">Filter by Status</Label>
              <Select
                defaultValue="all"
                onValueChange={(value) => setFilterStatus(value)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active Cases</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Error Loading Data
              </h3>
              <p className="text-slate-600">{error}</p>
              <Button variant="outline" className="mt-4">
                Retry
              </Button>
            </div>
          ) : (
            <>
              <MissingPersonsGrid missingPersons={missingPersons} />

              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">
                  Do you know someone who is missing?
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/report">Report a Missing Person</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissingPersonsPage;
