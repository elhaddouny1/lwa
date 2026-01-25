// 1. إعدادات البيانات الأساسية (يمكنك تعديلها بسهولة)
const examDate = new Date("2026-06-15T09:00:00").getTime();

const subjectsData = [
    { id: 1, name: "النظرية العامة للالتزامات", supervisor: "ناهد", progress: 65, icon: "fa-gavel" },
    { id: 2, name: "القانون الجنائي العام", supervisor: "د. أحمد", progress: 40, icon: "fa-handcuffs" },
    { id: 3, name: "القانون الإداري", supervisor: "د. سارة", progress: 85, icon: "fa-building-columns" },
    { id: 4, name: "تاريخ القانون", supervisor: "أ. محمود", progress: 20, icon: "fa-scroll" }
];

// 2. وظيفة العداد التنازلي (Countdown Timer)
function updateCountdown() {
    const now = new Date().getTime();
    const distance = examDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").classList.add("hidden");
        document.getElementById("exam-alert").classList.remove("hidden");
    }
}

const timerInterval = setInterval(updateCountdown, 1000);

// 3. عرض المواد وتحديث شريط التقدم ديناميكياً
function renderSubjects() {
    const container = document.getElementById("subjects-container");
    container.innerHTML = ""; // مسح المحتوى الحالي

    subjectsData.forEach(subject => {
        const statusText = getStatusText(subject.progress);
        const subjectHTML = `
            <div class="subject-item">
                <div class="subject-info">
                    <h4><i class="fas ${subject.icon}"></i> ${subject.name}</h4>
                    <span class="supervisor">إشراف: ${subject.supervisor}</span>
                </div>
                <div class="progress-wrapper">
                    <div class="progress-labels">
                        <span>مستوى الفهم: <strong class="understanding-text">${statusText}</strong></span>
                        <span class="percentage">${subject.progress}%</span>
                    </div>
                    <input type="range" min="0" max="100" value="${subject.progress}" 
                           class="progress-slider" oninput="updateProgress(${subject.id}, this.value)">
                    <div class="progress-bar-bg">
                        <div class="progress-fill" style="width: ${subject.progress}%"></div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += subjectHTML;
    });
}

// 4. وظيفة تحديد نص الحالة بناءً على النسبة
function getStatusText(progress) {
    if (progress < 30) return "تحتاج مراجعة مكثفة";
    if (progress < 60) return "شرح متوسط";
    if (progress < 90) return "شرح جيد";
    return "تم الإتقان 🎉";
}

// 5. تحديث التقدم في الوقت الفعلي وتوليد توصيات ذكية
function updateProgress(id, value) {
    const subject = subjectsData.find(s => s.id === id);
    if (subject) {
        subject.progress = value;
        renderSubjects(); // إعادة بناء القائمة لتحديث النصوص والأشرطة
        generateAIRecommendation(subject.name, value);
    }
}

// 6. محاكاة توصيات الذكاء الاصطناعي (AI Recommendations)
function generateAIRecommendation(name, value) {
    const aiBox = document.getElementById("ai-suggestions");
    let recommendation = "";

    if (value < 50) {
        recommendation = `بما أن فهمك لمادة <strong>${name}</strong> ضعيف، نقترح عليك مراجعة الملخصات الصوتية لهذا الأسبوع.`;
    } else if (value >= 50 && value < 80) {
        recommendation = `أداء جيد في <strong>${name}</strong>! جرب حل بعض القضايا العملية لتعزيز فهمك.`;
    } else {
        recommendation = `ممتاز! أنت جاهز لاختبار الزملاء في مادة <strong>${name}</strong>.`;
    }

    aiBox.innerHTML = `<p class="ai-text pulse">${recommendation}</p>`;
}

// تشغيل الوظائف عند تحميل الصفحة
window.onload = () => {
    updateCountdown();
    renderSubjects();
};
