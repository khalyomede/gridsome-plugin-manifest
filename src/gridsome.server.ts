import { existsSync, writeFileSync } from "fs";
import * as mime from "mime-types";
import { sync } from "mkdirp";
import { basename, isAbsolute } from "path";
import * as rename from "rename";
import * as sharp from "sharp";
import IOptions from "./IOptions";
import IPluginAPI from "./IPluginAPI";

class GridsomePluginManifest {
	static readonly pluginName = "gridsome-plugin-manifest";

	private readonly _options: IOptions;

	public constructor(api: IPluginAPI, options: IOptions) {
		this._options = options;

		api.beforeBuild(async () => {
			/* tslint:disable:no-console */
			console.time("gridsome-plugin-manifest");
			/* tslint:enable:no-console */

			try {
				this._checkOptions();
			} catch (exception) {
				if (exception instanceof TypeError) {
					/* tslint:disable:no-console */
					console.error(
						`${GridsomePluginManifest.pluginName}: ${exception.message}`
					);
					console.timeEnd(GridsomePluginManifest.pluginName);
					/* tslint:enable:no-console */
				} else {
					throw exception;
				}

				return;
			}

			if (!existsSync("./static/assets/img")) {
				sync("./static/assets/img");
			}

			const iconFileName = basename(options.icon_path);

			const iconFileName512 = rename(iconFileName, {
				suffix: "-512",
			}).toString();
			const iconFileName192 = rename(iconFileName, {
				suffix: "-192",
			}).toString();
			const iconFileName144 = rename(iconFileName, {
				suffix: "-144",
			}).toString();
			const iconFileName96 = rename(iconFileName, {
				suffix: "-96",
			}).toString();
			const iconFileName72 = rename(iconFileName, {
				suffix: "-72",
			}).toString();
			const iconFileName48 = rename(iconFileName, {
				suffix: "-48",
			}).toString();

			await Promise.all([
				sharp(options.icon_path)
					.resize(512)
					.toFile(`./static/assets/img/${iconFileName512}`),
				sharp(options.icon_path)
					.resize(192)
					.toFile(`./static/assets/img/${iconFileName192}`),
				sharp(options.icon_path)
					.resize(144)
					.toFile(`./static/assets/img/${iconFileName144}`),
				sharp(options.icon_path)
					.resize(96)
					.toFile(`./static/assets/img/${iconFileName96}`),
				sharp(options.icon_path)
					.resize(72)
					.toFile(`./static/assets/img/${iconFileName72}`),
				sharp(options.icon_path)
					.resize(48)
					.toFile(`./static/assets/img/${iconFileName48}`),
			]);

			if (!existsSync("./static")) {
				sync("./static");
			}

			let mimeType = mime.lookup(options.icon_path);

			mimeType = mimeType === false ? "image/png" : mimeType;

			options.icons = [
				{
					src: `/assets/img/${iconFileName512}`,
					type: mimeType,
					sizes: "512x512",
				},
				{
					src: `/assets/img/${iconFileName192}`,
					type: mimeType,
					sizes: "192x192",
				},
				{
					src: `/assets/img/${iconFileName144}`,
					type: mimeType,
					sizes: "144x144",
				},
				{
					src: `/assets/img/${iconFileName96}`,
					type: mimeType,
					sizes: "96x96",
				},
				{
					src: `/assets/img/${iconFileName72}`,
					type: mimeType,
					sizes: "72x72",
				},
				{
					src: `/assets/img/${iconFileName48}`,
					type: mimeType,
					sizes: "48x48",
				},
			];

			writeFileSync(
				`./static/${options.file_name}`,
				JSON.stringify(options, undefined, 4)
			);

			/* tslint:disable:no-console */
			console.timeEnd("gridsome-plugin-manifest");
			/* tslint:enable:no-console */
		});
	}

	public static defaultOptions(): IOptions {
		return {
			display: "minimal-ui",
			file_name: "manifest.json",
			orientation: "any",
			scope: "/",
			start_url: "/",
			dir: "auto",
			prefer_related_applications: false,
			related_applications: [],
		};
	}

	private _checkOptions(): void {
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
	}

	private _throwIfOptionMissing(optionName: string): void {
		if (!(optionName in this._options)) {
			throw new TypeError(`"${optionName}" must be present`);
		}
	}

	private _throwIfOptionNotString(optionName: string): void {
		if (typeof this._options[optionName] !== "string") {
			throw new TypeError(`"${optionName}" must be a string`);
		}
	}

	private _throwIfOptionNotFilledString(optionName: string): void {
		if (this._options[optionName].length === 0) {
			throw new TypeError(`"${optionName}" must be filled`);
		}
	}

	private _throwIfOptionNotOneOf(
		optionName: string,
		allowedValues: Array<string>
	): void {
		if (!allowedValues.includes(this._options[optionName])) {
			throw new TypeError(
				`"${optionName}" must be one of [${allowedValues.toString()}]`
			);
		}
	}

	private _throwIfOptionNotAbsolutePath(optionName: string): void {
		if (!isAbsolute(this._options[optionName])) {
			throw new TypeError(`"${optionName}" must be an absolute path`);
		}
	}

	private _checkBackgroundColorOption(): void {
		const optionName = "background_color";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);

		/**
		 * @todo check if value if a valid hex color
		 */
	}

	private _checkDisplayOption(): void {
		const optionName = "display";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
		this._throwIfOptionNotOneOf(optionName, [
			"standalone",
			"minimal-ui",
			"fullscreen",
		]);
	}

	private _checkIconPathOption(): void {
		const optionName = "icon_path";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);

		if (
			this._options.icon_path !== undefined &&
			!existsSync(this._options.icon_path)
		) {
			throw new TypeError(`"${optionName}" must target an existing file`);
		}
	}

	private _checkNameOption(): void {
		const optionName = "name";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
	}

	private _checkFileNameOption(): void {
		const optionName = "file_name";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
	}

	private _checkOrientationOption(): void {
		const optionName = "orientation";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
		this._throwIfOptionNotOneOf(optionName, [
			"any",
			"natural",
			"landscape",
			"landscape - primary",
			"landscape - secondary",
			"portrait",
			"portrait - primary",
			"portrait - secondary",
		]);
	}

	private _checkScopeOption(): void {
		const optionName = "scope";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
		this._throwIfOptionNotAbsolutePath(optionName);
	}

	private _checkShortNameOption(): void {
		const optionName = "short_name";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
	}

	private _checkStartUrlOption(): void {
		const optionName = "start_url";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
		this._throwIfOptionNotAbsolutePath(optionName);
	}

	private _checkThemeColorOption(): void {
		const optionName = "theme_color";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);

		/**
		 * @todo check if value is a valid hex color
		 */
	}

	private _checkDirOption(): void {
		const optionName = "dir";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);
		this._throwIfOptionNotOneOf(optionName, ["ltr", "rtl", "auto"]);
	}

	private _checkLangOption(): void {
		const optionName = "lang";

		this._throwIfOptionMissing(optionName);
		this._throwIfOptionNotString(optionName);
		this._throwIfOptionNotFilledString(optionName);

		/**
		 * @todo check if value is a valid ISO 2 lang
		 */
	}

	private _checkPreferRelatedApplicationsOption(): void {
		const optionName = "prefer_related_applications";

		this._throwIfOptionMissing(optionName);

		if (typeof this._options.prefer_related_applications !== "boolean") {
			throw new TypeError(`"${optionName}" must be a boolean`);
		}
	}

	private _checkRelatedApplicationsOption(): void {
		const optionName = "related_applications";

		this._throwIfOptionMissing(optionName);

		if (!Array.isArray(this._options.related_applications)) {
			throw new TypeError(`"${optionName}" must be an array`);
		}

		const numberOfRelatedApplications = this._options.related_applications
			.length;

		for (let index = 0; index < numberOfRelatedApplications; index++) {
			const relatedApplication = this._options.related_applications[
				index
			];

			if (!(relatedApplication instanceof Object)) {
				throw new TypeError(
					`"${optionName}[${index}]" must be an object`
				);
			}

			if (!("platform" in relatedApplication)) {
				throw new TypeError(
					`"${optionName}[${index}].platform" must be present`
				);
			}

			if (!("url" in relatedApplication)) {
				throw new TypeError(
					`"${optionName}[${index}].url" must be present`
				);
			}

			if (typeof relatedApplication.platform !== "string") {
				throw new TypeError(
					`"${optionName}[${index}].platform" must be a string`
				);
			}

			if (typeof relatedApplication.url !== "string") {
				throw new TypeError(
					`"${optionName}[${index}].url" must be a string`
				);
			}

			if (
				"id" in relatedApplication &&
				typeof relatedApplication.id !== "string"
			) {
				throw new TypeError(
					`"${optionName}[${index}].id" must be a string`
				);
			}

			if (relatedApplication.platform.length === 0) {
				throw new TypeError(
					`"${optionName}[${index}].platform" must be filled`
				);
			}

			if (relatedApplication.url.length === 0) {
				throw new TypeError(
					`"${optionName}[${index}].url" must be filled`
				);
			}

			if (
				"id" in relatedApplication &&
				typeof relatedApplication.id === "string" &&
				relatedApplication.id.length === 0
			) {
				throw new TypeError(
					`"${optionName}[${index}].id" must be filled`
				);
			}
		}
	}
}

export = GridsomePluginManifest;
