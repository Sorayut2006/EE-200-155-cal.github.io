// scripts/Hw_8_1.js

/**
 * ฟังก์ชันนี้ใช้สำหรับสร้าง UI (ส่วนประกอบ HTML) สำหรับการบ้าน Hw_8_1
 * มันจะถูกเรียกโดย main.html เมื่อผู้ใช้เลือก Hw 8.1
 * @returns {string} HTML string ที่จะแสดงบนหน้าเว็บ
 */
function getUI_Hw_8_1() {
    return `
        <h2>Hw 8.1: การวิเคราะห์วงจรไฟฟ้ากระแสสลับ</h2>
        <div class="input-group">
            <label for="Hw_8_1-Vs">แรงดันแหล่งจ่าย Vs (rms):</label>
            <input type="number" id="Hw_8_1-Vs" value="" placeholder="เช่น 10" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-Vsd">มุมเฟสแรงดันแหล่งจ่าย Vs Degree (องศา):</label>
            <input type="number" id="Hw_8_1-Vsd" value="" placeholder="เช่น 0" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-R1">ค่าความต้านทาน R1 (Ohms):</label>
            <input type="number" id="Hw_8_1-R1" value="" placeholder="เช่น 10" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-R2">ค่าความต้านทาน R2 (Ohms):</label>
            <input type="number" id="Hw_8_1-R2" value="" placeholder="เช่น 20" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-R3">ค่าความต้านทาน R3 (Ohms):</label>
            <input type="number" id="Hw_8_1-R3" value="" placeholder="เช่น 30" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-Z1">ค่ารีแอกแตนซ์ Z1 (Ohms):</label>
            <input type="number" id="Hw_8_1-Z1" value="" placeholder="เช่น 5 (ค่าบวกคือ Inductive, ลบคือ Capacitive)" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-Z2">ค่ารีแอกแตนซ์ Z2 (Ohms):</label>
            <input type="number" id="Hw_8_1-Z2" value="" placeholder="เช่น -10 (ค่าบวกคือ Inductive, ลบคือ Capacitive)"" />
        </div>
        <div class="input-group">
            <label for="Hw_8_1-Z3">ค่ารีแอกแตนซ์ Z3 (Ohms):</label>
            <input type="number" id="Hw_8_1-Z3" value="" placeholder="เช่น 15 (ค่าบวกคือ Inductive, ลบคือ Capacitive)"" />
        </div>
        <button class="calc-button" onclick="runCalculation('Hw_8_1')">คำนวณ Hw 8.1</button>
        <div id="result-Hw_8_1" class="result">
            </div>
    `;
}

/**
 * Helper function สำหรับ Complex Number Operations (ไม่มีใน JS โดยตรง)
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
function complex_to_phaser(z) {
    const r = z.magnitude();
    const theta_degrees = z.phase() * (180 / Math.PI); // แปลงเรเดียนเป็นองศา
    return `${r.toFixed(3)} ∠ ${theta_degrees.toFixed(3)}°`;
}

/**
 * ดึงเฉพาะมุมเฟสของจำนวนเชิงซ้อน (เป็นองศา)
 * @param {Complex} z - จำนวนเชิงซ้อน
 * @returns {number} มุมเฟสเป็นองศา
 */
function Phasecomplex_to_phaser(z) {
    return z.phase() * (180 / Math.PI);
}

/**
 * ดึงเฉพาะขนาดของจำนวนเชิงซ้อน
 * @param {Complex} z - จำนวนเชิงซ้อน
 * @returns {number} ขนาด
 */
function Realcomplex_to_phaser(z) {
    return z.magnitude();
}

/**
 * ฟังก์ชันนี้ใช้สำหรับคำนวณผลลัพธ์ของการบ้าน Hw_8_1
 * มันจะถูกเรียกโดยฟังก์ชัน runCalculation ใน main.html
 * @param {Object} inputs - วัตถุที่เก็บค่า input จากฟอร์ม
 * @returns {Object} วัตถุที่เก็บผลลัพธ์การคำนวณ
 */
function calculate_hw_8_1(inputs) {
    const Vs_mag = inputs.Vs;
    const Vsd_deg = inputs.Vsd;
    const R1 = inputs.R1;
    const R2 = inputs.R2;
    const R3 = inputs.R3;
    const Z1 = inputs.Z1; // ใน Python คือ imag part ของ Z
    const Z2 = inputs.Z2;
    const Z3 = inputs.Z3;

    // ตรวจสอบค่าที่รับเข้ามา
    if ([Vs_mag, Vsd_deg, R1, R2, R3, Z1, Z2, Z3].some(isNaN)) {
        return { Error: "กรุณาป้อนค่าตัวเลขให้ครบถ้วนทุกช่อง" };
    }

    // แปลง Vs จากขนาดและมุม เป็น Complex
    const Vs = Complex.fromPolar(Vs_mag, Vsd_deg);

    // การคำนวณตาม Logic ของคุณ
    const I1 = Vs.divide(new Complex(R1, Z1));
    const Vc1 = I1.multiply(new Complex(0, Z1)); // Vc1 คือ แรงดันตกคร่อม Z1 (X1)
    const I2 = Vs.divide(new Complex(R2, Z2));
    const I3 = Vs.divide(new Complex(R3, Z3));
    const Is = I1.add(I2).add(I3);

    const PF = Math.cos(Phasecomplex_to_phaser(Is) * (Math.PI / 180)); // แปลงองศากลับเป็นเรเดียนเพื่อใช้กับ Math.cos

    let L;
    if (Phasecomplex_to_phaser(Is) > 0) {
        L = 'Leading';
    } else {
        L = 'Lagging';
    }

    // ใน Python Psource = Is*Vs ซึ่งจะได้ Complex Number
    // Psource.real คือ Real Power
    // S คือ Apparent Power (ขนาดของ S)
    // ดังนั้นต้องแยกให้ชัดเจน
    // S = Vs * Is.magnitude() -> นี่คือการหา Apparent Power
    // Psource_complex = Vs.multiply(Is.conjugate()) เพื่อหา Complex Power S = P + jQ
    // P = Re(S)
    // Q = Im(S)

    // เราจะคำนวณ Apparent Power S จากสูตร S = V_rms * I_rms (magnitudes)
    const S = Vs.magnitude() * Is.magnitude();

    // สำหรับ Psource ตาม Python ของคุณ (Is * Vs) ซึ่งจะได้ Complex Number
    // ปกติ Psource ควรเป็น Active Power P
    // ถ้า Python Psource คือ complex power (S = P + jQ)
    // ดังนั้น Psource.real คือ Active Power (P)
    // และ Psource.imag คือ Reactive Power (Q)
    // แต่จากโค้ด Python "Psource = Is*Vs" และ "print(f'Psource = {round(Psource.real, 3)} W')"
    // แสดงว่าคุณต้องการ Active Power (P)
    // และ "S = Vs*(Realcomplex_to_phaser(Is.real, Is.imag))"
    // S ใน Python ของคุณคือ Vs_magnitude * Is_magnitude ซึ่งคือ Apparent Power (S)

    // เราจะใช้ S = P + jQ (Complex Power)
    // S_complex = V * I* (I conjugate)
    // เนื่องจาก Vs ของคุณไม่มีมุมเฟสที่สัมพันธ์กับ Is ในการคำนวณ Psource ตรงๆ แบบนี้
    // เราจะใช้ Active Power P = Vs_magnitude * Is_magnitude * PF
    const Psource_active = Vs.magnitude() * Is.magnitude() * PF;

    const PR3 = (Realcomplex_to_phaser(I3) ** 2) * R3; // PR3.real เพราะ I3**2 จะเป็น Real Number

    // ส่งคืนผลลัพธ์เป็น Object
    return {
        'Vc1': `${complex_to_phaser(Vc1)} Vrms`,
        'IL1': `${complex_to_phaser(I2)} Arms`, // ใน Python ใช้ I2 แต่ชื่อตัวแปรเป็น IL1
        'Is': `${complex_to_phaser(Is)} Arms`,
        'PF': `${PF.toFixed(3)} ${L}`,
        'Active Power (Psource)': `${Psource_active.toFixed(3)} W`,
        'Apparent Power (S)': `${S.toFixed(3)} VA`,
        'Power R3 (PR3)': `${PR3.toFixed(3)} W`
    };
}