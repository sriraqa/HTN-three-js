import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
const geometry2 = new THREE.SphereBufferGeometry(3, 64, 64)

// Materials (skin)

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
// material.normalMap = normalTexture
material.color = new THREE.Color(0x1d98b2)

// Mesh (ties together object and material)
const plane = new THREE.Mesh(geometry1, material);
scene.add(plane)
const sphere = new THREE.Mesh(geometry2,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-0.62, 0.99, 0.47)
pointLight2.intensity = 0.75
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xff0000
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

var camera_pivot = new THREE.Object3D()
var Y_AXIS = new THREE.Vector3( 0, 1, 0 );

scene.add( camera_pivot );
camera_pivot.add( camera );
camera.position.set( 0,-15,8);
camera.lookAt( camera_pivot.position );
camera_pivot.rotateOnAxis( Y_AXIS, 0.01 );    // radians

// camera.position.x = 0
// camera.position.y = 0
// camera.position.z = 1.5
// camera.position.set(0,-15,8); // Set position like this
// camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

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

const clickSphere = (event) => {
    if(clicked == false)
    {
        mouseX = ( event.clientX / window.innerWidth ) * 16 - 8
        mouseY = - ( event.clientY / window.innerHeight ) * 16 + 8
    
        sphere.position.x = mouseX
        sphere.position.y = mouseY
        sphere.position.z = 0
    }

    clicked = true
}

window.addEventListener('mousemove', updateSphere)
window.addEventListener('click', clickSphere)

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