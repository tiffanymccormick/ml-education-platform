"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Award,
  Brain,
  ChevronDown,
  Cpu,
  Database,
  FileText,
  Info,
  LineChart,
  MessageSquare,
  Network,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MainSidebar() {
  const pathname = usePathname()

  const modules = [
    {
      title: "Introduction to ML",
      icon: Brain,
      progress: 100,
      lessons: [
        { title: "What is Machine Learning?", completed: true },
        { title: "Types of Machine Learning", completed: true },
        { title: "ML Applications", completed: true },
      ],
    },
    {
      title: "Data Preparation",
      icon: Database,
      progress: 75,
      lessons: [
        { title: "Data Collection", completed: true },
        { title: "Data Cleaning", completed: true },
        { title: "Feature Engineering", completed: false },
      ],
    },
    {
      title: "Supervised Learning",
      icon: Cpu,
      progress: 30,
      lessons: [
        { title: "Linear Regression", completed: true },
        { title: "Classification", completed: false },
        { title: "Decision Trees", completed: false },
        { title: "Support Vector Machines", completed: false },
      ],
    },
    {
      title: "Neural Networks",
      icon: Network,
      progress: 0,
      lessons: [
        { title: "Perceptrons", completed: false },
        { title: "Backpropagation", completed: false },
        { title: "Deep Learning", completed: false },
      ],
    },
    {
      title: "Unsupervised Learning",
      icon: LineChart,
      progress: 0,
      lessons: [
        { title: "Clustering", completed: false },
        { title: "Dimensionality Reduction", completed: false },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b pb-2">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">ML</span>
          </div>
          <span className="font-bold">ML Explorer</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module, index) => (
                <Collapsible key={module.title} defaultOpen={index === 0 || index === 1}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="group/module">
                        <module.icon />
                        <span>{module.title}</span>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${module.progress}%` }} />
                          </div>
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {module.lessons.map((lesson) => (
                          <SidebarMenuSubItem key={lesson.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={`/lessons/${module.title.toLowerCase().replace(/\s+/g, "-")}/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
                              >
                                {lesson.title}
                                {lesson.completed && <Award className="ml-auto h-3 w-3 text-primary" />}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Documentation">
                  <Link href="/docs">
                    <FileText />
                    <span>Documentation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Community">
                  <Link href="/community">
                    <MessageSquare />
                    <span>Community</span>
                    <SidebarMenuBadge className="bg-primary text-primary-foreground">5</SidebarMenuBadge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="About">
                  <Link href="/about">
                    <Info />
                    <span>About</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/profile" className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm">John Doe</span>
                  <span className="text-xs text-muted-foreground">Level 3</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

