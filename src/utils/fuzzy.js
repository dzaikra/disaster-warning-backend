const triangle = (x, a, b, c) => {
    if (x <= a || x >= c) {
        return 0;
    }

    if (x === b) {
        return 1;
    }

    if (x > a && x < b) {
        return Number(
            ((x - a) / (b - a)).toFixed(4)
        );
    }

    return Number(
        ((c - x) / (c - b)).toFixed(4)
    );
};

module.exports = {
    triangle,
};

const fuzzyMagnitude = (magnitude) => {
    const low = triangle(
        magnitude,
        0,
        2,
        4
    );

    const medium = triangle(
        magnitude,
        4,
        5,
        6
    );

    const high = triangle(
        magnitude,
        6,
        7,
        8
    );

    return Math.max(
        low,
        medium,
        high
    );
};

const fuzzyDistance = (distance) => {

    if (distance <= 50) {
        return 1;
    }

    if (distance <= 150) {
        return Number(
            (
                (150 - distance) /
                (150 - 50)
            ).toFixed(4)
        );
    }

    if (distance <= 500) {
        return Number(
            (
                (500 - distance) /
                (500 - 150)
            ).toFixed(4)
        );
    }

    return 0.05;
};

const fuzzyDepth = (depth) => {
    const shallow = triangle(
        depth,
        0,
        30,
        60
    );

    const medium = triangle(
        depth,
        60,
        180,
        300
    );

    const deep = triangle(
        depth,
        300,
        450,
        600
    );

    return Math.max(
        shallow,
        medium,
        deep
    );
};

module.exports = {
    triangle,
    fuzzyMagnitude,
    fuzzyDepth,
    fuzzyDistance,
};