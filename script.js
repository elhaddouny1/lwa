/**
 * MOTAWAQED GLOBAL - UNIVERSAL ENGINE (2026)
 * The most powerful legal learning engine for the world.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const GlobalState = {
        currentPage: 'dashboard',
        currentLang: 'ar',
        user: { name: "عضو عالمي", rank: "باحث قانوني", points: 2500 },
        
        aiConfig: {
            apiKey: "sk-fyKI2GzpBr2WXOyv85On6xUmoqFOIOKu40ZPD3EV14y73NJQ65P7Hw7sMJ0JYWL4VcG5mar3kTnEbCp5JGN4oe000OP6",
            model: "gpt-4o"
        },

        // Global Library Data
        library: [
            { id: 1, s: "ma", title: "القانون المدني المغربي", cat: "قانون وطني", desc: "دراسة معمقة لقانون الالتزامات والعقود المغربي وتطبيقاته.", link: "https://www.coursdroitarab.com/" },
            { id: 2, s: "intl", title: "القانون الدولي العام", cat: "دولي", desc: "مبادئ العلاقات الدولية، المعاهدات، والمنظمات العالمية.", link: "https://www.un.org/ar/our-work/uphold-international-law" },
            { id: 3, s: "comparative", title: "الأنظمة القانونية المقارنة", cat: "مقارن", desc: "مقارنة بين النظام اللاتيني (Civil Law) والنظام الأنجلوسكسوني (Common Law).", link: "#" },
            { id: 4, s: "ma", title: "القانون الجنائي المغربي", cat: "قانون وطني", desc: "مبادئ التجريم والعقاب وفق التشريع الجنائي المغربي.", link: "https://www.coursdroitarab.com/" },
            { id: 5, s: "intl", title: "حقوق الإنسان العالمية", cat: "دولي", desc: "الإعلان العالمي لحقوق الإنسان والآليات الدولية لحمايتها.", link: "https://www.ohchr.org/ar/universal-declaration-of-human-rights" },
            { id: 6, s: "sharia", title: "أصول الفقه الإسلامي", cat: "فقه", desc: "دراسة الأدلة الشرعية وطرق استنباط الأحكام الفقهية.", link: "#" }
        ],

        leaderboard: [
            { name: "محمد الهدوني", pts: 2500, rank: "المشرف الأسطوري", country: "MA" },
            { name: "Jean Dupont", pts: 2100, rank: "Expert Juridique", country: "FR" },
            { name: "Sarah Smith", pts: 1850, rank: "Legal Scholar", country: "US" }
        ],

        news: [
            { title: "محكمة العدل الدولية تصدر قراراً تاريخياً بشأن النزاعات الحدودية", date: "اليوم" },
            { title: "المغرب يوقع اتفاقية دولية جديدة لحماية الملكية الفكرية", date: "أمس" },
            { title: "تعديلات جديدة في قانون العمل الفرنسي تثير جدلاً واسعاً", date: "منذ يومين" }
        ],

        timer: { seconds: 3600, isRunning: false, interval: null }
    };

    const UI = {
        navLinks: document.querySelectorAll('.nav-link, .m-link'),
        pages: document.querySelectorAll('.page'),
        libContainer: document.getElementById('library-data'),
        libFilters: document.querySelectorAll('.s-btn'),
        leaderboard: document.getElementById('leaderboard-data'),
        news: document.getElementById('news-data'),
        timerDisplay: document.getElementById('timer-display'),
        timerProgress: document.getElementById('timer-progress'),
        timerStart: document.getElementById('timer-start'),
        aiQuery: document.getElementById('ai-query'),
        aiChatFlow: document.getElementById('ai-chat-flow'),
        aiSubmit: document.getElementById('ai-submit'),
        dynamicGlow: document.querySelector('.dynamic-glow'),
        langBtns: document.querySelectorAll('.lang-btn'),
        sounds: {
            click: document.getElementById('audio-click'),
            success: document.getElementById('audio-success'),
            rain: document.getElementById('audio-rain')
        }
    };

    function init() {
        setupNavigation();
        renderDashboard();
        renderLibrary('all');
        setupTimer();
        setupAI();
        setupVisualEffects();
        setupLanguage();
        
        setTimeout(() => playSound('success'), 1000);
    }

    function setupNavigation() {
        UI.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.dataset.page;
                if (!target) return;

                playSound('click');
                UI.navLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`[data-page="${target}"]`).forEach(l => l.classList.add('active'));

                UI.pages.forEach(p => p.classList.remove('active'));
                const targetPage = document.getElementById(`page-${target}`);
                if (targetPage) {
                    targetPage.classList.add('active');
                    document.querySelector('.content-scroller').scrollTop = 0;
                }

                GlobalState.currentPage = target;
            });
        });
    }

    function renderDashboard() {
        if (UI.leaderboard) {
            UI.leaderboard.innerHTML = GlobalState.leaderboard.map((u, i) => `
                <div class="leader-row animate__animated animate__fadeInRight" style="animation-delay: ${i * 0.1}s">
                    <div class="l-pos">${i + 1}</div>
                    <div class="l-user">
                        <span class="l-name">${u.name} <img src="https://flagcdn.com/w20/${u.country.toLowerCase()}.png" style="vertical-align: middle; margin-right: 5px;"></span>
                        <span class="l-rank">${u.rank}</span>
                    </div>
                    <div class="l-pts">${u.pts}</div>
                </div>
            `).join('');
        }

        if (UI.news) {
            UI.news.innerHTML = GlobalState.news.map(n => `
                <div class="news-card-h animate__animated animate__fadeInUp">
                    <h4>${n.title}</h4>
                    <span><i class="far fa-clock"></i> ${n.date}</span>
                </div>
            `).join('');
        }
    }

    function renderLibrary(s) {
        if (!UI.libContainer) return;
        const filtered = s === 'all' ? GlobalState.library : GlobalState.library.filter(item => item.s === s);
        UI.libContainer.innerHTML = filtered.map(item => `
            <div class="law-vault-card animate__animated animate__zoomIn">
                <div class="v-header">
                    <span class="v-tag">${item.cat}</span>
                    <span class="v-sem">${item.s.toUpperCase()}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="v-footer">
                    <a href="${item.link}" target="_blank" class="v-btn">فتح المرجع <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `).join('');
    }

    UI.libFilters.forEach(btn => {
        btn.onclick = () => {
            UI.libFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLibrary(btn.dataset.s);
            playSound('click');
        };
    });

    function setupTimer() {
        if (!UI.timerStart) return;
        UI.timerStart.onclick = () => {
            GlobalState.timer.isRunning = !GlobalState.timer.isRunning;
            UI.timerStart.innerHTML = GlobalState.timer.isRunning ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            playSound('click');
            if (GlobalState.timer.isRunning) {
                GlobalState.timer.interval = setInterval(updateTimer, 1000);
                handleAmbient(true);
            } else {
                clearInterval(GlobalState.timer.interval);
                handleAmbient(false);
            }
        };
    }

    function updateTimer() {
        if (GlobalState.timer.seconds <= 0) {
            clearInterval(GlobalState.timer.interval);
            playSound('success');
            alert("Mission Accomplished! You've completed a global focus session.");
            return;
        }
        GlobalState.timer.seconds--;
        const mins = Math.floor(GlobalState.timer.seconds / 60);
        const secs = GlobalState.timer.seconds % 60;
        if (UI.timerDisplay) {
            UI.timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        if (UI.timerProgress) {
            const offset = 283 - (GlobalState.timer.seconds / 3600) * 283;
            UI.timerProgress.style.strokeDashoffset = offset;
        }
    }

    function handleAmbient(play) {
        const ambientSelect = document.getElementById('ambient-engine');
        if (!ambientSelect) return;
        const type = ambientSelect.value;
        if (type === 'rain') {
            if (play) UI.sounds.rain.play().catch(() => {});
            else UI.sounds.rain.pause();
        }
    }

    function setupAI() {
        if (!UI.aiSubmit) return;
        const askAI = async () => {
            const query = UI.aiQuery.value.trim();
            if (!query) return;
            appendChat('user', query);
            UI.aiQuery.value = '';
            const loading = appendChat('bot', 'Consulting the Global Sovereign Engine...');
            try {
                const response = await fetchOpenAI(query);
                loading.innerHTML = response;
            } catch (e) {
                loading.textContent = "Error connecting to the Global Sovereign Engine. Please try again.";
            }
        };
        UI.aiSubmit.onclick = askAI;
        UI.aiQuery.onkeypress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askAI(); } };
    }

    async function fetchOpenAI(q) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GlobalState.aiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: GlobalState.aiConfig.model,
                messages: [
                    { role: "system", content: "You are 'Motawaqed Global', the world's most advanced legal AI. You explain Moroccan, Arab, and International laws with extreme precision in multiple languages." },
                    { role: "user", content: q }
                ]
            })
        });
        const data = await res.json();
        return data.choices[0].message.content;
    }

    function appendChat(type, text) {
        const msg = document.createElement('div');
        msg.className = `ai-msg ${type} animate__animated animate__fadeInUp`;
        msg.textContent = text;
        UI.aiChatFlow.appendChild(msg);
        UI.aiChatFlow.scrollTop = UI.aiChatFlow.scrollHeight;
        return msg;
    }

    function setupVisualEffects() {
        if (window.innerWidth > 992) {
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX;
                const y = e.clientY;
                if (UI.dynamicGlow) {
                    UI.dynamicGlow.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
                }
            });
        }
    }

    function setupLanguage() {
        UI.langBtns.forEach(btn => {
            btn.onclick = () => {
                UI.langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const lang = btn.textContent.toLowerCase();
                playSound('click');
                
                // Simple Language Switch Simulation
                if (lang === 'english' || lang === 'français') {
                    document.documentElement.dir = 'ltr';
                    document.documentElement.lang = lang === 'english' ? 'en' : 'fr';
                } else {
                    document.documentElement.dir = 'rtl';
                    document.documentElement.lang = 'ar';
                }
            };
        });
    }

    function playSound(type) {
        const s = UI.sounds[type];
        if (s) { s.currentTime = 0; s.play().catch(() => {}); }
    }

    init();
});
