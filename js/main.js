
var camera, scene, renderer;
var material, mesh;
var particleSystem, particleUniforms;

var particles = 1000

function setup(canv) {

    var W = window.innerWidth, H = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        canvas: canv
    });
    renderer.setSize( W, H );

    particleUniforms = {
        color:     { type: "c", value: new THREE.Color( 0xffffff ) }
        //texture:   { type: "t", value: new THREE.TextureLoader().load( "textures/sprites/spark1.png" ) }
    };

    camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
    camera.position.set(0, 151, 0);

    scene = new THREE.Scene();
    renderer.setClearColor( 0x000000 );

    var particleSystem = makeParticleSystem(particles, 200);
    scene.add( particleSystem );

    var geometry = new THREE.SphereGeometry(150, 64, 64);
    material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0xffffff});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function draw() {

    requestAnimationFrame( draw );
    renderer.render( scene, camera );
}

function makeParticleSystem(particleCount, radius) {

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       particleUniforms,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

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

    var particleSystem = new THREE.Points( geometry, shaderMaterial );

    return particleSystem;
}

setup(document.getElementById('headerCanvas'));
draw();
