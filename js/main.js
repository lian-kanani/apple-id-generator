let startSerial = 1;

// Apple-style inline logo so the printed cards do not depend on an external image.
const appleLogoSVG = `
    <svg class="apple-logo" viewBox="0 0 64 76" aria-hidden="true">
        <path d="M43.7 14.5c2.9-3.6 4.9-8.6 4.3-13.5-4.6.2-10.1 3.1-13.1 6.8-2.6 3.2-4.8 8.2-4.2 12.8 5 .4 10-2.5 13-6.1ZM57.7 39.7c-.1-10 8.2-14.9 8.6-15.1-4.7-6.9-12.1-7.8-14.8-7.9-6.3-.7-12.4 3.7-15.6 3.7-3.3 0-8.3-3.6-13.6-3.5-7 .1-13.5 4.1-17.1 10.4-7.3 12.7-1.9 31.4 5.2 41.6 3.5 5 7.6 10.5 13 10.3 5.2-.2 7.2-3.3 13.5-3.3 6.3 0 8.1 3.3 13.6 3.2 5.6-.1 9.1-5 12.5-10 3.9-5.8 5.5-11.4 5.6-11.7-.1 0-10.7-4.1-10.8-16.2Z" transform="translate(-8,-4) scale(.82)" />
    </svg>
`;

// Fixed template for the front side of the card.
// The serial number is contenteditable so each card can be adjusted manually after rendering.
function getFrontCardTemplate(serialNumber) {
  return `
        <div class="card card-front">
            <div class="front-decor front-decor-top"></div>
            <div class="front-decor front-decor-bottom"></div>

            <div class="front-content">
                <div class="brand-block">
                    ${appleLogoSVG}
                    <h1>Apple ID</h1>
                </div>

                <div class="front-main-copy">
                    <p class="subtitle"><strong>بطاقة حساب جاهز ومفعّل</strong></p>
                    <ul class="features-list">
                        <li><strong>✔ يتضمن كلمة السر وتاريخ الميلاد وأسئلة الأمان</strong></li>
                        <li><strong>✔ لا يحتاج إلى ربط بطاقة إئتمانية</strong></li>
                    </ul>
                    <div class="warning-box">
                        <span class="warning-title">⚠️ ملاحظة مهمة جداً:</span>
                        يستعمل هذا الحساب فقط لتحميل التطبيقات من متجر App Store ولا يستعمل إطلاقاً كحساب iCloud.
                    </div>
                </div>
            </div>

            <div class="front-footer">
                <div class="serial-box">
                    <span class="serial-label">Serial No.</span>
                    <span class="serial-value" contenteditable="true" spellcheck="false" title="يمكنك تعديل الرقم يدوياً">${serialNumber}</span>
                </div>
                <span class="footer-label">بطاقة خدمات رقمية</span>
            </div>
        </div>
    `;
}

// Function to generate the back side of the card with editable fields.
function getBackCardTemplate(rowData = []) {
  const email = rowData[0] || "";
  const pass = rowData[1] || "";
  const dob = rowData[2] || "";
  const q1 = rowData[3] || "";
  const q2 = rowData[4] || "";
  const q3 = rowData[5] || "";

  return `
        <div class="card card-back">
            <table class="data-table">
                <tr>
                    <td style="width: 33%;"><strong>Email:</strong></td>
                    <td><div class="editable-value" contenteditable="true" spellcheck="false" placeholder="example@email.com">${email}</div></td>
                </tr>
                <tr>
                    <td><strong>Password:</strong></td>
                    <td><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Xx123456">${pass}</div></td>
                </tr>
                <tr>
                    <td><strong>Birth Date:</strong></td>
                    <td><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="xx/xx/202x">${dob}</div></td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top:1px; border-top: 0.5pt solid #949ba9;"></td>
                </tr>
                <tr>
                    <td class="sqQ" colspan="2"><strong>Security questions(اسئلة الامان):</strong></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">What is the first name of your best friend in high school?</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q1">${q1}</div></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">What is your dream job ?</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q2">${q2}</div></td>
                </tr>
                <tr>
                    <td class="q-title" colspan="2">In what city did your parents meet ?</td>
                </tr>
                <tr>
                    <td colspan="2"><div class="scratch-editable" contenteditable="true" spellcheck="false" placeholder="Q3">${q3}</div></td>
                </tr>
            </table>
        </div>
    `;
}

function getStartSerial() {
  const input = document.getElementById("startSerial");
  const parsed = Number.parseInt(input?.value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 1;
}

// Function to render pages based on the data rows.
function renderPages(dataRows = []) {
  const container = document.getElementById("pages-container");
  container.innerHTML = "";
  startSerial = getStartSerial();

  const totalItems = Math.max(8, dataRows.length);
  const totalPages = Math.ceil(totalItems / 8);

  for (let p = 0; p < totalPages; p++) {
    let frontPageHTML = `<div class="a4-page"><div class="page-title-banner">Page ${p * 2 + 1}: Front Sides - Sheet ${p + 1}</div>`;
    for (let i = 0; i < 8; i++) {
      const serialNumber = startSerial + p * 8 + i;
      frontPageHTML += getFrontCardTemplate(serialNumber);
    }
    frontPageHTML += `</div>`;
    container.innerHTML += frontPageHTML;

    let backPageHTML = `<div class="a4-page"><div class="page-title-banner">Page ${p * 2 + 2}: Back Sides - Sheet ${p + 1}</div>`;
    for (let i = 0; i < 8; i++) {
      const dataIndex = p * 8 + i;
      const rowData = dataRows[dataIndex] || [];
      backPageHTML += getBackCardTemplate(rowData);
    }
    backPageHTML += `</div>`;
    container.innerHTML += backPageHTML;
  }
}

window.onload = function () {
  const serialInput = document.getElementById("startSerial");
  serialInput.addEventListener("change", () => renderPages(lastDataRows));
  serialInput.addEventListener("input", () => {
    // Re-render only after a valid whole number is entered to avoid flicker while typing.
    if (/^\d+$/.test(serialInput.value)) {
      renderPages(lastDataRows);
    }
  });
  renderPages([]);
};

let lastDataRows = [];

document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});

document.getElementById("excelUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

    const hasHeaders = document.getElementById("hasHeaders").checked;
    let dataRows = hasHeaders ? json.slice(1) : json;
    dataRows = dataRows.filter((row) => row.some((cell) => cell !== ""));
    lastDataRows = dataRows;

    if (dataRows.length > 0) {
      renderPages(dataRows);
      alert(
        "✅ Imported " +
          dataRows.length +
          " accounts and pages have been prepared successfully!",
      );
    } else {
      alert("⚠️ The file is empty or does not contain any data.");
    }
  };
  reader.readAsArrayBuffer(file);
});
