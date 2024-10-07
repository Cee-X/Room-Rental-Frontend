"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react'
import { useToast } from '@/components/hooks/use-toast';
import { sendEmail } from '../service/action';
export default function ContactPage() {
  const { toast } = useToast()
  const [Data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', Data.name)
    formData.append('email', Data.email)
    formData.append('subject', Data.subject)
    formData.append('message', Data.message)
    try {
      await sendEmail( formData )
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
        variant: "default",
      })
    }catch(error){
      console.error(error)
      toast({
        title: "Message Failed",
        description: "Your message failed to send.",
        variant: "destructive",
      })
    }
    setData({ name: '', email: '', subject: '', message: ''})
  }

  const faqItems = [
    { question: "What are your check-in and check-out times?", answer: "Check-in is at 2 PM and check-out is at 12 AM." },
    { question: "Do you offer early check-in?", answer: "Yes, we offer early check-in for an additional fee. Please contact us for more information." },
    { question: "Do you offer airport transfers?", answer: "No, we don't offer airport transfers." },
    { question: "Is breakfast included in the room rate?", answer: "Breakfast is included in most of our room rates. Please check the specific room details for confirmation." },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={Data.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={Data.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={Data.subject} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={Data.message} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Phone className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2" />
                <span>contact@roomrental.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <span>Rangsit, Pathumthani, Thailand</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>Mon-Fri: 9AM-5PM, Sat-Sun: 10AM-3PM</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" aria-label="Facebook"><Facebook/></a>
                <a href="#" aria-label="Twitter"><Twitter /></a>
                <a href="#" aria-label="Instagram"><Instagram /></a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.8011963457584!2d100.61729731482933!3d13.964601990198706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28323d10290b5%3A0x946e22bc8754445a!2sRangsit%20University!5e0!3m2!1sen!2sth!4v1650123456789!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
