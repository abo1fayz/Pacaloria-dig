// تهيئة Supabase
const SUPABASE_URL = 'https://ikpijsdqmavklpgunumm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_y_bTCDZICysEgs_8xXgfaw_zKLMC-PF';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// دالة لتحميل المواد
async function loadMaterials() {
    try {
        const { data, error } = await supabase
            .from('materials')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error loading materials:', error);
        return [];
    }
}

// دالة لتحميل الملخصات
async function loadSummaries() {
    try {
        const { data, error } = await supabase
            .from('summaries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6);
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error loading summaries:', error);
        return [];
    }
}

// دالة لتحميل شروحات الأساتذة
async function loadTeachersContent() {
    try {
        const { data, error } = await supabase
            .from('teachers_content')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(4);
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error loading teachers content:', error);
        return [];
    }
}

// دالة لإضافة مادة جديدة
async function addMaterial(material) {
    try {
        const { data, error } = await supabase
            .from('materials')
            .insert([material]);
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding material:', error);
        throw error;
    }
}

// دالة لإضافة ملخص جديد
async function addSummary(summary) {
    try {
        const { data, error } = await supabase
            .from('summaries')
            .insert([summary]);
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding summary:', error);
        throw error;
    }
}

// تصدير الدوال
window.supabaseClient = {
    supabase,
    loadMaterials,
    loadSummaries,
    loadTeachersContent,
    addMaterial,
    addSummary
};
