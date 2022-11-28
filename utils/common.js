module.exports.getFormatDate = (date) => {
    return new Date(new Date(date).toJSON().substring(0, 10));
};