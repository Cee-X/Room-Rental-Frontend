'use client';
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/hooks/use-toast"
import { Eye, EyeOff } from 'lucide-react'
import { registerUser } from '@/app/service/action';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
   
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setSignupData(prev => ({ ...prev, [name]: value }))
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match.",
            variant: "destructive",
          })
          return
        }
        try {
          await registerUser(signupData);
          toast({
            title: "Signup Successful",
            description: "You have been successfully signed up.",
          })
          router.push('/login');
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response: { data: { message: string } } };
                if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
                  setErrorMessage(axiosError.response.data.message);
                } else {
                  setErrorMessage("An unexpected error occurred");
                }
              } else {
                setErrorMessage("An unexpected error occurred");
              }
              toast({
                title: "Sign Up Failed",
                description: errorMessage,
                variant: "destructive",
              })
        }
        
      }
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">Sign up for Room Rental</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
    </div>
   
  );
}

