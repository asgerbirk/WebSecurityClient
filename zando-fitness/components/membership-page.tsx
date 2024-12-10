'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Membership} from "@/types/membership";

export function Memberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]); // State for memberships
  const {toast} = useToast()

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/memberships`);
        if (!response.ok) {
          throw new Error('Failed to fetch memberships');
        }
        const data = await response.json();
        setMemberships(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not load memberships. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchMemberships().then(r => r);
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Path to Fitness</h1>
            <p className="text-xl mb-8">Select the membership that fits your goals and lifestyle</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memberships.map((tier, index) => (
                <Card key={index} className={`flex flex-col ${tier.MembershipID ? 'border-primary shadow-lg scale-105' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{tier.MembershipName}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">{tier.PricePerMonth}</span>
                      <span className="text-xl">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          {tier.Description}
                        </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/register`}>
                        Join {tier.MembershipName}
                      </Link>
                    </Button>

                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Plan to Choose?</h2>
            <p className="text-xl mb-8">Book a free consultation with one of our fitness experts to find the perfect fit for you.</p>
            {/*<Button size="lg" variant="outline" asChild>*/}
            {/*  <Link href="/consultation">Schedule Free Consultation</Link>*/}
            {/*</Button>*/}
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Register Here</Link>
            </Button>
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