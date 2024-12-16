import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { res } from './qMath';
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

camera.position.z = 4;

//Sphere Definition  
const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x808080, transparent: true, opacity: 0.5} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set( 0, 0, 0 );



//Vector Definition
const vectorHead = new THREE.ConeGeometry( 0.1, 0.4 );
vectorHead.translate( 0, 0.8, 0);
const headMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
const vectorH = new THREE.Mesh( vectorHead, headMaterial );

const vectorBody = new THREE.CylinderGeometry( 0.03, 0.03, 0.8 );
vectorBody.translate( 0, 0.4, 0 );
const bodyMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
const vectorB = new THREE.Mesh( vectorBody, bodyMaterial );

const vector = new THREE.Group();
vector.add( vectorH, vectorB );
vector.rotateX( math.pi );



//Axes Definition
const axesP = new THREE.AxesHelper( 1 );
axesP.setColors( 0x000000, 0x000000, 0x000000 );

const axesN = new THREE.AxesHelper( -1 );
axesN.setColors( 0x000000, 0x000000, 0x000000 );

const axes = new THREE.Group();
axes.add( axesP );
axes.add( axesN );



//Using FontLoader and TextGeometry to label the axes
const loader = new FontLoader();

loader.load (

  'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',

  function (droidFont) {

    const zeroGeometry = new TextGeometry( '|0>', {depth: 0.1, size: 0.3, font: droidFont} );
    const zeroMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const zeroMesh = new THREE.Mesh( zeroGeometry, zeroMaterial );
    zeroMesh.position.y = -1.5;
    zeroMesh.position.x = -0.3;

    const oneGeometry = new TextGeometry( '|1>', {depth: 0.1, size: 0.3, font: droidFont} );
    const oneMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const oneMesh = new THREE.Mesh( oneGeometry, oneMaterial );
    oneMesh.position.y = 1.35;
    oneMesh.position.x = -0.3;

    const plusGeometry = new TextGeometry( '|+>', { depth: 0.1, size: 0.3, font: droidFont } );
    const plusMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const plusMesh = new THREE.Mesh( plusGeometry, plusMaterial );
    plusMesh.position.x = 1.15;
    plusMesh.position.y = -0.05;

    const minusGeometry = new TextGeometry( '|->', { depth: 0.1, size: 0.3, font: droidFont } );
    const minusMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const minusMesh = new THREE.Mesh( minusGeometry, minusMaterial );
    minusMesh.position.x = -1.7;
    minusMesh.position.y = -0.05;

    const textGroup = new THREE.Group();
    textGroup.add( zeroMesh, oneMesh, plusMesh, minusMesh );
    scene.add(textGroup);
    console.log(res);

  }
)



//Grouping Sphere and Vector together as Qubit, Adding Qubit to scene
const qubit = new THREE.Group();
qubit.add( sphere );
qubit.add( vector );
scene.add( qubit );
scene.add( axes );



//Animation Loop
function animate() {

  renderer.render( scene, camera );
  controls.update();

}
renderer.setAnimationLoop( animate );