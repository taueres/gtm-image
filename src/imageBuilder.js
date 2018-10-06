const { fetchImage } = require('./proxy');
const { customizeImage } = require('./customizeImage');

exports.getImage = async () => {
    const rawImage = await fetchImage();
    return customizeImage(rawImage);
};
