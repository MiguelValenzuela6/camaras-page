"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function TeamSection() {
  const [showCards, setShowCards] = useState(false);

  const text = "ESTE ES NUESTRO EQUIPO DE FOTOGRAFOS";
  const delay = 0.15;

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: -30,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1.2,
      },
    },
  };

  const cardsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: -40,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1.0,
      },
    },
  };

  const cards = [
    {
      title: "Diseño Web",
      subtitle: "Experiencias digitales únicas",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Design+2",
        "/placeholder.svg?height=200&width=300&text=Design+3",
      ],
    },
    {
      title: "Desarrollo",
      subtitle: "Código limpio y eficiente",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Code+2",
        "/placeholder.svg?height=200&width=300&text=Code+3",
      ],
    },
    {
      title: "Marketing",
      subtitle: "Estrategias que funcionan",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Marketing+2",
        "/placeholder.svg?height=200&width=300&text=Marketing+3",
      ],
    },
    {
      title: "Consultoría",
      subtitle: "Soluciones personalizadas",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Consulting+2",
        "/placeholder.svg?height=200&width=300&text=Consulting+3",
      ],
    },
  ];

  return (
    <>
      <div className="px-4 sm:px-10 lg:px-24 py-12 sm:py-20">
        <div className="max-w-9xl mx-auto ">
          {/* Texto animado grande y responsivo */}
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] mb-16 sm:mb-24">
            <div className="px-4 p-8 sm:p-14 md:p-20 w-full max-w-5xl flex items-center justify-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                onViewportEnter={() => setShowCards(true)}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={wordVariants}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-unbounded text-primary-blue inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Cards responsivas y tipo retrato */}
          {showCards && (
            <motion.div
              variants={cardsVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16 lg:gap-x-8 lg:gap-y-12 xl:gap-x-12 xl:gap-y-16"
            >
              {cards.map((card, index) => (
                <Card key={index} card={card} variants={cardVariants} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

function Card({ card, variants }: { card: any; variants: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    let imageIndex = 1;
    setCurrentImageIndex(imageIndex);

    const interval = setInterval(() => {
      imageIndex = imageIndex + 1;
      if (imageIndex >= card.images.length) {
        imageIndex = 1;
      }
      setCurrentImageIndex(imageIndex);
    }, 1000);

    (document.activeElement as any).imageInterval = interval;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
    if ((document.activeElement as any).imageInterval) {
      clearInterval((document.activeElement as any).imageInterval);
    }
  };

  return (
    <motion.div
      variants={variants}
      className="rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={card.images[currentImageIndex]}
          alt={card.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
            {card.title}
          </h3>
          <p className="text-white/90 text-base sm:text-lg lg:text-xl drop-shadow-md leading-tight mb-6">
            {card.subtitle}
          </p>

          {/* Botones */}
          <div className="flex flex-row gap-3">
            <button
              type="button"
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white/20 text-white text-sm sm:text-base font-medium hover:bg-white/30 transition-colors backdrop-blur-sm flex-1"
            >
              ACERCA DE MI
            </button>
            <button
              type="button"
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#00FFF0] text-black text-sm sm:text-base font-medium hover:bg-[#00FFF0]/90 transition-colors flex-1"
            >
              AGENDA CONMIGO
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
