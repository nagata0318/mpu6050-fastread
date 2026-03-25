//% color=#00AAFF weight=100
namespace mpuext {

    // C++ 関数を TS に公開する
    //% shim=mpuext::read_frame
    declare function read_frame(): Buffer;

    //% block="MPU6050 raw read"
    export function readMPU6050Raw() {

        const buf = read_frame(); // ←ズレない高速読み取り

        let ax = (buf[0] << 8) | buf[1]; if (ax & 0x8000) ax -= 0x10000;
        let ay = (buf[2] << 8) | buf[3]; if (ay & 0x8000) ay -= 0x10000;
        let az = (buf[4] << 8) | buf[5]; if (az & 0x8000) az -= 0x10000;
        let temp = (buf[6] << 8) | buf[7]; if (temp & 0x8000) temp -= 0x10000;
        let gx = (buf[8] << 8) | buf[9]; if (gx & 0x8000) gx -= 0x10000;
        let gy = (buf[10] << 8) | buf[11]; if (gy & 0x8000) gy -= 0x10000;
        let gz = (buf[12] << 8) | buf[13]; if (gz & 0x8000) gz -= 0x10000;

        return { ax, ay, az, temp, gx, gy, gz };
    }
}
