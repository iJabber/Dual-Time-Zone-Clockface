import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { display } from "display";
import * as messaging from "messaging";
import userActivity from "user-activity";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const homeZone = document.getElementById("homeZone");
const homeLocation = document.getElementById("homeLocation");
const awayZone = document.getElementById("awayZone");
const awayLocation = document.getElementById("awayLocation");
const date = document.getElementById("date");
const myHeartRate = document.getElementById("myHeartRate");
const mySteps = document.getElementById("mySteps");
const myDist = document.getElementById("myDist");



// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
//-----------------CLOCK------------------  
  let today = evt.date;
  let hours = today.getHours();
  let hoursPlus = today.getHours();
  let day = util.zeroPad(today.getDate());
  let month = util.zeroPad(today.getMonth() + 1);
  
  // 12h format
  hours = hours % 12 || 12;
  hoursPlus = hoursPlus % 12 || 12;
  
  let mins = util.zeroPad(today.getMinutes());
  
  homeZone.text = `${hours}:${mins}`;
  homeLocation.text = 'Sioux Falls';
  if(hoursPlus == 1){
    hoursPlus = 2;
  }
  else if(hoursPlus == 2){
    hoursPlus = 3;
  }
  else if(hoursPlus == 3){
    hoursPlus = 4;
  }
  else if(hoursPlus == 4){
    hoursPlus = 5;
  }
  else if(hoursPlus == 5){
    hoursPlus = 6;
  }
  else if(hoursPlus == 6){
    hoursPlus = 7;
  }
  else if(hoursPlus == 7){
    hoursPlus = 8;
  }
  else if(hoursPlus == 8){
    hoursPlus = 9;
  }
  else if(hoursPlus == 9){
    hoursPlus = 10;
  }
  else if(hoursPlus == 10){
    hoursPlus = 11;
  }
  else if(hoursPlus == 11){
    hoursPlus = 12;
  }
  else if(hoursPlus == 12){
    hoursPlus = 1;
  }
  awayZone.text = `${hoursPlus}:${mins}`;
  awayLocation.text = 'Columbus';
  date.text = `${month}/${day}`;

  
//-----------------CLOCK------------------  

//-----------------STATS------------------  
  
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      //Update heart rate here.
      myHeartRate.text = 'HR: '+ `${hrm.heartRate}`;
    });
    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      if (display.on) {
        hrm.start();
      }
      else {
        hrm.stop();
      }
    });
    hrm.start();
  }
  mySteps.text = 'STEPS: '+ userActivity.today.adjusted.steps;
  myDist.text = 'DIST: '+ (userActivity.today.adjusted.distance * 0.00062137).toPrecision(3) + 'mi';
}
