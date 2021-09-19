import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/normal_map.jpg')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects (base)
const geometry1 = new THREE.PlaneGeometry( 20, 20 );
const sphereGeometry = new THREE.SphereBufferGeometry(1, 64, 64)
const coneGeometry = new THREE.ConeBufferGeometry(1, 2, 64, 64)
const boxGeometry = new THREE.BoxBufferGeometry(2, 2)
const cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 64)
const textGeometry = new THREE.TextBufferGeometry('Hello', 3)

var buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};

// Materials (skin)

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
// material.normalMap = normalTexture
material.color = new THREE.Color(0x6998cc)

// Mesh (ties together object and material)
const plane = new THREE.Mesh(geometry1, material);
scene.add(plane)

// const radius = gui.radius;

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(3.9, -10, 2.86)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(-10, -8.46, 2.86)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(10, -6.47, 4.45)
scene.add(pointLight3) 

const pointLight4 = new THREE.PointLight(0xffffff, 2)
pointLight4.position.set(0.37, 8.75, 2)
scene.add(pointLight4)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const cuboidXLocation = [];
const cuboidYLocation = [];
let cuboidZHeight = [];
var index1 = 0;

let zPosition = 2;

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.set(0,-15,8); // Set position like this
camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this
scene.add(camera)

let objOnScreen = false;
let clickState = 0; //initial state

function onButtonClick(event) {
    if(event.target.id == 'box') {
        const box = new THREE.Mesh(boxGeometry,material)
        scene.add(box)
        objOnScreen = true;
        clickState = 1; //spawned item
    }
    else if(event.target.id == 'sphere') {
        const sphere = new THREE.Mesh(sphereGeometry,material)
        scene.add(sphere)
        // const sphereFolder = gui.addFolder('Sphere')
        // sphereFolder.add(sphereGeometry.parameters, 'radius').min(0.1).max(4).step(0.1)
        // sphereFolder.open();
        objOnScreen = true;
        clickState = 1;
    }
    else if(event.target.id == 'cone') {
        const cone = new THREE.Mesh(coneGeometry,material)
        scene.add(cone)
        objOnScreen = true;
        clickState = 1;
    }
    else if(event.target.id == 'cylinder') {
        const cylinder = new THREE.Mesh(cylinderGeometry,material)
        scene.add(cylinder)
        objOnScreen = true;
        clickState = 1;
    }
    else if(event.target.id == 'text') {
        const text = new THREE.Mesh(textGeometry,material)
        scene.add(text)
        objOnScreen = true;
        clickState = 1;
    }
    else if(event.target.id == 'clear') {
        while (scene.children.length > 6) {
            scene.remove(scene.children[scene.children.length - 1]);
        }
        objOnScreen = false;
        clickState = 0;
        cuboidXLocation.length = 0;
        cuboidYLocation.length = 0;
        cuboidZHeight.length = 0;
        zPosition = 2;
        index1 = 0;
    }
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

 var angle = 0;
 var radius = 500; 
 
 function animate() {
 // Use Math.cos and Math.sin to set camera X and Z values based on angle. 
 camera.position.x = radius * Math.cos( angle );  
 camera.position.z = radius * Math.sin( angle );
 angle += 0.01;
 }

const a = new THREE.Vector3(0, 0, 0);

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

var vec = new THREE.Vector3(); // create once and reuse
var pos = new THREE.Vector3(); // create once and reuse

function checkFunction() {
    material.color = new THREE.Color(0xffffff)
}

// alert(scene.children[])

document.addEventListener('mousemove', onDocumentMouseMove)

function onDocumentMouseMove(event) {

    if(clickState == 2)
    {
        mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
        mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8

        for(let i = (cuboidXLocation.length - 1); i >= 0; i--)
        {
            if ((mouseX > (cuboidXLocation[i] - 2) && mouseX < (cuboidXLocation[i] + 2)) && (mouseY > (cuboidYLocation[i] - 2) && mouseY < (cuboidYLocation[i] + 2)))
            {
                zPosition = 2 + cuboidZHeight[i];
                break;
            }
            else
            {
                zPosition = 2;
            }
          
        }
    
        scene.children[scene.children.length - 1].position.x = mouseX
        scene.children[scene.children.length - 1].position.y = mouseY
        scene.children[scene.children.length - 1].position.z = zPosition
    }
}

document.addEventListener('click', onDocumentClick)

function onDocumentClick(event) {
    if(clickState == 2) //placed object on plane
    {
        mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
        mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8

        // alert(mouseX + ', ' + mouseY)
        cuboidYLocation[index1] = mouseY
        cuboidXLocation[index1++] = mouseX

        if(zPosition > 2)
        {
            if(cuboidZHeight[scene.children.length - 7] == null)
            {
                cuboidZHeight[scene.children.length - 7] = 1;
            }
            cuboidZHeight[scene.children.length - 7] += (zPosition - 2);
        }
        else
        {
            cuboidZHeight[scene.children.length - 7] = 1;
        }

        for(let i = 0; i < cuboidXLocation.length; i++){
            console.log(cuboidXLocation[i]);
        }
        for(let i = 0; i < cuboidYLocation.length; i++){
        console.log(cuboidYLocation[i]);
        }
 
        scene.children[scene.children.length - 1].position.x = mouseX
        scene.children[scene.children.length - 1].position.y = mouseY
        scene.children[scene.children.length - 1].position.z = zPosition

        clickState = 0; //finished state
    }
    else if(clickState == 1) {
        clickState = 2;
    }
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.position.y = mouseY
    // sphere.position.x = mouseX

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()