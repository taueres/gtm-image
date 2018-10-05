var Jimp = require('jimp');

const loadingFont = Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

exports.addDateTimeToImage = async image => {
    const [font, jImage] = await Promise.all([
        loadingFont,
        Jimp.read(image)
    ]);
    jImage.print(font, 10, 7, `Generated on: ${new Date()}`);
    return jImage.getBufferAsync(Jimp.MIME_PNG);
};
