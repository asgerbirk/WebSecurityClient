'use client'

import { useEffect, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, RegistrationSchema } from '@/types/signup'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from './ui/toaster'
import { Membership } from '@/types/membership'

export function FitnessRegistrationComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [memberships, setMemberships] = useState<Membership[]>([]); // State for memberships
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema)
  })

  // Fetch memberships from the API
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

    fetchMemberships();
  }, [toast]);

  const onSubmit = async (data: RegistrationSchema) => {
    console.log("hej")
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/register`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log(data)
      const result = await response.json()
      console.log(result)
      switch (response.status) {
        case 200:
          toast({
            title: 'Registration successful',
            description: 'Welcome to Zando Fitness!',
            duration: 3000,
            variant: 'default'
          })
          router.push('/login')
          break

        case 201:
          toast({
            title: 'Registration successful',
            description: 'Welcome to Zando Fitness!',
            duration: 3000,
            variant: 'default'
          })
          router.push('/login')
          break

        case 400:
          toast({
            title: 'Registration failed',
            description: result.message || 'Invalid input. Please check your details.',
            duration: 3000
          })
          break

        case 409:
          toast({
            title: 'Registration failed',
            description: result.message || 'An account with this email already exists.',
            duration: 3000
          })
          break

        case 500:
          toast({
            title: 'Server error',
            description: 'An unexpected error occurred. Please try again later.',
            duration: 3000
          })
          break

        default:
          toast({
            title: 'Registration failed',
            description: result.message || 'An unexpected error occurred'
          })
      }
    } catch (error) {
      toast({
        title: 'Network error',
        description: 'Unable to connect to the server. Please check your internet connection.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Join Zando Fitness</CardTitle>
          <CardDescription className="text-center">
            Enter your details to start your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="At least 8 characters"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="123 Fitness Street"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth')}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="membershipId">Membership Type</Label>
                <Controller
                  name="membershipId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select membership" />
                      </SelectTrigger>
                      <SelectContent>
                        {memberships.map((membership) => (
                          <SelectItem key={membership.MembershipID} value={String(membership.MembershipID)}>
                            {membership.MembershipName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.membershipId && (
                  <p className="text-red-500 text-sm">{errors.membershipId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  {...register('emergencyContact')}
                  placeholder="Name and phone (e.g., Jane Doe, +123456789)"
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm">{errors.emergencyContact.message}</p>
                )}
              </div>
            </div>
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" passHref>
              <Button variant="link" className="p-0 h-auto font-semibold">
                Log In
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}