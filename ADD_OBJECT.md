```javascript
actions.sketcher.addObject(objectData);
```

**objectData**

Only type is required

```javascript
const objectData = {
  type: String:isRequired,
  height: Number,
  transform: CAL.Matrix,
  z: Number,
  sculpt: [
    ...{ pos: Number, scale: Number }
  ],
  twist: Number,
  color: HexNumber,
  space: 'String',
  fill : Bool
}
```

**Defining Sculpt**

Sculp has to have at least 2 entries. The first entry has to have a position of `0.0`, and the last one has to have a position of `1.0`. There can be added additional sculpt steps with increasing positions.

The scale property defines the scale factor on that position

```javascript
sculpt = [
  { pos: 0.0, scale: 1.0 },
  { pos: 1.0, scale: 1.0 }
]
```

**Defining a Matrix**

```javascript
new CAL.Matrix({
  x: Number,
  y: Number
  sx: Number,
  sy: Number,
  rotation: Number
})
```

**objectData.type = CIRCLE**

```javascript
{
  ...objectData,
  type: 'CIRCLE'
  circle: {
    radius: Number,
    segment: Number(rad)
  }
}

actions.sketcher.addObject({ type: 'CIRCLE', circle: { radius: 10, segment: Math.PI * 2 } });
```

**objectData.type = RECT**

```javascript
{
  ...objectData,
  type: 'RECT'
  rectSize: CAL.Vector
}

actions.sketcher.addObject({ type: 'CIRCLE', rectSize: new CAL.Vector(10, 10) });
```

**objectData.type = TRIANGLE**

```javascript
{
  ...objectData,
  type: 'TRIANGLE'
  triangleSize: CAL.Vector
}

actions.sketcher.addObject({ type: 'CIRCLE', rectSize: new CAL.Vector(10, 10) });
```

**objectData.type = STAR**

```javascript
{
  ...objectData,
  type: 'STAR'
  star: { innerRadius: Number, outerRadius: Number, rays: Int }
}

actions.sketcher.addObject({ type: 'STAR', star: { innerRadius: 10, outerRadius: 15, rays: 5 } });
```

**objectData.type = TEXT**

```javascript
{
  ...objectData,
  type: 'TEXT'
  text: { text: String, family: String, weight: String, style: String }
}

actions.sketcher.addObject({ type: 'TEXT', text: { text: 'ABC', family: 'Arial', weight: 'normal', style: 'normal' } });
```

**objectData.type = FREE_HAND**

```javascript
{
  ...objectData,
  type: 'FREE_HAND'
  points: [...CAL.Vector]
}

actions.sketcher.addObject({ type: 'FREE_HAND', points: [new CAL.Vector(0, 0), new CAL.Vector(100, 0), new CAL.Vector(100, 100)] });
```
