document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.site-header');
	const siteVideo = document.getElementById('siteBgVideo');
	const scrollBtn = document.getElementById('scrollToServices');

	if (header) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 50) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}
		});
	}

	if (scrollBtn) {
		scrollBtn.addEventListener('click', function () {
			const servicesSection = document.getElementById('services');
			if (servicesSection) {
				servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	}

	function tryPlaySiteVideo() {
		if (!siteVideo) return;

		siteVideo.muted = true;
		const playPromise = siteVideo.play();

		if (playPromise && playPromise.catch) {
			playPromise.catch(function () {
				function onFirstGesture() {
					siteVideo.play().catch(function () {});
					window.removeEventListener('click', onFirstGesture);
					window.removeEventListener('touchstart', onFirstGesture);
				}

				window.addEventListener('click', onFirstGesture, { once: true });
				window.addEventListener('touchstart', onFirstGesture, { once: true });
			});
		}
	}

	tryPlaySiteVideo();
});

// Contact Image Modal
const contactImg = document.getElementById('contactImg');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

if (contactImg) {
    contactImg.onclick = function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
    }
}

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

if (modal) {
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Why Roatre Modal
const whyRoatreBtn = document.getElementById('whyRoatreBtn');
const whyRoatreModal = document.getElementById('whyRoatreModal');
const modalClose = document.querySelector('.modal-close');

if (whyRoatreBtn) {
    whyRoatreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        whyRoatreModal.style.display = 'block';
    });
}

if (modalClose) {
    modalClose.addEventListener('click', function() {
        whyRoatreModal.style.display = 'none';
    });
}

if (whyRoatreModal) {
    whyRoatreModal.addEventListener('click', function(e) {
        if (e.target === whyRoatreModal) {
            whyRoatreModal.style.display = 'none';
        }
    });
}

// Demo Registration Form
const demoForm = document.getElementById('demoRegisterForm');
if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for registering! Our team will contact you soon.');
        demoForm.reset();
    });
}

// Scroll to form on demo page if hash is present
if (window.location.hash === '#demoRegisterForm') {
    setTimeout(function() {
        const form = document.getElementById('demoRegisterForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
    });
}

// Resources Page Logic
document.addEventListener('DOMContentLoaded', function() {
    // Filtering
    const filterBtns = document.querySelectorAll('.res-filter-btn');
    const resCards = document.querySelectorAll('.res-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                resCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        // Add a small animation effect
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Resource Modal
    const resModal = document.getElementById('resourceModal');
    const resLinks = document.querySelectorAll('.res-link');
    const resClose = document.querySelector('.close-resource');
    const resModalImg = document.getElementById('resModalImg');
    const resModalTitle = document.getElementById('resModalTitle');
    const resModalText = document.getElementById('resModalText');
    const resModalTag = document.getElementById('resModalTag');
    const resModalContent = document.querySelector('.resource-modal-content');
    const modalThemeClasses = ['modal-theme-blog', 'modal-theme-coach', 'modal-theme-insights', 'modal-theme-faqs'];

    if (resModal && resLinks.length > 0) {
        resLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.res-card');
                const title = card.querySelector('h3').innerText;
                const imgSrc = card.querySelector('.res-card-media img').src;
                const hiddenContent = card.querySelector('.res-hidden-content').innerHTML;
                const section = card.closest('.resource-section');
                const sectionName = section ? section.getAttribute('data-section') : 'Resource';
                const sectionTheme = section ? section.getAttribute('data-modal-theme') : '';

                resModalTitle.innerText = title;
                resModalImg.src = imgSrc;
                resModalText.innerHTML = hiddenContent;
                if (resModalTag) {
                    resModalTag.innerText = sectionName;
                }
                if (resModalContent) {
                    resModalContent.classList.remove(...modalThemeClasses);
                    if (sectionTheme) {
                        resModalContent.classList.add('modal-theme-' + sectionTheme);
                    }
                }
                
                resModal.style.display = 'block';
            });
        });

        if (resClose) {
            resClose.addEventListener('click', function() {
                resModal.style.display = 'none';
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === resModal) {
                resModal.style.display = 'none';
            }
        });
    }

    // Resources submenu navigation: keep all content visible and scroll to target section
    const resourceSectionLinks = document.querySelectorAll('.resources-submenu a[href^="#"]');
    const resourceSections = document.querySelectorAll('.resources-page-wrapper .resource-section');
    const resourcesCenter = document.getElementById('resources-center');
    const resourcesNavMainLink = document.querySelector('.resources-nav-item > a[href*="resources.html"]');

    function showAllResourceSections() {
        if (resourceSections.length === 0) return null;

        resourceSections.forEach(section => {
            section.classList.remove('is-hidden');
        });

        return resourcesCenter || resourceSections[0];
    }

    if (resourcesNavMainLink) {
        resourcesNavMainLink.addEventListener('click', function(e) {
            const isOnResourcesPage = window.location.pathname.toLowerCase().endsWith('/resources.html') ||
                window.location.pathname.toLowerCase().endsWith('resources.html');
            if (!isOnResourcesPage) return;

            e.preventDefault();
            const topSection = showAllResourceSections();
            if (topSection) {
                const header = document.querySelector('.site-header');
                const headerOffset = header ? header.offsetHeight + 18 : 0;
                const y = topSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }

    if (resourceSectionLinks.length > 0) {
        resourceSectionLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const target = targetId ? document.querySelector(targetId) : null;
                if (!target) return;
                e.preventDefault();
                showAllResourceSections();

                const header = document.querySelector('.site-header');
                const headerOffset = header ? header.offsetHeight + 18 : 0;
                const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
            });
        });
    }
});
