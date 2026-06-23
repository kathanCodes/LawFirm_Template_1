import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.setClearColor(0x000000, 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.8, 5.5)
  camera.lookAt(0, 1.1, 0)

  /* ── MATERIALS ── */
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0xb87333,
    emissiveIntensity: 0.05,
  })

  /* ── LADY JUSTICE ── */
  const justiceGroup = new THREE.Group()
  scene.add(justiceGroup)

  // Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.4, 8), copperMat)
  torso.position.y = 1.2
  justiceGroup.add(torso)

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), copperMat)
  head.position.y = 2.1
  justiceGroup.add(head)

  // Blindfold
  const blindfold = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 8, 24), copperMat)
  blindfold.position.y = 2.12
  blindfold.rotation.x = Math.PI / 2
  blindfold.rotation.z = 0.15
  justiceGroup.add(blindfold)

  // Robe
  const robe = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.0, 12, 1, true), copperMat)
  robe.position.y = 0.3
  justiceGroup.add(robe)

  // Pedestal
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.15, 8), copperMat)
  p1.position.y = -0.25
  justiceGroup.add(p1)
  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.1, 8), copperMat)
  p2.position.y = -0.38
  justiceGroup.add(p2)

  // Left arm
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6), copperMat)
  lArm.position.set(-0.35, 1.65, 0)
  lArm.rotation.z = -Math.PI / 4
  justiceGroup.add(lArm)

  // Right arm
  const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 6), copperMat)
  rArm.position.set(0.3, 1.55, 0)
  rArm.rotation.z = Math.PI / 6
  justiceGroup.add(rArm)

  // ── SCALES ──
  const scalesGroup = new THREE.Group()
  scalesGroup.position.set(-0.7, 1.55, 0)
  justiceGroup.add(scalesGroup)

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 6), copperMat)
  beam.rotation.z = Math.PI / 2
  scalesGroup.add(beam)

  const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), copperMat)
  scalesGroup.add(pivot)

  const panGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.04, 16)

  // Left pan
  const leftPanGroup = new THREE.Group()
  leftPanGroup.position.set(-0.65, 0, 0)
  scalesGroup.add(leftPanGroup)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 4), copperMat)
    c.position.set(Math.cos(a) * 0.08, -0.22, Math.sin(a) * 0.08)
    leftPanGroup.add(c)
  }
  const lPan = new THREE.Mesh(panGeo, copperMat)
  lPan.position.y = -0.46
  leftPanGroup.add(lPan)

  // Right pan
  const rightPanGroup = new THREE.Group()
  rightPanGroup.position.set(0.65, 0, 0)
  scalesGroup.add(rightPanGroup)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 4), copperMat)
    c.position.set(Math.cos(a) * 0.08, -0.22, Math.sin(a) * 0.08)
    rightPanGroup.add(c)
  }
  const rPan = new THREE.Mesh(panGeo, copperMat)
  rPan.position.y = -0.46
  rightPanGroup.add(rPan)

  // ── SWORD ──
  const swordGroup = new THREE.Group()
  swordGroup.position.set(0.55, 1.2, 0)
  swordGroup.rotation.z = 0.15
  justiceGroup.add(swordGroup)

  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.2, 0.01), copperMat)
  blade.position.y = 0.3
  swordGroup.add(blade)

  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.035, 0.04), copperMat)
  guard.position.y = -0.32
  swordGroup.add(guard)

  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.25, 6), copperMat)
  handle.position.y = -0.47
  swordGroup.add(handle)

  const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), copperMat)
  pommel.position.y = -0.62
  swordGroup.add(pommel)

  /* ── LIGHTING — dramatic, minimal ── */
  scene.add(new THREE.AmbientLight(0x111111, 0.5))

  const key = new THREE.DirectionalLight(0xffeedd, 2)
  key.position.set(3, 5, 4)
  scene.add(key)

  const rim = new THREE.PointLight(0xb87333, 3, 10)
  rim.position.set(-2, 3, -3)
  scene.add(rim)

  const spot = new THREE.SpotLight(0xffd4a0, 3, 12, Math.PI / 6, 0.5, 1)
  spot.position.set(0, 6, 3)
  spot.target = torso
  scene.add(spot)

  /* ── ANIMATE ── */
  let time = 0
  let animId

  const animate = () => {
    time += 0.008
    justiceGroup.rotation.y = Math.sin(time * 0.3) * 0.4
    scalesGroup.rotation.z = Math.sin(time * 0.5) * 0.06
    leftPanGroup.rotation.z = -scalesGroup.rotation.z
    rightPanGroup.rotation.z = -scalesGroup.rotation.z
    camera.position.y = 1.8 + Math.sin(time * 0.4) * 0.08
    camera.lookAt(0, 1.1, 0)
    renderer.render(scene, camera)
    animId = requestAnimationFrame(animate)
  }
  animate()

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
  }
}

export default function Preloader({ progress, done }) {
  const canvasRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) cleanupRef.current = createScene(canvasRef.current)
    return () => { if (cleanupRef.current) cleanupRef.current() }
  }, [])

  return (
    <div className={`preloader${done ? ' done' : ''}`}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
