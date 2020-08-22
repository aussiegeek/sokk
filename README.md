# sokk

A TypeScript library to round/ceil/floor to a nearby multiple

# Example

```
import {round, float, ceil} from 'sokk';

# round to the nearest integer
# prints 1
console.log(round(1.2))

# round to the nearest multiple of 6
# prints '12'
console.log(round(11, 6))

# round down to the nearest integer
# prints 3
console.log(floor(3.3))

# round to the next lowest multiple of 5
# prints 15
console.log(floor(18, 5))

# round up to the nearest integer
# prints 5
console.log(ceil(4.9, 5))

# round up to the next highest multiple of 7
# prints 21
console.log(ceil(20, 7))
```

## Why?

Naming things is hard, and I use this library as part of a knitted sock pattern generator, where there is need to round stitch counds to groups of commonly 2 or 4 stitches.

_sokk_ is Norweigan for _sock_ (I use an old Norse cast on for my socks)
