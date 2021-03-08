var gui = new dat.GUI();
var params = {
    Nb_Rosace: 8,
    Line_Size: 250,
    Line_Density: 200,
    RandomSeed: 0,
    Download_Image: function () { return save(); },
};
gui.add(params, "RandomSeed", 0, 20, 1);
gui.add(params, "Nb_Rosace", 0, 15, 1);
gui.add(params, "Line_Size", 0, 500, 1);
gui.add(params, "Line_Density", 0, 300, 1);
gui.add(params, "Download_Image");
function draw() {
    background(223, 195, 227);
    randomSeed(params.RandomSeed);
    var palette = ['#eb4034', '#a81b11', '#123a80', '#126680'];
    for (var i = 0; i < params.Nb_Rosace; i++) {
        var pos_X = random(width);
        var pos_Y = random(height);
        var Rayon_Exterieur = random(40, params.Line_Size);
        var Rayon_Interieur = random(10, Rayon_Exterieur - 10);
        var Line_Density = random(100, 500);
        var variation_X = random(-Rayon_Exterieur / 3, Rayon_Exterieur / 3);
        var variation_Y = random(-Rayon_Exterieur / 3, Rayon_Exterieur / 3);
        var color_1 = random(palette);
        for (var i_1 = 0; i_1 < Line_Density; i_1++) {
            var angle = TWO_PI / Line_Density * i_1;
            var variation_exterieur = random(-5, 5);
            var variation_interieur = random(-5, 5);
            stroke(color_1);
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur) * cos(angle), pos_Y + variation_Y + (Rayon_Interieur - variation_interieur) * sin(angle), pos_X + (Rayon_Exterieur + variation_exterieur) * cos(angle), pos_Y + (Rayon_Exterieur + variation_exterieur) * sin(angle));
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