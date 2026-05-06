import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Heart, Music2 } from 'lucide-react';

// Using high-quality Unsplash placeholders matching the aesthetic
const LetterContent = () => {
  const line1 = "Happy Graduation, sayang!";
  const line2 = "I'm so profoundly proud of the journey you've bravely navigated to get here.";
  const line3 = "Here’s to celebrating you, your victories, and the beautiful story we’ve written so far.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="pt-10 md:pt-14 px-6 md:px-10 font-serif-secondary text-charcoal absolute inset-0 flex flex-col items-center justify-start text-center space-y-5 md:space-y-6"
    >
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-base md:text-xl font-serif italic text-clay"
      >
        {line1}
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="text-sm md:text-base leading-relaxed max-w-xs md:max-w-md"
      >
        {line2}
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.5, duration: 1 }}
        className="text-sm md:text-base leading-relaxed max-w-xs md:max-w-md font-medium"
      >
        {line3}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7, duration: 0.8, type: "spring" }}
      >
        <Heart className="w-5 h-5 text-clay mx-auto mt-4" strokeWidth={1.5} fill="#C19A81" opacity={0.5} />
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  
  const envelopeRef = useRef<HTMLDivElement>(null);
  
  // Handle auto-showing the scroll arrow after letter finishes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowScrollArrow(true);
      }, 8500); // Wait for letter animation to finish
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-beige-body">
      {/* 
        ========================================================================
        HERO SECTION: The Envelope
        ========================================================================
      */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center p-4">
        
        {/* Envelope Container */}
        <motion.div 
          ref={envelopeRef}
          animate={{
            scale: showScrollArrow ? 0.75 : 1,
            y: showScrollArrow ? -40 : 0
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[340px] md:max-w-[440px] aspect-[4/3] cursor-pointer"
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* Back of envelope */}
          <div className="absolute inset-0 bg-[#E8E1D5] rounded-sm shadow-md" />
          
          {/* The Letter (Slides up when open) */}
          <motion.div
            initial={{ y: 0, zIndex: 10 }}
            animate={{ 
              y: isOpen ? "-55%" : "0%",
              zIndex: isOpen ? 30 : 10 
            }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: isOpen ? 0.5 : 0 }}
            className="absolute left-[2%] right-[2%] top-[5%] bottom-[5%] bg-beige-warm shadow-xl rounded-sm overflow-hidden border border-black/5"
            style={{ 
              boxShadow: isOpen ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' : 'none'
            }}
          >
            <div className="grain-overlay opacity-30" />
            {isOpen && <LetterContent />}
          </motion.div>
          
          {/* Flap (Top triangle) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[60%] z-20 origin-top flex"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ perspective: "1000px" }}
          >
            {/* SVG implementation of the envelope flap for cleaner borders */}
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="w-full h-full text-[#F1EBE0] drop-shadow-sm"
            >
              <polygon points="0,0 100,0 50,100" fill="currentColor" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5"/>
            </svg>
          </motion.div>
          
          {/* Envelope Front Panels */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-sm">
            {/* Left triangle */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#F5F0E6]">
              <polygon points="0,0 50,50 0,100" fill="currentColor" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/>
            </svg>
            {/* Right triangle */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#F5F0E6]">
              <polygon points="100,0 50,50 100,100" fill="currentColor" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/>
            </svg>
            {/* Bottom triangle */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#F9F4EA]">
              <polygon points="0,100 50,50 100,100" fill="currentColor" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
            </svg>
          </div>
          
          {/* Wax Seal (Disappears when opening) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-clay rounded-full shadow-lg flex items-center justify-center border-2 border-clay/80"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #d8baa5, #C19A81, #a37c62)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.1)"
                }}
              >
                <Heart className="text-white/80 w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tap Instruction */}
        <AnimatePresence>
          {!isOpen && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-24 text-sm font-sans tracking-widest uppercase text-charcoal/40 animate-pulse cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Tap to open, sayang.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollArrow && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-16 flex flex-col items-center cursor-pointer"
              onClick={handleScrollDown}
            >
              <span className="text-xs uppercase font-sans tracking-[0.2em] text-charcoal/50 mb-4">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-clay/80" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* 
        ========================================================================
        FLIPBOOK SECTION
        ========================================================================
      */}
      {isOpen && (
        <section className="min-h-screen relative py-20 px-4 md:px-12 max-w-5xl mx-auto z-10 bg-beige-body flex flex-col items-center justify-center">
          <div className="text-center mb-16 md:mb-20 w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="font-serif text-3xl md:text-5xl text-charcoal mb-4"
            >
              Our Story
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "60px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[1px] bg-clay mx-auto"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full relative shadow-2xl rounded-sm overflow-hidden border border-clay/20 bg-white"
          >
            <iframe 
              allowFullScreen={true}
              allow="clipboard-write" 
              scrolling="no" 
              className="w-full h-[450px] sm:h-[500px] md:h-[700px] bg-transparent" 
              src="https://heyzine.com/flip-book/fb6b25a805.html" 
              style={{ border: 'none' }}
              title="Graduation Flipbook"
            ></iframe>
          </motion.div>
        
          {/* QUOTE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mt-32 md:mt-48 mb-20 text-center px-4 w-full"
          >
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-charcoal/80 leading-relaxed md:leading-loose">
              "How lucky am I to have something so special,<br className="hidden md:block" /> that makes saying goodbye so hard."
            </p>
          </motion.div>
        </section>
      )}

      {/* 
        ========================================================================
        SPOTIFY WIDGET (Floating)
        ========================================================================
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 0.6, y: 0, scale: 0.85 }}
            whileHover={{ scale: 0.95, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-2 md:bottom-4 right-2 md:right-4 z-50 origin-bottom-right"
          >
            <div className="relative rounded-2xl shadow-lg border border-clay/20 overflow-hidden bg-beige-warm/50 backdrop-blur-sm" style={{ width: '260px', height: '80px' }}>
              <iframe 
                style={{ borderRadius: '16px' }} 
                src="https://open.spotify.com/embed/track/6v5RJuJ9yhvaXkMXMeMZBw?utm_source=generator&theme=0&autoplay=1" 
                width="100%" 
                height="80" 
                frameBorder="0" 
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Romantic Spotify Playlist"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background overall grain */}
      <div className="grain-overlay opacity-20 fixed inset-0 z-0 pointer-events-none mix-blend-multiply hidden md:block"></div>
    </div>
  );
}
