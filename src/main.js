import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import * as math from 'mathjs';

//Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 1;

//Sphere Definition  
const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x808080, transparent: true, opacity: 0.5} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set( 0, 0, 0 );



//Vector Definition
const vectorHead = new THREE.ConeGeometry( 0.1, 0.4 );
vectorHead.translate( 0, 0.8, 0);
const headMaterial = new THREE.MeshBasicMaterial( {color: 0x2a2a69} );
const vectorH = new THREE.Mesh( vectorHead, headMaterial );

const vectorBody = new THREE.CylinderGeometry( 0.03, 0.03, 0.8 );
vectorBody.translate( 0, 0.4, 0 );
const bodyMaterial = new THREE.MeshBasicMaterial( {color: 0x2a2a69} );
const vectorB = new THREE.Mesh( vectorBody, bodyMaterial );

const vector = new THREE.Group();
vector.add( vectorH, vectorB );



//Axes Definition
const axesP = new THREE.AxesHelper( 1 );
axesP.setColors( 0x000000, 0x000000, 0x000000 );

const axesN = new THREE.AxesHelper( -1 );
axesN.setColors( 0x000000, 0x000000, 0x000000 );

const axes = new THREE.Group();
axes.add( axesP, axesN );



//Using FontLoader and TextGeometry to label the axes
const loader = new FontLoader();

loader.load (

  'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',

  function (droidFont) {

    const zeroGeometry = new TextGeometry( '|1>', {depth: 0.1, size: 0.3, font: droidFont} );
    const zeroMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const zeroMesh = new THREE.Mesh( zeroGeometry, zeroMaterial );
    zeroMesh.position.set( -0.3, -1.5, 0);

    const oneGeometry = new TextGeometry( '|0>', {depth: 0.1, size: 0.3, font: droidFont} );
    const oneMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const oneMesh = new THREE.Mesh( oneGeometry, oneMaterial );
    oneMesh.position.set( -0.3, 1.35, 0 );

    const xGeometry = new TextGeometry( 'X', { depth: 0.1, size: 0.3, font: droidFont } );
    const xMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const xMesh = new THREE.Mesh( xGeometry, xMaterial );
    xMesh.position.set( 1.15, -0.05, 0 );

    const yGeometry = new TextGeometry( 'Y', { depth: 0.1, size: 0.3, font: droidFont } );
    const yMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const yMesh = new THREE.Mesh( yGeometry, yMaterial );
    yMesh.position.set( -0.13, 0, -1.3 );

    const textGroup = new THREE.Group();
    textGroup.add( zeroMesh, oneMesh, xMesh, yMesh );
    scene.add(textGroup);

  }
)



//Grouping Sphere and Vector together as Qubit, Adding Qubit to scene
const qubit = new THREE.Group();
qubit.add( sphere );
qubit.add( vector );
scene.add( qubit );
scene.add( axes );



//Gate Definitions
export function x ( element ) {
  element.addEventListener('click', () => {  
    vector.rotateOnWorldAxis( new THREE.Vector3( 1, 0, 0), math.pi );
  });
}

export function y ( element ) {
  element.addEventListener('click', () => { 
    vector.rotateOnWorldAxis( new THREE.Vector3( 0, 0, 1 ), math.pi );
  });
}

export function z ( element ) {
  element.addEventListener('click', () => { 
    vector.rotateOnWorldAxis( new THREE.Vector3( 0, 1, 0 ), math.pi );
  });
}

export function h ( element ) {
  element.addEventListener('click', () => { 
    vector.rotateOnWorldAxis( new THREE.Vector3( 1, 0, 0 ), math.pi );
    vector.rotateOnWorldAxis( new THREE.Vector3( 0, 0, 1 ), math.pi / 2 );
   });
}

//Resets the scene
export function reset ( element ) {
  element.addEventListener('click', () => { 
    vector.rotation.set( 0, 0, 0 );
    console.clear();  
  });
}

//Log to the console
export function log ( element ) {
  element.addEventListener( 'click', () => {
    console.log("X: ", vector.rotation.x);
    console.log("Y: ", vector.rotation.z);  
    console.log("Z: ", vector.rotation.y); 
  } )
}

function autoRotate () {
  vector.rotateOnWorldAxis( new THREE.Vector3( 1, 0, 0 ), 0.01);
  // console.log( vector.rotation.x );
}



//Animation Loop
function animate() {

  autoRotate();
  renderer.render( scene, camera );
  controls.update();

}
renderer.setAnimationLoop( animate );
