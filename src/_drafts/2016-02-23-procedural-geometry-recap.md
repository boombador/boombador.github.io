---
layout: basic
---

Recently I read an excellent series of [articles on procedural geometry] by
Jayelinda Suridge, but since I didn't feel like setting up Unity to run the
code samples I decided to convert the examples to javascript.

Most graphics processing libraries have some concept of a mesh data structure
that stores the list of faces, vertices, and edges that define the shape of some
object.

There are many programs for creating and editing meshes that enable you to save
your output in a variety of common file formats, however the creation of
individual meshes for a large project can be a time consuming process.

Fortunately it is possible to create relatively simple systems that are capable
of generating many complex shapes.

## Procedural Geometry

The geometry of an object is its solid shape, and it is approximated to a
varying degree of precision with a collection of faces and vertices referred to
as a mesh.

Using algorithm to determine the vertices and faces defining the simple polygon

Procedural geometry is using software to directly specify the shape of an
object, usually by calculating the positions and groupings of vertices into
faces which collectively define the object's goemetry.

The faces are usually broken down into triangles since this constraint allows
for specialized hardware in the gpu to optimize rendering each face much faster
and in parallel.

We'll be using the [Three.js] library , it contains data structures and whatever
winding order

## Mesh Building Blocks

/*
First we'll start with a single triangle mesh, the simplest possible shape. Usually rendering a
polygonal mesh entails figuring out how each individual triangle will land on the screen after it's
been contorted by any projection or coordinate-substituting transformations involved in the
modelling process, then figuring out how to color that triangle based on the scene and any
information associated with the vertices of the triangle face.

One of the basic calculations is determining whether the triangle is facing towards or away the
camera. A visual way to determine whether the surface of a triangle is facing towards or away from
the beholder is the perceived direction of rotation of the vertex positions in increasing order. In
some systems, such as [three or unity ]going in clockwise order. Triangles with the opposite winding
order are considered to be showing their backs and are not rendered.

Another common attribute to calculate are the vertex normals which are used in lighting
calculations.

## Hello Triangle

A mesh is the data structure that represents the vertices, edges, and faces that define the
geometric volume of the object. Storing the coordinates of each vertex as a vector in an array allows you to
use an index into that array to refer to each vertex's position, and represent the three vertices
of a triangle as three such indices.
 
The `THREE.Face` type stores indices into the vertex array as well as normal, color, and material
information, and each element in the vertex array is a `THREE.Vector3` representing the position of the
vertex.
*/

## Setting up

If you're completely new to Three.js you can use this [basic tutorial]
[http://threejs.org/docs/#Manual/Introduction/Creating_a_scene] to set up a
a minimal environment to experiment in.

Three.js provides a `Geometry` class that stores the vertices as an array of
3-dimensional vectors and represents each triangular face as indices into the
vertex list. The simplest geometry we can create is a basic triangle:

```javascript
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3( -10,  10, 0 ),
    new THREE.Vector3( -10, -10, 0 ),
    new THREE.Vector3(  10, -10, 0 )
);
geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
```

It's useful to remember that the order of the vertices defines which side of
the triangle is the front, for example in Three.js when the order increases in a
[CW or CCW?] direction from a given perspective.

--- scene
render same rotating triangle twice:
    normal shading and backface culling
    arrows pointing direction of winding order
label under arrows toggling between ccw and cw as changes

It is easy to make a mistake in adding vertex indices resulting in your entire mesh having the wrong
face normals, which could lead to the mesh not being rendering at all or strikingly inaccurate
shading results.

## Setup

How to include three.js on your page:

Complete setup for three.js scene plus empty create geometry stub

```javascript
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT );
document.body.appendChild( renderer.domElement );

var geometry = createGeometry();
var material = new THREE.MeshNormalMaterial( );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

(*var geoCenter = new THREE.Vector3();*)
(*geoCenter.addVectors(geometry.boundingBox.min, geometry.boundingBox.max).multiplyScalar(0.5);*)
camera.position.set(3, 4, 4);
var controls = new THREE.OrbitControls( camera, renderer.domElement, {
    target: geoCenter
});

var render = function () {
    requestAnimationFrame( render );
    renderer.render(scene, camera);
    controls.update();
};

render();
```


## Proceed to Procedural

The other tutorial talks about mesh builder, but three.js provides that level of abstraction with
the `THREE.Geometry` type. So now we're going to write a function that takes a geometry and adds
vertices and faces to it.

First we'll start with a quad, which is two triangles stuck together. We're hardcoding a lot of
constants to make this as simple as possible to start, but it will become more general. First of all
we're assuming that the [what?] axis corresponds to up, leaving the [blah]-[blah] plane as the
ground. Helpful to have a common frame of reference, Three.js works with right handed coordinate
system, think of x as right, y as up, z as forward (slight unintuitive, forward is towards you)

```javascript
// code to generate flat quad
```




http://gamasutra.com/blogs/JayelindaSuridge/20130903/199457/Modelling_by_numbers_Part_One_A.php
