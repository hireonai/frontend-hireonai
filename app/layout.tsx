import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HireOn.AI',
  description: '',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/hireon-logo.png" sizes="any" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
