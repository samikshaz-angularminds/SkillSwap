import React from 'react'
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
