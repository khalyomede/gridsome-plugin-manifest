import { expect } from "chai";
import gridsomeClient from "../gridsome.client";

describe("client", () => {
	it("should export a function", () =>
		expect(gridsomeClient).to.be.instanceOf(Function));
});
