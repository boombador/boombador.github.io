---
layout: basic
---

I recently wanted to add some sort of visual spice to my blog, so I came up with the idea of
making the top of the page resemble a view of the horizon looking onto a star field.

I looked at [several][aerotwist-tut] [tutorials][creativejs-tut] for setting up particle systems,
but while they did a good job of explaining their methods the three.js api has changed
sufficiently since then that the referenced classes no longer exist.

So here is my entry in the list of tutorials that will someday be outdated. This solution is taken
from a [three.js example][threejs-example].

## Initial Setup

We'll assume our canvas in question has the somewhat unimaginative id `canvas`, and we're pulling
in the latest version of Three.js as of this writing like so:

```html
<canvas id="canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r77/three.js"></script>
```

Next we need to setup the animation loop and the Three.js objects that will manage the scene
and rendering for us. I'm defining this code in a top down approach so that it's easier to
understand, but as a consequence the snippets in this sample won't run until you've entered
all of them into your sample file.

```js
var camera, scene, renderer;
var material, mesh;

function setup(canv) {
    var W = window.innerWidth, H = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        canvas: canv
    });
    renderer.setSize( W, H );

    camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
    camera.position.set(0, 0, 0);

    scene = new THREE.Scene();
    renderer.setClearColor( 0x000000 );

    var particleSystem = makeParticleSystem(200, 200);
    scene.add( particleSystem );
}

function draw() {
    requestAnimationFrame( draw );
    camera.rotation.y += 0.001;
    renderer.render( scene, camera );
}
```

And the last lines in the script will be to invoke these functions to trigger the setup and first
loop iteration.

```js
setup(document.getElementById('canvas'));
draw();
```

The above mostly configures the main scene, camera, and renderer objects before delegating
the work of building the particle system to another function. Then the main loop is triggered
by invoking `draw()` once which as a side effect tells the browser to execute the same
function again once it is ready to render the screen via the requestAnimationFrame function.

## Building the Particles

Now we actually need to define the particle system.

```js
function makeParticleSystem(particleCount, radius) {

    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array( particleCount * 3 );
    var colors = new Float32Array( particleCount * 3 );
    var sizes = new Float32Array( particleCount );

    var color = new THREE.Color();

    for ( var i = 0, i3 = 0; i < particleCount; i ++, i3 += 3 ) {
        positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
        positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
        positions[ i3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;

        color.setHSL( i / particleCount, 1.0, 0.5 );

        colors[ i3 + 0 ] = color.r;
        colors[ i3 + 1 ] = color.g;
        colors[ i3 + 2 ] = color.b;

        sizes[ i ] = 20;
    }

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

    var shaderMaterial = makeParticleMaterial();
    var particleSystem = new THREE.Points( geometry, shaderMaterial );

    return particleSystem;
}
```

Here we see that the process for making the geometry for a particle system isn't really any
different from a normal mesh. Each vertex will be rendered as a single point instead of defining
one corner of a triangle. Each point is given a random coordinate in three dimensions within the
range [-radius, radius] and assigning an increasingly bright hue.

## Particle Materials

Now we just need to decide how each point will be rendered by writing a couple simple shaders. The
following code will generate an appropriate shader material assuming the vertex and shader source
texts are in the `vertexShader` and `fragmentShader` variables respectively.

```js
function makeParticleMaterial() {

    var particleUniforms = {
        color: { type: "c", value: new THREE.Color( 0xffffff ) }
    };

    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms:       particleUniforms,
        vertexShader:   vertexshaderSource, // need to fill this variable with source of vertex-shader
        fragmentShader: fragmentshaderSource, // similarly, source of the fragment-shader

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

    return shaderMaterial;
}
```

Now we write the shaders that define how to actually draw each point. Shaders are a pretty big
topic, so here we'll only point out that instead of relying solely on `gl_Position` and
`gl_FragColor` as usual, we also set the `gl_PointSize` variable to determine how much space
the point should take up on the destination image;

```js
// these declarations need to be declared above makeParticleMaterial
var vertexshaderSource = [
    'attribute float size;',
    'attribute vec3 customColor;',
    'varying vec3 vColor;',
    'void main() {',
        'vColor = customColor;',
        'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
        'gl_PointSize = size * ( 30.0 / -mvPosition.z );',
        'gl_Position = projectionMatrix * mvPosition;',
    '}'
].join("\n");

var fragmentshaderSource = [
    'uniform vec3 color;',
    'varying vec3 vColor;',
    'void main() {',
        'gl_FragColor = vec4( color * vColor, 1.0 );',
    '}'
].join("\n");
```

Note: I prefer defining shaders like this as opposed to placing them in a script tag just because
then I can keep them in the relevant javascript file. The most convenient method I've encountered
so far is putting them in a separate file and using webpack to reference the shader source
with a simple require statement. Then you can get easy syntax highlighting without the weirdness
of putting lines of code in an array.

```html
<script type="x-shader/x-vertex" id="vertexshader">
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 30.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
</script>

<script type="x-shader/x-fragment" id="fragmentshader">
    uniform vec3 color;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4( color * vColor, 1.0 );
    }
</script>
```

[aerotwist-tut]: https://aerotwist.com/tutorials/creating-particles-with-three-js/ "Creating particles with Three.js"
[creativejs-tut]: http://creativejs.com/tutorials/three-js-part-1-make-a-star-field/index.html "Star Field Part 1"
[threejs-example]: http://threejs.org/examples/#webgl_buffergeometry_custom_attributes_particles "Three.js Particle System Example"
