/* ==========================================================================
   SMART ECOSYSTEM OS - NEURAL ENGINE (2026)
   ========================================================================== */

const SmartEcosystem = (() => {
    // --- State Management (Learning Core) ---
    const state = {
        userBehavior: {
            clicks: 0,
            views: [],
            timeSpent: 0,
            preferences: ['AI', 'Security', 'Data'],
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

    // --- Intelligence Layer: Recommendation Engine ---
    const recommendationEngine = {
        getFeed: () => {
            const pool = [
                { id: 1, tag: 'Intelligence', title: 'Neural Network Optimization', desc: 'Improving inference speed by 40% using quantization.' },
                { id: 2, tag: 'Security', title: 'Zero-Trust Architecture', desc: 'Implementing granular access control for distributed systems.' },
                { id: 3, tag: 'Analytics', title: 'Predictive User Clustering', desc: 'New K-Means model deployed for real-time segmentation.' },
                { id: 4, tag: 'Performance', title: 'Edge Caching Strategies', desc: 'Reducing latency to sub-10ms globally.' },
                { id: 5, tag: 'AI', title: 'Semantic Search Evolution', desc: 'Moving from keyword matching to vector embeddings.' }
            ];
            // Simulate AI prioritization based on preferences
            return pool.sort(() => Math.random() - 0.5);
        }
    };

    // --- Security Layer: Anomaly Detection ---
    const securityEngine = {
        checkAnomaly: (action) => {
            // Simulated Fraud Detection Algorithm
            const score = Math.random();
            if (score > 0.98) {
                state.systemHealth.fraudDetected = true;
                state.systemHealth.anomalyScore = score.toFixed(4);
                UI.notify('Anomaly Detected!', 'High risk behavior identified in session.', 'error');
            }
        }
    };

    // --- UI Engine: Adaptive Layout ---
    const UI = {
        init: () => {
            UI.bindEvents();
            UI.renderFeed();
            UI.startDataTracking();
            UI.updateLearningStatus();
            UI.initVisualEngine();
        },

        bindEvents: () => {
            // Navigation
            document.querySelectorAll('.nav-item, .m-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const view = item.getAttribute('data-view');
                    UI.switchView(view);
                    securityEngine.checkAnomaly('nav_switch');
                });
            });

            // AI Chatbot
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

            // AI Send Message
            document.getElementById('send-msg')?.addEventListener('click', UI.handleAIChat);
            document.getElementById('user-input')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') UI.handleAIChat();
            });

            // Theme Toggle
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

            // Add User Message
            UI.addChatMessage('user', text);
            input.value = '';

            // AI Processing (Simulated NLP + OpenAI Logic)
            UI.addChatMessage('bot', 'Analyzing request through Neural Engine...');
            
            try {
                // Real AI Integration Logic (Simulated for this demo)
                setTimeout(() => {
                    const response = UI.generateSmartResponse(text);
                    UI.addChatMessage('bot', response);
                }, 1000);
            } catch (error) {
                UI.addChatMessage('bot', 'Error connecting to Intelligence Layer.');
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
            if (lower.includes('security')) return "Security Layer is active. Current anomaly score is 0.02%. All data is E2E encrypted.";
            if (lower.includes('recommend')) return "I've updated your feed based on your interest in " + state.userBehavior.preferences.join(', ') + ".";
            if (lower.includes('summarize')) return "The system has summarized 12 recent data points. Key trend: AI inference efficiency is rising.";
            return "I am processing your request using the Smart Ecosystem's distributed cloud architecture. How else can I help?";
        },

        startDataTracking: () => {
            setInterval(() => {
                state.userBehavior.timeSpent += 1;
                // Simulate learning
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
            // Simple notification logic
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

// Initialize Ecosystem on Load
document.addEventListener('DOMContentLoaded', SmartEcosystem.init);
