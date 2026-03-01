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
