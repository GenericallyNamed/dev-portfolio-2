import * as THREE from 'three'
import { PerlinNoise } from './perlin';

type dims = {
    w:number,
    h:number,
    sW:number,
    sH:number
};

class Wave {
    constructor(w:number, h:number, sW:number, sH:number, scale:number) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = scale;
        this.dims = {
            w: w,
            h: h,
            sW: sW,
            sH: sH
        };
        this.position = {
            increment:0,
            currentPos: new THREE.Vector3(undefined, undefined, undefined),
            expectedPos: new THREE.Vector3(undefined, undefined, undefined),
            transition:false,
            startPos:new THREE.Vector3(undefined, undefined, undefined),
        }
        this.startPos = new Array();
        this.waveSequence = new Array(129);
        this.transition = false;
        this.increment = 0;
        this.geometry = new THREE.PlaneGeometry(w, h, sW, sH); 
        this.blockDim = 64;
        this.complexity = 16;
        // this.material = new THREE.MeshBasicMaterial({
        //     vertexColors:true
        // })
        this.material = new THREE.MeshStandardMaterial({
            color:"#202020",
            metalness:1.2,
            wireframe:false
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.wireframe = new THREE.WireframeGeometry(this.geometry);
        this.sequenceID = 0;
        // this.sequence = this.createWaveSequence();
        this.expectedPos = this.wavePositions();
    }

    setOffsetX(x:number) {
        this.offsetX = x;
        this.perlin = new PerlinNoise(this.dims.sW, this.dims.sH, this.blockDim, this.scale, this.complexity, this.offsetX, this.offsetY);
        this.expectedPos = this.perlin.valueArray();
    }

    setOffsetY(y:number) {
        this.offsetY = y;
        this.perlin = new PerlinNoise(this.dims.sW, this.dims.sH, this.blockDim, this.scale, this.complexity, this.offsetX, this.offsetY);
        this.expectedPos = this.perlin.valueArray();
    }

    setComplexity(c:number) {
        this.complexity = c;
        this.perlin = new PerlinNoise(this.dims.sW, this.dims.sH, this.blockDim, this.scale, this.complexity, this.offsetX, this.offsetY);
        this.expectedPos = this.perlin.valueArray();
    }

    setScale(s:number) {
        this.scale = s;
        this.perlin = new PerlinNoise(this.dims.sW, this.dims.sH, this.blockDim, this.scale, this.complexity, this.offsetX, this.offsetY);
        this.expectedPos = this.perlin.valueArray();
    }

    // createWaveSequence() {

    // }

    wavePositions() {
        let arr = [];
        for(var i = 0; i < this.geometry.attributes.position.count; i++) {
            arr.push(this.geometry.attributes.position.array[i*3 + 2]);
        }
        return arr;
    }

    updateWave() {
        this.startPos = this.wavePositions();
        this.offsetX++;
        this.offsetY++;
        /**
         * @todo add control for other dims
         */
        this.perlin = new PerlinNoise(this.dims.sW, this.dims.sH, this.blockDim, this.scale, this.complexity, this.offsetX, this.offsetY);
        this.expectedPos = this.perlin.valueArray();
    }

    getVertexCoordinates() {
        let pos = this.geometry.attributes.position.array,
            row_width = this.dims.sW + 1,
            col_height = this.dims.sH + 1,
            grid:{x:number, y:number, z:number}[][] = [];
        
        for(var i = 0; i < col_height; i++) {
            grid[i] = [];
            for(var j = 0; j < row_width; j++) {
                grid[i][j] = {
                    x: pos[(i + j) * 3],
                    y: pos[(i + j) * 3 + 1],
                    z: pos[(i + j) * 3 + 2]
                }
            }
        }
        return grid;
    }

    offsetX:number;
    offsetY:number;
    scale:number;
    blockDim:number;
    complexity:number;
    startPos:number[];
    dims:dims;
    position: { increment: number; currentPos: THREE.Vector3; expectedPos: THREE.Vector3; transition: boolean; startPos:THREE.Vector3; };

    perlin:PerlinNoise | undefined;
    waveSequence:PerlinNoise[];
    waveLoop:any;
    transition:boolean;
    increment:number;
    geometry:THREE.BufferGeometry;
    material:THREE.MeshStandardMaterial;
    plane:THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
    wireframe:THREE.WireframeGeometry;
    sequenceID:number;
    expectedPos:number[];
}

export { Wave }