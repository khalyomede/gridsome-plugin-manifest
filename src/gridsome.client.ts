const GridsomePluginManifest = (Vue, options, { head }): void => {
	head.link.push({
		rel: "manifest",
		type: "application/json",
		href: "/manifest.json",
	});
};

export default GridsomePluginManifest;
