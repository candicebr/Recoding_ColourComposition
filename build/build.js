var gui = new dat.GUI();
var params = {
    Nb_Rosace: 8,
    Line_Size: 200,
    RandomSeed: 0,
    Variation: 6,
    MethodNoise: false,
    Texture: false,
    Download_Image: function () { return save(); },
};
gui.add(params, "RandomSeed", 0, 20, 1);
gui.add(params, "Nb_Rosace", 0, 25, 1);
gui.add(params, "Line_Size", 0, 500, 1);
gui.add(params, "Variation", 0, 15, 1);
gui.add(params, "MethodNoise");
gui.add(params, "Texture");
gui.add(params, "Download_Image");
function draw() {
    background(223, 195, 227);
    randomSeed(params.RandomSeed);
    if (params.Texture) {
        for (var i = 0; i < 25000; i++) {
            var x1 = random(width);
            var y1 = random(height);
            var theta = random(2 * PI);
            var segmentLength = random(5);
            var x2 = cos(theta) * segmentLength + x1;
            var y2 = sin(theta) * segmentLength + y1;
            stroke(223 - random(5), 195 - random(10), 227 - random(10), random(100, 255));
            line(x1, y1, x2, y2);
        }
    }
    if (params.MethodNoise)
        methodNoise();
    else
        methodConditions();
}
function methodConditions() {
    var palette = ['#eb4034', '#a81b11', '#123a80', '#18608c'];
    for (var i = 0; i < params.Nb_Rosace; i++) {
        var pos_X = random(width);
        var pos_Y = random(height);
        var Rayon_Exterieur = random(60, params.Line_Size);
        var Rayon_Interieur = random(30, Rayon_Exterieur - 10);
        var Line_Density = random(150, 600);
        var variation_X = random(-Rayon_Exterieur / 4, Rayon_Exterieur / 4);
        var variation_Y = random(-Rayon_Exterieur / 4, Rayon_Exterieur / 4);
        var color_1 = random(palette);
        var variation_exterieur = 0;
        var variation_interieur = 0;
        var variation_exterieur2 = 0;
        var variation_interieur2 = 0;
        for (var i_1 = 0; i_1 <= Line_Density / 2; i_1++) {
            var angle1 = TWO_PI / Line_Density * i_1;
            var angle2 = TWO_PI / Line_Density * (Line_Density - i_1);
            if (variation_exterieur <= 0)
                variation_exterieur += random(0, params.Variation);
            else if (variation_exterieur > params.Variation * 8)
                variation_exterieur -= random(0, params.Variation);
            else
                variation_exterieur += random(-params.Variation, params.Variation);
            if (variation_interieur <= 0)
                variation_interieur += random(0, params.Variation);
            else if (variation_interieur >= Rayon_Interieur - params.Variation * 2)
                variation_interieur -= random(0, params.Variation);
            else
                variation_interieur += random(-params.Variation, params.Variation);
            if (variation_exterieur2 <= 0)
                variation_exterieur2 += random(0, params.Variation);
            else if (variation_exterieur2 > params.Variation * 8)
                variation_exterieur2 -= random(0, params.Variation);
            else
                variation_exterieur2 += random(-params.Variation, params.Variation);
            if (variation_interieur2 <= 0)
                variation_interieur2 += random(0, params.Variation);
            else if (variation_interieur2 >= Rayon_Interieur - params.Variation * 2)
                variation_interieur2 -= random(0, params.Variation);
            else
                variation_interieur2 += random(-params.Variation, params.Variation);
            if (i_1 >= (Line_Density / 2) - 10) {
                variation_interieur2 = (variation_interieur + variation_interieur2) / 2;
                variation_exterieur2 = (variation_exterieur + variation_exterieur2) / 2;
            }
            stroke(color_1);
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur) * cos(angle1), pos_Y + variation_Y + (Rayon_Interieur - variation_interieur) * sin(angle1), pos_X + (Rayon_Exterieur + variation_exterieur) * cos(angle1), pos_Y + (Rayon_Exterieur + variation_exterieur) * sin(angle1));
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur2) * cos(angle2), pos_Y + variation_Y + (Rayon_Interieur - variation_interieur2) * sin(angle2), pos_X + (Rayon_Exterieur + variation_exterieur2) * cos(angle2), pos_Y + (Rayon_Exterieur + variation_exterieur2) * sin(angle2));
        }
    }
}
function methodNoise() {
    var palette = ['#eb4034', '#a81b11', '#123a80', '#18608c'];
    for (var i = 0; i < params.Nb_Rosace; i++) {
        var pos_X = random(width);
        var pos_Y = random(height);
        var Rayon_Exterieur = random(60, params.Line_Size);
        var Rayon_Interieur = random(30, Rayon_Exterieur - 10);
        var Line_Density = random(150, 600);
        var variation_X = random(-Rayon_Exterieur / 4, Rayon_Exterieur / 4);
        var variation_Y = random(-Rayon_Exterieur / 4, Rayon_Exterieur / 4);
        var color_2 = random(palette);
        for (var i_2 = 0; i_2 <= Line_Density; i_2++) {
            var angle1 = TWO_PI / Line_Density * i_2;
            var variation_interieur = map(noise(i_2 * (params.Variation * 0.01)), 0, 1, 0, 30);
            var variation_exterieur = map(noise(i_2 * (params.Variation * 0.01)), 0, 1, 0, 70);
            stroke(color_2);
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur) * cos(angle1), pos_Y + variation_Y + (Rayon_Interieur - variation_interieur) * sin(angle1), pos_X + (Rayon_Exterieur + variation_exterieur) * cos(angle1), pos_Y + (Rayon_Exterieur + variation_exterieur) * sin(angle1));
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map