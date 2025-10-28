"use client";

import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@camaras/ui/src/components/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@camaras/ui/src/lib/utils";
import { authClient } from "@camaras/auth/client";
import Link from "next/link";
import { X, Menu } from "lucide-react";

const links = [
  {
    name: "INICIO",
    href: "/",
  },
  {
    name: "GALERIA",
    href: "/galeria",
  },
  {
    name: "NOSOTROS",
    href: "/nosotros",
  },
  {
    name: "CONTACTO",
    href: "/contacto",
  },
  {
    name: "AGENDA",
    href: "/agenda",
  },
];

// hook para manejar el comportamiento al hacer scroll del nav
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      // Only update if the scroll is more than 10px
      if (Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      setScrollPosition(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return { scrollDirection, scrollPosition };
}

// Componente para el efecto hover de los links en desktop
const AnimatedLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative overflow-hidden  h-6 flex items-center"
    >
      <motion.div
        className="font-unbounded font-semibold text-white cursor-pointer"
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: { y: -24 },
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="block text-white transition-transform duration-100 ease-out leading-6">
          {children}
        </span>
        <span className="absolute top-6 left-0 block text-primary-foreground transition-transform duration-100 ease-out leading-6">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export function Navbar() {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
   const { scrollDirection, scrollPosition } = useScrollDirection();

  const role = session?.user?.role;

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserDashboardLink = () => {
    if (role === "admin") return "/admin";
    if (role === "photographer") return "/photographer";
    if (role === "user") return "/user";
    return "/user";
  };

    // Add this effect to handle auto-closing
  useEffect(() => {
    if (scrollDirection === "down" && scrollPosition > 50) {
      setIsDesktopMenuOpen(false);
    } else if (scrollDirection === "up" && scrollPosition < 50) {
      setIsDesktopMenuOpen(true);
    }
  }, [scrollDirection, scrollPosition]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={cn(
        "fixed z-50 top-0 left-0 right-0 m-2 hidden lg:block",
        "transition-transform duration-300 mx-auto max-w-7xl",
        scrollDirection === "down" && scrollPosition > 50 ? "-translate-y-24" : "translate-y-0"
      )}>
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center bg-primary-blue">
            {/* Botón de menú desktop */}
            <Button 
              onClick={toggleDesktopMenu} 
              variant="landing"
              className="font-unbounded"
            >
              MENU
            </Button>

            {/* Contenedor de links con animación */}
            <div className="flex items-center h-full">
              <AnimatePresence mode="wait">
                {isDesktopMenuOpen && (
                  <motion.div
                    initial={{
                      width: 0,
                      opacity: 0,
                    }}
                    animate={{
                      width: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      width: { duration: 0.3 },
                      opacity: { duration: 0.15 },
                    }}
                    className="flex items-center gap-8 overflow-hidden ml-6 pr-4"
                  >
                    {links.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                        className="flex items-center"
                      >
                        <AnimatedLink href={link.href}>
                          {link.name}
                        </AnimatedLink>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Auth Button */}
          {session ? (
            <Link
              href={getUserDashboardLink()}
              className={cn(
                buttonVariants({
                  variant: "landing",
                }),
                "font-unbounded"
              )}
            >
              {session.user?.name?.toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/auth"
              className={cn(
                buttonVariants({
                  variant: "landing",
                }),
                "font-unbounded"
              )}
            >
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed z-50 top-0 left-0 right-0 m-4 lg:hidden">
        <div className="flex justify-between items-center h-12 backdrop-blur-md rounded-lg px-4">
          <Link 
            href="/" 
            className="font-unbounded font-semibold text-white text-lg tracking-tighter"
          >
            LCDD
          </Link>
          
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md lg:hidden"
            onClick={closeMobileMenu}
          >
            <div className="flex flex-col h-full"
              onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer click en el contenido
              onKeyDown={(e) => e.stopPropagation()} // Prevenir cierre al presionar teclas en el contenido
            >
              {/* Mobile Header */}
              <div className="flex justify-between items-center p-6 pt-8">
                <Link 
                  href="/" 
                  className="font-unbounded font-semibold text-xl tracking-tighter"
                  onClick={closeMobileMenu}
                >
                  LCDD
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="relative overflow-hidden"
                >
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                </Button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 flex flex-col justify-center px-6">
              <motion.ul 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {links.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.1 + index * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        className="font-unbounded text-3xl font-semibold tracking-tighter hover:text-muted-foreground transition-colors block"
                        onClick={closeMobileMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Mobile Auth Button */}
              <motion.div 
                className="p-6 pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {session ? (
                  <Link
                    href={getUserDashboardLink()}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full text-center font-unbounded"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {session.user?.name?.toUpperCase()}
                  </Link>
                ) : (
                  <Link
                    href="/auth"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full text-center font-unbounded"
                    )}
                    onClick={closeMobileMenu}
                  >
                    INICIAR SESIÓN
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}