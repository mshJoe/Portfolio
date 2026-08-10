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
function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const message = document.getElementById('senderMessage').value;

    const targetEmail = "youssefammar1742007@gmail.com";
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
            card.className = 'carousel-card absolute w-full max-w-[280px] sm:max-w-[320px] bg-[#020804] border border-[#163E4F] rounded-[4px] transition-all duration-300 ease-out cursor-pointer flex flex-col overflow-hidden';

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

function openTerminal() {
    terminalOverlay.classList.remove('hidden');
    terminalOverlay.classList.add('flex');
    void terminalOverlay.offsetWidth; // force reflow
    terminalOverlay.classList.remove('opacity-0');
    terminalOverlay.classList.add('opacity-100');
    
    if (terminalBody.innerHTML === '') {
        runBootSequence();
    } else {
        setTimeout(() => terminalInput.focus(), 200);
    }
}

function closeTerminal() {
    terminalOverlay.classList.remove('opacity-100');
    terminalOverlay.classList.add('opacity-0');
    setTimeout(() => {
        terminalOverlay.classList.add('hidden');
        terminalOverlay.classList.remove('flex');
    }, 200);
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

// Terminal Interactive Shell Logic
const commandsList = [
    'cat about/README.md', 'cat projects/list.txt', 'cat achievements/log.md',
    'cat courses/catalog.txt', 'cat team/penguins.txt', 'cat media/watchlist.txt',
    'cat contact/links.txt', 'help', 'whoami', 'skills', 'sudo hire-me', 'fortune',
    'clear', 'fedora', 'linux', 'exit'
];

let commandHistory = [];
let historyIndex = -1;

const bootText = [
    "YOUSSEF_TERMINAL v1.0.0",
    "",
    "Welcome to Youssef's terminal. Type 'help' to see all available commands.",
    "",
    "┌─ Quick Navigation ─────────────────────────────────────────┐",
    "│ cat about/README.md             → About                    │",
    "│ cat projects/list.txt           → Projects                 │",
    "│ cat achievements/log.md         → Achievements & Milestones│",
    "│ cat courses/catalog.txt         → My Courses               │",
    "│ cat team/penguins.txt           → Hackathon Team           │",
    "│ cat media/watchlist.txt         → Movies & Shows           │",
    "│ cat contact/links.txt           → Contact                  │",
    "└──────────────────────────────────────────────────────────┘",
    "",
    "┌─ Try ──────────────────────────────────────────────────────┐",
    "│ whoami · skills · sudo hire-me · fortune · clear           │",
    "└──────────────────────────────────────────────────────────┘",
    "",
    "root@fedora:~$ system --check",
    "<span style='color:var(--success);'>✓ System Status: ONLINE</span>",
    "<span style='color:var(--success);'>✓ Engineering student @ KSU</span>",
    "<span style='color:var(--success);'>✓ Connection: SECURE</span>",
    "root@fedora:~$ portfolio --scan",
    "Loading sections...",
    "Loading interactive features...",
    "<span style='color:var(--success);'>✓ All systems ready</span>",
    ""
];

function runBootSequence() {
    terminalInput.disabled = true;
    let i = 0;
    terminalBody.innerHTML = '';
    
    function printNextLine() {
        if (i < bootText.length) {
            const line = document.createElement('div');
            // preserve spacing for ASCII table formatting
            line.style.whiteSpace = "pre";
            line.innerHTML = bootText[i] === "" ? "<br>" : bootText[i];
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
    line.style.whiteSpace = "pre";
    if (isCommand) {
        line.innerHTML = `<span style="color:var(--success);">root@fedora</span><span style="color:var(--text-body);">:~$</span> ${text}`;
    } else {
        line.innerHTML = text;
    }
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
            const matches = commandsList.filter(c => c.startsWith(currentInput));
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

function executeCommand(cmdStr) {
    const lowerCmd = cmdStr.toLowerCase();
    
    if (lowerCmd === 'clear') {
        terminalBody.innerHTML = '';
        return;
    }
    
    if (lowerCmd === 'exit') {
        closeTerminal();
        return;
    }
    
    if (lowerCmd === 'help') {
        const helpText = bootText.slice(4, 17).join('<br>');
        printToTerminal(helpText);
        printToTerminal("<br>");
        return;
    }
    
    if (lowerCmd === 'whoami') {
        printToTerminal("Youssef - Engineering student at KSU.");
        printToTerminal("Passionate about building systems and elegant web interfaces.");
        printToTerminal("<br>");
        return;
    }
    
    if (lowerCmd === 'skills') {
        printToTerminal("HTML/CSS · JavaScript · Python · Mathematics · Algorithms · Problem Solving · React · Next.js");
        printToTerminal("<br>");
        return;
    }
    
    if (lowerCmd === 'sudo hire-me') {
        printToTerminal("Executing highly lucrative protocol...");
        printToTerminal("Opening Contact Section...");
        setTimeout(() => {
            closeTerminal();
            scrollToSection('contact');
        }, 800);
        return;
    }
    
    if (lowerCmd === 'fortune') {
        const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
        printToTerminal(quote);
        printToTerminal("<br>");
        return;
    }
    
    if (lowerCmd === 'fedora' || lowerCmd === 'linux') {
        const linuxHelp = [
            "Fedora / Linux Quick Reference:",
            "  Ctrl+Alt+T        → Open terminal",
            "  Ctrl+Alt+F2..F6   → Switch TTY",
            "  dnf install <pkg> → Install a package",
            "  systemctl status  → Check service status",
            "  journalctl -xe    → View system logs",
            "  Super (Win key)   → Activities overview"
        ].join('<br>');
        printToTerminal(linuxHelp);
        printToTerminal("<br>");
        return;
    }
    
    const catMappings = {
        'cat about/readme.md': 'about',
        'cat projects/list.txt': 'projects',
        'cat achievements/log.md': 'achievements',
        'cat courses/catalog.txt': 'courses',
        'cat team/penguins.txt': 'penguins',
        'cat media/watchlist.txt': 'media',
        'cat contact/links.txt': 'contact'
    };
    
    if (catMappings[lowerCmd]) {
        printToTerminal(`Opening ${catMappings[lowerCmd].toUpperCase()}...`);
        setTimeout(() => {
            closeTerminal();
            scrollToSection(catMappings[lowerCmd]);
        }, 800);
        return;
    }
    
    printToTerminal(`command not found: ${cmdStr}. Type 'help' for a list of commands.`);
    printToTerminal("<br>");
}
