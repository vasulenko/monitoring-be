export const errorWrapper = (req, res, callback) => callback().catch(err => {
    console.error(err);
    return res.status(500).send({
        message: 'Something went wrong.',
        error: err
    });
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const generateValue = (min, max) => Math.random() * (max - min) + min
