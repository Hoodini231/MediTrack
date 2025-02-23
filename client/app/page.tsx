"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid,
  LayoutList,
  Bell,
  SlidersHorizontal,
  Home,
  Calendar,
  ClipboardList,
  Settings,
  Users,
} from "lucide-react"
import { PatientCard } from "./patient-card"
import { PatientAnalytics } from "./patient-analytics"
import { NurseSchedule } from "./nurse-schedule"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Patient } from "./types"

export default function PatientMonitoring() {
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("detailed")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [sortBy, setSortBy] = useState("name")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeView, setActiveView] = useState("monitoring")

  const patients: Patient[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      room: "ICU-101",
      age: 65,
      condition: "Post-surgery",
      heartRate: 82,
      bloodPressure: "120/80",
      spO2: 98,
      temperature: 37.2,
      status: "stable",
      alerts: [
        {
          type: "preventive",
          message: "DVT prevention measures recommended",
          priority: "medium",
        },
      ],
    },
    {
      id: "2",
      name: "Robert Chen",
      room: "ICU-102",
      age: 54,
      condition: "Cardiac monitoring",
      heartRate: 95,
      bloodPressure: "135/90",
      spO2: 95,
      temperature: 37.8,
      status: "warning",
      alerts: [
        {
          type: "notification",
          message: "Patient reported increased chest pain",
          priority: "high",
        },
      ],
    },
    {
      id: "3",
      name: "Emily Davis",
      room: "ICU-103",
      age: 72,
      condition: "Respiratory distress",
      heartRate: 110,
      bloodPressure: "145/95",
      spO2: 92,
      temperature: 38.5,
      status: "critical",
      alerts: [
        {
          type: "notification",
          message: "Oxygen saturation dropping",
          priority: "high",
        },
      ],
    },
    {
      id: "4",
      name: "Michael Wong",
      room: "ICU-104",
      age: 60,
      condition: "Post-operative care",
      heartRate: 78,
      bloodPressure: "118/75",
      spO2: 97,
      temperature: 36.9,
      status: "stable",
      alerts: [],
    },
    {
      id: "5",
      name: "Lisa Thompson",
      room: "ICU-105",
      age: 48,
      condition: "Sepsis monitoring",
      heartRate: 105,
      bloodPressure: "100/60",
      spO2: 94,
      temperature: 38.2,
      status: "warning",
      alerts: [
        {
          type: "notification",
          message: "Elevated white blood cell count",
          priority: "medium",
        },
      ],
    },
  ]

  const sortedAndFilteredPatients = patients
    .filter(
      (patient) =>
        (filterStatus === "all" || patient.status === filterStatus) &&
        (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.room.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "room":
          return a.room.localeCompare(b.room)
        case "status":
          return a.status.localeCompare(b.status)
        case "heartRate":
          return b.heartRate - a.heartRate
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">MediTrack</h1>
              <nav className="hidden md:flex items-center space-x-2">
                <Button
                  variant={activeView === "monitoring" ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  onClick={() => setActiveView("monitoring")}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeView === "schedule" ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  onClick={() => setActiveView("schedule")}
                >
                  <Calendar className="h-4 w-4" />
                  Nurse Schedule
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Patient Records
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Staff
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {activeView === "monitoring" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "compact" ? "detailed" : "compact")}
                >
                  {viewMode === "compact" ? <LayoutGrid className="h-4 w-4" /> : <LayoutList className="h-4 w-4" />}
                </Button>
              )}
              <button className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeView === "monitoring" ? (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Patient Monitoring</h2>
                <p className="text-gray-500">Real-time vital signs monitoring for ICU patients</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="room">Room Number</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="heartRate">Heart Rate</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-[200px]"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div
              className={`grid gap-4 ${
                viewMode === "compact" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {sortedAndFilteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  viewMode={viewMode}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}
            </div>
          </>
        ) : activeView === "schedule" ? (
          <NurseSchedule />
        ) : null}
      </main>

      <Dialog open={selectedPatient !== null} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPatient && <PatientAnalytics patient={selectedPatient} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

