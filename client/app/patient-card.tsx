import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { ECGMonitor } from "./ecg-monitor"
import type { Patient } from "./types"

interface PatientCardProps {
  patient: Patient
  viewMode: "compact" | "detailed"
  onClick: () => void
}

export function PatientCard({ patient, viewMode, onClick }: PatientCardProps) {
  const hasHighPriorityAlert = patient.alerts?.some((alert) => alert.priority === "high")

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        patient.status === "critical"
          ? "border-red-500/50"
          : patient.status === "warning"
            ? "border-yellow-500/50"
            : "border-green-500/50"
      }`}
      onClick={onClick}
    >
      <CardContent className={`${viewMode === "compact" ? "p-4" : "p-6"}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{patient.name}</h3>
              {hasHighPriorityAlert && <AlertCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="text-sm text-gray-500">
              Room {patient.room} • Age {patient.age}
            </div>
          </div>
          <div
            className={`flex h-2 w-2 rounded-full ${
              patient.status === "critical"
                ? "animate-pulse bg-red-500"
                : patient.status === "warning"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
          />
        </div>

        {viewMode === "compact" ? (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-24">
                <div className="text-xs text-gray-500">Heart Rate</div>
                <div className="font-medium">{patient.heartRate} bpm</div>
              </div>
              <div className="flex-1 h-8">
                <ECGMonitor status={patient.status} compact />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Blood Pressure</div>
              <div className="font-medium">{patient.bloodPressure}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">SpO2</div>
              <div className="font-medium">{patient.spO2}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Temperature</div>
              <div className="font-medium">{patient.temperature}°C</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ECGMonitor status={patient.status} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Heart Rate</div>
                <div className="text-xl font-medium">{patient.heartRate} bpm</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Blood Pressure</div>
                <div className="text-xl font-medium">{patient.bloodPressure}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">SpO2</div>
                <div className="text-xl font-medium">{patient.spO2}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="text-xl font-medium">{patient.temperature}°C</div>
              </div>
            </div>
          </div>
        )}

        {patient.alerts && patient.alerts.length > 0 && (
          <div className="mt-4 space-y-2">
            {patient.alerts.map((alert, index) => (
              <div
                key={index}
                className={`text-xs rounded-md px-2 py-1 ${
                  alert.priority === "high"
                    ? "bg-red-50 text-red-700"
                    : alert.priority === "medium"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-blue-50 text-blue-700"
                }`}
              >
                {alert.message}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

