import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Shield, Award, Lightbulb, Zap } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Our Mission
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              We're dedicated to reuniting missing individuals with their loved
              ones through innovative technology and community support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join Our Cause
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Missing Person Finder was founded with a simple but powerful
                mission: to help reunite families with their missing loved ones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-slate-700 mb-4">
                  Our journey began in 2020 when our founder experienced
                  firsthand the challenges of searching for a missing family
                  member. The process was fragmented, outdated, and lacked the
                  technological innovation that could make a real difference.
                </p>
                <p className="text-slate-700 mb-4">
                  Recognizing the potential for AI and modern technology to
                  transform this space, we assembled a team of technologists,
                  former law enforcement professionals, and advocates for
                  missing persons to create a platform that would leverage
                  cutting-edge facial recognition, geolocation tracking, and
                  community engagement.
                </p>
                <p className="text-slate-700">
                  Today, we're proud to offer a comprehensive solution that has
                  already helped dozens of families reunite with their loved
                  ones, and we're just getting started.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                  alt="Our team working together"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                These core principles guide everything we do as we work to
                reunite families.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 mb-4 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                  <p className="text-slate-600">
                    We approach every case with empathy and understanding,
                    recognizing the emotional toll of having a missing loved
                    one.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 mb-4 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center text-purple-600">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                  <p className="text-slate-600">
                    We maintain the highest standards of data protection and
                    privacy, ensuring sensitive information is handled
                    responsibly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 mb-4 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center text-green-600">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-slate-600">
                    We believe in the power of collective action and foster a
                    supportive community dedicated to helping find missing
                    persons.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our platform combines advanced technology with human compassion
                to create a powerful tool for finding missing persons.
              </p>
            </div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="ai">AI Recognition</TabsTrigger>
                <TabsTrigger value="geo">Geolocation</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              <TabsContent value="ai" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                      <Zap className="mr-2 text-blue-600" size={24} />
                      AI-Powered Facial Recognition
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Our platform uses advanced facial recognition algorithms
                      to compare uploaded photos of missing persons against our
                      database of reported sightings.
                    </p>
                    <p className="text-slate-700 mb-4">
                      The system can identify potential matches even when
                      factors like aging, lighting, or partial views would make
                      human recognition difficult.
                    </p>
                    <p className="text-slate-700">
                      Each potential match is assigned a confidence score,
                      allowing resources to be prioritized effectively while
                      minimizing false positives.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&q=80"
                      alt="AI facial recognition technology"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="geo" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=800&q=80"
                      alt="Interactive map with location data"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                      <Lightbulb className="mr-2 text-blue-600" size={24} />
                      Interactive Geolocation Tracking
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Our interactive map visualizes all reported sightings,
                      creating patterns that might not be obvious when looking
                      at individual reports.
                    </p>
                    <p className="text-slate-700 mb-4">
                      Users can filter sightings by time, confidence level, and
                      location to focus their search efforts effectively.
                    </p>
                    <p className="text-slate-700">
                      The system automatically analyzes movement patterns and
                      can suggest likely areas for future sightings based on
                      historical data.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="community" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                      <Award className="mr-2 text-blue-600" size={24} />
                      Community Engagement
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Our platform harnesses the power of community by making it
                      easy for anyone to report sightings of missing persons.
                    </p>
                    <p className="text-slate-700 mb-4">
                      Real-time notifications alert users when a missing person
                      is reported in their area, increasing the chances of
                      timely sightings.
                    </p>
                    <p className="text-slate-700">
                      We work closely with local law enforcement, social
                      services, and community organizations to create a
                      comprehensive support network.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
                      alt="Community members working together"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're searching for a loved one or want to help others
              find theirs, there are many ways to get involved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Report a Missing Person
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Volunteer Your Time
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Make a Donation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
