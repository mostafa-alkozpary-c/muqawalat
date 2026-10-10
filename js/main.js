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
  const GOOGLE_ADS_CONVERSION_TARGET = 'AW-18406219764/7nr4CIbgz_0cEPS_4shE';

  function reportConversion(eventLabel) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': GOOGLE_ADS_CONVERSION_TARGET,
        'event_category': 'Contact Lead',
        'event_label': eventLabel
      });
      console.log('Google Ads conversion reported:', eventLabel);
    }
  }

  // Detects clicks on phone links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    link.addEventListener('click', () => {
      reportConversion('Phone Call Click');
    });
  });
});
