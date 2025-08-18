"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { InvestmentIcon } from "@/components/ui/investment-icon"
import { cn } from "@/lib/utils"

const calculators = [
  {
    title: "複利計算機",
    href: "/compound",
    description: "複利の力を活用した投資シミュレーション",
    available: true,
  },
  {
    title: "つみたてNISA計算機",
    href: "/nisa",
    description: "年間120万円の投資枠を活用した20年間の資産形成シミュレーション",
    available: false,
  },
  {
    title: "iDeCo計算機",
    href: "/ideco",
    description: "職業別拠出上限と節税効果を考慮した老後資産形成プラン",
    available: false,
  },
  {
    title: "住宅ローン計算機",
    href: "/loan",
    description: "月々返済額と繰り上げ返済シミュレーション",
    available: false,
  },
]

const ListItem = ({ 
  className, 
  title, 
  children, 
  href, 
  available = true
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
  available?: boolean
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {available ? (
          <Link
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-50 focus:text-blue-900",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        ) : (
          <div
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none opacity-50 cursor-not-allowed",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title} (準備中)</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        )}
      </NavigationMenuLink>
    </li>
  )
}

interface HeaderProps {
  bgColor?: string
  textColor?: string
  className?: string
}

export function Header({ 
  bgColor = "!bg-blue-600", 
  textColor = "!text-white",
  className 
}: HeaderProps = {}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-blue-700/40",
      bgColor,
      textColor,
      className
    )}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="ml-2 mr-6 flex items-center space-x-2">
            <InvestmentIcon size={28} />
            <span className="hidden font-bold sm:inline-block">
              投資かんたん計算
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList className="bg-transparent">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-white/20 focus:bg-white/20 bg-transparent",
                    textColor
                  )}>
                    ホーム
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "hover:!bg-white/20 focus:!bg-white/20 !bg-transparent data-[state=open]:!bg-white/20",
                  textColor
                )}>計算機</NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-white !text-gray-900">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] !bg-white">
                    {calculators.map((calculator) => (
                      <ListItem
                        key={calculator.title}
                        title={calculator.title}
                        href={calculator.href}
                        available={calculator.available}
                      >
                        {calculator.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>              
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              className={cn(
                "mr-2 px-0 text-base hover:bg-white/20 focus-visible:bg-white/20 focus-visible:ring-0 focus-visible:ring-offset-0",
                textColor
              )}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
            <div className="flex items-center space-x-2 pb-4">
              <InvestmentIcon size={24} />
              <span className="font-bold">投資かんたん計算</span>
            </div>
            
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  ホーム
                </Link>
                
                <div className="flex flex-col space-y-3">
                  <h4 className="font-medium">計算機</h4>
                  {calculators.map((calculator) => (
                    <Link
                      key={calculator.title}
                      href={calculator.available ? calculator.href : "#"}
                      className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === calculator.href
                          ? "text-foreground"
                          : "text-foreground/60",
                        !calculator.available && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => calculator.available && setIsOpen(false)}
                    >
                      {calculator.title}
                      {!calculator.available && " (準備中)"}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}