// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/lrm/lrm-graphhopper-1.2.0.js":[function(require,module,exports) {
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    function corslite(url, callback, cors) {
      var sent = false;

      if (typeof window.XMLHttpRequest === "undefined") {
        return callback(Error("Browser not supported"));
      }

      if (typeof cors === "undefined") {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && m[0] !== location.protocol + "//" + location.domain + (location.port ? ":" + location.port : "");
      }

      var x = new window.XMLHttpRequest();

      function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
      }

      if (cors && !("withCredentials" in x)) {
        // IE8-9
        x = new window.XDomainRequest(); // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472

        var original = callback;

        callback = function callback() {
          if (sent) {
            original.apply(this, arguments);
          } else {
            var that = this,
                args = arguments;
            setTimeout(function () {
              original.apply(that, args);
            }, 0);
          }
        };
      }

      function loaded() {
        if ( // XDomainRequest
        x.status === undefined || // modern browsers
        isSuccessful(x.status)) callback.call(x, null, x);else callback.call(x, x, null);
      } // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
      // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).


      if ("onload" in x) {
        x.onload = loaded;
      } else {
        x.onreadystatechange = function readystate() {
          if (x.readyState === 4) {
            loaded();
          }
        };
      } // Call the callback with the XMLHttpRequest object as an error and prevent
      // it from ever being called again by reassigning it to `noop`


      x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);

        callback = function callback() {};
      }; // IE9 must have onprogress be set to a unique function.


      x.onprogress = function () {};

      x.ontimeout = function (evt) {
        callback.call(this, evt, null);

        callback = function callback() {};
      };

      x.onabort = function (evt) {
        callback.call(this, evt, null);

        callback = function callback() {};
      }; // GET is the only supported HTTP Verb by XDomainRequest and is the
      // only one supported here.


      x.open("GET", url, true); // Send the request. Sending data is not supported.

      x.send(null);
      sent = true;
      return x;
    }

    if (typeof module !== "undefined") module.exports = corslite;
  }, {}],
  2: [function (require, module, exports) {
    var polyline = {}; // Based off of [the offical Google document](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
    //
    // Some parts from [this implementation](http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/PolylineEncoder.js)
    // by [Mark McClure](http://facstaff.unca.edu/mcmcclur/)

    function encode(coordinate, factor) {
      coordinate = Math.round(coordinate * factor);
      coordinate <<= 1;

      if (coordinate < 0) {
        coordinate = ~coordinate;
      }

      var output = "";

      while (coordinate >= 0x20) {
        output += String.fromCharCode((0x20 | coordinate & 0x1f) + 63);
        coordinate >>= 5;
      }

      output += String.fromCharCode(coordinate + 63);
      return output;
    } // This is adapted from the implementation in Project-OSRM
    // https://github.com/DennisOSRM/Project-OSRM-Web/blob/master/WebContent/routing/OSRM.RoutingGeometry.js


    polyline.decode = function (str, precision) {
      var index = 0,
          lat = 0,
          lng = 0,
          coordinates = [],
          shift = 0,
          result = 0,
          byte = null,
          latitude_change,
          longitude_change,
          factor = Math.pow(10, precision || 5); // Coordinates have variable length when encoded, so just keep
      // track of whether we've hit the end of the string. In each
      // loop iteration, a single coordinate is decoded.

      while (index < str.length) {
        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);

        latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
        shift = result = 0;

        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);

        longitude_change = result & 1 ? ~(result >> 1) : result >> 1;
        lat += latitude_change;
        lng += longitude_change;
        coordinates.push([lat / factor, lng / factor]);
      }

      return coordinates;
    };

    polyline.encode = function (coordinates, precision) {
      if (!coordinates.length) return "";
      var factor = Math.pow(10, precision || 5),
          output = encode(coordinates[0][0], factor) + encode(coordinates[0][1], factor);

      for (var i = 1; i < coordinates.length; i++) {
        var a = coordinates[i],
            b = coordinates[i - 1];
        output += encode(a[0] - b[0], factor);
        output += encode(a[1] - b[1], factor);
      }

      return output;
    };

    if (_typeof(module) !== undefined) module.exports = polyline;
  }, {}],
  3: [function (require, module, exports) {
    (function (global) {
      (function () {
        "use strict";

        var L = typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null;

        var corslite = require("corslite");

        var polyline = require("polyline");

        L.Routing = L.Routing || {};
        L.Routing.GraphHopper = L.Evented.extend({
          options: {
            serviceUrl: "https://graphhopper.com/api/1/route",
            timeout: 30 * 1000,
            urlParameters: {}
          },
          initialize: function initialize(apiKey, options) {
            this._apiKey = apiKey;
            L.Util.setOptions(this, options);
          },
          route: function route(waypoints, callback, context, options) {
            var timedOut = false,
                wps = [],
                url,
                timer,
                wp,
                i;
            options = options || {};
            url = this.buildRouteUrl(waypoints, options);
            timer = setTimeout(function () {
              timedOut = true;
              callback.call(context || callback, {
                status: -1,
                message: "GraphHopper request timed out."
              });
            }, this.options.timeout); // Create a copy of the waypoints, since they
            // might otherwise be asynchronously modified while
            // the request is being processed.

            for (i = 0; i < waypoints.length; i++) {
              wp = waypoints[i];
              wps.push({
                latLng: wp.latLng,
                name: wp.name,
                options: wp.options
              });
            }

            corslite(url, L.bind(function (err, resp) {
              var data;
              clearTimeout(timer);

              if (!timedOut) {
                var fired = err ? err : resp;
                this.fire("response", {
                  status: fired.status,
                  limit: Number(fired.getResponseHeader("X-RateLimit-Limit")),
                  remaining: Number(fired.getResponseHeader("X-RateLimit-Remaining")),
                  reset: Number(fired.getResponseHeader("X-RateLimit-Reset")),
                  credits: Number(fired.getResponseHeader("X-RateLimit-Credits"))
                });

                if (!err) {
                  data = JSON.parse(resp.responseText);

                  this._routeDone(data, wps, callback, context);
                } else {
                  var finalResponse;
                  var responseText = err && err.responseText;

                  try {
                    finalResponse = JSON.parse(responseText);
                  } catch (e) {
                    finalResponse = responseText;
                  }

                  callback.call(context || callback, {
                    status: -1,
                    message: "HTTP request failed: " + err,
                    response: finalResponse
                  });
                }
              }
            }, this));
            return this;
          },
          _routeDone: function _routeDone(response, inputWaypoints, callback, context) {
            var alts = [],
                mappedWaypoints,
                coordinates,
                i,
                path;
            context = context || callback;

            if (response.info.errors && response.info.errors.length) {
              callback.call(context, {
                // TODO: include all errors
                status: response.info.errors[0].details,
                message: response.info.errors[0].message
              });
              return;
            }

            for (i = 0; i < response.paths.length; i++) {
              path = response.paths[i];
              coordinates = this._decodePolyline(path.points);
              mappedWaypoints = this._mapWaypointIndices(inputWaypoints, path.instructions, coordinates);
              alts.push({
                name: "",
                coordinates: coordinates,
                instructions: this._convertInstructions(path.instructions),
                summary: {
                  totalDistance: path.distance,
                  totalTime: path.time / 1000,
                  totalAscend: path.ascend
                },
                inputWaypoints: inputWaypoints,
                actualWaypoints: mappedWaypoints.waypoints,
                waypointIndices: mappedWaypoints.waypointIndices
              });
            }

            callback.call(context, null, alts);
          },
          _decodePolyline: function _decodePolyline(geometry) {
            var coords = polyline.decode(geometry, 5),
                latlngs = new Array(coords.length),
                i;

            for (i = 0; i < coords.length; i++) {
              latlngs[i] = new L.LatLng(coords[i][0], coords[i][1]);
            }

            return latlngs;
          },
          _toWaypoints: function _toWaypoints(inputWaypoints, vias) {
            var wps = [],
                i;

            for (i = 0; i < vias.length; i++) {
              wps.push({
                latLng: L.latLng(vias[i]),
                name: inputWaypoints[i].name,
                options: inputWaypoints[i].options
              });
            }

            return wps;
          },
          buildRouteUrl: function buildRouteUrl(waypoints, options) {
            var computeInstructions =
            /* Instructions are always needed, 
            since we do not have waypoint indices otherwise */
            true,
                //!(options && options.geometryOnly),
            locs = [],
                i,
                baseUrl;

            for (i = 0; i < waypoints.length; i++) {
              locs.push("point=" + waypoints[i].latLng.lat + "," + waypoints[i].latLng.lng);
            }

            baseUrl = this.options.serviceUrl + "?" + locs.join("&");
            return baseUrl + L.Util.getParamString(L.extend({
              instructions: computeInstructions,
              type: "json",
              key: this._apiKey
            }, this.options.urlParameters), baseUrl);
          },
          _convertInstructions: function _convertInstructions(instructions) {
            var signToType = {
              "-3": "SharpLeft",
              "-2": "Left",
              "-1": "SlightLeft",
              0: "Straight",
              1: "SlightRight",
              2: "Right",
              3: "SharpRight",
              4: "DestinationReached",
              5: "WaypointReached",
              6: "Roundabout"
            },
                result = [],
                i,
                instr;

            for (i = 0; instructions && i < instructions.length; i++) {
              instr = instructions[i];
              result.push({
                type: signToType[instr.sign],
                text: instr.text,
                distance: instr.distance,
                time: instr.time / 1000,
                index: instr.interval[0],
                exit: instr.exit_number
              });
            }

            return result;
          },
          _mapWaypointIndices: function _mapWaypointIndices(waypoints, instructions, coordinates) {
            var wps = [],
                wpIndices = [],
                i,
                idx;
            wpIndices.push(0);
            wps.push(new L.Routing.Waypoint(coordinates[0], waypoints[0].name));

            for (i = 0; instructions && i < instructions.length; i++) {
              if (instructions[i].sign === 5) {
                // VIA_REACHED
                idx = instructions[i].interval[0];
                wpIndices.push(idx);
                wps.push({
                  latLng: coordinates[idx],
                  name: waypoints[wps.length + 1].name
                });
              }
            }

            wpIndices.push(coordinates.length - 1);
            wps.push({
              latLng: coordinates[coordinates.length - 1],
              name: waypoints[waypoints.length - 1].name
            });
            return {
              waypointIndices: wpIndices,
              waypoints: wps
            };
          }
        });

        L.Routing.graphHopper = function (apiKey, options) {
          return new L.Routing.GraphHopper(apiKey, options);
        };

        module.exports = L.Routing.GraphHopper;
      })();
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {
    corslite: 1,
    polyline: 2
  }]
}, {}, [3]);
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49183" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/lrm/lrm-graphhopper-1.2.0.js"], null)
//# sourceMappingURL=/lrm-graphhopper-1.2.0.eb8fc589.js.map