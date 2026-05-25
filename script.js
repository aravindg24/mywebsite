/**
 * ARAVIND.AI - High-End Animated Landing Page Orchestrator
 * Fusing playful character-driven motion (corgi.insure) with futuristic neon physics (supermemory.ai)
 * Architecture: Modular native JS with CDN fallbacks, GPU-accelerated transforms, and telemetry logging.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Core Engine Initializer
    AppEngine.init();
});

const AppEngine = {
    init() {
        this.checkReducedMotion();
        this.initThemeToggle();
        this.initMobileMenu();
        this.initNavbarScroll();
        this.init3DTilt();
        this.initFeaturePanelMockup();
        this.initTelemetry();
        
        // Asynchronous Initializations
        this.initCanvasOrbs();
        this.initGSAPAnimations();
    },

    // 1. Accessibility Checks
    checkReducedMotion() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.reducedMotion) {
            console.log('%cℹ Accessibility: Reduced motion enabled. Disabling physics engine.', 'color: #A855F7; font-weight: bold;');
        }
    },

    // 2. Responsive Mobile Menu
    initMobileMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                const expanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !expanded);
                menu.classList.toggle('active');
                
                // Toggle hamburger animation
                const bars = toggle.querySelectorAll('.bar');
                if (!expanded) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });

            // Close menu on link click
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
                    toggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
                });
            });
        }
    },

    // 3. Floating Navbar Shrink Effect + Active Link Observer
    initNavbarScroll() {
        const nav = document.querySelector('.navbar');
        const links = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            // Shrink navbar
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Section Intersection Tracker for active nav dot
            let currentSec = '';
            sections.forEach(sec => {
                const secTop = sec.offsetTop - 120;
                const secHeight = sec.offsetHeight;
                if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                    currentSec = sec.getAttribute('id');
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSec}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    },

    // 4. 3D Card Interactive Tilt (Physics-based Damping)
    init3DTilt() {
        if (this.reducedMotion) return;

        const tiltElements = document.querySelectorAll('.tilt-element');

        tiltElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // mouse x inside card
                const y = e.clientY - rect.top;  // mouse y inside card
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation vectors (max 10 degrees)
                const rotateX = ((centerY - y) / centerY) * 8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Bloom shadow follows mouse
                card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(79, 123, 255, 0.15), var(--shadow-card)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.boxShadow = 'var(--shadow-card)';
            });
        });
    },

    // 5. Interactive Feature Split Panel Switcher (Supermemory Mockup)
    initFeaturePanelMockup() {
        const cards = document.querySelectorAll('.feature-card');
        const screen = document.getElementById('mockup-screen');

        const mockupTemplates = {
            'resolve-ai': `
                <div class="camera-grid">
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line vertical"></div>
                    <div class="scan-laser" style="background: linear-gradient(180deg, rgba(168, 85, 247, 0) 0%, var(--accent-purple) 50%, rgba(168, 85, 247, 0) 100%); box-shadow: 0 0 15px var(--accent-purple);"></div>
                    <div class="camera-stream active-yolo">
                        <svg class="simulation-vector" viewBox="0 0 300 200">
                            <rect class="mock-vehicle" x="60" y="60" width="180" height="80" rx="10" />
                            <circle class="mock-wheel" cx="95" cy="140" r="20" />
                            <circle class="mock-wheel" cx="205" cy="140" r="20" />
                            <line x1="60" y1="100" x2="240" y2="100" class="chassis-line" />
                        </svg>
                        <div class="bounding-box box-1" style="top: 25%; left: 18%; width: 62%; height: 50%;">
                            <span class="box-tag font-mono">VEHICLE CLASSIFIED [98.4%]</span>
                        </div>
                        <div class="bounding-box box-2 blink-glow" style="top: 50%; left: 22%; width: 15%; height: 20%;">
                            <span class="box-tag hazard font-mono">HAZARD: SCRATCH [91.2%]</span>
                        </div>
                    </div>
                </div>
                <div class="screen-diagnostics font-mono">
                    <div class="diag-col">
                        <p class="diag-header">DETECTION LOG</p>
                        <p class="diag-log-row">> YOLOv8m loading parameters...</p>
                        <p class="diag-log-row">> Model weights validated.</p>
                        <p class="diag-log-row text-glow-purple">> [CLIP] Embedding overlap at 0.912</p>
                    </div>
                    <div class="diag-col">
                        <p class="diag-header">TELEMETRY MATRIX</p>
                        <div class="matrix-meter-bar">
                            <span>PRECISION:</span>
                            <div class="meter"><div class="fill" style="width: 90%; background: var(--accent-purple);"></div></div>
                        </div>
                        <div class="matrix-meter-bar">
                            <span>INFERENCE:</span>
                            <div class="meter"><div class="fill" style="width: 25%; background: var(--accent-purple);"></div></div>
                        </div>
                    </div>
                </div>
            `,
            'road-ai': `
                <div class="camera-grid">
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line vertical"></div>
                    <div class="scan-laser" style="background: linear-gradient(180deg, rgba(79, 123, 255, 0) 0%, var(--accent-blue) 50%, rgba(79, 123, 255, 0) 100%); box-shadow: 0 0 15px var(--accent-blue);"></div>
                    <div class="camera-stream">
                        <svg class="simulation-vector" viewBox="0 0 300 200">
                            <!-- Lane vectors -->
                            <line x1="150" y1="40" x2="30" y2="180" stroke="var(--accent-blue)" stroke-width="4" stroke-dasharray="10" />
                            <line x1="150" y1="40" x2="270" y2="180" stroke="var(--accent-blue)" stroke-width="4" />
                            <!-- Scanning target -->
                            <polygon points="120,120 180,120 220,170 80,170" fill="rgba(79, 123, 255, 0.15)" stroke="var(--accent-blue)" stroke-width="1.5" />
                        </svg>
                        <div class="bounding-box box-1" style="top: 55%; left: 26%; width: 48%; height: 30%; border-color: var(--accent-blue);">
                            <span class="box-tag font-mono" style="background: var(--accent-blue);">ROUTING ZONE: SAFE</span>
                        </div>
                    </div>
                </div>
                <div class="screen-diagnostics font-mono">
                    <div class="diag-col">
                        <p class="diag-header">LANE ANALYZER</p>
                        <p class="diag-log-row">> Road mesh mapping online.</p>
                        <p class="diag-log-row">> SSIM overlap validated: 0.9226</p>
                        <p class="diag-log-row text-glow-blue">> FPS tracking status: 22 FPS</p>
                    </div>
                    <div class="diag-col">
                        <p class="diag-header">MATRIX CHASSIS</p>
                        <div class="matrix-meter-bar">
                            <span>RELIABILITY:</span>
                            <div class="meter"><div class="fill" style="width: 95%; background: var(--accent-blue);"></div></div>
                        </div>
                        <div class="matrix-meter-bar">
                            <span>LATENCY:</span>
                            <div class="meter"><div class="fill" style="width: 15%; background: var(--accent-blue);"></div></div>
                        </div>
                    </div>
                </div>
            `,
            'rag-ai': `
                <div class="camera-grid">
                    <div class="grid-line horizontal" style="top: 25%;"></div>
                    <div class="grid-line horizontal" style="top: 75%;"></div>
                    <div class="grid-line vertical" style="left: 33%;"></div>
                    <div class="grid-line vertical" style="left: 66%;"></div>
                    <div class="camera-stream font-mono" style="font-size: 0.7rem; flex-direction: column; justify-content: start; align-items: start; padding: 20px; color: var(--accent-teal);">
                        <p class="text-glow-green" style="margin-bottom: 8px;">[VECTORS RETRIEVED FROM QDRANT]</p>
                        <p style="color: #FFF;">Query: "Isolate structural high-voltage line failure."</p>
                        <p style="color: var(--text-dim); margin-top: 4px;">1. ID: 8243 | Score: 0.982 | Chunk: "Fuse box overload precautions..."</p>
                        <p style="color: var(--text-dim);">2. ID: 4421 | Score: 0.924 | Chunk: "Conductive hazards on wet surfaces..."</p>
                        <p style="color: var(--text-dim);">3. ID: 1294 | Score: 0.891 | Chunk: "Transformer decoupling matrices..."</p>
                    </div>
                </div>
                <div class="screen-diagnostics font-mono">
                    <div class="diag-col">
                        <p class="diag-header">COGNITIVE INDEX</p>
                        <p class="diag-log-row">> Connecting BioMistral local core...</p>
                        <p class="diag-log-row">> LangChain pipeline initialised.</p>
                        <p class="diag-log-row text-glow-green">> Private patient context isolated.</p>
                    </div>
                    <div class="diag-col">
                        <p class="diag-header">QDRANT NODE</p>
                        <div class="matrix-meter-bar">
                            <span>RECALL:</span>
                            <div class="meter"><div class="fill" style="width: 98%; background: var(--accent-teal);"></div></div>
                        </div>
                        <div class="matrix-meter-bar">
                            <span>GPU LOAD:</span>
                            <div class="meter"><div class="fill" style="width: 45%; background: var(--accent-teal);"></div></div>
                        </div>
                    </div>
                </div>
            `,
            'generic-ai': `
                <div class="camera-grid">
                    <div class="scan-laser" style="animation-duration: 1.5s; background: linear-gradient(180deg, rgba(236, 72, 153, 0) 0%, var(--accent-pink) 50%, rgba(236, 72, 153, 0) 100%); box-shadow: 0 0 15px var(--accent-pink);"></div>
                    <div class="camera-stream font-mono" style="justify-content: center; align-items: center; color: var(--accent-pink); font-size: 0.9rem;">
                        <span class="blink-glow">COGNITIVE SYSTEMS NOMINAL</span>
                    </div>
                </div>
                <div class="screen-diagnostics font-mono">
                    <div class="diag-col">
                        <p class="diag-header">INFRASTRUCTURE</p>
                        <p class="diag-log-row">> Multi-stage Docker build: SUCCESS</p>
                        <p class="diag-log-row">> GCP Cloud Run auto-scaling online.</p>
                        <p class="diag-log-row">> Kubernetes container status: STABLE</p>
                    </div>
                    <div class="diag-col">
                        <p class="diag-header">POD LOAD</p>
                        <div class="matrix-meter-bar">
                            <span>UPTIME:</span>
                            <div class="meter"><div class="fill" style="width: 99%; background: var(--accent-pink);"></div></div>
                        </div>
                        <div class="matrix-meter-bar">
                            <span>MEMORY:</span>
                            <div class="meter"><div class="fill" style="width: 32%; background: var(--accent-pink);"></div></div>
                        </div>
                    </div>
                </div>
            `
        };

        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const key = card.getAttribute('data-mockup');
                if (mockupTemplates[key] && screen) {
                    // Soft fade out / in transition
                    screen.style.opacity = '0';
                    setTimeout(() => {
                        screen.innerHTML = mockupTemplates[key];
                        screen.style.opacity = '1';
                        // Re-trigger visual analytics log
                        console.log(`%c📊 Telemetry: Switched vision screen to module [${key}]`, 'color: #4F7BFF;');
                    }, 200);
                }
            });

            // Accessibility trigger
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    },

    // 6. Canvas Engines: Drifting Background + Draggable Skills Orb (Neural Nexus)
    initCanvasOrbs() {
        if (this.reducedMotion) return;

        // Initialize Background Canvas (Hero Section Drifts)
        this.setupBackgroundParticles();
        
        // Initialize Core Canvas (Neural Nexus Skills Orb)
        this.setupNeuralNexusOrb();
    },

    setupBackgroundParticles() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        window.addEventListener('resize', () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }, { passive: true });

        // Simple floating particle class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
                ctx.fill();
            }
        }

        // Generate 45 light drifting nodes
        const numParticles = 45;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        // Draw connections logic
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(79, 123, 255, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();
    },

    setupNeuralNexusOrb() {
        const canvas = document.getElementById('neural-nexus-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        window.addEventListener('resize', () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }, { passive: true });

        // Skill parameters mapped into the neural network orb
        const skills = [
            { name: 'Python', color: '#4F7BFF', score: 0.95 },
            { name: 'PyTorch', color: '#A855F7', score: 0.94 },
            { name: 'React 19', color: '#EC4899', score: 0.92 },
            { name: 'YOLOv8', color: '#14B8A6', score: 0.90 },
            { name: 'TypeScript', color: '#60A5FA', score: 0.92 },
            { name: 'Docker', color: '#C084FC', score: 0.88 },
            { name: 'Kubernetes', color: '#34D399', score: 0.88 },
            { name: 'AWS', color: '#4F7BFF', score: 0.90 },
            { name: 'Gemini API', color: '#EC4899', score: 0.94 },
            { name: 'LangChain', color: '#14B8A6', score: 0.92 },
            { name: 'Java', color: '#C084FC', score: 0.88 },
            { name: 'C++', color: '#60A5FA', score: 0.80 },
            { name: 'Qdrant', color: '#34D399', score: 0.88 }
        ];

        // Fusing Corgi morph mechanics: spring particles in a 3D sphere coordinate set
        let nodes = [];
        const radius = Math.min(width, height) * 0.28;

        skills.forEach((skill, index) => {
            // Golden spiral algorithm to distribute points evenly on 3D sphere
            const phi = Math.acos(-1 + (2 * index) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            nodes.push({
                name: skill.name,
                color: skill.color,
                score: skill.score,
                // Local 3D Coordinates
                x3d: radius * Math.sin(phi) * Math.cos(theta),
                y3d: radius * Math.sin(phi) * Math.sin(theta),
                z3d: radius * Math.cos(phi),
                // Projection Coordinates
                x2d: 0,
                y2d: 0,
                scale: 1,
                alpha: 1
            });
        });

        // Rotation angles
        let angleX = 0.003;
        let angleY = 0.003;

        // Interaction coordinates
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let targetAngleX = 0.003;
        let targetAngleY = 0.003;

        // Mouse listeners
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - lastMouseX;
                const deltaY = e.clientY - lastMouseY;
                
                targetAngleY = deltaX * 0.0003;
                targetAngleX = -deltaY * 0.0003;

                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            }
        });

        // 3D coordinate rotation transformation
        function rotatePoints() {
            // Damping towards targets (Spring physics feel)
            angleX += (targetAngleX - angleX) * 0.08;
            angleY += (targetAngleY - angleY) * 0.08;

            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            nodes.forEach(node => {
                // Rotate around Y
                const x1 = node.x3d * cosY - node.z3d * sinY;
                const z1 = node.z3d * cosY + node.x3d * sinY;

                // Rotate around X
                const y2 = node.y3d * cosX - z1 * sinX;
                const z2 = z1 * cosX + node.y3d * sinX;

                node.x3d = x1;
                node.y3d = y2;
                node.z3d = z2;

                // Project to 2D screen coordinate
                const perspective = (radius * 2) / (radius * 2 + z2);
                node.x2d = x1 * perspective + width / 2;
                node.y2d = y2 * perspective + height / 2;
                node.scale = perspective;
                node.alpha = (z2 + radius) / (radius * 2); // deeper nodes are more transparent
            });

            // Decay speed back to a gentle standard rotate
            if (!isDragging) {
                targetAngleX += (0.002 - targetAngleX) * 0.02;
                targetAngleY += (0.002 - targetAngleY) * 0.02;
            }
        }

        function renderNetwork() {
            ctx.clearRect(0, 0, width, height);

            rotatePoints();

            // 1. Draw connecting neural pathways (synaptic lines)
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist3d = Math.sqrt(
                        Math.pow(nodes[i].x3d - nodes[j].x3d, 2) +
                        Math.pow(nodes[i].y3d - nodes[j].y3d, 2) +
                        Math.pow(nodes[i].z3d - nodes[j].z3d, 2)
                    );

                    // Connect adjacent points to form a beautiful sphere wireframe
                    if (dist3d < radius * 1.35) {
                        const alpha = Math.min(nodes[i].alpha, nodes[j].alpha) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x2d, nodes[i].y2d);
                        ctx.lineTo(nodes[j].x2d, nodes[j].y2d);
                        
                        // Fusing colors representing overlapping capabilities
                        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                        ctx.stroke();
                    }
                }
            }

            // 2. Draw nodes and text labels
            nodes.sort((a, b) => b.z3d - a.z3d); // Render deeper nodes first

            nodes.forEach(node => {
                const nodeRadius = 6 * node.scale;
                
                // Draw glowing core node shadow
                ctx.beginPath();
                ctx.arc(node.x2d, node.y2d, nodeRadius * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = node.color + Math.floor(node.alpha * 50).toString(16).padStart(2, '0');
                ctx.fill();

                // Draw solid node
                ctx.beginPath();
                ctx.arc(node.x2d, node.y2d, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Text labels
                ctx.font = `bold ${Math.max(10, 12 * node.scale)}px 'Inter', sans-serif`;
                ctx.fillStyle = `rgba(248, 249, 251, ${node.alpha * 0.95})`;
                ctx.fillText(node.name, node.x2d + nodeRadius + 6, node.y2d + 4);
            });

            requestAnimationFrame(renderNetwork);
        }

        renderNetwork();
    },

    // 7. Kinetic GSAP & ScrollTrigger Pipelines with Native Fallbacks
    initGSAPAnimations() {
        // Fallback Animation using native intersection observer if GSAP is unavailable
        const animateWithObserver = () => {
            const elements = document.querySelectorAll('.scroll-trigger');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => observer.observe(el));
        };

        // Check for GSAP CDN availability
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.log('%c⚠️ GSAP or ScrollTrigger CDN failed to load. Initiating native IntersectionObserver.', 'color: #EC4899; font-weight: bold;');
            animateWithObserver();
            return;
        }

        // GSAP loaded successfully
        gsap.registerPlugin(ScrollTrigger);

        if (this.reducedMotion) return;

        // Kinetic Headline Slide-in Split Animation
        const kineticTitle = document.querySelector('.kinetic-text');
        if (kineticTitle) {
            // Re-organize heading as letters using native split to bypass extra type scripts if not active
            const text = kineticTitle.innerHTML.trim();
            gsap.fromTo(kineticTitle, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
            );
        }

        // Section slide-ups
        const triggerSections = document.querySelectorAll('.scroll-trigger');
        triggerSections.forEach(sec => {
            gsap.fromTo(sec.querySelectorAll('.glass-card'), 
                { opacity: 0, y: 40 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.85, 
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sec,
                        start: 'top 82%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Parallax scroll effect on blobs
        gsap.to('.blob-1', {
            y: 120,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        gsap.to('.blob-2', {
            y: -120,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    },

    // 8. Telemetry Logs: Click trackers, performance metrics, and scroll depth observers
    initTelemetry() {
        console.log('%c🚀 System: Initializing telemetry logging modules...', 'color: #14B8A6; font-weight: bold;');

        // Click interaction logging
        document.querySelectorAll('a, button, .feature-card').forEach(el => {
            el.addEventListener('click', (e) => {
                const label = el.ariaLabel || el.textContent.trim() || el.className;
                console.log(`%c📊 Telemetry: [Click Event] Target: "${label}"`, 'color: #14B8A6;');
            });
        });

        // Scroll Depth Observer
        let scrolled25 = false;
        let scrolled50 = false;
        let scrolled75 = false;
        let scrolled100 = false;

        window.addEventListener('scroll', () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

            if (percent >= 25 && !scrolled25) {
                scrolled25 = true;
                console.log('%c📊 Telemetry: [Scroll Depth] 25% threshold passed.', 'color: #14B8A6;');
            }
            if (percent >= 50 && !scrolled50) {
                scrolled50 = true;
                console.log('%c📊 Telemetry: [Scroll Depth] 50% threshold passed.', 'color: #14B8A6;');
            }
            if (percent >= 75 && !scrolled75) {
                scrolled75 = true;
                console.log('%c📊 Telemetry: [Scroll Depth] 75% threshold passed.', 'color: #14B8A6;');
            }
            if (percent >= 98 && !scrolled100) {
                scrolled100 = true;
                console.log('%c📊 Telemetry: [Scroll Depth] 100% boundary completed.', 'color: #14B8A6;');
            }
        }, { passive: true });

        // Core Web Vitals Logger
        if ('PerformanceObserver' in window) {
            try {
                // 1. LCP (Largest Contentful Paint)
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log(`%c⚡ Web Vitals: LCP = ${lastEntry.startTime.toFixed(2)}ms`, 'color: #22C55E; font-weight: bold;');
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

                // 2. FID (First Input Delay)
                const fidObserver = new PerformanceObserver((entryList) => {
                    entryList.getEntries().forEach(entry => {
                        const delay = entry.processingStart - entry.startTime;
                        console.log(`%c⚡ Web Vitals: FID = ${delay.toFixed(2)}ms`, 'color: #22C55E; font-weight: bold;');
                    });
                });
                fidObserver.observe({ type: 'first-input', buffered: true });

                // 3. CLS (Cumulative Layout Shift)
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            console.log(`%c⚡ Web Vitals: CLS Shift Detected = ${clsValue.toFixed(4)}`, 'color: #F59E0B; font-weight: bold;');
                        }
                    }
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });

            } catch (err) {
                console.log('Performance observers not fully supported in this context.', err);
            }
        }
    },

    // 9. Manual Theme Toggle Switcher
    initThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Check if theme preference was previously saved
        const storedTheme = localStorage.getItem('theme-preference');
        if (storedTheme === 'light') {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else if (storedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }

        toggle.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-mode') || 
                            (!document.body.classList.contains('dark-mode') && window.matchMedia('(prefers-color-scheme: light)').matches);
            
            if (isLight) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme-preference', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme-preference', 'light');
            }
            console.log('%c🌗 Theme Switcher: Theme updated manually.', 'color: #A855F7; font-weight: bold;');
        });
    }
};
