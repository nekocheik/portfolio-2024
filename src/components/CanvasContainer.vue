<template>
  <div ref="canvasContainer" class="canvas-container fixed top-0"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)
const clock = new THREE.Clock()

const initFirstCanvas = () => {
  if (!canvasContainer.value) return

  const container = canvasContainer.value
  const width = container.clientWidth
  const height = container.clientHeight
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(width, height)
  renderer.domElement.classList.add('fluctuating-opacity')
  renderer.domElement.classList.add('mode2')
  container.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader: `void main() {
      gl_Position = vec4(position, 1.0);
    }`,
    fragmentShader: `
    uniform float time;
    void main() {
      float x = gl_FragCoord.x * 0.005 + time * 2.0;
      float y = gl_FragCoord.y * 0.005;
      float noise = fract(sin(dot(vec2(x, y), vec2(40.4, 788.233))) * 4999999.5453123);
      float gray = smoothstep(0.45, 0.55, noise);
      gl_FragColor = vec4(vec3(gray), 1.0);
    }
    `,
    uniforms: {
      time: { value: 0.0 }
    }
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  camera.position.z = 1

  const animate = () => {
    material.uniforms.time.value = clock.getElapsedTime()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

const onWindowResize = () => {
  if (canvasContainer.value) {
    const container = canvasContainer.value
    const width = container.clientWidth
    const height = container.clientHeight
    const canvas = container.querySelector('canvas')
    if (canvas) {
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
  }
}

onMounted(() => {
  initFirstCanvas()
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<style>
.canvas-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  position: absolute;
}

canvas.fluctuating-opacity {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: fluctuateOpacity2 10s infinite;
}

canvas.fluctuating-opacity.mode2 {
  animation: fluctuateOpacity2 10s infinite;
}

@keyframes fluctuateOpacity2 {
  0%, 100% {
    opacity: 0.08;
  }
  50% {
    opacity: 0.03;
  }
}
</style>
