// Enhanced search functionality
document.querySelector('.search-bar').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.rapper-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.rapper-name').textContent.toLowerCase();
        const genre = card.querySelector('.rapper-genre').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || genre.includes(searchTerm)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
});

// Random rapper button
document.querySelector('.floating-icon:nth-child(1)').addEventListener('click', function() {
    const visibleCards = Array.from(document.querySelectorAll('.rapper-card'))
        .filter(card => window.getComputedStyle(card).display !== 'none');
    
    if (visibleCards.length > 0) {
        const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
        
        // Scroll to the random card with smooth animation
        randomCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight effect
        randomCard.style.boxShadow = '0 0 30px rgba(30, 215, 96, 0.8)';
        setTimeout(() => {
            randomCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), var(--glow)';
        }, 2000);
    }
});

// Filter button (placeholder functionality)
document.querySelector('.floating-icon:nth-child(2)').addEventListener('click', function() {
    alert('Filter functionality coming soon!');
});

// Add staggered animation delays to cards
document.querySelectorAll('.rapper-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});



document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle settings
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    const maxDistance = 150;
    const colors = [
      'rgba(30, 215, 96, 0.5)',  // Spotify green
      'rgba(0, 0, 0, 0.5)',    // Orange accent
      'rgba(255, 255, 255, 0.3)', // White
      'rgba(29, 185, 84, 0.4)',   // Different green
      'rgba(233, 30, 99, 0.4)'    // Pink accent
    ];
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      
      update() {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(30, 215, 96, ${1 - distance/maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });