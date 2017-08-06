// const { FuseBox } = require("fuse-box");
// const { SassPlugin, CSSPlugin } = require("fuse-box");
// const { Sparky } = require("fuse-box");

// // let fuse, app, isProduction;
// let tmp = "./tmp";
// const fuse = FuseBox.init({
//   homeDir: ".",
//   output: "dist/$name.js",
//   sourceMaps: true,
//   plugins: [
//     [
//       SassPlugin(),
//       CSSPlugin({
//         outFile: file => `dist/${file}`
//       })
//     ]
//   ]
// });

// fuse.bundle("a").instructions(`>spectre.scss`);
// fuse.bundle("a").instructions(`>spectre-exp.scss`);
// fuse.bundle("a").instructions(`>spectre-icons.scss`);
// fuse.run();

// // disable sourcemaps and enable minification
// fuse.opts.sourceMaps = false;
// fuse.opts.plugins = [
//   [
//     SassPlugin(),
//     CSSPlugin({
//       outFile: file => `dist/${file.slice(0, -4)}.min.css`,
//       minify: true
//     })
//   ]
// ];

// fuse.bundle("a").instructions(`>spectre.scss`);
// fuse.bundle("a").instructions(`>spectre-exp.scss`);
// fuse.bundle("a").instructions(`>spectre-icons.scss`);
// fuse.run();

const { FuseBox, Sparky, SassPlugin, CSSPlugin } = require("fuse-box");
import { ChainPlugin } from "fusebox-chain-plugin";

let fuse, app, isProduction;

Sparky.task("config", () => {
  let plugins = [];
  if (isProduction) {
    plugins.push([
      SassPlugin(),
      CSSPlugin({
        outFile: file => `dist/${file.slice(0, -4)}.min.css`,
        minify: true
      })
    ]);
  }
  if (!isProduction) {
    // TODO: try https://github.com/unlight/fusebox-chain-plugin
    plugins.push([
      SassPlugin(),
      CSSPlugin({
        outFile: file => `dist/${file}`,
        minify: false
      })
    ]);
  }
  // debugger;

  fuse = FuseBox.init({
    experimentalFeatures: true,
    homeDir: ".",
    output: "dist/$name.js",
    hash: isProduction,
    plugins: plugins
  });
  app = fuse.bundle("a").instructions(`>spectre.scss`);
});

Sparky.task("clean", () => {
  return Sparky.src("dist/").clean("dist/");
});

Sparky.task("default", ["clean", "config"], () => {
  app = fuse.bundle("a").watch("src/**").instructions(`>spectre.scss`);
  fuse.run();
});
Sparky.task("set-production", () => {
  isProduction = true;
});
Sparky.task("dist", ["clean", "set-production", "config"], () => {
  fuse.run();
});
