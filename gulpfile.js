"use strict";

const { src, series, watch, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

exports.sass = function defaultTask() {
  return src("./styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist"));
};

exports.watch = function () {
  watch("./styles/*.scss", series("sass"));
};
