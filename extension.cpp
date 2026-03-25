#include "pxt.h"
#include "MicroBitI2C.h"

#define MPU 0x68

namespace mpuext {

    //% shim=mpuext::read_frame
    Buffer read_frame() {

        MicroBitI2C* i2c = uBit.i2c;

        // Write register 0x3B (ACCEL_XOUT_H)
        char reg = 0x3B;
        int r = i2c->write(MPU << 1, &reg, 1, true); // repeated start

        // Read 14 bytes
        char data[14];
        r = i2c->read(MPU << 1, data, 14);

        // Return as ManagedBuffer
        return ManagedBuffer((uint8_t*)data, 14);
    }
}
