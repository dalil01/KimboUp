// https://github.com/tancredi/fantasticon

const iconsDir = "./src/app/components/Icon/";
const iconCssDir = iconsDir + "css/";
const iconFontsDir = iconsDir + "fonts/";

module.exports = {
    inputDir: iconsDir + "svg", // (required)
    outputDir: iconsDir, // (required)
    fontTypes: ["eot", "svg", "ttf", "woff", "woff2"],
    assetTypes: ["ts", "css"],
    fontHeight: 300,
    descent: 45,
    normalize: true,
    fontsUrl: "../fonts",
    formatOptions: {
        ts: {
            types: ["enum"],
            singleQuotes: false
        }
    },
    templates: {
        css: iconCssDir + "icons.css.hbs"
    },
    pathOptions: {
        eot: iconFontsDir + "icons.eot",
        svg: iconFontsDir + "icons.svg",
        ttf: iconFontsDir + "icons.ttf",
        woff: iconFontsDir + "icons.woff",
        woff2: iconFontsDir + "icons.woff2",
        css: iconCssDir + "icons.css",
        ts: iconsDir + "Icons.ts"
    },
    // Customize generated icon IDs (unavailable with `.json` config file)
    getIconId: ({
                    basename, // `string` - Example: 'foo';
                    relativeDirPath, // `string` - Example: 'sub/dir/foo.svg'
                    absoluteFilePath, // `string` - Example: '/var/icons/sub/dir/foo.svg'
                    relativeFilePath, // `string` - Example: 'foo.svg'
                    index // `number` - Example: `0`
                }) => ["icon-" + basename].join('-') // '0_foo'
};