// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Nb_Rosace : 8,
    Line_Size: 250,
    Line_Density: 200,
    RandomSeed: 0,
    Download_Image: () => save(),
}
gui.add(params, "RandomSeed", 0, 20, 1)
gui.add(params, "Nb_Rosace", 0, 15, 1)
gui.add(params, "Line_Size", 0, 500, 1)
gui.add(params, "Line_Density", 0, 300, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(223, 195, 227)
    randomSeed(params.RandomSeed)

    //palette des couleurs
    const palette = ['#eb4034', '#a81b11', '#123a80', '#126680']

    for (let i = 0; i < params.Nb_Rosace; i++)
    {
        //Position de la rosace
        let pos_X = random(width)
        let pos_Y = random(height)
        
        //Taille du cercle extérieur et intérieur
        let Rayon_Exterieur = random(40, params.Line_Size)
        let Rayon_Interieur = random(10, Rayon_Exterieur-10)

        //Nombre de segments
        let Line_Density = random(100,500)

        //Variation de la position du point d'origine des segments
        let variation_X = random(-Rayon_Exterieur/3, Rayon_Exterieur/3)
        let variation_Y = random(-Rayon_Exterieur/3, Rayon_Exterieur/3)

        //Couleur aléatoire de la palette des couleurs
        let color = random(palette)

        for(let i = 0; i < Line_Density; i++)
        {
            let angle = TWO_PI / Line_Density * i;

            //Légère variation des longueurs des segments
            let variation_exterieur = random(-5,5)
            let variation_interieur = random(-5,5)

            stroke(color)

            //Segment entre cercle intérieur et cercle extérieur
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur) * cos(angle), 
                pos_Y + variation_Y + (Rayon_Interieur - variation_interieur) * sin(angle), 
                pos_X + (Rayon_Exterieur + variation_exterieur) * cos(angle), 
                pos_Y + (Rayon_Exterieur + variation_exterieur) * sin(angle))
        }
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}