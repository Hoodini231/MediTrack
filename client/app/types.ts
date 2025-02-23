export interface Patient {
    id: string
    name: string
    room: string
    age: number
    condition: string
    heartRate: number
    bloodPressure: string
    spO2: number
    temperature: number
    status: "stable" | "warning" | "critical"
    alerts?: {
      type: "preventive" | "notification"
      message: string
      priority: "low" | "medium" | "high"
    }[]
  }
  
  export interface ShiftAssignment {
    id: string
    employeeName: string
    role: string
    unit: string
    shiftType: "Day" | "Night" | "Swing"
    startTime: string
    endTime: string
    status: "scheduled" | "in-progress" | "completed" | "vacation"
  }
  
  export interface RoundNote {
    id: string
    timestamp: string
    patientRoom: string
    notes: string
    outcome: string
    attendees: string[]
  }
  
  