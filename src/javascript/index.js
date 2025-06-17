document.addEventListener('DOMContentLoaded', function() {
  // Loading screen
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('loaded');
    setTimeout(() => loadingScreen.remove(), 500);
  }, 1500);

  // Floating action button
  const fabMain = document.querySelector('.fab-main');
  const fabContainer = document.querySelector('.fab-container');
  fabMain.addEventListener('click', () => {
    fabContainer.classList.toggle('active');
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Testimonial slider
  const testimonials = [
    {
      quote: "TridentCo's software solutions transformed our operations completely. Their team delivered beyond our expectations with innovative approaches to our complex requirements.",
      name: "Sarah Johnson",
      role: "CEO, TechSolutions Inc.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The cloud migration handled by TridentCo was seamless. We experienced zero downtime and our operational efficiency improved by 40% immediately after implementation.",
      name: "Michael Chen",
      role: "CTO, Global Retail Group",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Working with TridentCo on our data analytics platform was a game-changer. Their insights helped us identify new revenue streams worth millions annually.",
      name: "Emily Rodriguez",
      role: "Director of Analytics, Finova",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "Their cybersecurity team identified vulnerabilities in our systems that others had missed. The remediation plan was comprehensive and minimally disruptive.",
      name: "David Wilson",
      role: "CISO, HealthFirst",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const testimonialTrack = document.querySelector('.testimonial-track');
  const sliderDots = document.querySelector('.slider-dots');
  let currentSlide = 0;

  // Initialize testimonials
  testimonials.forEach((testimonial, index) => {
    // Create testimonial card
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <p class="quote">${testimonial.quote}</p>
      <div class="testimonial-author">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
        <div class="author-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.role}</p>
        </div>
      </div>
    `;
    testimonialTrack.appendChild(card);

    // Create slider dot
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  // Slider navigation
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dots = document.querySelectorAll('.slider-dot');

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  function goToSlide(index) {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Auto-advance slider
  let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

  // Pause on hover
  testimonialTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
  testimonialTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });

  // Animate stats counters
  const statValues = document.querySelectorAll('.stat-value');
  const statsSection = document.querySelector('.stats-section');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      statValues.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            stat.textContent = target;
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on load

  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Form submission
  const contactForm = document.querySelector('.consultation-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = {
        name: this.elements[0].value,
        email: this.elements[1].value,
        phone: this.elements[2].value,
        service: this.elements[3].value
      };
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', formData);
      
      // Show success message
      const originalButtonText = this.querySelector('button').textContent;
      const submitButton = this.querySelector('button');
      submitButton.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
      submitButton.disabled = true;
      
      setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        this.reset();
      }, 3000);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.service-icon').style.transform = 'rotate(15deg) scale(1.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.service-icon').style.transform = 'rotate(0) scale(1)';
    });
  });

  // Intersection Observer for lazy loading
  const lazyLoad = (targets) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px'
    });

    targets.forEach(target => io.observe(target));
  };

  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    lazyLoad(lazyImages);
  }

  // Dynamic year in footer
  document.querySelector('.footer-copyright p').innerHTML = 
    `&copy; ${new Date().getFullYear()} TridentCo. All Rights Reserved.`;
});