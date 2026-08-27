// Fixed template for the front side of the card
const frontCardTemplate = `
    <div class="card card-front">
        <div>
            <div class="brand-header">
                <h1>Apple ID</h1>
            </div>
            <p class="subtitle">بطاقة حساب جاهز ومفعّل</p>
            <ul class="features-list">
                <li>✔ يتضمن كلمة السر وتاريخ الميلاد وأسئلة الأمان</li>
                <li>✔ لا يحتاج إلى ربط بطاقة إئتمانية</li>
            </ul>
            <div class="warning-box">
                <span class="warning-title">⚠️ ملاحظة مهمة جداً:</span>
                يستعمل هذا الحساب فقط لتحميل التطبيقات من متجر App Store ولا يستعمل إطلاقاً كحساب iCloud.
            </div>
        </div>
        <div class="footer-front">
            <span>بطاقة خدمات رقمية</span>
        </div>
    </div>
`;

// Function to generate the back side of the card with editable fields
function getBackCardTemplate(rowData = []) {
    const email = rowData[0] || '';
    const pass = rowData[1] || '';
    const dob = rowData[2] || '';
    const q1 = rowData[3] || '';
    const q2 = rowData[4] || '';
    const q3 = rowData[5] || '';

    return `
        <div class="card card-back">
            <table class="data-table">
                <tr>
                    <td style="width: 33%;"><strong>البريد:</strong></td>
                    <td><div class="editable-value" contenteditable="true" spellcheck="false" placeholder="example@email.com">${email}</div></td>
                </tr>
                <tr>
                    <td><strong>كلمة السر:</strong></td>
                    <td><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Xx123456">${pass}</div></td>
                </tr>
                <tr>
                    <td><strong>تاريخ الميلاد:</strong></td>
                    <td><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="xx/xx/202x">${dob}</div></td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top:1px; border-top: 0.5pt solid #949ba9;"></td>
                </tr>
                <tr>
                    <td><strong>اسئلة الامان:</strong></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">Q1</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q1">${q1}</div></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">Q2</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q2">${q2}</div></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">Q3</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q3">${q3}</div></td>
                </tr>
            </table>
            <div class="disclaimer-back">
                * تأكد من سلامة طبقات الكشط قبل الشراء. للدعم الفني والتواصل عبر واتساب: 09xxxxxxxx
            </div>
        </div>
    `;
}

// Function to render pages based on the data rows
function renderPages(dataRows = []) {
    const container = document.getElementById('pages-container');
    container.innerHTML = ''; 
    
    const totalItems = Math.max(8, dataRows.length);
    const totalPages = Math.ceil(totalItems / 8); 

    for (let p = 0; p < totalPages; p++) {
        
        // 1. Generating the front page
        let frontPageHTML = `<div class="a4-page"><div class="page-title-banner">Page ${p*2 + 1}: Front Sides - Sheet ${p+1}</div>`;
        for (let i = 0; i < 8; i++) {
            frontPageHTML += frontCardTemplate;
        }
        frontPageHTML += `</div>`;
        container.innerHTML += frontPageHTML;

        // 2. Generating the back page
        let backPageHTML = `<div class="a4-page"><div class="page-title-banner">Page ${p*2 + 2}: Back Sides - Sheet ${p+1}</div>`;
        for (let i = 0; i < 8; i++) {
            const dataIndex = (p * 8) + i; 
            const rowData = dataRows[dataIndex] || []; 
            backPageHTML += getBackCardTemplate(rowData);
        }
        backPageHTML += `</div>`;
        container.innerHTML += backPageHTML;
    }
}

// Initial render with empty cards on page load
window.onload = function() {
    renderPages([]);
};

// Handle Print Button
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

// Handle Excel file upload and parse the data
document.getElementById('excelUpload').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
        
        var json = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ""});
        
        var hasHeaders = document.getElementById('hasHeaders').checked;
        var dataRows = hasHeaders ? json.slice(1) : json;
        
        // Filter out any completely empty rows
        dataRows = dataRows.filter(row => row.some(cell => cell !== ""));
        
        if(dataRows.length > 0) {
            renderPages(dataRows);
            alert("✅ Imported " + dataRows.length + " accounts and pages have been prepared successfully!");
        } else {
            alert("⚠️ The file is empty or does not contain any data.");
        }
    };
    reader.readAsArrayBuffer(file);
});