/**
 * المتوقد PRO - PREMIUM CORE ENGINE
 * Logic, Intelligence, and Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================================
    // 1. APP STATE & CONFIGURATION
    // =================================================================================
    const THEMES = [
        {
            '--primary-bg': '#050a14',
            '--accent-gold': '#d4af37',
            '--accent-blue': '#00d2ff',
            '--accent-purple': '#9d50bb',
        },
        {
            '--primary-bg': '#1a1a2e',
            '--accent-gold': '#e94560',
            '--accent-blue': '#0f3460',
            '--accent-purple': '#533483',
        },
        {
            '--primary-bg': '#16213e',
            '--accent-gold': '#fca311',
            '--accent-blue': '#e5e5e5',
            '--accent-purple': '#000000',
        },
        {
            '--primary-bg': '#2d4059',
            '--accent-gold': '#ffb400',
            '--accent-blue': '#e5e5e5',
            '--accent-purple': '#ea5455',
        }
    ];

    function applyRandomTheme() {
        const randomIndex = Math.floor(Math.random() * THEMES.length);
        const selectedTheme = THEMES[randomIndex];
        for (const [property, value] of Object.entries(selectedTheme)) {
            document.documentElement.style.setProperty(property, value);
        }
    }
    const AppState = {
        supervisor: "أسماء",
        members: ["إيمان", "ناهد", "عبد المنعم", "خديجة", "مريم", "رباب", "يونس", "ناديا", "عتيقة", "عثمان", "محمد"],
        subjects: [
            { id: 1, name: "Théorie générale des obligations", icon: "fa-scroll" },
            { id: 2, name: "Droit commercial (fondamentaux)", icon: "fa-briefcase" },
            { id: 3, name: "Droit pénal général", icon: "fa-gavel" },
            { id: 4, name: "Introduction aux relations internationales", icon: "fa-globe" },
            { id: 5, name: "Introduction au droit administratif", icon: "fa-building-columns" },
            { id: 6, name: "Loi e-transactions", icon: "fa-laptop-code" },
            { id: 7, name: "Culture digitale & Intelligence Artificielle", icon: "fa-microchip" }
        ],
        assignments: [],
        timeTracking: {},
        examDate: new Date("2026-06-15T09:00:00").getTime(),
        focusSession: {
            isActive: false,
            subject: null,
            member: null,
            timerId: null,
            startTime: 0,
            elapsedSeconds: 0,
            isPaused: false,
            duration: 60 * 60 // 60 minutes
        },
        activeNow: 0
    };

    // DOM Elements Cache
    const UI = {
        subjectsGrid: document.getElementById('subjects-grid'),
        membersGrid: document.getElementById('members-grid'),
        globalTimer: {
            d: document.getElementById('d-val'),
            h: document.getElementById('h-val'),
            m: document.getElementById('m-val'),
            s: document.getElementById('s-val'),
            circle: document.getElementById('global-progress-circle'),
            pct: document.getElementById('global-pct')
        },
        mvp: {
            name: document.getElementById('mvp-name'),
            time: document.getElementById('mvp-time')
        },
        activityBar: document.getElementById('activity-bar'),
        groupStatusText: document.getElementById('group-status-text'),
        activeCount: document.getElementById('active-count'),
        focusModal: {
            overlay: document.getElementById('focus-modal'),
            title: document.getElementById('modal-subject-title'),
            timer: document.getElementById('focus-time-display'),
            progress: document.getElementById('timer-progress'),
            memberPicker: document.getElementById('member-picker'),
            startBtn: document.getElementById('btn-start-focus'),
            pauseBtn: document.getElementById('btn-pause-focus'),
            stopBtn: document.getElementById('btn-stop-focus'),
            closeBtn: document.querySelector('.close-modal')
        },
        sounds: {
            click: document.getElementById('snd-click'),
            start: document.getElementById('snd-start'),
            success: document.getElementById('snd-success'),
            ambient: document.getElementById('snd-ambient')
        }
    };

    // =================================================================================
    // 2. CORE ENGINE FUNCTIONS
    // =================================================================================

    function init() {
        applyRandomTheme();
        loadData();
        renderUI();
        startGlobalTimer();
        setupEventListeners();
        simulateActivity(); // Add some life to the UI
    }

    function loadData() {
        const savedAssignments = localStorage.getItem('motawaqed_pro_assignments');
        const savedTime = localStorage.getItem('motawaqed_pro_time');

        if (savedAssignments) {
            AppState.assignments = JSON.parse(savedAssignments);
        } else {
            shuffleAssignments();
        }

        if (savedTime) {
            AppState.timeTracking = JSON.parse(savedTime);
        } else {
            AppState.members.forEach(m => {
                AppState.timeTracking[m] = { total: 0, subjects: {} };
                AppState.subjects.forEach(s => AppState.timeTracking[m].subjects[s.name] = 0);
            });
        }
    }

    function saveData() {
        localStorage.setItem('motawaqed_pro_assignments', JSON.stringify(AppState.assignments));
        localStorage.setItem('motawaqed_pro_time', JSON.stringify(AppState.timeTracking));
    }

    function shuffleAssignments() {
        let shuffledMembers = [...AppState.members].sort(() => 0.5 - Math.random());
        AppState.assignments = AppState.subjects.map((s, i) => ({
            subject: s.name,
            icon: s.icon,
            deputy: shuffledMembers[i % shuffledMembers.length]
        }));
        saveData();
    }

    // =================================================================================
    // 3. UI RENDERING
    // =================================================================================

    function renderUI() {
        renderSubjects();
        renderMembers();
        updateInsights();
    }

    function renderSubjects() {
        UI.subjectsGrid.innerHTML = '';
        AppState.assignments.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `subject-card-premium animate__animated animate__fadeInUp`;
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="s-card-head">
                    <div class="icon"><i class="fas ${item.icon}"></i></div>
                    <div class="badge">S2</div>
                </div>
                <div class="s-card-body">
                    <h3>${item.subject}</h3>
                    <div class="deputy-info">
                        <i class="fas fa-user-shield"></i>
                        <span>النائب: <strong>${item.deputy}</strong></span>
                    </div>
                </div>
                <div class="s-card-footer">
                    <button class="p-btn-small focus-trigger" data-subject="${item.subject}">
                        <i class="fas fa-stopwatch"></i> بدء التركيز
                    </button>
                </div>
            `;
            UI.subjectsGrid.appendChild(card);
        });
    }

    function renderMembers() {
        UI.membersGrid.innerHTML = '';
        const sortedMembers = [...AppState.members].sort((a, b) => 
            (AppState.timeTracking[b]?.total || 0) - (AppState.timeTracking[a]?.total || 0)
        );

        const maxTime = Math.max(...AppState.members.map(m => AppState.timeTracking[m].total), 1);

        sortedMembers.forEach((member, index) => {
            const data = AppState.timeTracking[member];
            const hours = Math.floor(data.total / 3600);
            const minutes = Math.floor((data.total % 3600) / 60);
            const pct = (data.total / maxTime) * 100;

            const row = document.createElement('div');
            row.className = `member-row-premium animate__animated animate__fadeInRight`;
            row.style.animationDelay = `${index * 0.05}s`;
            row.innerHTML = `
                <div class="m-avatar">${member.charAt(0)}</div>
                <div class="m-details">
                    <h4>${member}</h4>
                    <div class="m-progress-mini">
                        <div class="m-progress-fill" style="width: ${pct}%"></div>
                    </div>
                </div>
                <div class="m-time">${hours}س ${minutes}د</div>
            `;
            UI.membersGrid.appendChild(row);
        });
    }

    function updateInsights() {
        // Find MVP
        let mvp = { name: "لا أحد", time: 0 };
        for (const m in AppState.timeTracking) {
            if (AppState.timeTracking[m].total > mvp.time) {
                mvp = { name: m, time: AppState.timeTracking[m].total };
            }
        }
        
        if (mvp.time > 0) {
            UI.mvp.name.textContent = mvp.name;
            const h = Math.floor(mvp.time / 3600);
            const m = Math.floor((mvp.time % 3600) / 60);
            UI.mvp.time.textContent = `${h}:${m.toString().padStart(2, '0')}`;
        }

        // Activity Bar
        const totalTime = AppState.members.reduce((acc, m) => acc + AppState.timeTracking[m].total, 0);
        const activityPct = Math.min((totalTime / (AppState.members.length * 3600 * 10)) * 100, 100);
        UI.activityBar.style.width = `${activityPct}%`;
        
        if (activityPct < 20) UI.groupStatusText.textContent = "بداية هادئة";
        else if (activityPct < 50) UI.groupStatusText.textContent = "نشاط متوسط";
        else UI.groupStatusText.textContent = "حالة استنفار قصوى 🔥";
    }

    // =================================================================================
    // 4. TIMERS & ANIMATIONS
    // =================================================================================

    function startGlobalTimer() {
        const radius = 52;
        const circumference = 2 * Math.PI * radius;
        UI.globalTimer.circle.style.strokeDasharray = `${circumference} ${circumference}`;

        function update() {
            const now = new Date().getTime();
            const distance = AppState.examDate - now;

            if (distance < 0) {
                UI.globalTimer.d.textContent = "00";
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            UI.globalTimer.d.textContent = d.toString().padStart(2, '0');
            UI.globalTimer.h.textContent = h.toString().padStart(2, '0');
            UI.globalTimer.m.textContent = m.toString().padStart(2, '0');
            UI.globalTimer.s.textContent = s.toString().padStart(2, '0');

            // Progress Circle (Assuming 150 days total semester)
            const totalDays = 150;
            const elapsedDays = totalDays - d;
            const pct = Math.min((elapsedDays / totalDays) * 100, 100);
            const offset = circumference - (pct / 100) * circumference;
            UI.globalTimer.circle.style.strokeDashoffset = offset;
            UI.globalTimer.pct.textContent = `${Math.floor(pct)}%`;
        }

        setInterval(update, 1000);
        update();
    }

    // =================================================================================
    // 5. FOCUS MODE ENGINE
    // =================================================================================

    function openFocusModal(subject) {
        playSound('click');
        AppState.focusSession.subject = subject;
        UI.focusModal.title.textContent = subject;
        
        // Populate member picker
        UI.focusModal.memberPicker.innerHTML = '';
        AppState.members.forEach(m => {
            const chip = document.createElement('div');
            chip.className = 'm-chip';
            chip.textContent = m;
            chip.onclick = () => {
                playSound('click');
                document.querySelectorAll('.m-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                AppState.focusSession.member = m;
                UI.focusModal.startBtn.disabled = false;
            };
            UI.focusModal.memberPicker.appendChild(chip);
        });

        UI.focusModal.overlay.classList.remove('hidden');
        resetFocusTimerUI();
    }

    function resetFocusTimerUI() {
        UI.focusModal.timer.textContent = "60:00";
        UI.focusModal.progress.style.strokeDashoffset = 0;
        UI.focusModal.startBtn.classList.remove('hidden');
        UI.focusModal.pauseBtn.classList.add('hidden');
        UI.focusModal.stopBtn.disabled = true;
        UI.focusModal.startBtn.disabled = true;
        UI.focusModal.memberPicker.style.pointerEvents = 'auto';
        UI.focusModal.memberPicker.style.opacity = '1';
    }

    function startFocusSession() {
        if (!AppState.focusSession.member) return;
        
        playSound('start');
        AppState.focusSession.isActive = true;
        AppState.focusSession.isPaused = false;
        AppState.focusSession.startTime = Date.now();
        AppState.focusSession.elapsedSeconds = 0;

        UI.focusModal.startBtn.classList.add('hidden');
        UI.focusModal.pauseBtn.classList.remove('hidden');
        UI.focusModal.stopBtn.disabled = false;
        UI.focusModal.memberPicker.style.pointerEvents = 'none';
        UI.focusModal.memberPicker.style.opacity = '0.5';
        
        document.getElementById('focus-status').textContent = "جاري التركيز...";
        
        AppState.focusSession.timerId = setInterval(updateFocusTimer, 1000);
        AppState.activeNow++;
        updateActiveCount();
    }

    function updateFocusTimer() {
        const session = AppState.focusSession;
        if (!session.isActive || session.isPaused) return;

        session.elapsedSeconds++;
        const remaining = session.duration - session.elapsedSeconds;

        if (remaining <= 0) {
            endFocusSession(true);
            return;
        }

        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        UI.focusModal.timer.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        // Progress Circle
        const circumference = 2 * Math.PI * 110;
        const offset = (session.elapsedSeconds / session.duration) * circumference;
        UI.focusModal.progress.style.strokeDasharray = circumference;
        UI.focusModal.progress.style.strokeDashoffset = offset;
    }

    function endFocusSession(completed = false) {
        const session = AppState.focusSession;
        clearInterval(session.timerId);
        
        if (session.elapsedSeconds > 10) { // Only save if more than 10 seconds
            AppState.timeTracking[session.member].total += session.elapsedSeconds;
            AppState.timeTracking[session.member].subjects[session.subject] += session.elapsedSeconds;
            saveData();
            renderUI();
            playSound('success');
        }

        AppState.activeNow = Math.max(0, AppState.activeNow - 1);
        updateActiveCount();
        
        UI.focusModal.overlay.classList.add('hidden');
        session.isActive = false;
        stopAmbient();
    }

    // =================================================================================
    // 6. INTERACTIVE ELEMENTS
    // =================================================================================

    function playSound(type) {
        const s = UI.sounds[type];
        if (s) {
            s.currentTime = 0;
            s.play().catch(e => console.log("Audio play blocked"));
        }
    }

    function setAmbient(type) {
        const s = UI.sounds.ambient;
        const urls = {
            rain: "https://www.soundjay.com/nature/rain-01.mp3",
            library: "https://www.soundjay.com/misc/sounds/library-ambience-1.mp3",
            fire: "https://www.soundjay.com/nature/fire-1.mp3"
        };

        if (type === 'none') {
            stopAmbient();
            return;
        }

        s.src = urls[type];
        s.play();
        document.querySelectorAll('.s-chip').forEach(c => c.classList.remove('active'));
        document.querySelector(`[data-sound="${type}"]`).classList.add('active');
    }

    function stopAmbient() {
        UI.sounds.ambient.pause();
        document.querySelectorAll('.s-chip').forEach(c => c.classList.remove('active'));
        document.querySelector(`[data-sound="none"]`).classList.add('active');
    }

    function updateActiveCount() {
        UI.activeCount.textContent = AppState.activeNow;
    }

    function simulateActivity() {
        // Randomly show 1-3 people studying to make it feel alive
        AppState.activeNow = Math.floor(Math.random() * 4);
        updateActiveCount();
    }

    function setupEventListeners() {
        // Focus Trigger
        UI.subjectsGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.focus-trigger');
            if (btn) openFocusModal(btn.dataset.subject);
        });

        // Modal Controls
        UI.focusModal.startBtn.onclick = startFocusSession;
        UI.focusModal.pauseBtn.onclick = () => {
            AppState.focusSession.isPaused = !AppState.focusSession.isPaused;
            UI.focusModal.pauseBtn.innerHTML = AppState.focusSession.isPaused ? 
                '<i class="fas fa-play"></i> استئناف' : '<i class="fas fa-pause"></i> استراحة';
            playSound('click');
        };
        UI.focusModal.stopBtn.onclick = () => endFocusSession(false);
        UI.focusModal.closeBtn.onclick = () => {
            if (AppState.focusSession.isActive) {
                if (confirm("هل تريد حقاً إغلاق الجلسة؟ سيتم حفظ الوقت المنقضي فقط.")) {
                    endFocusSession(false);
                }
            } else {
                UI.focusModal.overlay.classList.add('hidden');
            }
        };

        // Shuffle
        document.getElementById('shuffle-btn').onclick = () => {
            if (confirm("هل تريد إعادة توزيع المواد على النواب بشكل عشوائي؟")) {
                playSound('click');
                shuffleAssignments();
                renderSubjects();
            }
        };

        // Ambient Sounds
        document.querySelectorAll('.s-chip').forEach(chip => {
            chip.onclick = () => setAmbient(chip.dataset.sound);
        });

        // Navigation (Visual only for now)
        document.querySelectorAll('.side-nav-links li, .m-nav-item').forEach(li => {
            li.onclick = () => {
                playSound('click');
                document.querySelectorAll('.side-nav-links li, .m-nav-item').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
            };
        });
    }

    // Run App
    init();
});
