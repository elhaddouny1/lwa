document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // 1. STATE & DATA MANAGEMENT
    // =================================================================================
    const AppState = {
        field: "Private Law",
        level: "S2",
        subjects: ["Théorie générale des obligations", "Droit commercial (fondamentaux)", "Droit pénal général", "Introduction aux relations internationales", "Introduction au droit administratif", "Loi e-transactions", "Culture digitale & Intelligence Artificielle"],
        supervisor: "أسماء",
        members: ["إيمان", "ناهد", "عبد المنعم", "خديجة", "مريم", "رباب", "يونس", "ناديا", "عتيقة", "عثمان", "محمد"],
        assignments: [],
        timeTracking: {},
        examDate: new Date(new Date().setMonth(new Date().getMonth() + 5)).getTime(),
        focusSession: {
            isActive: false,
            subject: null,
            member: null,
            timerId: null,
            startTime: 0,
            elapsedSeconds: 0,
            isPaused: false
        }
    };

    // DOM Elements
    const DOMElements = {
        supervisorName: document.getElementById('supervisor-name'),
        subjectsContainer: document.getElementById('subjects-dashboard-container'),
        membersContainer: document.getElementById('members-dashboard-container'),
        countdown: {
            days: document.getElementById('countdown-days'),
            hours: document.getElementById('countdown-hours'),
            minutes: document.getElementById('countdown-minutes'),
            seconds: document.getElementById('countdown-seconds'),
        },
        focusModal: {
            overlay: document.getElementById('focus-modal'),
            subject: document.getElementById('focus-modal-subject'),
            timer: document.getElementById('focus-timer'),
            memberSelect: document.getElementById('focus-member-select'),
            startBtn: document.getElementById('start-focus-btn'),
            pauseBtn: document.getElementById('pause-focus-btn'),
            endBtn: document.getElementById('end-focus-btn'),
        }
    };

    // =================================================================================
    // 2. CORE LOGIC
    // =================================================================================
    function loadState() {
        const savedAssignments = localStorage.getItem('lawGroupAssignments_S2');
        const savedTimeTracking = localStorage.getItem('lawGroupTimeTracking_S2');
        if (savedAssignments) AppState.assignments = JSON.parse(savedAssignments);
        else assignDeputies();
        if (savedTimeTracking) AppState.timeTracking = JSON.parse(savedTimeTracking);
        else initializeTimeTracking();
        saveState();
    }

    function saveState() {
        localStorage.setItem('lawGroupAssignments_S2', JSON.stringify(AppState.assignments));
        localStorage.setItem('lawGroupTimeTracking_S2', JSON.stringify(AppState.timeTracking));
    }

    function initializeTimeTracking() {
        AppState.timeTracking = {};
        AppState.members.forEach(member => {
            AppState.timeTracking[member] = { total: 0 };
            AppState.subjects.forEach(subject => {
                AppState.timeTracking[member][subject] = 0;
            });
        });
    }

    function assignDeputies() {
        let shuffledMembers = [...AppState.members].sort(() => 0.5 - Math.random());
        AppState.assignments = AppState.subjects.map((subject, index) => ({
            subject: subject,
            deputy: shuffledMembers[index % shuffledMembers.length]
        }));
    }

    // =================================================================================
    // 3. FOCUS MODE LOGIC
    // =================================================================================
    function openFocusModal(subject) {
        const session = AppState.focusSession;
        session.subject = subject;
        DOMElements.focusModal.subject.textContent = subject;
        DOMElements.focusModal.overlay.classList.remove('hidden');
        resetFocusSession();
    }

    function closeFocusModal() {
        if (AppState.focusSession.isActive) {
            if (!confirm("هل أنت متأكد من رغبتك في إلغاء الجلسة؟ لن يتم حفظ الوقت.")) return;
        }
        clearInterval(AppState.focusSession.timerId);
        DOMElements.focusModal.overlay.classList.add('hidden');
        resetFocusSession();
    }

    function resetFocusSession() {
        const session = AppState.focusSession;
        clearInterval(session.timerId);
        session.isActive = false;
        session.isPaused = false;
        session.elapsedSeconds = 0;
        session.timerId = null;
        DOMElements.focusModal.timer.textContent = "25:00";
        DOMElements.focusModal.startBtn.classList.remove('hidden');
        DOMElements.focusModal.pauseBtn.classList.add('hidden');
        DOMElements.focusModal.endBtn.disabled = true;
        DOMElements.focusModal.memberSelect.disabled = false;
    }

    function startFocusSession() {
        const session = AppState.focusSession;
        const member = DOMElements.focusModal.memberSelect.value;
        if (!member) {
            alert("الرجاء اختيار العضو الذي سيقوم بالجلسة.");
            return;
        }
        session.member = member;
        session.isActive = true;
        session.isPaused = false;
        session.startTime = Date.now();

        DOMElements.focusModal.startBtn.classList.add('hidden');
        DOMElements.focusModal.pauseBtn.classList.remove('hidden');
        DOMElements.focusModal.endBtn.disabled = false;
        DOMElements.focusModal.memberSelect.disabled = true;

        session.timerId = setInterval(updateFocusTimer, 1000);
    }
    
    function pauseFocusSession() {
        const session = AppState.focusSession;
        session.isPaused = !session.isPaused;
        DOMElements.focusModal.pauseBtn.innerHTML = session.isPaused ? '<i class="fas fa-play"></i> استئناف' : '<i class="fas fa-pause"></i> إيقاف مؤقت';
        if (!session.isPaused) {
            session.startTime = Date.now(); // Reset start time to correctly calculate elapsed time after pause
        }
    }

    function updateFocusTimer() {
        const session = AppState.focusSession;
        if (!session.isActive || session.isPaused) return;

        const currentTime = Date.now();
        const elapsedSinceLastTick = (currentTime - session.startTime) / 1000;
        session.elapsedSeconds += elapsedSinceLastTick;
        session.startTime = currentTime;

        const totalSeconds = 25 * 60; // 25 minutes
        const remainingSeconds = Math.max(0, totalSeconds - session.elapsedSeconds);
        const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
        const seconds = Math.floor(remainingSeconds % 60).toString().padStart(2, '0');
        DOMElements.focusModal.timer.textContent = `${minutes}:${seconds}`;

        if (remainingSeconds <= 0) {
            endFocusSession(true); // Auto-end session
        }
    }

    function endFocusSession(isCompleted = false) {
        const session = AppState.focusSession;
        const recordedSeconds = Math.floor(session.elapsedSeconds);

        if (recordedSeconds > 0) {
            AppState.timeTracking[session.member][session.subject] += recordedSeconds;
            AppState.timeTracking[session.member].total += recordedSeconds;
            saveState();
            renderMembersDashboard(); // Re-render to show updated times
        }
        
        if(isCompleted) alert("انتهت الجلسة! تم تسجيل الوقت بنجاح.");
        
        closeFocusModal();
    }

    // =================================================================================
    // 4. UI RENDERING
    // =================================================================================
    function renderUI() {
        DOMElements.supervisorName.textContent = AppState.supervisor;
        renderSubjectsDashboard();
        renderMembersDashboard();
        populateMemberSelect();
        startGlobalCountdown();
    }

    function renderSubjectsDashboard() {
        const container = DOMElements.subjectsContainer;
        container.innerHTML = '';
        AppState.assignments.forEach(assignment => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div class="subject-card-header"><h3>${assignment.subject}</h3></div>
                <div class="subject-card-body">
                    <p><i class="fas fa-user-shield"></i> نائب المادة: <strong>${assignment.deputy}</strong></p>
                </div>
                <div class="subject-card-footer">
                    <button class="focus-btn" data-subject="${assignment.subject}">بدء جلسة تركيز</button>
                </div>`;
            container.appendChild(card);
        });
    }

    function renderMembersDashboard() {
        const container = DOMElements.membersContainer;
        container.innerHTML = '';
        // Find max time for progress bar scaling
        const maxTime = Math.max(...AppState.members.map(m => AppState.timeTracking[m]?.total || 0), 1); // Avoid division by zero

        AppState.members.forEach(member => {
            const memberTime = AppState.timeTracking[member]?.total || 0;
            const hours = Math.floor(memberTime / 3600);
            const minutes = Math.floor((memberTime % 3600) / 60);
            const progress = (memberTime / maxTime) * 100;

            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <div class="member-info">
                    <i class="fas fa-user"></i><h4>${member}</h4>
                </div>
                <div class="member-stats">
                    <p>إجمالي وقت المذاكرة: <strong>${hours} س ${minutes} د</strong></p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>`;
            container.appendChild(card);
        });
    }
    
    function populateMemberSelect() {
        const select = DOMElements.focusModal.memberSelect;
        select.innerHTML = '<option value="">-- اختر العضو --</option>';
        AppState.members.forEach(member => {
            const option = document.createElement('option');
            option.value = member;
            option.textContent = member;
            select.appendChild(option);
        });
    }

    function startGlobalCountdown() {
        const interval = setInterval(() => {
            const distance = AppState.examDate - new Date().getTime();
            if (distance < 0) { clearInterval(interval); return; }
            DOMElements.countdown.days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            DOMElements.countdown.hours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            DOMElements.countdown.minutes.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            DOMElements.countdown.seconds.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }

    // =================================================================================
    // 5. EVENT LISTENERS & INITIALIZATION
    // =================================================================================
    function setupEventListeners() {
        DOMElements.subjectsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('focus-btn')) {
                openFocusModal(e.target.dataset.subject);
            }
        });
        
        DOMElements.focusModal.startBtn.addEventListener('click', startFocusSession);
        DOMElements.focusModal.pauseBtn.addEventListener('click', pauseFocusSession);
        DOMElements.focusModal.endBtn.addEventListener('click', () => endFocusSession(false));
        DOMElements.focusModal.overlay.addEventListener('click', (e) => {
            if (e.target === DOMElements.focusModal.overlay) closeFocusModal();
        });
    }

    function init() {
        loadState();
        renderUI();
        setupEventListeners();
    }

    init();
});
