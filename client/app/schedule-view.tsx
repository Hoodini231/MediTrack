import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { ShiftAssignment, RoundNote } from "./types"

export function ScheduleView() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const currentDate = new Date()

  const shifts: ShiftAssignment[] = [
    {
      id: "1",
      employeeName: "Dr. Sarah Smith",
      role: "Primary Physician",
      unit: "Cardiac Care",
      shiftType: "Day",
      startTime: "07:00",
      endTime: "15:00",
      status: "in-progress",
    },
    {
      id: "2",
      employeeName: "Nurse Johnson",
      role: "Registered Nurse",
      unit: "Cardiac Care",
      shiftType: "Swing",
      startTime: "15:00",
      endTime: "23:00",
      status: "scheduled",
    },
  ]

  const rounds: RoundNote[] = [
    {
      id: "1",
      timestamp: "2024-02-22T09:00:00",
      patientRoom: "ICU-101",
      notes: "Morning rounds - Patient showing improvement",
      outcome: "Continue current treatment plan",
      attendees: ["Dr. Smith", "Nurse Johnson", "Dr. Chen"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Schedule & Rounds</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">Week of {currentDate.toLocaleDateString()}</div>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Staff Schedule</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Shift
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-4 text-sm">
            <div className="font-medium">Employee</div>
            {days.map((day) => (
              <div key={day} className="font-medium">
                {day}
              </div>
            ))}
          </div>
          <ScrollArea className="h-[400px] mt-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="grid grid-cols-8 gap-4 py-2 border-t text-sm">
                <div>
                  <div className="font-medium">{shift.employeeName}</div>
                  <div className="text-gray-500">{shift.role}</div>
                </div>
                {days.map((day, index) => (
                  <div key={day} className="relative">
                    {index === 2 && (
                      <div
                        className={`p-2 rounded-md text-xs ${
                          shift.status === "in-progress"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : shift.status === "completed"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : shift.status === "vacation"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                        }`}
                      >
                        <div className="font-medium">{shift.shiftType}</div>
                        <div>
                          {shift.startTime} - {shift.endTime}
                        </div>
                        <div className="text-xs mt-1">{shift.unit}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rounds & Outcomes</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Round Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {rounds.map((round) => (
              <div key={round.id} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Room {round.patientRoom}</div>
                  <div className="text-sm text-gray-500">{new Date(round.timestamp).toLocaleString()}</div>
                </div>
                <p className="text-sm mb-2">{round.notes}</p>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Outcome:</span> {round.outcome}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {round.attendees.map((attendee, index) => (
                    <Badge key={index} variant="secondary">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

