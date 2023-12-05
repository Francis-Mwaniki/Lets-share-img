import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ['latin'] })
import { Toaster } from "react-hot-toast";
import Image from 'next/image'
import { ClerkProvider } from '@clerk/nextjs'
export const metadata: Metadata = {
  title: 'Gallery Manager',
  description: 'Organize your Gallery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem  >
    
        <body className={inter.className}>
        <div className=" bg-grid relative">
        <Image
          src="grid.svg"
          alt="background"
          width={1572}
          height={1572}
          className="absolute  top-0 -z-10 text-transparent"
          
        />
      </div>
          {children}</body>
        <Toaster />
      </ThemeProvider>
      
    </html>
    </ClerkProvider>
  
  )
}
