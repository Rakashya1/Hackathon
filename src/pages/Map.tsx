import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Filter, Calendar, AlertTriangle } from "lucide-react";

const MapPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [missingPersons, setMissingPersons] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading map data
    const timer = setTimeout(() => {
      setMapLoaded(true);
      setLoading(false);
    }, 1500);

    // Fetch missing persons data
    const fetchData = async () => {
      try {
        const { data: missingData, error: missingError } = await supabase
          .from("missing_persons")
          .select("*");

        if (missingError) throw missingError;
        setMissingPersons(missingData || []);

        // In a real app, you would also fetch sightings
        // const { data: sightingsData, error: sightingsError } = await supabase
        //   .from("sightings")
        //   .select("*");
        // if (sightingsError) throw sightingsError;
        // setSightings(sightingsData || []);

        // For now, use placeholder data
        setSightings([
          {
            id: 1,
            location: "Downtown",
            timestamp: "2023-05-15T14:30:00",
            confidence: 0.85,
          },
          {
            id: 2,
            location: "Central Park",
            timestamp: "2023-05-16T09:15:00",
            confidence: 0.72,
          },
          {
            id: 3,
            location: "Main Street",
            timestamp: "2023-05-17T16:45:00",
            confidence: 0.91,
          },
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Map Controls Sidebar */}
            <div className="w-full md:w-80 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Map Controls</CardTitle>
                  <CardDescription>Filter and search the map</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="search"
                        type="text"
                        placeholder="Search by name or location"
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Filter By</Label>
                    <Tabs defaultValue="all" onValueChange={setActiveFilter}>
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="missing">Missing</TabsTrigger>
                        <TabsTrigger value="sightings">Sightings</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="timeframe" className="w-full">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Past Week</SelectItem>
                        <SelectItem value="month">Past Month</SelectItem>
                        <SelectItem value="year">Past Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confidence">Confidence Level</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="confidence" className="w-full">
                        <SelectValue placeholder="Select confidence level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="high">High (80%+)</SelectItem>
                        <SelectItem value="medium">Medium (50-80%)</SelectItem>
                        <SelectItem value="low">Low (Below 50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest sightings reported</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sightings.map((sighting) => (
                      <div
                        key={sighting.id}
                        className="flex items-start space-x-3 p-3 bg-slate-100 rounded-md"
                      >
                        <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{sighting.location}</p>
                          <div className="flex items-center text-sm text-slate-500 space-x-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {new Date(
                                sighting.timestamp,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-1 text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sighting.confidence > 0.8 ? "bg-green-100 text-green-800" : sighting.confidence > 0.6 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                            >
                              {Math.round(sighting.confidence * 100)}%
                              confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Display Area */}
            <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-slate-200 border-t-blue-600 rounded-full mb-4"></div>
                    <p className="text-slate-600">Loading map data...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-red-700 mb-2">
                      Error Loading Map
                    </h3>
                    <p className="text-slate-600">{error}</p>
                    <Button variant="outline" className="mt-4">
                      Retry
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {/* This would be replaced with an actual map component in a real implementation */}
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <div className="text-center max-w-md p-6">
                      <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Interactive Map
                      </h3>
                      <p className="text-slate-600 mb-4">
                        This is a placeholder for the interactive map. In a real
                        implementation, this would be integrated with a mapping
                        library like Google Maps, Mapbox, or Leaflet.
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex items-center justify-center p-2 bg-blue-100 rounded-md">
                          <MapPin className="h-5 w-5 text-blue-500" />
                          <span className="ml-1 text-sm font-medium">
                            Missing
                          </span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-green-100 rounded-md">
                          <MapPin className="h-5 w-5 text-green-500" />
                          <span className="ml-1 text-sm font-medium">
                            Sighted
                          </span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-yellow-100 rounded-md">
                          <MapPin className="h-5 w-5 text-yellow-500" />
                          <span className="ml-1 text-sm font-medium">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapPage;
