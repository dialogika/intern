const excellent = document.getElementById("excellent-score");
const acceptableAttendance = document.getElementById("acceptable-score");
const notbadProject = document.getElementById("notbadProject-score");
const excellentRoutine = document.getElementById("excellentRoutine-score");
const moderateRole = document.getElementById("moderateRole-score");
const noviceInitiative = document.getElementById("noviceInitiative-score");

const textAch = document.getElementById("text-ach");
const textInt = document.getElementById("text-int");
const textTw = document.getElementById("text-tw");
const textOc = document.getElementById("text-oc");
const textTl = document.getElementById("text-tl");
const textSct = document.getElementById("text-sct");

const excellentContainer = document.getElementById("excellent-score-container");
const acceptableAttendanceContainer = document.getElementById(
  "acceptableAttendanceContainer"
);
const notbadProjectContainer = document.getElementById(
  "notbadProjectContainer"
);
const excellentRoutineContainer = document.getElementById(
  "excellentRoutineContainer"
);
const moderateRoleContainer = document.getElementById("moderateRoleContainer");
const noviceInitiativeContainer = document.getElementById(
  "noviceInitiativeContainer"
);

const testimoniTalent = document.getElementById("testimoni-talent");
const tagKemampuan1 = document.getElementById("kemampuan1");
const tagDeskripsiKemampuan1 = document.getElementById("deskripsi-kemampuan1");
const tagKemampuan2 = document.getElementById("kemampuan2");
const tagDeskripsiKemampuan2 = document.getElementById("deskripsi-kemampuan2");
const tagKemampuan3 = document.getElementById("kemampuan3");
const tagDeskripsiKemampuan3 = document.getElementById("deskripsi-kemampuan3");

const testimoni =
  "seru internship di dialogika, sebuah pengalaman yang berharga buatku karena banyak ilmu baru yang didapat. internship disini juga meningkatkan kesiapanku menghadapi dunia kerja.";

const kemampuan = {
  kemampuan1: "Search Engine Optimization",
  descKemampuan1:
    "di sini aku belajar menulis konten blog dan website yang menarik, informatif, dan SEO-friendly",

  kemampuan2: "Team work",
  descKemampuan2:
    "diskusi, brainstorming, bekerjasama dalam tim yang memiliki berbagai keahlian atau bidangnya masing-masing",

  kemampuan3: "Media Buying",
  descKemampuan3:
    "belajar strategi media buying untuk mempromosikan suatu produk dan layanan yang ditawarkan. Dalam hal ini yaitu blog yang saya tulis selama intern di dialogika.",
};

const scoreTalent = {
  excellentScore: 16,
  acceptableAttendance: 15,
  notbadProject: 5,
  excellentRoutine: 20,
  moderateRole: 21,
  noviceInitiative: 25,
};

// speed , percise, mentality, communication, sense, discipline
const minimumScore = [10, 10, 10, 10, 10, 10];
const grafikPotensial = [20, 18, 10, 13, 10, 14];

const score = scoreTalent;
const grafik = grafikPotensial;

document.addEventListener("DOMContentLoaded", () => {
  testimoniTalent.innerHTML = testimoni;
  addKemampuan(kemampuan);
  assessment(score);

  const ach = getTextAssessment(score.excellentScore);
  const int = getTextAssessment(score.acceptableAttendance);
  const tw = getTextAssessment(score.notbadProject);
  const oc = getTextAssessment(score.excellentRoutine);
  const tl = getTextAssessment(score.moderateRole);
  const sct = getTextAssessment(score.noviceInitiative);

  textAch.innerHTML = ach;
  textInt.innerHTML = int;
  textTw.innerHTML = tw;
  textOc.innerHTML = oc;
  textTl.innerHTML = tl;
  textSct.innerHTML = sct;

  // grafik start
  var budgetChart = echarts
    .init(document.querySelector("#budgetChart"))
    .setOption({
      legend: {
        data: ["Minimum", "Ideal"],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          {
            name: "Speed",
            max: 20,
          },
          {
            name: "Percise",
            max: 20,
          },
          {
            name: "Mentality",
            max: 20,
          },
          {
            name: "Communication",
            max: 20,
          },
          {
            name: "Sense",
            max: 20,
          },
          {
            name: "Discipline",
            max: 20,
          },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: minimumScore,
              name: "Minimum",
            },
            {
              value: grafik,
              name: "Ideal",
            },
          ],
        },
      ],
    });
  // grafik end
});

// utils start
function assessment(score) {
  excellent.innerHTML = score.excellentScore;
  excellent.style.color = GetBgColorScore(score.excellentScore);
  excellentContainer.style.backgroundColor = GetBgColorScore(
    score.excellentScore
  );

  acceptableAttendance.innerHTML = score.acceptableAttendance;
  acceptableAttendance.style.color = GetBgColorScore(
    score.acceptableAttendance
  );
  acceptableAttendanceContainer.style.backgroundColor = GetBgColorScore(
    score.acceptableAttendance
  );

  notbadProject.innerHTML = score.notbadProject;
  notbadProject.style.color = GetBgColorScore(score.notbadProject);
  notbadProjectContainer.style.backgroundColor = GetBgColorScore(
    score.notbadProject
  );

  excellentRoutine.innerHTML = score.excellentRoutine;
  excellentRoutine.style.color = GetBgColorScore(score.excellentRoutine);
  excellentRoutineContainer.style.backgroundColor = GetBgColorScore(
    score.excellentRoutine
  );

  moderateRole.innerHTML = score.moderateRole;
  moderateRole.style.color = GetBgColorScore(score.moderateRole);
  moderateRoleContainer.style.backgroundColor = GetBgColorScore(
    score.moderateRole
  );

  noviceInitiative.innerHTML = score.noviceInitiative;
  noviceInitiative.style.color = GetBgColorScore(score.noviceInitiative);
  noviceInitiativeContainer.style.backgroundColor = GetBgColorScore(
    score.noviceInitiative
  );
}

function addKemampuan({
  kemampuan1,
  kemampuan2,
  kemampuan3,
  descKemampuan1,
  descKemampuan2,
  descKemampuan3,
}) {
  tagKemampuan1.innerHTML = kemampuan1;
  tagKemampuan2.innerHTML = kemampuan2;
  tagKemampuan3.innerHTML = kemampuan3;

  tagDeskripsiKemampuan1.innerHTML = descKemampuan1;
  tagDeskripsiKemampuan2.innerHTML = descKemampuan2;
  tagDeskripsiKemampuan3.innerHTML = descKemampuan3;
}

function GetBgColorScore(score) {
  const number = Number(score);
  if (!number) return "black";

  if (number >= 17) return "#006A4E"; // hijau "#006A4E"
  if (number >= 11 && score <= 16) return "#F7B12C"; // kuning "#F7B12C"
  if (number <= 10) return "#E7181A"; // merah "#E7181A"
}

function getTextAssessment(score) {
  const number = Number(score);
  if (!number) return "black";

  if (number >= 17) return "Outstanding";
  if (number >= 11 && score <= 16) return "Acceptable";
  if (number <= 10) return "Poor";
}

// function GetBgColorScore(score) {
//   if (score <= 8) return "white"; // white
//   if (score >= 9 && score <= 11) return "black"; // black
//   if (score >= 12 && score <= 16) return "black"; // black
//   if (score >= 17) return "black"; // black
// }
// utils end
