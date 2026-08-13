// Hero Typewriter Logic
document.addEventListener("DOMContentLoaded", () => {
    const typewriterCmd = document.getElementById('typewriter-command');
    const heroCursor = document.getElementById('hero-cursor');
    if (!typewriterCmd || !heroCursor) return;

    const heroCommands = [
        "./build_web.sh",
        "./solve_problems.py",
        "./study_algorithms.sh",
        "./ship_projects.sh"
    ];

    let currentCmdIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentCmd = heroCommands[currentCmdIndex];

        if (isDeleting) {
            // Erasing
            heroCursor.classList.remove('cursor-blink');
            typewriterCmd.textContent = currentCmd.substring(0, currentCharIndex - 1);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                isDeleting = false;
                currentCmdIndex = (currentCmdIndex + 1) % heroCommands.length;
                setTimeout(typeLoop, 400); // Pause before typing next
            } else {
                setTimeout(typeLoop, 30 + Math.random() * 20); // 30-50ms per char erasing
            }
        } else {
            // Typing
            heroCursor.classList.remove('cursor-blink');
            typewriterCmd.textContent = currentCmd.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === currentCmd.length) {
                isDeleting = true;
                heroCursor.classList.add('cursor-blink');
                setTimeout(typeLoop, 2000); // Pause when fully typed
            } else {
                setTimeout(typeLoop, 50 + Math.random() * 40); // 50-90ms per char typing
            }
        }
    }

    // Start loop after a short initial delay
    setTimeout(typeLoop, 500);
});

// Mobile Nav Logic
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobile-nav');
ham.addEventListener('click', () => { mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block'; });
function closeNav() { mobileNav.style.display = 'none'; }

// Navbar Active State Logic
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) {
            cur = s.id;
        }
    });

    if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        cur = 'contact';
    }

    navLinks.forEach(a => {
        if (a.getAttribute('href') === '#' + cur) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
}, { passive: true });

// Contact Form Logic
const targetEmail = "youssefammar1742007@gmail.com";
function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const message = document.getElementById('senderMessage').value;
    const subject = encodeURIComponent("message from " + name);
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = '> Initializing Mail Client...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('cf-ok').style.display = 'block';
        btn.textContent = 'Execute Send';
        btn.disabled = false;
        e.target.reset();
        setTimeout(() => document.getElementById('cf-ok').style.display = 'none', 4500);
    }, 1500);
}

// Lightbox Logic
function openLightbox(htmlContent) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-content').innerHTML = htmlContent;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    void lb.offsetWidth; // Force reflow
    lb.classList.remove('opacity-0');
    lb.classList.add('opacity-100');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('opacity-100');
    lb.classList.add('opacity-0');
    setTimeout(() => {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
    }, 200);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Carousel Logic
document.addEventListener("DOMContentLoaded", function () {
    const cCards = document.querySelectorAll('.carousel-card');
    const totalCards = cCards.length;
    let currIndex = 0;

    function updateCarousel() {
        cCards.forEach((card, index) => {
            const hasReveal = card.classList.contains('reveal');
            const hasRevealed = card.classList.contains('revealed');
            card.className = 'carousel-card absolute w-full max-w-[280px] sm:max-w-[320px] bg-[#020804] border border-[#163E4F] rounded-[4px] transition-all duration-300 ease-out cursor-pointer flex flex-col overflow-hidden';
            if (hasReveal) card.classList.add('reveal');
            if (hasRevealed) card.classList.add('revealed');

            if (index === currIndex) {
                card.classList.add('left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-100', 'opacity-100', 'z-10');
                card.style.borderColor = '#389DC6';
            } else if (index === (currIndex - 1 + totalCards) % totalCards) {
                card.classList.add('left-[15%]', 'sm:left-[20%]', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-90', 'opacity-50', 'z-0');
            } else if (index === (currIndex + 1) % totalCards) {
                card.classList.add('left-[85%]', 'sm:left-[80%]', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-90', 'opacity-50', 'z-0');
            } else {
                card.classList.add('left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-50', 'opacity-0', 'z-[-1]', 'pointer-events-none');
            }
        });
    }

    if (totalCards > 0) {
        document.getElementById('carousel-next').addEventListener('click', () => {
            currIndex = (currIndex + 1) % totalCards;
            updateCarousel();
        });

        document.getElementById('carousel-prev').addEventListener('click', () => {
            currIndex = (currIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });

        cCards.forEach((card, index) => {
            const imgTrigger = card.querySelector('.lightbox-trigger');
            if (imgTrigger) {
                imgTrigger.addEventListener('click', (e) => {
                    if (currIndex === index) {
                        e.stopPropagation();
                        const imgElement = imgTrigger.querySelector('img');
                        if (imgElement) {
                            const extractedImgSrc = imgElement.getAttribute('src');
                            const htmlContent = `<img src="${extractedImgSrc}" alt="Expanded View" style="width: 100%; height: 100%; object-fit: contain;">`;
                            openLightbox(htmlContent);
                        }
                    }
                });
            }

            card.addEventListener('click', () => {
                if (currIndex !== index) {
                    currIndex = index;
                    updateCarousel();
                }
            });
        });

        updateCarousel();
    }
});

// Penguins Toggle Logic
const penguinsCard = document.getElementById('penguins-card');
if (penguinsCard) {
    penguinsCard.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) {
            return;
        }
        
        const expandable = document.getElementById('penguins-expandable');
        const indicator = document.getElementById('penguins-arrow-indicator');
        
        if (expandable && indicator) {
            expandable.classList.toggle('expanded');
            indicator.classList.toggle('hidden-arrow');
        }
    });
}

// Nav Link Decrypt Effect Logic
const navLinksAll = document.querySelectorAll('.nav-link');
const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

navLinksAll.forEach(link => {
    // Cache original text so it is reliable
    const originalText = link.textContent.trim();
    link.setAttribute('data-original-text', originalText);
    
    let scrambleInterval = null;
    let iteration = 0;
    
    link.addEventListener('mouseenter', () => {
        clearInterval(scrambleInterval);
        iteration = 0;
        
        scrambleInterval = setInterval(() => {
            link.textContent = originalText.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration) return originalText[index];
                return charset[Math.floor(Math.random() * charset.length)];
            }).join('');
            
            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
                link.textContent = originalText;
            }
            
            iteration += 1 / 2; // speed adjustment
        }, 30);
    });
    
    link.addEventListener('mouseleave', () => {
        clearInterval(scrambleInterval);
        link.textContent = originalText;
    });
});

// Terminal Overlay Logic
const terminalBtn = document.getElementById('terminal-btn');
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');
const terminalWindow = document.getElementById('terminal-window');
const terminalFsBtn = document.getElementById('terminal-fullscreen-btn');
const fsExpandIcon = document.getElementById('fs-expand-icon');
const fsCompressIcon = document.getElementById('fs-compress-icon');
const crtFlash = document.getElementById('crt-flash');

// ── Terminal State & Transitions ──
let isTerminalTransitioning = false;
let terminalIsFullscreen = false;

function toggleTerminalFullscreen() {
    terminalIsFullscreen = !terminalIsFullscreen;
    if (terminalIsFullscreen) {
        terminalWindow.classList.add('terminal-fullscreen');
        fsExpandIcon.style.display = 'none';
        fsCompressIcon.style.display = '';
    } else {
        terminalWindow.classList.remove('terminal-fullscreen');
        fsExpandIcon.style.display = '';
        fsCompressIcon.style.display = 'none';
    }
}

if (terminalFsBtn) {
    terminalFsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTerminalFullscreen();
    });
}

function openTerminal() {
    if (isTerminalTransitioning || !terminalOverlay.classList.contains('hidden')) return;
    isTerminalTransitioning = true;

    // Show overlay background instantly
    terminalOverlay.classList.remove('hidden');
    terminalOverlay.classList.add('flex');
    terminalOverlay.classList.remove('opacity-0');
    terminalOverlay.classList.add('opacity-100');
    
    // Reset and trigger CRT animations
    terminalOverlay.classList.remove('crt-off');
    crtFlash.classList.remove('flash');
    void crtFlash.offsetWidth; // force reflow
    
    terminalOverlay.classList.add('crt-on');
    crtFlash.classList.add('flash');

    setTimeout(() => {
        if (terminalBody.innerHTML === '') {
            runBootSequence();
        } else {
            setTimeout(() => terminalInput.focus(), 200);
        }
        isTerminalTransitioning = false;
    }, 260); // crt-power-on duration
}

function closeTerminal() {
    if (isTerminalTransitioning || terminalOverlay.classList.contains('hidden')) return;
    isTerminalTransitioning = true;

    // Reset and trigger CRT off animations
    terminalOverlay.classList.remove('crt-on');
    crtFlash.classList.remove('flash');
    void crtFlash.offsetWidth;
    
    terminalOverlay.classList.add('crt-off');
    crtFlash.classList.add('flash');

    if (terminalIsFullscreen) {
        terminalIsFullscreen = false;
        terminalWindow.classList.remove('terminal-fullscreen');
        fsExpandIcon.style.display = '';
        fsCompressIcon.style.display = 'none';
    }

    setTimeout(() => {
        // Hide overlay fully
        terminalOverlay.classList.remove('opacity-100');
        terminalOverlay.classList.add('opacity-0');
        terminalOverlay.classList.add('hidden');
        terminalOverlay.classList.remove('flex');
        
        // Reset classes for next open
        terminalOverlay.classList.remove('crt-off');
        crtFlash.classList.remove('flash');
        
        isTerminalTransitioning = false;
    }, 200); // crt-power-off duration
}

if (terminalBtn) {
    terminalBtn.addEventListener('click', openTerminal);
}

terminalOverlay.addEventListener('click', (e) => {
    // Only close if clicking the background, not the window
    if (e.target === terminalOverlay) {
        closeTerminal();
    }
});

// Using a global keydown handler to catch '`' for terminal toggle and 'Escape' for closing
document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        e.preventDefault();
        if (terminalOverlay.classList.contains('hidden')) {
            openTerminal();
        } else {
            closeTerminal();
        }
    } else if (e.key === 'Escape' && !terminalOverlay.classList.contains('hidden')) {
        closeTerminal();
    }
});

// ── Terminal: Section mappings (Task 5 — varied extensions) ──
const sectionPaths = {
    'about':        'about/README.md',
    'projects':     'projects/list.sh',
    'achievements': 'achievements/log.md',
    'courses':      'courses/catalog.sh',
    'team':         'team/penguins.log',
    'media':        'media/watchlist.md',
    'contact':      'contact/links.sh'
};

const sectionLabels = {
    'about':        'About',
    'projects':     'Projects',
    'achievements': 'Achievements & Milestones',
    'courses':      'My Courses',
    'team':         'Hackathon Team',
    'media':        'Movies & Shows',
    'contact':      'Contact'
};

// Build commandsList dynamically
const commandsList = [
    ...Object.values(sectionPaths).map(p => 'cat ' + p),
    ...Object.keys(sectionPaths).map(s => 'cd ' + s),
    ...Object.keys(sectionPaths).map(s => 'open ' + s),
    'help', 'whoami', 'skills', 'sudo hire-me', 'sudo fullscreen',
    'fortune', 'clear', 'fedora', 'linux', 'exit',
    'ls', 'pwd', 'date', 'echo', 'man', 'history'
];

let commandHistory = [];
let historyIndex = -1;

// ── Terminal: Block Font Bitmap Data (7×9 dot-matrix per letter) ──
const BLOCK_FONT = {
  J: [
    "0011111",
    "0011111",
    "0000110",
    "0000110",
    "0000110",
    "1100110",
    "1100110",
    "0111100",
    "0011000"
  ],
  O: [
    "1111111",
    "1111111",
    "1100011",
    "1100011",
    "1100011",
    "1100011",
    "1100011",
    "1111111",
    "1111111"
  ],
  E: [
    "1111111",
    "1111111",
    "1100000",
    "1100000",
    "1111110",
    "1111110",
    "1100000",
    "1111111",
    "1111111"
  ]
};

// ── Terminal: Render block-logo as CSS grid voxels ──
function renderBlockLogo(word) {
    const container = document.createElement('div');
    container.className = 'block-logo-container';
    for (const char of word) {
        const bitmap = BLOCK_FONT[char];
        if (!bitmap) continue;
        const letterGrid = document.createElement('div');
        letterGrid.className = 'block-letter';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.className = 'block-cell';
                if (bitmap[row][col] === '1') {
                    cell.classList.add('block-cell--on');
                    cell.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
                }
                letterGrid.appendChild(cell);
            }
        }
        container.appendChild(letterGrid);
    }
    return container;
}

// ── Terminal: Boot Sequence (Tasks 2, 5, 6) ──
const bootLines = [
    // Logo + welcome handled separately via HTML
    "__LOGO__",
    "__WELCOME__",
    "",
    "Type 'help' to see all available commands and explore the website.",
    "",
    "┌─ Quick Navigation ─────────────────────────────────────────────────┐",
    "│ cat about/README.md      → view content  │ cd about        → jump │",
    "│ cat projects/list.sh     → view content  │ cd projects     → jump │",
    "│ cat achievements/log.md  → view content  │ cd achievements → jump │",
    "│ cat courses/catalog.sh   → view content  │ cd courses      → jump │",
    "│ cat team/penguins.log    → view content  │ cd team         → jump │",
    "│ cat media/watchlist.md   → view content  │ cd media        → jump │",
    "│ cat contact/links.sh     → view content  │ cd contact      → jump │",
    "└───────────────────────────────────────────────────────────────────┘",
    "",
    "┌─ Try ──────────────────────────────────────────────────────────────┐",
    "│ whoami · skills · sudo hire-me · fortune · ls · date · history    │",
    "└───────────────────────────────────────────────────────────────────┘",
    "",
    "root@fedora:~$ system --check",
    "<span style='color:var(--brand);'>✓ System Status: ONLINE</span>",
    "<span style='color:var(--brand);'>✓ Engineering student @ KSU</span>",
    "<span style='color:var(--brand);'>✓ Connection: SECURE</span>",
    "root@fedora:~$ portfolio --scan",
    "Loading sections...",
    "Loading interactive features...",
    "<span style='color:var(--brand);'>✓ All systems ready</span>",
    ""
];

function runBootSequence() {
    terminalInput.disabled = true;
    let i = 0;
    terminalBody.innerHTML = '';
    
    function printNextLine() {
        if (i < bootLines.length) {
            const content = bootLines[i];
            
            // Special: render block-logo (voxel/LED-display)
            if (content === "__LOGO__") {
                terminalBody.appendChild(renderBlockLogo('JOE'));
                i++;
                setTimeout(printNextLine, 120);
                return;
            }
            
            // Special: render welcome line
            if (content === "__WELCOME__") {
                const welcome = document.createElement('div');
                welcome.className = 'terminal-welcome';
                welcome.innerHTML = '<span style="color:var(--text-brand-strong);">✦</span> WELCOME TO JOE\'S TERMINAL <span style="color:var(--text-brand-strong);">✦</span>';
                terminalBody.appendChild(welcome);
                i++;
                setTimeout(printNextLine, 120);
                return;
            }
            
            const line = document.createElement('div');
            line.className = 'terminal-line';
            // Box-drawing lines need strict pre to keep columns aligned
            if (/^[┌│└]/.test(content)) {
                line.style.whiteSpace = 'pre';
            }
            line.innerHTML = content === "" ? "<br>" : content;
            terminalBody.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            i++;
            setTimeout(printNextLine, 120); // ms per line
        } else {
            terminalInput.disabled = false;
            terminalInput.focus();
        }
    }
    printNextLine();
}

function printToTerminal(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isCommand) {
        line.innerHTML = `<span style="color:var(--brand);">root@fedora</span><span style="color:var(--text-body);">:~$</span> ${text}`;
    } else {
        line.innerHTML = text;
    }
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Print a bullet line using a flex row for perfect wrapping
function printBulletLine(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.style.display = 'flex';
    line.style.gap = '8px';
    
    const arrowSpan = document.createElement('span');
    arrowSpan.style.flexShrink = '0';
    arrowSpan.textContent = '→';
    
    const contentSpan = document.createElement('span');
    contentSpan.style.flex = '1';
    contentSpan.textContent = text;
    
    line.appendChild(arrowSpan);
    line.appendChild(contentSpan);
    
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

const fortunes = [
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "It works on my machine.",
    "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "To understand recursion, you must first understand recursion."
];

// ── Terminal: Input handler ──
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim();
        if (cmd) {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            printToTerminal(cmd, true);
            executeCommand(cmd);
        } else {
            printToTerminal("", true);
        }
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault(); // prevent losing focus
        const currentInput = terminalInput.value.trim().toLowerCase();
        if (currentInput) {
            const matches = commandsList.filter(c => c.toLowerCase().startsWith(currentInput));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            }
        }
    }
});

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// ── Terminal: Live DOM Content Extraction (Task 3) ──
// Returns an array of { text: string, isBullet: boolean } objects.
// Each line is fully flattened — no source-code indentation/newlines leak through.
function extractSectionContent(sectionId) {
    if (sectionId === 'team') sectionId = 'penguins';
    const section = document.getElementById(sectionId);
    if (!section) return [{ text: 'Section not found.', isBullet: false }];
    const lines = [];

    const cleanText = (str) => str.replace(/\s+/g, ' ').trim();

    switch (sectionId) {
        case 'about': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'About'), isBullet: false });
            const paragraphs = section.querySelectorAll('.terminal-chrome p');
            paragraphs.forEach(p => {
                lines.push({ text: cleanText(p.textContent), isBullet: false });
            });
            break;
        }
        case 'projects': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Projects'), isBullet: false });
            section.querySelectorAll('.card').forEach(card => {
                const title = card.querySelector('h3');
                const desc = card.querySelector('p');
                let t = '';
                if (title) t += cleanText(title.textContent);
                if (desc) t += ' — ' + cleanText(desc.textContent);
                if (t) lines.push({ text: t, isBullet: true });
            });
            break;
        }
        case 'achievements': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Achievements'), isBullet: false });
            section.querySelectorAll('.carousel-card').forEach(card => {
                const title = card.querySelector('.font-bold.text-lg.text-\\[\\#F5F3EF\\]');
                const dateEl = card.querySelector('.text-\\[11px\\].text-\\[\\#389DC6\\]');
                if (title) {
                    let t = cleanText(title.textContent);
                    if (dateEl) {
                        t += ' (' + cleanText(dateEl.textContent) + ')';
                    }
                    lines.push({ text: t, isBullet: true });
                }
            });
            break;
        }
        case 'courses': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Courses'), isBullet: false });
            section.querySelectorAll('.card').forEach(card => {
                const title = card.querySelector('h3');
                const desc = card.querySelector('p');
                let t = '';
                if (title) t += cleanText(title.textContent);
                if (desc) t += ' — ' + cleanText(desc.textContent);
                if (t) lines.push({ text: t, isBullet: true });
            });
            break;
        }
        case 'penguins': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Hackathon Team'), isBullet: false });
            const teamLabel = section.querySelector('#penguins-card .font-bold');
            if (teamLabel) lines.push({ text: cleanText(teamLabel.textContent), isBullet: false });
            const desc = section.querySelector('#penguins-card > div:nth-child(2) p');
            if (desc) lines.push({ text: cleanText(desc.textContent), isBullet: false });
            const tags = section.querySelectorAll('#penguins-card .tag-pill');
            if (tags.length) {
                lines.push({ text: 'Tags: ' + Array.from(tags).map(t => cleanText(t.textContent)).join(' · '), isBullet: false });
            }
            const estLabel = section.querySelector('#penguins-card > div:nth-child(2) > div:nth-child(3)');
            if (estLabel) lines.push({ text: cleanText(estLabel.textContent), isBullet: false });
            
            const discordLink = section.querySelector('#penguins-card .discord-icon-btn');
            if (discordLink) lines.push({ text: 'Discord: ' + discordLink.getAttribute('href'), isBullet: false });
            
            const postCard = section.querySelector('#penguins-card .expandable-inner a.card');
            if (postCard) {
                lines.push({ text: 'Post: ' + cleanText(postCard.querySelector('h3').textContent), isBullet: false });
                lines.push({ text: ' ' + cleanText(postCard.querySelector('p').textContent), isBullet: false });
                lines.push({ text: ' Link: ' + postCard.getAttribute('href'), isBullet: false });
            }
            break;
        }
        case 'media': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Movies & Shows'), isBullet: false });
            lines.push({ text: '[ TOP PICKS ]', isBullet: false });
            section.querySelectorAll('.grid .card').forEach(card => {
                const titleEl = card.querySelector('[style*="font-weight:600"]');
                const ratingEl = card.querySelector('[style*="color:var(--brand)"]');
                if (titleEl) {
                    let t = cleanText(titleEl.textContent);
                    if (ratingEl) t += ' — ' + cleanText(ratingEl.textContent);
                    lines.push({ text: t, isBullet: true });
                }
            });
            break;
        }
        case 'contact': {
            const heading = section.querySelector('h2');
            lines.push({ text: '# ' + (heading ? cleanText(heading.textContent) : 'Contact'), isBullet: false });
            const descP = section.querySelector('p');
            if (descP) lines.push({ text: cleanText(descP.textContent), isBullet: false });
            
            // GitHub
            const gitHubLink = section.querySelector('a[aria-label="GitHub"]');
            if (gitHubLink) {
                lines.push({ text: 'GitHub: ' + gitHubLink.getAttribute('href'), isBullet: true });
            }
            // LinkedIn
            const linkedinLink = section.querySelector('a[aria-label="LinkedIn"]');
            if (linkedinLink) {
                lines.push({ text: 'LinkedIn: ' + linkedinLink.getAttribute('href'), isBullet: true });
            }
            
            // About section social links
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                ['Instagram', 'Facebook', 'Discord'].forEach(social => {
                    const link = aboutSection.querySelector(`a[aria-label="${social}"]`);
                    if (link) {
                        lines.push({ text: `${social}: ` + link.getAttribute('href'), isBullet: true });
                    }
                });
            }
            
            // Email
            if (typeof targetEmail !== 'undefined') {
                lines.push({ text: 'Email: ' + targetEmail, isBullet: true });
            }
            break;
        }
        default:
            lines.push({ text: 'Section data not available.', isBullet: false });
    }
    return lines;
}

// ── Terminal: Man pages (Task 4) ──
const manPages = {
    'cat':     'cat <path> — display the contents of a section file.',
    'cd':      'cd <section> — navigate to a section (closes terminal).',
    'open':    'open <section> — navigate to a section (closes terminal). Alias for cd.',
    'ls':      'ls — list available section directories.',
    'pwd':     'pwd — print the current working directory.',
    'date':    'date — display the current date and time.',
    'echo':    'echo <text> — print text to the terminal.',
    'man':     'man <command> — display manual entry for a command.',
    'history': 'history — display the list of commands typed in this session.',
    'help':    'help — show all available commands and navigation.',
    'whoami':  'whoami — display information about the current user.',
    'skills':  'skills — list active skill processes.',
    'sudo':    'sudo <command> — run a command with elevated privileges.',
    'fortune': 'fortune — display a random programming quote.',
    'clear':   'clear — clear the terminal screen.',
    'exit':    'exit — close the terminal overlay.',
    'fedora':  'fedora — display Fedora/Linux quick reference.',
    'linux':   'linux — display Fedora/Linux quick reference.'
};

// ── Terminal: Command Execution ──
function executeCommand(cmdStr) {
    const lowerCmd = cmdStr.toLowerCase().trim();
    
    // ── clear ──
    if (lowerCmd === 'clear') {
        terminalBody.innerHTML = '';
        return;
    }
    
    // ── exit ──
    if (lowerCmd === 'exit') {
        closeTerminal();
        return;
    }
    
    // ── sudo fullscreen (Task 1) ──
    if (lowerCmd === 'sudo fullscreen') {
        printToTerminal("[sudo] password for root: ******");
        const entering = !terminalIsFullscreen;
        toggleTerminalFullscreen();
        printToTerminal(entering ? "Entering fullscreen mode..." : "Exiting fullscreen mode...");
        printToTerminal("<br>");
        return;
    }
    
    // ── help ──
    if (lowerCmd === 'help') {
        const helpLines = [
            "┌─ Quick Navigation ─────────────────────────────────────────────────┐",
            "│ cat about/README.md      → view content  │ cd about        → jump │",
            "│ cat projects/list.sh     → view content  │ cd projects     → jump │",
            "│ cat achievements/log.md  → view content  │ cd achievements → jump │",
            "│ cat courses/catalog.sh   → view content  │ cd courses      → jump │",
            "│ cat team/penguins.log    → view content  │ cd team         → jump │",
            "│ cat media/watchlist.md   → view content  │ cd media        → jump │",
            "│ cat contact/links.sh     → view content  │ cd contact      → jump │",
            "└───────────────────────────────────────────────────────────────────┘",
            "",
            "┌─ Try ──────────────────────────────────────────────────────────────┐",
            "│ whoami · skills · sudo hire-me · fortune · ls · date · history    │",
            "└───────────────────────────────────────────────────────────────────┘"
        ];
        helpLines.forEach(hl => {
            if (hl === "") {
                printToTerminal("<br>");
            } else {
                // Box-drawing lines need pre — add inline override
                const div = document.createElement('div');
                div.className = 'terminal-line';
                if (/^[┌│└]/.test(hl)) div.style.whiteSpace = 'pre';
                div.textContent = hl;
                terminalBody.appendChild(div);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
        printToTerminal("<br>");
        return;
    }
    
    // ── whoami ──
    if (lowerCmd === 'whoami') {
        printToTerminal("Youssef - Engineering student at KSU.");
        printToTerminal("Passionate about building systems and elegant web interfaces.");
        printToTerminal("<br>");
        return;
    }
    
    // ── skills ──
    if (lowerCmd === 'skills') {
        printToTerminal("HTML/CSS · JavaScript · Python · Mathematics · Algorithms · Problem Solving · React · Next.js");
        printToTerminal("<br>");
        return;
    }
    
    // ── sudo hire-me ──
    if (lowerCmd === 'sudo hire-me') {
        printToTerminal("Executing highly lucrative protocol...");
        printToTerminal("Opening Contact Section...");
        setTimeout(() => {
            closeTerminal();
            scrollToSection('contact');
        }, 800);
        return;
    }
    
    // ── fortune ──
    if (lowerCmd === 'fortune') {
        const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
        printToTerminal(quote);
        printToTerminal("<br>");
        return;
    }
    
    // ── fedora / linux ──
    if (lowerCmd === 'fedora' || lowerCmd === 'linux') {
        [
            "Fedora / Linux Quick Reference:",
            "  Ctrl+Alt+T        → Open terminal",
            "  Ctrl+Alt+F2..F6   → Switch TTY",
            "  dnf install <pkg> → Install a package",
            "  systemctl status  → Check service status",
            "  journalctl -xe    → View system logs",
            "  Super (Win key)   → Activities overview"
        ].forEach(l => printToTerminal(l));
        printToTerminal("<br>");
        return;
    }
    
    // ── ls (Task 4) ──
    if (lowerCmd === 'ls') {
        const dirs = Object.keys(sectionPaths).map(s => s + '/').join('  ');
        printToTerminal(dirs);
        printToTerminal("<br>");
        return;
    }
    
    // ── pwd (Task 4) ──
    if (lowerCmd === 'pwd') {
        printToTerminal("/home/youssef");
        printToTerminal("<br>");
        return;
    }
    
    // ── date (Task 4) ──
    if (lowerCmd === 'date') {
        printToTerminal(new Date().toString());
        printToTerminal("<br>");
        return;
    }
    
    // ── echo (Task 4) ──
    if (lowerCmd.startsWith('echo ')) {
        const echoText = cmdStr.substring(5); // preserve original casing
        printToTerminal(echoText);
        printToTerminal("<br>");
        return;
    }
    if (lowerCmd === 'echo') {
        printToTerminal("");
        printToTerminal("<br>");
        return;
    }
    
    // ── history (Task 4) ──
    if (lowerCmd === 'history') {
        commandHistory.forEach((cmd, idx) => {
            printToTerminal(`  ${idx + 1}  ${cmd}`);
        });
        printToTerminal("<br>");
        return;
    }
    
    // ── man (Task 4) ──
    if (lowerCmd.startsWith('man ')) {
        const target = lowerCmd.substring(4).trim();
        if (manPages[target]) {
            printToTerminal(manPages[target]);
        } else {
            printToTerminal(`No manual entry for ${target}`);
        }
        printToTerminal("<br>");
        return;
    }
    
    // ── cat <path> → print live DOM content inline (Task 3) ──
    let matchedSectionId = null;
    if (lowerCmd.startsWith('cat ')) {
        const args = lowerCmd.substring(4).trim();
        for (const [id, path] of Object.entries(sectionPaths)) {
            if (args === id || args === path.toLowerCase()) {
                matchedSectionId = id;
                break;
            }
        }
    }
    
    if (matchedSectionId) {
        const sectionId = matchedSectionId;
        const lines = extractSectionContent(sectionId);
        lines.forEach(ln => {
            if (ln.isBullet) {
                printBulletLine(ln.text);
            } else {
                printToTerminal(ln.text);
            }
        });
        printToTerminal("<br>");
        return;
    }
    
    // ── cd <section> / open <section> → navigate (Task 3) ──
    const navMatch = lowerCmd.match(/^(cd|open)\s+(.+)$/);
    if (navMatch) {
        const target = navMatch[2].trim();
        if (sectionPaths[target]) {
            printToTerminal(`Navigating to ${sectionLabels[target]}...`);
            setTimeout(() => {
                closeTerminal();
                scrollToSection(target);
            }, 800);
            return;
        } else {
            printToTerminal(`No such section: ${target}. Available: ${Object.keys(sectionPaths).join(', ')}`);
            printToTerminal("<br>");
            return;
        }
    }
    
    printToTerminal(`command not found: ${cmdStr}. Type 'help' for a list of commands.`);
    printToTerminal("<br>");
}


// ── Scroll Reveal ──
function applyStagger(selector, groupSelector, delayStep = 70) {
    document.querySelectorAll(groupSelector).forEach((group) => {
        const items = group.querySelectorAll(selector);
        items.forEach((item, i) => {
            item.style.transitionDelay = `${i * delayStep}ms`;
        });
    });
}

// Stagger configurations
applyStagger('.reveal', '.projects-scroll', 80);
applyStagger('.card.reveal', '#courses .grid', 80);
applyStagger('.card.reveal', '#media .grid', 60);
applyStagger('.tag-pill.reveal', '#about .grid', 30);
applyStagger('.reveal', '#hero .max-w-2xl', 60);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // reveal once
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach((el, index) => {
    revealObserver.observe(el);
});
