/**
 * MOTAWAQED OS - COSMIC ENGINE (ULTRA-PREMIUM)
 * The most advanced legal learning engine in Morocco.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================================
    // 1. COSMIC STATE & DATA (The Moroccan Vault)
    // =================================================================================
    const CosmicState = {
        currentPage: 'dashboard',
        user: { name: "محمد الهدوني", rank: "المشرف الأعلى", points: 2450, level: "قاضٍ متدرب" },
        
        aiConfig: {
            apiKey: "sk-fyKI2GzpBr2WXOyv85On6xUmoqFOIOKu40ZPD3EV14y73NJQ65P7Hw7sMJ0JYWL4VcG5mar3kTnEbCp5JGN4oe000OP6",
            model: "gpt-3.5-turbo"
        },

        // Moroccan Law Library Data (S1-S6)
        library: [
            { id: 1, s: "s1", title: "المدخل لعلوم القانون", cat: "القانون العام", desc: "الأسس النظرية للقاعدة القانونية وخصائصها.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s1.html" },
            { id: 2, s: "s1", title: "المدخل للعلوم السياسية", cat: "العلوم السياسية", desc: "دراسة الدولة، السلطة، والأنظمة السياسية.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s1.html" },
            { id: 3, s: "s2", title: "القانون الجنائي العام", cat: "القانون الخاص", desc: "دراسة الجريمة، المجرم، والعقوبة في التشريع المغربي.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s2.html" },
            { id: 4, s: "s2", title: "النظرية العامة للالتزامات", cat: "القانون المدني", desc: "محور القانون الخاص: العقد، الإرادة المنفردة، والمسؤولية.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s2.html" },
            { id: 5, s: "s3", title: "قانون الأسرة المغربي", cat: "الأحوال الشخصية", desc: "شرح مدونة الأسرة: الزواج، الطلاق، والولادة.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s3.html" },
            { id: 6, s: "s4", title: "القانون الجنائي الخاص", cat: "القانون الخاص", desc: "دراسة الجرائم المحددة: القتل، السرقة، والنصب.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s4.html" },
            { id: 7, s: "s5", title: "المسطرة الجنائية", cat: "الإجراءات", desc: "قواعد البحث التمهيدي، التحقيق، والمحاكمة.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s5.html" },
            { id: 8, s: "s6", title: "القانون الدولي الخاص", cat: "القانون الدولي", desc: "تنازع القوانين وتنازع الاختصاص القضائي الدولي.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s6.html" }
        ],

        leaderboard: [
            { name: "إيمان العلمي", pts: 4850, rank: "محامية نقض" },
            { name: "ياسين بناني", pts: 4220, rank: "وكيل الملك" },
            { name: "ليلى التازي", pts: 3900, rank: "مستشارة قانونية" }
        ],

        news: [
            { title: "تعديلات مرتقبة في مدونة الأسرة المغربية 2026", date: "منذ ساعتين" },
            { title: "رقمنة المحاكم: إطلاق منصة المحامي للتبادل الإلكتروني", date: "منذ يوم" },
            { title: "صدور ظهير شريف بتنفيذ قانون المالية الجديد", date: "منذ 3 أيام" }
        ],

        timer: {
            seconds: 3600,
            isRunning: false,
            interval: null
        }
    };

    // DOM Elements
    const UI = {
        navItems: document.querySelectorAll('.nav-item, .m-nav-item'),
        pages: document.querySelectorAll('.page'),
        libGrid: document.getElementById('library-injected'),
        libTabs: document.querySelectorAll('.lib-tab'),
        leaderboard: document.getElementById('leaderboard-injected'),
        news: document.getElementById('news-injected'),
        timerVal: document.getElementById('timer-val'),
        timerToggle: document.getElementById('timer-toggle'),
        aiInput: document.getElementById('ai-input'),
        aiMessages: document.getElementById('ai-messages'),
        aiSend: document.getElementById('ai-send'),
        sounds: {
            click: document.getElementById('snd-click'),
            success: document.getElementById('snd-success'),
            rain: document.getElementById('snd-ambient-rain')
        }
    };

    // =================================================================================
    // 2. INITIALIZATION
    // =================================================================================

    function init() {
        setupNavigation();
        renderDashboard();
        renderLibrary('all');
        setupTimer();
        setupAI();
        setupThemeSwitcher();
        
        // Success sound on load
        setTimeout(() => playSound('success'), 1500);
    }

    // =================================================================================
    // 3. CORE ENGINES
    // =================================================================================

    function setupNavigation() {
        UI.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.page;
                if (!target) return;

                playSound('click');

                // Update UI
                UI.navItems.forEach(i => i.classList.remove('active'));
                document.querySelectorAll(`[data-page="${target}"]`).forEach(i => i.classList.add('active'));

                UI.pages.forEach(p => p.classList.remove('active'));
                document.getElementById(`page-${target}`).classList.add('active');

                CosmicState.currentPage = target;
            });
        });
    }

    function renderDashboard() {
        // Leaderboard
        UI.leaderboard.innerHTML = CosmicState.leaderboard.map((u, i) => `
            <div class="leader-item animate__animated animate__fadeInRight" style="animation-delay: ${i * 0.1}s">
                <div class="l-rank">#${i + 1}</div>
                <div class="l-info">
                    <span class="l-name">${u.name}</span>
                    <span class="l-title">${u.rank}</span>
                </div>
                <div class="l-pts">${u.pts}</div>
            </div>
        `).join('');

        // News
        UI.news.innerHTML = CosmicState.news.map(n => `
            <div class="news-item">
                <i class="fas fa-bolt"></i>
                <div class="n-content">
                    <p>${n.title}</p>
                    <small>${n.date}</small>
                </div>
            </div>
        `).join('');
    }

    function renderLibrary(semester) {
        const filtered = semester === 'all' 
            ? CosmicState.library 
            : CosmicState.library.filter(item => item.s === semester);

        UI.libGrid.innerHTML = filtered.map(item => `
            <div class="law-card animate__animated animate__fadeInUp">
                <span class="badge">${item.cat}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="card-footer">
                    <span class="s-tag">${item.s.toUpperCase()}</span>
                    <a href="${item.link}" target="_blank" class="btn-download">تحميل PDF <i class="fas fa-download"></i></a>
                </div>
            </div>
        `).join('');
    }

    UI.libTabs.forEach(tab => {
        tab.onclick = () => {
            UI.libTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderLibrary(tab.dataset.semester);
            playSound('click');
        };
    });

    // --- TIMER ENGINE ---
    function setupTimer() {
        UI.timerToggle.onclick = () => {
            CosmicState.timer.isRunning = !CosmicState.timer.isRunning;
            UI.timerToggle.innerHTML = CosmicState.timer.isRunning ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            playSound('click');

            if (CosmicState.timer.isRunning) {
                CosmicState.timer.interval = setInterval(updateTimer, 1000);
                handleAmbientSound(true);
            } else {
                clearInterval(CosmicState.timer.interval);
                handleAmbientSound(false);
            }
        };
    }

    function updateTimer() {
        if (CosmicState.timer.seconds <= 0) {
            clearInterval(CosmicState.timer.interval);
            playSound('success');
            alert("أحسنت! لقد أكملت ساعة من التركيز.");
            return;
        }
        CosmicState.timer.seconds--;
        const mins = Math.floor(CosmicState.timer.seconds / 60);
        const secs = CosmicState.timer.seconds % 60;
        UI.timerVal.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function handleAmbientSound(play) {
        const soundType = document.getElementById('ambient-sound').value;
        if (soundType === 'rain') {
            if (play) UI.sounds.rain.play();
            else UI.sounds.rain.pause();
        }
    }

    // --- AI LAB ENGINE ---
    function setupAI() {
        const sendMessage = async () => {
            const text = UI.aiInput.value.trim();
            if (!text) return;

            appendMessage('user', text);
            UI.aiInput.value = '';

            const loadingMsg = appendMessage('ai', 'جاري تحليل استفسارك القانوني...');

            try {
                const response = await fetchOpenAI(text);
                loadingMsg.textContent = response;
            } catch (e) {
                loadingMsg.textContent = "عذراً، واجهت مشكلة في الاتصال بمختبر الذكاء. يرجى المحاولة لاحقاً.";
            }
        };

        UI.aiSend.onclick = sendMessage;
        UI.aiInput.onkeypress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
    }

    async function fetchOpenAI(query) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CosmicState.aiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: CosmicState.aiConfig.model,
                messages: [
                    { role: "system", content: "أنت 'المتوقد AI'، مساعد قانوني مغربي فائق الذكاء. تشرح القوانين المغربية بأسلوب أكاديمي مبسط وتساعد الطلاب في تلخيص الدروس." },
                    { role: "user", content: query }
                ]
            })
        });
        const data = await res.json();
        return data.choices[0].message.content;
    }

    function appendMessage(type, text) {
        const msg = document.createElement('div');
        msg.className = `msg ${type} animate__animated animate__fadeInUp`;
        msg.textContent = text;
        UI.aiMessages.appendChild(msg);
        UI.aiMessages.scrollTop = UI.aiMessages.scrollHeight;
        return msg;
    }

    // --- UTILS ---
    function playSound(type) {
        const s = UI.sounds[type];
        if (s) { s.currentTime = 0; s.play().catch(() => {}); }
    }

    function setupThemeSwitcher() {
        document.querySelector('.theme-switcher').onclick = () => {
            document.body.classList.toggle('light-cosmic');
            playSound('click');
        };
    }

    init();
});
