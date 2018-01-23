# timer - timer

Works like the browser window.performance.[mark,measure] but in a nodejs environment.

**important:** Since it uses global variables, it needs to be initialized once.

## Usage
```
var timer-timer = require('timer-timer')

timer-timer.init()

//mark the start
timer-timer.mark("start-of-my-thing")

// do your thing...

// mark the end
timer-timer.mark("end-of-my-thing")

//calculate the elapsed time
timer-timer.measure("name-of-my-measure","start-of-my-thing","end-of-my-think")

// object with all the measures, access them by the tag eg. "name-of-my-measure"
let allTheMeasures = timer-timer.dump()


```
