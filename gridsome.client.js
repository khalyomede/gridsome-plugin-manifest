const GridsomePluginManifest = (Vue, options, { head }) => {
	head.link.push({
		rel: "manifest",
		type: "application/json",
		href: `/${options.file_name}`,
	});
};

export default GridsomePluginManifest;
