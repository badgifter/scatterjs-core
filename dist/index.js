"use strict";
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard"),
  _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: !0 }),
  Object.defineProperty(exports, "SocketService", {
    enumerable: !0,
    get: function get() {
      return _SocketService["default"];
    },
  }),
  Object.defineProperty(exports, "Plugin", {
    enumerable: !0,
    get: function get() {
      return _Plugin["default"];
    },
  }),
  Object.defineProperty(exports, "Blockchains", {
    enumerable: !0,
    get: function get() {
      return _Blockchains.Blockchains;
    },
  }),
  Object.defineProperty(exports, "Network", {
    enumerable: !0,
    get: function get() {
      return _Network["default"];
    },
  }),
  Object.defineProperty(exports, "WalletInterface", {
    enumerable: !0,
    get: function get() {
      return _WalletInterface["default"];
    },
  }),
  Object.defineProperty(exports, "WALLET_METHODS", {
    enumerable: !0,
    get: function get() {
      return _WalletInterface.WALLET_METHODS;
    },
  }),
  (exports.PluginTypes = exports["default"] = exports.EVENTS = void 0);
var _regenerator = _interopRequireDefault(
    require("@babel/runtime/regenerator")
  ),
  _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof")),
  _asyncToGenerator2 = _interopRequireDefault(
    require("@babel/runtime/helpers/asyncToGenerator")
  ),
  _classCallCheck2 = _interopRequireDefault(
    require("@babel/runtime/helpers/classCallCheck")
  ),
  _createClass2 = _interopRequireDefault(
    require("@babel/runtime/helpers/createClass")
  ),
  _PluginRepository = _interopRequireDefault(
    require("./plugins/PluginRepository")
  ),
  _SocketService = _interopRequireDefault(require("./services/SocketService")),
  _Plugin = _interopRequireDefault(require("./plugins/Plugin")),
  PluginTypes = _interopRequireWildcard(require("./plugins/PluginTypes"));
exports.PluginTypes = PluginTypes;
var origin,
  _Blockchains = require("./models/Blockchains"),
  _Network = _interopRequireDefault(require("./models/Network")),
  _WalletInterface = _interopRequireWildcard(
    require("./models/WalletInterface")
  ),
  _LocalSocket = _interopRequireDefault(require("./wallets/LocalSocket")),
  _LegacyInjection = _interopRequireDefault(
    require("./wallets/LegacyInjection")
  ),
  _Injection = _interopRequireDefault(require("./wallets/Injection")),
  _Token = _interopRequireDefault(require("./models/Token")),
  EVENTS = { Disconnected: "dced", LoggedOut: "logout" };
exports.EVENTS = EVENTS;
var socket = null,
  socketSetters = [],
  holderFns = {},
  Index = /*#__PURE__*/ (function () {
    function a() {
      (0, _classCallCheck2["default"])(this, a),
        (this.identity = null),
        (this.network = null),
        _PluginRepository["default"].loadPlugin(
          new _LocalSocket["default"](this, holderFns)
        ),
        _PluginRepository["default"].loadPlugin(
          new _Injection["default"](this, holderFns)
        ),
        _PluginRepository["default"].loadPlugin(
          new _LegacyInjection["default"](this, holderFns)
        );
    }
    return (
      (0, _createClass2["default"])(a, [
        {
          key: "loadPlugin",
          value: function loadPlugin(a) {
            if (!a.isValid())
              throw new Error(
                "".concat(
                  a.name,
                  " doesn't seem to be a valid ScatterJS plugin."
                )
              );
            _PluginRepository["default"].loadPlugin(a),
              a.type === PluginTypes.BLOCKCHAIN_SUPPORT &&
                ((this[a.name] = a.signatureProvider(
                  function noIdFunc() {
                    if (!holderFns.get().identity)
                      throw new Error("No Identity");
                  },
                  function () {
                    return holderFns.get().identity;
                  }
                )),
                (this[a.name + "Hook"] = a.hookProvider),
                "function" == typeof a.multiHook &&
                  (this[a.name + "MultiHook"] = a.multiHook),
                socketSetters.push(a.setSocketService)),
              a.type === PluginTypes.WALLET_SUPPORT &&
                a.init(this, holderFns, socketSetters);
          },
        },
        {
          key: "connect",
          value: (function () {
            var a = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/ _regenerator["default"].mark(function a(b, c) {
                var d = this;
                return _regenerator["default"].wrap(function (a) {
                  for (;;)
                    switch ((a.prev = a.next)) {
                      case 0:
                        return a.abrupt(
                          "return",
                          new Promise(
                            /*#__PURE__*/ (function () {
                              var a = (0, _asyncToGenerator2["default"])(
                                /*#__PURE__*/ _regenerator["default"].mark(
                                  function a(e) {
                                    var f, g, h, j, k, l;
                                    return _regenerator["default"].wrap(
                                      function (a) {
                                        for (;;)
                                          switch ((a.prev = a.next)) {
                                            case 0:
                                              c || (c = {}),
                                                (d.network = c.hasOwnProperty(
                                                  "network"
                                                )
                                                  ? c.network
                                                  : null),
                                                (f =
                                                  _PluginRepository[
                                                    "default"
                                                  ].wallets()),
                                                socket &&
                                                  (socket.disconnect(),
                                                  (socket = null)),
                                                (g = !1),
                                                (h = []),
                                                (j = function (a) {
                                                  if (g) return { v: void 0 };
                                                  var d = f[a];
                                                  h.push(
                                                    Promise.race([
                                                      d
                                                        .connect(b, c)
                                                        .then(
                                                          /*#__PURE__*/ (function () {
                                                            var a = (0,
                                                            _asyncToGenerator2[
                                                              "default"
                                                            ])(
                                                              /*#__PURE__*/ _regenerator[
                                                                "default"
                                                              ].mark(function a(
                                                                b
                                                              ) {
                                                                return _regenerator[
                                                                  "default"
                                                                ].wrap(
                                                                  function (a) {
                                                                    for (;;)
                                                                      switch (
                                                                        (a.prev =
                                                                          a.next)
                                                                      ) {
                                                                        case 0:
                                                                          if (
                                                                            !b
                                                                          ) {
                                                                            a.next = 12;
                                                                            break;
                                                                          }
                                                                          if (
                                                                            ("injection" !==
                                                                              b &&
                                                                              ((socket =
                                                                                b),
                                                                              socketSetters.map(
                                                                                function (
                                                                                  a
                                                                                ) {
                                                                                  return a(
                                                                                    b
                                                                                  );
                                                                                }
                                                                              )),
                                                                            "function" !=
                                                                              typeof d.runBeforeInterfacing)
                                                                          ) {
                                                                            a.next = 5;
                                                                            break;
                                                                          }
                                                                          return (
                                                                            (a.next = 5),
                                                                            d.runBeforeInterfacing()
                                                                          );
                                                                        case 5:
                                                                          if (
                                                                            (new _WalletInterface[
                                                                              "default"
                                                                            ](
                                                                              d.name,
                                                                              d.methods(),
                                                                              holderFns.get()
                                                                            ),
                                                                            "function" !=
                                                                              typeof d.runAfterInterfacing)
                                                                          ) {
                                                                            a.next = 9;
                                                                            break;
                                                                          }
                                                                          return (
                                                                            (a.next = 9),
                                                                            d.runAfterInterfacing()
                                                                          );
                                                                        case 9:
                                                                          _WalletInterface[
                                                                            "default"
                                                                          ].bindBasics(
                                                                            holderFns.get()
                                                                          ),
                                                                            (g =
                                                                              !0),
                                                                            e(
                                                                              !0
                                                                            );
                                                                        case 12:
                                                                        case "end":
                                                                          return a.stop();
                                                                      }
                                                                  },
                                                                  a
                                                                );
                                                              })
                                                            );
                                                            return function () {
                                                              return a.apply(
                                                                this,
                                                                arguments
                                                              );
                                                            };
                                                          })()
                                                        )
                                                        ["catch"](function () {
                                                          return !1;
                                                        }),
                                                      new Promise(function (a) {
                                                        return setTimeout(
                                                          function () {
                                                            return a(!1);
                                                          },
                                                          5e3
                                                        );
                                                      }),
                                                    ])
                                                  );
                                                }),
                                                (k = 0);
                                            case 8:
                                              if (!(k < f.length)) {
                                                a.next = 15;
                                                break;
                                              }
                                              if (
                                                ((l = j(k)),
                                                "object" !==
                                                  (0, _typeof2["default"])(l))
                                              ) {
                                                a.next = 12;
                                                break;
                                              }
                                              return a.abrupt("return", l.v);
                                            case 12:
                                              k++, (a.next = 8);
                                              break;
                                            case 15:
                                              return (
                                                (a.next = 17), Promise.all(h)
                                              );
                                            case 17:
                                              e(!1);
                                            case 18:
                                            case "end":
                                              return a.stop();
                                          }
                                      },
                                      a
                                    );
                                  }
                                )
                              );
                              return function () {
                                return a.apply(this, arguments);
                              };
                            })()
                          )
                        );
                      case 1:
                      case "end":
                        return a.stop();
                    }
                }, a);
              })
            );
            return function connect() {
              return a.apply(this, arguments);
            };
          })(),
        },
      ]),
      a
    );
  })(),
  Holder = /*#__PURE__*/ (function () {
    function a(b) {
      (0, _classCallCheck2["default"])(this, a), (this.scatter = b);
    }
    return (
      (0, _createClass2["default"])(a, [
        {
          key: "plugins",
          value: function plugins() {
            var a = this;
            if (!this.scatter.isExtension) {
              for (var b = arguments.length, c = Array(b), d = 0; d < b; d++)
                c[d] = arguments[d];
              c.map(function (b) {
                return a.scatter.loadPlugin(b);
              });
            }
          },
        },
        {
          key: "connect",
          value: function connect() {
            var a;
            return (a = this.scatter).connect.apply(a, arguments);
          },
        },
        { key: "catchAll", value: function catchAll() {} },
      ]),
      a
    );
  })(),
  holder = new Proxy(new Holder(new Index()), {
    get: function get(a, b) {
      return "undefined" == typeof a[b] ? a.scatter[b] : a[b];
    },
  });
(holderFns.set = function (a) {
  return (holder.scatter = a);
}),
  (holderFns.get = function () {
    return holder.scatter;
  }),
  "undefined" != typeof window && (window.ScatterJS = holder),
  (holder.Plugin = _Plugin["default"]),
  (holder.PluginTypes = PluginTypes),
  (holder.Blockchains = _Blockchains.Blockchains),
  (holder.Network = _Network["default"]),
  (holder.Token = _Token["default"]),
  (holder.SocketService = _SocketService["default"]),
  (holder.EVENTS = EVENTS),
  (holder.WalletInterface = _WalletInterface["default"]),
  (holder.WALLET_METHODS = _WalletInterface.WALLET_METHODS);
var _default = holder;
exports["default"] = _default;
