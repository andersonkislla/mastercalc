module.exports = async function runScript(buffer, scriptStr) {
    const fn = new Function('buffer', scriptStr + '; return hexEdit(buffer);');
    return fn(buffer);
};
