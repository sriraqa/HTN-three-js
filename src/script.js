import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/normal_map.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects (base)
const geometry1 = new THREE.PlaneGeometry( 20, 20 );
const sphereGeometry = new THREE.SphereBufferGeometry(2, 64, 64)
const coneGeometry = new THREE.ConeBufferGeometry(2, 4, 64, 64)
const boxGeometry = new THREE.BoxBufferGeometry(2, 2)
const cylinderGeometry = new THREE.CylinderBufferGeometry(2, 2, 4, 64)
const textGeometry = new THREE.TextBufferGeometry('Hello', 3)

var buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};

// Materials (skin)

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
// material.normalMap = normalTexture
material.color = new THREE.Color(0x1d98b2)

// Mesh (ties together object and material)
const plane = new THREE.Mesh(geometry1, material);
scene.add(plane)

// const radius = gui.radius;

// const sphere1 = gui.addFolder('Sphere 1')
// sphere1.add(sphere, 'radius').min(1).max(4).step(0.01)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(-20, -20, 50)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(50, 50, 50)
pointLight2.intensity = 2
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xffffff
}

light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light1Color.color)
    })

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

const sphere = new THREE.Mesh(sphereGeometry,material)
const cone = new THREE.Mesh(coneGeometry,material)
const box = new THREE.Mesh(boxGeometry,material)
const cylinder = new THREE.Mesh(cylinderGeometry,material)
const text = new THREE.Mesh(textGeometry,material)

function onButtonClick(event) {
    if(event.target.id == 'sphere')
    {
        scene.add(sphere)
    }
    else if(event.target.id == 'cone')
    {
        scene.add(cone)
    }
    else if(event.target.id == 'box')
    {
        scene.add(box)
    }
    else if(event.target.id == 'cylinder')
    {
        scene.add(cylinder)
    }
    else if(event.target.id == 'text')
    {
        scene.add(text)
    }
    else if(event.target.id == 'clear')
    {
        while (scene.children.length > 4) {
            scene.remove(scene.children[scene.children.length - 1]);
        }
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

document.addEventListener('mousemove', onDocumentMouseMove)

const a = new THREE.Vector3(0, 0, 0);

sphere.position.x = 0
sphere.position.y = 0
sphere.position.z = 0

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

let clicked = false

var vec = new THREE.Vector3(); // create once and reuse
var pos = new THREE.Vector3(); // create once and reuse

function checkFunction() {
    material.color = new THREE.Color(0xffffff)
}

function onDocumentMouseMove(event) {
    // mouseX = ( event.clientX / window.innerWidth ) * 2 - 1
    // mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1
}

const updateSphere = (event) => {
    if(clicked == false)
    {
        // vec.set(
        //     ( event.clientX / window.innerWidth ) * 2 - 1,
        //     - ( event.clientY / window.innerHeight ) * 2 + 1,
        //     0.5 );
        
        // vec.unproject( camera );
        
        // vec.sub( camera.position ).normalize();
        
        // var distance = ( targetZ - camera.position.z ) / vec.z;
        
        // pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );

        mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
        mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8
    
        sphere.position.x = mouseX
        sphere.position.y = mouseY
        sphere.position.z = 0
    }
}

const updateBox = (event) => {
    if(clicked == false)
    {
        mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
        mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8
    
        box.position.x = mouseX
        box.position.y = mouseY
        box.position.z = 0
    }
}

const clickSphere = (event) => {
    mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
    mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8

    console.log('x', mouseX)
    console.log('y', mouseY)

    if(clicked == false)
    {    
        sphere.position.x = mouseX
        sphere.position.y = mouseY
        sphere.position.z = 0
    }

    clicked = true
}

const clickBox = (event) => {
    mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
    mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8

    console.log('x', mouseX)
    console.log('y', mouseY)

    if(clicked == false)
    {    
        box.position.x = mouseX
        box.position.y = mouseY
        box.position.z = 0
    }

    clicked = true
}

window.addEventListener('mousemove', updateSphere)
window.addEventListener('click', clickSphere)
window.addEventListener('mousemove', updateBox)
window.addEventListener('click', clickBox)

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