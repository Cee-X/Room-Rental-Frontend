'use client'
import React, {use, useState} from 'react';
import { Button } from '../utils/Button';
import { sendEmail } from '../service/action';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus]  = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try{
      const response = await sendEmail(data);
      setStatus(response.message);
    }catch(error){
      console.error(error);
      setStatus('An error occurred while sending your message');
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center md:text-start mb-8">Contact Us</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Information</h2>
          <p className="mb-2"><strong>Address:</strong> 123 Main Street, Pathum Thani, Thailand</p>
          <p className="mb-2"><strong>Phone:</strong> +66 61 273 6866</p>
          <p className="mb-2"><strong>Email:</strong> contact@roomrental.com</p>
          <p className="mb-2"><strong>Operating Hours:</strong> Mon-Fri, 9am - 6pm</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:underline">Facebook</a>
            <a href="#" className="text-blue-400 hover:underline">Twitter</a>
            <a href="#" className="text-pink-500 hover:underline">Instagram</a>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                required
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange} 
                required
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={5}
              />
            </div>
            <Button className="bg-blue-500 text-white px-6 py-2 rounded-md">
              Submit
            </Button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Find Us Here</h2>
        <iframe
          className="w-full h-64 border border-gray-300 rounded-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.587998932401!2d100.51378611523456!3d13.736717690352697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f151fcf7f75%3A0x21e4b67e34e0891!2sGrand%20Palace!5e0!3m2!1sen!2sth!4v1647634334727!5m2!1sen!2sth"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
