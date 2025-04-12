"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { GithubIcon, LinkedinIcon, ExternalLinkIcon } from 'lucide-react';

const developers = [
  {
    name: "Sameer Sambhare",
    github: "https://github.com/sameersambhare",
    linkedin: "https://linkedin.com/in/sameersambhare"
  },
  {
    name: "Krushna Salbande",
    github: "https://github.com/krushna",
    linkedin: "https://linkedin.com/in/krushna-salbande"
  },
  {
    name: "Sujit Shaha",
    github: "https://github.com/sujit",
    linkedin: "https://linkedin.com/in/sujit-shaha"
  },
  {
    name: "Omkar Shinde",
    github: "https://github.com/omkar",
    linkedin: "https://linkedin.com/in/omkar-shinde"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h4 className="text-orange-500 font-medium mb-2">Our Team</h4>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the talented team behind College PreConnect, a platform connecting engineering students.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev) => (
              <div key={dev.name} className="bg-gray-50 p-6 rounded-lg border border-gray-200 transition-all">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{dev.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{dev.name}</h3>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="icon" asChild className="hover:text-white hover:bg-orange-500">
                      <Link href={dev.github} target="_blank" aria-label={`${dev.name}'s GitHub profile`}>
                        <GithubIcon className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="hover:text-white hover:bg-orange-500">
                      <Link href={dev.linkedin} target="_blank" aria-label={`${dev.name}'s LinkedIn profile`}>
                        <LinkedinIcon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
            <Link href="/contactus" className="flex items-center">
              Contact Us <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}