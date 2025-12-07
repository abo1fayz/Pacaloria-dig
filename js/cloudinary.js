// إعدادات Cloudinary
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

// دالة لرفع ملف إلى Cloudinary
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        const data = await response.json();
        return data.secure_url; // رابط الملف المرفوع
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

// دالة لرفع ملف PDF
async function uploadPdf(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading PDF:', error);
        throw error;
    }
}

window.cloudinary = {
    uploadToCloudinary,
    uploadPdf
};
