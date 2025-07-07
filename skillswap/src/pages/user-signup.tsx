import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {motion} from "framer-motion"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const UserSignUp = () => {

    const [formData, setFormData] = React.useState({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
        bio: "",
        location: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
      };

      
  return (
    <div className='flex justify-center items-center' >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='w-1/3' 
    >
      <Card >
        <CardContent>
          <h2 className='text-4xl'>Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" />
            </div>
            <div>
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" type="file" value={formData.avatar} onChange={handleChange} placeholder="https://example.com/avatar.jpg" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location} onChange={handleChange} placeholder="Where are you from?" />
            </div>
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Avatar preview"
              />
            )}
            <div className='flex justify-center'>

            <Button type="submit" variant="default">
              Register
            </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  </div>
  )
}

export default UserSignUp