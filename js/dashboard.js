/**
 * Client Handover Dashboard - Management Logic
 * Handles data binding, live preview simulation, and production HTML export.
 */

// Default data representing current production site
const defaultSiteData = {
  phone: '94093969',
  brandTitle: 'مقاول الكويت',
  brandSubtitle: 'أعمال التكسير والترميم والأصباغ والديكور',
  heroTitle: 'مقاول تكسير وهدم وترميم وأصباغ وديكورات في الكويت',
  heroSubtitle: 'تنفيذ كافة أعمال الهدم والتكسير، تركيب السيراميك والبلاط، الأصباغ والدهانات الحديثة، الديكورات وبديل الرخام والخشب، الترميمات، بناء الطوابق وإضافة الأدوار، الهيكل الأسود، والمساح والسيجما بدقة وسرعة وبدون وسطاء.',
  metaTitle: 'مقاول تكسير وترميم وأصباغ وديكورات في الكويت | اتصل 94093969',
  metaDescription: 'مقاول معتمد في الكويت لأعمال التكسير والهدم، تركيب سيراميك وبلاط، أصباغ ودهانات حديثة، ديكورات بديل الرخام والخشب، ترميمات عامة، بناء طوابق، هيكل أسود، ومساح سيجما. اتصل الآن 94093969.',
  googleAdsConversionId: 'AW-18406219764',
  services: [
    {
      id: 1,
      badge: '01',
      title: 'تكسير وهدم',
      desc: 'تكسير الحوائط والخرسانات، إزالة القواطع، فتح الأبواب والشبابيك وترحيل الأنقاض بأحدث المعدات مع الحفاظ الكامل على سلامة المبنى.',
      img: 'assets/images/user-demolition-wall.jpg'
    },
    {
      id: 2,
      badge: '02',
      title: 'تركيب سيراميك',
      desc: 'تركيب سيراميك وبورسلان للأرضيات والحوائط والمطابخ والحمامات بميزان ليزر لضمان استواء السطح وفواصل دقيقة وتشطيب نظيف.',
      img: 'assets/images/user-ceramic.jpg'
    },
    {
      id: 3,
      badge: '03',
      title: 'تركيب بلاط',
      desc: 'تركيب بلاط متداخل (إنترلوك)، كاشي، وبلاط أرصفة وممرات وأحواش ومواقف سيارات مع ضبط الميول وتصريف مياه الأمطار بكفاءة.',
      img: 'assets/images/user-ceramic.jpg'
    },
    {
      id: 4,
      badge: '04',
      title: 'ترميمات عامة',
      desc: 'ترميم وتجديد الفلل والشقق والقسائم القديمة، معالجة التصدعات والتشققات، وتحديث المساحات السكنية بالكامل بجودة وإتقان.',
      img: 'assets/images/user-renovation-building.jpg'
    },
    {
      id: 5,
      badge: '05',
      title: 'بناء طوابق وإضافة أدوار',
      desc: 'توسعة المباني وبناء أدوار إضافية، ملاحق، وغرف أسطح مع تدعيم البنية الإنشائية وتوزيع الأحمال بأمان واحترافية.',
      img: 'assets/images/user-building-floors.jpg'
    },
    {
      id: 6,
      badge: '06',
      title: 'هيكل أسود',
      desc: 'تنفيذ أعمال الهيكل الإنشائي والخرساني المسلح (قواعد، أعمدة، جسور، وأسقف) وفق المخططات الإنشائية وأعلى معايير المتانة.',
      img: 'assets/images/user-black-structure.jpg'
    },
    {
      id: 7,
      badge: '07',
      title: 'مساح سيجما',
      desc: 'تنفيذ المساح الداخلي والخارجي، وتطبيق طبقات السيجما المقاومة لعوامل الطقس الحار والرطوبة لواجهات القسائم والمباني.',
      img: 'assets/images/user-villa-facade.jpg'
    },
    {
      id: 8,
      badge: '08',
      title: 'أصباغ ودهانات',
      desc: 'تنفيذ كافة أعمال الدهانات والأصباغ الحديثة، دهان داخلي وخارجي، جوتن والجزيرة، معالجة الرطوبة والتشققات، وتشطيب فاخر للشقق والفلل والقسائم.',
      img: 'assets/images/user-painting.jpg'
    },
    {
      id: 9,
      badge: '09',
      title: 'ديكورات وتشطيب حديث',
      desc: 'تصميم وتركيب بديل الرخام، بديل الخشب، أسقف جبس بورد، إضاءات مخفية (LED)، جداريات شاشات التلفزيون، ولمسات معمارية حديثة تمنح المكان فخامة استثنائية.',
      img: 'assets/images/user-decorations.jpg'
    }
  ]
};

// State manager
let siteData = { ...defaultSiteData };

// Load from LocalStorage if available
function loadSavedData() {
  try {
    const saved = localStorage.getItem('moqawel_site_data');
    if (saved) {
      siteData = { ...defaultSiteData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }
}

// Save to LocalStorage
function persistData() {
  try {
    localStorage.setItem('moqawel_site_data', JSON.stringify(siteData));
  } catch (e) {
    console.warn('Could not write to localStorage', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  initTabs();
  initFormBindings();
  renderServicesEditor();
  initPreview();
  initActions();
});

// 1. Tab Navigation
function initTabs() {
  const tabButtons = document.querySelectorAll('.dash-tab-btn');
  const panels = document.querySelectorAll('.dash-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      if (targetId === 'preview') {
        refreshPreview();
      }
    });
  });
}

// 2. Form Bindings
function initFormBindings() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('input-phone', siteData.phone);
  setVal('input-brand-title', siteData.brandTitle);
  setVal('input-brand-sub', siteData.brandSubtitle);
  setVal('input-hero-title', siteData.heroTitle);
  setVal('input-hero-sub', siteData.heroSubtitle);
  setVal('input-meta-title', siteData.metaTitle);
  setVal('input-meta-desc', siteData.metaDescription);
  setVal('input-google-ads', siteData.googleAdsConversionId);

  // Sync back to state on change
  const watch = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        siteData[key] = e.target.value.trim();
        persistData();
      });
    }
  };

  watch('input-phone', 'phone');
  watch('input-brand-title', 'brandTitle');
  watch('input-brand-sub', 'brandSubtitle');
  watch('input-hero-title', 'heroTitle');
  watch('input-hero-sub', 'heroSubtitle');
  watch('input-meta-title', 'metaTitle');
  watch('input-meta-desc', 'metaDescription');
  watch('input-google-ads', 'googleAdsConversionId');
}

// 3. Render Services Editor
function renderServicesEditor() {
  const container = document.getElementById('services-editor-list');
  if (!container) return;

  container.innerHTML = siteData.services.map((srv, idx) => `
    <div class="dash-service-item">
      <div class="dash-service-thumb">
        <img src="${srv.img}" alt="${srv.title}" onerror="this.src='assets/images/user-demolition-wall.jpg'">
      </div>
      <div class="dash-service-fields">
        <div class="dash-group">
          <label class="dash-label">
            <span>الخدمة ${srv.badge}: العنوان</span>
          </label>
          <input type="text" class="dash-input srv-title-input" data-index="${idx}" value="${srv.title}">
        </div>
        <div class="dash-group">
          <label class="dash-label">
            <span>الوصف المختصر</span>
          </label>
          <textarea class="dash-textarea srv-desc-input" data-index="${idx}">${srv.desc}</textarea>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.srv-title-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      siteData.services[idx].title = e.target.value;
      persistData();
    });
  });

  container.querySelectorAll('.srv-desc-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      siteData.services[idx].desc = e.target.value;
      persistData();
    });
  });
}

// 4. Preview Device Frame
function initPreview() {
  const mobileBtn = document.getElementById('btn-preview-mobile');
  const desktopBtn = document.getElementById('btn-preview-desktop');
  const frame = document.getElementById('preview-frame-wrap');

  if (mobileBtn && desktopBtn && frame) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.add('active');
      desktopBtn.classList.remove('active');
      frame.classList.remove('desktop-view');
    });

    desktopBtn.addEventListener('click', () => {
      desktopBtn.classList.add('active');
      mobileBtn.classList.remove('active');
      frame.classList.add('desktop-view');
    });
  }
}

function refreshPreview() {
  const iframe = document.getElementById('preview-iframe');
  if (!iframe) return;

  // We can write the dynamically generated HTML into the iframe
  const htmlContent = generateProductionHTML();
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();
}

// 5. Generate Production HTML
function generateProductionHTML() {
  const cleanPhone = siteData.phone.replace(/[^0-9]/g, '');

  const servicesHTML = siteData.services.map(srv => `
          <!-- Service ${srv.id} -->
          <article class="service-card">
            <div class="service-img-wrap">
              <img src="${srv.img}" alt="${srv.title}" width="400" height="250" loading="lazy">
              <span class="service-badge">${srv.badge}</span>
            </div>
            <div class="service-body">
              <h3 class="service-title">${srv.title}</h3>
              <p class="service-desc">
                ${srv.desc}
              </p>
              <a href="tel:${cleanPhone}" class="service-btn" aria-label="اتصل لطلب خدمة ${srv.title}">
                <span>اتصل لطلب الخدمة</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </a>
            </div>
          </article>`).join('\n');

  const schemaItems = siteData.services.map(srv => 
    `        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "${srv.title}" } }`
  ).join(',\n');

  const googleAdsScript = siteData.googleAdsConversionId ? `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${siteData.googleAdsConversionId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteData.googleAdsConversionId}');
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteData.metaTitle}</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="${siteData.metaDescription}">
  <meta name="keywords" content="مقاول تكسير الكويت, مقاول هدم الكويت, تركيب سيراميك الكويت, تركيب بلاط الكويت, ترميمات الكويت, بناء طوابق الكويت, إضافة أدوار الكويت, هيكل أسود الكويت, مساح سيجما الكويت">
  <meta name="author" content="${siteData.brandTitle}">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://moqawel-kuwait.com/">

  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_KW">
  <meta property="og:title" content="${siteData.metaTitle}">
  <meta property="og:description" content="${siteData.metaDescription}">
  <meta property="og:url" content="https://moqawel-kuwait.com/">
  <meta property="og:image" content="assets/images/hero-construction.jpg">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${siteData.metaTitle}">
  <meta name="twitter:description" content="${siteData.metaDescription}">
  <meta name="twitter:image" content="assets/images/hero-construction.jpg">

  <!-- Theme Color -->
  <meta name="theme-color" content="#12161b">

  <!-- Fonts & Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
${googleAdsScript}
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "${siteData.brandTitle} للتكسير والترميم",
    "image": "assets/images/hero-construction.jpg",
    "telephone": "+965${cleanPhone}",
    "url": "https://moqawel-kuwait.com/",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KW",
      "addressRegion": "Kuwait"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.3759,
      "longitude": 47.9774
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "محافظة العاصمة" },
      { "@type": "AdministrativeArea", "name": "محافظة حولي" },
      { "@type": "AdministrativeArea", "name": "محافظة الفروانية" },
      { "@type": "AdministrativeArea", "name": "محافظة الأحمدي" },
      { "@type": "AdministrativeArea", "name": "محافظة مبارك الكبير" },
      { "@type": "AdministrativeArea", "name": "محافظة الجهراء" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات المقاولات في الكويت",
      "itemListElement": [
${schemaItems}
      ]
    }
  }
  </script>
</head>
<body>

  <!-- 1. Header -->
  <header class="site-header" role="banner">
    <div class="container header-wrapper">
      <a href="#hero" class="brand" aria-label="الصفحة الرئيسية - ${siteData.brandTitle}">
        <div class="brand-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
        <div class="brand-text">
          <h1>${siteData.brandTitle}</h1>
          <span>${siteData.brandSubtitle}</span>
        </div>
      </a>

      <div class="header-actions">
        <a href="tel:${cleanPhone}" class="header-phone-btn" aria-label="اتصل الآن على رقم ${cleanPhone}">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>${cleanPhone}</span>
        </a>
      </div>
    </div>
  </header>

  <main id="main-content">
    <!-- 2. Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container hero-content">
        <div class="hero-badge">
          <span>🇰🇼 خدمات المقاولات والترميم في جميع مناطق الكويت</span>
        </div>

        <h1 class="hero-title">${siteData.heroTitle}</h1>

        <p class="hero-subtitle">
          ${siteData.heroSubtitle}
        </p>

        <div class="hero-cta-box">
          <a href="tel:${cleanPhone}" class="btn btn-primary btn-large" aria-label="اتصل الآن بالهاتف على ${cleanPhone}">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>اتصل الآن مباشرة: ${cleanPhone}</span>
          </a>
        </div>

        <div class="hero-features">
          <div class="hero-feature-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>معاينة موقعية وسريعة</span>
          </div>
          <div class="hero-feature-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>عمالة فنية متخصصة</span>
          </div>
          <div class="hero-feature-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>التزام تام بالمواعيد</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Services Section -->
    <section id="services" class="services-section">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">خدماتنا في الكويت</span>
          <h2 class="section-title">أعمال المقاولات والترميم والبناء</h2>
          <p class="section-desc">
            نوفر لكم كافة خدمات الهدم، التكسير، البناء، والعزل في الكويت بأعلى كفاءة ومعايير أمان مع الالتزام التام بسرعة الإنجاز.
          </p>
        </div>

        <div class="services-grid">
${servicesHTML}
        </div>
      </div>
    </section>

    <!-- 4. Why Choose Us -->
    <section id="why-us" class="why-section">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">مميزاتنا</span>
          <h2 class="section-title">لماذا يختارنا العملاء في الكويت؟</h2>
          <p class="section-desc">
            نركز على الجودة والالتزام في كل مرحلة من مراحل العمل لتنفيذ مشاريعكم بثقة وسرعة.
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-box" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>استجابة وسرعة في المعاينة</h3>
            <p>نصلك في أسرع وقت لمعاينة موقع العمل في أي منطقة داخل الكويت وتحديد المطلوب فوراً.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>عمالة فنية مدربة</h3>
            <p>فريق من المعلمين والعمال ذوي الخبرة الطويلة في أعمال التكسير والبناء والترميم.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>دقة والتزام بالمواعيد</h3>
            <p>تنفيذ الأعمال وفق الجدول المتفق عليه وتسليم الموقع نظيفاً وجاهزاً للاستخدام.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-box" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>تغطية شاملة لكافة المحافظات</h3>
            <p>نعمل في جميع مناطق الكويت (العاصمة، حولي، الفروانية، الأحمدي، مبارك الكبير، الجهراء).</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Gallery Section -->
    <section id="gallery" class="gallery-section">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">معرض الأعمال</span>
          <h2 class="section-title">صور من واقع العمل والتنفيذ</h2>
          <p class="section-desc">
            لقطات ميدانية حقيقية لأعمال الهدم والتكسير والتشطيبات الإنشائية بمختلف مراحلها.
          </p>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="assets/images/user-demolition-wall.jpg" alt="أعمال تكسير وهدم جدران وترحيل أنقاض في الكويت" width="400" height="300" loading="lazy">
            <div class="gallery-caption">تكسير وهدم جدران وحوائط</div>
          </div>
          <div class="gallery-item">
            <img src="assets/images/user-drilling-worker.jpg" alt="معلم تكسير وتثقيب خرسانات بأحدث المعدات" width="400" height="300" loading="lazy">
            <div class="gallery-caption">تكسير وتثقيب خرسانات مسلحة</div>
          </div>
          <div class="gallery-item">
            <img src="assets/images/user-renovation-building.jpg" alt="أعمال ترميمات عامة وتجديد مباني وقسائم بالكويت" width="400" height="300" loading="lazy">
            <div class="gallery-caption">ترميمات عامة وتجديد قسائم</div>
          </div>
          <div class="gallery-item">
            <img src="assets/images/user-black-structure.jpg" alt="بناء هيكل أسود وأعمال الخرسانة المسلحة" width="400" height="300" loading="lazy">
            <div class="gallery-caption">بناء هيكل أسود وعظم خرساني</div>
          </div>
          <div class="gallery-item">
            <img src="assets/images/user-villa-facade.jpg" alt="أعمال مساح وسيجما وبناء واجهات القسائم" width="400" height="300" loading="lazy">
            <div class="gallery-caption">بناء وتشطيب ومساح سيجما</div>
          </div>
          <div class="gallery-item">
            <img src="assets/images/user-ceramic.jpg" alt="تركيب السيراميك والبورسلان للأرضيات والحوائط" width="400" height="300" loading="lazy">
            <div class="gallery-caption">تركيب سيراميك وبورسلان</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Direct Call CTA Banner -->
    <section class="cta-banner-section">
      <div class="container">
        <div class="cta-banner-box">
          <h2>تحتاج مقاول في الكويت لمشروعك؟</h2>
          <p>
            تواصل معنا الآن مباشرة عبر الهاتف، وسنكون جاهزين للمعاينة وتحديد التفاصيل بدقة وسرعة وبدون أي تعقيد.
          </p>
          <div class="cta-phone-highlight">${cleanPhone}</div>
          <div class="cta-buttons">
            <a href="tel:${cleanPhone}" class="btn btn-primary btn-large" aria-label="اتصل الآن على رقم ${cleanPhone}">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>اتصل الآن مباشرة: ${cleanPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Service Areas -->
    <section id="areas" class="areas-section">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">مناطق الخدمة</span>
          <h2 class="section-title">نخدم جميع مناطق ومحافظات الكويت</h2>
          <p class="section-desc">
            فريق عملنا متواجد ومستعد لتغطية كافة محافظات ومناطق دولة الكويت بأسرع وقت.
          </p>
        </div>

        <div class="areas-grid">
          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة العاصمة</span>
            </div>
            <p>الروضة، كيفان، العديلية، الدسمة، الفيحاء، القادسية، الدعية، الشامية، بنيد القار، السرة، وقرطبة وجميع المناطق.</p>
          </div>

          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة حولي</span>
            </div>
            <p>حولي، السالمية، سلوى، الرميثية، بيان، الجابرية، مشرف، الشعب، السلام، حطين، والشهداء والزهراء.</p>
          </div>

          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة الفروانية</span>
            </div>
            <p>الفروانية، خيطان، الأندلس، إشبيلية، صباح الناصر، الفردوس، العارضية، الرابية، العمرية، وجليب الشيوخ.</p>
          </div>

          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة مبارك الكبير</span>
            </div>
            <p>القصور، العدان، القرين، صباح السالم، أبو فطيرة، الفنيطيس، المسيلة، والمسايل وجميع الضواحي.</p>
          </div>

          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة الأحمدي</span>
            </div>
            <p>الفحيحيل، المنقف، الفنطاس، الصباحية، المهبولة، الظهر، الرقة، أبو حليفة، ومدينة صباح الأحمد.</p>
          </div>

          <div class="area-card">
            <div class="area-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>محافظة الجهراء</span>
            </div>
            <p>الجهراء، مدينة سعد العبدالله، القيروان، الصليبية، الواحة، العيون، النسيم، وتيماء والمناطق المجاورة.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. FAQ Section -->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">الأسئلة الشائعة</span>
          <h2 class="section-title">إجابات عن استفساراتكم</h2>
          <p class="section-desc">
            أهم الأسئلة المتكررة حول خدمات المقاولات والتكسير والترميم في الكويت.
          </p>
        </div>

        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>ما هي الخدمات الرئيسية التي تقدمونها في الكويت؟</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>نقدم حزمة شاملة تشمل: تكسير وهدم الجدران والخرسانات، تركيب السيراميك والبورسلان، تركيب البلاط والكاشي والإنترلوك، أعمال الترميمات العامة، بناء الطوابق وإضافة الأدوار، بناء الهيكل الأسود، وأعمال المساح والسيجما للواجهات.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>هل تقومون بتركيب السيراميك والبلاط المتداخل؟</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>نعم، يقوم معلمونا بتركيب سيراميك وبورسلان الأرضيات والجدران بدقة متناهية، بالإضافة إلى تركيب البلاط المتداخل (إنترلوك) والكاشي للأحواش والممرات ومواقف السيارات مع ضبط الميول المناسب.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>هل تنفذون أعمال الهيكل الأسود وبناء الطوابق؟</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>نعم، نقوم بتنفيذ أعمال الهيكل الخرساني الأسود وتوسعة المباني وبناء الطوابق الإضافية والملاحق وفق المواصفات والمخططات الهندسية.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>كيف يمكنني التواصل لطلب المعاينة أو الاستفسار؟</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>يمكنك الاتصال بنا مباشرة على الرقم <strong>${cleanPhone}</strong> أو الضغط على زر الاتصال في الصفحة لمعاينة موقعك وتحديد كافة التفاصيل والأسعار بدقة وسرعة.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- 9. Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h4>${siteData.brandTitle} لأعمال التكسير والترميم</h4>
          <p>تنفيذ كافة أعمال الهدم والبناء والتشطيبات والعوازل في جميع مناطق الكويت.</p>
        </div>

        <div class="footer-links">
          <a href="#services">الخدمات</a>
          <a href="#why-us">لماذا نحن</a>
          <a href="#gallery">الأعمال</a>
          <a href="#areas">مناطق الخدمة</a>
          <a href="#faq">الأسئلة الشائعة</a>
        </div>

        <div class="footer-contact">
          <p class="text-muted" style="margin-bottom: 0.25rem;">للاتصال والاستفسار المباشر:</p>
          <a href="tel:${cleanPhone}" class="footer-phone" aria-label="رقم هاتف مقاول الكويت ${cleanPhone}">${cleanPhone}</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 ${siteData.brandTitle}. جميع الحقوق محفوظة • خدمة متوفرة لكافة مناطق ومحافظات الكويت.</p>
      </div>
    </div>
  </footer>

  <!-- 10. Sticky Mobile Call Bar -->
  <aside class="sticky-call-bar" aria-label="شريط الاتصال السريع للجوال">
    <a href="tel:${cleanPhone}" class="sticky-call-btn" aria-label="اتصل الآن على رقم ${cleanPhone}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span>اتصل الآن مباشرة: ${cleanPhone}</span>
    </a>
  </aside>

  <script src="js/main.js"></script>
</body>
</html>`;
}

// 6. Action Handlers (Download & Export)
function initActions() {
  const exportBtn = document.getElementById('btn-export-html');
  const saveToast = document.getElementById('dash-toast');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      persistData();
      const updatedHTML = generateProductionHTML();
      
      // Trigger browser download of index.html
      const blob = new Blob([updatedHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('تم تصدير وتنزيل ملف index.html المحدث بنجاح!');
    });
  }

  // Reset to default button
  const resetBtn = document.getElementById('btn-reset-default');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('هل أنت متأكد من استعادة البيانات الافتراضية الأصلية للموقع؟')) {
        localStorage.removeItem('moqawel_site_data');
        siteData = { ...defaultSiteData };
        initFormBindings();
        renderServicesEditor();
        showToast('تمت استعادة البيانات الافتراضية.');
      }
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('dash-toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
