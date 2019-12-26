import * as Joi from "@hapi/joi";
import { existsSync, writeFileSync } from "fs";
import * as mime from "mime-types";
import { sync } from "mkdirp";
import { basename } from "path";
import * as rename from "rename";
import * as sharp from "sharp";
import errorLogger from "./error-logger";
import IOptions from "./IOptions";
import IPluginAPI from "./IPluginAPI";

class GridsomePluginManifest {
	public constructor(api: IPluginAPI, options: IOptions) {
		api.beforeBuild(async () => {
			console.time("gridsome-plugin-manifest");

			const { error } = Joi.object({
				backgroundColor: Joi.string().required(),
				display: Joi.string()
					.required()
					.valid("standalone", "minimal-ui", "fullscreen"),
				iconPath: Joi.string().required(),
				name: Joi.string().required(),
				fileName: Joi.string().required(),
				orientation: Joi.string()
					.required()
					.valid(
						"any",
						"natural",
						"landscape",
						"landscape-primary",
						"landscape-secondary",
						"portrait",
						"portrait-primary",
						"portrait-secondary"
					),
				scope: Joi.string().required(),
				shortName: Joi.string().required(),
				startUrl: Joi.string().required(),
				themeColor: Joi.string().required(),
			}).validate(options);

			if (error instanceof Error) {
				errorLogger(error.message);

				console.timeEnd("gridsome-plugin-manifest");

				return;
			}

			if (!existsSync("./static/assets/img")) {
				sync("./static/assets/img");
			}

			const iconFileName =
				options.iconPath !== undefined
					? basename(options.iconPath)
					: "icon.png";

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
				sharp(options.iconPath)
					.resize(512)
					.toFile(`./static/assets/img/${iconFileName512}`),
				sharp(options.iconPath)
					.resize(192)
					.toFile(`./static/assets/img/${iconFileName192}`),
				sharp(options.iconPath)
					.resize(144)
					.toFile(`./static/assets/img/${iconFileName144}`),
				sharp(options.iconPath)
					.resize(96)
					.toFile(`./static/assets/img/${iconFileName96}`),
				sharp(options.iconPath)
					.resize(72)
					.toFile(`./static/assets/img/${iconFileName72}`),
				sharp(options.iconPath)
					.resize(48)
					.toFile(`./static/assets/img/${iconFileName48}`),
			]);

			if (!existsSync("./static")) {
				sync("./static");
			}

			let mimeType = mime.lookup(
				options.iconPath !== undefined ? options.iconPath : "png"
			);

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
				`./static/${options.fileName}`,
				JSON.stringify(options, undefined, 4)
			);

			console.timeEnd("gridsome-plugin-manifest");
		});
	}

	public static defaultOptions(): IOptions {
		return {
			display: "minimal-ui",
			fileName: "manifest.json",
			orientation: "any",
			scope: "/",
			startUrl: "/",
		};
	}
}

export = GridsomePluginManifest;
