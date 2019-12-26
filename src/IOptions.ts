import IIcon from "./IIcon";

interface IOptions {
	name?: string;
	shortName?: string;
	themeColor?: string;
	backgroundColor?: string;
	display: "standalone" | "minimal-ui" | "fullscreen";
	scope: string;
	orientation:
		| "any"
		| "natural"
		| "landscape"
		| "landscape-primary"
		| "landscape-secondary"
		| "portrait"
		| "portrait-primary"
		| "portrait-secondary";
	startUrl: string;
	fileName: string;
	iconPath?: string;
	icons?: Array<IIcon>;
}

export default IOptions;
