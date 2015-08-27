# myojs-vector

A plugin for [Myo.js](https://github.com/thalmiclabs/myo.js) that provides rotational vectors.

**[See it in action here](http://thalmiclabs.github.io/myojs-vector/demo/)** <small>(requires a myo!)</small>

Whenever the Myo receives an `orientation` event, it will now emit a `vector` event, with a data object that was a `x`, `y`, and `theta`, all ranging from -1 to 1.

**Note:** These numbers are very dependant on the Myo being orientated properly. Make sure to use `myo.zeroOrientation()` often to correct for any drift.


```
	Myo.on('vector', function(vector){
		console.log('x', vector.x);
		console.log('y', vector.y);
		console.log('theta', vector.theta);
	});
```

#### applications

This can be used for mouse control on webpages, or zone detection to reduce false positives for poses. eg. Only accept poses while the user has their arm down to their side (helps with hand talkers).
