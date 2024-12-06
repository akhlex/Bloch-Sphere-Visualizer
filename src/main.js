import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x000000, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;

function Cube() {
  
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x808080} );
  const cube = new THREE.Mesh( geometry, material );
  return cube;

}

function Sphere() {
  
  const geometry = new THREE.SphereGeometry( 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x808080} );
  const sphere = new THREE.Mesh( geometry, material );
  return sphere;

}

function Qubit() {
  
}

scene.add(Cube());

function animate() {

  renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );