'use strict';

const util = require('util');
const child_process = require('child_process');

const shellExecAsync = util.promisify(child_process.exec);

const POLL_INTERVAL = 500;

const hotCornerEntered = {
  'lower-left': false, // true if entered....
};
let lastHotCorner;


function activateHotCornerAction(hotCorner) {
  // console.log('Running action for corner: ', hotCorner);
  if (hotCorner === 'lower-left') {
    shellExecAsync('xfce4-popup-whiskermenu');
  }
}

function checkHotCornerEntered(hotCorner) {
  if (!hotCorner) {
    if (lastHotCorner) {
      hotCornerEntered[lastHotCorner] = false;
    }
    return false;
  }
  const alreadyEntered = hotCornerEntered[hotCorner];
  if (alreadyEntered) {
    return false;
  }
  hotCornerEntered[hotCorner] = true;
  lastHotCorner = hotCorner;
  return true;
}

function getHotCorner(mouseLocation) {
  const {
    X,
    Y,
    SCREEN,
  } = mouseLocation;
  let hotCorner;
  if (SCREEN !== 0) {
    return undefined;
  }
  if (X <= 25 && Y >= 1054) {
    hotCorner = 'lower-left';
  }
  // console.log('getHotCorner: ', hotCorner);
  return hotCorner;
}

async function getMouseLocation() {
  const {
    stdout,
  } = await shellExecAsync('xdotool getmouselocation --shell');
  const parts = stdout.split(/[=,\n]/);
  // console.log('STDOUT parts: ', parts);
  const parts_length = parts.length;
  let current_var;
  const mouseLocation = {};
  for (let i = 0; i < parts_length; i++) {
    let part = parts[i];
    if (!current_var) {
      current_var = part;
    } else {
      mouseLocation[current_var] = parseInt(part);
      current_var = undefined;
    }
  }
  // console.log('getMouseLocation: ', mouseLocation);
  return mouseLocation;
}

async function pollMouseLocation() {
  const mouseLocation = await getMouseLocation();
  const hotCorner = getHotCorner(mouseLocation);
  if (checkHotCornerEntered(hotCorner)) {
    activateHotCornerAction(hotCorner);
  }
  setTimeout(pollMouseLocation, POLL_INTERVAL);
}

pollMouseLocation();
