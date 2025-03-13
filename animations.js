document.addEventListener('DOMContentLoaded', () => {
  // Enhanced Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.classList.add(`animate--delay-${index % 3}`);
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Observe elements with staggered animation
  document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
  });

  // Smooth parallax effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

