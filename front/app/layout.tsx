import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevTrend',
  description: '毎日6時/18時の2回更新。最新のトレンドや技術情報をチェックできます。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='jp'>
      <head>
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@ma_me' />
        <meta name='twitter:title' content='ZennとQiitaのトレンドを日単位で纏めています。' />
        <meta
          name='twitter:description'
          content='毎日6時/18時の2回更新。最新のトレンドや技術情報をチェックできます。'
        />
        <meta name='twitter:image' content='https://devportal-phi.vercel.app/trend-thumbnail.png' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
