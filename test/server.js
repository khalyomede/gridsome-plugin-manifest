import "mocha-sinon";
import { expect } from "chai";
import { red } from "cli-color";
import gridsomeServer from "../gridsome.server";
import { existsSync } from "fs";

const api = {
	beforeBuild: callable => callable(),
};

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
							`gridsome-plugin-manifest: ${red(
								'"background_color" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if background_color option is empty", () => {
					new gridsomeServer(api, {
						background_color: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"background_color" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if background_color option is a valid hex color string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"background_color" must be a string'
							)}`
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
							`gridsome-plugin-manifest: ${red(
								'"display" must be one of [standalone, minimal-ui, fullscreen]'
							)}`
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
							`gridsome-plugin-manifest: ${red(
								'"display" must be one of [standalone, minimal-ui, fullscreen]'
							)}`
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
							`gridsome-plugin-manifest: ${red(
								'"display" must be one of [standalone, minimal-ui, fullscreen]'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if display option is a valid hex color string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"display" must be one of [standalone, minimal-ui, fullscreen]'
							)}`
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
							`gridsome-plugin-manifest: ${red(
								'"icon_path" must be a string'
							)}`
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
							`gridsome-plugin-manifest: ${red(
								'"icon_path" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if icon_path option is a valid file path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"icon_path" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("name", () => {
				it("should print an error if name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"name" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"name" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if name option is a filled string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"name" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("file_name", () => {
				it("should print an error if file_name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"file_name" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if file_name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"file_name" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if file_name option is a valid file name", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"file_name" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("orientation", () => {
				it("should print an error if orientation option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"orientation" must be one of [any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary]'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if orientation option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"orientation" must be one of [any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary]'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if orientation option is one of the allowed string value", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"orientation" must be one of [any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary]'
							)}`
						)
					).to.be.false;
				});
			});

			describe("scope", () => {
				it("should print an error if scope option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"scope" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if scope option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"scope" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if scope option is a valid absolute path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"scope" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("short_name", () => {
				it("should print an error if short_name option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"short_name" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if short_name option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"short_name" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if short_name option is a filled string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"short_name" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("start_url", () => {
				it("should print an error if start_url option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: 42,
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"start_url" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if start_url option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"start_url" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if start_url option is a valid absolute path", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
						name: "Gridsome",
						file_name: "manifest.json",
						orientation: "portrait",
						scope: "/",
						short_name: "GRID",
						start_url: "/",
					});

					expect(
						console.error.calledWith(
							`gridsome-plugin-manifest: ${red(
								'"start_url" must be a string'
							)}`
						)
					).to.be.false;
				});
			});

			describe("theme_color", () => {
				it("should print an error if theme_color option is not a string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
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
							`gridsome-plugin-manifest: ${red(
								'"theme_color" must be a string'
							)}`
						)
					).to.be.true;
				});

				it("should print an error if theme_color option is empty", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
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
							`gridsome-plugin-manifest: ${red(
								'"theme_color" is not allowed to be empty'
							)}`
						)
					).to.be.true;
				});

				it("should not print an error if theme_color option is a valid hex color string", () => {
					new gridsomeServer(api, {
						background_color: "#FFFFFF",
						display: "standalone",
						icon_path: "./src/assets/img/icon.png",
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
							`gridsome-plugin-manifest: ${red(
								'"theme_color" must be a string'
							)}`
						)
					).to.be.false;
				});
			});
		});

		describe("behavior", () => {
			it("should create the folders static/assets/img if they do not exists", () => {
				new gridsomeServer(api, {
					background_color: "#FFFFFF",
					icon_path: "./src/assets/img/icon.png",
					name: "Gridsome",
					short_name: "GRID",
					theme_color: "#000000",
				});

				expect(existsSync("./static")).to.be.true;
				expect(existsSync("./static/assets")).to.be.true;
				expect(existsSync("./static/assets/img")).to.be.true;
			});
		});
	});
});
