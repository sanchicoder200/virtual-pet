var dog,sadDog,happyDog;
var foodObj;
var foods, foodStock;
var feedTime, lastFed, feed, addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database= firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  })
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  // function to feed the dog
feed= createButton("Feed the Dog");
feed.position(700, 96);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800, 95);
addFood.mousePressed(addFoods);
}

function draw() {

  fill(255, 255, 254);
  textSize(15);

  background(46,139,87);
 

foodStock = database.ref('Food');
foodStock.on("value", readStock);

foodObj.display()

//if conditions
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM" , 350, 30);
}
else if(lastFed == 0){
  text("Last Feed: 12AM", 350, 30);
}
else{
  text("Last Feed: " + lastFed + "AM", 350, 30);
}


drawSprites();
}

//function to add food in stock
function addFoods(){
  foods++;
  database.ref('/').update({
    Food : foods
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime : hour()
  })
  }
  //function to read food Stock
function readStock(data){
  foods= data.val();
  foodObj.updateFoodStock(foods);
}
