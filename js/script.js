// Subjects Data
const subjects = [
    {
        id: 1,
        name: 'القانون المدني',
        image: 'assets/images/civil_law.jpg',
        progress: 75,
        chapters: 12,
        completed: 9,
        points: 250
    },
    {
        id: 2,
        name: 'القانون الجنائي',
        image: 'assets/images/criminal_law.jpg',
        progress: 60,
        chapters: 10,
        completed: 6,
        points: 180
    },
    {
        id: 3,
        name: 'القانون التجاري',
        image: 'assets/images/commercial_law.jpg',
        progress: 55,
        chapters: 8,
        completed: 4,
        points: 165
    },
    {
        id: 4,
        name: 'القانون الإداري',
        image: 'assets/images/civil_law.jpg',
        progress: 70,
        chapters: 9,
        completed: 6,
        points: 210
    },
    {
        id: 5,
        name: 'قانون الأسرة',
        image: 'assets/images/criminal_law.jpg',
        progress: 82,
        chapters: 7,
        completed: 6,
        points: 245
    },
    {
        id: 6,
        name: 'القانون الدستوري',
        image: 'assets/images/commercial_law.jpg',
        progress: 45,
        chapters: 11,
        completed: 5,
        points: 135
    }
];

// Tasks Data
const tasks = [
    {
        id: 1,
        title: 'مراجعة الفصل الثالث من القانون المدني',
        time: 'غداً - 10:00 صباحاً',
        completed: false
    },
    {
        id: 2,
        title: 'حل تمارين القانون الجنائي',
        time: 'اليوم - 3:00 مساءً',
        completed: false
    },
    {
        id: 3,
        title: 'كتابة ملخص عن العقود التجارية',
        time: 'بعد غد - 5:00 مساءً',
        completed: false
    },
    {
        id: 4,
        title: 'اختبار تقييمي في القانون الإداري',
        time: 'الأسبوع القادم',
        completed: false
    }
];

// Load Subjects
function loadSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    container.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <img src="${subject.image}" alt="${subject.name}" class="subject-image">
            <div class="subject-content">
                <div class="subject-title">${subject.name}</div>
                <div class="subject-progress">
                    <div class="progress-label">
                        <span>التقدم</span>
                        <span>${subject.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${subject.progress}%"></div>
                    </div>
                </div>
                <div class="subject-stats">
                    <div class="stat">
                        <div class="stat-value">${subject.completed}/${subject.chapters}</div>
                        <div class="stat-label">فصول</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${subject.points}</div>
                        <div class="stat-label">نقاط</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click events to cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.subject-title').textContent;
            alert(`تم فتح: ${title}`);
        });
    });
}

// Load Tasks
function loadTasks() {
    const container = document.getElementById('tasksContainer');
    if (!container) return;
    container.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})">
                <i class="fas fa-check" style="display: ${task.completed ? 'block' : 'none'};"></i>
            </div>
            <div class="task-content">
                <div class="task-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}; opacity: ${task.completed ? '0.5' : '1'};">${task.title}</div>
                <div class="task-time">
                    <i class="fas fa-clock"></i> ${task.time}
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Task Completion
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        loadTasks();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSubjects();
    loadTasks();

    // AI Assistant Buttons
    document.querySelectorAll('.ai-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('تم تفعيل: ' + this.textContent.trim());
        });
    });
});
