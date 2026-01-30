/* ==========================================================================
   SMART ECOSYSTEM OS - NEURAL ENGINE (ARABIC EDITION 2026)
   ========================================================================== */

const SmartEcosystem = (() => {
    // --- إدارة الحالة (نواة التعلم) ---
    const state = {
        userBehavior: {
            clicks: 0,
            views: [],
            timeSpent: 0,
            preferences: ['الذكاء الاصطناعي', 'الأمن الرقمي', 'تحليل البيانات'],
            sentiment: 'neutral'
        },
        systemHealth: {
            learningRate: 88,
            anomalyScore: 0.02,
            fraudDetected: false
        },
        activeView: 'dashboard',
        isDarkMode: true,
        aiKey: 'sk-fyKI2GzpBr2WXOyv85On6xUmoqFOIOKu40ZPD3EV14y73NJQ65P7Hw7sMJ0JYWL4VcG5mar3kTnEbCp5JGN4oe000OP6'
    };

    // --- طبقة الاستخبارات: محرك التوصيات ---
    const recommendationEngine = {
        getFeed: () => {
            const pool = [
                { id: 1, tag: 'الذكاء الاصطناعي', title: 'تحسين الشبكات العصبية', desc: 'تحسين سرعة الاستدلال بنسبة 40% باستخدام تقنيات التكميم الحديثة.' },
                { id: 2, tag: 'الأمن الرقمي', title: 'بنية الثقة الصفرية', desc: 'تنفيذ ضوابط وصول دقيقة للأنظمة الموزعة لضمان أقصى حماية.' },
                { id: 3, tag: 'التحليلات', title: 'التجميع التنبؤي للمستخدمين', desc: 'نشر نموذج K-Means جديد لتصنيف المستخدمين في الوقت الفعلي.' },
                { id: 4, tag: 'الأداء', title: 'استراتيجيات التخزين المؤقت', desc: 'تقليل زمن الاستجابة إلى أقل من 10 مللي ثانية على مستوى العالم.' },
                { id: 5, tag: 'الذكاء الاصطناعي', title: 'تطور البحث الدلالي', desc: 'الانتقال من مطابقة الكلمات المفتاحية إلى استخدام التضمينات المتجهة.' }
            ];
            // محاكاة ترتيب الأولويات بناءً على تفضيلات المستخدم
            return pool.sort(() => Math.random() - 0.5);
        }
    };

    // --- طبقة الأمان: كشف الشذوذ ---
    const securityEngine = {
        checkAnomaly: (action) => {
            // خوارزمية محاكاة لكشف الاحتيال
            const score = Math.random();
            if (score > 0.98) {
                state.systemHealth.fraudDetected = true;
                state.systemHealth.anomalyScore = score.toFixed(4);
                UI.notify('تم كشف نشاط مشبوه!', 'تم تحديد سلوك عالي المخاطر في الجلسة الحالية.', 'error');
            }
        }
    };

    // --- محرك واجهة المستخدم: التنسيق التكيفي ---
    const UI = {
        init: () => {
            UI.bindEvents();
            UI.renderFeed();
            UI.startDataTracking();
            UI.updateLearningStatus();
            UI.initVisualEngine();
        },

        bindEvents: () => {
            // التنقل
            document.querySelectorAll('.nav-item, .m-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const view = item.getAttribute('data-view');
                    UI.switchView(view);
                    securityEngine.checkAnomaly('nav_switch');
                });
            });

            // مساعد الذكاء الاصطناعي
            const chatTrigger = document.getElementById('ai-assistant-trigger');
            const mChatTrigger = document.getElementById('m-ai-trigger');
            const chatPanel = document.getElementById('ai-chatbot');
            const closeChat = document.getElementById('close-chat');

            const toggleChat = () => {
                chatPanel.style.display = chatPanel.style.display === 'flex' ? 'none' : 'flex';
            };

            chatTrigger.addEventListener('click', toggleChat);
            mChatTrigger.addEventListener('click', toggleChat);
            closeChat.addEventListener('click', () => chatPanel.style.display = 'none');

            // إرسال رسالة AI
            document.getElementById('send-msg')?.addEventListener('click', UI.handleAIChat);
            document.getElementById('user-input')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') UI.handleAIChat();
            });

            // تبديل المظهر
            document.querySelector('.theme-toggle').addEventListener('click', UI.toggleTheme);
        },

        switchView: (viewId) => {
            if (!viewId) return;
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(`view-${viewId}`)?.classList.add('active');
            
            document.querySelectorAll('.nav-item, .m-item').forEach(i => {
                i.classList.remove('active');
                if (i.getAttribute('data-view') === viewId) i.classList.add('active');
            });
            
            state.activeView = viewId;
            state.userBehavior.views.push(viewId);
        },

        renderFeed: () => {
            const feedContainer = document.getElementById('personalized-feed');
            if (!feedContainer) return;
            const items = recommendationEngine.getFeed();
            feedContainer.innerHTML = items.map(item => `
                <div class="feed-item animate__animated animate__fadeInUp">
                    <span class="feed-tag">${item.tag}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
        },

        handleAIChat: async () => {
            const input = document.getElementById('user-input');
            const chatFlow = document.getElementById('chat-flow');
            const text = input.value.trim();
            if (!text) return;

            // إضافة رسالة المستخدم
            UI.addChatMessage('user', text);
            input.value = '';

            // معالجة AI (محاكاة NLP + منطق OpenAI)
            UI.addChatMessage('bot', 'جاري تحليل طلبك عبر المحرك العصبي...');
            
            try {
                // محاكاة استجابة ذكية
                setTimeout(() => {
                    const response = UI.generateSmartResponse(text);
                    UI.addChatMessage('bot', response);
                }, 1000);
            } catch (error) {
                UI.addChatMessage('bot', 'خطأ في الاتصال بطبقة الاستخبارات.');
            }
        },

        addChatMessage: (role, text) => {
            const chatFlow = document.getElementById('chat-flow');
            const msg = document.createElement('div');
            msg.className = `msg ${role} animate__animated animate__fadeIn`;
            msg.innerText = text;
            chatFlow.appendChild(msg);
            chatFlow.scrollTop = chatFlow.scrollHeight;
        },

        generateSmartResponse: (input) => {
            const lower = input.toLowerCase();
            if (lower.includes('أمن') || lower.includes('security')) return "طبقة الأمان نشطة حالياً. درجة الشذوذ الحالية هي 0.02%. جميع البيانات مشفرة بالكامل.";
            if (lower.includes('توصية') || lower.includes('recommend')) return "لقد قمت بتحديث خلاصتك بناءً على اهتمامك بـ " + state.userBehavior.preferences.join('، ') + ".";
            if (lower.includes('تلخيص') || lower.includes('summarize')) return "قام النظام بتلخيص 12 نقطة بيانات أخيرة. الاتجاه الرئيسي: كفاءة استدلال الذكاء الاصطناعي في ارتفاع.";
            return "أقوم بمعالجة طلبك باستخدام البنية السحابية الموزعة للنظام البيئي الذكي. كيف يمكنني مساعدتك أكثر؟";
        },

        startDataTracking: () => {
            setInterval(() => {
                state.userBehavior.timeSpent += 1;
                // محاكاة التعلم
                if (state.userBehavior.timeSpent % 10 === 0) {
                    state.systemHealth.learningRate = Math.min(99, state.systemHealth.learningRate + 0.1);
                    UI.updateLearningStatus();
                }
            }, 1000);
        },

        updateLearningStatus: () => {
            const fill = document.querySelector('.status-fill');
            if (fill) fill.style.width = `${state.systemHealth.learningRate}%`;
        },

        initVisualEngine: () => {
            const glow = document.querySelector('.dynamic-glow-core');
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX - 400;
                const y = e.clientY - 400;
                glow.style.transform = `translate(${x}px, ${y}px)`;
            });
        },

        notify: (title, msg, type) => {
            // منطق إشعارات بسيط
            console.log(`[${type.toUpperCase()}] ${title}: ${msg}`);
        },

        toggleTheme: () => {
            state.isDarkMode = !state.isDarkMode;
            document.body.style.filter = state.isDarkMode ? 'none' : 'invert(1) hue-rotate(180deg)';
            const icon = document.querySelector('.theme-toggle i');
            icon.className = state.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        }
    };

    return { init: UI.init };
})();

// تهيئة النظام عند التحميل
document.addEventListener('DOMContentLoaded', SmartEcosystem.init);
