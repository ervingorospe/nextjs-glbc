import './globals.css'
import { Header, Footer, CookieCard } from '@/components/layouts'
import { HtmlHead } from '@/app/layouts'

export const metadata = {
  title: 'Greater Louisiana Baptist Convention - Baton Rouge, Louisiana',
  description: 'Greater Louisiana Baptist Convention - Baton Rouge, Louisiana',
}

export const dynamicParams = false

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HtmlHead/>

      <body className="antialiased">
        <div>
          <Header/>
          
          <main>
            {children}
          </main>

          <Footer/>

          {/* mobile action button */}
          {/* {
            (actionButtons.length > 0 && !_.get(pageContent, 'fields.hideCallToActionSections') && actionBtn) && (
              <MobileActionButton actionButton={actionBtn} show={showActionBtn}/>
            )
          } */}

          <CookieCard/>
        </div>
      </body>
    </html>
  )
}
