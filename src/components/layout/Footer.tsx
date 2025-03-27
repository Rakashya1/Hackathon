import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Missing Person Finder</h2>
            <p className="text-slate-300 mb-4">
              Leveraging AI technology to reunite missing individuals with their
              loved ones.
            </p>
            <div className="flex space-x-4 mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Facebook size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Twitter size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Instagram size={20} />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/missing-persons"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Missing Persons
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Report a Missing Person
                </Link>
              </li>
              <li>
                <Link
                  to="/sightings"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Report a Sighting
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Interactive Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-slate-400" />
                <a
                  href="mailto:info@missingpersonfinder.org"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  info@missingpersonfinder.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-slate-400" />
                <a
                  href="tel:+1-800-123-4567"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-slate-400" />
                <span className="text-slate-300">
                  123 Main Street
                  <br />
                  Suite 456
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Missing Person Finder. All rights
            reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for
            families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
