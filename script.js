document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Music note symbols
  const symbols = ['✧','♫', '♪', '♬','♕','✧', '♩', '♭','♕','✧','♫'];
  const particles = [];
  const particleCount = 150; // Optimal for performance
  
  // Clean color palette
  const colors = [
      'rgba(29, 185, 84, 0.9)', // Spotify green
  ];

  class MusicParticle {
      constructor() {
          this.reset();
          this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
          this.fontSize = Math.floor(Math.random() * 10 + 14);
      }
      
      reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speedX = Math.random() * 1.5 - 0.75; // Consistent speed
          this.speedY = Math.random() * 1.5 - 0.75;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.angle = Math.random() * Math.PI * 2; // Random starting rotation
          this.rotationSpeed = Math.random() * 0.02 - 0.01; // Slow spin
      }
      
      update() {
          // Smooth linear movement
          this.x += this.speedX;
          this.y += this.speedY;
          this.angle += this.rotationSpeed;
          
          // Bounce off edges
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.font = `${this.fontSize}px "Arial Unicode MS", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = this.color;
          ctx.fillText(this.symbol, 0, 0);
          ctx.restore();
      }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
      particles.push(new MusicParticle());
  }

  // Optimized animation loop
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
          particle.update();
          particle.draw();
      });
      
      requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();

  // Responsive handling
  window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
});
