import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronDown, Instagram, Menu, MoveRight, Play, X } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const logo = '/images/brand/51296d65-1b6e-4249-bacd-886e6302fad1.jpg';
const whatsappNumber = '918755150917';
const whatsapp = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const images = {
  hero: 'https://images.pexels.com/photos/13849055/pexels-photo-13849055.jpeg?auto=compress&cs=tinysrgb&w=1800',
  about: 'https://images.pexels.com/photos/30858413/pexels-photo-30858413.jpeg?auto=compress&cs=tinysrgb&w=1100',
  home: 'https://images.pexels.com/photos/36764972/pexels-photo-36764972.jpeg?auto=compress&cs=tinysrgb&w=1600',
  practice: 'https://images.pexels.com/photos/4398643/pexels-photo-4398643.jpeg?auto=compress&cs=tinysrgb&w=1100',
  mountain: 'https://images.pexels.com/photos/32132398/pexels-photo-32132398.jpeg?auto=compress&cs=tinysrgb&w=1800',
  calm: 'https://images.pexels.com/photos/26382826/pexels-photo-26382826.jpeg?auto=compress&cs=tinysrgb&w=900',
};

const generalMessage = 'Hi Ananta Yog Asram, I would like to know more about your yoga classes.';

const LazyScene = lazy(() => import('./Scene.tsx'));

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`image-reveal ${className}`}><motion.img src={src} alt={alt} initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} /></div>;
}

const navItems = [{ label: 'About', id: 'about' }, { label: 'Classes', id: 'classes' }, { label: 'Home Yoga', id: 'home-yoga' }, { label: 'Online', id: 'online' }, { label: 'Schedule', id: 'schedule' }];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [activeClass, setActiveClass] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.12]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const classes = [
    ['Weight loss yoga', 'A steady, intelligent practice for a lighter, more energized body.', images.practice],
    ['Pranayama', 'Return to the rhythm beneath the noise with guided breathwork.', images.calm],
    ['Hatha yoga', 'Grounded sequences that build strength, flexibility and awareness.', images.hero],
    ['Therapeutic yoga', 'Personalized movement for recovery, relief and everyday resilience.', images.home],
    ['One-to-one', 'A practice shaped around your body, your pace and your intention.', images.about],
  ];
  const faqs = ['What yoga classes does Ananta Yog Asram offer?', 'Do you provide home yoga classes in Dehradun?', 'Do you offer online yoga classes?', 'What are the available timings?', 'Do you offer one-to-one sessions?', 'Is yoga suitable for beginners?', 'Do you offer pre and post natal yoga?', 'How can I enquire?'];

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <button className="brand-mark" onClick={() => goTo('top')} aria-label="Ananta Yog Asram home"><img src={logo} alt="Ananta Yog Asram" /></button>
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <button key={item.id} onClick={() => goTo(item.id)}>{item.label}</button>)}</nav>
        <a className="header-cta" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} aria-label="Mobile navigation"><div>{navItems.map(item => <button key={item.id} onClick={() => goTo(item.id)}>{item.label}<ArrowUpRight size={18} /></button>)}</div><a href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">Begin a conversation <MoveRight size={18} /></a></motion.nav>}</AnimatePresence>

      <main>
        <section id="top" className="hero-section">
          <motion.div className="hero-image" style={{ scale: heroScale }}><img src={images.hero} alt="Yoga practice overlooking Himalayan mountains at sunrise" /></motion.div>
          <Suspense fallback={null}><LazyScene /></Suspense>
          <div className="hero-wash" />
          <div className="hero-copy"><p className="eyebrow light">Dehradun · Uttarakhand</p><h1>Come back<br /><em>to yourself.</em></h1><p className="hero-intro">Yoga for strength, awareness, balance<br className="desktop-only" /> and a calmer way of living.</p><div className="hero-actions"><button className="button button-light" onClick={() => goTo('about')}>Explore the practice <ArrowDown size={15} /></button><a className="text-link light" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={16} /></a></div></div>
          <div className="hero-footer"><span>01 / 06</span><span>Scroll to move through</span><span className="hero-line" /></div>
        </section>

        <section className="statement-section" id="about"><div className="section-kicker"><span>01</span><span>The approach</span></div><Reveal><h2>Yoga is not<br /><em>just a pose.</em></h2></Reveal><Reveal delay={0.14}><p className="statement-follow">It is a way<br />of listening.</p></Reveal><div className="statement-orbit" aria-hidden="true"><span /><span /><span /></div><Reveal className="statement-foot" delay={0.2}><p>To your body.<br />To your breath.<br />To yourself.</p><span>ANANTA / 001</span></Reveal></section>

        <section className="about-section section-pad"><div className="about-media"><ImageReveal src={images.about} alt="Woman practicing yoga surrounded by lush Himalayan greenery" /><span className="vertical-note">A slower way to live · 30°19′N</span></div><Reveal className="about-copy"><p className="eyebrow">The Ananta approach</p><h2>Make space<br />for <em>what matters.</em></h2><p>At Ananta Yog Asram, yoga is more than a physical practice. It is a journey towards balance, awareness and a healthier way of living.</p><p>Our approach brings together movement, breath, flexibility, strength and mindful awareness in practices designed for modern lives.</p><a className="text-link" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">Begin where you are <ArrowUpRight size={16} /></a></Reveal></section>

        <section className="classes-section" id="classes"><div className="section-pad classes-heading"><div className="section-kicker"><span>02</span><span>The practice</span></div><h2>Find your<br /><em>practice.</em></h2><p>Every body arrives differently.<br />There is no one way in.</p></div><div className="class-track">{classes.map(([name, desc, image], index) => <button className={`class-panel ${activeClass === index ? 'active' : ''}`} key={name} onClick={() => setActiveClass(index)}><div className="class-image"><img src={image} alt={`${name} yoga practice`} /></div><div className="class-overlay" /><span className="class-number">0{index + 1}</span><div className="class-info"><h3>{name}</h3><p>{desc}</p></div><ArrowUpRight className="class-arrow" /></button>)}</div><div className="classes-bottom"><span>Swipe to explore</span><div className="track-line"><motion.div animate={{ width: `${(activeClass + 1) / classes.length * 100}%` }} /></div><span>0{activeClass + 1} / 0{classes.length}</span></div></section>

        <section className="breath-section"><div className="breath-content"><Reveal><p className="eyebrow light">A moment between moments</p><h2>Breathe.</h2><p>Slow down.<br />Inhale.<br />Exhale.</p></Reveal><BreathingOrb /></div><div className="breath-side"><span>Inhale / Exhale</span><span>Follow your natural rhythm</span></div></section>

        <section className="split-feature" id="home-yoga"><div className="split-media"><ImageReveal src={images.home} alt="Yoga practice in a calm home interior" /></div><Reveal className="split-copy"><p className="eyebrow">Home yoga · Dehradun</p><h2>Your space.<br /><em>Your practice.</em></h2><p>Experience guided yoga practice from the comfort of your home in Dehradun.</p><ul><li>Personalized guidance</li><li>Flexible scheduling</li><li>Comfortable home environment</li><li>Different age groups</li><li>Beginner-friendly practice</li></ul><a className="button button-dark" href={whatsapp('Hi Ananta Yog Asram, I am interested in Home Yoga Classes in Dehradun.')} target="_blank" rel="noreferrer">Enquire for home yoga <ArrowUpRight size={16} /></a></Reveal></section>

        <section className="online-section section-pad" id="online"><div className="online-mark">∞</div><Reveal><p className="eyebrow">Wherever you are</p><h2>The practice<br /><em>travels with you.</em></h2><p className="online-intro">Live online yoga sessions designed to bring guided movement, breath and awareness into your everyday space.</p><div className="session-list"><span>Morning sessions</span><span>Evening sessions</span><span>Group batches</span><span>One-to-one sessions</span></div><a className="text-link" href={whatsapp('Hi Ananta Yog Asram, I am interested in Online Yoga Classes.')} target="_blank" rel="noreferrer">Explore online yoga <ArrowUpRight size={16} /></a></Reveal></section>

        <section className="schedule-section section-pad" id="schedule"><div className="schedule-title"><p className="eyebrow">Make it a ritual</p><h2>Find your<br /><em>window.</em></h2></div><div className="timeline"><div className="timeline-line" /><div className="time-block"><span className="time-label">Monday — Friday</span><div className="time-row"><span>Morning</span><strong>5:00 <small>AM</small><i>—</i> 11:00 <small>AM</small></strong><span className="sun sun-rise" /></div><div className="time-row"><span>Evening</span><strong>3:00 <small>PM</small><i>—</i> 9:00 <small>PM</small></strong><span className="sun sun-set" /></div><p>These are availability windows. Contact us on WhatsApp for current batch / session availability.</p><a className="text-link" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">Check availability <ArrowUpRight size={16} /></a></div></div></section>

        <section className="experience-section"><div className="section-pad"><div className="section-kicker"><span>03</span><span>The Ananta experience</span></div><h2>Three ways<br />back to <em>you.</em></h2></div><div className="experience-grid">{[['Body', 'Movement', 'Flexibility', images.practice], ['Breath', 'Pranayama', 'Awareness', images.calm], ['Mind', 'Rhythm', 'Balance', images.mountain]].map(([title, first, second, image], index) => <Reveal className={`experience-panel experience-${index}`} delay={index * 0.12} key={title}><img src={image} alt="" /><div className="experience-shade" /><span>0{index + 1}</span><div><h3>{title}</h3><p>{first}<br />{second}<br />Stillness</p></div></Reveal>)}</div></section>

        <section className="pricing-section section-pad"><div><p className="eyebrow">Start simply</p><h2>Begin your<br /><em>practice.</em></h2></div><div className="price-lockup"><span>₹</span><strong>7,000</strong><small>per month</small><p>Home yoga · Dehradun</p><a className="button button-dark" href={whatsapp('Hi Ananta Yog Asram, I would like to book a trial class.')} target="_blank" rel="noreferrer">Book via WhatsApp <ArrowUpRight size={16} /></a></div><div className="trial"><span>Trial class</span><strong>₹300</strong><p>For session type and availability, start a conversation.</p></div></section>

        <section className="audience-section section-pad"><p className="eyebrow">No matter where you are starting</p><h2>There is a practice<br /><em>for every body.</em></h2><div className="audience-list">{['Beginners', 'Kids', 'Adults', 'Seniors', 'Working professionals', 'Pregnancy & postnatal'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={20} /></div>)}</div></section>

        <section className="journey-section"><div className="journey-image"><ImageReveal src={images.mountain} alt="Sunrise over Himalayan mountain landscape" /></div><div className="journey-copy"><p className="eyebrow light">The Ananta journey</p><h2>Keep going<br /><em>inward.</em></h2><p>Small practices. Clearer days. A life that feels more like your own.</p><a className="button button-light" href="https://www.instagram.com/globalyogaclass/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow the journey</a></div></section>

        <section className="testimonial-section section-pad"><p className="eyebrow">Words from the practice</p><div className="testimonial-placeholder"><span>01</span><p>Verified student stories<br />will live here soon.</p><small>A quiet space reserved for real experiences from the Ananta community.</small></div></section>

        <section className="faq-section section-pad"><div className="faq-title"><p className="eyebrow">Good to know</p><h2>Questions,<br /><em>answered.</em></h2></div><div className="faq-list">{faqs.map((question, index) => <div className={`faq-item ${faq === index ? 'open' : ''}`} key={question}><button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index}><span>{question}</span><ChevronDown size={18} /></button><AnimatePresence>{faq === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>Connect with us on WhatsApp and we will help you find the right practice, timing and format for your needs.</motion.p>}</AnimatePresence></div>)}</div></section>

        <section className="final-section"><div className="final-mountains" /><div className="final-copy"><p className="eyebrow light">Ananta Yog Asram · Dehradun</p><h2>Your practice<br /><em>begins here.</em></h2><p>Yoga · Breath · Balance</p><a className="button button-light" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16} /></a></div><div className="final-contact"><span>+91 87551 50917</span><span>globalyogaclass@gmail.com</span><span>© 2024 Ananta Yog Asram</span></div></section>
      </main>
      <a className="floating-whatsapp" href={whatsapp(generalMessage)} target="_blank" rel="noreferrer" aria-label="Chat with Ananta Yog Asram on WhatsApp"><span>CHAT</span><div>W</div></a>
    </div>
  );
}

function BreathingOrb() {
  const [paused, setPaused] = useState(false);
  return <div className={`breath-orb-wrap ${paused ? 'paused' : ''}`}><button className="breath-orb" onClick={() => setPaused(!paused)} aria-label="Pause or resume breathing animation"><span /><span /><span /></button><span className="breath-status">{paused ? 'Paused' : 'Inhale · Exhale'}</span><Play className="breath-play" size={14} /></div>;
}

export default App;
