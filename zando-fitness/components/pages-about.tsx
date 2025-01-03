'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const centers = [
  {
    name: "Zando Fitness Downtown",
    address: "123 Main St, Cityville, ST 12345",
    description: "Our flagship center with state-of-the-art equipment and panoramic city views.",
    image: "/placeholder.svg?height=300&width=400&text=Downtown+Center"
  },
  {
    name: "Zando Fitness Westside",
    address: "456 West Ave, Cityville, ST 12346",
    description: "Spacious facility with an Olympic-size pool and extensive group class schedule.",
    image: "/placeholder.svg?height=300&width=400&text=Westside+Center"
  },
  {
    name: "Zando Fitness Eastside",
    address: "789 East Blvd, Cityville, ST 12347",
    description: "Cozy neighborhood gym with a focus on personal training and nutrition counseling.",
    image: "/placeholder.svg?height=300&width=400&text=Eastside+Center"
  }
]

export function About() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Zando Fitness</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At Zando Fitness, we're committed to helping you achieve your fitness goals and lead a healthier lifestyle. 
            Our state-of-the-art facilities, expert trainers, and supportive community create the perfect environment 
            for your fitness journey.
          </p>
          <p className="text-lg mb-4">
            Whether you're a beginner or an experienced athlete, we have the resources and programs to help you 
            succeed. Join us and experience the Zando Fitness difference!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center, index) => (
              <Card key={index} className="flex flex-col">
                <Image
                  src={center.image}
                  alt={center.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{center.name}</CardTitle>
                  <CardDescription>{center.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{center.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}