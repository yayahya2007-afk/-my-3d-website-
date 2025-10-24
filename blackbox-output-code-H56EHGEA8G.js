// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-scene').appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x001122 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting for premium look
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Position camera
camera.position.z = 5;

// Mouse controls for interaction
const controls = {
    mouseX: 0,
    mouseY: 0
};
document.addEventListener('mousemove', (event) => {
    controls.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    controls.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Interactive tilt based on mouse
    cube.rotation.x += controls.mouseY * 0.1;
    cube.rotation.y += controls.mouseX * 0.1;
    
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});