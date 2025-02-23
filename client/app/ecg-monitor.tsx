"use client"

import { useEffect, useRef } from "react"

interface ECGMonitorProps {
  status: "stable" | "warning" | "critical"
  compact?: boolean
}

export function ECGMonitor({ status, compact = false }: ECGMonitorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // ECG wave parameters
    const amplitude = compact ? 15 : 30
    const frequency = 1
    const phase = 0
    const width = canvas.width
    const height = canvas.height

    // Generate points for the ECG wave
    const generatePoints = () => {
      const newPoints = []
      for (let x = 0; x < width; x++) {
        const t = (x / width) * 2 * Math.PI * frequency + phase
        let y = Math.sin(t) * amplitude

        // Add the characteristic ECG spike
        if (t % (2 * Math.PI) < 0.2) {
          y = -amplitude * 2
        } else if (t % (2 * Math.PI) < 0.3) {
          y = amplitude * 3
        }

        newPoints.push(y)
      }
      return newPoints
    }

    // Animation frame
    let animationFrameId: number
    let offset = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.strokeStyle = status === "critical" ? "#ef4444" : status === "warning" ? "#eab308" : "#22c55e"
      ctx.lineWidth = 2

      const points = generatePoints()
      points.forEach((y, x) => {
        const drawX = (x + offset) % width
        const drawY = height / 2 + y
        if (x === 0) {
          ctx.moveTo(drawX, drawY)
        } else {
          ctx.lineTo(drawX, drawY)
        }
      })

      ctx.stroke()
      offset = (offset + 1) % width
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [status, compact])

  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-200 bg-white ${compact ? "h-8" : "h-24"}`}>
      <canvas ref={canvasRef} width={400} height={compact ? 32 : 96} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

