const iter = ({ inpt, func, cb, thisArg }) => {
  try {
    const length = inpt.length;

    // shallow-copy origin array
    const originalArray = Array.from(inpt);

    const firstValue = originalArray[0];
    const lastValue = originalArray[length - 1];

    return inpt[func]((value, i, array) => {
      return cb({
        value,
        currentValue: value,
        element: value,
        item: value,
        it: value,

        firstValue,
        firstElement: firstValue,
        firstItem: firstValue,
        firstIt: firstValue,

        lastValue,
        lastElement: lastValue,
        lastItem: lastValue,
        lastIt: lastValue,

        i,
        index: i,

        array,

        get percent() { return (i + 1) / length; },

        get length() { return length; },

        get previous() { return originalArray[i - 1]; },
        get prev() { return originalArray[i - 1]; },

        get next() { return originalArray[i + 1]; },

        get before() { return originalArray.slice(0, i); },
        get after() { return originalArray.slice(i + 1); },

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

        last: i === length - 1,
        penultimate: i === length - 2,
        antepenultimate: i === length - 3,

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
