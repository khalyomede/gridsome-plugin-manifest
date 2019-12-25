const GridsomePluginManifest = (Vue, options, { head }): void => {
	head.link.push({
		rel: "manifest",
		type: "application/json",
		href: `/${options.fileName}`,
	});
};

export default GridsomePluginManifest;
