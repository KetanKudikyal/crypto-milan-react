// import { Avatar } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import { Calendar, Video, Users, ChevronRight, Share2, Check } from 'lucide-react'

// export default function EventPage() {
//     return (
//         <div className="min-h-screen bg-black text-white">
//             {/* Header */}
//             <header className="border-b border-white/10">
//                 <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         <div className="flex items-center space-x-8">
//                             <a href="#" className="text-white/90 hover:text-white flex items-center space-x-2">
//                                 <Calendar className="h-5 w-5" />
//                                 <span>Events</span>
//                             </a>
//                             <a href="#" className="text-white/90 hover:text-white flex items-center space-x-2">
//                                 <Users className="h-5 w-5" />
//                                 <span>Calendars</span>
//                             </a>
//                             <a href="#" className="text-white/90 hover:text-white flex items-center space-x-2">
//                                 <Share2 className="h-5 w-5" />
//                                 <span>Discover</span>
//                             </a>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <span className="text-white/90">7:25 AM GMT+5:30</span>
//                             <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
//                                 Create
//                             </Button>
//                         </div>
//                     </div>
//                 </nav>
//             </header>

//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Column */}
//                     <div className="lg:col-span-2">
//                         <Card className="bg-gray-900 border-0 text-white p-6">
//                             <div className="flex flex-col space-y-4">
//                                 <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
//                                     <img
//                                         src="/placeholder.svg?height=300&width=600"
//                                         alt="Event banner"
//                                     />
//                                 </div>
//                                 <div className="flex items-center space-x-2 mb-4">
//                                     <Badge variant="secondary" className="bg-indigo-600/30 text-white">
//                                         Featured in Devcon
//                                     </Badge>
//                                 </div>
//                                 <h1 className="text-3xl font-bold mb-6">
//                                     Listing & Growth: Leverage Memes, WebApps, and CEXs #DevCon
//                                 </h1>
//                                 <div className="grid gap-4">
//                                     <div className="flex items-center space-x-2 text-white/80">
//                                         <Calendar className="h-5 w-5" />
//                                         <div>
//                                             <div className="font-medium">Tuesday, November 5</div>
//                                             <div className="text-sm">5:30 PM - Jan 31, 2025, 5:30 PM GMT+5:30</div>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center space-x-2 text-white/80">
//                                         <Video className="h-5 w-5" />
//                                         <span>Zoom</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>

//                         {/* Event Status */}
//                         <Card className="mt-6 bg-gray-900 border-0 text-white p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <div>
//                                     <h2 className="text-xl font-semibold">You're In</h2>
//                                     <p className="text-white/70">Ticket: Standard</p>
//                                 </div>
//                                 <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
//                                     LIVE
//                                 </Badge>
//                             </div>
//                             <Button className="w-full mb-4" size="lg">
//                                 <Video className="mr-2 h-5 w-5" />
//                                 Join Event
//                             </Button>
//                             <p className="text-sm text-white/70">
//                                 If needed, you can register for additional tickets.
//                             </p>
//                         </Card>

//                         {/* Event Preparation */}
//                         <Card className="mt-6 bg-gray-900 border-0 text-white p-6">
//                             <div className="flex items-center justify-between">
//                                 <h2 className="text-xl font-semibold">Get Ready for the Event</h2>
//                                 <ChevronRight className="h-5 w-5" />
//                             </div>
//                             <p className="text-white/70 mt-2">Profile Complete · Reminder: SMS & Email</p>
//                         </Card>
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-6">
//                         {/* Vertical Stepper */}
//                         <Card className="bg-gray-900 border-0 text-white p-6">
//                             <h2 className="text-xl font-semibold mb-4">Event Progress</h2>
//                             <div className="space-y-4">
//                                 <div className="flex items-start">
//                                     <div className="flex flex-col items-center mr-4">
//                                         <div className="rounded-full h-8 w-8 flex items-center justify-center bg-indigo-600 text-white">
//                                             <Check className="h-5 w-5" />
//                                         </div>
//                                         <div className="h-full border-l border-indigo-300 ml-4 mt-1"></div>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-medium">Registration</h3>
//                                         <p className="text-white/70">Completed</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <div className="flex flex-col items-center mr-4">
//                                         <div className="rounded-full h-8 w-8 flex items-center justify-center bg-indigo-600 text-white">
//                                             2
//                                         </div>
//                                         <div className="h-full border-l border-indigo-300 ml-4 mt-1"></div>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-medium">Preparation</h3>
//                                         <p className="text-white/70">In progress</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <div className="flex flex-col items-center mr-4">
//                                         <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white text-indigo-600">
//                                             3
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-medium">Live Event</h3>
//                                         <p className="text-white/70">Upcoming</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>

//                         <Card className="bg-gray-900 border-0 text-white p-6">
//                             <h2 className="text-xl font-semibold mb-4">Hosted By</h2>
//                             <div className="flex items-center space-x-3">
//                                 <Avatar className="h-10 w-10">
//                                     <div className="bg-indigo-600 h-full w-full flex items-center justify-center">
//                                         LA
//                                     </div>
//                                 </Avatar>
//                                 <div>
//                                     <h3 className="font-medium">LATOKEN</h3>
//                                     <p className="text-sm text-white/70">Event Organizer</p>
//                                 </div>
//                             </div>
//                         </Card>

//                         <div className="space-y-2">
//                             <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
//                                 Contact the Host
//                             </Button>
//                             <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
//                                 Report Event
//                             </Button>
//                         </div>

//                         <div className="pt-4">
//                             <Badge variant="outline" className="text-white/70 border-white/20">
//                                 # Crypto
//                             </Badge>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }

import React from 'react'

const eventpage = () => {
    return (
        <div>eventpage</div>
    )
}

export default eventpage

