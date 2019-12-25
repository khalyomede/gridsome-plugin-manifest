import { red } from "cli-color";

const errorLogger = function(message: string): void {
	console.error(`gridsome-plugin-manifest: ${red(message)}`);
};

export default errorLogger;
