'use client'

import * as React from "react"
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Activity = {
  id: string
  title: string
  date: Date
  category: string
  imageUrl: string
}

export default function CalendarComponent() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [activities, setActivities] = React.useState<Activity[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  React.useEffect(() => {
    const fetchActivities = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockActivities: Activity[] = [
        { id: "1", title: "Concierto en el Parque", date: new Date(2024, 9, 15), category: "Shows", imageUrl: "/placeholder.svg?height=1080&width=1080" },
        { id: "2", title: "Taller de Pintura", date: new Date(2024, 9, 18), category: "Actividades Culturales", imageUrl: "/placeholder.svg?height=1080&width=1080" },
        { id: "3", title: "Maratón Municipal", date: new Date(2024, 9, 20), category: "Deportes", imageUrl: "/placeholder.svg?height=1080&width=1080" },
        { id: "4", title: "Cine al Aire Libre", date: new Date(2024, 9, 22), category: "Cine", imageUrl: "/placeholder.svg?height=1080&width=1080" },
        { id: "5", title: "Curso de Primeros Auxilios", date: new Date(2024, 9, 25), category: "Capacitaciones", imageUrl: "/placeholder.svg?height=1080&width=1080" },
      ]
      
      setActivities(mockActivities)
    }
    
    fetchActivities()
  }, [])

  const filteredActivities = selectedCategory === "all" 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory)

  const renderDay = (day: Date) => {
    const dayActivities = filteredActivities.filter(activity => 
      activity.date.getDate() === day.getDate() &&
      activity.date.getMonth() === day.getMonth() &&
      activity.date.getFullYear() === day.getFullYear()
    )

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={dayActivities.length > 0 ? "default" : "ghost"}
            className={`h-9 w-9 p-0 font-normal ${dayActivities.length > 0 ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
          >
            <time dateTime={format(day, "yyyy-MM-dd")}>
              {format(day, "d")}
            </time>
          </Button>
        </PopoverTrigger>
        {dayActivities.length > 0 && (
          <PopoverContent className="w-80">
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              {dayActivities.map((activity) => (
                <div key={activity.id} className="mb-4">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.category}</p>
                  <img 
                    src={activity.imageUrl} 
                    alt={activity.title} 
                    className="mt-2 rounded-md"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </ScrollArea>
          </PopoverContent>
        )}
      </Popover>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Calendario de Actividades - Municipio de San Martín</h1>
      <Select onValueChange={(value) => setSelectedCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          <SelectItem value="Actividades Culturales">Actividades Culturales</SelectItem>
          <SelectItem value="Cine">Cine</SelectItem>
          <SelectItem value="Deportes">Deportes</SelectItem>
          <SelectItem value="Shows">Shows</SelectItem>
          <SelectItem value="Capacitaciones">Capacitaciones</SelectItem>
        </SelectContent>
      </Select>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={es}
        className="rounded-md border shadow"
        components={{
          Day: ({ day, ...props }) => renderDay(day)
        }}
      />
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(activities.map(a => a.category))).map(category => (
          <Badge key={category} variant="secondary">{category}</Badge>
        ))}
      </div>
    </div>
  )
}
