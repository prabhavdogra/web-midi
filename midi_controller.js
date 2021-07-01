import { MIDI } from "../js/script/MIDI.js";

// Natural Notes
var c_note = document.getElementById("c_");
var d_note = document.getElementById("d_");
var d_note = document.getElementById("d_");
var e_note = document.getElementById("e_");
var f_note = document.getElementById("f_");
var g_note = document.getElementById("g_");
var a_note = document.getElementById("a_");
var b_note = document.getElementById("b_");
// Sharp NotesS
var cs_note = document.getElementById("cs_");
var ds_note = document.getElementById("ds_");
var ds_note = document.getElementById("ds_");
var fs_note = document.getElementById("fs_");
var gs_note = document.getElementById("gs_");
var as_note = document.getElementById("as_");

// Fetching black and white Keys
var black_notes = document.getElementsByClassName("black");
var white_notes = document.getElementsByClassName("white");

// Coloring and indexing keys black and white
var color = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
var num = [0, 0, 1, 1, 2, 3, 2, 4, 3, 5, 4, 6];

// Event listeners for all white keys
for (let i = 0; i < white_notes.length; i++) {
  let note = white_notes[i];
  note.addEventListener("mousedown", () => whiteNoteOn(note));
  note.addEventListener("mouseup", () => whiteNoteOff(note));
}

// Event listeners for all black keys
for (let i = 0; i < black_notes.length; i++) {
  let note = black_notes[i];
  note.addEventListener("mousedown", () => blackNotesOn(note));
  note.addEventListener("mouseup", () => blackNotesOff(note));
}


// Activating white key
function whiteNoteOn(elem) {
  let note_name = elem.getAttribute('id');
  let res = note_name.substr(0, note_name.length - 1).toUpperCase();
  Tone.start();
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(res + "4", "8n");
  res += " Note";
  console.log(res, "Clicked");
  elem.classList.add("whiteActive");
}

// Activating black key
function blackNotesOn(elem) {
  let note_name = elem.getAttribute('id');
  let res = note_name.substr(0, note_name.length - 2).toUpperCase();
  Tone.start();
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(res + "#4", "8n");
  res += " Sharp Note";
  console.log(res, "Clicked");
  elem.classList.add("blackActive");
}

// Deactivating white key
function whiteNoteOff(elem) {
  console.log("Declicked");
  elem.classList.remove("whiteActive");
}

// Deactivating black key
function blackNotesOff(elem) {
  console.log("Declicked");
  elem.classList.remove("blackActive");
}


// MIDI Controller specific 
// Uncomment console.log(event) to see details about your controller
const DEVICE = "Arturia KeyLab Essential 88";

let on = false;

const midi = new MIDI(handleEvent);
midi.initialize().then(() => {
  console.log("MIDI Initialized!");
});

function handleEvent(event) {
  // Uncomment this to see every event from every controller
  // console.log(event);
  const { device, type, a, b } = event;
  if (device.name !== DEVICE) return;
  if (type === "note_on") {
    if (color[a.value % 12] == 0) {
      let note = white_notes[num[a.value % 12]];
      whiteNoteOn(note);
    }
    else {
      let note = black_notes[num[a.value % 12]];
      blackNotesOn(note);
    }
    on = true;
  } else if (type === "note_off") {
    if (color[a.value % 12] == 0) {
      let note = white_notes[num[a.value % 12]];
      whiteNoteOff(note);
    }
    else {
      let note = black_notes[num[a.value % 12]];
      blackNotesOff(note);
    }
    on = false;
  }
}