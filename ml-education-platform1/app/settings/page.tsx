"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Bell, Globe, Lock, Moon, Save, Sun, User } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    achievements: true,
    updates: true,
  })

  return (
    <div className="flex flex-1">
      <MainSidebar />
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Settings</h1>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your account information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue="Machine learning enthusiast" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language & Region
                  </CardTitle>
                  <CardDescription>Configure your language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time (ET)</option>
                        <option value="pst">Pacific Time (PT)</option>
                        <option value="cet">Central European Time (CET)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    Theme
                  </CardTitle>
                  <CardDescription>Customize the appearance of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <Sun className="h-8 w-8" />
                      <span>Light</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <Moon className="h-8 w-8" />
                      <span>Dark</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <div className="flex">
                        <Sun className="h-8 w-8" />
                        <Moon className="h-8 w-8" />
                      </div>
                      <span>System</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="achievement-notifications">Achievement Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you earn badges or complete modules
                        </p>
                      </div>
                      <Switch
                        id="achievement-notifications"
                        checked={notifications.achievements}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="update-notifications">Platform Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new features and content</p>
                      </div>
                      <Switch
                        id="update-notifications"
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Manage your privacy and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <Switch id="profile-visibility" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="learning-progress">Learning Progress</Label>
                        <p className="text-sm text-muted-foreground">Show your learning progress on your profile</p>
                      </div>
                      <Switch id="learning-progress" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-collection">Data Collection</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect usage data to improve the platform
                        </p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

