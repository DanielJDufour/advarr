const iter = ({ inpt, func, cb, thisArg }) => {
  try {
    return inpt[func]((value, i, array) => {
      return cb({
        value,
        currentValue: value,
        element: value,
        item: value,

        i,
        index: i,

        array,

        get percent() { return (i + 1) / array.length; },

        get length() { return array.length; },

        get previous() { return array[i - 1]; },
        get prev() { return array[i - 1]; },

        get next() { return array[i + 1]; },

        get before() { return array.slice(0, i); },
        get after() { return array.slice(i + 1); },

        brk: (n=1) => { throw `[advarr] breaking ${n}`; },

        // ordinal numbers
        first: i === 0,
        second: i === 1,
        third: i === 2,
        fourth: i === 3,
        fifth: i === 4,
        sixth: i === 5,
        seventh: i === 6,
        eigth: i === 7,
        ninth: i === 8,
        tenth: i === 9,

        last: i === array.length - 1,
        penultimate: i === array.length - 2,
        antepenultimate: i === array.length - 3,

        odd: i % 2 === 1,
        even: i % 2 === 0,
      });
    }, thisArg);
  } catch (error) {
    let msg = error.toString();
    if (!msg.includes("[advarr] breaking 1")) {
      if (msg.includes("[advarr] breaking")) {
        const n = parseInt(msg[msg.length - 1]);
        msg = "[advarr] breaking " + (n - 1);
      }
      throw msg;
    }
  }
};

const advarr = {};
["every", "filter", "find", "findIndex", "flatMap", "forEach", "map", "some"].forEach(key => {
  advarr[key] = (inpt, cb, thisArg) => iter({ inpt, func: key, cb, thisArg });
});

if (typeof module.exports === "object") module.exports = advarr;
if (typeof window === "object") window.advarr = advarr;
if (typeof self === "object") self.advarr = advarr;
