"use client"

import type React from "react"

import { MainSidebar } from "@/components/main-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, BookOpen, Brain, Calendar, Clock, Database, LineChart, Network, Star, Trophy } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-1">
      <MainSidebar />
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Overall Progress"
              value="42%"
              description="5/12 modules completed"
              icon={<Trophy className="h-5 w-5 text-primary" />}
            />
            <StatCard
              title="Current Streak"
              value="7 days"
              description="Keep it up!"
              icon={<Calendar className="h-5 w-5 text-primary" />}
            />
            <StatCard
              title="Time Spent"
              value="24h 35m"
              description="This month"
              icon={<Clock className="h-5 w-5 text-primary" />}
            />
            <StatCard
              title="Badges Earned"
              value="12"
              description="3 new this week"
              icon={<Award className="h-5 w-5 text-primary" />}
            />
          </div>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your progress across all modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ModuleProgress title="Introduction to ML" progress={100} icon={<Brain className="h-5 w-5" />} />
                <ModuleProgress title="Data Preparation" progress={75} icon={<Database className="h-5 w-5" />} />
                <ModuleProgress title="Supervised Learning" progress={30} icon={<LineChart className="h-5 w-5" />} />
                <ModuleProgress title="Neural Networks" progress={0} icon={<Network className="h-5 w-5" />} />
                <ModuleProgress title="Unsupervised Learning" progress={0} icon={<Star className="h-5 w-5" />} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="Completed Lesson: Linear Regression"
                  timestamp="Today, 10:23 AM"
                  icon={<BookOpen className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Earned Badge: Data Cleaner"
                  timestamp="Yesterday, 3:45 PM"
                  icon={<Award className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Completed Quiz: Data Preparation"
                  timestamp="Yesterday, 2:30 PM"
                  icon={<BookOpen className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Started Module: Supervised Learning"
                  timestamp="2 days ago"
                  icon={<LineChart className="h-5 w-5" />}
                />
                <ActivityItem
                  title="Completed Project: Data Visualization"
                  timestamp="3 days ago"
                  icon={<Database className="h-5 w-5" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ModuleProgress({
  title,
  progress,
  icon,
}: {
  title: string
  progress: number
  icon: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  )
}

function ActivityItem({
  title,
  timestamp,
  icon,
}: {
  title: string
  timestamp: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  )
}

