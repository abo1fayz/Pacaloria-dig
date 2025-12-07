document.addEventListener('DOMContentLoaded', async function() {
    // تحميل البيانات عند فتح الصفحة
    await loadAllData();
});

async function loadAllData() {
    // تحميل المواد
    const materials = await window.supabaseClient.loadMaterials();
    displayMaterials(materials);
    
    // تحميل الملخصات
    const summaries = await window.supabaseClient.loadSummaries();
    displaySummaries(summaries);
    
    // تحميل شروحات الأساتذة
    const teachersContent = await window.supabaseClient.loadTeachersContent();
    displayTeachersContent(teachersContent);
}

function displayMaterials(materials) {
    const container = document.getElementById('materialsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    materials.forEach(material => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${material.image_url || 'assets/default-material.jpg'}" alt="${material.title}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${material.title}</h3>
                <p class="card-desc">${material.description}</p>
                <div class="card-meta">
                    <span>${material.subject}</span>
                    <span>${new Date(material.created_at).toLocaleDateString('ar-SA')}</span>
                </div>
                <a href="${material.file_url}" target="_blank" class="btn">عرض المادة</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function displaySummaries(summaries) {
    const container = document.getElementById('summariesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    summaries.forEach(summary => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">${summary.title}</h3>
                <p class="card-desc">${summary.description}</p>
                <div class="card-meta">
                    <span>${summary.subject}</span>
                    <span>${summary.grade}</span>
                </div>
                <a href="${summary.pdf_url}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-download"></i> تحميل PDF
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

function displayTeachersContent(contents) {
    const container = document.getElementById('teachersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    contents.forEach(content => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${content.thumbnail_url || 'assets/default-video.jpg'}" alt="${content.title}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${content.title}</h3>
                <p class="card-desc">${content.description}</p>
                <div class="card-meta">
                    <span>${content.teacher_name}</span>
                    <span>${content.duration || ''}</span>
                </div>
                <a href="${content.video_url}" target="_blank" class="btn">
                    <i class="fas fa-play"></i> مشاهدة الشرح
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}
