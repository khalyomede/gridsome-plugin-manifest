import "mocha-sinon";
import { expect } from "chai";
import errorLogger from "../error-logger";
import { red } from "cli-color";

beforeEach(function() {
	this.sinon.stub(console, "error");
});

describe("error-logger", () => {
	describe("general", () => {
		it("should export a function", () =>
			expect(errorLogger).to.be.an.instanceOf(Function));
	});

	describe("main behavior", () => {
		it("should log the message, and prefix it with gridsome-plugin-manifest", () => {
			const message = "foo";

			errorLogger(message);

			expect(
				console.error.calledWith(
					`gridsome-plugin-manifest: ${red(message)}`
				)
			).to.be.true;
		});
	});
});
