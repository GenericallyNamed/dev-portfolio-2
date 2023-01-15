import { Lerp } from "./helpers";

const permutationTable:number[][] = [
    [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225], 
    [140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148],
    [247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32],
    [57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175],
    [74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122],
    [60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54],
    [65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169],
    [200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64], 
    [52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212],
    [207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213],
    [119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9], 
    [129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104], 
    [218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241], 
    [81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157], 
    [184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93], 
    [222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
];

const permutationTable2:number[] = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 18
];

class PerlinNoise {
    scale: number;
    blockDim: number;
    width: number;
    height: number;
    complexity: number;
    dX: number;
    dY: number;
    grid: any[][];

    /**
     * 
     * @param {Integer} w 
     * @param {Integer} h
     * @param {Integer} bD 
     * @param {Float} scale 
     * @param {Integer} c 
     * @param {Float} offsetX 
     * @param {Float} offsetY 
     */
    constructor(width:number, height:number, blockDim:number, scale:number, complexity:number, offsetX:number, offsetY:number) {
        this.scale = scale;
        this.blockDim = blockDim;
        this.width = (width % blockDim != 0) ? (width + (blockDim - width % blockDim)) : width;
        this.height = (height % blockDim != 0) ? (height + (blockDim - height % blockDim)) : height;
        this.complexity = complexity;
        this.dX = offsetX;
        this.dY = offsetY;
        this.grid = new Array(this.height + 1);
        this.generateGrid();
    }

    /**
     * @purpose generates a random vector
     * @returns 
     */
    createVector() {
        let rad = Math.random() * Math.PI;
        return [Math.cos(rad), Math.sin(rad)];
    }

    // getPermutation(i) {
    //     return (i >= permutationTable2.length) ? 
    //         permutationTable2[i % permutationTable2.length] : permutationTable2[i];
    // }

    getPermutation(x:number, y:number) {
        return permutationTable[(16 + (Math.round(y) % 16)) % 16][(16 + (Math.round(x) % 16)) % 16];
    }

    permutationToVector(d:number) {
        return [Math.cos((d / 360) * (2 * Math.PI)), Math.sin((d / 360) * (2 * Math.PI))];
    }

    generateGrid() {
        for(var k = 0; k < this.complexity; k++) {
            let factor = this.complexity - k,
                blockDim = this.blockDim / factor;
            for(var i = 0; i < this.grid.length; i++) {
                if(this.grid[i] == undefined) this.grid[i] = new Array(this.width + 1);
                for(var j = 0; j < this.grid[i].length; j++) {
                    let _x = j + ((factor % 2 != 0) ? this.dX : (this.dX)),
                        _y = i + ((factor % 2 != 0) ? this.dY : (this.dY)),
                        offsets = {
                            tL: [((_x < 0) ? ((_x % blockDim == 0) ? 0 : blockDim + (_x % blockDim)) : (_x % blockDim)) / blockDim, -(((_y < 0) ? blockDim + (_y % blockDim) : (_y % blockDim)) / blockDim)],
                            tR: [-1 * (1 - (((_x < 0) ? ((_x % blockDim == 0) ? 0 : blockDim + (_x % blockDim)) : (_x % blockDim)) / blockDim)), -(((_y < 0) ? blockDim + (_y % blockDim) : (_y % blockDim)) / blockDim)],
                            bL: [((_x < 0) ? ((_x % blockDim == 0) ? 0 : blockDim + (_x % blockDim)) : (_x % blockDim)) / blockDim, 1 - ((_y < 0) ? blockDim + (_y % blockDim) : (_y % blockDim)) / blockDim],
                            bR: [-1 * (1 - (((_x < 0) ? ((_x % blockDim == 0) ? 0 : blockDim + (_x % blockDim)) : (_x % blockDim)) / blockDim)), 1 - ((_y < 0) ? blockDim + (_y % blockDim) : (_y % blockDim)) / blockDim]
                        },
                        gradients = {
                            tL: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + ((_y < 0) ? -1 : 0))),
                            tR: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + 1 + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + ((_y < 0) ? -1 : 0))),
                            bL: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + 1 + ((_y < 0) ? -1 : 0))),
                            bR: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + 1 + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + 1 + ((_y < 0) ? -1 : 0)))
                        },
                        dotProducts = {
                            tL: this.dotProduct(offsets.tL, gradients.tL),
                            tR: this.dotProduct(offsets.tR, gradients.tR),
                            bL: this.dotProduct(offsets.bL, gradients.bL),
                            bR: this.dotProduct(offsets.bR, gradients.bR)
                        },
                        value = (this.scale / factor) * Lerp(
                            Lerp(dotProducts.tL, dotProducts.tR, smoothstep((_x % blockDim) / blockDim)),
                            Lerp(dotProducts.bL, dotProducts.bR, smoothstep((_x % blockDim) / blockDim)),
                            smoothstep((_y % blockDim) / blockDim)
                        );
                        // value = (this.s / factor) * lerp(
                        //     lerp(dotProducts.tL, dotProducts.tR, smoothstep(Math.abs((_x % blockDim) / blockDim))),
                        //     lerp(dotProducts.bL, dotProducts.bR, smoothstep(Math.abs((_x % blockDim) / blockDim))),
                        //     smoothstep(Math.abs((_y % blockDim) / blockDim))
                        // );
                    value = (this.grid[i][j] == undefined) ? value : this.grid[i][j].value + value;
                    if(_x == -8 && _y == 0) {
                        console.log("test");
                    }
                    if(isNaN(value)) {
                        console.log("tes");
                    }
                    this.grid[i][j] = {
                        value: value,
                        gradients: gradients,
                        offsets: offsets,
                        x: _x,
                        y: _y,
                        bd: blockDim
                    }
                }
            }
        }
        
    }
    
    // generateGrid(x, y) {

    // }

    

    // advanceSequence(sequence, index, x, y, dX, dY) {
    //     for(var i = 0; i < this.grid.length; i++) {
    //         if(this.grid[i] == undefined) this.grid[i] = new Array(this.w + 1);
    //         for(var j = 0; j < this.grid[i].length; j++) {

    //         }
    //     }
    // }

    getValue(_x:number, _y:number) {
        let blockDim = this.blockDim,
            offsets = {
                tL: [(_x % blockDim) / blockDim, (-1 * (_y % blockDim))],
                tR: [(blockDim - (_x % blockDim)) / blockDim * -1, -1 * (_y % blockDim)],
                bL: [(_x % blockDim) / blockDim, 1 - ((_y % blockDim) / blockDim)],
                bR: [(blockDim - (_x % blockDim)) / blockDim * -1, 1 - ((_y % blockDim) / blockDim)]
            },
            gradients = {
                tL: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + ((_y < 0) ? -1 : 0))),
                tR: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + 1 + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + ((_y < 0) ? -1 : 0))),
                bL: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + 1 + ((_y < 0) ? -1 : 0))),
                bR: this.permutationToVector(this.getPermutation((((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) - ((_x % blockDim == 0 && _x < 0) ? _x + 1 : _x) % blockDim) / blockDim + 1 + ((_x < 0) ? -1 : 0), (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) - (((_y % blockDim == 0 && _y < 0) ? _y + 1 : _y) % blockDim)) / blockDim + 1 + ((_y < 0) ? -1 : 0)))
            },
            dotProducts = {
                tL: this.dotProduct(offsets.tL, gradients.tL),
                tR: this.dotProduct(offsets.tR, gradients.tR),
                bL: this.dotProduct(offsets.bL, gradients.bL),
                bR: this.dotProduct(offsets.bR, gradients.bR)
            },
            value = this.scale * Lerp(
                Lerp(dotProducts.tL, dotProducts.tR, smoothstep((_x % blockDim) / blockDim)),
                Lerp(dotProducts.bL, dotProducts.bR, smoothstep((_x % blockDim) / blockDim)),
                smoothstep(_y % blockDim) / blockDim
            );
        return {
            value:value,
            offsets:offsets,
            gradients:gradients,
            dotProducts:dotProducts
        };
    }

    // calcValue(point) {      
    //     let offsets = point.offsets,
    //         gradients = point.gradients,
    //         dotProducts = {
    //             tL: this.dotProduct(offsets.tL, gradients.tL),
    //             tR: this.dotProduct(offsets.tR, gradients.tR),
    //             bL: this.dotProduct(offsets.bL, gradients.bL),
    //             bR: this.dotProduct(offsets.bR, gradients.bR)
    //         },
    //         value = (this.scale / factor) * lerp(
    //             lerp(dotProducts.tL, dotProducts.tR, smoothstep(Math.abs((_x % blockDim) / blockDim))),
    //             lerp(dotProducts.bL, dotProducts.bR, smoothstep(Math.abs((_x % blockDim) / blockDim))),
    //             smoothstep(Math.abs((_y % blockDim) / blockDim))
    //         );
    //     return value;
    // }

    valueArray() {
        let arr:any[] = [];
        for(var i = 0; i < this.grid.length; i++) {
            arr = arr.concat(this.grid[i]);
        }
        for(var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].value;
        }
        return arr;
    }

    dotProduct(arr1:number[], arr2:number[]) {
        let sum = 0;
        for(var i = 0; i < arr1.length; i++) {
            sum += (arr1[i] * arr2[i]);
        }
        return sum;
    }

    toString() {
        let result = "";
        for(var i = 0; i < this.grid.length; i++) {
            for(var j = 0; j < this.grid[i].length; j++) {
                if(this.grid[i][j].value.toString().length > 5) {
                    result += this.grid[i][j].value.toString().substring(0, 5)
                }
                else {
                    result += this.grid[i][j].value;
                }
                if(j != this.grid[i].length - 1) {
                    result += ",";
                }
            }
            if(i != this.grid.length - 1) {
                result += ",";
            }
        }
        return result;
    }

}

function getGridPos(x:number, y:number, w:number, h:number) {
    let pos = 0;
    return pos;
}

/**
 * 
 * @param {Float} t dimension value between 0 and 1 
 * @returns {Float} value appropriate for smooth transition
 */
function smoothstep(t:number) {
    (t < 0) ? t = 1 - Math.abs(t) : t = t;
    return t * t * (3 - 2 * t);
}

function smootherstep(t:number) {
    return 6 * (t * t * t * t * t) - 15 * (t * t * t * t) + 10 * (t * t * t);
}

/**
 * @purpose custom smoothstep sigmoid-based function. note that it is only bound by approximately 0 and 1.
 * @param {*} t 
 * @returns smoothed value
 */
function smootheststep(t:number) {
    return 1/(1 + 0.5 * (Math.pow(Math.E, (-13 * t + 7))));
}

export { PerlinNoise }