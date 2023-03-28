const countWords = (str: string): number => {
    var matches = str.match(/[\w\d\’\'-]+/gi);
    return matches ? matches.length : 0;
};

export default countWords;
