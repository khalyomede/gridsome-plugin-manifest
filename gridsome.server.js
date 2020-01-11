"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var fs_1 = require("fs");

var isHexcolor = require("is-hexcolor");

var mime = require("mime-types");

var mkdirp_1 = require("mkdirp");

var path_1 = require("path");

var rename = require("rename");

var sharp = require("sharp");

var GridsomePluginManifest = function () {
  function GridsomePluginManifest(api, options) {
    var _this = this;

    this._options = options;
    api.beforeBuild(function () {
      return __awaiter(_this, void 0, void 0, function () {
        var iconFileName, iconFileName512, iconFileName192, iconFileName144, iconFileName96, iconFileName72, iconFileName48, mimeType;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              console.time("gridsome-plugin-manifest");

              try {
                this._checkOptions();
              } catch (exception) {
                if (exception instanceof TypeError) {
                  console.error(GridsomePluginManifest.pluginName + ": " + exception.message);
                  console.timeEnd(GridsomePluginManifest.pluginName);
                } else {
                  throw exception;
                }

                return [2];
              }

              if (!fs_1.existsSync("./static/assets/img")) {
                mkdirp_1.sync("./static/assets/img");
              }

              iconFileName = path_1.basename(options.icon_path);
              iconFileName512 = rename(iconFileName, {
                suffix: "-512"
              }).toString();
              iconFileName192 = rename(iconFileName, {
                suffix: "-192"
              }).toString();
              iconFileName144 = rename(iconFileName, {
                suffix: "-144"
              }).toString();
              iconFileName96 = rename(iconFileName, {
                suffix: "-96"
              }).toString();
              iconFileName72 = rename(iconFileName, {
                suffix: "-72"
              }).toString();
              iconFileName48 = rename(iconFileName, {
                suffix: "-48"
              }).toString();
              return [4, Promise.all([sharp(options.icon_path).resize(512).toFile("./static/assets/img/" + iconFileName512), sharp(options.icon_path).resize(192).toFile("./static/assets/img/" + iconFileName192), sharp(options.icon_path).resize(144).toFile("./static/assets/img/" + iconFileName144), sharp(options.icon_path).resize(96).toFile("./static/assets/img/" + iconFileName96), sharp(options.icon_path).resize(72).toFile("./static/assets/img/" + iconFileName72), sharp(options.icon_path).resize(48).toFile("./static/assets/img/" + iconFileName48)])];

            case 1:
              _a.sent();

              if (!fs_1.existsSync("./static")) {
                mkdirp_1.sync("./static");
              }

              mimeType = mime.lookup(options.icon_path);
              mimeType = mimeType === false ? "image/png" : mimeType;
              options.icons = [{
                src: "/assets/img/" + iconFileName512,
                type: mimeType,
                sizes: "512x512"
              }, {
                src: "/assets/img/" + iconFileName192,
                type: mimeType,
                sizes: "192x192"
              }, {
                src: "/assets/img/" + iconFileName144,
                type: mimeType,
                sizes: "144x144"
              }, {
                src: "/assets/img/" + iconFileName96,
                type: mimeType,
                sizes: "96x96"
              }, {
                src: "/assets/img/" + iconFileName72,
                type: mimeType,
                sizes: "72x72"
              }, {
                src: "/assets/img/" + iconFileName48,
                type: mimeType,
                sizes: "48x48"
              }];
              fs_1.writeFileSync("./static/" + options.file_name, JSON.stringify(options, undefined, 4));
              console.timeEnd("gridsome-plugin-manifest");
              return [2];
          }
        });
      });
    });
  }

  GridsomePluginManifest.defaultOptions = function () {
    return {
      display: "minimal-ui",
      file_name: "manifest.json",
      orientation: "any",
      scope: "/",
      start_url: "/",
      dir: "auto",
      prefer_related_applications: false,
      related_applications: []
    };
  };

  GridsomePluginManifest.prototype._checkOptions = function () {
    this._checkBackgroundColorOption();

    this._checkDisplayOption();

    this._checkIconPathOption();

    this._checkNameOption();

    this._checkFileNameOption();

    this._checkOrientationOption();

    this._checkScopeOption();

    this._checkShortNameOption();

    this._checkStartUrlOption();

    this._checkThemeColorOption();

    this._checkDirOption();

    this._checkLangOption();

    this._checkPreferRelatedApplicationsOption();

    this._checkRelatedApplicationsOption();
  };

  GridsomePluginManifest.prototype._throwIfOptionMissing = function (optionName) {
    if (!(optionName in this._options)) {
      throw new TypeError("\"" + optionName + "\" must be present");
    }
  };

  GridsomePluginManifest.prototype._throwIfOptionNotString = function (optionName) {
    if (typeof this._options[optionName] !== "string") {
      throw new TypeError("\"" + optionName + "\" must be a string");
    }
  };

  GridsomePluginManifest.prototype._throwIfOptionNotFilledString = function (optionName) {
    if (this._options[optionName].length === 0) {
      throw new TypeError("\"" + optionName + "\" must be filled");
    }
  };

  GridsomePluginManifest.prototype._throwIfOptionNotOneOf = function (optionName, allowedValues) {
    if (!allowedValues.includes(this._options[optionName])) {
      throw new TypeError("\"" + optionName + "\" must be one of [" + allowedValues.toString() + "]");
    }
  };

  GridsomePluginManifest.prototype._throwIfOptionNotAbsolutePath = function (optionName) {
    if (!path_1.isAbsolute(this._options[optionName])) {
      throw new TypeError("\"" + optionName + "\" must be an absolute path");
    }
  };

  GridsomePluginManifest.prototype._throwIfOptionNotHexColor = function (optionName) {
    if (!isHexcolor(this._options[optionName])) {
      throw new TypeError("\"" + optionName + "\" must be a valid hexadecimal color");
    }
  };

  GridsomePluginManifest.prototype._checkBackgroundColorOption = function () {
    var optionName = "background_color";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotHexColor(optionName);
  };

  GridsomePluginManifest.prototype._checkDisplayOption = function () {
    var optionName = "display";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotOneOf(optionName, ["standalone", "minimal-ui", "fullscreen"]);
  };

  GridsomePluginManifest.prototype._checkIconPathOption = function () {
    var optionName = "icon_path";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    if (this._options.icon_path !== undefined && !fs_1.existsSync(this._options.icon_path)) {
      throw new TypeError("\"" + optionName + "\" must target an existing file");
    }
  };

  GridsomePluginManifest.prototype._checkNameOption = function () {
    var optionName = "name";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);
  };

  GridsomePluginManifest.prototype._checkFileNameOption = function () {
    var optionName = "file_name";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);
  };

  GridsomePluginManifest.prototype._checkOrientationOption = function () {
    var optionName = "orientation";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotOneOf(optionName, ["any", "natural", "landscape", "landscape - primary", "landscape - secondary", "portrait", "portrait - primary", "portrait - secondary"]);
  };

  GridsomePluginManifest.prototype._checkScopeOption = function () {
    var optionName = "scope";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotAbsolutePath(optionName);
  };

  GridsomePluginManifest.prototype._checkShortNameOption = function () {
    var optionName = "short_name";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);
  };

  GridsomePluginManifest.prototype._checkStartUrlOption = function () {
    var optionName = "start_url";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotAbsolutePath(optionName);
  };

  GridsomePluginManifest.prototype._checkThemeColorOption = function () {
    var optionName = "theme_color";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotHexColor(optionName);
  };

  GridsomePluginManifest.prototype._checkDirOption = function () {
    var optionName = "dir";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);

    this._throwIfOptionNotOneOf(optionName, ["ltr", "rtl", "auto"]);
  };

  GridsomePluginManifest.prototype._checkLangOption = function () {
    var optionName = "lang";

    this._throwIfOptionMissing(optionName);

    this._throwIfOptionNotString(optionName);

    this._throwIfOptionNotFilledString(optionName);
  };

  GridsomePluginManifest.prototype._checkPreferRelatedApplicationsOption = function () {
    var optionName = "prefer_related_applications";

    this._throwIfOptionMissing(optionName);

    if (typeof this._options.prefer_related_applications !== "boolean") {
      throw new TypeError("\"" + optionName + "\" must be a boolean");
    }
  };

  GridsomePluginManifest.prototype._checkRelatedApplicationsOption = function () {
    var optionName = "related_applications";

    this._throwIfOptionMissing(optionName);

    if (!Array.isArray(this._options.related_applications)) {
      throw new TypeError("\"" + optionName + "\" must be an array");
    }

    var numberOfRelatedApplications = this._options.related_applications.length;

    for (var index = 0; index < numberOfRelatedApplications; index++) {
      var relatedApplication = this._options.related_applications[index];

      if (!(relatedApplication instanceof Object)) {
        throw new TypeError("\"" + optionName + "[" + index + "]\" must be an object");
      }

      if (!("platform" in relatedApplication)) {
        throw new TypeError("\"" + optionName + "[" + index + "].platform\" must be present");
      }

      if (!("url" in relatedApplication)) {
        throw new TypeError("\"" + optionName + "[" + index + "].url\" must be present");
      }

      if (typeof relatedApplication.platform !== "string") {
        throw new TypeError("\"" + optionName + "[" + index + "].platform\" must be a string");
      }

      if (typeof relatedApplication.url !== "string") {
        throw new TypeError("\"" + optionName + "[" + index + "].url\" must be a string");
      }

      if ("id" in relatedApplication && typeof relatedApplication.id !== "string") {
        throw new TypeError("\"" + optionName + "[" + index + "].id\" must be a string");
      }

      if (relatedApplication.platform.length === 0) {
        throw new TypeError("\"" + optionName + "[" + index + "].platform\" must be filled");
      }

      if (relatedApplication.url.length === 0) {
        throw new TypeError("\"" + optionName + "[" + index + "].url\" must be filled");
      }

      if ("id" in relatedApplication && typeof relatedApplication.id === "string" && relatedApplication.id.length === 0) {
        throw new TypeError("\"" + optionName + "[" + index + "].id\" must be filled");
      }
    }
  };

  GridsomePluginManifest.pluginName = "gridsome-plugin-manifest";
  return GridsomePluginManifest;
}();

module.exports = GridsomePluginManifest;