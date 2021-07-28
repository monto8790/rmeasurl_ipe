const dateFormat = require('dateformat');

exports.getToc = function () {
    return getRandomFlo(0.4, 0.5);
}
exports.getUv254 = function () {
    return getRandomFlo(0.04, 0.05);
}
exports.getTurbidity = function () {
    return getRandomFlo(3, 5);
}
exports.getCl = function () {
    return getRandomFlo(0, 4);
}
exports.getPh = function () {
    return getRandomFlo(5.8, 8.5);
}
exports.getFlux = function () {
    return getRandomFlo(2000, 2300);
}
exports.getWaterLevel = function () {
    return getRandomFlo(80, 100);
}
exports.getSewerWaterLevel = function () {
    return getRandomFlo(0.1, 1);
}
exports.getFlowRate = function () {
    return getRandomFlo(0.5, 1.5);
}
exports.getWaterPressure = function () {
    return getRandomFlo(6, 10);
}

function getRandomFlo(min, max) {
    return (Math.random() * (max - min)) + min;
}


