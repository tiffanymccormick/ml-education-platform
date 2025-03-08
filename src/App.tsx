import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import { Dashboard } from './components/Dashboard/Dashboard'
import LessonView from './components/LessonView/LessonView'
import { Playground } from './components/Playground/Playground'
import { Achievements } from './components/Achievements/Achievements'
import LessonGallery from './components/LessonGallery/LessonGallery'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ml-platform-theme">
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans antialiased">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons" element={<LessonView />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/lessons-gallery" element={<LessonGallery />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App