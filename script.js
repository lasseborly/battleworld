console.log('WOW');

var attackBtn = document.querySelector('[data-attack-btn]');
var fleeBtn = document.querySelector('[data-flee-btn]');
var TyrahpField = document.querySelector('[data-t-hp]');
var YourhpField = document.querySelector('[data-hp]')
var combatLog = document.querySelector('[data-combat-log]');
var opponentNametag = document.querySelector('[data-opponent-nametag]');
var opponentImage = document.querySelector('[data-opponent-image]');
var fightInterface = document.querySelector('[data-fight-interface]');
var Thlf = 100;
var Yhlf = 100;
var spiligang = false;
console.log(attackBtn);

var opponents = ['turalyon', 'garrosh', 'illidan'];
var opponent;

// Generate Random Encounter

function generateRandomEncounter() {
  var randomOpponent = opponents[Math.floor(Math.random()*(opponents.length))];
  opponent = randomOpponent;
  console.log(randomOpponent);
  fightInterface.style.display = 'block';
  opponentNametag.innerHTML = opponent;
  opponentImage.src = 'billeder/' + opponent + '.jpg';
  spiligang = true
};

// Fighting

attackBtn.addEventListener('click', function(){
  console.warn('attacking!');
  if(spiligang) {
    var Tdmg = getRandomDamage(15);
    var Ydmg = getRandomDamage(15);
    var YactualHp = YourhpField.value;
    var YnewHp = YactualHp - Ydmg;
    var TactualHp = TyrahpField.value;
    var TnewHp = TactualHp - Tdmg;
    combatLog.innerHTML = 'You hit ' + opponent + ' for ' + Tdmg + ' damage. Ouch! ' + opponent + ' hit you for ' + Ydmg
    TyrahpField.value = TnewHp;
    YourhpField.value = YnewHp;
    checkOpponentStatus(TnewHp);
    checkOwnStatus(YnewHp);
  }
  
});

fleeBtn.addEventListener('click', function(){
  console.warn('Fleeing!');
  combatLog.innerHTML = 'You try to run away. ' + opponent + ' laughs at you!'
  opponentImage.src = 'billeder/' + opponent + '-happy.png';
});

function getRandomDamage(max) {
    return Math.floor(Math.random() * Math.floor(max));
  
}

function getRandomHealth(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;   
}


function checkOpponentStatus(hp) {
  if(hp < 100) {
    opponentImage.src = 'billeder/' + opponent + '-angry.jpg';
  }
  if (hp <= 50) {
    opponentImage.src = 'billeder/' + opponent + '-scared.jpg';
  }
  if (hp <= 25) {
    opponentImage.src = 'billeder/' + opponent + '-sad.jpg';
  }
  if (hp <= 0) {
    opponentImage.src = 'billeder/victory.png';
    spiligang = false
  }

}

function checkOwnStatus(hp) {
    if (hp <= 0) {
      opponentImage.src = 'billeder/defeat.jpeg';
      spiligang = false
    }
  }

// Movement

var body = document.querySelector('body');
var player = document.querySelector("[data-player]");
var foe = document.querySelector('[data-foe]');
hasLeaved = false;

body.addEventListener("keydown", (event) => {


    var pos = player.getBoundingClientRect();

    switch(event.keyCode)
    {
        case 37:
            move(player, 'left')
            break;
        case 39:
            move(player, 'right')
            break;
        case 40:
            move(player, 'down')
            break;
        case 38:
            move(player, 'up')
            break;
        default:
            console.log('Unknown key:', event.keyCode);
            break;
    }
});

function move(element, direction) {
    var pos = element.getBoundingClientRect();
    var max = body.getBoundingClientRect();

    if(direction == 'left') {
      var newLeft = (pos.left - 20);

      if(newLeft < 0) {
        element.style.left = 0;
      }
      
      else {
          element.style.left = (newLeft + 'px');
      }
    }

    if(direction == 'right') {
      var newRight = (pos.left + pos.width + 20);

      if(newRight > max.width) {
          element.style.left = (max.width - pos.width) + 'px'
      }

      else {
          element.style.left = (pos.left + 20) + 'px';
      }
    }

    if(direction == 'up') {
      var newTop = (pos.top - 20);
      
      if(newTop < 0) {
          element.style.top = 0;
      }

      else {
          element.style.top = (newTop) + 'px';
      }
    }

    if(direction == 'down') {
      var newDown = (pos.top + 20);

      if((newDown + pos.height) > window.innerHeight) {
          element.style.top = (window.innerHeight - pos.height) + 'px';
      } else {
          element.style.top = (newDown + 'px');
      }
    }

    
    if(isCollide(player,foe)) {
        if(hasLeaved) {
          generateRandomEncounter();
          Thlf = getRandomHealth(50, 150);
          Yhlf = getRandomHealth(50, 150);
          TyrahpField.value = Thlf;
          YourhpField.value = Yhlf;
        }
        hasLeaved = false;
        player.style.background = "red";
        foe.style.background = "red";
    } else {
        hasLeaved = true;
        player.style.background = "";
        foe.style.background = "";
    };
}

function isCollide(player, foe) {
  var playerArea = player.getBoundingClientRect();
  var foeArea = foe.getBoundingClientRect();

  return (
      ((playerArea.top + playerArea.height) > (foeArea.top)) &&
      (playerArea.top < (foeArea.top + foeArea.height)) &&
      ((playerArea.left + playerArea.width) > foeArea.left) &&
      (playerArea.left < (foeArea.left + foeArea.width))
  );
}