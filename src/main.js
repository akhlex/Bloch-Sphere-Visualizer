import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;

function Sphere() {
  
  const geometry = new THREE.SphereGeometry( 2, 32, 16 );
  const material = new THREE.MeshBasicMaterial( {color: 0x808080, transparent: true, opacity: 0.5} );
  const sphere = new THREE.Mesh( geometry, material );
  return sphere;

}

function Arrow() {
  
  const arrowHead = new THREE.ConeGeometry( 0.2, 0.8 );
  arrowHead.translate( 0, 1.6, 0);
  const headMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const arrowH = new THREE.Mesh( arrowHead, headMaterial );

  const arrowBody = new THREE.CylinderGeometry( 0.06, 0.06, 1.6 );
  arrowBody.translate( 0, 0.8, 0 );
  const bodyMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const arrowB = new THREE.Mesh( arrowBody, bodyMaterial ); 

  const arrow = new THREE.Group();
  arrow.add( arrowH, arrowB );
  return arrow;

}

function Axes() {

  const axesP = new THREE.AxesHelper( 2 );
  axesP.setColors( 0x000000, 0x000000, 0x000000 );

  const axesN = new THREE.AxesHelper( -2 );
  axesN.setColors( 0x000000, 0x000000, 0x000000 );

  const axes = new THREE.Group();
  axes.add( axesP );
  axes.add( axesN );

  return axes;

}

const loader = new FontLoader();

const text = loader.load(

  'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',

  function (droidFont) {

    const zeroGeometry = new TextGeometry( '|0>', {depth: 0.1, size: 0.5, font: droidFont} );
    const zeroMaterial = new THREE.MeshNormalMaterial();
    const zeroMesh = new THREE.Mesh( zeroGeometry, zeroMaterial );
    zeroMesh.position.y = -2.7;
    zeroMesh.position.x = -0.5;
    scene.add( zeroMesh );

    const oneGeometry = new TextGeometry( '|1>', {depth: 0.1, size: 0.5, font: droidFont} );
    const oneMaterial = new THREE.MeshNormalMaterial();
    const oneMesh = new THREE.Mesh( oneGeometry, oneMaterial );
    oneMesh.position.y = 2.7;
    oneMesh.position.x = -0.5;
    scene.add( oneMesh );

    const plusGeometry = new TextGeometry( '|+>', { depth: 0.1, size: 0.5, font: droidFont } );
    const plusMaterial = new THREE.MeshNormalMaterial();
    const plusMesh = new THREE.Mesh( plusGeometry, plusMaterial );
    plusMesh.position.x = 2;
    scene.add( plusMesh );

    const minusGeometry = new TextGeometry( '|->', { depth: 0.1, size: 0.5, font: droidFont } );
    const minusMaterial = new THREE.MeshNormalMaterial();
    const minusMesh = new THREE.Mesh( minusGeometry, minusMaterial );
    minusMesh.position.x = -3;
    scene.add( minusMesh );
  } 

)




const qubit = new THREE.Group();
qubit.add( Sphere(), Arrow() );
scene.add( qubit );
scene.add( Axes() );

function animate() {

  renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );