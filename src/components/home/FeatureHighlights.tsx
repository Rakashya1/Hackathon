import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Brain, MapPin, Bell } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({
  icon,
  title,
  description = "Feature description",
  link,
}: FeatureProps & { link?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300",
        link && "cursor-pointer",
      )}
    >
      {link ? (
        <Link to={link} className="flex flex-col items-center w-full">
          <div className="p-3 mb-4 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
          <p className="text-gray-600 text-center">{description}</p>
        </Link>
      ) : (
        <>
          <div className="p-3 mb-4 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
          <p className="text-gray-600 text-center">{description}</p>
        </>
      )}
    </div>
  );
};

interface FeatureHighlightsProps {
  features?: FeatureProps[];
  title?: string;
  subtitle?: string;
}

const FeatureHighlights = ({
  features = [
    {
      icon: <Brain size={24} />,
      title: "AI Facial Recognition",
      description:
        "Advanced facial recognition technology to help identify missing persons with high accuracy.",
      link: "/missing-persons",
    },
    {
      icon: <MapPin size={24} />,
      title: "Geolocation Tracking",
      description:
        "Interactive maps showing reported sightings and last known locations of missing individuals.",
      link: "/map",
    },
    {
      icon: <Bell size={24} />,
      title: "Real-Time Notifications",
      description:
        "Instant alerts for potential matches delivered via multiple channels.",
      link: "/login",
    },
  ],
  title = "Powerful Features",
  subtitle = "Our platform combines cutting-edge technology with user-friendly interfaces to help locate missing persons.",
}: FeatureHighlightsProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
