/**
 * MOTAWAQED OS - CORE ENGINE
 * Managing 19+ Advanced Legal Learning Features
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================================
    // 1. APP STATE & DATA
    // =================================================================================
    const AppState = {
        currentPage: 'dashboard',
        user: { name: "أسماء", rank: "مشرفة المنصة", points: 1250, streak: 12 },
        
        library: [
            { id: 1, title: "نظرية الالتزامات - مبسط", category: "القانون المدني", author: "د. أحمد", views: 1240, content: "الالتزام هو رابطة قانونية بين شخصين..." },
            { id: 2, title: "مبادئ القانون الجنائي العام", category: "القانون الجنائي", author: "أ. سارة", views: 850, content: "الجريمة هي كل فعل أو امتناع مخالف للقانون..." },
            { id: 3, title: "قانون الشركات المغربي 2024", category: "القانون التجاري", author: "المتوقد OS", views: 2100, content: "تعديلات جديدة تهم الشركات ذات المسؤولية المحدودة..." }
        ],
        
        flashcards: [
            { q: "ما هو الفرق بين المسؤولية العقدية والتقصيرية؟", a: "العقدية تنشأ عن إخلال بعقد، والتقصيرية عن إخلال بواجب قانوني عام." },
            { q: "ما هي أركان الجريمة الثلاثة؟", a: "الركن القانوني، الركن المادي، والركن المعنوي." },
            { q: "متى تكتسب الشركة الشخصية المعنوية؟", a: "من تاريخ قيدها في السجل التجاري." }
        ],
        
        leaderboard: [
            { name: "إيمان", points: 2850, avatar: "https://ui-avatars.com/api/?name=Imane" },
            { name: "عبد المنعم", points: 2420, avatar: "https://ui-avatars.com/api/?name=Abdo" },
            { name: "ناهد", points: 2100, avatar: "https://ui-avatars.com/api/?name=Nahid" }
        ],
        
        currentFlashcardIndex: 0,
        isExamMode: false
    };

    // DOM Elements
    const UI = {
        navItems: document.querySelectorAll('.nav-item, .m-nav-item'),
        pages: document.querySelectorAll('.os-page'),
        libraryContainer: document.getElementById('library-container'),
        miniLeaderboard: document.getElementById('mini-leaderboard'),
        flashcard: document.getElementById('current-flashcard'),
        aiModal: document.getElementById('ai-modal'),
        aiChatBox: document.getElementById('ai-chat-box'),
        aiInput: document.querySelector('.ai-input input'),
        aiSendBtn: document.getElementById('send-ai-msg'),
        sounds: {
            click: document.getElementById('snd-os-click'),
            notif: document.getElementById('snd-os-notif')
        }
    };

    // =================================================================================
    // 2. CORE NAVIGATION ENGINE
    // =================================================================================

    function init() {
        setupNavigation();
        renderDashboard();
        renderLibrary();
        setupFlashcards();
        setupAI();
        setupThemeToggle();
        
        // Initial Sound
        setTimeout(() => playSound('notif'), 1000);
    }

    function setupNavigation() {
        UI.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.target;
                if (!target) return;
                
                playSound('click');
                
                // Update UI
                UI.navItems.forEach(i => i.classList.remove('active'));
                document.querySelectorAll(`[data-target="${target}"]`).forEach(i => i.classList.add('active'));
                
                UI.pages.forEach(p => p.classList.remove('active'));
                document.getElementById(`page-${target}`).classList.add('active');
                
                AppState.currentPage = target;
            });
        });

        // Quick AI Button (Mobile)
        document.getElementById('quick-ai-btn').onclick = () => toggleAI(true);
        document.getElementById('ai-assistant-trigger').onclick = () => toggleAI(true);
        document.querySelector('.close-ai').onclick = () => toggleAI(false);
    }

    // =================================================================================
    // 3. FEATURE ENGINES
    // =================================================================================

    // --- DASHBOARD ENGINE ---
    function renderDashboard() {
        // Render Mini Leaderboard
        UI.miniLeaderboard.innerHTML = AppState.leaderboard.map((user, i) => `
            <div class="leader-item animate__animated animate__fadeInRight" style="animation-delay: ${i * 0.1}s">
                <img src="${user.avatar}" alt="${user.name}">
                <div class="l-info">
                    <span class="l-name">${user.name}</span>
                    <span class="l-pts">${user.points} نقطة</span>
                </div>
                <div class="l-rank">#${i + 1}</div>
            </div>
        `).join('');

        // Render Mini Planner
        const planner = document.getElementById('mini-planner');
        const tasks = [
            { title: "مراجعة القانون التجاري", time: "10:00 ص", done: true },
            { title: "حل كويز الالتزامات", time: "02:00 م", done: false },
            { title: "قراءة ملخص الجنائي", time: "06:00 م", done: false }
        ];
        planner.innerHTML = tasks.map(t => `
            <div class="planner-item ${t.done ? 'done' : ''}">
                <i class="fas ${t.done ? 'fa-circle-check' : 'fa-circle'}"></i>
                <div class="p-task">
                    <span>${t.title}</span>
                    <small>${t.time}</small>
                </div>
            </div>
        `).join('');
    }

    // --- LIBRARY ENGINE ---
    function renderLibrary() {
        UI.libraryContainer.innerHTML = AppState.library.map(item => `
            <div class="lib-card glass-card">
                <span class="lib-tag">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.content.substring(0, 80)}...</p>
                <div class="lib-meta">
                    <span><i class="fas fa-user-pen"></i> ${item.author}</span>
                    <span><i class="fas fa-eye"></i> ${item.views}</span>
                </div>
                <button class="btn-os-primary-outline" onclick="alert('سيتم فتح المقال الكامل قريباً!')">اقرأ المزيد</button>
            </div>
        `).join('');
    }

    // --- FLASHCARDS ENGINE ---
    function setupFlashcards() {
        const updateCard = () => {
            const card = AppState.flashcards[AppState.currentFlashcardIndex];
            UI.flashcard.querySelector('.card-front h3').textContent = card.q;
            UI.flashcard.querySelector('.card-back p').textContent = card.a;
            UI.flashcard.classList.remove('flipped');
        };

        UI.flashcard.onclick = () => UI.flashcard.classList.toggle('flipped');
        
        document.querySelector('.fc-btn.next').onclick = () => {
            AppState.currentFlashcardIndex = (AppState.currentFlashcardIndex + 1) % AppState.flashcards.length;
            updateCard();
        };
        
        document.querySelector('.fc-btn.prev').onclick = () => {
            AppState.currentFlashcardIndex = (AppState.currentFlashcardIndex - 1 + AppState.flashcards.length) % AppState.flashcards.length;
            updateCard();
        };

        updateCard();
    }

    // --- AI ASSISTANT ENGINE ---
    function setupAI() {
        const sendMessage = () => {
            const text = UI.aiInput.value.trim();
            if (!text) return;

            // User Message
            appendMessage('user', text);
            UI.aiInput.value = '';

            // Simulated AI Response
            setTimeout(() => {
                const response = getAIResponse(text);
                appendMessage('ai', response);
            }, 800);
        };

        UI.aiSendBtn.onclick = sendMessage;
        UI.aiInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }

    function getAIResponse(query) {
        const q = query.toLowerCase();
        if (q.includes("قانون")) return "القانون هو مجموعة القواعد التي تنظم سلوك الأفراد في المجتمع. هل تريد شرحاً لنوع معين؟";
        if (q.includes("التزامات")) return "الالتزامات في القانون المدني تنقسم إلى مصادر إرادية (العقد) وغير إرادية (الفعل الضار).";
        if (q.includes("شكراً")) return "العفو! أنا هنا دائماً لمساعدتك في رحلتك القانونية.";
        return "سؤال رائع! دعني أبحث في قاعدة البيانات القانونية الخاصة بي... (هذا رد محاكي للذكاء الاصطناعي).";
    }

    function appendMessage(type, text) {
        const msg = document.createElement('div');
        msg.className = `msg ${type} animate__animated animate__fadeInUp`;
        msg.textContent = text;
        UI.aiChatBox.appendChild(msg);
        UI.aiChatBox.scrollTop = UI.aiChatBox.scrollHeight;
    }

    function toggleAI(show) {
        playSound('click');
        if (show) UI.aiModal.classList.remove('hidden');
        else UI.aiModal.classList.add('hidden');
    }

    // =================================================================================
    // 4. UTILITIES
    // =================================================================================

    function playSound(type) {
        const s = UI.sounds[type];
        if (s) {
            s.currentTime = 0;
            s.play().catch(() => {});
        }
    }

    function setupThemeToggle() {
        document.querySelector('.theme-toggle').onclick = () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            document.querySelector('.theme-toggle i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            playSound('click');
        };
    }

    // Run App
    init();
});
