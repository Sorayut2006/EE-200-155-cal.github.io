// scripts/Hw_8_2.js

/**
 * Helper class สำหรับ Complex Number Operations (นำมาจาก Hw_8_1.js)
 */
class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    add(other) {
        return new Complex(this.re + other.re, this.im + other.im);
    }

    subtract(other) {
        return new Complex(this.re - other.re, this.im - other.im);
    }

    multiply(other) {
        return new Complex(
            this.re * other.re - this.im * other.im,
            this.re * other.im + this.im * other.re
        );
    }

    divide(other) {
        const denominator = other.re * other.re + other.im * other.im;
        if (denominator === 0) {
            throw new Error("หารด้วยศูนย์ (Complex Number)");
        }
        return new Complex(
            (this.re * other.re + this.im * other.im) / denominator,
            (this.im * other.re - this.re * other.im) / denominator
        );
    }

    magnitude() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    phase() { // radians
        return Math.atan2(this.im, this.re);
    }

    conjugate() {
        return new Complex(this.re, -this.im);
    }

    static fromPolar(r, theta_degrees) {
        const theta_rad = theta_degrees * (Math.PI / 180);
        return new Complex(r * Math.cos(theta_rad), r * Math.sin(theta_rad));
    }
}

/**
 * แปลงจำนวนเชิงซ้อนเป็นรูปแบบ Phaser (Magnitude ∠ Angle°)
 * @param {Complex} z - จำนวนเชิงซ้อน
 * @returns {string} รูปแบบ "Magnitude ∠ Angle°"
 */
function complex_to_phaser_8_2(z) { // เปลี่ยนชื่อเล็กน้อยเพื่อไม่ให้ซ้ำกับ Hw_8_1 หากโหลดพร้อมกัน
    const r = z.magnitude();
    const theta_degrees = z.phase() * (180 / Math.PI);
    return `${r.toFixed(3)} ∠ ${theta_degrees.toFixed(3)}°`;
}

/**
 * ดึงเฉพาะมุมเฟสของจำนวนเชิงซ้อน (เป็นองศา)
 * @param {Complex} z - จำนวนเชิงซ้อน
 * @returns {number} มุมเฟสเป็นองศา
 */
function Phasecomplex_to_phaser_8_2(z) {
    return z.phase() * (180 / Math.PI);
}

/**
 * ดึงเฉพาะขนาดของจำนวนเชิงซ้อน
 * @param {Complex} z - จำนวนเชิงซ้อน
 * @returns {number} ขนาด
 */
function Realcomplex_to_phaser_8_2(z) {
    return z.magnitude();
}

// --- UI Generation ---

/**
 * ฟังก์ชันนี้ใช้สำหรับสร้าง UI (ส่วนประกอบ HTML) สำหรับการบ้าน Hw_8_2
 * มันจะถูกเรียกโดย main.html เมื่อผู้ใช้เลือก Hw 8.2
 * @returns {string} HTML string ที่จะแสดงบนหน้าเว็บ
 */
function getUI_Hw_8_2() {
    return `
        <h2>Hw 8.2: การวิเคราะห์กำลังไฟฟ้าและวงจรอนุกรม-ขนาน</h2>
        <div style="margin-bottom: 20px;">
            <label>เลือกข้อที่ต้องการ:</label><br>
            <input type="radio" id="mode8_2_1" name="hw8_2_mode" value="1" checked onchange="toggle8_2_inputs()">
            <label for="mode8_2_1">ข้อ 1</label>
            <input type="radio" id="mode8_2_2" name="hw8_2_mode" value="2" onchange="toggle8_2_inputs()">
            <label for="mode8_2_2">ข้อ 2</label>
        </div>

        <div id="hw8_2_mode1_inputs">
            <h3>ข้อที่ 1</h3>
            <div class="input-group">
                <label for="Hw_8_2-V1">แหล่งจ่าย V1 (Volts):</label>
                <input type="number" id="Hw_8_2-V1" value="" placeholder="เช่น 120" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-V1d">มุมเฟสแหล่งจ่าย V1 Degree (องศา):</label>
                <input type="number" id="Hw_8_2-V1d" value="" placeholder="เช่น 0" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-P1">กำลังไฟฟ้าจริง P1 (Watts):</label>
                <input type="number" id="Hw_8_2-P1" value="" placeholder="เช่น 3000" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-pf1">Power Factor pf1 (ค่า 0 ถึง 1):</label>
                <input type="number" id="Hw_8_2-pf1" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.85" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-L1">ลักษณะโหลด L1 (0: --, 1: Lagging, 2: Leading):</label>
                <input type="number" id="Hw_8_2-L1" value="" placeholder="0, 1 หรือ 2" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-P2">กำลังไฟฟ้าจริง P2 (Watts):</label>
                <input type="number" id="Hw_8_2-P2" value="" placeholder="เช่น 1200" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-pf2">Power Factor pf2 (ค่า 0 ถึง 1):</label>
                <input type="number" id="Hw_8_2-pf2" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.9" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-L2">ลักษณะโหลด L2 (0: --, 1: Lagging, 2: Leading):</label>
                <input type="number" id="Hw_8_2-L2" value="" placeholder="0, 1 หรือ 2" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-P3">กำลังไฟฟ้าจริง P3 (Watts):</label>
                <input type="number" id="Hw_8_2-P3" value="" placeholder="เช่น 700" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-pf3">Power Factor pf3 (ค่า 0 ถึง 1):</label>
                <input type="number" id="Hw_8_2-pf3" value="" step="0.001" min="0" max="1" placeholder="เช่น 0.95" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-L3">ลักษณะโหลด L3 (0: --, 1: Lagging, 2: Leading):</label>
                <input type="number" id="Hw_8_2-L3" value="" placeholder="0, 1 หรือ 2" />
            </div>
        </div>

        <div id="hw8_2_mode2_inputs" style="display: none;">
            <h3>ข้อที่ 2</h3>
            <div class="input-group">
                <label for="Hw_8_2-Vs">แหล่งจ่าย Vs (rms):</label>
                <input type="number" id="Hw_8_2-Vs" value="" placeholder="เช่น 220" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-Vsd">มุมเฟสแหล่งจ่าย Vs Degree (องศา):</label>
                <input type="number" id="Hw_8_2-Vsd" value="" placeholder="เช่น 0" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-Zline">ส่วนจริงของสาย Zline (Real Part):</label>
                <input type="number" id="Hw_8_2-Zline" value="" placeholder="เช่น 1" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-Zlinej">ส่วนจินตภาพของสาย Zline (Imaginary Part):</label>
                <input type="number" id="Hw_8_2-Zlinej" value="" placeholder="เช่น 0.1" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-Zl">ส่วนจริงของโหลด Zl (Real Part):</label>
                <input type="number" id="Hw_8_2-Zl" value="" placeholder="เช่น 50" />
            </div>
            <div class="input-group">
                <label for="Hw_8_2-Zlj">ส่วนจินตภาพของโหลด Zlj (Imaginary Part):</label>
                <input type="number" id="Hw_8_2-Zlj" value="" placeholder="เช่น - 50" />
            </div>
        </div>

        <button class="calc-button" onclick="runCalculation('Hw_8_2')">คำนวณ Hw 8.2</button>
        <div id="result-Hw_8_2" class="result">
            </div>
    `;
}

/**
 * ฟังก์ชันสำหรับสลับการแสดงผลของ input fields ระหว่างโหมด 1 และโหมด 2
 */
function toggle8_2_inputs() {
    const mode1Div = document.getElementById('hw8_2_mode1_inputs');
    const mode2Div = document.getElementById('hw8_2_mode2_inputs');
    const selectedMode = document.querySelector('input[name="hw8_2_mode"]:checked').value;

    if (selectedMode === '1') {
        mode1Div.style.display = 'block';
        mode2Div.style.display = 'none';
    } else {
        mode1Div.style.display = 'none';
        mode2Div.style.display = 'block';
    }
}

// --- Calculation Logic ---

/**
 * ฟังก์ชันนี้ใช้สำหรับคำนวณผลลัพธ์ของการบ้าน Hw_8_2
 * มันจะถูกเรียกโดยฟังก์ชัน runCalculation ใน main.html
 * @param {Object} inputs - วัตถุที่เก็บค่า input จากฟอร์ม
 * @returns {Object} วัตถุที่เก็บผลลัพธ์การคำนวณ
 */
function calculate_hw_8_2(inputs) {
    const selectedMode = document.querySelector('input[name="hw8_2_mode"]:checked').value;

    if (selectedMode === '1') {
        // --- โหมด 1: รวมกำลังไฟฟ้า ---
        const v1 = inputs.V1;
        const v1d = inputs.V1d; // ไม่ได้ใช้ในโค้ด Python แต่รับมาเผื่อไว้
        const p1 = inputs.P1;
        const pf1 = inputs.pf1;
        const L1 = inputs.L1;
        const p2 = inputs.P2;
        const pf2 = inputs.pf2;
        const L2 = inputs.L2;
        const p3 = inputs.P3;
        const pf3 = inputs.pf3;
        const L3 = inputs.L3;

        // ตรวจสอบค่าที่รับเข้ามา
        if ([v1, p1, pf1, L1, p2, pf2, L2, p3, pf3, L3].some(isNaN)) {
            return { Error: "กรุณาป้อนค่าตัวเลขให้ครบถ้วนทุกช่องสำหรับโหมด 1" };
        }
        if (pf1 === 0 || pf2 === 0 || pf3 === 0) {
            // หลีกเลี่ยง Math.acos(0) ถ้าเกิด q = 0 ในกรณี PF = 0 (Pure Reactive)
            // หรือจัดการกรณี PF = 0 โดยตรงถ้าจำเป็น
            // สำหรับ Math.tan(Math.acos(0)) จะเป็นค่าอนันต์ ดังนั้นต้องจัดการ
            return { Error: "Power Factor (pf) ไม่สามารถเป็น 0 ได้สำหรับการคำนวณนี้ (ยกเว้น L = 0 สำหรับ Resistive)" };
        }

        let q1 = p1 * Math.tan(Math.acos(pf1));
        let q2 = p2 * Math.tan(Math.acos(pf2));
        let q3 = p3 * Math.tan(Math.acos(pf3));

        if (L1 === 0) { // Resistive, Q = 0
            q1 = 0;
        } else if (L1 === 2) { // Leading
            q1 = -Math.abs(q1); // ต้องเป็นค่าลบ
        } else if (L1 === 1) { // Lagging
            q1 = Math.abs(q1); // ต้องเป็นค่าบวก
        }

        if (L2 === 0) { // Resistive, Q = 0
            q2 = 0;
        } else if (L2 === 2) { // Leading
            q2 = -Math.abs(q2); // ต้องเป็นค่าลบ
        } else if (L2 === 1) { // Lagging
            q2 = Math.abs(q2); // ต้องเป็นค่าบวก
        }

        if (L3 === 0) { // Resistive, Q = 0
            q3 = 0;
        } else if (L3 === 2) { // Leading
            q3 = -Math.abs(q3); // ต้องเป็นค่าลบ
        } else if (L3 === 1) { // Lagging
            q3 = Math.abs(q3); // ต้องเป็นค่าบวก
        }

        const P_total = p1 + p2 + p3;
        const Q_total = q1 + q2 + q3;

        const S_total_magnitude = Math.sqrt((P_total ** 2) + (Q_total ** 2));
        let pf_total;
        if (S_total_magnitude === 0) { // กันหารด้วยศูนย์
             pf_total = 0;
        } else {
             pf_total = P_total / S_total_magnitude;
        }


        const Ir = S_total_magnitude / v1;

        let Iim_degrees = Math.atan2(Q_total, P_total) * (180 / Math.PI); // ใช้ atan2 เพื่อหา quadrant ที่ถูกต้อง

        let L_type;
        if (Q_total < 0) {
            L_type = 'leading';
            // มุมของกระแสจะนำหน้าแรงดัน (ถ้าแรงดันมุม 0)
            // ถ้า Q เป็นลบ, มุมจะเป็นลบ (อยู่ใน Q4)
            // โค้ด Python มี Iim = -Iim ในกรณี Q < 0 (Leading) ซึ่งจะทำให้อันดับมุมกลายเป็นบวกจากมุมติดลบ
            // แต่ปกติแล้ว Leading Power Factor คือมุมกระแสบวก (นำหน้าแรงดัน) หรือมุมติดลบถ้านับจากแรงดันอ้างอิง
            // Math.atan2(Q, P) จะให้มุมที่ถูกต้องแล้ว (-90 ถึง 90 สำหรับ Q/P)
            // เราจะใช้วิธีนี้ให้ตรงกับ PF Angle = atan(Q/P)
        } else if (Q_total > 0) {
            L_type = 'lagging';
            // ถ้า Q เป็นบวก, มุมจะเป็นบวก (อยู่ใน Q1)
            // โค้ด Python มี Iim = -Iim ในกรณี Q > 0 (Lagging) ซึ่งจะทำให้อันดับมุมกลายเป็นลบจากมุมบวก
            // ซึ่งดูแปลกๆ เพราะปกติแล้วกระแส Lagging ควรจะมีมุมเป็นลบเมื่อเทียบกับแรงดัน (ถ้าแรงดันเป็น 0 องศา)
            // ถ้า P และ Q เป็นบวก, atan2 จะให้มุมบวก
            // ถ้า P เป็นบวก, Q เป็นลบ, atan2 จะให้มุมลบ
            // PF Angle = -angle(current)
            // Angle(current) = -arccos(PF) for lagging, arccos(PF) for leading
            // ลองใช้ Iim_degrees ตามที่ Math.atan2 ให้มาตรงๆ ก่อน แล้วปรับตามกรณี
            // ของ Python คือ Iim = math.degrees(math.atan(Q/P)) และถ้า Q < 0 คือ Leading
            // และถ้า Q > 0 คือ Lagging และ Iim = -Iim
            // ดังนั้นถ้า Q เป็นบวก (lagging) Iim จะเป็นลบ
            // ถ้า Q เป็นลบ (leading) Iim จะเป็นบวก
            // เราจะทำตาม logic นี้:
            Iim_degrees = Math.degrees(Math.atan2(Q_total, P_total)); // atan2(Q,P) is angle of S
            if (Q_total > 0) { // If Q is positive, it's lagging, but the current should lag the voltage.
                               // The angle of S is atan2(Q,P). If V has angle 0, then I has angle -atan2(Q,P).
                Iim_degrees = -Iim_degrees; // Current angle lags voltage
            } else if (Q_total < 0) { // If Q is negative, it's leading, current should lead voltage.
                                      // Angle of S is negative. Current angle is -(-angle of S) = +angle of S.
                // Iim_degrees remains as is (or take absolute if it was -ve, but it's already negative)
                Iim_degrees = -Iim_degrees; // Current angle leads voltage
            } else { // Q_total == 0 (resistive)
                Iim_degrees = 0;
            }
        } else { // Q_total == 0
            L_type = 'resistive';
            Iim_degrees = 0;
        }


        return {
            'P': `${P_total.toFixed(3)} W`,
            'Q': `${Q_total.toFixed(3)} var`,
            'pf': `${pf_total.toFixed(3)}`,
            'ลักษณะโหลด': `แบบ ${L_type}`,
            'I': `${Ir.toFixed(3)} ∠ ${Iim_degrees.toFixed(3)}° Arms`
        };

    } else {
        // --- โหมด 2: วงจรอนุกรม-ขนาน ---
        const Vs_mag = inputs.Vs;
        const Vsd_deg = inputs.Vsd;
        const Zline = inputs.Zline;
        const Zlinej = inputs.Zlinej;
        const Zl = inputs.Zl;
        const Zlj = inputs.Zlj;

        // ตรวจสอบค่าที่รับเข้ามา
        if ([Vs_mag, Vsd_deg, Zline, Zlinej, Zl, Zlj].some(isNaN)) {
            return { Error: "กรุณาป้อนค่าตัวเลขให้ครบถ้วนทุกช่องสำหรับโหมด 2" };
        }

        const Vs = Complex.fromPolar(Vs_mag, Vsd_deg);
        const Zloadc = new Complex(Zl, Zlj);
        const Zlinec = new Complex(Zline, Zlinej);

        const Is = Vs.divide(Zlinec.add(Zloadc));
        const Vload = Is.multiply(Zloadc);
        const Vline = Is.multiply(Zlinec);

        // คำนวณ PF
        let pf_val = Math.cos(Math.abs(Phasecomplex_to_phaser_8_2(Is) * (Math.PI / 180)));
        let L_type;
        if (Phasecomplex_to_phaser_8_2(Is) < 0) { // กระแสมีมุมติดลบเมื่อเทียบกับแรงดัน (สมมติแรงดันเป็น 0)
            L_type = 'leading'; // ถ้ามุมกระแสติดลบ (ใน Q4) -> Leading (ถ้าแรงดันเป็น 0 องศา)
        } else if (Phasecomplex_to_phaser_8_2(Is) > 0) { // กระแสมีมุมบวกเมื่อเทียบกับแรงดัน
            L_type = 'lagging'; // ถ้ามุมกระแสเป็นบวก (ใน Q1) -> Lagging (ถ้าแรงดันเป็น 0 องศา)
        } else {
            L_type = 'unity';
        }
        // ในโค้ด Python มี `if PF > 0: L = 'lagging'` ซึ่งปกติ PF ควรเป็นบวกเสมอ
        // แต่การเช็ค L/L ก็ดูจากมุมของกระแส (เทียบกับแรงดันที่มุม 0)
        // หรือจากมุมของ Total Power (Q)
        // เนื่องจาก PF คือ cos(theta), และ theta คือมุมระหว่าง V กับ I
        // ถ้า Is มีมุม, Vsd มีมุม, เราต้องหามุมระหว่าง I กับ V
        // theta = angle(V) - angle(I) หรือ angle(I) - angle(V)
        // จากโค้ด Python, PF = math.cos(math.radians(-(PFcomplex_to_phaser(Is.real, Is.imag))))
        // ซึ่งก็คือ cos ของมุมกระแสติดลบ
        // แล้วใช้ PF > 0 เป็น lagging
        // ถ้า Phasecomplex_to_phaser(Is) เป็นบวก (กระแส lagging Vs) -> cos(-positive) = cos(positive) (PF > 0) -> lagging
        // ถ้า Phasecomplex_to_phaser(Is) เป็นลบ (กระแส leading Vs) -> cos(-negative) = cos(positive) (PF > 0) -> leading
        // ดังนั้นโค้ดเดิมใน Python ดูจากค่าของ PF มากกว่ามุมโดยตรง
        // แต่ถ้ามุม Is เป็นบวก -> lagging
        // ถ้ามุม Is เป็นลบ -> leading
        // ซึ่ง Math.cos ของมุมบวกหรือลบที่ถูกต้องก็ควรให้ PF เป็นบวกเสมอ
        // ผมจะยึดตามหลักการว่า PF > 0 หรือ PF = 0
        if (Phasecomplex_to_phaser_8_2(Is) < 0) { // If current's angle is negative
            L_type = 'leading';
        } else if (Phasecomplex_to_phaser_8_2(Is) > 0) { // If current's angle is positive
            L_type = 'lagging';
        } else {
            L_type = 'unity';
        }

        const Pload = (Realcomplex_to_phaser_8_2(Is) ** 2) * Zl;
        const Qload = (Realcomplex_to_phaser_8_2(Is) ** 2) * Zlj;
        const Pline = (Realcomplex_to_phaser_8_2(Is) ** 2) * Zline;
        const Qline = (Realcomplex_to_phaser_8_2(Is) ** 2) * Zlinej;

        return {
            'Is': `${complex_to_phaser_8_2(Is)} Arms`,
            'Vload': `${complex_to_phaser_8_2(Vload)} Vrms`,
            'Vline': `${complex_to_phaser_8_2(Vline)} Vrms`,
            'PF': `${pf_val.toFixed(3)} ${L_type}`,
            'Pload': `${Pload.toFixed(3)} W`,
            'Qload': `${Qload.toFixed(3)} var`,
            'Pline': `${Pline.toFixed(3)} W`,
            'Qline': `${Qline.toFixed(3)} var`
        };
    }
}