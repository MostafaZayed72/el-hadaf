<script setup lang="ts">
import * as THREE from 'three'
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()
const container = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number

const objects: { mesh: THREE.Group, speed: number }[] = []

const createCandlestick = (isBullish: boolean) => {
  const group = new THREE.Group()
  
  // Body
  const bodyHeight = Math.random() * 0.5 + 0.2
  const bodyGeometry = new THREE.BoxGeometry(0.15, bodyHeight, 0.05)
  const color = isBullish ? 0x2ecc71 : 0xe74c3c
  const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.2 })
  const body = new THREE.Mesh(bodyGeometry, material)
  
  // Wicks
  const wickHeight = bodyHeight + Math.random() * 0.4
  const wickGeometry = new THREE.BoxGeometry(0.02, wickHeight, 0.02)
  const wick = new THREE.Mesh(wickGeometry, material)
  
  group.add(body)
  group.add(wick)
  
  return group
}

const initThree = () => {
  if (!container.value) return

  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // Create floating candlesticks
  for (let i = 0; i < 40; i++) {
    const isBullish = Math.random() > 0.5
    const mesh = createCandlestick(isBullish)
    
    // Random position
    mesh.position.x = (Math.random() - 0.5) * 15
    mesh.position.y = (Math.random() - 0.5) * 15
    mesh.position.z = (Math.random() - 0.5) * 5
    
    // Random rotation
    mesh.rotation.z = Math.random() * Math.PI
    mesh.rotation.x = Math.random() * Math.PI
    mesh.rotation.y = Math.random() * Math.PI

    scene.add(mesh)
    objects.push({
      mesh,
      speed: Math.random() * 0.005 + 0.002
    })
  }

  animate()
}

const animate = () => {
    animationId = requestAnimationFrame(animate)

    objects.forEach((obj) => {
        obj.mesh.rotation.x += 0.002
        obj.mesh.rotation.y += 0.002
        obj.mesh.position.y -= obj.speed

        if (obj.mesh.position.y < -8) {
            obj.mesh.position.y = 8
            obj.mesh.position.x = (Math.random() - 0.5) * 15
        }
    })

    renderer.render(scene, camera)
}

const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement)
  }
  cancelAnimationFrame(animationId)
  
  // Cleanup Three.js resources
  scene.traverse((object) => {
      if ((object as THREE.Mesh).geometry) (object as THREE.Mesh).geometry.dispose()
      if ((object as THREE.Mesh).material) {
          if (Array.isArray((object as THREE.Mesh).material)) {
              ((object as THREE.Mesh).material as THREE.Material[]).forEach(material => material.dispose())
          } else {
              ((object as THREE.Mesh).material as THREE.Material).dispose()
          }
      }
  })
  renderer.dispose()
})
</script>

<template>
  <div ref="container" class="fixed inset-0 -z-0 pointer-events-none w-full h-full opacity-50 dark:opacity-30"></div>
</template>
