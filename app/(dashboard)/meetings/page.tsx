'use client'

import * as React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  CalendarDays, 
  Clock, 
  Video,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  RefreshCw,
  FileText,
  Edit,
  Save,
  X
} from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Dummy data for meetings with additional fields
const upcomingMeetings = [
  {
    id: 1,
    title: "Product Demo",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "30 min",
    lead: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      profession: "Marketing Manager",
      company: "Tech Corp",
      state: "California",
      requirements: "Interested in enterprise features",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg"
    },
    assignedTo: {
      name: "Alex Thompson",
      email: "alex@leadbajar.com",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
      role: "Sales Representative"
    },
    type: "video",
    status: "confirmed",
    meetingLink: "https://meet.leadbajar.com/demo-123",
    agenda: [
      "Product overview",
      "Feature demonstration",
      "Q&A session",
      "Next steps discussion"
    ],
    questionnaire: [
      { question: "What's your budget range?", answer: "$5000-$10000" },
      { question: "Team size?", answer: "50-100 employees" },
      { question: "Current challenges?", answer: "Lead management and tracking" }
    ],
    source: "Website Form"
  },
  {
    id: 2,
    title: "Initial Consultation",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "45 min",
    lead: {
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 234-567-8902",
      profession: "CEO",
      company: "Startup Ltd",
      state: "Texas",
      requirements: "Full platform demo",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg"
    },
    assignedTo: {
      name: "Sarah Johnson",
      email: "sarah@leadbajar.com",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
      role: "Senior Sales Executive"
    },
    type: "video",
    status: "confirmed",
    meetingLink: "https://meet.leadbajar.com/consultation-123",
    source: "LinkedIn Campaign",
    questionnaire: [
      { question: "Company size?", answer: "25 employees" },
      { question: "Industry?", answer: "SaaS" },
      { question: "Key requirements?", answer: "Integration capabilities" }
    ]
  }
]

const meetingHistory = [
  {
    id: 6,
    title: "Product Demo",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "30 min",
    lead: {
      name: "Robert Chen",
      email: "robert@example.com",
      phone: "+1 234-567-8903",
      profession: "CTO",
      company: "Tech Solutions",
      state: "Washington",
      requirements: "Technical deep dive",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg"
    },
    assignedTo: {
      name: "Alex Thompson",
      email: "alex@leadbajar.com",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
      role: "Sales Representative"
    },
    type: "video",
    status: "completed",
    notes: "Client showed interest in premium features",
    followUpDate: "2024-01-22",
    outcome: "Requested proposal",
    meetingLink: "https://meet.leadbajar.com/past-demo-123",
    source: "Direct Referral"
  },
  {
    id: 7,
    title: "Sales Discussion",
    date: "2024-01-14",
    time: "2:00 PM",
    duration: "45 min",
    lead: {
      name: "David Lee",
      email: "david@example.com",
      phone: "+1 234-567-8905",
      profession: "Sales Director",
      company: "Global Corp",
      state: "Texas",
      requirements: "Enterprise pricing discussion",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg"
    },
    assignedTo: {
      name: "Sarah Johnson",
      email: "sarah@leadbajar.com",
      avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
      role: "Senior Sales Executive"
    },
    type: "video",
    status: "completed",
    notes: "Positive discussion about enterprise features",
    followUpDate: "2024-01-21",
    outcome: "Contract sent for review",
    meetingLink: "https://meet.leadbajar.com/past-sales-123",
    source: "Enterprise Outreach"
  }
]

const meetingTypes = {
  video: { icon: Video, color: "text-blue-500" },
  phone: { icon: Phone, color: "text-green-500" },
  "in-person": { icon: MapPin, color: "text-purple-500" }
}

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  rescheduled: "bg-purple-100 text-purple-800"
}

// Add team members data at the top with other constants
const teamMembers = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@leadbajar.com",
    avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
    role: "Sales Representative"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@leadbajar.com",
    avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
    role: "Senior Sales Executive"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@leadbajar.com",
    avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
    role: "Account Manager"
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@leadbajar.com",
    avatar: "https://www.svgrepo.com/show/65453/avatar.svg",
    role: "Sales Manager"
  }
]

function MeetingDetails({ meeting, onUpdate }: { meeting: any, onUpdate?: (updatedData: any) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(meeting.notes || '')
  const [outcome, setOutcome] = useState(meeting.outcome || '')
  const [assignedTo, setAssignedTo] = useState(meeting.assignedTo)

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...meeting,
        notes,
        outcome,
        assignedTo
      })
    }
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Lead Information */}
      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2">Lead Information</h4>
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={meeting.lead.avatar} />
            <AvatarFallback>{meeting.lead.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{meeting.lead.name}</p>
            <p className="text-sm text-muted-foreground">{meeting.lead.profession} at {meeting.lead.company}</p>
          </div>
        </div>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p>Email: {meeting.lead.email}</p>
          <p>Phone: {meeting.lead.phone}</p>
          <p>State: {meeting.lead.state}</p>
          <p>Source: {meeting.source}</p>
        </div>
      </div>

      {/* Assigned To */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold mb-2">Assigned Representative</h4>
          {onUpdate && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          )}
        </div>
        {isEditing ? (
          <div className="space-y-4">
            <Select
              value={assignedTo.email}
              onValueChange={(value) => {
                const selectedMember = teamMembers.find(member => member.email === value)
                if (selectedMember) {
                  setAssignedTo(selectedMember)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.email}>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={assignedTo.avatar} />
              <AvatarFallback>{assignedTo.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{assignedTo.name}</p>
              <p className="text-sm text-muted-foreground">{assignedTo.role}</p>
              <p className="text-sm text-muted-foreground">{assignedTo.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Meeting Details */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <div>
          <h4 className="font-semibold mb-2">Meeting Details</h4>
          <div className="space-y-2 text-sm">
            <p>Date: {meeting.date}</p>
            <p>Time: {meeting.time}</p>
            <p>Duration: {meeting.duration}</p>
            {meeting.meetingLink && (
              <p>Link: <a href={meeting.meetingLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a></p>
            )}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Type & Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              {React.createElement(meetingTypes[meeting.type as keyof typeof meetingTypes].icon, {
                className: `h-4 w-4 mr-2 ${meetingTypes[meeting.type as keyof typeof meetingTypes].color}`
              })}
              {meeting.type}
            </div>
            <Badge variant="secondary" className={statusColors[meeting.status as keyof typeof statusColors]}>
              {meeting.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Agenda */}
      {meeting.agenda && (
        <div className="border-b pb-4">
          <h4 className="font-semibold mb-2">Agenda</h4>
          <ul className="list-disc list-inside space-y-1">
            {meeting.agenda.map((item: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Questionnaire Responses */}
      {meeting.questionnaire && (
        <div className="border-b pb-4">
          <h4 className="font-semibold mb-2">Questionnaire Responses</h4>
          <div className="space-y-2">
            {meeting.questionnaire.map((qa: any, index: number) => (
              <div key={index} className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">{qa.question}</p>
                <p className="text-sm text-muted-foreground">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes & Outcome */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold mb-2">Notes</h4>
            {onUpdate && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            )}
          </div>
          {isEditing ? (
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add meeting notes..."
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-sm text-muted-foreground">{notes || 'No notes added'}</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Outcome</h4>
          {isEditing ? (
            <Textarea
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="Add meeting outcome..."
            />
          ) : (
            <p className="text-sm text-muted-foreground">{outcome || 'No outcome recorded'}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState({
    upcoming: upcomingMeetings,
    history: meetingHistory
  })

  const handleMeetingUpdate = (updatedMeeting: any) => {
    setMeetings(prev => ({
      upcoming: prev.upcoming.map(m => m.id === updatedMeeting.id ? updatedMeeting : m),
      history: prev.history.map(m => m.id === updatedMeeting.id ? updatedMeeting : m)
    }))
  }

  return (
    <div className="container mx-auto py-10 p-2 overflow-y-scroll h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Manage your meetings and appointments</p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video Call</SelectItem>
              <SelectItem value="phone">Phone Call</SelectItem>
              <SelectItem value="in-person">In Person</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Meeting Questions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>Your scheduled meetings for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.upcoming.map((meeting) => (
                      <Card key={meeting.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={meeting.lead.avatar} />
                                <AvatarFallback>{meeting.lead.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{meeting.title}</h3>
                                <p className="text-sm text-muted-foreground">{meeting.lead.name} - {meeting.lead.company}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {meeting.date} at {meeting.time}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {meeting.duration}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-sm">
                                  {meeting.source}
                                </Badge>
                                <Avatar className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={meeting.assignedTo.avatar} />
                                  <AvatarFallback>{meeting.assignedTo.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <div className="fixed top-0 right-0 left-0 bg-background border-b p-4 z-50 flex justify-between items-start">
                                      <DialogHeader>
                                        <DialogTitle>Meeting Details</DialogTitle>
                                        <DialogDescription>
                                          Lead meeting information and details
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogClose className="absolute right-4 top-4">
                                        <X className="h-4 w-4" />
                                      </DialogClose>
                                    </div>
                                    <div className="mt-16 max-h-[calc(90vh-8rem)] overflow-y-auto p-4">
                                      <MeetingDetails meeting={meeting} onUpdate={handleMeetingUpdate} />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="sm" className="text-blue-600">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                                {React.createElement(meetingTypes[meeting.type as keyof typeof meetingTypes].icon, {
                                  className: `h-4 w-4 ${meetingTypes[meeting.type as keyof typeof meetingTypes].color}`
                                })}
                                <Badge variant="secondary" className={statusColors[meeting.status as keyof typeof statusColors]}>
                                  {meeting.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting History</CardTitle>
                  <CardDescription>Past meetings and their outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Attendee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Outcome</TableHead>
                        <TableHead>Follow-up</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {meetings.history.map((meeting) => (
                        <TableRow key={meeting.id}>
                          <TableCell className="font-medium">{meeting.title}</TableCell>
                          <TableCell>{meeting.date} {meeting.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={meeting.lead.avatar} />
                                <AvatarFallback>{meeting.lead.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{meeting.lead.name}</span>
                                <p className="text-sm text-muted-foreground">{meeting.lead.company}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {React.createElement(meetingTypes[meeting.type as keyof typeof meetingTypes].icon, {
                                className: `h-4 w-4 mr-2 ${meetingTypes[meeting.type as keyof typeof meetingTypes].color}`
                              })}
                              {meeting.type}
                            </div>
                          </TableCell>
                          <TableCell>{meeting.outcome || 'No outcome recorded'}</TableCell>
                          <TableCell>{meeting.followUpDate}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <div className="fixed top-0 right-0 left-0 bg-background border-b p-4 z-50 flex justify-between items-start">
                                  <DialogHeader>
                                    <DialogTitle>Meeting History Details</DialogTitle>
                                  </DialogHeader>
                                  <DialogClose className="absolute right-4 top-4">
                                    <X className="h-4 w-4" />
                                  </DialogClose>
                                </div>
                                <div className="mt-16 max-h-[calc(90vh-8rem)] overflow-y-auto p-4">
                                  <MeetingDetails meeting={meeting} onUpdate={handleMeetingUpdate} />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 