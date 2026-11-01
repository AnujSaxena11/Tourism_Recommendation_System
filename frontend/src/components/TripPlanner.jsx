import { useState } from 'react'

export default function TripPlanner() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [origin, setOrigin] = useState('New Delhi')
  const [duration, setDuration] = useState('4 Days')
  const [budget, setBudget] = useState('₹ 10,000 - 20,000')
  const [tripStyle, setTripStyle] = useState('Adventure')
  const [weather, setWeather] = useState('Any')
  const [interests, setInterests] = useState(['Mountains', 'Nature', 'Photography'])
  const [fullModalOpen, setFullModalOpen] = useState(false)

  const removeInterest = (item) => {
    setInterests(interests.filter((i) => i !== item))
  }

  const addInterest = (item) => {
    if (!interests.includes(item)) {
      setInterests([...interests, item])
    }
  }

  // Sample itineraries for interactive day tab switching
  const dayPlans = {
    1: {
      destination: 'Manali, Himachal Pradesh',
      durationTag: '4 Days Trip',
      cost: '₹ 12,500',
      timeline: [
        {
          time: '09:00 AM',
          title: 'Arrive in Manali',
          desc: 'Check in to your stay and freshen up',
          color: 'bg-[#C1121F] text-white',
          border: 'border-[#C1121F]',
        },
        {
          time: '10:30 AM',
          title: 'Visit Hadimba Temple',
          desc: 'Explore the ancient wooden pagoda temple in cedar forest',
          color: 'bg-[#0284C7] text-white',
          border: 'border-[#0284C7]',
        },
        {
          time: '01:00 PM',
          title: 'Local Lunch',
          desc: 'Try authentic Himachali siddu and trout cuisine',
          color: 'bg-[#16A34A] text-white',
          border: 'border-[#16A34A]',
        },
        {
          time: '03:00 PM',
          title: 'Solang Valley',
          desc: 'Adventure activities, paragliding and panoramic snowy views',
          color: 'bg-[#F59E0B] text-white',
          border: 'border-[#F59E0B]',
        },
        {
          time: '07:00 PM',
          title: 'Mall Road',
          desc: 'Shopping, cozy mountain cafes and street delicacies',
          color: 'bg-[#EA580C] text-white',
          border: 'border-[#EA580C]',
        },
      ],
      photos: [
        {
          title: 'Himalayan Peaks',
          url: '/images/manali.jpg',
        },
        {
          title: 'Hadimba Temple',
          url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Solang Valley',
          url: 'https://images.unsplash.com/photo-1596761224546-f9479b47e5b6?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Mall Road Lights',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
      ],
    },
    2: {
      destination: 'Rohtang Pass & Atal Tunnel',
      durationTag: '4 Days Trip',
      cost: '₹ 12,500',
      timeline: [
        {
          time: '07:30 AM',
          title: 'Early Drive to Atal Tunnel',
          desc: 'Scenic drive through the world longest mountain highway tunnel',
          color: 'bg-[#C1121F] text-white',
          border: 'border-[#C1121F]',
        },
        {
          time: '10:00 AM',
          title: 'Sissu Waterfall Exploration',
          desc: 'Witness cascading glacial waterfalls in Lahaul valley',
          color: 'bg-[#0284C7] text-white',
          border: 'border-[#0284C7]',
        },
        {
          time: '01:30 PM',
          title: 'Lahauli Dhaba Lunch',
          desc: 'Hot thukpa, momos and butter tea by the mountain stream',
          color: 'bg-[#16A34A] text-white',
          border: 'border-[#16A34A]',
        },
        {
          time: '04:00 PM',
          title: 'Rohtang Snow Point',
          desc: 'Snow scooter rides and breathtaking snowscape photography',
          color: 'bg-[#F59E0B] text-white',
          border: 'border-[#F59E0B]',
        },
        {
          time: '08:00 PM',
          title: 'Bonfire & Stargazing',
          desc: 'Relax by the campfire under crystal clear Himalayan skies',
          color: 'bg-[#EA580C] text-white',
          border: 'border-[#EA580C]',
        },
      ],
      photos: [
        {
          title: 'Atal Tunnel',
          url: 'https://images.unsplash.com/photo-1596761224546-f9479b47e5b6?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Sissu Waterfall',
          url: '/images/manali.jpg',
        },
        {
          title: 'Snow Ridge',
          url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Stargazing Camp',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
      ],
    },
    3: {
      destination: 'Old Manali & Vashisht',
      durationTag: '4 Days Trip',
      cost: '₹ 12,500',
      timeline: [
        {
          time: '09:00 AM',
          title: 'Vashisht Hot Water Springs',
          desc: 'Natural sulphur mineral hot bath with rejuvenating properties',
          color: 'bg-[#C1121F] text-white',
          border: 'border-[#C1121F]',
        },
        {
          time: '11:30 AM',
          title: 'Jogini Waterfall Hike',
          desc: 'Gentle 2km pine forest hike leading to majestic cascading falls',
          color: 'bg-[#0284C7] text-white',
          border: 'border-[#0284C7]',
        },
        {
          time: '02:00 PM',
          title: 'Bohemian Cafe Crawl',
          desc: 'Wood-fired sourdough pizza and artisanal mountain coffee',
          color: 'bg-[#16A34A] text-white',
          border: 'border-[#16A34A]',
        },
        {
          time: '05:00 PM',
          title: 'Manus Temple & Cedar Trails',
          desc: 'Heritage temple architecture with panoramic valley vistas',
          color: 'bg-[#F59E0B] text-white',
          border: 'border-[#F59E0B]',
        },
        {
          time: '08:00 PM',
          title: 'Live Acoustic Music',
          desc: 'Indie mountain folk bands in Old Manali stone cottages',
          color: 'bg-[#EA580C] text-white',
          border: 'border-[#EA580C]',
        },
      ],
      photos: [
        {
          title: 'Jogini Falls',
          url: '/images/kerala.jpg',
        },
        {
          title: 'Old Manali Cafe',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Pine Forest Trail',
          url: '/images/manali.jpg',
        },
        {
          title: 'Valley Sunset',
          url: 'https://images.unsplash.com/photo-1596761224546-f9479b47e5b6?auto=format&fit=crop&w=600&q=80',
        },
      ],
    },
    4: {
      destination: 'Naggar Castle & Departure',
      durationTag: '4 Days Trip',
      cost: '₹ 12,500',
      timeline: [
        {
          time: '09:30 AM',
          title: 'Naggar Heritage Castle',
          desc: '15th-century wood and stone royal palace overlooking Beas river',
          color: 'bg-[#C1121F] text-white',
          border: 'border-[#C1121F]',
        },
        {
          time: '12:00 PM',
          title: 'Nicholas Roerich Art Gallery',
          desc: 'Explore the historic estate and mountain paintings of Russian master',
          color: 'bg-[#0284C7] text-white',
          border: 'border-[#0284C7]',
        },
        {
          time: '02:30 PM',
          title: 'Apple Orchard Stroll',
          desc: 'Taste fresh mountain cider and local hand-spun shawls',
          color: 'bg-[#16A34A] text-white',
          border: 'border-[#16A34A]',
        },
        {
          time: '05:30 PM',
          title: 'Souvenir Pickups & Tea',
          desc: 'Local honey, walnuts, and pure wool handlooms',
          color: 'bg-[#F59E0B] text-white',
          border: 'border-[#F59E0B]',
        },
        {
          time: '08:00 PM',
          title: 'Overnight Volvo Departure',
          desc: 'Comfortable luxury sleeper coach back to New Delhi',
          color: 'bg-[#EA580C] text-white',
          border: 'border-[#EA580C]',
        },
      ],
      photos: [
        {
          title: 'Naggar Castle',
          url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Apple Orchards',
          url: '/images/manali.jpg',
        },
        {
          title: 'Beas River',
          url: 'https://images.unsplash.com/photo-1596761224546-f9479b47e5b6?auto=format&fit=crop&w=600&q=80',
        },
        {
          title: 'Departure Ridge',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
      ],
    },
  }

  const currentPlan = dayPlans[selectedDay] || dayPlans[1]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setSelectedDay(1)
    }, 800)
  }

  return (
    <section
      id="how-it-works"
      className="py-28 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF5EB] text-[#1A1816] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ─── SECTION 04 HEADER: NUMBER + TWO-TONE TITLE + POSTAL STAMP ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          
          {/* Left: Oversized "04" + Title in One Row Sequence with Generous Spacing */}
          <div className="flex flex-col">
            <div className="flex flex-row items-start gap-5 sm:gap-7 lg:gap-9">
              <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[9.2rem] xl:text-[10.5rem] text-stone-300 select-none leading-none tracking-tighter shrink-0 pt-1">
                04
              </span>
              <div className="flex flex-col">
                <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] uppercase tracking-tight text-slate-950 leading-[0.89]">
                  A COMPLETE
                  <br />
                  <span className="text-[#C1121F]">TRIP PLANNER</span>
                </h2>
              </div>
            </div>
            <p className="text-stone-600 text-base sm:text-lg mt-4 max-w-lg font-sans font-medium">
              Tell us your preferences and let Ghummakad create a personalized travel plan just for you.
            </p>
          </div>

          {/* Right: Vintage Circular Postal Stamp Illustration matching reference image */}
          <div className="hidden sm:flex items-center justify-end select-none">
            <div className="relative w-28 h-28 flex items-center justify-center opacity-70 rotate-6 hover:rotate-0 transition-transform">
              {/* Outer dashed cancellation seal */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-stone-400" />
              <div className="absolute inset-1.5 rounded-full border border-stone-400" />
              
              {/* Stamp Wavy cancellation lines */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 text-stone-400">
                <div className="w-10 h-0.5 bg-stone-400 rounded-full" />
                <div className="w-12 h-0.5 bg-stone-400 rounded-full" />
                <div className="w-10 h-0.5 bg-stone-400 rounded-full" />
              </div>

              {/* Text around circle */}
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <path
                  id="stampCurve"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[9px] font-bold tracking-[0.2em] uppercase fill-stone-500 font-sans">
                  <textPath href="#stampCurve" startOffset="0%">
                    EXPLORE • PLAN • BOOK • REPEAT •
                  </textPath>
                </text>
              </svg>

              {/* Center icon / emblem */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-600">
                <span className="text-[10px] font-bold tracking-widest font-mono">EST. 2026</span>
                <span className="text-xs">✦</span>
              </div>
            </div>
          </div>

        </div>

        {/* ─── TWO-COLUMN WORKFLOW: FORM ON LEFT + TIMELINE ON RIGHT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT: TRIP PREFERENCE FORM CARD ── */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/90 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Row 1: Starting from & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Starting From */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Starting from
                  </label>
                  <div className="relative">
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C1121F]/20 focus:border-[#C1121F]"
                    >
                      <option value="New Delhi">New Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      ▾
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Duration
                  </label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C1121F]/20 focus:border-[#C1121F]"
                    >
                      <option value="3 Days">3 Days</option>
                      <option value="4 Days">4 Days</option>
                      <option value="5 Days">5 Days</option>
                      <option value="7 Days">7 Days</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      ▾
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Budget & Trip Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Budget */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <circle cx="16" cy="12" r="2" />
                    </svg>
                    Budget (per person)
                  </label>
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C1121F]/20 focus:border-[#C1121F]"
                    >
                      <option value="₹ 5,000 - 10,000">₹ 5,000 - 10,000</option>
                      <option value="₹ 10,000 - 20,000">₹ 10,000 - 20,000</option>
                      <option value="₹ 20,000 - 40,000">₹ 20,000 - 40,000</option>
                      <option value="Luxury (₹ 50,000+)">Luxury (₹ 50,000+)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      ▾
                    </div>
                  </div>
                </div>

                {/* Trip Style */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                    Trip style
                  </label>
                  <div className="relative">
                    <select
                      value={tripStyle}
                      onChange={(e) => setTripStyle(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C1121F]/20 focus:border-[#C1121F]"
                    >
                      <option value="Adventure">Adventure</option>
                      <option value="Relaxation & Spa">Relaxation & Spa</option>
                      <option value="Culture & Heritage">Culture & Heritage</option>
                      <option value="Backpacking">Backpacking</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      ▾
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Interests */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                  Interests
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {interests.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeInterest(item)}
                        className="text-stone-400 hover:text-[#C1121F] transition-colors ml-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {/* Quick Add Suggestion */}
                  {['Culture', 'Food'].filter(tag => !interests.includes(tag)).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addInterest(tag)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-dashed border-stone-300 text-stone-500 hover:text-stone-800 text-xs font-medium hover:border-stone-400 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Preferred Weather */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  <svg className="w-3.5 h-3.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                  Preferred weather
                </label>
                <div className="relative">
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C1121F]/20 focus:border-[#C1121F]"
                  >
                    <option value="Any">Any</option>
                    <option value="Snowy & Cold">Snowy & Cold</option>
                    <option value="Cool & Pleasant">Cool & Pleasant</option>
                    <option value="Sunny & Warm">Sunny & Warm</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                    ▾
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Action: Crimson Blaze CTA */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-[#C1121F] hover:bg-[#A30F1A] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/20 transition-all font-sans"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating Custom Plan...
                  </span>
                ) : (
                  <>
                    <span>Generate My Itinerary</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ── RIGHT: ITINERARY PREVIEW CARD ── */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/90 flex flex-col justify-between">
            
            {/* Top Bar: Day Tabs + Destination Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              
              {/* Day Tabs */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedDay === day
                        ? 'bg-[#C1121F] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Day {day}
                  </button>
                ))}
              </div>

              {/* Destination & Duration Info */}
              <div className="text-right">
                <span className="font-display font-bold text-sm sm:text-base text-slate-900 uppercase">
                  {currentPlan.destination}
                </span>
                <span className="text-xs text-stone-500 block font-medium">
                  {currentPlan.durationTag}
                </span>
              </div>
            </div>

            {/* Main Itinerary Content: Timeline Left + 4 Photos Right */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 items-start">
              
              {/* Left 8 Cols: Timeline Activities */}
              <div className="sm:col-span-8 relative pl-6 border-l-2 border-stone-200 space-y-6">
                {currentPlan.timeline.map((act, index) => (
                  <div key={index} className="relative group">
                    {/* Node Dot on the timeline */}
                    <div
                      className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full ${act.color} ring-4 ring-white shadow-sm`}
                    />
                    
                    {/* Time */}
                    <span className="text-[11px] font-bold text-stone-400 block tracking-wide uppercase">
                      {act.time}
                    </span>

                    {/* Title */}
                    <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-[#C1121F] transition-colors uppercase leading-tight mt-0.5">
                      {act.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-stone-600 font-sans mt-0.5 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right 4 Cols: 4 Stacked Photo Thumbnails */}
              <div className="sm:col-span-4 flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {currentPlan.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-20 sm:w-full sm:h-20 shrink-0 rounded-xl overflow-hidden group shadow-sm border border-stone-200"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/images/manali.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] font-bold text-white leading-tight">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Card Footer: Cost + View Full Itinerary Link */}
            <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 font-medium mr-2">Estimated Cost (per person):</span>
                <span className="font-display font-black text-2xl text-[#C1121F]">
                  {currentPlan.cost}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setFullModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C1121F] hover:text-[#9B0D18] transition-all uppercase tracking-wider cursor-pointer group"
              >
                <span>View Full Itinerary</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ── FULL ITINERARY SHOWCASE MODAL ── */}
      {fullModalOpen && (
        <div
          onClick={() => setFullModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto cursor-default"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-[#C1121F] uppercase tracking-wider">
                  Complete 4-Day Trip Plan
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">
                  Manali, Himachal Pradesh
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFullModalOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-6">
              {[1, 2, 3, 4].map((d) => (
                <div key={d} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-base text-[#C1121F] uppercase">
                      Day {d}: {dayPlans[d]?.destination}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">5 Activities</span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Highlights: {dayPlans[d]?.timeline.map(t => t.title).join(' • ')}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Total Package Estimate:</span>
                <span className="font-display font-black text-xl text-[#C1121F]">
                  ₹ 12,500 / person
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setFullModalOpen(false)}
                  className="w-full sm:w-auto bg-[#003049] hover:bg-[#08233F] text-white text-xs font-bold py-3 px-6 rounded-xl transition-all uppercase tracking-wider"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setFullModalOpen(false)}
                  className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-3 px-5 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
