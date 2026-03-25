
#include "pxt.h"

#define MPU 0x68

namespace mpuext {

    //% shim=mpuext::read_frame
    Buffer read_frame() {

        auto i2c = &uBit.i2c;

        // 1. ACCEL_XOUT_H (0x3B) を指定
        char reg = 0x3B;
        i2c->write(MPU << 1, &reg, 1, true);

        // 2. 14バイト読み取り
        char data[14];
        i2c->read(MPU << 1, data, 14);

        // 3. Buffer にして返す
        return ManagedBuffer((uint8_t*)data, 14);
    }
}
