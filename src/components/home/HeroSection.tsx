import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, UserPlus, MapPin } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

const HeroSection = ({
  title = "Help Find Missing Loved Ones with AI Technology",
  description = "Our platform leverages advanced facial recognition and geolocation technology to help reunite families with missing individuals. Join our community effort to make a difference.",
  primaryCta = "Report Missing Person",
  secondaryCta = "Report a Sighting",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full bg-slate-900 text-white py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/50 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                asChild
              >
                <Link to="/report">
                  <UserPlus size={20} />
                  {primaryCta}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:text-white gap-2"
                asChild
              >
                <Link to="/sightings">
                  <MapPin size={20} />
                  {secondaryCta}
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                AI-Powered
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Search size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Quick Search</h3>
                  <p className="text-slate-300">
                    Find missing persons in our database
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=person1"
                    alt="Missing person placeholder"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=person2"
                    alt="Missing person placeholder"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=person3"
                    alt="Missing person placeholder"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=person4"
                    alt="Missing person placeholder"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-white text-slate-900 hover:bg-slate-100 gap-2 justify-center"
                asChild
              >
                <Link to="/map">
                  View All Missing Persons
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
