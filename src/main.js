import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

let aspecto = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
  15, //campo de visao vertical 40
  aspecto, //aspecto da imagem (Largura/Altura)
  2, //Plano proximo 0.1
  10//Plano distante 100
);
camera.position.z = 5 //10 5

 //Luz
 var light = new THREE.AmbientLight(0xffffff, 15); //10
 scene.add(light);

 //Ponto de Luz
 var plight = new THREE.PointLight(0xffff00, 30); //100
 plight.position.set(-5, 1, 0); // plight.position.set(-1, 1, 0);
 scene.add(plight);

let model
const modelPath = 'models/donut_obj/' //const modelPath = 'models/ufo/'
const mtlFile = 'Doughnut_OBJ.mtl'
const objFile = 'Doughnut_OBJ.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath)
  .load(mtlFile, (materials) => {
  materials.preload()
  objLoader.setMaterials(materials)
  objLoader.setPath(modelPath).load(objFile, (object) => {
    model = object
    model.scale.setScalar(.95)//90 redimensiona o objeto 55
    model.position.y=-.10 //-.5
    model.rotation.x=.6 //.5
    scene.add(model)
    animate()
  })
})

function animate() {
  renderer.render(scene, camera)
  model.rotation.y += .05 //.05
  requestAnimationFrame(animate)
}

window.addEventListener('mousemove',event=>{
  let wh = window.innerHeight
  let my = event.clientY
  if(model)  model.rotation.x += (my-wh/2)/wh/100
})