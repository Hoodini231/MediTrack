"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Nurse {
  id: string
  name: string
  role: string
  unit: string
  avatar?: string
}

interface Shift {
  id: string
  nurseId: string
  day: number // 0-6 for days of week
  type: "Day" | "Night" | "Swing"
  unit: string
  startTime: string
  endTime: string
  status: "scheduled" | "in-progress" | "completed" | "vacation" | "duty"
  breaks?: {
    start: string
    end: string
    type: string
  }[]
}

export function NurseSchedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const nurses: Nurse[] = [
    {
      id: "1",
      name: "Molly Snyder",
      role: "Head Nurse",
      unit: "Cardiac Care Unit",
    },
    {
      id: "2",
      name: "Alicia Adams",
      role: "Registered Nurse",
      unit: "Cardiac Care Unit",
    },
    {
      id: "3",
      name: "Danielle Hawk",
      role: "Registered Nurse",
      unit: "Cardiac Care Unit",
    },
    {
      id: "4",
      name: "Trenton Kilroy",
      role: "Registered Nurse",
      unit: "Cardiac Care Unit",
    },
    {
      id: "5",
      name: "Adam Sampson",
      role: "Registered Nurse",
      unit: "Cardiac Care Unit",
    },
  ]

  const shifts: Shift[] = [
    {
      id: "1",
      nurseId: "1",
      day: 2,
      type: "Swing",
      unit: "Cardiac Care Unit",
      startTime: "15:00",
      endTime: "23:00",
      status: "scheduled",
      breaks: [
        {
          start: "17:00",
          end: "17:30",
          type: "Break",
        },
      ],
    },
    {
      id: "2",
      nurseId: "2",
      day: 2,
      type: "Day",
      unit: "Cardiac Care Unit",
      startTime: "07:00",
      endTime: "15:00",
      status: "vacation",
    },
    // ... more shifts
  ]

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const getShiftStyle = (shift: Shift) => {
    switch (shift.status) {
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "vacation":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "duty":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nurse Schedule</h2>
          <p className="text-gray-500">Weekly shift schedule for nursing staff</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">Week of {currentWeek.toLocaleDateString()}</div>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Shift
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 font-medium text-gray-700 border-r">Employee</div>
            {days.map((day) => (
              <div key={day} className="p-4 font-medium text-gray-700 text-center">
                {day}
              </div>
            ))}
          </div>
          <ScrollArea className="h-[600px]">
            {nurses.map((nurse) => (
              <div key={nurse.id} className="grid grid-cols-8 border-b">
                <div className="p-4 border-r">
                  <div className="font-medium">{nurse.name}</div>
                  <div className="text-sm text-gray-500">{nurse.role}</div>
                  <div className="text-sm text-gray-500">{nurse.unit}</div>
                </div>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                  const shift = shifts.find((s) => s.nurseId === nurse.id && s.day === day)
                  return (
                    <div key={day} className="p-2 relative min-h-[100px]">
                      {shift && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className={`p-2 rounded-md text-xs border ${getShiftStyle(shift)}`}>
                                <div className="font-medium">{shift.type} Shift</div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  {shift.startTime} - {shift.endTime}
                                </div>
                                <div className="text-xs mt-1">{shift.unit}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs space-y-1">
                                <div className="font-medium">{shift.type} Shift Details</div>
                                <div>
                                  Time: {shift.startTime} - {shift.endTime}
                                </div>
                                {shift.breaks?.map((break_, i) => (
                                  <div key={i}>
                                    {break_.type}: {break_.start} - {break_.end}
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

