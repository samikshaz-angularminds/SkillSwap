import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import Homepage from '@/pages/user-homepage'

export const Route = createFileRoute('/')({
  component: Homepage,
})


