
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/careers/HeroSection';
import CareerPositions from '@/components/careers/CareerPositions';
import CompanyBenefits from '@/components/careers/CompanyBenefits';
import ApplicationProcess from '@/components/careers/ApplicationProcess';
import ApplicationSection from '@/components/careers/ApplicationSection';
import CallToAction from '@/components/careers/CallToAction';

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const applicationFormRef = useRef<HTMLDivElement>(null);
  const animatedElements = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const currentElements = animatedElements.current;
    currentElements.forEach(el => observer.observe(el));
    
    return () => {
      currentElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToApplicationForm = () => {
    applicationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection addToRefs={addToRefs} />
        <CareerPositions addToRefs={addToRefs} onApply={handleApply} />
        <CompanyBenefits addToRefs={addToRefs} />
        <ApplicationProcess addToRefs={addToRefs} />
        <ApplicationSection 
          position={selectedPosition} 
          addToRefs={addToRefs} 
          forwardedRef={applicationFormRef} 
        />
        <CallToAction addToRefs={addToRefs} onApplyClick={scrollToApplicationForm} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
