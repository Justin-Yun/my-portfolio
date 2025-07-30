'use client'
import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Capture the current ref value
    const container = containerRef.current;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.background = '#0d1117';
    canvas.style.pointerEvents = 'none';
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Add canvas to container
    if (container) {
      container.appendChild(canvas);
    }
    
    // Particle system
    const particles = [];
    const colors = ['#ffffff', '#64ffda', '#bb86fc', '#03dac6'];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const mouse = { x: 0, y: 0 };
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,     // Slower base movement
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.4,
        // Add floating properties
        originalX: 0,                         // Will store original position
        originalY: 0,
        floatSpeed: Math.random() * 0.02 + 0.01,  // How fast it floats
        floatDistance: Math.random() * 50 + 20,   // How far it floats
        angle: Math.random() * Math.PI * 2,       // Starting angle for sine wave
      });
    }
    
    // Set original positions after creation
    particles.forEach(particle => {
      particle.originalX = particle.x;
      particle.originalY = particle.y;
    });
    
    // Mouse tracking
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((particle, index) => {
        // Floating movement using sine waves
        particle.angle += particle.floatSpeed;
        
        // Calculate floating offset
        const floatX = Math.sin(particle.angle) * particle.floatDistance;
        const floatY = Math.cos(particle.angle * 0.7) * particle.floatDistance * 0.5;
        
        // Apply floating movement to original position
        particle.x = particle.originalX + floatX + particle.vx;
        particle.y = particle.originalY + floatY + particle.vy;
        
        // Gradual drift (very slow)
        particle.originalX += particle.vx * 0.1;
        particle.originalY += particle.vy * 0.1;
        
        // Mouse repulsion (MORE DRAMATIC)
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {  
          const force = (200 - distance) / 200;
          const repulsionStrength = 0.08; 
          
          // Apply stronger repulsion to original position
          particle.originalX -= dx * force * repulsionStrength;
          particle.originalY -= dy * force * repulsionStrength;
          
          // Also add immediate velocity for instant response
          particle.vx -= dx * force * 0.01;
          particle.vy -= dy * force * 0.01;
        }
        
        // Bounce off edges (adjust original position)
        if (particle.originalX < 0) {
          particle.originalX = 0;
          particle.vx = Math.abs(particle.vx);
        }
        if (particle.originalX > canvas.width) {
          particle.originalX = canvas.width;
          particle.vx = -Math.abs(particle.vx);
        }
        if (particle.originalY < 0) {
          particle.originalY = 0;
          particle.vy = Math.abs(particle.vy);
        }
        if (particle.originalY > canvas.height) {
          particle.originalY = canvas.height;
          particle.vy = -Math.abs(particle.vy);
        }
        
        // Very light friction on drift
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        // Remove excess particles
        if (particles.length > particleCount * 2) {
          particles.splice(particleCount, particles.length - particleCount);
        }
      });
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw particles
      particles.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (container && canvas.parentNode) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ParticleBackground;