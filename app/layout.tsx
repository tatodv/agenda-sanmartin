import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendario de San Martín',
  description: 'Calendario de actividades del Municipio de San Martín',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
