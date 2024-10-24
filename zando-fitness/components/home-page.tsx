'use client'

import Link from 'next/link'
import { Dumbbell, Users, Calendar, TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <span className="text-2xl font-bold">Zando Fitness</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="hover:underline">Home</Link></li>
              <li><Link href="#" className="hover:underline">Classes</Link></li>
              <li><Link href="#" className="hover:underline">Membership</Link></li>
              <li><Link href="#" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Body, Transform Your Life</h1>
            <p className="text-xl mb-8">Join Zando Fitness and start your journey to a healthier, stronger you.</p>
            <Button size="lg" asChild>
              <Link href="/register">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Zando Fitness?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Expert Trainers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Our certified trainers are dedicated to helping you achieve your fitness goals.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Flexible Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>With classes available 24/7, you can work out on your own schedule.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Our members see real, lasting results with our scientifically-backed fitness programs.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join Zando Fitness today and take the first step towards a healthier you.</p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/classes">View Classes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}