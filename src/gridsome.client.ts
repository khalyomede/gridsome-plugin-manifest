const GridsomePluginManifest = (Vue, options, { head }): void => {
	if (process.isServer) {
		head.link.push({
			rel: "manifest",
			type: "application/manifest+json",
			href: `/${options.file_name}`,
		});
	}

	head.meta.push({
		name: "theme-color",
		content: options.theme_color,
	});
};

export default GridsomePluginManifest;
