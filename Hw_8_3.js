// scripts/Hw_8_3.js

/**
 * ฟังก์ชันนี้ใช้สำหรับสร้าง UI (ส่วนประกอบ HTML) สำหรับการบ้าน Hw_8_3
 * มันจะถูกเรียกโดย main.html เมื่อผู้ใช้เลือก Hw 8.3
 * @returns {string} HTML string ที่จะแสดงบนหน้าเว็บ
 */
function getUI_Hw_8_3() {
    return `
        <h2>Hw 8.3: การคำนวณ Power Factor Correction</h2>
        <div class="input-group">
            <label for="Hw_8_3-V">แรงดัน V (Vrms):</label>
            <input type="number" id="Hw_8_3-V" value="" placeholder="เช่น 240" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-rad">ความถี่ (rad/s):</label>
            <input type="number" id="Hw_8_3-rad" value="" placeholder="เช่น 460" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-Pload1">กำลังไฟฟ้าชนิดที่ 1 Pload1 (Watts):</label>
            <input type="number" id="Hw_8_3-Pload1" value="" placeholder="เช่น 1000" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-PF1">Power Factor PF1 (ค่า 0 ถึง 1):</label>
            <input type="number" id="Hw_8_3-PF1" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.8" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-L1">ลักษณะตัวประกอบกำลัง PF1 (1=Lagging, 2=Leading):</label>
            <input type="number" id="Hw_8_3-L1" value="" placeholder="เช่น 1 (Lagging)" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-Pload2">กำลังไฟฟ้าชนิดที่ 2 Pload2 (Watts):</label>
            <input type="number" id="Hw_8_3-Pload2" value="" placeholder="เช่น 500" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-PF2">Power Factor PF2 (ค่า 0 ถึง 1):</label>
            <input type="number" id="Hw_8_3-PF2" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.9" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-L2">ลักษณะตัวประกอบกำลัง PF2 (1=Lagging, 2=Leading):</label>
            <input type="number" id="Hw_8_3-L2" value="" placeholder="เช่น 2 (Leading)" />
        </div>
        <div class="input-group">
            <label for="Hw_8_3-PFT">Power Factor ที่ต้องการปรับปรุง (ค่า 0 ถึง 1):</label>
            <input type="number" id="Hw_8_3-PFT" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.95" />
        </div>
        <button class="calc-button" onclick="runCalculation('Hw_8_3')">คำนวณ Hw 8.3</button>
        <div id="result-Hw_8_3" class="result">
            </div>
    `;
}

/**
 * ฟังก์ชันนี้ใช้สำหรับคำนวณผลลัพธ์ของการบ้าน Hw_8_3
 * มันจะถูกเรียกโดยฟังก์ชัน runCalculation ใน main.html
 * @param {Object} inputs - วัตถุที่เก็บค่า input จากฟอร์ม
 * @returns {Object} วัตถุที่เก็บผลลัพธ์การคำนวณ
 */
function calculate_hw_8_3(inputs) {
    const V = inputs.V;
    const rad = inputs.rad;
    const Pload1 = inputs.Pload1;
    const PF1 = inputs.PF1;
    const L1 = inputs.L1; // 1=Lagging, 2=Leading
    const Pload2 = inputs.Pload2;
    const PF2 = inputs.PF2;
    const L2 = inputs.L2; // 1=Lagging, 2=2Leading
    const PFT = inputs.PFT;

    // ตรวจสอบค่าที่รับเข้ามา
    if ([V, rad, Pload1, PF1, L1, Pload2, PF2, L2, PFT].some(val => isNaN(val) || val === null || val === '')) {
        return { Error: "กรุณาป้อนค่าตัวเลขให้ครบถ้วนทุกช่อง" };
    }

    // ตรวจสอบ Power Factor เพื่อป้องกัน math domain error (acos(x) where x > 1 or x < -1)
    if (PF1 < 0 || PF1 > 1 || PF2 < 0 || PF2 > 1 || PFT < 0 || PFT > 1) {
        return { Error: "Power Factor ควรมีค่าระหว่าง 0 ถึง 1" };
    }

    // คำนวณ Q1
    let Q1_val = Pload1 * Math.tan(Math.acos(PF1));
    if (L1 === 2) { // Leading
        Q1_val = -Q1_val;
    } else if (L1 === 1) { // Lagging
        // Q1_val เป็นค่าบวกอยู่แล้ว
    } else {
        return { Error: "L1 ควรเป็น 1 (Lagging) หรือ 2 (Leading)" };
    }

    // คำนวณ Q2
    let Q2_val = Pload2 * Math.tan(Math.acos(PF2));
    if (L2 === 2) { // Leading
        Q2_val = -Q2_val;
    } else if (L2 === 1) { // Lagging
        // Q2_val เป็นค่าบวกอยู่แล้ว
    } else {
        return { Error: "L2 ควรเป็น 1 (Lagging) หรือ 2 (Leading)" };
    }

    const QPF1_total = Q1_val + Q2_val;
    const P_total = Pload1 + Pload2;

    let PFtotal_calculated;
    const S_total_magnitude = Math.sqrt((P_total ** 2) + (QPF1_total ** 2));
    if (S_total_magnitude === 0) { // ป้องกันการหารด้วยศูนย์
        PFtotal_calculated = 0;
    } else {
        PFtotal_calculated = P_total / S_total_magnitude;
    }

    // คำนวณ Qc
    // หาก PFT เป็น 1 (unity PF), tan(acos(1)) จะเป็น 0
    // หาก rad หรือ V เป็น 0, จะเกิดการหารด้วยศูนย์
    if (PFT === 1) { // Unity Power Factor, target Q = 0
        Qc = QPF1_total;
    } else {
        Qc = QPF1_total - (P_total * Math.tan(Math.acos(PFT)));
    }


    // คำนวณ C
    if (V === 0 || rad === 0) {
        return { Error: "แรงดัน (V) และความถี่เชิงมุม (rad/s) ต้องไม่เป็นศูนย์" };
    }
    const C_farad = Qc / (V * V * rad);
    const C_uF = C_farad * 10**6; // แปลงจาก Farad เป็น microFarad

    return {
        'Q total (ก่อนแก้ไข)': `${QPF1_total.toFixed(3)} var`,
        'PF total (ก่อนแก้ไข)': `${PFtotal_calculated.toFixed(3)}`,
        'Reactive Power ของตัวเก็บประจุ Qc': `${Qc.toFixed(3)} var`,
        'ค่าความจุของตัวเก็บประจุ C': `${C_uF.toFixed(3)} uF`
    };
}