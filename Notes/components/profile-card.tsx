"use client"

import { Camera, Mail, MapPin, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface User {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  memberSince: string
}

interface ProfileCardProps {
  user: User
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="relative pb-0">
        {/* Cover */}
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-xl bg-gradient-to-br from-muted to-muted/50" />
        
        {/* Avatar */}
        <div className="relative z-10 flex justify-center pt-8">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change avatar</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 text-center">
        <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Member since {user.memberSince}</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{user.location}</span>
          </div>
        </div>

        <Button variant="outline" className="mt-6 w-full">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}
