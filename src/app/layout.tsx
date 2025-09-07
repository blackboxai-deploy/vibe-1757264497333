import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MarbleCraft Pro - Professional Marble Installation Services',
  description: 'Expert marble installation services for flooring, countertops, walls, and more. Get instant quotes, choose designs, and book appointments with certified professionals.',
  keywords: 'marble installation, marble flooring, marble countertops, marble walls, construction services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <span className="text-primary-foreground font-bold text-lg">M</span>
                  </div>
                  <span className="hidden font-bold sm:inline-block">
                    MarbleCraft Pro
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/services"
                  >
                    Services
                  </a>
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/designs"
                  >
                    Designs
                  </a>
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/calculator"
                  >
                    Calculator
                  </a>
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/book"
                  >
                    Book Now
                  </a>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  {/* Search functionality can be added here */}
                </div>
                <nav className="flex items-center">
                  <a
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    href="/profile"
                  >
                    My Account
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-primary-foreground font-bold text-lg">M</span>
                </div>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with precision and craftsmanship. © 2024 MarbleCraft Pro. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground">Privacy</a>
                <a href="/terms" className="hover:text-foreground">Terms</a>
                <a href="/contact" className="hover:text-foreground">Contact</a>
                <span className="font-medium">📞 1-800-MARBLE-1</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}