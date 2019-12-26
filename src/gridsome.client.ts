const GridsomePluginManifest = (Vue, options, { head }): void => {
	head.link.push({
		rel: "manifest",
		type: "application/json",
		href: `/${options.file_name}`,
	});

	head.meta.push({
		name: "theme-color",
		content: options.theme_color,
	});
};

export default GridsomePluginManifest;
