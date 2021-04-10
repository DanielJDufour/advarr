# advarr
> **Adv**anced **Arr**ay utility functions.  

# features
- intuitive
- light weight
- lots of parameters
- break out of multiple loops at once

# background
I write a lot of NodeJS scripts for processing and transforming data.  They need to run fast, but the most important thing to me is that the code is readable.  I found myself repeating a lot of logic when using Array's forEach and map, like checking if an element is the first in the array and figuring out what percentage of the forEach loop is complete.  Instead of repeating myself (and in order to simplify my scripts), I wrote this library.  I hope you find it useful, too.

# install
```bash
npm install advarr
```

# usage
```javascript
const { forEach } = require("advarr");

const people = ["Peter", "Paul", "Mary"];
let text = "";
forEach(people, ({ value: person, first, last }) => {
  if (!first && !last) text += ",";
  if (last) text += " and";
  if (!first) text += " ";
  text += person;
});
// text is "Peter, Paul and Mary"
```

# speed
A manual `for (let i = 0; i < arr.length; i++)` will likely always be the fastest way to iterate over values. If speed is the most important priority, I recommend using a for loop.  That said, I have written this library to be as fast as possible while providing an intuitive and large set of callback arguments.  Several of the callback values like `length` and `percent` are actually getters and only calculated if you use them.

# functions
Here's a complete list of functions
- every
- filter
- find
- findIndex
- flatMap
- forEach
- map
- some

# parameters
Here's a complete list of parameters passed into the callback function
| name  | description |
| ----- | ----------- |
| value | current element in the array and same as [currentValue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). You can also use `it`, `item`, `element`, or `currentValue`. |
| i     | index of current element in the array and same as [index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). You can also use `index`. |
| array | the original array and same as [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) |
| percent | percentage of the array processed including current element |
| length | length of the array |
| previous | previous element in the array |
| next | next element in the array |
| before | part of the array before the current element |
| after | part of the array after the current element |
| brk | function to break the loop.  pass in a number to specify how many loops to break |
| first, second, ... tenth | ordinal numbers |
| last | last element in the array |
| penultimate | second to last element in the array |
| antepenultimate | third to last element in the array |
| odd | index is odd (starting with the second element in the array because the second element has an index of 1) |
| even | even number element (starting with the first element in the array because the first element has an index of 0) |
| firstValue | the first value of the array.  You can also use `firstElement`, `firstItem`, or `firstIt`. |
| lastValue | the last value of the array  You can also use `lastElement`, `lastItem`, or `lastIt`.  |

# more examples
### breaking out of multiple loops
```js
const { forEach } = require("advarr");

const nums = [0, 1, 2, 3, 4];
forEach(nums, ({ value: v1 }) => {
  forEach(nums, ({ value: v2 }) => {
    forEach(nums, ({ value: v3, brk }) => {
      // break out of the two inner loops (but not the top most one)
      if (Math.random() < 0.5) brk(2);
    });  
  });
});
```

# more examples coming soon!
