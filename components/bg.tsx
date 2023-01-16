import * as THREE from 'three';
import { Wave } from './wave';
import { positionsEqual, posEqual, valuesEqual, Lerp, smoothstep, smootherstep, smootheststep } from './helpers';
import { PerlinNoise } from './perlin';

export const unusedExport = "this is just here to disable fast refresh hopefully";

var scene:THREE.Scene;


function moveWave() {
    wave.updateWave();
    setTimeout(function(){
        moveWave();
    }, 100)
}


function arraysEqual(arr1:any[], arr2:any[]) {
    for(var i = 0; i < arr1.length; i++) {
        for(var j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j].value != arr2[i][j].value) return false;
        }
    }
    return true;
}

function generateWaveSequence(wave:Wave, arr:PerlinNoise[], i:number):PerlinNoise[] {
    for(var i = 0; i < 129; i++) {
        arr[i]  = new PerlinNoise(wave.dims.sW, wave.dims.sH, wave.blockDim, wave.scale, wave.complexity, i, i);
    }
    return arr;
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}



var landingDisplay:any;
var dRenderer:any;
var renderer:any,
    camera:any,
    canvas:any,
    dCamera:any,
    specialCanvas:HTMLCanvasElement;
setTimeout(() => {
    specialCanvas = document.querySelector("#special-canvas") as HTMLCanvasElement;
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, canvas: specialCanvas});
    // renderer.setClearColor(0x080808,0);
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
    dCamera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    canvas = renderer.domElement;
    dRenderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    landingDisplay = {
        init: function() {
            landingDisplay.scene.add();
            
        },
        scene: new THREE.Scene(),
        camera: new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 ),
        yPlane: new THREE.Mesh(new THREE.PlaneGeometry(10,10,30,30), new THREE.MeshBasicMaterial({color:"red",wireframe:true})),
        canvas: dRenderer.domElement,
        container: document.querySelector("#centerPiece")
    };
}, 20);
var wave:Wave = new Wave(250,250,64,64,35), spotLight2:any;
var scene:THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color(0x080808);
var waveIndex:number = 1;

function animate(){
    if((document as any).positionsLoaded == true) {
        if(!positionsEqual(wave.wavePositions(), (wave?.waveSequence[waveIndex] as PerlinNoise).valueArray()) && wave.transition != true) {
            wave.transition = true;
            wave.startPos = wave.wavePositions();
            wave.expectedPos = wave.waveSequence[waveIndex].valueArray();
            wave.increment = 0;
        } else if(wave.transition == true && !positionsEqual(wave.wavePositions(), wave.expectedPos)) {
            var newPositions = new Float32Array(wave.geometry.attributes.position.array.length);
            wave.increment += 0.001;
            if(wave.increment >= 1) {
                wave.increment = 1;
            }
            for(var i = 0; i < wave.expectedPos.length; i++) {
                if(wave.increment == 1) {
                    newPositions[i*3 + 2] = wave.expectedPos[i];
                } else {
                    newPositions[i*3 + 2] = Lerp(wave.startPos[i], wave.expectedPos[i], smootherstep(wave.increment));
                }
                newPositions[i*3] = wave.geometry.attributes.position.array[i*3];
                newPositions[i*3 + 1] = wave.geometry.attributes.position.array[i*3 + 1];
            }
            wave.geometry.setAttribute("position", new THREE.BufferAttribute(newPositions, 3));
        } else if(positionsEqual(wave.wavePositions(), wave.expectedPos) && wave.transition == true) {
            wave.transition = false;
            waveIndex++;
            if(waveIndex > 128) waveIndex = 0;
        }
    }
    if(spotLight2.raiseLight == true && !valuesEqual(spotLight2.intensity, spotLight2.targetIntensity)) {
        spotLight2.intensity += spotLight2.increment;
        spotLight2.distance += spotLight2.distanceIncrement;
    }
    if(!posEqual(wave.plane.position, wave.position.expectedPos) && wave.position?.transition == false) {
        wave.position.transition = true;
        wave.position.startPos = wave.plane.position;
        wave.position.increment = 0;
    } else if(wave.position?.transition == true && !posEqual(wave.plane.position, wave.position?.expectedPos!)) {
        wave.position.increment += 0.004;
        if(wave.position?.increment! > 1) {
            wave.position.increment = 1;
        }
        wave.plane.position.set(Lerp(wave.position.startPos.x, wave.position.expectedPos.x, smoothstep(wave.position.increment)),Lerp(wave.position.startPos.y, wave.position.expectedPos.y, smoothstep(wave.position.increment)),Lerp(wave.position.startPos.z, wave.position.expectedPos.z, smootherstep(wave.position.increment)))
    } else if(wave.position?.transition == true && posEqual(wave.plane.position, wave.position.expectedPos)) {
        wave.position.transition = false;
        wave.position.increment = 0;
    }
    setTimeout(() => {
        requestAnimationFrame(animate);
    },10);
    // requestAnimationFrame(animate);
    renderer.clear();
    renderer.render(scene, camera);
}

var pointLight:any;

function WaveBG(wave:Wave) {
    if((document! as any).positionsLoaded == true) return;
    var dScene = new THREE.Scene();
    var three_parent = document.querySelector("#index-bg");
    
    console.log("erasing existing objects");
    while(scene!.children.length > 0){ 
        scene!.remove(scene!.children[0]); 
    }
    //creating animate entity

    
    /**
     * checklist:
     * 1. import three.js
     * 2. create the scene
     * 3. create the renderer
     * 4. create the camera (and position)
     * 5. add elements to scene
     * 6. render
     */
    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    renderer.setSize( window.innerWidth, window.innerHeight );


    camera.position.set(0, -10, 150);

    var yPlane = new THREE.Mesh(new THREE.PlaneGeometry(10,10,30,30), new THREE.MeshBasicMaterial({color:"red",wireframe:true}));
    scene.add(wave.plane);
    wave.plane.position.set(0, 0, 0);
    wave.plane.rotation.x = Math.PI * -0.4;
    wave.plane.rotation.z = Math.PI * 0;
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300, 30, 30), new THREE.MeshStandardMaterial({color:"red",wireframe:true}));
    plane.rotation.x = Math.PI * -0.42;
    plane.position.set(0, -70, 90);
    var testCube = new THREE.Mesh(new THREE.BoxGeometry(30,30,30), new THREE.MeshBasicMaterial({color:"blue"})),
        rectangleLight = new THREE.RectAreaLight("red",10,100,100),
        ambience = new THREE.AmbientLight("rgb(20,20,20)",-15),
        fog:any = new THREE.Fog("#080808",0.5,1);
        
    pointLight = new THREE.PointLight("rgb(200,200,200)", 35, 2000, 100);
    spotLight2 = new THREE.SpotLight("rgb(200,200,200)",10, 200, 90, 90, 1);
    // scene.add(spotLight2);
    scene.add(ambience);
    scene.add(pointLight);
    // scene.add(yPlane);
    yPlane.position.set(0, 0, 100);

    // scene.add(testCube);
    testCube.position.set(0, 40, -100);
    spotLight2.position.set(0, 100, 120);
    pointLight.position.set(0, 40, 0);


    // wave.waveSequence = new PerlinNoise[];
    spotLight2.targetDistance = spotLight2.distance;
    spotLight2.targetIntensity = spotLight2.intensity;
    spotLight2.raiseTiming = 100;
    spotLight2.increment = spotLight2.intensity / spotLight2.raiseTiming;
    spotLight2.intensity = 0;
    spotLight2.distanceIncrement = spotLight2.distance / spotLight2.raiseTiming;
    spotLight2.distance = 0;

    var sequencePromise = (wave:Wave) => {
        return new Promise((resolve, reject) => {
            let arr = new Array(129),
                i = 0;
            const sequence = generateWaveSequence(wave,arr, i);
            resolve(sequence);
        })
    }

    var indexPromise = (wave:Wave, index:number) => {
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                const grid = (new PerlinNoise(wave.dims.sW, wave.dims.sH, wave.blockDim, wave.scale, wave.complexity, index + 25, index + 25));
                resolve({grid:grid, index:index});
            },0);

        });
    }


    wave.waveLoop = {
        gen: function(){
            setTimeout(function(){
                indexPromise(wave, wave.waveLoop.i)
                .then((grid:any) => {
                    wave.waveSequence[grid.index] = grid.grid;
                    console.log('completed');
                });
                wave.waveLoop.i += 1;
                if(wave.waveLoop.i < 129) {
                    wave.waveLoop.gen();
                }
                else {
                    console.log("done");
                    (document as any).positionsLoaded = true;
                }
            }, 1);
        },
        i: 0
    }
    if(wave?.position) {
        wave.position = {
            increment:0,
            currentPos: wave.plane.position,
            expectedPos: wave.plane.position,
            startPos:new THREE.Vector3(undefined, undefined, undefined),
            transition: false,
        }
    }

    // three_parent!.appendChild(canvas);
    // for(var i = 0; i < 129; i++) {
    //     var index = i;
    //     const grid:any = (new PerlinNoise(wave.dims.sW, wave.dims.sH, wave.blockDim, wave.scale, wave.complexity, index + 25, index + 25));
    //     wave.waveSequence[i] = grid;
    //     console.log("completed");
    // }
    (document as any).positionsLoaded = false;
    // wave.waveLoop.gen();
    console.log("run");
    wave.waveLoop.gen();

    // animate();
    wave.setOffsetX(-50);
    window.addEventListener("resize", onWindowResize);
    animate();
    (document as any).animationLoaded = true;
        
    
}

export { WaveBG, wave, pointLight }