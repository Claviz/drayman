function jsx(type, props, key) {
    return { type: type ? type : '$$fragment', props, key };
}

module.exports = {
    jsx,
    jsxs: jsx,
}