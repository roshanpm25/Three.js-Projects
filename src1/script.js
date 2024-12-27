import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';       //OrbitControls in Three.js is a utility that allows the user to interact with the camera by rotating, zooming, and panning around a target object using the mouse
import * as dat from 'dat.gui';
import image from './image.png';
import i2 from './i2.png';


const renderer= new THREE.WebGLRenderer();  // 3js uses a tool to allocate a space on webpage to animate 3d space

renderer.setSize(window.innerWidth,window.innerHeight);     //to set the size of that space, take full height and width of window

document.body.appendChild(renderer.domElement);         // inject the canvas(element ) into the page


renderer.shadowMap.enabled = true;

//Parcel this bundle --> a jist folder is created which is used to run the server


//CREATE a SCENE for CAMERA

const scene=new THREE.Scene();              // Creates a new scene, which acts as a container for all 3D objects, lights, and cameras in your project.

const camera1=new THREE.PerspectiveCamera(      //PerspectiveCamera: Mimics the way the human eye perceives depth.
    45,                                         //The field of view, controlling how wide the camera's view is. Values typically range between 40 and 80.
    window.innerWidth/window.innerHeight,       //aspect size of canvas
    0.1,                                        //near objects closer than this distance are not rendered. 
    1000                                        //far view objects farther than this distance are not rendered.
);

const helper=new THREE.AxesHelper(5);           //tool which introduces a 3d object --> Adds a visual helper to the scene, showing the X, Y, and Z axes. -- The argument 5 specifies the size (length) of each axis in the 3D space.
scene.add(helper);                              

// camera1.position.z=3;                           //moving the cameras
// camera1.position.y=1;


camera1.position.set(35,20,35);

renderer.render(scene,camera1);                 //Tells Three.js to draw the scene (scene) from the perspective of the specified camera (camera1).


/**--------------------------------SHAPE 1 --------------------------------------------------- */


const box=new THREE.BoxGeometry();                                          //Creates a cube or rectangular box geometry.  --> box skeleton
const material=new THREE.MeshBasicMaterial({color: 0x00FF00});              //Creates a basic material with a green color  --> meshBasicMatrial doesnt use more packages
const boxgeo=new THREE.Mesh(box,material);                                  //Combines the geometry (box) and material (material) into a single renderable object (boxgeo).   --> Mesh is an 3d object created usimg 3d software 
scene.add(boxgeo);

renderer.render(scene,camera1);             //The renderer.render() function converts this 3D data into a 2D image that can be displayed on the screen 
//The first argument (scene) tells the renderer which scene to render.
//The second argument (camera1) tells the renderer which camera's perspective to use when rendering the scene.


let step=0;
let speed=0.01;

function animate()
{
    boxgeo.rotation.x+=0.02;
    boxgeo.rotation.y+=0.01;


    //shere bounce code 

    step+=colors.speed;
    spheregeo2.position.y=10 * Math.abs(Math.sin(step));

    spheregeo3.position.y=15 * Math.abs(Math.sin(step));

    renderer.render(scene,camera1); 


    
}



/*
    It uses radians (not degrees) to measure angles. For example:
0 radians = 0 degrees.
𝜋
π radians ≈ 180 degrees.
2
𝜋
2π radians = 360 degrees (full rotation).

Incrementing this value (+= 0.02) gradually rotates the box a little more in each frame
*/

//-------------------------------------ANGLE CONTROLLER---------------------------------------------------

const orbit=new OrbitControls(camera1,renderer.domElement);         //domElement is the HTML element that listens for user interactions (like mouse movements or touch gestures) to control the camera.
orbit.update();
// it ensures the camera and controls are synchronized with any changes to the camera's position or target.

//--------------------------------------SHAPE 2------------------------------------------------------



const plane= new THREE.PlaneGeometry(30,30);
const pmaterial=new THREE. MeshBasicMaterial({
    color:0xFFFFFF,
    side: THREE.DoubleSide                                  // so plane isvisible all three sides

});
const planegeo= new THREE.Mesh(plane,pmaterial);
planegeo.rotation.x=-0.5*Math.PI;
scene.add(planegeo);

const gridhelper=new THREE.GridHelper(30);                  //to know how the plane must actully be placed
scene.add(gridhelper); 

/*
    Math.PI is the value of π (approximately 3.14159 radians), which represents 180 degrees in radians.
    Multiplying by -0.5 gives -90 degrees in radians.
    A negative value rotates the object clockwise around the X-axis when viewed from the side. */


//-------------------------------------SHAPE 3 ------------------------------------------------------------------

const sphere= new THREE.SphereGeometry(4,10,10);      // number of segments , 4 refers to the radius
const smaterial=new THREE. MeshBasicMaterial({ 
    color:0x0000FF,
    wireframe:true  
   });
const spheregeo= new THREE.Mesh(sphere,smaterial);

const sphere2= new THREE.SphereGeometry(4);      //4 refers to the radius
const smaterial2=new THREE. MeshBasicMaterial({ color:0x00FFFF });
const spheregeo2= new THREE.Mesh(sphere2,smaterial2);

scene.add(spheregeo);

spheregeo2.position.set(-9, 8, 0);       //change the position
scene.add(spheregeo2);


//------------------------------------------CHANGE COLORS ON SPHERE 2--------------------------------------

const gui=new dat.GUI();                    //creating user interface controls. The gui object will display on the screen and allow you to interact with properties, such as changing colors or adjusting values.
const colors={
    sphereColor:'#ffea00' ,      //initial color for the sphere, 
    wire:true,
    speed
};

gui.addColor(colors,'sphereColor').onChange(function(e){    
    spheregeo2.material.color.set(e);
// The addColor method specifically creates a color input control where the user can pick a color
// .onChange() is an event handler that listens for any changes to the color picked by the user in the color picked, e contains new color
   
})
//--------------------------------------------  CHECK BOX ---------------------------------------------------------


gui.add(colors,'wire').onChange(function(e){
    spheregeo2.material.wireframe = e;
})

//----------------------------------------------SPEED OF BOUNCE ---------------------------------------------------------------------------

gui.add(colors,'speed',0,0.1);

//---------------------------------------------- LIGHT ------------------------------------------------------------------------------



const plane2= new THREE.PlaneGeometry(30,30);
const pmaterial2=new THREE. MeshStandardMaterial({
    color:0xFFFFFF,
    side: THREE.DoubleSide                                  
});
const planegeo2= new THREE.Mesh(plane2,pmaterial2);
planegeo2.rotation.x=-0.5*Math.PI;

planegeo2.receiveShadow=true;   //

scene.add(planegeo2);
planegeo2.position.set(19, 3,0); 

const gridhelper2=new THREE.GridHelper(30);                  //to know how the plane must actully be placed
scene.add(gridhelper2); 


const sphere3= new THREE.SphereGeometry(4);      //4 refers to the radius
const smaterial3=new THREE. MeshStandardMaterial({ color:0xFFFFFF });
const spheregeo3= new THREE.Mesh(sphere3,smaterial3);

spheregeo3.position.set(15, 7, 8);       //change the position

spheregeo3.castShadow=true;

scene.add(spheregeo3);



//  const ambientlight=new THREE.AmbientLight(0x123456);
// scene.add(ambientlight);

 const directionallight=new THREE.DirectionalLight(0xFF00FF,2.8);

directionallight.castShadow=true;

 scene.add(directionallight);


// const dlighthelper=new THREE.DirectionalLightHelper(directionallight,5);
// scene.add(dlighthelper);
 directionallight.position.set(12,12,3);
// //The helper consists of a line that represents the direction the light is pointing
// //The bright side of an object is the part that is facing toward the light source or exposed to direct light.


// --------------------------- FOG ----------------------------------------

scene.fog=new THREE.Fog(0xFFFFFF,0,200);

// // //---------------------------------------------- SHADOWS ---------------------------------------------------------------------------


const dshadowhelper=new THREE.CameraHelper(directionallight.shadow.camera);
scene.add(dshadowhelper);

directionallight.shadow.camera.Bottom=-12;
// should show the full shadow but now coming right now

//------------------------------------------------------ SPOTLIGHT --------------------------------------------------



// const sphere4= new THREE.SphereGeometry(4);      //4 refers to the radius
// const smaterial4=new THREE. MeshStandardMaterial({ color:0xFFFFFF});
// const spheregeo4= new THREE.Mesh(sphere4,smaterial4);
// spheregeo4.position.set(22, 9, -8);       //change the position
//  spheregeo4.castShadow=true;
// scene.add(spheregeo4);
// //

// const spotlight=new THREE.SpotLight(0xFFFFFF);
// spotlight.position.set(-100, 100, 0);
// scene.add(spotlight);
// spotlight.castShadow=true;

// //

// const plane2= new THREE.PlaneGeometry(30,30);
// const pmaterial2=new THREE. MeshStandardMaterial({
//     color:0xFFFFFF,
//     side: THREE.DoubleSide                                  
// });
// const planegeo2= new THREE.Mesh(plane2,pmaterial2);
// planegeo2.rotation.x=-0.5*Math.PI;

// planegeo2.receiveShadow=true;   //

// scene.add(planegeo2);
// planegeo2.position.set(15, 3,0); 

// const gridhelper2=new THREE.GridHelper(30);                  //to know how the plane must actully be placed
// scene.add(gridhelper2); 


//------------------------------------------- BACKGROUND ----------------------------------------


//bg color  renderer.setClearColor(0xfffff)

const texture=new THREE.TextureLoader();
 scene.background=texture.load(i2);


 //-----------------------------------------------TO SET 6 SIDES WITH IMAGES ------------------------------

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
   image,image,
    i2,i2,i2,i2
]);


//---------------------------------------------BOX -------------------------------------------------------------


const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
    // color: 0x00FF00,
    map: texture.load(i2)
});
const box2=new THREE.Mesh(box2Geometry,box2Material);
scene.add(box2);
box2.position.set(0,15,10);



renderer.setAnimationLoop(animate);
renderer.render(scene,camera1); 

//------------------------------------ WINDOW RESIZE PROBLEM-------------------------------

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});