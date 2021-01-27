/* adds action to the app header */

const source = document.getElementById('source');
let input = source.innerText;
let intervalID = window.setInterval(scramble, 100);

function scramble () {
  let output = '';
  for (let letter of input) {
    if (Math.random()>0.95) {
      output += Math.round((Math.random()*9));
    } else {
            output += letter;
    }
  }
        source.textContent = output;
}

/* adds action to the form */

const sr = document.getElementById('seedRate');
const sc = document.getElementById('seedConsumption');
const sb = document.getElementById('seedInBed');
const feedWeight = document.getElementById('feedWeight');
const frontSprocket = document.getElementById('frontSprocket');
const rearSprocket = document.getElementById('rearSprocket');
const seedWeight = document.getElementById('seedWeight');
const bedLength = document.getElementById('bedLength');
const bedRows = document.getElementById('bedRows');
const myForm = document.getElementById('myForm');

let seedRate;
let seedConsumption;
let seedInBed;

/* get stored values from previous session */

feedWeight.value = localStorage.getItem('storedFeedWeight');
frontSprocket.value = localStorage.getItem('storedFrontSprocket');
rearSprocket.value = localStorage.getItem('storedRearSprocket');
seedWeight.value = localStorage.getItem('storedSeedWeight');
bedLength.value = localStorage.getItem('storedBedLength');
bedRows.value = localStorage.getItem('storedBedRows');
sr.textContent = localStorage.getItem('storedSeedRate');
sc.textContent = localStorage.getItem('storedSeedConsumption');
sb.textContent = localStorage.getItem('storedSeedInBed');

function eventHandler() {
  let fw = Number(feedWeight.value);
  let fc = Number(frontSprocket.value);
  let rc = Number(rearSprocket.value)
  let sw = Number(seedWeight.value);
  let bl = Number(bedLength.value);
  let br = Number(bedRows.value);
  seedRateCalculator(fw,fc,rc,sw);
  seedConsumptionCalculator(seedRate,sw,bl,br);
  seedInBedCalculator(seedConsumption,sw);
  sr.textContent = Math.round(seedRate);
  sc.textContent = seedConsumption.toFixed(1);
  sb.textContent = Math.round(seedInBed);
  localStorage.setItem('storedFeedWeight', document.getElementById('feedWeight').value);
  localStorage.setItem('storedFrontSprocket', document.getElementById('frontSprocket').value);
  localStorage.setItem('storedRearSprocket', document.getElementById('rearSprocket').value);
  localStorage.setItem('storedSeedWeight', document.getElementById('seedWeight').value);
  localStorage.setItem('storedBedLength', document.getElementById('bedLength').value);
  localStorage.setItem('storedBedRows', document.getElementById('bedRows').value);
  localStorage.setItem('storedSeedRate', document.getElementById('seedRate').textContent);
  localStorage.setItem('storedSeedConsumption', document.getElementById('seedConsumption').textContent);
  localStorage.setItem('storedSeedInBed', document.getElementById('seedInBed').textContent);
}
      
function seedRateCalculator(fw,fc,rc,sw) {
  seedRate = (fw/20/rc*fc/0.78/sw*1000);
  return seedRate;
}

function seedConsumptionCalculator(seedRate,sw,bl,br) {
  seedConsumption = (seedRate*sw/1000*bl*br);
  return seedConsumption;
}
      
function seedInBedCalculator(seedConsumption,sw) {
  seedInBed = (seedConsumption/sw*1000);
  return seedInBed;
}

myForm.addEventListener('input', eventHandler);