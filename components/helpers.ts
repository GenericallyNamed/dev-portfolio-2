function positionsEqual(arr1:number[], arr2:number[]):boolean {
    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i] - 0.0004 > arr2[i] || arr1[i] + 0.004 < arr2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {Array} text text to be converted
 * @param {Element} elem where text will go
 */
 function createText(text:string,elem:any):void {
    var container = [];
    for(var i = 0; i < text.length; i++) {
        var create = function(i:number) {
            let container = document.createElement("div");
            container.innerHTML = text[i];
            elem.appendChild(container);
            container.style.animation = "reveal_up 1s ease";
            container.style.animationDelay = i * 0.03 + "s";
            container.style.animationFillMode = "both";
        }
        setTimeout(create, i * 0, i);
    }

}

function posEqual(pos1:{x:number, y:number, z:number}, pos2:{x:number, y:number, z:number}):boolean {
    if(pos1.x != pos2.x) {
        return false;
    }
    if(pos1.y != pos2.y) {
        return false;
    }
    if(pos1.z != pos2.z) {
        return false;
    }
    return true;
}

function valuesEqual(var1:number, var2:number):boolean {
    if(var1 - 0.0004 > var2 || var1 + 0.004 < var2) {
        return false;
    }
    return true;
}

/**
     * 
     * @param {Float} a 
     * @param {Float} b 
     * @param {Float} t value between 0 and 1 (convert x- or y-values) 
     * @returns {Float} interpolated value
     */
function Lerp(a:number, b:number, t:number) {
    return a + (b - a) * t;
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



export { positionsEqual, createText, posEqual, valuesEqual, Lerp, smoothstep, smootherstep, smootheststep }