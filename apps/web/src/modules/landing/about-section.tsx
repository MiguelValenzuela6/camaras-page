"use client"

import { useEffect, useState } from "react"

const images = [
  "/placeholder.svg?height=800&width=1600",
  "/placeholder.svg?height=800&width=1600",
  "/placeholder.svg?height=800&width=1600",
  "/placeholder.svg?height=800&width=1600",
]

export function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0,
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Photography slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-12 md:px-8 md:py-16 lg:px-16">
        {/* Header */}
        <div className="w-full max-w-7xl text-center">
          <h1 className="font-unbounded text-balance font-black uppercase leading-tight tracking-tight text-cyan-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Las mejores fotos & los mejores fotógrafos
          </h1>
          <p className="mt-4 text-lg font-bold uppercase tracking-wider text-white sm:text-xl md:mt-6 md:text-2xl">
            En un solo lugar
          </p>
        </div>

        {/* Quote - Removed border/background box, increased top margin for more separation */}
        <div className="mt-16 w-full max-w-3xl px-4 text-center md:mt-24 lg:mt-32">
          <blockquote className="text-balance italic text-white text-base sm:text-lg md:text-xl lg:text-2xl">
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere iste aperiam est. Corporis, nostrum. Nobis
            quidem sed iste rem incidunt, minima ab molestiae tenetur beatae, officia harum, sapiente hic voluptatum."
          </blockquote>
          <p className="mt-6 font-semibold text-white text-sm sm:text-base md:mt-8 md:text-lg">-Dalai Lama</p>
        </div>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </section>
  )
}
