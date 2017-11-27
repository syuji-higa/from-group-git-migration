const { colors } = require('./colors');

/**
 * @param {string} task
 * @param {string} str
 */
module.exports = {

  log: (task, str) => {
    const { reset, blue, magenta } = colors;
    const _msg = `[${ blue + task + reset }] ${ magenta + str + reset }`;

    console.error(_msg);
  },

};
