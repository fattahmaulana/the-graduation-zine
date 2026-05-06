import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Heart, Pause, Play } from 'lucide-react';

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

// ============================================================
// MUSIC PLAYER COMPONENT
// ============================================================
function MusicPlayer({ isOpen }: { isOpen: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Auto-play once the envelope is opened (user has interacted with the page)
  useEffect(() => {
    if (isOpen && !hasStarted) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
        // Fade in gently
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol = Math.min(vol + 0.05, 0.7);
          audio.volume = vol;
          if (vol >= 0.7) clearInterval(fadeIn);
        }, 100);
        // Show tooltip briefly
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3500);
      }).catch(() => {
        // Autoplay blocked — user can click manually
      });
    }
  }, [isOpen, hasStarted]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  }, [isPlaying]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/ini-abadi.mp3"
        loop
        preload="auto"
      />

      {/* Floating Music Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          >
            {/* Song Info Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 bg-beige-warm/90 backdrop-blur-md border border-clay/20 rounded-2xl px-4 py-2.5 shadow-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-charcoal leading-tight">Ini Abadi</span>
                    <span className="text-[10px] text-charcoal/50 leading-tight">Perunggu</span>
                  </div>
                  {/* Animated sound bars */}
                  <div className="flex items-end gap-0.5 h-4 ml-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-clay rounded-full"
                        animate={isPlaying ? {
                          height: ['6px', '14px', '4px', '12px', '6px'],
                        } : { height: '4px' }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
              onClick={toggle}
              onHoverStart={() => setShowTooltip(true)}
              onHoverEnd={() => setShowTooltip(false)}
              whileTap={{ scale: 0.9 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #d8baa5, #C19A81, #a37c62)',
                boxShadow: '0 4px 20px rgba(193, 154, 129, 0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
              }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {/* Pulse ring when playing */}
              {isPlaying && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-clay/40"
                    animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border border-clay/30"
                    animate={{ scale: [1, 1.8, 2.2], opacity: [0.4, 0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  />
                </>
              )}

              {/* Vinyl spinning disc */}
              <motion.div
                className="absolute inset-1.5 rounded-full bg-charcoal/80 flex items-center justify-center"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
              >
                <div className="w-3 h-3 rounded-full bg-beige-warm/80" />
              </motion.div>

              {/* Play/Pause icon overlay */}
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Pause className="w-4 h-4 text-white/0" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 text-white drop-shadow-sm" fill="white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
        FLOATING MUSIC PLAYER
        ========================================================================
      */}
      <MusicPlayer isOpen={isOpen} />
      
      {/* Background overall grain */}
      <div className="grain-overlay opacity-20 fixed inset-0 z-0 pointer-events-none mix-blend-multiply hidden md:block"></div>
    </div>
  );
}
