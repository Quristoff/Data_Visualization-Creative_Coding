

// create a fade in effet  
// THIS IS EVETUALLY NOT USED IN THIS ASSIGNMENT 
// BUT THIS IS A COOL FUNCTION 
// I WILL USE IT IN MY MIDTERM 
var i = 0;
function fadeInEllipse() {

  fill (109,170,210,i);
  ellipse(width/2,height/2,100,100);
  if (i >= 255){
    i = 255}
  else{
    i+=1
  }
}

// create a list of villagers' quotes and sources
var counter = 0 ;
var quote = ["\"Several years ago, the water in the river is toxic. Fish and shrimps died out.\"",
"\"Many childrens in Shangluo, Shanxi suffered from lead poisoning.\"",
"\"Pollutants are too close to our drinking water sources. We are frightened of get ill and die.\"",
"\"...the ecological rick index of heavy metal in nine kinds of vegetables was 88.89%,which belonged to the medium and strong ecological risk.\"",
"\"Shangluo Zinc Plant drains sewage and emits detrimental gases discretionarily, casuing great pollution to the environment.\"",
"\"Some villagers protested against construting the fossil fuel station or reported the noisiness, but they were handcuffed and brought away.\""]



var source = ["-- Villager in Shahezi Village",
"-- Sina News",
"-- Villager in Shahezi Village",
"-- An 2017 Article from Henan Science",
"-- Non-governmental media",
"-- Villager in Shahezi Village"]
var title;



// object: the metal concentration of different vegies
var village = {
  goCadium: 0.54, // unit mg/kg
  soilCadium: 24.8,
  soilLead:149,
  noise: 75, // db
};

// object: ref value
var reference = {
  goCadium: 0.05,  // unit mg/kg
  soilCadium: 0.3,
  soilLead: 120,
  noise: 0, //db
}

var metal = {
  xPos:[],
  yPos:[],
  width: 10,
  height:[]
}


// preload media
function preload() {

  locationMap = loadImage("map.jpg");
  merriweather = loadFont("Merriweather-Black.ttf");
  noise = loadSound("noise.mp3")
  bgm = loadSound("Angle.mp3")

var firstLoop = true

}

//setup canvas
function setup() {
  createCanvas(1072,670);
  bgm.play()
  bgm.setVolume(0.5)



}



//draw
function draw() {
  if (firstLoop){
    bgm.play();
  }




  locationMap.resize(0,height)


  title =  "Shahezi villiage, loacted at Shangluo City, Shanxi\n China, sufferes from severe industrial pollution"



  // load the map
  imageMode(CENTER);
  rectMode(CENTER);

  background(200);
  image(locationMap,width/2,height/2,locationMap.width,locationMap.height);





  fill(150,150,150,100);
  noStroke()
  rect(width/2,height/2,width,height);


  if (mouseIsPressed){
    metal.xPos.push(mouseX);
    metal.yPos.push(mouseY);
    metal.height.push(20);
  }

  for (var a =0;a < metal.xPos.length;a++){
    fill(80);
    rectMode(CORNER);
    rect(metal.xPos[a],metal.yPos[a],metal.width,metal.height[a]);
    if (metal.height[a] < height){
      metal.height[a]+=2;
    }

  }


  if (mouseX<width/4){
    if (frameCount%30 == 0){
      counter += 1;
      if (counter >= 3){
        counter = 0;
      }
    }

    fill(255);
    textSize(20);
    textAlign(LEFT);
    text ("Move the cursor rightward to explore\nthe industrial contanmination in Shahezi Villege",536,509.2);
    text("Turn on the volume for better experiences",800*0.67,900*0.7-25)

    push();
    var h = map (mouseX,0,width/4,0,600*0.67);
    translate(h,0);
    rectMode(CORNER)
    rect(800*0.67,830*0.67,50*0.67,20*0.67);
    triangle(850*0.67,820*0.67,850*0.67,860*0.67,880*0.67,840*0.67);

    pop();


  }





  // green concentration
  if (mouseX <= width/2 && mouseX > width/4) {
    counter = 3
    rectMode(CORNER);
    fill (74, 31, 22,180);
    rect(0,0,width,height);


    fill (14, 171, 14,120);
    rect(412*0.67,0,(width/(village.goCadium+reference.goCadium))*reference.goCadium,height);

    fill(255)
    textSize(16);
    textAlign(LEFT);
    let height1 = map(mouseX,width/4,width/2,804*0.67,650*0.67)
    let height2 = map(mouseX,width/4,width/2,734*0.67,950*0.67)
    text("0.54 mg/kg\nin\nShahezi Village",553*0.67,height1);
    textAlign(RIGHT);
    text("0.05 mg/kg\nby\nregulation",537*0.67,height2);

    title = "Cadmium Concentration of Green Onion"
  }

  // soil concentration
  if (mouseX > width/2 && mouseX <= 3*width/4) {
    counter = 4
    title = "Cadmium Concentration in Soil";
    rectMode (CENTER);
    fill (0,0,0);
    rect (width/2,height/2,width,height);

    textSize(180)
    textAlign(CENTER)
    fill(60)
    push();
    translate(width/2,height/2-280*0.67+frameCount*8%height)
    text("Contentration\nof\nShahezi Village",0,0)
    pop();


    textSize(180)
    textAlign(CENTER)
    fill(60)
    push();
    translate(width/2,height/2-280*0.67-height+frameCount*8%height)
    text("Contentration\nof\nShahezi Village",0,0)
    pop();



    var side = sqrt((width*height/village.soilCadium)*reference.soilCadium);
    imageMode(CENTER);
    let c = locationMap.get(mouseX+side/2,mouseY-side/2,side,side);
    image(c,mouseX,mouseY);
    fill(255)
    textSize(20)
    text("Maximum\nConcentration\nby Regulation",mouseX,mouseY-side/2-80)

  }

  // noise
  if (mouseX>width*3/4){
    counter = 5
    var j = 0.5*(255-22)*(sin(0.2*frameCount)+1)
    var k = 0.5*(255-9)*(sin(0.2*frameCount)+1)
    var l = 0.5*(255-133)*(sin(0.2*frameCount)+1)
    tint(22+j, 9+k, 133+l,255)
    noise.setVolume(0.5)

    if (! noise.isPlaying()){
      noise.play();
    }


    push();
    noFill()
    stroke(60*0.67)
    translate(width/2,height)
    strokeWeight(8)
    for (var i = 1; i < 8;i ++)
      ellipse(0,0,300*0.67*i+(frameCount*8%(300*0.67)));

    fill(60);
    noStroke()

    textFont("Arial");
    textSize(60);
    text("75dB",0,-55*0.67)
    textSize(18);
    text("continues day and night",0,-20*0.67)
    pop();






    title = "Noise"
  } else {
    noise.pause()
    tint(255,255,255);
  }




  textAlign(CENTER);
  textFont(merriweather);
  textSize(32);
  fill(255)
  text(title,width/2,170);

  // load the text


  textAlign(CENTER);
  rectMode(CENTER);
  fill (255,255,255);
  textSize(20)
  textFont("Times New Roman")
  text(quote[counter],width/2,height/2,width/2.5,height/5.4);
  text(source[counter],width/2+100,height/2+40)
  
  firstLoop = False



}
