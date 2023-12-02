
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'



import { arrayBuffer } from 'stream/consumers'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Periskope',
  description: 'Whatsapp CRM',
}

export const revalidate  = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <body className={font.className}>

            <Sidebar >
             {children}
            </Sidebar>
        </body>
    </html>
  )
}
