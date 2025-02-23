interface VitalSignsProps {
    heartRate: number
    bloodPressure: string
    spO2: number
    temperature: number
  }
  
  export function VitalSigns({ heartRate, bloodPressure, spO2, temperature }: VitalSignsProps) {
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Heart Rate</div>
          <div className="text-xl font-bold text-gray-900">{heartRate}</div>
          <div className="text-xs text-gray-400">BPM</div>
        </div>
        <div>
          <div className="text-gray-500">Blood Pressure</div>
          <div className="text-xl font-bold text-gray-900">{bloodPressure}</div>
          <div className="text-xs text-gray-400">mmHg</div>
        </div>
        <div>
          <div className="text-gray-500">SpO2</div>
          <div className="text-xl font-bold text-gray-900">{spO2}%</div>
          <div className="text-xs text-gray-400">Oxygen</div>
        </div>
        <div>
          <div className="text-gray-500">Temperature</div>
          <div className="text-xl font-bold text-gray-900">{temperature}°C</div>
          <div className="text-xs text-gray-400">Celsius</div>
        </div>
      </div>
    )
  }
  
  