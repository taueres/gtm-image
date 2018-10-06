const { loadFixtures } = require('./loadFixtures');

const run = async () => {
    await loadFixtures();
    require('../src/index');
};

run();
