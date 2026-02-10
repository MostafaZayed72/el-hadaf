<template>
  <div ref="containerRef" class="fixed inset-0 -z-10 opacity-30"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationFrameId: number

// Create circle texture for particles
function createCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)
  
  return new THREE.CanvasTexture(canvas)
}

onMounted(() => {
  if (!containerRef.value) return

  // Setup Scene
  scene = new THREE.Scene()
  
  // Setup Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 50

  // Setup Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  // Create Particles (Stock Market Data Points)
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 3000
  const posArray = new Float32Array(particlesCount * 3)
  const colorArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 100
    posArray[i + 1] = (Math.random() - 0.5) * 100
    posArray[i + 2] = (Math.random() - 0.5) * 100

    // Color (Gold theme)
    const isGold = Math.random() > 0.5
    if (isGold) {
      colorArray[i] = 0.77 // R
      colorArray[i + 1] = 0.63 // G
      colorArray[i + 2] = 0.22 // B
    } else {
      colorArray[i] = 0.6
      colorArray[i + 1] = 0.6
      colorArray[i + 2] = 0.8
    }
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3)
  )
  particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colorArray, 3)
  )

  // Particle Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    map: createCircleTexture()
  })

  // Create Points
  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  // Create Connecting Lines (Network Effect)
  const linesGeometry = new THREE.BufferGeometry()
  const linePositions: number[] = []
  
  for (let i = 0; i < 50; i++) {
    const x1 = (Math.random() - 0.5) * 80
    const y1 = (Math.random() - 0.5) * 80
    const z1 = (Math.random() - 0.5) * 80
    
    const x2 = x1 + (Math.random() - 0.5) * 20
    const y2 = y1 + (Math.random() - 0.5) * 20
    const z2 = z1 + (Math.random() - 0.5) * 20
    
    linePositions.push(x1, y1, z1, x2, y2, z2)
  }

  linesGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(linePositions, 3)
  )

  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0xC5A038,
    transparent: true,
    opacity: 0.15,
  })

  const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
  scene.add(lines)

  // Animation
  let mouseX = 0
  let mouseY = 0

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('mousemove', handleMouseMove)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    // Rotate particles slowly
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005
    
    // Rotate lines
    lines.rotation.y -= 0.0008
    lines.rotation.x -= 0.0003

    // Mouse interaction
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }

  animate()

  // Handle Resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', handleResize)

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(animationFrameId)
    
    if (containerRef.value && renderer.domElement) {
      containerRef.value.removeChild(renderer.domElement)
    }
    
    renderer.dispose()
    particlesGeometry.dispose()
    particlesMaterial.dispose()
    linesGeometry.dispose()
    linesMaterial.dispose()
  })
})
</script>
