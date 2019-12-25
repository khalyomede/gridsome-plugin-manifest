const GridsomePluginManifest = (Vue, options, { head }) => {
	head.link.push({
		rel: "manifest",
		type: "application/json",
		href: `/${options.fileName}`,
	});
};

export default GridsomePluginManifest;
