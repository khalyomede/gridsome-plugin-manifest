import { expect } from "chai";
import gridsomeServer from "../gridsome.server";

describe("server", () => {
	describe("general", () => {
		it("should export a function", () =>
			expect(gridsomeServer).to.be.instanceOf(Function));
	});

	describe("defaultOptions", () => {
		it("should return default options", () =>
			expect(gridsomeServer.defaultOptions()).to.be.deep.equal({
				display: "browser",
				fileName: "manifest.json",
				orientation: "any",
				scope: "/",
				startUrl: "/",
			}));
	});
});
