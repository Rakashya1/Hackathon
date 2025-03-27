import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  Upload,
  MapPin,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const SightingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states for sighting report
  const [sightingForm, setSightingForm] = useState({
    personName: "",
    sightingDate: "",
    sightingTime: "",
    location: "",
    description: "",
    contactInfo: "",
    photo: null as File | null,
    confidenceLevel: "medium",
  });

  const handleSightingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSightingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSightingForm((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleConfidenceLevelChange = (value: string) => {
    setSightingForm((prev) => ({ ...prev, confidenceLevel: value }));
  };

  const handleSubmitSighting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would upload the photo to storage and get a URL
      // const photoUrl = await uploadPhoto(sightingForm.photo);

      // Then insert the record into the database
      const { error } = await supabase.from("sightings").insert([
        {
          person_name: sightingForm.personName,
          sighting_date: sightingForm.sightingDate,
          sighting_time: sightingForm.sightingTime,
          location: sightingForm.location,
          description: sightingForm.description,
          contact_info: sightingForm.contactInfo,
          photo_url:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
            sightingForm.personName, // Placeholder
          confidence_level: sightingForm.confidenceLevel,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      // Reset form after successful submission
      setSightingForm({
        personName: "",
        sightingDate: "",
        sightingTime: "",
        location: "",
        description: "",
        contactInfo: "",
        photo: null,
        confidenceLevel: "medium",
      });

      // Redirect after a delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: any) {
      console.error("Error submitting sighting report:", err);
      setError(err.message || "Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Report a Sighting</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Use this form to report a sighting of someone who may match a
              missing person's description.
            </p>
          </div>

          {success ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    Sighting Reported Successfully
                  </h2>
                  <p className="text-green-600 mb-4">
                    Thank you for your report. Our team will review it as soon
                    as possible.
                  </p>
                  <Button onClick={() => navigate("/")} className="mt-2">
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Report a Sighting</CardTitle>
                <CardDescription>
                  Please provide as much detail as possible about the person you
                  saw
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmitSighting}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="personName">
                          Person's Name (if known)
                        </Label>
                        <Input
                          id="personName"
                          name="personName"
                          value={sightingForm.personName}
                          onChange={handleSightingChange}
                          placeholder="Enter name if known"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sightingDate">Sighting Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              id="sightingDate"
                              name="sightingDate"
                              type="date"
                              value={sightingForm.sightingDate}
                              onChange={handleSightingChange}
                              className="pl-8"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="sightingTime">Sighting Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              id="sightingTime"
                              name="sightingTime"
                              type="time"
                              value={sightingForm.sightingTime}
                              onChange={handleSightingChange}
                              className="pl-8"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            id="location"
                            name="location"
                            value={sightingForm.location}
                            onChange={handleSightingChange}
                            placeholder="Enter location of sighting"
                            className="pl-8"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confidenceLevel">
                          How confident are you?
                        </Label>
                        <RadioGroup
                          value={sightingForm.confidenceLevel}
                          onValueChange={handleConfidenceLevelChange}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high" className="font-normal">
                              Very confident
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium" className="font-normal">
                              Somewhat confident
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low" />
                            <Label htmlFor="low" className="font-normal">
                              Not very confident
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={sightingForm.description}
                          onChange={handleSightingChange}
                          placeholder="Describe the person you saw, what they were wearing, what they were doing, etc."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactInfo">
                          Your Contact Information
                        </Label>
                        <Input
                          id="contactInfo"
                          name="contactInfo"
                          value={sightingForm.contactInfo}
                          onChange={handleSightingChange}
                          placeholder="Your phone number or email"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="sightingPhoto">
                          Upload Photo (if available)
                        </Label>
                        <div className="mt-1 flex items-center">
                          <label
                            htmlFor="sightingPhoto"
                            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                          >
                            {sightingForm.photo ? (
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                  <img
                                    src={URL.createObjectURL(
                                      sightingForm.photo,
                                    )}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="text-sm text-gray-500">
                                  {sightingForm.photo.name}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <span className="mt-2 text-base leading-normal text-gray-500">
                                  Select a photo
                                </span>
                                <span className="text-xs text-gray-500">
                                  (Optional but helpful)
                                </span>
                              </div>
                            )}
                            <input
                              id="sightingPhoto"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Sighting"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <div className="flex items-start space-x-2 text-sm text-slate-500 max-w-md">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    All reports are reviewed by our team. False reports are
                    illegal and may be subject to prosecution. Your contact
                    information will be kept confidential.
                  </p>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SightingsPage;
