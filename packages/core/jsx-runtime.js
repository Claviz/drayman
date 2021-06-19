function jsx(type, props) {
    return { type: type ? type : '$$fragment', props };
}

module.exports = {
    jsx,
    jsxs: jsx,
}