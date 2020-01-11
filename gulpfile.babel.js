import { src, dest, parallel, watch } from "gulp";
import plumber from "gulp-plumber";
import babel from "gulp-babel";
import typescript from "gulp-typescript";
import tslint from "gulp-tslint";

const js = () =>
	src("src/gridsome.{server,client}.ts")
		.pipe(plumber())
		.pipe(tslint())
		.pipe(typescript())
		.pipe(babel())
		.pipe(dest("./"));

const build = parallel(js);

const start = () => {
	watch("src/**/*.ts", js);
};

export { start, build };
