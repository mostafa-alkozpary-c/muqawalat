/**
 * Moqawel Kuwait - Minimal JavaScript
 * Lightweight, zero dependencies, accessible FAQ accordion & Google Ads call click helper.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other open FAQ items (optional accordion behavior)
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2. Google Ads Conversion Tracking (Phone Calls Only)
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    // Fallback for any dynamic phone links without inline onclick
    if (!link.hasAttribute('onclick')) {
      link.addEventListener('click', (e) => {
        if (typeof window.gtag_report_conversion === 'function') {
          e.preventDefault();
          window.gtag_report_conversion(link.getAttribute('href'));
        }
      });
    }
  });
});
