// loadnavbar.js
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    initializeNavEvents(); // Run only after injection
  })
  .catch(error => console.error("Error loading navbar:", error));

let sidebarExpanded = true;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    sidebarExpanded = !sidebarExpanded;
    
    if (sidebarExpanded) {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-expanded');
        toggleIcon.textContent = '‹';
    } else {
        sidebar.classList.remove('sidebar-expanded');
        sidebar.classList.add('sidebar-collapsed');
        toggleIcon.textContent = '›';
    }
}

function openMobileMenu() {
    const overlay = document.getElementById('mobileOverlay');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobileOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initializeNavEvents() {
    // Desktop nav
    const desktopNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === "#") {
                // SPA-like behavior: block default & just toggle active
                e.preventDefault();
                desktopNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
            // else → real href is provided, allow redirect normally
        });
    });

    // Mobile bottom nav
    const mobileNavLinks = document.querySelectorAll('.bottom-nav-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('onclick')) {
                const href = this.getAttribute('href');
                if (!href || href === "#") {
                    e.preventDefault();
                    mobileNavLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Overlay nav
    const overlayNavLinks = document.querySelectorAll('.overlay-nav-item');
    overlayNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === "#") {
                e.preventDefault();
            }
            closeMobileMenu();
        });
    });

    // ESC key closes overlay
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}





// Highlight the active nav link based on current URL
function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop(); // e.g., "dashboard.html"
    
    // Sidebar nav
    const desktopNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPath)) {
            desktopNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Mobile bottom nav
    const mobileNavLinks = document.querySelectorAll('.bottom-nav-item');
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPath)) {
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// Run after navbar injection
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    initializeNavEvents();
    setActiveNavLink(); // Ensure correct nav item is highlighted
  })
  .catch(error => console.error("Error loading navbar:", error));
