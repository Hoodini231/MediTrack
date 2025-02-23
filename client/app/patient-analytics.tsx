"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Pill, Brain, AlertCircle, Plus } from "lucide-react"
import { VitalSignChart } from "./vital-sign-chart"

interface Patient {
  id: string
  name: string
  room: string
  age: number
  condition: string
  status: "stable" | "warning" | "critical"
  heartRate: number
  bloodPressure: string
  spO2: number
  temperature: number
}

interface MedicationEvent {
  id: string
  timestamp: string
  medication: string
  dosage: string
  administeredBy: string
}

interface ClinicalNote {
  id: string
  timestamp: string
  category: "Observation" | "Assessment" | "Intervention"
  note: string
  author: string
}

interface AIInsight {
  id: string
  type: "medication" | "preventive" | "risk" | "treatment"
  title: string
  description: string
  priority: "low" | "medium" | "high"
}

interface PatientAnalyticsProps {
  patient: Patient
}

interface HistoricalData {
  timestamp: string
  heartRate: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  spO2: number
  temperature: number
}

export function PatientAnalytics({ patient }: PatientAnalyticsProps) {
  const [medicationEvents, setMedicationEvents] = useState<MedicationEvent[]>([
    {
      id: "1",
      timestamp: "2024-02-22T08:30:00",
      medication: "Morphine",
      dosage: "5mg",
      administeredBy: "Dr. Smith",
    },
    {
      id: "2",
      timestamp: "2024-02-22T06:00:00",
      medication: "Amoxicillin",
      dosage: "500mg",
      administeredBy: "Nurse Johnson",
    },
  ])

  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([
    {
      id: "1",
      timestamp: "2024-02-22T09:15:00",
      category: "Assessment",
      note: "Patient reports mild discomfort in lower abdomen. Vital signs stable. Incision site shows good healing progress.",
      author: "Dr. Williams",
    },
    {
      id: "2",
      timestamp: "2024-02-22T07:30:00",
      category: "Observation",
      note: "Patient slept well through the night. Morning medications administered on schedule. Good appetite at breakfast.",
      author: "Nurse Chen",
    },
  ])

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "medication",
      title: "Medication Interaction Alert",
      description: "Potential interaction between current pain management and antibiotics. Monitor liver function.",
      priority: "medium",
    },
    {
      id: "2",
      type: "preventive",
      title: "DVT Prevention",
      description:
        "Recommend increasing position changes and considering compression stockings due to limited mobility.",
      priority: "high",
    },
    {
      id: "3",
      type: "risk",
      title: "Fall Risk Assessment",
      description: "Current medications may increase dizziness. Implement additional fall precautions.",
      priority: "medium",
    },
  ])

  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])

  useEffect(() => {
    // Generate 24 hours of historical data
    const data: HistoricalData[] = []
    const now = new Date()
    for (let i = 24; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 3600000).toISOString()
      data.push({
        timestamp,
        heartRate: patient.heartRate + Math.random() * 10 - 5,
        bloodPressureSystolic: Number.parseInt(patient.bloodPressure.split("/")[0]) + Math.random() * 10 - 5,
        bloodPressureDiastolic: Number.parseInt(patient.bloodPressure.split("/")[1]) + Math.random() * 10 - 5,
        spO2: patient.spO2 + Math.random() * 4 - 2,
        temperature: patient.temperature + Math.random() * 0.4 - 0.2,
      })
    }
    setHistoricalData(data)
  }, [patient])

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-12 w-12 text-gray-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
          <div className="text-sm text-gray-500">
            Room {patient.room} • Age {patient.age} • {patient.condition}
          </div>
          <Badge
            variant={
                patient.status === "critical"
                ? "destructive"
                : patient.status === "warning"
                ? "secondary" // Map "warning" to "secondary"
                : "default"   // Map "success" to "default"
            }
            className="mt-2"
            >
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
            </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vital Signs Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Heart Rate</div>
                <div className="text-2xl font-bold">
                  {patient.heartRate} <span className="text-sm font-normal">bpm</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Blood Pressure</div>
                <div className="text-2xl font-bold">
                  {patient.bloodPressure} <span className="text-sm font-normal">mmHg</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">SpO2</div>
                <div className="text-2xl font-bold">{patient.spO2}%</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Temperature</div>
                <div className="text-2xl font-bold">{patient.temperature}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[120px]">
              {aiInsights
                .filter((insight) => insight.priority === "high")
                .map((insight) => (
                  <div key={insight.id} className="flex items-start gap-2 mb-2">
                    {insight.type === "medication" ? (
                      <Pill className="h-4 w-4 mt-1" />
                    ) : insight.type === "preventive" ? (
                      <Brain className="h-4 w-4 mt-1" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mt-1" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{insight.title}</div>
                      <div className="text-sm text-gray-500">{insight.description}</div>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList>
          <TabsTrigger value="vitals">Vital Trends</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
          <TabsTrigger value="insights">All AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <VitalSignChart
              title="Heart Rate"
              data={historicalData}
              dataKey="heartRate"
              unit="bpm"
              stroke="hsl(142, 76%, 36%)"
              domain={[40, 180]}
            />
            <VitalSignChart
              title="Blood Pressure"
              data={historicalData}
              dataKey="bloodPressureSystolic"
              unit="mmHg"
              stroke="hsl(142, 76%, 36%)"
              domain={[60, 200]}
            />
            <VitalSignChart
              title="Oxygen Saturation"
              data={historicalData}
              dataKey="spO2"
              unit="%"
              stroke="hsl(201, 96%, 32%)"
              domain={[85, 100]}
            />
            <VitalSignChart
              title="Temperature"
              data={historicalData}
              dataKey="temperature"
              unit="°C"
              stroke="hsl(342, 89%, 48%)"
              domain={[35, 42]}
            />
          </div>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Medication Timeline</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {medicationEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start mb-4">
                    <div className="flex-shrink-0 w-12 text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 mr-2" />
                        <span className="font-medium">{event.medication}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.dosage} - Administered by {event.administeredBy}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Clinical Notes</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {clinicalNotes.map((note) => (
                  <div key={note.id} className="mb-4 pb-4 border-b last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{note.category}</Badge>
                      <div className="text-sm text-gray-500">{new Date(note.timestamp).toLocaleString()}</div>
                    </div>
                    <p className="text-sm mb-2">{note.note}</p>
                    <div className="text-sm text-gray-500">Recorded by: {note.author}</div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {insight.type === "medication" ? (
                      <Pill className="h-4 w-4" />
                    ) : insight.type === "preventive" ? (
                      <Brain className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                  <Badge
                    variant={
                        insight.priority === "high"
                        ? "destructive"
                        : insight.priority === "medium"
                            ? "secondary" // Map "warning" to "secondary"
                            : "default"   // Map "low" to "default"
                    }
                    className="mt-2"
                    >
                        {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                    </Badge>

                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

