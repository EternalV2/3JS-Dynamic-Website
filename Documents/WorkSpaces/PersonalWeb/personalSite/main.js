import './style.css'

import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
})

//<p><about>About</about> <projects>Projects</projects> <contact>Contact</contact></p>


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);

// SETUP END ----------------------------

// BG BOX ----------------------------
const boxBG = new THREE.BoxGeometry(110, 110, 3);
const boxText = new THREE.TextureLoader().load("G2.png");
const box = new THREE.Mesh(boxBG, new THREE.MeshBasicMaterial({ map: boxText }));
scene.add(box);

// AMBIENT LIGHT ----------------------------
const light = new THREE.AmbientLight({ color: 0xffffff });
scene.add(light);

let arr = [];
let str1 = "000000000000000000000000000000000000000";
let str2 = addSpace(str1);

function decArr() {
    for (let i = 0; i < 13; i++) {
        arr[i] = str1;
    }
}

function addSpace(str) {
    let x = str.split("");
    let rep = "";
    for (let i = 0; i < x.length; i++) {
        rep = rep.concat(new String(x[i] + " "));
    }
    return rep;
}

function genDisplay() {
    let display = "";
    for (let i = 0; i < arr.length; i++) {
        display = display.concat(new String(arr[i] + "\n"));
    }
    //console.log(arr[1]);
    return display;
}
let boolTextRef = false;
let textRef;

function genbitFlip(initialized) {
    if (!initialized) {
        const loader = new FontLoader();

        loader.load("Open_Sans_Bold.json", function (font) {
            const geometry = new TextGeometry((new String(genDisplay())), {
                font: font,
                size: 2,
                height: 1.6
            });

            const textMesh = new THREE.Mesh(geometry, [
                new THREE.MeshPhongMaterial({ color: 0x114163 }),
                new THREE.MeshPhongMaterial({ color: 0x0e3652 }),
            ]);

            textMesh.position.x = -44.6;
            textMesh.position.y = 23;
            textMesh.position.z = 0;
            if (boolTextRef) {
                scene.remove(textRef);
                textRef.geometry.dispose();
                textRef.geometry = null;
            }
            scene.add(textMesh);
            textRef = textMesh;
            boolTextRef = true;
            return;
        })
    }
    else {
        for (let i = 0; i < 13; i++) {
            arr[i] = bitFlip(arr[i])
        }
    }
}

function bitFlip(str) {
    let x = str.split("");
    //console.log(x);
    for (let i = 0; i < x.length; i++) {
        if (THREE.MathUtils.randFloatSpread(2) > 0) {
            if (x[i] === "0") x[i] = "1";
            else x[i] = "0"
        }
    }
    return new String(x.join(" "));
}

// RENDER START ----------------------------
let done = false;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    let now = Math.floor(Date.now() / 1000);

    while (now % 3 == 0 && !done) {
        arr = [];
        decArr();
        genbitFlip(true);
        genbitFlip(false);
        done = true;
    }
    done = false;

    box.rotation.z -= 0.012;
}

render();
function render() {

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

animate();

// RENDER END ----------------------------