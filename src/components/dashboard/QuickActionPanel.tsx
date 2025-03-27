import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, UserSearch, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionPanelProps {
  onReportMissingPerson?: () => void;
  onReportSighting?: () => void;
  onViewMap?: () => void;
}

const QuickActionPanel = ({
  onReportMissingPerson = () => {},
  onReportSighting = () => {},
  onViewMap = () => {},
}: QuickActionPanelProps) => {
  return (
    <div className="w-full bg-slate-50 p-8 rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <Button
              onClick={onReportMissingPerson}
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
              size="lg"
              asChild
            >
              <Link to="/report">
                <UserSearch className="h-6 w-6" />
                <span>Report Missing Person</span>
              </Link>
            </Button>
            <p className="mt-3 text-sm text-gray-600 text-center">
              Submit details about a missing individual
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Button
              onClick={onReportSighting}
              className="w-full h-16 text-lg bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-3"
              size="lg"
              asChild
            >
              <Link to="/sightings">
                <AlertTriangle className="h-6 w-6" />
                <span>Report Sighting</span>
              </Link>
            </Button>
            <p className="mt-3 text-sm text-gray-600 text-center">
              Report a potential sighting with photo evidence
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Button
              onClick={onViewMap}
              className="w-full h-16 text-lg bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
              size="lg"
              asChild
            >
              <Link to="/map">
                <MapPin className="h-6 w-6" />
                <span>View Interactive Map</span>
              </Link>
            </Button>
            <p className="mt-3 text-sm text-gray-600 text-center">
              Explore reported sightings on our interactive map
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;
