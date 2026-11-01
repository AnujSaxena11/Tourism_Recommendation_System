import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'

const API_BASE_URL = 'http://localhost:5000/api/auth'

export default function AuthPage({ initialMode }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine mode from path or prop: 'signin' | 'signup'
  const isSignUpRoute = initialMode === 'signup' || location.pathname === '/signup'
  const [mode, setMode] = useState(isSignUpRoute ? 'signup' : 'signin')
  const [isForgotMode, setIsForgotMode] = useState(false)
  const [forgotStep, setForgotStep] = useState(1) // 1: send OTP, 2: verify OTP & set new pass

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    otp: '',
    newPassword: '',
    cnewPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [user, setUser] = useState(null)

  // Sync mode with route
  useEffect(() => {
    if (location.pathname === '/signup') {
      setMode('signup')
      setIsForgotMode(false)
    } else if (location.pathname === '/signin' || location.pathname === '/login') {
      setMode('signin')
      setIsForgotMode(false)
    }
  }, [location.pathname])

  // Check if already signed in
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ghummakad_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const fetchCsrfToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/csrf-token`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to obtain security token')
      const data = await res.json()
      return data.csrfToken
    } catch (err) {
      console.warn('CSRF fetch error:', err)
      return null
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('ghummakad_user')
    setUser(null)
    setSuccessMsg('Signed out successfully.')
    setTimeout(() => setSuccessMsg(''), 2500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      const csrfToken = await fetchCsrfToken()
      const headers = { 'Content-Type': 'application/json' }
      if (csrfToken) headers['x-csrf-token'] = csrfToken

      if (isForgotMode) {
        if (forgotStep === 1) {
          const res = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({ email: formData.email }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.message || 'Failed to send OTP')
          setSuccessMsg('A 6-digit OTP has been sent to your email.')
          setForgotStep(2)
        } else {
          if (formData.newPassword !== formData.cnewPassword) {
            throw new Error('Passwords do not match')
          }
          if (formData.newPassword.length < 12) {
            throw new Error('New password must be at least 12 characters long')
          }
          const res = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              email: formData.email,
              otp: formData.otp,
              newPassword: formData.newPassword,
              cnewPassword: formData.cnewPassword,
            }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.message || 'OTP verification failed')
          setSuccessMsg('Password reset successfully! You can now sign in.')
          setIsForgotMode(false)
          setForgotStep(1)
          setMode('signin')
        }
        return
      }

      if (mode === 'signin') {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Invalid email or password.')
        }

        const userData = data.user || { name: formData.email.split('@')[0], email: formData.email }
        localStorage.setItem('ghummakad_user', JSON.stringify(userData))
        setUser(userData)
        setSuccessMsg('Welcome back! Redirecting...')
        setTimeout(() => {
          navigate('/')
        }, 800)
      } else {
        // Sign Up
        if (formData.password !== formData.cpassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 12) {
          throw new Error('Password must be at least 12 characters long')
        }

        const res = await fetch(`${API_BASE_URL}/signup`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            cpassword: formData.cpassword,
          }),
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Registration failed. Please try again.')
        }

        const userData = data.user || { name: formData.name, email: formData.email }
        localStorage.setItem('ghummakad_user', JSON.stringify(userData))
        setUser(userData)
        setSuccessMsg('Account created successfully! Redirecting...')
        setTimeout(() => {
          navigate('/')
        }, 900)
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/google`
  }

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col lg:flex-row text-white selection:bg-[#F5B82E] selection:text-slate-900 font-sans">
      
      {/* ─── LEFT PANEL: CINEMATIC TRAVEL SPOTLIGHT (DESKTOP) ─── */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 flex-col justify-between p-12 overflow-hidden border-r border-white/10">
        {/* Full-bleed background with atmospheric blur & vignettes */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/manali.jpg"
            alt="Scenic mountain journey"
            className="w-full h-full object-cover object-center filter brightness-60 contrast-110 scale-105 transform hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/50 to-[#070D18]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070D18]" />
        </div>

        {/* Top Header: Logo + Return to Site */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Middle Content: Inspirational Travel Narrative */}
        <div className="relative z-10 max-w-md my-auto pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-5">
            <span>✨</span>
            <span>Plan • Connect • Journey</span>
          </div>

          <h1 className="font-display font-black text-4xl xl:text-5xl uppercase tracking-tight text-white leading-tight">
            Your Next Great
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#F5B82E] to-amber-500">
              Expedition
            </span>{' '}
            Begins Here.
          </h1>

          <p className="mt-4 text-slate-300 text-sm xl:text-base leading-relaxed">
            Join thousands of travelers using intelligent real-time itinerary builders, live disaster & weather alerts, and group expeditions.
          </p>

          {/* Floating Live Trip Highlights */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-lg font-bold">
                🏔️
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">Manali Snow Peaks Expedition</h4>
                  <span className="text-[11px] font-extrabold text-amber-400">4.9 ★</span>
                </div>
                <p className="text-[11px] text-slate-400">4 Days • Group of 6 • Active Booking</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center text-lg font-bold">
                🌴
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">Kerala Backwaters Retreat</h4>
                  <span className="text-[11px] font-extrabold text-amber-400">4.8 ★</span>
                </div>
                <p className="text-[11px] text-slate-400">3 Days • Houseboat • Real-time AI Route</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Over 12,400 itineraries built this month</span>
          </div>
          <span className="font-semibold text-slate-300">Verified Travel Network</span>
        </div>
      </div>

      {/* ─── RIGHT PANEL: DEDICATED AUTH CARD & FORM ─── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 relative overflow-y-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Header (Shows only on mobile/tablet) */}
        <div className="w-full max-w-md lg:hidden flex items-center justify-between mb-8">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200 font-semibold"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* If already logged in, show User Card */}
          {user ? (
            <div className="p-8 rounded-3xl bg-[#0D1624]/90 border border-amber-400/30 backdrop-blur-xl shadow-2xl text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-[#F5B82E] text-slate-950 font-black text-3xl flex items-center justify-center shadow-lg mb-4">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <h2 className="font-display font-black text-2xl text-white">
                Hi, {user.name || 'Traveler'}!
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">{user.email}</p>

              <div className="mt-8 space-y-3">
                <Link
                  to="/"
                  className="w-full py-3.5 px-4 rounded-xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#F5B82E] text-slate-950 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Continue Exploring</span>
                  <span>→</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Auth Form Card */
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1624]/90 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(245,184,46,0.12)]">
              {/* Form Title & Subtitle */}
              <div className="mb-6 text-center">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                  {isForgotMode
                    ? forgotStep === 1
                      ? 'Reset Password'
                      : 'Verify Code'
                    : mode === 'signup'
                    ? 'Join Ghummakad'
                    : 'Welcome Back'}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                  {isForgotMode
                    ? forgotStep === 1
                      ? 'Enter your registered email to receive an OTP'
                      : 'Enter the 6-digit code sent to your email'
                    : mode === 'signup'
                    ? 'Start planning unforgettable adventures with AI'
                    : 'Sign in to access your saved trips & itineraries'}
                </p>
              </div>

              {/* Mode Toggle Pills (Sign In <-> Sign Up) */}
              {!isForgotMode && (
                <div className="flex p-1 mb-6 rounded-2xl bg-white/[0.06] border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin')
                      navigate('/signin')
                      setError('')
                    }}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                      mode === 'signin'
                        ? 'bg-gradient-to-r from-amber-400 to-[#F5B82E] text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup')
                      navigate('/signup')
                      setError('')
                    }}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-gradient-to-r from-amber-400 to-[#F5B82E] text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Quick Google Sign In */}
              {!isForgotMode && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 flex items-center justify-center gap-3 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="flex items-center my-6 gap-3">
                    <div className="flex-1 h-[1px] bg-white/10" />
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      or with email
                    </span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>
                </>
              )}

              {/* Feedback Alerts */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs leading-relaxed flex items-center gap-2.5">
                  <span className="text-base">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {successMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs leading-relaxed flex items-center gap-2.5">
                  <span className="text-base">✓</span>
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sign Up: Full Name */}
                {mode === 'signup' && !isForgotMode && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anuj Saxena"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                )}

                {/* Email Address */}
                {(!isForgotMode || forgotStep === 1) && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                )}

                {/* Password Fields */}
                {!isForgotMode && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Password
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotMode(true)
                            setForgotStep(1)
                            setError('')
                          }}
                          className="text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={mode === 'signup' ? 'Min 12 characters' : 'Enter your password'}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {mode === 'signup' && formData.password && (
                      <div className="mt-1.5 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Min 12 characters required</span>
                        <span className={formData.password.length >= 12 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                          {formData.password.length}/12
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sign Up: Confirm Password */}
                {mode === 'signup' && !isForgotMode && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="cpassword"
                      required
                      value={formData.cpassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                )}

                {/* Forgot Password Step 2: OTP & New Passwords */}
                {isForgotMode && forgotStep === 2 && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        name="otp"
                        maxLength={6}
                        required
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="123456"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm tracking-widest text-center font-mono placeholder:text-slate-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        New Password (Min 12 chars)
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="cnewPassword"
                        required
                        value={formData.cnewPassword}
                        onChange={handleChange}
                        placeholder="Repeat new password"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400/80 focus:bg-white/10 outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Sign In Options */}
                {mode === 'signin' && !isForgotMode && (
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded accent-amber-400 bg-white/10 border-white/20"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>
                )}

                {/* Action Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-3.5 px-4 rounded-xl font-display font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 via-[#F5B82E] to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span>
                      {isForgotMode
                        ? forgotStep === 1
                          ? 'Send Reset Code →'
                          : 'Verify & Reset Password →'
                        : mode === 'signin'
                        ? 'Sign In to Account →'
                        : 'Create My Account →'}
                    </span>
                  )}
                </button>
              </form>

              {/* Forgot Mode Return */}
              {isForgotMode && (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false)
                      setForgotStep(1)
                      setError('')
                    }}
                    className="text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}

              {/* Bottom Terms Note */}
              <div className="mt-6 text-center text-[11px] text-slate-500 leading-relaxed">
                By accessing Ghummakad, you agree to our{' '}
                <a href="#" className="underline text-slate-400 hover:text-white">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-slate-400 hover:text-white">
                  Privacy Policy
                </a>
                .
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
