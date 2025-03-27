import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, AlertCircle, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MissingPersonCardProps {
  id?: string;
  name?: string;
  age?: number;
  lastSeen?: string;
  lastSeenDate?: string;
  description?: string;
  imageUrl?: string;
  status?: "active" | "found" | "resolved";
  matchConfidence?: number;
  onViewDetails?: (id: string) => void;
  onReportSighting?: (id: string) => void;
}

const MissingPersonCard = ({
  id = "mp-123",
  name = "Jane Doe",
  age = 24,
  lastSeen = "Central Park, New York",
  lastSeenDate = "2023-09-15",
  description = "Last seen wearing a blue jacket and jeans. Has a small scar on left cheek.",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  status = "active",
  matchConfidence = 0,
  onViewDetails = () => {},
  onReportSighting = () => {},
}: MissingPersonCardProps) => {
  const formattedDate = new Date(lastSeenDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getStatusColor = () => {
    switch (status) {
      case "found":
        return "bg-green-100 text-green-800";
      case "resolved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "found":
        return "Found";
      case "resolved":
        return "Case Resolved";
      default:
        return "Missing";
    }
  };

  const getConfidenceBadge = () => {
    if (matchConfidence === 0) return null;

    let color = "";
    if (matchConfidence > 80) color = "bg-green-100 text-green-800";
    else if (matchConfidence > 50) color = "bg-yellow-100 text-yellow-800";
    else color = "bg-gray-100 text-gray-800";

    return (
      <Badge variant="outline" className={`ml-2 ${color}`}>
        {matchConfidence}% Match
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden h-full flex flex-col bg-white">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <Badge className={getStatusColor()}>{getStatusText()}</Badge>
          {getConfidenceBadge()}
        </div>
        <div className="h-64 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={`${name}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-500">Age: {age}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">{lastSeen}</p>
          </div>
          <div className="flex items-start">
            <Calendar className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">Last seen: {formattedDate}</p>
          </div>
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails(id)}
        >
          View Details
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => onReportSighting(id)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Report Sighting
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report if you've seen this person</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default MissingPersonCard;
