const Jimp = require('jimp');
const { readSizes } = require('./sizeReader');

const loadingFont = Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

const formatSize = size => (Math.round(size / 100) / 10) + ' KB';

exports.customizeImage = async image => {
    const [font, jImage, { plain, gzip }] = await Promise.all([
        loadingFont,
        Jimp.read(image),
        readSizes(),
    ]);

    jImage.print(font, 10, 8, `Generated on: ${new Date()}`);
    jImage.print(font, 1200, 8, `Plain: ${formatSize(plain)}    Gzip: ${formatSize(gzip)}`);

    return jImage.getBufferAsync(Jimp.MIME_PNG);
};
