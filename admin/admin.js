document.addEventListener('DOMContentLoaded', function() {
    // معالجة نموذج إضافة مادة
    const materialForm = document.getElementById('materialForm');
    if (materialForm) {
        materialForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const material = {
                title: document.getElementById('materialTitle').value,
                subject: document.getElementById('materialSubject').value,
                description: document.getElementById('materialDesc').value,
                file_url: document.getElementById('materialFile').value,
                image_url: document.getElementById('materialImage').value || null,
                created_at: new Date().toISOString()
            };
            
            try {
                await window.supabaseClient.addMaterial(material);
                showMessage('تم إضافة المادة بنجاح!', 'success');
                materialForm.reset();
            } catch (error) {
                showMessage('حدث خطأ في إضافة المادة: ' + error.message, 'error');
            }
        });
    }
    
    // معالجة نموذج إضافة ملخص
    const summaryForm = document.getElementById('summaryForm');
    if (summaryForm) {
        summaryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const summary = {
                title: document.getElementById('summaryTitle').value,
                subject: document.getElementById('summarySubject').value,
                grade: document.getElementById('summaryGrade').value,
                description: document.getElementById('summaryDesc').value,
                pdf_url: document.getElementById('summaryPdf').value,
                created_at: new Date().toISOString()
            };
            
            try {
                await window.supabaseClient.addSummary(summary);
                showMessage('تم إضافة الملخص بنجاح!', 'success');
                summaryForm.reset();
            } catch (error) {
                showMessage('حدث خطأ في إضافة الملخص: ' + error.message, 'error');
            }
        });
    }
});

function showMessage(message, type) {
    const container = document.getElementById('messageContainer');
    if (!container) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
    alertDiv.innerHTML = `
        ${message}
        <button onclick="this.parentElement.remove()" style="float: left; background: none; border: none; cursor: pointer;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.innerHTML = '';
    container.appendChild(alertDiv);
    
    // إزالة الرسالة بعد 5 ثواني
    setTimeout(() => {
        if (alertDiv.parentElement === container) {
            container.removeChild(alertDiv);
        }
    }, 5000);
          }
