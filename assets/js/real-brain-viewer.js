import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const canvas = document.getElementById("brainCanvas");
const stage = canvas.closest(".brain-stage");
const loading = document.getElementById("brainLoading");
const state = document.getElementById("brainState");
const resetButton = document.getElementById("brainReset");
const spinButton = document.getElementById("brainSpin");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100);

scene.add(new THREE.HemisphereLight(0xffffff, 0xeef2ff, 2.55));
const key = new THREE.DirectionalLight(0xffffff, 3.35);
key.position.set(4, 6, 7);
scene.add(key);
const fill = new THREE.DirectionalLight(0xe8f3ff, 1.25);
fill.position.set(-5, 1, 3);
scene.add(fill);

const root = new THREE.Group();
root.rotation.y = -0.25;
root.position.set(0, 0, 0);
scene.add(root);

const model = new THREE.Group();
root.add(model);

function extras(o) {
  if (o.userData && o.userData.bx_cat != null) return o.userData;
  if (o.parent && o.parent.userData && o.parent.userData.bx_cat != null) return o.parent.userData;
  return o.userData || {};
}

function cortexMaterial() {
  return new THREE.ShaderMaterial({
    vertexColors: true,
    side: THREE.FrontSide,
    toneMapped: false,
    vertexShader: `
      varying vec3 vColor;
      varying vec3 vNormalV;
      void main() {
        vColor = color;
        vNormalV = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying vec3 vNormalV;
      void main() {
        vec3 N = normalize(vNormalV);
        vec3 L = normalize(vec3(0.35, 0.62, 1.0));
        float d = max(dot(N, L), 0.0);
        float relief = 0.80 + 0.20 * d;
        vec3 c = vColor * relief;
        gl_FragColor = vec4(c, 1.0);
      }
    `
  });
}

// Neon tractography-inspired RGB palette.
// video = blue, audio = green, text = red.
// These are illustrative modality weights, not measured neural activity.
const MODAL_COLORS = {
  video: new THREE.Color("#0057FF"),
  audio: new THREE.Color("#00FF78"),
  text:  new THREE.Color("#FF245F"),
  neutral: new THREE.Color("#F6F8FF")
};

function gaussian(value, center, sigma) {
  const d = (value - center) / sigma;
  return Math.exp(-0.5 * d * d);
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function functionalLabelBoost(labelRaw = "") {
  const label = String(labelRaw).toLowerCase();

  let video = 0;
  let audio = 0;
  let text = 0;

  // Visual-biased posterior cortex.
  if (
    label.includes("occipital") ||
    label.includes("calcarine") ||
    label.includes("cuneus") ||
    label.includes("lingual") ||
    label.includes("occipitotemporal") ||
    label.includes("fusiform")
  ) video += 0.75;

  // Auditory-biased superior/transverse temporal cortex.
  if (
    label.includes("superior temporal") ||
    label.includes("transverse temporal") ||
    label.includes("heschl") ||
    label.includes("temporal plane")
  ) audio += 0.85;

  // Language/text-biased left fronto-temporo-parietal regions.
  if (
    label.includes("inferior frontal") ||
    label.includes("opercular") ||
    label.includes("triangular") ||
    label.includes("angular") ||
    label.includes("supramarginal") ||
    label.includes("middle temporal")
  ) text += 0.65;

  return { video, audio, text };
}

function applyIllustrativeMultimodalColors(meshes, bounds) {
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const half = new THREE.Vector3(
    Math.max(size.x * 0.5, 1e-6),
    Math.max(size.y * 0.5, 1e-6),
    Math.max(size.z * 0.5, 1e-6)
  );

  const world = new THREE.Vector3();
  const local = new THREE.Vector3();
  const modal = new THREE.Color();

  meshes.forEach(mesh => {
    // Clone so each anatomical mesh can own its color attribute safely.
    mesh.geometry = mesh.geometry.clone();
    const geometry = mesh.geometry;
    const pos = geometry.getAttribute("position");
    if (!pos) return;

    mesh.updateWorldMatrix(true, false);

    const ex = extras(mesh);
    const label = ex.bx_label || mesh.name || "";
    const side = ex.bx_side || "";
    const labelBoost = functionalLabelBoost(label);

    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      local.fromBufferAttribute(pos, i);
      world.copy(local).applyMatrix4(mesh.matrixWorld);

      // Z-Anatomy model axes:
      // +X = anatomical left, +Y = posterior, +Z = superior.
      const x = (world.x - center.x) / half.x;
      const y = (world.y - center.y) / half.y;
      const z = (world.z - center.z) / half.z;

      // Broad illustrative territories rather than hard parcels.
      let video =
        0.14 +
        0.95 * gaussian(y, 0.72, 0.42) *
        gaussian(z, 0.00, 0.88);

      let audio =
        0.13 +
        0.95 * gaussian(Math.abs(x), 0.72, 0.30) *
        gaussian(y, 0.04, 0.50) *
        gaussian(z, -0.30, 0.42);

      // +X is left in this model. Text is intentionally left-biased,
      // with both frontal and temporo-parietal lobes represented.
      const leftBias = 0.25 + 0.75 * sigmoid(4.5 * x);
      let text =
        0.12 +
        leftBias * (
          0.66 * gaussian(y, -0.52, 0.42) * gaussian(z, 0.03, 0.60) +
          0.55 * gaussian(y,  0.10, 0.48) * gaussian(z, -0.12, 0.50)
        );

      // Anatomical label metadata gently reinforces the intended regions.
      video += labelBoost.video;
      audio += labelBoost.audio;
      text  += labelBoost.text * (side === "left" ? 1.0 : 0.38);

      const total = Math.max(video + audio + text, 1e-6);

      // Sharpen the dominant modality so the surface reads more like
      // saturated DTI / tractography RGB while retaining smooth mixtures.
      let wv = Math.pow(video / total, 1.28);
      let wa = Math.pow(audio / total, 1.28);
      let wt = Math.pow(text  / total, 1.28);
      const sharpTotal = Math.max(wv + wa + wt, 1e-6);
      wv /= sharpTotal;
      wa /= sharpTotal;
      wt /= sharpTotal;

      modal.setRGB(
        MODAL_COLORS.video.r * wv + MODAL_COLORS.audio.r * wa + MODAL_COLORS.text.r * wt,
        MODAL_COLORS.video.g * wv + MODAL_COLORS.audio.g * wa + MODAL_COLORS.text.g * wt,
        MODAL_COLORS.video.b * wv + MODAL_COLORS.audio.b * wa + MODAL_COLORS.text.b * wt
      );

      colors[i * 3 + 0] = modal.r;
      colors[i * 3 + 1] = modal.g;
      colors[i * 3 + 2] = modal.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    mesh.material = cortexMaterial();
  });
}

const draco = new DRACOLoader();
draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

const loader = new GLTFLoader();
loader.setDRACOLoader(draco);

// Production deployment provides ./models/brain.glb.
// The upstream fallback keeps the file inspectable before the local asset is fetched.
const MODEL_URLS = [
  "./models/brain.glb",
  "https://itayinbarr.github.io/brainproject/models/brain.glb"
];

let cortexMeshes = [];
let loadedModel = false;

async function tryLoad(index = 0) {
  if (index >= MODEL_URLS.length) {
    console.error("Brain model could not load");
    state.textContent = "ERROR";
    return;
  }

  loader.load(
    MODEL_URLS[index],
    gltf => {
      model.clear();
      model.add(gltf.scene);
      cortexMeshes = [];

      gltf.scene.traverse(o => {
        if (!o.isMesh) return;
        const ex = extras(o);
        const cat = ex.bx_cat || "other";
        const side = ex.bx_side || "median";

        // The GLB contains many anatomical systems. This design intentionally
        // shows cortex only, keeping the page visually minimal.
        o.visible = cat === "cortex";

        if (o.visible) {
          cortexMeshes.push(o);
          o.castShadow = false;
          o.receiveShadow = false;
        }
      });

      if (!cortexMeshes.length) {
        console.error("Cortex metadata not found");
        state.textContent = "ERROR";
        return;
      }

      // Center on cortex and scale it exactly as a stage object.
      const core = new THREE.Box3();
      cortexMeshes.forEach(m => core.expandByObject(m));

      // Apply the three-way Video / Audio / Text blend directly to cortical vertices.
      applyIllustrativeMultimodalColors(cortexMeshes, core);

      const center = core.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      const radius = core.getBoundingSphere(new THREE.Sphere()).radius || 1;
      model.scale.setScalar(1.46 / radius);

      // Z-Anatomy exports anterior toward +Z; turn anterior toward camera.
      model.rotation.y = Math.PI;

      loading.hidden = true;
      state.textContent = "V/A/T";
      loadedModel = true;
      resetView();
    },
    undefined,
    err => {
      console.warn("Brain load failed:", MODEL_URLS[index], err);
      tryLoad(index + 1);
    }
  );
}

const target = new THREE.Vector3(0, 0, 0);
const spherical = new THREE.Spherical(7.45, Math.PI / 2.22, 0.50);
const goal = spherical.clone();

let dragging = false;
let lastX = 0;
let lastY = 0;
let autoRotate = true;

function applyCamera() {
  const offset = new THREE.Vector3().setFromSpherical(spherical);
  camera.position.copy(target).add(offset);
  camera.lookAt(target);
}

function resetView() {
  goal.set(7.45, Math.PI / 2.22, 0.50);
  spherical.copy(goal);
  root.rotation.y = -0.25;
  autoRotate = true;
  spinButton.textContent = "PAUSE";
  applyCamera();
}

stage.addEventListener("pointerdown", e => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  autoRotate = false;
  spinButton.textContent = "SPIN";
  try { stage.setPointerCapture(e.pointerId); } catch (_) {}
});

stage.addEventListener("pointermove", e => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  goal.theta -= dx * 0.006;
  goal.phi = Math.max(0.18, Math.min(Math.PI - 0.18, goal.phi - dy * 0.006));
});

function endDrag(e) {
  dragging = false;
  try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
}
stage.addEventListener("pointerup", endDrag);
stage.addEventListener("pointercancel", endDrag);

stage.addEventListener("wheel", e => {
  e.preventDefault();
  autoRotate = false;
  spinButton.textContent = "SPIN";
  goal.radius = Math.max(3.0, Math.min(13, goal.radius * (1 + e.deltaY * 0.0009)));
}, { passive:false });

resetButton.addEventListener("click", resetView);
spinButton.addEventListener("click", () => {
  autoRotate = !autoRotate;
  spinButton.textContent = autoRotate ? "PAUSE" : "SPIN";
});

function resize() {
  const rect = stage.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function frame() {
  requestAnimationFrame(frame);
  resize();

  if (autoRotate && loadedModel && !dragging) {
    goal.theta += 0.0019;
  }

  spherical.radius += (goal.radius - spherical.radius) * 0.11;
  spherical.phi += (goal.phi - spherical.phi) * 0.11;

  let dTheta = goal.theta - spherical.theta;
  while (dTheta > Math.PI) dTheta -= Math.PI * 2;
  while (dTheta < -Math.PI) dTheta += Math.PI * 2;
  spherical.theta += dTheta * 0.11;

  applyCamera();
  renderer.render(scene, camera);
}

window.addEventListener("resize", resize);
resetView();
tryLoad();
frame();
