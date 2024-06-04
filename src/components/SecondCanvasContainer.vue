<template>
  <div ref="secondCanvasContainer" class="second-canvas-container opacity-20 w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const secondCanvasContainer = ref<HTMLDivElement | null>(null)
const secondClock = new THREE.Clock()
const mouse = new THREE.Vector2()

const initSecondCanvas = () => {
  if (!secondCanvasContainer.value) return

  const container = secondCanvasContainer.value
  const width = container.clientWidth
  const height = container.clientHeight
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(width, height)
  renderer.domElement.classList.add('second-canvas')
  container.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader: `void main() {
      gl_Position = vec4(position, 1.0);
    }`,
    fragmentShader: `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(0.070,0.140))) * 0.13);
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 mouse = u_mouse / u_resolution;
      float mouseInfluence = length(mouse - st) * 0.5;
      float waveSpeed = 0.136 + random(st) * 0.2 + mouseInfluence;
      float wave = sin(st.y * 4.648 + u_time * waveSpeed) * 0.988;
      float col = floor((st.x + wave) * 8.264);
      float checker = mod(col, 1.616);
      float distToBlack = min(abs(mod(st.x + wave, 2.608 / 9.040) - 1.0 / 8.520), abs(mod(st.x + wave, 2.672 / 9.600)));
      float shadowIntensity = smoothstep(-0.040, 1.712 / 10.192, distToBlack) * (0.8 + random(st) * 0.4);
      vec3 color = (checker < 1.0) ? vec3(0.0,0.0,0.0) : vec3(0.941,0.995,0.976) * shadowIntensity;
      color += random(st) * 1.490;
      float tintStrength = -0.260;
      vec3 tint = vec3(1.0, 0.5, 0.5);
      color = mix(color, tint, tintStrength);
      gl_FragColor = vec4(color, 0.408);
    }
    `,
    uniforms: {
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_time: { value: 0.0 },
      u_mouse: { value: mouse }
    }
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  camera.position.z = 1

  const animate = () => {
    material.uniforms.u_time.value = secondClock.getElapsedTime()
    material.uniforms.u_mouse.value = mouse
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

const onWindowResize = () => {
  if (secondCanvasContainer.value) {
    const container = secondCanvasContainer.value
    const width = container.clientWidth
    const height = container.clientHeight
    const canvas = container.querySelector('canvas')
    if (canvas) {
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    const material = canvas.material
    if (material) {
      material.uniforms.u_resolution.value.set(width, height)
    }
  }
}

const onMouseMove = (event: MouseEvent) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
}

onMounted(() => {
  initSecondCanvas()
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style >
.second-canvas-container {
  overflow: hidden;
  position: absolute;
  background-color: black;
}

canvas.second-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
