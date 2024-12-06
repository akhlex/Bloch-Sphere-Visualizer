import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;

function Cube() {
  
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x808080, opacity: 0.5, transparent: true} );
  const cube = new THREE.Mesh( geometry, material );
  return cube;

}

function Sphere() {
  
  const geometry = new THREE.SphereGeometry( 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x808080, transparent: true, opacity: 0.5} );
  const sphere = new THREE.Mesh( geometry, material );
  return sphere;

}

function Arrow() {
  
  const arrowHead = new THREE.ConeGeometry( 0.1, 0.33 );
  arrowHead.translate( 0, 0.8, 0);
  const headMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const arrowH = new THREE.Mesh( arrowHead, headMaterial );

  const arrowBody = new THREE.CylinderGeometry( 0.03, 0.03, 0.8 );
  arrowBody.translate( 0, 0.365, 0);
  const bodyMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const arrowB = new THREE.Mesh( arrowBody, bodyMaterial ); 

  const arrow = new THREE.Group();
  arrow.add( arrowH, arrowB );
  return arrow;

}

const qubit = new THREE.Group();
qubit.add(Sphere(), Arrow());
scene.add(qubit);

function animate() {

  renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );