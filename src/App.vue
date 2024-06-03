<template>
  <header></header>
  <main
    class="relative font-body bg-100-auto w-[99vw] overflow-x-hidden min-h-[100vh]"
    :style="{ 'background-image': isMode2 || isMode3 ? `url(/background-desktop.jpg)` : '' }"
  >
    <section class="h-[100vh] w-[100vw] absolute top-0">
      <div ref="canvasContainer" class="canvas-container fixed top-0"></div>
      <div
        ref="transitionContainer"
        class="w-[100vw] h-[88vh] bg-black absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 flex justify-center items-center overflow-hidden"
        :class="{
          'w-[90vw] left-0 lg:ml-0 rounded-3xl lg:rounded-l-none lg:h-[70vh] transition-all':
            isMode2,
          '!h-[100vh] !w-[100vw]': isMode3
        }"
      >
        <div
          id="secondCanvasContainer"
          ref="secondCanvasContainer"
          class="second-canvas-container opacity-20 w-full h-full"
          :class="{'absolute top-0 left-0 w-full h-full': isMode3}"
        ></div>
      </div>
    </section>

    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import * as THREE from 'three'

const route = useRoute()

const isMode1 = computed(() => route.path === '/')
const isMode2 = computed(() => route.path === '/projets/default')
const isMode3 = computed(() => route.path === '/projets/1')

console.log(route.path, 'ici')

const canvasContainer = ref<HTMLDivElement | null>(null)
const secondCanvasContainer = ref<HTMLDivElement | null>(null)
const transitionContainer = ref<HTMLDivElement | null>(null)
const clock = new THREE.Clock()
const secondClock = new THREE.Clock()
const mouse = new THREE.Vector2()

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
    uniform vec2 u_mouse; // Uniform for mouse position
    
    // Function to generate a pseudo-random value
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(0.070,0.140))) * 0.13);
    }
    
    void main() {
      // Get the normalized coordinates of the fragment
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Convert mouse position to screen coordinates
      vec2 mouse = u_mouse / u_resolution;
      
      // Influence of mouse position on wave effect
      float mouseInfluence = length(mouse - st) * 0.5;
      
      // Random variation of wave speed
      float waveSpeed = 0.136 + random(st) * 0.2 + mouseInfluence;
      
      // Wave effect with variable speed
      float wave = sin(st.y * 4.648 + u_time * waveSpeed) * 0.988;
      
      // Calculate current column index with wave effect
      float col = floor((st.x + wave) * 8.264);
      
      // Determine if column index is even or odd
      float checker = mod(col, 1.616);
      
      // Distance to nearest black column for shadow
      float distToBlack = min(abs(mod(st.x + wave, 2.608 / 9.040) - 1.0 / 8.520), abs(mod(st.x + wave, 2.672 / 9.600)));
      
      // Shadow intensity with variation
      float shadowIntensity = smoothstep(-0.040, 1.712 / 10.192, distToBlack) * (0.8 + random(st) * 0.4);
      
      // Color with variation
      vec3 color = (checker < 1.0) ? vec3(0.0,0.0,0.0) : vec3(0.941,0.995,0.976) * shadowIntensity; // Change 0.040 to 0.0 for pure black
      
      // Color variation for white areas
      color += random(st) * 1.490;
      
      // Apply a reddish tint
      float tintStrength = -0.260; // Adjust to increase or decrease tint strength
      vec3 tint = vec3(1.0, 0.5, 0.5); // Reddish tint
      color = mix(color, tint, tintStrength);
      
      // Set final color
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

const animateTransition = () => {
  if (transitionContainer.value) {
    if (isMode2.value) {
      gsap.to(transitionContainer.value, { width: '90vw', height: '70vh', duration: 0.5 })
    } else if (isMode3.value) {
      gsap.to(transitionContainer.value, { width: '100vw', height: '100vh', duration: 0.5 })
    } else {
      gsap.to(transitionContainer.value, { width: '100vw', height: '88vh', duration: 0.5 })
    }
  }
}

watch([isMode2, isMode3], animateTransition)

const onWindowResize = () => {
  if (canvasContainer.value && secondCanvasContainer.value) {
    // Resize first canvas
    const firstContainer = canvasContainer.value
    const firstWidth = firstContainer.clientWidth
    const firstHeight = firstContainer.clientHeight
    const firstCanvas = firstContainer.querySelector('canvas')
    if (firstCanvas) {
      firstCanvas.style.width = `${firstWidth}px`
      firstCanvas.style.height = `${firstHeight}px`
    }

    // Resize second canvas
    const secondContainer = secondCanvasContainer.value
    const secondWidth = secondContainer.clientWidth
    const secondHeight = secondContainer.clientHeight
    const secondCanvas = secondContainer.querySelector('canvas')
    if (secondCanvas) {
      secondCanvas.style.width = `${secondWidth}px`
      secondCanvas.style.height = `${secondHeight}px`
    }

    // Update resolution uniform for the second canvas shader
    const material = secondCanvas.material
    if (material) {
      material.uniforms.u_resolution.value.set(secondWidth, secondHeight)
    }
  }
}

const onMouseMove = (event: MouseEvent) => {
  mouse.x = event.clientY / 2
  mouse.y = event.clientX / 2
}

onMounted(() => {
  initFirstCanvas()
  initSecondCanvas()
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('mousemove', onMouseMove)
  animateTransition()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>


<style>
/* Ensure the container takes up the full available space */
.canvas-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* Prevent scrolling */
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

/* Define the opacity fluctuation animation */
@keyframes fluctuateOpacity2 {
  0%,
  100% {
    opacity: 0.08;
    /* Minimum opacity */
  }

  50% {
    opacity: 0.03;
    /* Maximum opacity */
  }
}

/* Define the opacity fluctuation animation */
@keyframes fluctuateOpacity {
  0%,
  100% {
    opacity: 0.2;
    /* Minimum opacity */
  }

  50% {
    opacity: 0.03;
    /* Maximum opacity */
  }
}

/* Second canvas container centered */
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

/* Additional style for full-screen mode */
.second-canvas-container.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>


