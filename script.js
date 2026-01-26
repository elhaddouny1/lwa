/**
 * MOTAWAQED OS - CORE ENGINE (REVISED)
 * Integrated with Real OpenAI API & Fixed Supervisor Info
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================================
    // 1. APP STATE & DATA
    // =================================================================================
    const AppState = {
        currentPage: 'dashboard',
        user: { name: "محمد الهدوني", rank: "مشرف المنصة", points: 1250, streak: 12 },
        
        // OpenAI Configuration
        aiConfig: {
            apiKey: "sk-fyKI2GzpBr2WXOyv85On6xUmoqFOIOKu40ZPD3EV14y73NJQ65P7Hw7sMJ0JYWL4VcG5mar3kTnEbCp5JGN4oe000OP6",
            model: "gpt-3.5-turbo" // Using a standard model for stability
        },

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
        aiInput: document.getElementById('ai-user-input'),
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
                const targetPage = document.getElementById(`page-${target}`);
                if (targetPage) targetPage.classList.add('active');
                
                AppState.currentPage = target;
            });
        });

        // Quick AI Button (Mobile & Desktop)
        const aiTriggers = [document.getElementById('quick-ai-btn'), document.getElementById('ai-assistant-trigger')];
        aiTriggers.forEach(btn => {
            if (btn) btn.onclick = () => toggleAI(true);
        });
        
        const closeAiBtn = document.querySelector('.close-ai');
        if (closeAiBtn) closeAiBtn.onclick = () => toggleAI(false);
    }

    // =================================================================================
    // 3. FEATURE ENGINES
    // =================================================================================

    // --- DASHBOARD ENGINE ---
    function renderDashboard() {
        if (UI.miniLeaderboard) {
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
        }

        const planner = document.getElementById('mini-planner');
        if (planner) {
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
    }

    // --- LIBRARY ENGINE ---
    function renderLibrary() {
        if (UI.libraryContainer) {
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
    }

    // --- FLASHCARDS ENGINE ---
    function setupFlashcards() {
        if (!UI.flashcard) return;

        const updateCard = () => {
            const card = AppState.flashcards[AppState.currentFlashcardIndex];
            UI.flashcard.querySelector('.card-front h3').textContent = card.q;
            UI.flashcard.querySelector('.card-back p').textContent = card.a;
            UI.flashcard.classList.remove('flipped');
        };

        UI.flashcard.onclick = () => UI.flashcard.classList.toggle('flipped');
        
        const nextBtn = document.querySelector('.fc-btn.next');
        const prevBtn = document.querySelector('.fc-btn.prev');

        if (nextBtn) nextBtn.onclick = (e) => {
            e.stopPropagation();
            AppState.currentFlashcardIndex = (AppState.currentFlashcardIndex + 1) % AppState.flashcards.length;
            updateCard();
        };
        
        if (prevBtn) prevBtn.onclick = (e) => {
            e.stopPropagation();
            AppState.currentFlashcardIndex = (AppState.currentFlashcardIndex - 1 + AppState.flashcards.length) % AppState.flashcards.length;
            updateCard();
        };

        updateCard();
    }

    // --- REAL AI ASSISTANT ENGINE (OpenAI Integration) ---
    function setupAI() {
        const sendMessage = async () => {
            const text = UI.aiInput.value.trim();
            if (!text) return;

            // User Message
            appendMessage('user', text);
            UI.aiInput.value = '';

            // Loading State
            const loadingMsg = appendMessage('ai', 'جاري التفكير في الرد القانوني...');

            try {
                const response = await fetchOpenAIResponse(text);
                loadingMsg.textContent = response;
            } catch (error) {
                console.error("AI Error:", error);
                loadingMsg.textContent = "عذراً، واجهت مشكلة في الاتصال بالخادم. يرجى التأكد من مفتاح API أو المحاولة لاحقاً.";
            }
        };

        if (UI.aiSendBtn) UI.aiSendBtn.onclick = sendMessage;
        if (UI.aiInput) UI.aiInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }

    async function fetchOpenAIResponse(query) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AppState.aiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: AppState.aiConfig.model,
                messages: [
                    { role: "system", content: "أنت مساعد قانوني ذكي لطلاب القانون في المغرب. وظيفتك تبسيط المفاهيم القانونية المعقدة وشرح الدروس بأسلوب سهل وممتع باللغة العربية." },
                    { role: "user", content: query }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) throw new Error('Failed to fetch from OpenAI');
        
        const data = await response.json();
        return data.choices[0].message.content;
    }

    function appendMessage(type, text) {
        const msg = document.createElement('div');
        msg.className = `msg ${type} animate__animated animate__fadeInUp`;
        msg.textContent = text;
        UI.aiChatBox.appendChild(msg);
        UI.aiChatBox.scrollTop = UI.aiChatBox.scrollHeight;
        return msg;
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
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.onclick = () => {
                document.body.classList.toggle('light-mode');
                const isLight = document.body.classList.contains('light-mode');
                toggle.querySelector('i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
                playSound('click');
            };
        }
    }

    // Run App
    init();
});
