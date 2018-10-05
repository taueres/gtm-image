const { fetchImage } = require('./proxy');
const { addDateTimeToImage } = require('./dateTime');

exports.getImage = async () => {
    const rawImage = await fetchImage();
    return addDateTimeToImage(rawImage);
};
