const { FuseBox } = require("fuse-box");
const { SassPlugin, CSSPlugin } = require("fuse-box");

let tmp = "./tmp";
const fuse = FuseBox.init({
  homeDir: ".",
  output: "dist/$name.js",
  plugins: [
    [
      SassPlugin(),
      CSSPlugin({
        // group: "app.css",
        // outFile: `${tmp}/app.css`
        outFile: `dist/${file}.css`
      })
    ]
  ]
});

// fuse.bundle("first").instructions(`>index.js`);
fuse.bundle("first").instructions(`>spectre.scss`);

fuse.run();
