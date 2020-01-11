import "mocha-sinon";
import { expect } from "chai";
import gridsomeServer from "../gridsome.server";
import { existsSync } from "fs";
import { execSync } from "child_process";

const api = {
	beforeBuild: callable => callable(),
};

beforeEach(function() {
	this.sinon.stub(console, "error");
	this.sinon.stub(console, "log");
});

const sleep = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

describe("server", () => {
	describe("general", () => {
		it("should export a function", () =>
			expect(gridsomeServer).to.be.instanceOf(Function));
	});

	describe("defaultOptions", () => {
		it("should return default options", () =>
			expect(gridsomeServer.defaultOptions()).to.be.deep.equal({
				display: "minimal-ui",
				file_name: "manifest.json",
				orientation: "any",
				scope: "/",
				start_url: "/",
				dir: "auto",
				prefer_related_applications: false,
				related_applications: [],
			}));
	});

	describe("constructor", () => {
		describe("options", () => {
			describe("background_color", () => {
				it("should print an error if background_color option is not a string", () => {
					new gridsomeServer(api, {
						background_color: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "background_color" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if background_color option is empty", () => {
					new gridsomeServer(api, {
						background_color: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "background_color" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if background_color option is not a valid hexadecimal color", () => {
					new gridsomeServer(api, {
						background_color: "red",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "background_color" must be a valid hexadecimal color`
						)
					).to.be.true;
				});

				it("should not print an error if background_color option is a valid hex color string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "background_color" must be a valid hexadecimal color`
						)
					).to.be.false;
				});
			});

			describe("display", () => {
				it("should print an error if display option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "display" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if display option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "display" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if display option is not one of the allowed string values", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "browser",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "display" must be one of [standalone,minimal-ui,fullscreen]`
						)
					).to.be.true;
				});

				it("should not print an error if display option is a valid value", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "display" must be one of [standalone,minimal-ui,fullscreen]`
						)
					).to.be.false;
				});
			});

			describe("icon_path", () => {
				it("should print an error if icon_path option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "icon_path" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if icon_path option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "icon_path" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if icon_path option targets a non existing file", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `./src/assets/img/icon.png`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: false,
						related_applications: [],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "icon_path" must target an existing file`
						)
					).to.be.true;
				});

				it("should not print an error if icon_path option is a valid file path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "icon_path" must target an existing file`
						)
					).to.be.false;
				});
			});

			describe("name", () => {
				it("should print an error if name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "name" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "name" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if name option is a filled string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "name" must be a string`
						)
					).to.be.false;
				});
			});

			describe("file_name", () => {
				it("should print an error if file_name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "file_name" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if file_name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "file_name" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if file_name option is a valid file name", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "file_name" must be a string`
						)
					).to.be.false;
				});
			});

			describe("orientation", () => {
				it("should print an error if orientation option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "orientation" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if orientation option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "orientation" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if orientation option is one of the allowed string value", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "orientation" must be one of [any,natural,landscape,landscape-primary,landscape-secondary,portrait,portrait-primary,portrait-secondary]`
						)
					).to.be.false;
				});
			});

			describe("scope", () => {
				it("should print an error if scope option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "scope" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if scope option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "scope" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if scope option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "./",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "scope" must be an absolute path`
						)
					).to.be.true;
				});

				it("should not print an error if scope option is a valid absolute path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "scope" must be an absolute path`
						)
					).to.be.false;
				});
			});

			describe("short_name", () => {
				it("should print an error if short_name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "short_name" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if short_name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "short_name" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if short_name option is a filled string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "short_name" must be a string`
						)
					).to.be.false;
				});
			});

			describe("start_url", () => {
				it("should print an error if start_url option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "start_url" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if start_url option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "start_url" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if start_url option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "./",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "start_url" must be an absolute path`
						)
					).to.be.true;
				});

				it("should not print an error if start_url option is a valid absolute path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "start_url" must be an absolute path`
						)
					).to.be.false;
				});
			});

			describe("theme_color", () => {
				it("should print an error if theme_color option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "theme_color" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if theme_color option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "theme_color" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if theme_color option is not a valid hexadecimal color", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "red",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "theme_color" must be a valid hexadecimal color`
						)
					).to.be.true;
				});

				it("should not print an error if theme_color option is a valid hex color string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "theme_color" must be a valid hexadecimal color`
						)
					).to.be.false;
				});
			});

			describe("dir", () => {
				it("should print an error if dir option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "dir" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if dir option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "dir" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if dir option is one of the allowed string value", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "dir" must be one of [ltr,rtl,auto]`
						)
					).to.be.false;
				});
			});

			describe("lang", () => {
				it("should print an error if lang option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "lang" must be a string`
						)
					).to.be.true;
				});

				it("should print an error if lang option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "lang" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if lang option is a valid ISO 2 string lang", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "#000000",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "lang" must be a string`
						)
					).to.be.false;
				});
			});

			describe("prefer_related_applications", () => {
				it("should print an error if prefer_related_applications option is not a boolean", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "prefer_related_applications" must be a boolean`
						)
					).to.be.true;
				});

				it("should not print an error if prefer_related_applications option is a valid boolean", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "prefer_related_applications" must be a boolean`
						)
					).to.be.false;
				});
			});

			describe("related_applications", () => {
				it("should print an error if related_applications option is not an array", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications" must be an array`
						)
					).to.be.true;
				});

				it("should print an error if related_applications option is an array of non objects", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [42],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0]" must be an object`
						)
					).to.be.true;
				});

				it("should print an error if related_applications option is an array of related applications missing the platform key", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [
							{
								url:
									"https://play.google.com/store/apps/details?id=com.example.app1",
							},
						],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0].platform" must be present`
						)
					).to.be.true;
				});

				it("should print an error if related_applications option is an array of related applications missing the url key", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [
							{
								platform: "play",
							},
						],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0].url" must be present`
						)
					).to.be.true;
				});

				it("should print an error if related_applications option is an array of related applications with an empty platform key", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [
							{
								platform: "",
								url:
									"https://play.google.com/store/apps/details?id=com.example.app1",
							},
						],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0].platform" must be filled`
						)
					).to.be.true;
				});

				it("should print an error if related_applications option is an array of related applications with an empty url key", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [
							{
								platform: "play",
								url: "",
							},
						],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0].url" must be filled`
						)
					).to.be.true;
				});

				it("should not print an error if related_applications option is an empty array", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications" must be an array'
							)}`
						)
					).to.be.false;
				});

				it("should not print an error if related_applications option is an array of a single related application missing the id key", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: `${__dirname}/misc/logo.svg`,
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
						theme_color: "#000000",
						dir: "ltr",
						lang: "en",
						prefer_related_applications: true,
						related_applications: [
							{
								platform: "play",
								url:
									"https://play.google.com/store/apps/details?id=com.example.app1",
							},
						],
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: "related_applications[0].id" is required`
						)
					).to.be.false;
				});
			});
		});

		describe("behavior", () => {
			it("should create the folders static/assets/img if they do not exists", async () => {
				await sleep(200);

				new gridsomeServer(api, {
					background_color: "#FFFFFF",
					display: "standalone",
					icon_path: `${__dirname}/misc/logo.svg`,
					name: "Gridsome",
					file_name: "manifest.json",
					orientation: "portrait",
					scope: "/",
					short_name: "GRID",
					start_url: "/",
					theme_color: "#000000",
					dir: "ltr",
					lang: "en",
					prefer_related_applications: true,
					related_applications: [
						{
							platform: "play",
							url:
								"https://play.google.com/store/apps/details?id=com.example.app1",
							id: "com.example.app1",
						},
					],
				});

				expect(existsSync("./static")).to.be.true;
				expect(existsSync("./static/assets")).to.be.true;
				expect(existsSync("./static/assets/img")).to.be.true;

				await sleep(200);

				if (existsSync("./static")) {
					execSync("rm -rf ./static");
				}
			});
		});
	});
});
