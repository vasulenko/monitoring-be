export const errorWrapper = (req, res, callback) => callback().catch(err => {
    console.error(err);
    return res.status(500).send({
        message: 'Something went wrong.',
        error: err
    });
});

