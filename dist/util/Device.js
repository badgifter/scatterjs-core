"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
    (exports["default"] = void 0);
var device = 'nodejs_env';
// if ("undefined" == typeof navigator) device = "nodejs_env";
// else {
//     var _require = require("device-uuid"),
//         DeviceUUID = _require.DeviceUUID,
//         du = new DeviceUUID().parse(),
//         dua = [du.language, du.platform, du.os, du.cpuCores, du.colorDepth];
//     device = du.hashMD5(dua.join(":"));
// }
// var _default = device;
exports["default"] = device;
