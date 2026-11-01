import './index.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Features from './components/Features'
import TripPlanner from './components/TripPlanner'
import CommunityTrips from './components/CommunityTrips'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage'
import { useScrollReveal, useParallax } from './hooks/useScrollReveal'

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  useScrollReveal()
  useParallax()

  return (
    <div className="min-h-screen bg-[#003049] font-sans selection:bg-[#F5B82E] selection:text-slate-900">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* ─── FIXED DOCK NAVBAR ─── */}
      <Navbar />

      <main>
        {/* ─── SECTION 01: HERO + STATS STRIP ─── */}
        <Hero />

        {/* ─── SECTION 02: EXPLORE DESTINATIONS (CREAM) ─── */}
        <Destinations />

        {/* ─── SECTION 03: PLAN SMARTER WITH AI (NAVY) ─── */}
        <Features />

        {/* ─── SECTION 04: A COMPLETE TRIP PLANNER (CREAM) ─── */}
        <TripPlanner />

        {/* ─── SECTION 05: TRAVEL TOGETHER. MAKE BETTER STORIES (NAVY) ─── */}
        <CommunityTrips />

        {/* ─── SECTION 06: THE WORLD IS WAITING. LET'S GO (FINAL SCENIC CTA) ─── */}
        <CTASection />
      </main>

      {/* ─── SECTION 07: FOOTER (NAVY) ─── */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Dedicated Route-based Authentication */}
        <Route path="/signin" element={<AuthPage initialMode="signin" />} />
        <Route path="/login" element={<AuthPage initialMode="signin" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
