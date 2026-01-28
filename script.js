/**
 * MOTAWAQED OS - LEGENDARY ENGINE (2026)
 * The most powerful legal learning engine ever built.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const LegendaryState = {
        currentPage: 'dashboard',
        user: { name: "محمد الهدوني", rank: "المشرف الأسطوري", points: 2500, level: "S6" },
        aiConfig: {
            apiKey: "sk-fyKI2GzpBr2WXOyv85On6xUmoqFOIOKu40ZPD3EV14y73NJQ65P7Hw7sMJ0JYWL4VcG5mar3kTnEbCp5JGN4oe000OP6",
            model: "gpt-4o"
        },
        library: [
            { id: 1, s: "s1", title: "المدخل لدراسة القانون", cat: "نظري", desc: "القاعدة القانونية، مصادر القانون، وتطبيق القانون من حيث الزمان والمكان.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s1.html" },
            { id: 2, s: "s2", title: "القانون الجنائي العام", cat: "جنائي", desc: "الجريمة، المسؤولية الجنائية، والعقوبات في التشريع المغربي الحديث.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s2.html" },
            { id: 3, s: "s2", title: "قانون الالتزامات والعقود", cat: "مدني", desc: "النظرية العامة للالتزام: العقد، الإرادة المنفردة، والعمل غير المشروع.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s2.html" },
            { id: 4, s: "s3", title: "مدونة الأسرة المغربية", cat: "أحوال شخصية", desc: "الزواج، انحلال ميثاق الزوجية، والولادة ونتائجها وفق آخر التعديلات.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s3.html" },
            { id: 5, s: "s4", title: "القانون الجنائي الخاص", cat: "جنائي", desc: "دراسة الجرائم الواقعة على الأشخاص والأموال ونظام التبرير.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s4.html" },
            { id: 6, s: "s5", title: "المسطرة الجنائية الجديدة", cat: "إجراءات", desc: "قانون 03.23 الجديد: البحث التمهيدي، التحقيق، وضمانات المحاكمة العادلة.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s5.html" },
            { id: 7, s: "s6", title: "المسطرة المدنية", cat: "إجراءات", desc: "الدعوى، الاختصاص، طرق الطعن، والتنفيذ الجبري للأحكام.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s6.html" },
            { id: 8, s: "s6", title: "القانون العقاري", cat: "عقاري", desc: "التحفيظ العقاري، الحقوق العينية، والضمانات العقارية بالمغرب.", link: "https://www.coursdroitarab.com/2019/09/molakhassat-9anon-droit-pdf-s6.html" }
        ],
        leaderboard: [
            { name: "محمد الهدوني", pts: 2500, rank: "المشرف الأسطوري" },
            { name: "سارة الإدريسي", pts: 2100, rank: "قاضية من الدرجة الأولى" },
            { name: "أمين الفاسي", pts: 1850, rank: "محامي بهيئة الرباط" }
        ],
        news: [
            { title: "دخول قانون المسطرة الجنائية الجديد 03.23 حيز التنفيذ", date: "اليوم" },
            { title: "مشروع قانون رقم 37.24 يحال على لجنة العدل والتشريع", date: "أمس" },
            { title: "تعديلات جوهرية في مدونة التجارة المغربية لعام 2026", date: "منذ يومين" }
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
                document.getElementById(`page-${target}`).classList.add('active');
                LegendaryState.currentPage = target;
            });
        });
    }

    function renderDashboard() {
        UI.leaderboard.innerHTML = LegendaryState.leaderboard.map((u, i) => `
            <div class="leader-row animate__animated animate__fadeInRight" style="animation-delay: ${i * 0.1}s">
                <div class="l-pos">${i + 1}</div>
                <div class="l-user">
                    <span class="l-name">${u.name}</span>
                    <span class="l-rank">${u.rank}</span>
                </div>
                <div class="l-pts">${u.pts}</div>
            </div>
        `).join('');

        UI.news.innerHTML = LegendaryState.news.map(n => `
            <div class="news-card">
                <div class="n-icon"><i class="fas fa-gavel"></i></div>
                <div class="n-body">
                    <h4>${n.title}</h4>
                    <span><i class="far fa-clock"></i> ${n.date}</span>
                </div>
            </div>
        `).join('');
    }

    function renderLibrary(s) {
        const filtered = s === 'all' ? LegendaryState.library : LegendaryState.library.filter(item => item.s === s);
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
        UI.timerStart.onclick = () => {
            LegendaryState.timer.isRunning = !LegendaryState.timer.isRunning;
            UI.timerStart.innerHTML = LegendaryState.timer.isRunning ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            playSound('click');
            if (LegendaryState.timer.isRunning) {
                LegendaryState.timer.interval = setInterval(updateTimer, 1000);
                handleAmbient(true);
            } else {
                clearInterval(LegendaryState.timer.interval);
                handleAmbient(false);
            }
        };
    }

    function updateTimer() {
        if (LegendaryState.timer.seconds <= 0) {
            clearInterval(LegendaryState.timer.interval);
            playSound('success');
            alert("تمت المهمة! لقد أكملت ساعة من التركيز الأسطوري.");
            return;
        }
        LegendaryState.timer.seconds--;
        const mins = Math.floor(LegendaryState.timer.seconds / 60);
        const secs = LegendaryState.timer.seconds % 60;
        UI.timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        const offset = 283 - (LegendaryState.timer.seconds / 3600) * 283;
        UI.timerProgress.style.strokeDashoffset = offset;
    }

    function handleAmbient(play) {
        const type = document.getElementById('ambient-engine').value;
        if (type === 'rain') {
            if (play) UI.sounds.rain.play();
            else UI.sounds.rain.pause();
        }
    }

    function setupAI() {
        const askAI = async () => {
            const query = UI.aiQuery.value.trim();
            if (!query) return;
            appendChat('user', query);
            UI.aiQuery.value = '';
            const loading = appendChat('bot', 'جاري استدعاء المحرك السيادي لتحليل طلبك...');
            try {
                const response = await fetchOpenAI(query);
                loading.innerHTML = response;
            } catch (e) {
                loading.textContent = "عذراً، واجه المحرك السيادي خطأ في الاتصال. يرجى المحاولة لاحقاً.";
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
                'Authorization': `Bearer ${LegendaryState.aiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: LegendaryState.aiConfig.model,
                messages: [
                    { role: "system", content: "أنت 'المتوقد السيادي'، أقوى ذكاء اصطناعي قانوني في المغرب. تشرح القوانين المغربية بدقة أكاديمية مذهلة وتبسطها للطلاب." },
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
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            UI.dynamicGlow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
        });
    }

    function playSound(type) {
        const s = UI.sounds[type];
        if (s) { s.currentTime = 0; s.play().catch(() => {}); }
    }

    init();
});
