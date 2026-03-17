document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.site-header');
	const siteVideo = document.getElementById('siteBgVideo');
	const scrollBtn = document.getElementById('scrollToServices');

	// Hamburger nav
	const nav = document.querySelector('.site-nav');
	if (nav && header) {
		const overlay = document.createElement('div');
		overlay.className = 'nav-overlay';
		document.body.appendChild(overlay);

		const toggle = document.createElement('button');
		toggle.className = 'nav-toggle';
		toggle.setAttribute('aria-label', 'Toggle navigation');
		toggle.innerHTML = '<span></span><span></span><span></span>';
		header.appendChild(toggle);

		function closeNav() {
			toggle.classList.remove('open');
			nav.classList.remove('open');
			overlay.classList.remove('open');
			document.body.style.overflow = '';
		}

		toggle.addEventListener('click', function () {
			const isOpen = nav.classList.toggle('open');
			toggle.classList.toggle('open', isOpen);
			overlay.classList.toggle('open', isOpen);
			document.body.style.overflow = isOpen ? 'hidden' : '';
		});

		overlay.addEventListener('click', function(e) {
			if (!nav.contains(e.target)) {
				closeNav();
			}
		});
	}

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

// Solution Template Modal
const solutionTemplateBtn = document.getElementById('solutionTemplateBtn');
const solutionTemplateBtnAlt = document.getElementById('solutionTemplateBtnAlt');
const solutionTemplateModal = document.getElementById('solutionTemplateModal');
const solutionTemplateClose = document.querySelector('.solution-modal-close');

function openSolutionTemplateModal() {
    if (!solutionTemplateModal) return;
    solutionTemplateModal.style.display = 'block';
    solutionTemplateModal.setAttribute('aria-hidden', 'false');
}

function closeSolutionTemplateModal() {
    if (!solutionTemplateModal) return;
    solutionTemplateModal.style.display = 'none';
    solutionTemplateModal.setAttribute('aria-hidden', 'true');
}

if (solutionTemplateBtn) {
    solutionTemplateBtn.addEventListener('click', openSolutionTemplateModal);
}

if (solutionTemplateBtnAlt) {
    solutionTemplateBtnAlt.addEventListener('click', openSolutionTemplateModal);
}

if (solutionTemplateClose) {
    solutionTemplateClose.addEventListener('click', closeSolutionTemplateModal);
}

if (solutionTemplateModal) {
    solutionTemplateModal.addEventListener('click', function(e) {
        if (e.target === solutionTemplateModal) {
            closeSolutionTemplateModal();
        }
    });
}

// Support Modal
const supportModalBtn = document.getElementById('supportModalBtn');
const supportModal = document.getElementById('supportModal');
const supportModalClose = document.querySelector('.support-modal-close');

function openSupportModal() {
    if (!supportModal) return;
    supportModal.style.display = 'block';
    supportModal.setAttribute('aria-hidden', 'false');
}

function closeSupportModal() {
    if (!supportModal) return;
    supportModal.style.display = 'none';
    supportModal.setAttribute('aria-hidden', 'true');
}

if (supportModalBtn) {
    supportModalBtn.addEventListener('click', openSupportModal);
}

if (supportModalClose) {
    supportModalClose.addEventListener('click', closeSupportModal);
}

if (supportModal) {
    supportModal.addEventListener('click', function(e) {
        if (e.target === supportModal) {
            closeSupportModal();
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
    
    function stripHtml(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html || '';
        return (temp.textContent || temp.innerText || '').replace(/\s+/g, ' ').trim();
    }

    function buildBlogModalMarkup(section, currentCard) {
        const blogCards = section ? section.querySelectorAll('.res-card') : [];
        const cardsMarkup = Array.from(blogCards).map((blogCard, index) => {
            const title = blogCard.querySelector('h3') ? blogCard.querySelector('h3').innerText.trim() : 'Guide';
            const image = blogCard.querySelector('.res-card-media img');
            const imageSrc = image ? image.src : '';
            const contentHtml = blogCard.querySelector('.res-hidden-content') ? blogCard.querySelector('.res-hidden-content').innerHTML : '';
            const description = stripHtml(contentHtml).slice(0, 115);
            const activeClass = blogCard === currentCard ? ' is-active' : '';

            return `
                <article class="blog-guide-card${activeClass}" data-card-index="${index}">
                    <div class="blog-guide-bg" style="background-image:url('${imageSrc}')"></div>
                    <div class="blog-guide-shade"></div>
                    <div class="blog-guide-content">
                        <p class="blog-guide-brand">ROATRE</p>
                        <h3>REPORT: ${title.toUpperCase()}</h3>
                        <span class="blog-guide-rule"></span>
                        <p>${description}</p>
                    </div>
                </article>
            `;
        }).join('');

        return `
            <div class="blog-modal-shell">
                <h2 class="blog-modal-title">REPORTS &amp; GUIDES</h2>
                <div class="blog-modal-carousel-wrap">
                    <button type="button" class="blog-modal-nav blog-modal-nav--prev" aria-label="Previous guides">&#10094;</button>
                    <div class="blog-modal-track" id="blogModalTrack">${cardsMarkup}</div>
                    <button type="button" class="blog-modal-nav blog-modal-nav--next" aria-label="Next guides">&#10095;</button>
                </div>
            </div>
        `;
    }

    function initBlogModalCarousel() {
        const track = document.getElementById('blogModalTrack');
        const prev = document.querySelector('.blog-modal-nav--prev');
        const next = document.querySelector('.blog-modal-nav--next');
        if (!track || !prev || !next) return;

        const scrollAmount = () => {
            const firstCard = track.querySelector('.blog-guide-card');
            return firstCard ? firstCard.offsetWidth + 14 : 320;
        };

        prev.addEventListener('click', function() {
            track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
        next.addEventListener('click', function() {
            track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }

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

                if (sectionTheme === 'blog') {
                    resModalTitle.innerText = 'Reports & Guides';
                    resModalImg.style.display = 'none';
                    if (resModalTag) resModalTag.style.display = 'none';
                    resModalTitle.style.display = 'none';
                    resModalText.innerHTML = buildBlogModalMarkup(section, card);
                    initBlogModalCarousel();
                } else {
                    resModalImg.style.display = 'block';
                    if (resModalTag) resModalTag.style.display = 'inline-block';
                    resModalTitle.style.display = 'block';
                    resModalText.innerHTML = hiddenContent;
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
    const isOnResourcesPage = window.location.pathname.toLowerCase().endsWith('/resources.html') ||
        window.location.pathname.toLowerCase().endsWith('resources.html');

    function showAllResourceSections() {
        if (resourceSections.length === 0) return null;

        resourceSections.forEach(section => {
            section.classList.remove('is-hidden');
        });

        return resourcesCenter || resourceSections[0];
    }

    if (resourcesNavMainLink) {
        resourcesNavMainLink.addEventListener('click', function(e) {
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
                if (!targetId) return;

                if (!isOnResourcesPage) {
                    e.preventDefault();
                    window.location.href = `resources.html${targetId}`;
                    return;
                }

                const target = document.querySelector(targetId);
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

    // Blog section horizontal navigation
    const blogTrack = document.querySelector('.blog-feature-track');
    const blogPrev = document.querySelector('.blog-section-nav--prev');
    const blogNext = document.querySelector('.blog-section-nav--next');
    if (blogTrack && blogPrev && blogNext) {
        const blogScrollAmount = () => {
            const firstCard = blogTrack.querySelector('.blog-feature-card');
            return firstCard ? firstCard.offsetWidth + 12 : 320;
        };

        blogPrev.addEventListener('click', function() {
            blogTrack.scrollBy({ left: -blogScrollAmount(), behavior: 'smooth' });
        });
        blogNext.addEventListener('click', function() {
            blogTrack.scrollBy({ left: blogScrollAmount(), behavior: 'smooth' });
        });
    }

    // FAQ accordion behavior (single-open pattern)
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentItem = this.closest('.faq-item');
                const isOpen = currentItem && currentItem.classList.contains('is-open');

                faqItems.forEach(item => {
                    item.classList.remove('is-open');
                    const q = item.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });

                if (currentItem && !isOpen) {
                    currentItem.classList.add('is-open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // Help center topic search
    const helpTopicSearch = document.getElementById('helpTopicSearch');
    const helpTopicCards = document.querySelectorAll('.help-topic-card');
    if (helpTopicSearch && helpTopicCards.length > 0) {
        helpTopicSearch.addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            helpTopicCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = !q || text.includes(q) ? 'flex' : 'none';
            });
        });
    }
});

// Coach Education Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
	const coachModal = document.getElementById('coachModal');
	const coachCloseBtn = document.querySelector('.close-coach');
	const coachLinks = document.querySelectorAll('.coach-academy-card .res-link');

	coachLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const card = this.closest('.coach-academy-card');
			const tag = card.querySelector('.coach-academy-card-tag').textContent;
			const title = card.querySelector('h3').textContent;
			const img = card.querySelector('.res-card-media img').src;
			const hiddenContent = card.querySelector('.res-hidden-content').innerHTML;

			document.getElementById('coachModalTag').textContent = tag;
			document.getElementById('coachModalTitle').textContent = title;
			document.getElementById('coachModalImg').src = img;
			document.getElementById('coachModalText').innerHTML = hiddenContent;

			coachModal.style.display = 'block';
			document.body.style.overflow = 'hidden';
		});
	});

	if (coachCloseBtn) {
		coachCloseBtn.addEventListener('click', function() {
			coachModal.style.display = 'none';
			document.body.style.overflow = 'auto';
		});
	}

	window.addEventListener('click', function(e) {
		if (e.target === coachModal) {
			coachModal.style.display = 'none';
			document.body.style.overflow = 'auto';
		}
	});
});
