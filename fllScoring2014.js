//
// FLL Scoring 2014 - World Class
//
// Are you learning something from this code?  Cool!
// Spot something that could be done better?  Let me know:  Jay@ReactiveTechnologies.com
//
// Want to re-use this for another project?  Go ahead, re-use away!
//
// This code is FREE, as in, well, FREE...
//

// Version 0.0 - Initial creation based on FLL Scoring 2013
// Version 0.1 - Added manifest file to hopefully take care of caching
//               and auto-updating
// Version 0.2 - Corrected score multiplier calculations
// Version 0.3 - Text updates in index.html
// Version 0.4 - more text updates

function getInfo() {
    alert("This web app is FREE, as in, well, FREE...\n" + 
        "Spot something that could be done better?\n" +
        "Let me know:  Jay@ReactiveTechnologies.com\n" +
        "TM and SM are owned by FIRST and LEGO\n" +
        "V0.4\n");
}

var scoringItems;
var timerOn;
var countDownSeconds;
var timer;
var countDown = true;

function timerRun() {
    if ( ((countDown && (countDownSeconds > 0)) || !countDown) && timerOn) {
        var t = document.getElementById('timerText');
        var minutes = Math.floor(countDownSeconds / 60);
        var seconds = countDownSeconds % 60;    
        var tstring = String(minutes) + ":";
        if (seconds < 10)
            tstring += "0";
        tstring += String(seconds);
        t.innerHTML = tstring;
        if (countDown)
            countDownSeconds--;
        else
            countDownSeconds++;
    }
    else if (countDownSeconds == 0) {
        var t = document.getElementById('timerText');
        t.innerHTML = "0:00";
    }
    timer = setTimeout("timerRun();", 1000);
}

function timerToggle() {
    var b = document.getElementById('startStopButton');

    if (!timerOn) {
        b.innerHTML = "Pause";
        timerOn = true;
    }
    else {
        b.innerHTML = "Start";
        timerOn = false;                
    }
}

function countDirectionChange(direction) {
    timerOn = false;

    if (direction == "up") {
        countDown = false;
        countDownSeconds = 0;
    }
    else {
        countDown = true;
        countDownSeconds = 150;
    }

    var t = document.getElementById('countUpButton');
    t.checked = !countDown;
    t = document.getElementById('countDownButton');
    t.checked = countDown;

    t = document.getElementById('timerText');
    var minutes = Math.floor(countDownSeconds / 60);
    var seconds = countDownSeconds % 60;    
    var tstring = String(minutes) + ":";
    if (seconds < 10)
        tstring += "0";
    tstring += String(seconds);
    t.innerHTML = tstring;
    
    var b = document.getElementById('startStopButton');
    b.innerHTML = "Start";

}

function reset() {
    var item;
    var select;
    var option;    
    
    scoringItems = {
        "basketInBase": "no",
        "modelIdentical": "no",
        "openDoor": "no",
        "loopsOnScale": "0",
        "peopleNotInBase": "no",
        "peopleModelTouchingCircle": "no",
        "sliderSpin": "no",
        "onlyCorrectLoopRemoved": "no",
        "ballShot": "no",
        "ballInNet": "no",
        "insertInstalled": "no",
        "robotLoopNotTouching": "no",
        "sensingLoopRemoved": "no",
        "sliderPulled": "no",
        "ideaModelRemoved": "no",
        "bulbUp": "no",
        "learningLoopRemoved": "no",
        "sdCardUp": "no",
        "engaged": "no",
        "markerColor": "NA",
        "markerTicks": "NA",
        "rotated": "no",
        "penalties": "0"
    };
    
    for (item in scoringItems) {
        select = document.getElementById(item);
        for (option in select.children) {
            if (select[option].nodeName == "OPTION") {
                if (select[option].value == scoringItems[item]) {
                    select[option].selected = true;
                }
                else {
                    select[option].selected = false;
                }
            }
        }
    }

    if (countDown)
        countDirectionChange('down');
    else
        countDirectionChange('up');
    
    update();

    if (!timer)
        timerRun();
}



function update() {
    var item;
    var value;
    var score = 0;
    var percentageModifier = 1.0;

    // update the current values
    for (item in scoringItems) {
        value =  document.getElementById(item).value;
        scoringItems[item] = value;
    }

    // Opening Doors
    // Score: 15
    if (scoringItems.openDoor == 'yes')
                score += 15;

    // Cloud Access
    // Score: 30
    if (scoringItems.sdCardUp == 'yes')
        score += 30;

    // Community Learning
    // Score: 25
    if (scoringItems.learningLoopRemoved == 'yes')
        score += 25;

    // Robotics Competition
    // Score (insert installed): 25
    // Score (insert installed + loop not touching): 55
    if (scoringItems.insertInstalled == 'yes') {
        score += 25;
        if (scoringItems.robotLoopNotTouching == 'yes')
            score += 30;
    }
    
    // Using the Right Senses
    // Score: 40
    if ((scoringItems.sensingLoopRemoved == 'yes'))
        score += 40;
    
    // Thinking Outside the Box
    // Score (idea model removed, bulb down, box never in base): 25
    // Score (idea model removed, bulb up, box never in base): 40
    if (scoringItems.ideaModelRemoved == 'yes') {
        score += 25;
        if (scoringItems.bulbUp == 'yes')
            score +=15;
    }

    // Remote Communications/Learning
    // Score: 40
    if (scoringItems.sliderPulled == 'yes')
        score += 40;
    
    // Search Engine
    // Score (slider pushed): 15
    // Score (slider pushed, correct loop removed): 60
    if (scoringItems.sliderSpin == 'yes') {
        score += 15;
        if (scoringItems.onlyCorrectLoopRemoved == 'yes')
            score += 45;
    }
    
    // Sports
    // Score ("Took a Shot"): 30
    // Score ("Took a Shot" and "Goal"): 60
    if (scoringItems.ballShot == 'yes') {
        score += 30;
        if (scoringItems.ballInNet == 'yes')
            score += 30;
    }

    // Reverse Engineering
    // Score (basket in base): 30
    // Score (basket in base + identical model built): 45
    if (scoringItems.basketInBase == 'yes') {
        score += 30;
        if (scoringItems.modelIdentical == 'yes')
            score += 15;
    }
    
    // Adapting to Changing Conditions
    // Score: 15
    if (scoringItems.rotated == 'yes')
        score += 15;

    // Apprenticeship
    // Score (model out of base): 20
    // Score (model out of base touching circle): 35
    if (scoringItems.peopleNotInBase == 'yes') {
        score += 20;
        if (scoringItems.peopleModelTouchingCircle == 'yes')
            score += 15;
    }

    // Progress Based Learning
    // Score: 20 for first loop, 10 for each additional
    if (scoringItems.loopsOnScale != '0')
        score += 20 + 10 * (parseInt(scoringItems.loopsOnScale) - 1);


    // ** IMPORTANT **
    // This code must be after all mission code, but before penalties
    // Engagement
    // Score (engaged): 20 (added after multiplier)
    // If enganged, percentage increase based on position of marker
    if (scoringItems.engaged == 'yes') {

        switch (scoringItems.markerColor) {
              case 'NA':
                  percentageModifier = 1.00;
                  break;
              case 'RED10':
                  percentageModifier = 1.10;
                  break;
              case 'ORANGE16':
                  percentageModifier = 1.16;
                  break;
              case 'GREEN22':
                  percentageModifier = 1.22;
                  break;
              case 'BLUE28':
                  percentageModifier = 1.28;
                  break;
              case 'RED34':
                  percentageModifier = 1.34;
                  break;
              case 'BLUE40':
                  percentageModifier = 1.40;
                  break;
              case 'GREEN46':
                  percentageModifier = 1.46;
                  break;
              case 'ORANGE52':
                  percentageModifier = 1.52;
                  break;
              case 'RED58':
                  percentageModifier = 1.58;
                  break;
        }

        if ((scoringItems.markerColor != 'NA') && (scoringItems.markerTicks != 'NA'))
            percentageModifier += parseInt(scoringItems.markerTicks) / 100.0;
    
    }
    
    // Penalties
    // Score: -10 each for penalties (performed before multiplier)
    if (scoringItems.penalties != '0')
        score -= 10 * parseInt(scoringItems.penalties);        

    score *= percentageModifier;

    if (scoringItems.engaged == 'yes') {
        score += 20;
    }
    
    // score = +(Math.round(score + "e+2")  + "e-2")

    // Round up to nearest integer
    score = Math.ceil(score);

    // display the score
    var scoreText = document.getElementById('scoreText');
    scoreText.innerHTML = score;
}


 
//function checkPointer() {
//    //
//        
//    var pointerMajor = parseInt(document.getElementById("pointerMajor").value);
//    var pointerMinor = parseInt(document.getElementById("pointerMinor").value);
//    
//    if ( (pointerMajor == 9) && (pointerMinor > 0) ) {
//        var minorSelector;
//        minorSelector = document.getElementById('pointerMinor');
//        for (var i = 0; i < minorSelector.options.length; i++) {
//            minorSelector.options[i].selected = false;
//            if (minorSelector.options[i].value == String(0))
//                minorSelector.options[i].selected = true;
//        }
//    }
//}
//
//function checkChair(choice) {
//    var chairFixedInBase = document.getElementById('chairFixedInBase');
//    var chairFixedUnderTable = document.getElementById('chairFixedUnderTable');
//
//    switch(choice) {
//        case 'inBase':
//            if ( chairFixedInBase.value == "yes" ) {
//                chairFixedInBase.value = "yes";
//                chairFixedUnderTable.value = "no";
//            }
//            break;
//        case 'underTable':
//            if ( chairFixedUnderTable.value == "yes" ) {
//                chairFixedInBase.value = "no";
//                chairFixedUnderTable.value = "yes";
//            }
//            break;
//    }
//}
//
//function checkTransitions(choice) {
//    var robotTilted = document.getElementById('robotTilted');
//    var robotBalanced = document.getElementById('robotBalanced');
//
//    switch(choice) {
//        case 'tilted':
//            if ( robotTilted.value == "yes" ) {
//                robotTilted.value = "yes";
//                robotBalanced.value = "no";
//            }
//            break;
//        case 'balanced':
//            if ( robotBalanced.value == "yes" ) {
//                robotTilted.value = "no";
//                robotBalanced.value = "yes";
//            }
//            break;
//    }
//}

// conflict checks and limits...

// supply distribution (suppliesInYellow vs. suppliesInRed)

// people distribution
// peopleInYellow vs. peopleInRed
// also compare to family member groupings
// also if three people are together and water is with people, than should be three people with water

// if tallest built gray building pink is maximum, there shouldn't be any gray buildings left in light green


