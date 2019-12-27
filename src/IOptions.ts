import IIcon from "./IIcon";
import IRelatedApplication from "./IRelatedApplication";

interface IOptions {
	name?: string;
	short_name?: string;
	theme_color?: string;
	background_color?: string;
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
	start_url: string;
	file_name: string;
	icon_path?: string;
	icons?: Array<IIcon>;
	dir: "ltr" | "rtl" | "auto";
	lang?: string;
	prefer_related_applications: boolean;
	related_applications: Array<IRelatedApplication>;
}

export default IOptions;
