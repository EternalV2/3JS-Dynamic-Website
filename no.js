import './style.css'

import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// SETUP START ----------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);

// SETUP END ----------------------------

// TORUS EXAMPLE ----------------------------
const torusG = new THREE.TorusGeometry(10, 10, 10, 70)
const torusM = new THREE.MeshBasicMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(torusG, torusM);
//scene.add(torus)

// BG BOX ----------------------------
const boxBG = new THREE.BoxGeometry(110, 110, 3);
const boxText = new THREE.TextureLoader().load("G2.png");
const box = new THREE.Mesh(boxBG, new THREE.MeshBasicMaterial({ map: boxText }));
scene.add(box);


// AMBIENT LIGHT ----------------------------
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

//const spaceTexture = new THREE.TextureLoader().load("GradientBG.png");
//scene.background = spaceTexture;

let model;
let arr = []

for (let i = 0; i < 12; i++) {
  arr[i] = [];
  for (let j = 0; j < 29; j++) {
    const loader = new GLTFLoader();
    loader.load('0Blue.glb', function (gltf) {
      //scene.add(gltf.scene);
      model = gltf.scene;
      arr[i][j] = model;
      model.rotation.x = 1.5;
      model.rotation.y = 0;
      model.rotation.z = 0;
      model.scale.set(.15, .35, .15);
      model.position.x = -42 + (3 * j);
      model.position.y = 22 - (4 * i);
    }, undefined, function (error) {
      console.error(error);
    });
  }
}

//arr[5][5].rotation.x = 10;

function gen1(x, y, z){
  let model2;
  const loader = new GLTFLoader();
  loader.load('Ones.glb', function (gltf) {
    scene.add(gltf.scene);
    model2 = gltf.scene;
    model2.scale.set(.15, .35, .15);
    model2.rotation.x = 1.5; 

    model2.position.x = x;
    model2.position.y = y;
    model2.position.z = z;

  }, undefined, function (error) {
    console.error(error);
  });
  return model2;
}

function gen0(x, y, z){
  let model2;
  const loader = new GLTFLoader();
  loader.load('0Blue.glb', function (gltf) {
    scene.add(gltf.scene);
    model2 = gltf.scene;
    model2.scale.set(.15, .35, .15);
    model2.rotation.x = 1.5; 

    model2.position.x = x;
    model2.position.y = y;
    model2.position.z = z;

  }, undefined, function (error) {
    console.error(error);
  });
  return model2;
}

function randFlip(){
  for(let i = 0; i < 12; i++){
    for(let j = 0; j < 29; j++){
      //scene.remove(arr[i][j]);
      if(THREE.MathUtils.randFloatSpread(1)> 0){
        arr[i][j] = gen1(arr[i][j].position.x -1, arr[i][j].position.y + 4, arr[i][j].position.z);
      }else{
        arr[i][j] = gen0(-42 + (3 * j),  22 - (4 * i), 0);
      }
    }
  }
}

// RENDER START ----------------------------

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  /*arr[0][0].rotation.y = 1;
  arr[0][0].rotation.x += 0;
  arr[0][0].rotation.z += 0;*/

  if(new Date().getSeconds() % 5 == 0) randFlip();

  //model.lookAt(camera.position);
  //model.rotation.z += 0.005;
  //model.rotation.x += 0.005;
  //model.rotation.y += 0.005;
  box.rotation.z -= 0.012;
}

let clock = new THREE.Clock();
const speed = 2; //units a second
let delta = 0;

render();
function render(){

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

animate();

// RENDER END ----------------------------