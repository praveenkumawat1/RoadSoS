import React from "react";
import hero from "../assets/hero.png";
import cpr from "../assets/cpr.svg";
import bleeding from "../assets/bleeding.svg";
import burn from "../assets/burn.svg";
import strokeImg from "../assets/stroke.svg";
import accident from "../assets/accident.svg";

export const kitItems = [
  "Sterile gauze pads (various sizes)",
  "Adhesive bandages (assorted)",
  "Adhesive tape / roller bandage",
  "Antiseptic wipes / solution",
  "Trauma dressing / large sterile pad",
  "Disposable gloves (nitrile)",
  "CPR face shield / mask",
  "Scissors and tweezers",
  "Triangular bandage / sling",
  "Instant cold pack",
  "Thermometer",
  "Flashlight + spare batteries",
  "Blanket (space blanket)",
];

const img = hero;

export const categories = [
  {
    id: "road-accident",
    title: "Road Side Safety",
    image: accident,
    short: "Critical steps to take at a collision site before help arrives.",
    long: `Secure the scene, triage victims, and prevent further danger. Prioritize life-saving actions: airway, control severe bleeding, and maintain circulation while waiting for EMS.`,
    equipment: [
      "High-visibility vest",
      "Warning triangle",
      "Large sterile dressings",
    ],
    steps: [
      "Make the scene safe and visible",
      "Call emergency services with location",
      "Assess airway, breathing, circulation",
      "Control severe bleeding and prevent shock",
    ],
  },
  {
    id: "stroke",
    title: "Stroke (F.A.S.T.)",
    image: strokeImg,
    short: "Recognize stroke signs and call immediately.",
    long: `Use the F.A.S.T. test: Face, Arms, Speech, Time. Rapid treatment can reduce long-term disability.`,
    equipment: ["Clock to note time"],
    steps: [
      "Check Face, Arms, Speech",
      "Call EMS and note time of onset",
      "Keep patient calm",
    ],
  },
  {
    id: "cardiac",
    title: "Cardiac Arrest / CPR",
    image: cpr,
    short: "Start hands-only CPR immediately on collapse.",
    long: `Recognize sudden collapse and absent breathing; start chest compressions at 100-120/min. Use AED when available. Continuously perform CPR until help arrives.`,
    equipment: ["CPR mask", "AED if available"],
    steps: [
      "Call EMS",
      "Push hard and fast in centre of chest",
      "Use AED if available",
    ],
  },
  {
    id: "choking",
    title: "Choking (Airway obstruction)",
    image: img,
    short: "Perform abdominal thrusts / back blows depending on age.",
    long: `For conscious adults, alternate back blows and abdominal thrusts. For infants, use chest thrusts and back blows. If the person becomes unconscious, begin CPR and call for help.`,
    equipment: ["None required"],
    steps: [
      "Encourage coughing if effective",
      "Give back blows and abdominal thrusts",
      "If unconscious, begin CPR",
    ],
  },
  {
    id: "seizures",
    title: "Seizures / Fits",
    image: img,
    short: "Protect the person, time the seizure, don't restrain.",
    long: `Clear hard objects, protect the head, and place in recovery position once convulsions stop. Call EMS if seizure lasts >5 minutes or repeats.`,
    equipment: ["Soft padding (jacket)"],
    steps: [
      "Protect head and airway",
      "Time the seizure",
      "Turn onto side when safe",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    image: bleeding,
    short: "Apply direct pressure; use tourniquet if necessary.",
    long: `Direct pressure with clean cloth is primary. If life-threatening limb bleeding persists, a high and tight tourniquet proximal to wound can be life-saving.`,
    equipment: ["Sterile dressings", "Tourniquet (if trained)"],
    steps: [
      "Apply firm pressure",
      "Elevate limb if possible",
      "Use tourniquet if uncontrolled",
    ],
  },
  {
    id: "burns",
    title: "Burns (Thermal/Chemical)",
    image: burn,
    short: "Cool with running water; do not apply greasy substances.",
    long: `Cool burn under running water for 20 minutes, remove jewelry before swelling, cover loosely. Seek professional care for large or deep burns.`,
    equipment: ["Cool water source", "Sterile dressings"],
    steps: [
      "Cool for 20 minutes",
      "Cover with sterile dressing",
      "Seek medical help for major burns",
    ],
  },
  {
    id: "drowning",
    title: "Drowning / Near-drowning",
    image: img,
    short: "Remove from water safely and start resuscitation if needed.",
    long: `Prioritize rescuers' safety. Once out, check breathing; begin CPR if not breathing. Keep warm and seek immediate medical evaluation even if recovered.`,
    equipment: ["Floatation device"],
    steps: [
      "Get person out safely",
      "Check breathing and pulse",
      "Begin CPR if needed",
    ],
  },
  {
    id: "electric-shock",
    title: "Electric Shock",
    image: img,
    short: "Do not touch victim while in contact; turn off power.",
    long: `Isolate power source before touching. Treat burns and check for cardiac arrest; many victims require advanced care.`,
    equipment: ["Non-conductive object to separate if safe"],
    steps: [
      "Turn off power",
      "Assess breathing and pulse",
      "Treat burns and call EMS",
    ],
  },
  {
    id: "eye-injuries",
    title: "Eye Injuries",
    image: img,
    short: "Flush chemical splashes for 15+ minutes; do not rub.",
    long: `For chemicals, irrigate continuously for at least 15 minutes. For penetrating injuries, shield the eye and seek urgent ophthalmic care.`,
    equipment: ["Sterile saline or clean water"],
    steps: [
      "Irrigate chemical exposures",
      "Do not apply pressure to penetrating injuries",
      "Seek specialist care",
    ],
  },
  {
    id: "fractures",
    title: "Broken Bones / Fractures",
    image: img,
    short: "Immobilize and support; treat for shock if necessary.",
    long: `Do not attempt to realign displaced fractures. Immobilize with splints, support limb, and transport for X-ray and definitive care.`,
    equipment: ["Splint materials", "Padding"],
    steps: ["Stop bleeding first", "Immobilize limb", "Transport to hospital"],
  },
  {
    id: "heatstroke",
    title: "Heatstroke / Heat Exhaustion",
    image: img,
    short: "Rapid cooling is essential for heatstroke.",
    long: `Move to shade, remove excess clothing, cool with water and fans, give sips of water if fully conscious. Heatstroke (altered mental status, very high temp) needs immediate medical care.`,
    equipment: ["Cool packs", "Fan"],
    steps: [
      "Move to cool area",
      "Cool body surfaces",
      "Seek urgent medical attention",
    ],
  },
  {
    id: "hypothermia",
    title: "Hypothermia",
    image: img,
    short: "Rewarm gradually and prevent further heat loss.",
    long: `Remove wet clothing, insulate with blankets, avoid rapid external heat on severe cases; get medical evaluation for moderate-severe hypothermia.`,
    equipment: ["Blankets", "Warm drinks if conscious"],
    steps: ["Move to warm area", "Replace wet clothing", "Warm gradually"],
  },
  {
    id: "allergic-reaction",
    title: "Allergic Reaction / Anaphylaxis",
    image: img,
    short:
      "Severe allergy with breathing or circulation problems—use epinephrine.",
    long: `Anaphylaxis is life-threatening. Use intramuscular epinephrine immediately and call emergency services. Repeat doses as advised.`,
    equipment: ["EpiPen (if prescribed)"],
    steps: [
      "Give epinephrine if available",
      "Call EMS",
      "Monitor airway and circulation",
    ],
  },
  {
    id: "asthma-attack",
    title: "Asthma Attack",
    image: img,
    short: "Use inhaler (bronchodilator) and seek help if not improving.",
    long: `Sit the person upright, give 4 puffs of reliever inhaler (with spacer if available), repeat every 4 minutes up to 4 times while waiting for EMS if severe.`,
    equipment: ["Reliever inhaler and spacer"],
    steps: [
      "Give inhaler doses per plan",
      "Call EMS if poor response",
      "Prepare for CPR if needed",
    ],
  },
  {
    id: "diabetic",
    title: "Diabetic Emergency (Hypoglycemia)",
    image: img,
    short:
      "Give fast-acting sugar for low blood glucose; seek help if unconscious.",
    long: `If conscious and able to swallow, give 15-20g fast-acting carbohydrate (juice, glucose gel). Recheck and repeat if needed. Unconscious patients require EMS and IV glucose.`,
    equipment: ["Glucose gel", "Juice/sugary snack"],
    steps: [
      "Give 15-20g sugar if conscious",
      "Recheck blood sugar and repeat if low",
      "Call EMS if unconscious",
    ],
  },
  {
    id: "overdose",
    title: "Overdose / Poisoning (Drug)",
    image: img,
    short: "Support breathing and circulation; naloxone for opioid overdose.",
    long: `If opioid overdose suspected (slow breathing, pinpoint pupils), administer naloxone if available and call EMS. Monitor airway and breathing.`,
    equipment: ["Naloxone (if available)"],
    steps: [
      "Call EMS",
      "Administer naloxone for opioid overdose",
      "Support breathing/CPR if required",
    ],
  },
  {
    id: "head-injury",
    title: "Head Injury / Concussion",
    image: img,
    short: "Assess consciousness and avoid moving neck if high-energy trauma.",
    long: `Monitor for loss of consciousness, vomiting, confusion, unequal pupils. Seek urgent medical care for signs of deterioration.`,
    equipment: ["Head support"],
    steps: [
      "Assess airway and breathing",
      "Monitor consciousness and vomiting",
      "Transport for evaluation",
    ],
  },
  {
    id: "spinal-injury",
    title: "Suspected Spinal Injury",
    image: img,
    short: "Keep the person still and immobilize the spine until help arrives.",
    long: `Do not move the patient unless immediate danger. Stabilize head and neck and call EMS.`,
    equipment: ["Cervical collar (if trained)"],
    steps: ["Do not move patient", "Stabilize head/neck", "Call EMS"],
  },
];

export default { categories, kitItems };
