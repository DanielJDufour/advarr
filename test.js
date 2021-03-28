const test = require("flug");
const { forEach, map } = require("./advarr.js");

test('people', ({ eq }) => {
  const people = ["Peter", "Paul", "Mary"];
  let text = "";
  forEach(people, ({ value: person, first, last }) => {
    if (!first && !last) text += ",";
    if (last) text += " and";
    if (!first) text += " ";
    text += person;
  });
  eq(text, "Peter, Paul and Mary");
});

test("forEach", ({ eq }) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let text = "";
  forEach(nums, ({ value }) => {
    text += value;
  });
  eq(text, "0123456789");
});

test("forEach and break", ({ eq }) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let text = "";
  forEach(nums, ({ value, i, brk }) => {
    if (i === 5) brk();
    text += value;
  });
  eq(text, "01234");
});

test("errors", ({ eq }) => {
  let msg;
  try {
    forEach([1,2,3], () => {
      throw "error";
    });  
  } catch (error) {
    msg = error.toString();
  }
  eq(msg, "error");  
});

test("getters", ({ eq }) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let text = "";
  forEach(nums, ({ after, before, i, first, brk }) => {
    if (!first) text += "\n";
    text += "before: " + JSON.stringify(before) + "\n" + "after: " + JSON.stringify(after)
    if (i === 1) brk();
  });
  eq(text, 'before: []\nafter: [1,2,3,4,5,6,7,8,9]\nbefore: [0]\nafter: [2,3,4,5,6,7,8,9]');  
});

test("double brk", ({ eq }) => {
  let text = "";
  const onetwo = [1,2];
  forEach(onetwo, ({ i: a }) => {
    forEach(onetwo, ({  i: b}) => {
      forEach(onetwo, ({ brk, i: c }) => {
        text += `${a},${b},${c}\n`;
        if (a === 0 && b === 0 && c === 0) brk(2);
      });
    });
  });
  eq(text, '0,0,0\n1,0,0\n1,0,1\n1,1,0\n1,1,1\n');  
});
