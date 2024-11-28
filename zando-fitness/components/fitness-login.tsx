'use client'

import { useState } from 'react'
import { Eye, EyeOff, Dumbbell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from '../types/login'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from './ui/toaster'

export function FitnessLoginComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {toast} = useToast();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      switch (response.status) {
        case 200:
          toast({
            title: 'Success',
            description: 'Login successful',
            variant: 'default'
          })
          router.push('/')
          break

        case 201:
          toast({
            title: 'Success',
            description: 'Login successful',
            variant: 'default'
          })
          router.push('/')
          break
        
        case 400:
          toast({
            title: 'Invalid Input',
            description: result.message || 'Invalid login credentials',
            variant: 'destructive'
          })
          break
        
        case 401:
          toast({
            title: 'Authentication Failed',
            description: result.message || 'Unauthorized access',
            variant: 'destructive'
          })
          break
        
        case 403:
          toast({
            title: 'Access Denied',
            description: result.message || 'You do not have permission to access this resource',
            variant: 'destructive'
          })
          break
        
        case 404:
          toast({
            title: 'User Not Found',
            description: result.message || 'User account not found',
            variant: 'destructive'
          })
          break
        
        case 429:
          toast({
            title: 'Too Many Attempts',
            description: result.message || 'Too many login attempts. Please try again later.',
            variant: 'destructive'
          })
          break
        
        case 500:
          toast({
            title: 'Server Error',
            description: 'An internal server error occurred. Please try again later.',
            variant: 'destructive'
          })
          break
        
        default:
          toast({
            title: 'Login Failed',
            description: result.message || 'An unexpected error occurred',
            variant: 'destructive'
          })
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'Unable to connect to the server. Please check your internet connection.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to Zando Fitness</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>
            <Toaster />
            <Button 
              className="w-full mt-6" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="link" className="text-sm text-muted-foreground">
            Forgot your password?
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <Link href="/register" passHref>
              <Button variant="link" className="p-0 h-auto font-semibold">
                Sign up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}