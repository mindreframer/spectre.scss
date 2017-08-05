const { FuseBox } = require("fuse-box");
const { SassPlugin, CSSPlugin } = require("fuse-box");

let tmp = "./tmp";
const fuse = FuseBox.init({
  homeDir: ".",
  output: "dist/$name.js",
  sourceMaps: true,
  plugins: [
    [
      SassPlugin(),
      CSSPlugin({
        outFile: file => `dist/${file}`
      })
    ]
  ]
});

fuse.bundle("a").instructions(`>spectre.scss`);
fuse.bundle("a").instructions(`>spectre-exp.scss`);
fuse.bundle("a").instructions(`>spectre-icons.scss`);
fuse.run();

// disable sourcemaps and enable minification
fuse.opts.sourceMaps = false;
fuse.opts.plugins = [
  [
    SassPlugin(),
    CSSPlugin({
      outFile: file => `dist/${file.slice(0, -4)}.min.css`,
      minify: true
    })
  ]
];

fuse.bundle("a").instructions(`>spectre.scss`);
fuse.bundle("a").instructions(`>spectre-exp.scss`);
fuse.bundle("a").instructions(`>spectre-icons.scss`);
fuse.run();
