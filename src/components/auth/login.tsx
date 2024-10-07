'use client';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { loginUser } from '@/app/service/action'
export default function LoginForm() {
    const router = useRouter();
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { login }  = useAuth();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setCredentials(prev => ({ ...prev, [name]: value }))
    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const user = await loginUser(credentials);
          const { token, role } = user;
          login(token, role);
          toast({
            title: "Login Successful",
            description: "You have been successfully logged in.",
          })
          router.push('/');
        } catch (error) {
            let errorMessage = 'An unexpected error occurred';
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
                if (axiosError.response?.status === 404) {
                    errorMessage = axiosError.response?.data?.message || 'Resource not found';
                } else if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                }
            }
            toast({
              title: "Login Failed",
              description: errorMessage,
              variant: "destructive",
            })
        }
    }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Login to your Room Rental account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleLoginChange}
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
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleLoginChange}
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
            </div>
            <Button type="submit" className="w-full mt-4">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </Link>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
