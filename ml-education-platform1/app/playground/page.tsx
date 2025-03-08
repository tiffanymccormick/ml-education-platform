"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Code, Download, Play, Save } from "lucide-react"

export default function PlaygroundPage() {
  const [code, setCode] = useState(`import numpy as np
import matplotlib.pyplot as plt

# Generate some sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a simple plot
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)

# Show the plot
plt.show()`)

  const [selectedExample, setSelectedExample] = useState("sine-wave")

  return (
    <div className="flex flex-1">
      <MainSidebar />
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">Playground</h1>

            <div className="flex items-center gap-2">
              <Select value={selectedExample} onValueChange={setSelectedExample}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select an example" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sine-wave">Sine Wave</SelectItem>
                  <SelectItem value="linear-regression">Linear Regression</SelectItem>
                  <SelectItem value="k-means">K-Means Clustering</SelectItem>
                  <SelectItem value="neural-network">Simple Neural Network</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Save className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Editor
                  </CardTitle>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                </div>
                <CardDescription>Write and execute Python code</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-full border-t">
                  <pre className="h-full p-4 overflow-auto font-mono text-sm">
                    <code>{code}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Visualization</CardTitle>
                  <Tabs defaultValue="2d">
                    <TabsList>
                      <TabsTrigger value="2d">2D</TabsTrigger>
                      <TabsTrigger value="3d">3D</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>See your code in action</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-full border-t flex items-center justify-center bg-muted/50">
                  <div className="text-center p-6">
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                      <ArrowRight className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Run your code</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click the Run button to see your visualization here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

