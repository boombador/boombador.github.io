
//import React, { Component } from 'react';
//import {render} from 'react-dom';
//import Hello from './components/Hello';

//class App extends Component {
 //render() {
 //return (
 //<Hello />
 //)
 //}
//}
//render(<App />, document.getElementById('root'));


var camera, scene, renderer;
var material, mesh;
var particleSystem;

function setup(canv) {
    var W = window.innerWidth, H = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        canvas: canv
    });
    renderer.setSize( W, H );

    camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
    camera.position.set(0, 151, 0);

    scene = new THREE.Scene();
    renderer.setClearColor( 0x000000 );

    var particleSystem = makeParticleSystem(1000, 200);
    scene.add( particleSystem );

    var geometry = new THREE.SphereGeometry(150, 64, 64);
    material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0xffffff});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function draw() {
    requestAnimationFrame( draw );
    camera.rotation.y += 0.001;
    renderer.render( scene, camera );
}

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

function makeParticleMaterial() {

    var particleUniforms = {
        color:     { type: "c", value: new THREE.Color( 0xffffff ) }
    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       particleUniforms,
        vertexShader:   vertexshaderSource,
        fragmentShader: fragmentshaderSource,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

    return shaderMaterial;
}

function makeParticleSystem(particleCount, radius) {

    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array( particleCount * 3 );
    var colors = new Float32Array( particleCount * 3 );
    var sizes = new Float32Array( particleCount );

    var color = new THREE.Color();

    for ( var i = 0, i3 = 0; i < particleCount; i ++, i3 += 3 ) {
        positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
        positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius + radius;
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

setup(document.getElementById('headerCanvas'));
draw();
