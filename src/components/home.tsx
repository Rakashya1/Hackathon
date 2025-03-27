import React from "react";
import HeroSection from "./home/HeroSection";
import FeatureHighlights from "./home/FeatureHighlights";
import MissingPersonsGrid from "./dashboard/MissingPersonsGrid";
import QuickActionPanel from "./dashboard/QuickActionPanel";
import DatabaseConnectionTest from "./common/DatabaseConnectionTest";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const Home = () => {
  const navigate = useNavigate();

  // Handler functions for navigation and actions
  const handleReportMissingPerson = () => {
    // In a real app, this would navigate to a form page
    console.log("Navigate to report missing person form");
    // navigate('/report-missing');
  };

  const handleReportSighting = () => {
    // In a real app, this would navigate to a sighting report form
    console.log("Navigate to report sighting form");
    // navigate('/report-sighting');
  };

  const handleViewMap = () => {
    // In a real app, this would navigate to the interactive map
    console.log("Navigate to interactive map");
    // navigate('/map');
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to the person details page
    console.log(`Navigate to details for person ${id}`);
    // navigate(`/person/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection
        title="Help Find Missing Loved Ones with AI Technology"
        description="Our platform leverages advanced facial recognition and geolocation technology to help reunite families with missing individuals. Join our community effort to make a difference."
        primaryCta="Report Missing Person"
        secondaryCta="Report a Sighting"
      />

      {/* Feature Highlights */}
      <FeatureHighlights
        title="Powerful Features"
        subtitle="Our platform combines cutting-edge technology with user-friendly interfaces to help locate missing persons."
      />

      {/* Quick Action Panel */}
      <section className="py-10 px-4 bg-white">
        <div className="container mx-auto">
          <QuickActionPanel
            onReportMissingPerson={handleReportMissingPerson}
            onReportSighting={handleReportSighting}
            onViewMap={handleViewMap}
          />
        </div>
      </section>

      {/* Missing Persons Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <MissingPersonsGrid
            onViewDetails={handleViewDetails}
            onReportSighting={handleReportSighting}
          />
        </div>
      </section>

      {/* Database Connection Test */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <DatabaseConnectionTest />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
