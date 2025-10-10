// Crypto App JS - Complete for Site2
(function() {
    'use strict';
    
    // Initialize crypto features
    document.addEventListener('DOMContentLoaded', initCryptoApp);
    
    function initCryptoApp() {
        setupCryptoAnimations();
        initCryptoInteractions();
        handleCryptoNavigation();
        setupCryptoCounters();
        initFloatingMenu();
    }
    
    // Setup crypto animations
    function setupCryptoAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('crypto-visible');
                        if (entry.target.dataset.cryptoAnimation) {
                            entry.target.style.animation = entry.target.dataset.cryptoAnimation;
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        
        // Observe crypto elements and feature cards
        document.querySelectorAll('.crypto-feature, .crypto-step-card, .feature-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize crypto interactions
    function initCryptoInteractions() {
        // Copy crypto code on click
        const cryptoCode = document.querySelector('.crypto-code');
        if (cryptoCode) {
            cryptoCode.addEventListener('click', function() {
                const code = 'players1';
                navigator.clipboard.writeText(code).then(() => {
                    const original = this.textContent;
                    this.textContent = '✓ Copied!';
                    this.style.color = '#00ff88';
                    
                    setTimeout(() => {
                        this.textContent = original;
                        this.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Copy failed:', err);
                });
            });
            
            cryptoCode.style.cursor = 'pointer';
            cryptoCode.title = 'Click to copy';
        }
        
        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                const wasActive = item.classList.contains('active');
                
                // Close all
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked if wasn't active
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Handle crypto navigation
    function handleCryptoNavigation() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offset = 100;
                        const elementPosition = target.offsetTop - offset;
                        
                        window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                        });
                        
                        // Highlight effect
                        target.style.background = 'rgba(0, 255, 136, 0.1)';
                        setTimeout(() => {
                            target.style.transition = 'background 1s';
                            target.style.background = '';
                        }, 1500);
                    }
                }
            });
        });
        
        // Create floating scroll indicator
        createCryptoScrollIndicator();
    }
    
    // Setup crypto counters
    function setupCryptoCounters() {
        const counters = [
            { selector: '.crypto-counter-btc', end: 50000, suffix: '$', duration: 2000 },
            { selector: '.crypto-counter-coins', end: 22, suffix: '+', duration: 1500 },
            { selector: '.crypto-counter-time', end: 10, suffix: 'min', duration: 1000 },
            { selector: '.bonus-amount', end: 500, suffix: ' 보너스', prefix: '코인 입금시 $', duration: 2000 }
        ];
        
        counters.forEach(counter => {
            const element = document.querySelector(counter.selector);
            if (element && !element.dataset.counted) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !element.dataset.counted) {
                            element.dataset.counted = 'true';
                            if (counter.selector === '.bonus-amount') {
                                // Special handling for bonus amount
                                const originalText = element.textContent;
                                animateCryptoCounter(element, 0, counter.end, counter.duration, counter.suffix, counter.prefix);
                            } else {
                                animateCryptoCounter(element, 0, counter.end, counter.duration, counter.suffix);
                            }
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(element);
            }
        });
    }
    
    // Animate counter
    function animateCryptoCounter(element, start, end, duration, suffix = '', prefix = '') {
        const range = end - start;
        const startTime = Date.now();
        
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * range + start);
            
            element.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress >= 1) {
                clearInterval(timer);
                element.textContent = prefix + end.toLocaleString() + suffix;
            }
        }, 16);
    }
    
    // Initialize floating menu
    function initFloatingMenu() {
        const menu = document.createElement('div');
        menu.className = 'crypto-floating-menu';
        menu.innerHTML = `
            <div class="crypto-menu-title">₿</div>
            <ul class="crypto-menu-items">
                <li><a href="#crypto-wallet-setup" class="crypto-menu-link">시작 가이드</a></li>
                <li><a href="#blockchain-account" class="crypto-menu-link">계정 생성</a></li>
                <li><a href="#usdt-bonus-entry" class="crypto-menu-link">보너스 받기</a></li>
                <li><a href="#verify-blockchain" class="crypto-menu-link">인증하기</a></li>
                <li><a href="#start-crypto-gaming" class="crypto-menu-link">게임 시작</a></li>
            </ul>
        `;
        
        // Only add menu on desktop
        if (window.innerWidth > 768) {
            document.body.appendChild(menu);
            
            // Update active menu item on scroll
            const sections = document.querySelectorAll('[id]');
            const menuLinks = menu.querySelectorAll('.crypto-menu-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Smooth scroll for menu links
            menuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        const offset = 100;
                        const elementPosition = target.offsetTop - offset;
                        
                        window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }
    
    // Create scroll indicator
    function createCryptoScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'crypto-scroll-indicator';
        indicator.innerHTML = '₿';
        indicator.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #00ff88, #00ccff);
            color: #000;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
        `;
        
        // Show/hide on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            if (window.scrollY > 300) {
                indicator.style.opacity = '1';
                indicator.style.visibility = 'visible';
                indicator.style.transform = 'scale(1)';
            } else {
                indicator.style.opacity = '0';
                indicator.style.visibility = 'hidden';
                indicator.style.transform = 'scale(0)';
            }
            
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 300) {
                    indicator.style.transform = 'scale(1) rotate(360deg)';
                }
            }, 500);
        });
        
        // Scroll to top on click
        indicator.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Spin animation
            indicator.style.transform = 'scale(1) rotate(720deg)';
            setTimeout(() => {
                indicator.style.transform = 'scale(1) rotate(360deg)';
            }, 500);
        });
        
        document.body.appendChild(indicator);
    }
    
    // Handle responsive
    window.addEventListener('resize', () => {
        const menu = document.querySelector('.crypto-floating-menu');
        if (menu) {
            if (window.innerWidth <= 768) {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }
    });
    
})();
