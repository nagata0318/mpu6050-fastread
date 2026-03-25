//% color=#00AAFF weight=100 block="MPU6050 Fast Reader"
namespace mpuext {

    // C++ 関数を宣言
    //% shim=mpuext::read_frame
    declare function read_frame(): Buffer;

    // ブロックとして公開
    //% block="MPU6050 生データ読取"
    export function readMPU6050Raw(): { ax: number, ay: number, az: number, gx: number, gy: number, gz: number, temp: number } {

        const buf = read_frame(); // ← レジスタ指定不要！

        let ax = (buf[0] << 8) | buf[1]; if (ax & 0x8000) ax -= 0x10000
        let ay = (buf[2] << 8) | buf[3]; if (ay & 0x8000) ay -= 0x10000
        let az = (buf[4] << 8) | buf[5]; if (az & 0x8000) az -= 0x10000
        let temp = (buf[6] << 8) | buf[7]; if (temp & 0x8000) temp -= 0x10000
        let gx = (buf[8] << 8) | buf[9]; if (gx & 0x8000) gx -= 0x10000
        let gy = (buf[10] << 8) | buf[11]; if (gy & 0x8000) gy -= 0x10000
        let gz = (buf[12] << 8) | buf[13]; if (gz & 0x8000) gz -= 0x10000

        return { ax, ay, az, gx, gy, gz, temp }
    }
}
