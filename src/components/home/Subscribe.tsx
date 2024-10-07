"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button" 
import { subscribeEmail } from "@/app/service/action"
import { useState } from "react"
import { useToast } from "@/components/hooks/use-toast"
import { AxiosError } from "axios"
const Subscribe = () => {
  const [email, setEmail] = useState<string>('');
  const {toast} = useToast();
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await subscribeEmail({email});
      setEmail('');
      toast({
        title : "Success",
        description : "You have successfully subscribed to our newsletter",
        variant : "default"
      })
    } catch (error) {
      if (error instanceof AxiosError){
        toast({
          title : "Error",
          description : error.response?.data.message,
          variant : "destructive"
        })
      }
    }
  }
  return (
    <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">Stay updated with our latest offers and travel tips.</p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto" onSubmit={handleSubmit}>
              <Input 
                type="email"
                placeholder="Enter your email" 
                className="flex-grow mb-2 sm:mb-0 sm:mr-2" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               />
              <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </section>
  )
}

export default Subscribe
