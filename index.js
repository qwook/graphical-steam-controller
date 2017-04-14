const { Circle, Rectangle, graphical } = require('graphical');
const steam = require('steam-controller');

graphical();

var controller = new steam.steamController();

var joystickBg = new Circle({radius: 60, pos:{x: 100, y: 100}, color: "#cfcfcf"})
var joystick = new Circle({radius: 30, pos:{x: 100, y: 100}, color: "#555", outlineWidth: 2, outlineColor: "white"});

var joystickRightBg = new Circle({radius: 60, pos:{x: 300, y: 100}, color: "#cfcfcf"})
var joystickRight = new Circle({radius: 30, pos:{x: 300, y: 100}, color: "#555", outlineWidth: 2, outlineColor: "white"});

var gripLeftBg = new Rectangle({pos: {x: 10, y: 160}, size: {w: 30, h: 100}, color: "transparent", outlineWidth: 2, outlineColor: "black"});
var gripRightBg = new Rectangle({pos: {x: 360, y: 160}, size: {w: 30, h: 100}, color: "transparent", outlineWidth: 2, outlineColor: "black"});

var gripLeft = new Rectangle({pos: {x: 10, y: 160}, size: {w: 30, h: 0}, color: "black"});
var gripRight = new Rectangle({pos: {x: 360, y: 160}, size: {w: 30, h: 0}, color: "black"});

var yButton = new Circle({radius: 16, pos: {x: 200, y: 150}, color: "white", outlineWidth: 2, outlineColor: "black"});
var aButton = new Circle({radius: 16, pos: {x: 200, y: 200}, color: "white", outlineWidth: 2, outlineColor: "black"});
var bButton = new Circle({radius: 16, pos: {x: 225, y: 175}, color: "white", outlineWidth: 2, outlineColor: "black"});
var xButton = new Circle({radius: 16, pos: {x: 175, y: 175}, color: "white", outlineWidth: 2, outlineColor: "black"});

controller.connect();
controller.read(function(data) {
  const leftX = data.joystick.x >= 128 ? data.joystick.x - 256 : data.joystick.x ;
  const leftY = data.joystick.y >= 128 ? data.joystick.y - 256 : data.joystick.y ;
  joystick.setPos( 100 + leftX/128*60, 100 - leftY/128*60 );

  if (data.pad.touched) {
    joystickBg.setColor("#bbb");
  } else if (data.pad.value == "DOWN") {
    joystickBg.setColor("#aaa");
  } else {
    joystickBg.setColor("#cfcfcf");
  }

  const rightX = data.mouse.b >= 128 ? data.mouse.b - 256 : data.mouse.b ;
  const rightY = data.mouse.d >= 128 ? data.mouse.d - 256 : data.mouse.d ;
  joystickRight.setPos( 300 + rightX/128*60, 100 - rightY/128*60 );

  if (data.mouse.touched) {
    joystickRightBg.setColor("#bbb");
  } else if (data.pad.value == "DOWN") {
    joystickRightBg.setColor("#aaa");
  } else {
    joystickRightBg.setColor("#cfcfcf");
  }

  gripLeft.setHeight(data.trigger.left/255*100);
  gripRight.setHeight(data.trigger.right/255*100);

  xButton.setColor( data.button.X ? 'red' : 'white' );
  yButton.setColor( data.button.Y ? 'red' : 'white' );
  aButton.setColor( data.button.A ? 'red' : 'white' );
  bButton.setColor( data.button.B ? 'red' : 'white' );

  console.log(data);
});