import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, AlertCircle } from "lucide-react";

interface MapMarkerInfoProps {
  type: "missing" | "sighting";
  title: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  confidence?: number;
  imageUrl?: string;
  onViewDetails?: () => void;
}

const MapMarkerInfo: React.FC<MapMarkerInfoProps> = ({
  type,
  title,
  date,
  time,
  location,
  description,
  confidence,
  imageUrl,
  onViewDetails,
}) => {
  const getConfidenceBadge = () => {
    if (!confidence) return null;

    let color = "";
    if (confidence > 80) color = "bg-green-100 text-green-800";
    else if (confidence > 50) color = "bg-yellow-100 text-yellow-800";
    else color = "bg-gray-100 text-gray-800";

    return (
      <Badge variant="outline" className={`ml-2 ${color}`}>
        {confidence}% Match
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden bg-white shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {type === "missing" ? (
            <Badge className="bg-red-100 text-red-800">Missing</Badge>
          ) : (
            <div className="flex">
              <Badge className="bg-blue-100 text-blue-800">Sighting</Badge>
              {getConfidenceBadge()}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {imageUrl && (
          <div className="mb-3 h-32 overflow-hidden rounded-md bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2">
          {location && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{location}</p>
            </div>
          )}

          {date && (
            <div className="flex items-start">
              <Calendar className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{date}</p>
            </div>
          )}

          {time && (
            <div className="flex items-start">
              <Clock className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{time}</p>
            </div>
          )}

          {description && (
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700 line-clamp-2">
                {description}
              </p>
            </div>
          )}
        </div>

        {onViewDetails && (
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MapMarkerInfo;
