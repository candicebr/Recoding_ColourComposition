// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Nb_Rosace : 8,
    Line_Size: 200,
    RandomSeed: 0,
    Variation: 6,
    Scale: 100,
    Download_Image: () => save(),
}

gui.add(params, "RandomSeed", 0, 20, 1)
gui.add(params, "Nb_Rosace", 0, 15, 1)
gui.add(params, "Line_Size", 0, 500, 1)
gui.add(params, "Variation", 0, 15, 1)
gui.add(params, "Scale", 0, 100, 0.01)
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
        let Rayon_Exterieur = random(60, params.Line_Size)
        let Rayon_Interieur = random(30, Rayon_Exterieur-10)

        //Nombre de segments
        let Line_Density = random(150,600)

        //Variation de la position du point d'origine des segments
        let variation_X = random(-Rayon_Exterieur/4, Rayon_Exterieur/4)
        let variation_Y = random(-Rayon_Exterieur/4, Rayon_Exterieur/4)

        //Couleur aléatoire de la palette des couleurs
        let color = random(palette)

        //Variation de la longueur des segments
        let variation_exterieur = 0
        let variation_interieur = 0
        let variation_exterieur2 = 0
        let variation_interieur2 = 0

        for(let i = 0; i <= Line_Density/2; i++)
        {
            //Construction par symétrie pour obtenir un cercle fermé avec une jonction evolutive entre les premiers et derniers segments
            let angle1 = TWO_PI / Line_Density * i;
            let angle2 = TWO_PI / Line_Density * (Line_Density-i);
    
            //variation sur le rayon extérieur
            if (variation_exterieur <= 0)
                variation_exterieur += random(0, params.Variation)
            else if (variation_exterieur > params.Variation*8)
                variation_exterieur -= random(0, params.Variation)
            else
                variation_exterieur += random(-params.Variation, params.Variation)

            //variation sur le rayon intérieur
            if (variation_interieur <= 0)
                variation_interieur += random(0, params.Variation)
            else if (variation_interieur >= Rayon_Interieur - params.Variation*2)
                variation_interieur -= random(0, params.Variation)
            else
                variation_interieur += random(-params.Variation, params.Variation)

            //variation de la deuxième partie (pour un peu moins de symétrie aux endroits non nécéssaires)
            //variation sur le rayon extérieur
            if (variation_exterieur2 <= 0)
                variation_exterieur2 += random(0, params.Variation)
            else if (variation_exterieur2 > params.Variation*8)
                variation_exterieur2 -= random(0, params.Variation)
            else
                variation_exterieur2 += random(-params.Variation, params.Variation)

            //variation sur le rayon intérieur
            if (variation_interieur2 <= 0)
                variation_interieur2 += random(0, params.Variation)
            else if (variation_interieur2 >= Rayon_Interieur - params.Variation*2)
                variation_interieur2 -= random(0, params.Variation)
            else
                variation_interieur2 += random(-params.Variation, params.Variation)

            //pour assurer une jonction evolutive
            if (i >= (Line_Density/2)-10)
            {
                variation_interieur2 = (variation_interieur + variation_interieur2)/2
                variation_exterieur2 = (variation_exterieur + variation_exterieur2)/2
            }
           
            stroke(color)

            //Segment entre cercle intérieur et cercle extérieur
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur) * cos(angle1), 
                pos_Y + variation_Y + (Rayon_Interieur - variation_interieur) * sin(angle1), 
                pos_X + (Rayon_Exterieur + variation_exterieur) * cos(angle1), 
                pos_Y + (Rayon_Exterieur + variation_exterieur) * sin(angle1))

            //Segment opposé par rapport à l'axe des x
            line(pos_X + variation_X + (Rayon_Interieur - variation_interieur2) * cos(angle2), 
                pos_Y + variation_Y + (Rayon_Interieur - variation_interieur2) * sin(angle2), 
                pos_X + (Rayon_Exterieur + variation_exterieur2) * cos(angle2), 
                pos_Y + (Rayon_Exterieur + variation_exterieur2) * sin(angle2))
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