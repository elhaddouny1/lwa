document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // 1. STATE & DATA MANAGEMENT
    // =================================================================================
    const AppState = {
        // ... (نفس بيانات المواد والأعضاء)
        field: "Private Law", level: "S2",
        subjects: ["Théorie générale des obligations", "Droit commercial (fondamentaux)", "Droit pénal général", "Introduction aux relations internationales", "Introduction au droit administratif", "Loi e-transactions", "Culture digitale & Intelligence Artificielle"],
        supervisor: "أسماء",
        members: ["إيمان", "ناهد", "عبد المنعم", "خديجة", "مريم", "رباب", "يونس", "ناديا", "عتيقة", "عثمان", "محمد"],
        assignments: [], timeTracking: {},
        examDate: new Date(new Date().setMonth(new Date().getMonth() + 5)).getTime(),
        focusSession: { /* ... */ }
    };

    // ... (نفس الـ DOM Elements)
    const DOMElements = {
        supervisorName: document.getElementById('supervisor-name'),
        subjectsContainer: document.getElementById('subjects-dashboard-container'),
        membersContainer: document.getElementById('members-dashboard-container'),
        smartCardContainer: document.getElementById('smart-card-container'),
        // ... (بقية العناصر)
    };

    // =================================================================================
    // 2. CORE LOGIC (No changes here, logic is sound)
    // =================================================================================
    function loadState() { /* ... */ }
    function saveState() { /* ... */ }
    function initializeTimeTracking() { /* ... */ }
    function assignDeputies() { /* ... */ }

    // =================================================================================
    // 3. FOCUS MODE LOGIC (Updated for 60 minutes)
    // =================================================================================
    const FOCUS_DURATION_SECONDS = 60 * 60; // Set to 60 minutes

    function openFocusModal(subject) { /* ... */ }
    function closeFocusModal() { /* ... */ }
    
    function resetFocusSession() {
        // ... (نفس المنطق)
        DOMElements.focusModal.timer.textContent = "60:00"; // Update display
        // ...
    }

    function startFocusSession() { /* ... */ }
    function pauseFocusSession() { /* ... */ }

    function updateFocusTimer() {
        // ... (نفس المنطق، لكن يستخدم المتغير الجديد)
        const remainingSeconds = Math.max(0, FOCUS_DURATION_SECONDS - session.elapsedSeconds);
        // ...
    }

    function endFocusSession(isCompleted = false) {
        // ... (نفس المنطق)
        renderSmartDashboard(); // Re-render smart card after session ends
    }

    // =================================================================================
    // 4. UI RENDERING (With new Smart Dashboard)
    // =================================================================================
    function renderUI() {
        // ...
        renderSmartDashboard();
        // ...
    }

    function renderSubjectsDashboard() { /* ... */ }
    function renderMembersDashboard() { /* ... */ }
    function populateMemberSelect() { /* ... */ }
    function startGlobalCountdown() { /* ... */ }

    /**
     * NEW & SMART: Renders the card for the most active member in the last 24 hours.
     */
    function renderSmartDashboard() {
        const container = DOMElements.smartCardContainer;
        if (!container) return;

        let mostActiveMember = { name: null, time: 0 };
        const now = Date.now();

        // This is a conceptual implementation. A real implementation would need timestamps for each session.
        // For now, we'll find the member with the highest total time as a proxy.
        for (const member in AppState.timeTracking) {
            if (AppState.timeTracking[member].total > mostActiveMember.time) {
                mostActiveMember = { name: member, time: AppState.timeTracking[member].total };
            }
        }

        let cardHTML;
        if (mostActiveMember.name && mostActiveMember.time > 0) {
            const hours = Math.floor(mostActiveMember.time / 3600);
            const minutes = Math.floor((mostActiveMember.time % 3600) / 60);
            cardHTML = `
                <div class="smart-card">
                    <div class="smart-card-content">
                        <div class="icon"><i class="fas fa-award"></i></div>
                        <div class="text">
                            <h4>العضو الأكثر نشاطاً</h4>
                            <p>
                                تحية تقدير لـ<strong>${mostActiveMember.name}</strong> على مجهوده الرائع، بإجمالي دراسة
                                <strong>${hours > 0 ? `${hours} س و ` : ''}${minutes} د</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            cardHTML = `
                <div class="smart-card">
                    <div class="smart-card-content">
                        <div class="icon"><i class="fas fa-hourglass-start"></i></div>
                        <div class="text">
                            <h4>ابدأ التحدي</h4>
                            <p>لم يتم تسجيل أي جلسات دراسية بعد. كن أول من يبدأ اليوم!</p>
                        </div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = cardHTML;
    }
    
    // =================================================================================
    // 5. EVENT LISTENERS & INITIALIZATION
    // =================================================================================
    function setupEventListeners() { /* ... */ }
    function init() { /* ... */ }

    init();
});
