import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'

const UserLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    identifier: '', // username or email
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', formData)
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
     
    </div>
  )
}

export default UserLogin
