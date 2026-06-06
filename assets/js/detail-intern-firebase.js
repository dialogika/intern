import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyzzEYbJkkl-N8snrQf14qvj8De4YliV0",
  authDomain: "pre-dialogika.firebaseapp.com",
  projectId: "pre-dialogika",
  storageBucket: "pre-dialogika.firebasestorage.app",
  messagingSenderId: "343771410480",
  appId: "1:343771410480:web:32881c9868522090237df5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const candidate = await resolveCandidate();

    if (!candidate) {
      renderNotFoundState();
      return;
    }

    renderCandidate(candidate);
  } catch (error) {
    console.error("Error loading detail intern:", error);
    renderNotFoundState();
  }
});

async function resolveCandidate() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (userId) {
    return await fetchFirebaseCandidate(userId);
  }

  const tagsRaw = urlParams.get("tags");
  let parsedTags = [];
  if (tagsRaw) {
    try {
      parsedTags = JSON.parse(tagsRaw);
    } catch {
      parsedTags = tagsRaw.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }

  const name = urlParams.get("name");
  if (!name) {
    return null;
  }

  return {
    name,
    positionName: urlParams.get("position") || "Intern",
    description: urlParams.get("about") || "",
    photo: urlParams.get("avatar") || "../assets/img/portofolio/default.webp",
    phone: urlParams.get("whatsapp") || "",
    instagram: urlParams.get("instagram") || "",
    linkedin: urlParams.get("linkedin") || "",
    rating: Number(urlParams.get("rating") || 0),
    tags: parsedTags,
    resumePath: urlParams.get("resume") || "",
    referenceEmail: urlParams.get("referenceEmail") || "admin@dialogika.co",
    appraisal: null,
  };
}

async function fetchFirebaseCandidate(userId) {
  const positionsSnapshot = await getDocs(collection(db, "positions"));
  const positionsMap = {};
  positionsSnapshot.forEach((docSnap) => {
    positionsMap[docSnap.id] = docSnap.data().name || docSnap.id;
  });

  const querySnapshot = await getDocs(collection(db, "interns_resume"));
  let internData = null;
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.user_id === userId || docSnap.id === userId) {
      internData = { ...data, docId: docSnap.id };
    }
  });

  if (!internData) {
    return null;
  }

  return {
    name: internData.name || "Intern",
    positionName:
      positionsMap[internData.position] || internData.position || "Intern",
    description: internData.description || "",
    photo: internData.photo || "../assets/img/portofolio/default.webp",
    phone: internData.phone || "",
    instagram: internData.instagram || "",
    linkedin: internData.linkedin || "",
    rating: 3,
    tags: ["Completed Intern"],
    resumePath: internData.resume || "",
    referenceEmail:
      (internData.appraisal && internData.appraisal.referenceEmail) ||
      "admin@dialogika.co",
    appraisal: internData.appraisal || null,
  };
}

function renderCandidate(candidate) {
  updateMeta(candidate);
  updateBreadcrumb(candidate);
  updateProfileCard(candidate);
  updateScoreCards(candidate.appraisal);
  updateTalentNotes(candidate.appraisal);
  updateAchievements(candidate.appraisal);
  updateImprovements(candidate.appraisal);
}

function updateMeta(candidate) {
  const title = `${candidate.name} | ${candidate.positionName} | Dialogika`;
  document.title = title;

  setMetaContent("meta-description", `Resume ${candidate.name} program internship di Dialogika pada bagian ${candidate.positionName}.`);
  setMetaContent("meta-keywords", `resume ${candidate.name}, ${candidate.positionName}, intern dialogika`);
  setMetaContent("meta-og-title", title);
  setMetaContent("meta-og-description", candidate.description || "Detail resume intern Dialogika.");
  setMetaContent("meta-og-image", candidate.photo || "../assets/img/portofolio/default.webp");
  setMetaContent("meta-og-url", window.location.href);
}

function updateBreadcrumb(candidate) {
  const breadcrumbName = document.getElementById("breadcrumbName");
  const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
  if (breadcrumbName) breadcrumbName.textContent = candidate.name;
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = candidate.name;
}

function updateProfileCard(candidate) {
  const fullnameEl = document.querySelector(".card-fullname");
  const jobtitleEl = document.querySelector(".card-jobtitle");
  const avatarEl = document.querySelector(".card-avatar");
  const aboutTextEl = document.getElementById("aboutText");
  const tagBadgesEl = document.getElementById("tagBadges");
  const socialLinksEl = document.getElementById("socialLinks");
  const whatsappButton = document.getElementById("whatsappButton");
  const referenceButton = document.getElementById("referenceButton");
  const resumeButtonWrapper = document.getElementById("resumeButtonWrapper");
  const resumeLink = document.getElementById("resumeLink");

  if (fullnameEl) {
    fullnameEl.textContent = candidate.name || "Intern";
  }
  if (jobtitleEl) {
    jobtitleEl.textContent = candidate.positionName || "Intern";
  }
  if (avatarEl) {
    avatarEl.src = candidate.photo || "../assets/img/portofolio/default.webp";
    avatarEl.alt = candidate.name || "avatar intern";
  }

  if (aboutTextEl) {
    const description = (candidate.description || "").trim();
    if (description.length > 150) {
      const shortText = description.slice(0, 150).replace(/\s+\S*$/, "").trim();
      const longText = description.slice(shortText.length).trim();
      aboutTextEl.innerHTML = `${shortText}<span class="dots">...</span><span class="readMore">Read more</span><span class="moreText">${longText}<span class="readLess">&laquo;Read Less</span></span>`;
    } else {
      aboutTextEl.textContent = description || "Profil intern belum tersedia.";
    }
  }

  if (tagBadgesEl) {
    const tags = Array.isArray(candidate.tags) && candidate.tags.length
      ? candidate.tags
      : ["Profile Available"];
    tagBadgesEl.innerHTML = tags
      .map((tag) => `<span class="badge rounded-pill ${getTagClass(tag)}">${tag}</span>`)
      .join(" ");
  }

  if (socialLinksEl) {
    const socialLinks = [];
    if (candidate.instagram) {
      socialLinks.push(
        `<a href="${candidate.instagram}" target="_blank" rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>`
      );
    }
    if (candidate.linkedin) {
      socialLinks.push(
        `<a href="${candidate.linkedin}" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>`
      );
    }
    socialLinksEl.innerHTML = socialLinks.length
      ? socialLinks.join("")
      : `<span class="text-muted small">Social link belum tersedia.</span>`;
  }

  if (whatsappButton) {
    const whatsappUrl = normalizeWhatsappUrl(candidate.phone);
    if (whatsappUrl) {
      whatsappButton.disabled = false;
      whatsappButton.setAttribute("onclick", `location.href='${whatsappUrl}';`);
    } else {
      whatsappButton.disabled = true;
      whatsappButton.setAttribute("onclick", "return false;");
    }
  }

  if (referenceButton) {
    referenceButton.setAttribute(
      "onclick",
      `location.href='mailto:${candidate.referenceEmail || "admin@dialogika.co"}';`
    );
  }

  if (resumeButtonWrapper && resumeLink) {
    const hasResume =
      candidate.resumePath &&
      candidate.resumePath !== "-" &&
      candidate.resumePath !== "undefined";
    resumeButtonWrapper.style.display = hasResume ? "" : "none";
    if (hasResume) {
      resumeLink.href = candidate.resumePath;
    }
  }

  renderRatingStars(candidate.rating || 0);
}

function updateScoreCards(appraisal) {
  const coreScores = appraisal && appraisal.core ? appraisal.core : {};
  const scoreTalent = {
    excellentScore: Number(coreScores.ach || 0),
    acceptableAttendance: Number(coreScores.int || 0),
    notbadProject: Number(coreScores.tw || 0),
    excellentRoutine: Number(coreScores.oc || 0),
    moderateRole: Number(coreScores.tl || 0),
    noviceInitiative: Number(coreScores.sct || 0),
  };

  updateAssessmentText("text-ach", scoreTalent.excellentScore);
  updateAssessmentText("text-int", scoreTalent.acceptableAttendance);
  updateAssessmentText("text-tw", scoreTalent.notbadProject);
  updateAssessmentText("text-oc", scoreTalent.excellentRoutine);
  updateAssessmentText("text-tl", scoreTalent.moderateRole);
  updateAssessmentText("text-sct", scoreTalent.noviceInitiative);

  assessment(scoreTalent);
  renderRadarChart(scoreTalent);
}

function updateTalentNotes(appraisal) {
  const notesEl = document.getElementById("talentNotesText");
  if (!notesEl) return;
  notesEl.textContent =
    (appraisal && appraisal.talentNotes) ||
    "Catatan talent belum tersedia.";
}

function updateAchievements(appraisal) {
  const achievementListEl = document.getElementById("talentAchievementList");
  if (!achievementListEl) return;

  const rawText =
    (appraisal && appraisal.talentAchievement) || "";
  const items = rawText
    .split("\n")
    .map((item) => item.replace(/^- /, "").trim())
    .filter(Boolean);

  achievementListEl.innerHTML = items.length
    ? items.map((item) => `<li style="margin-bottom: 10px">${item}</li>`).join("")
    : `<li style="margin-bottom: 10px">Data achievement belum tersedia.</li>`;
}

function updateImprovements(appraisal) {
  const activityContainer = document.getElementById("needToImproveList");
  if (!activityContainer) return;

  const improvements =
    appraisal && Array.isArray(appraisal.needToImprove)
      ? appraisal.needToImprove
      : [];

  if (!improvements.length) {
    activityContainer.innerHTML = `<div class="activity-item d-flex">
      <div class="activite-label">-</div>
      <i class="bi bi-circle-fill activity-badge align-self-start" style="color: #94a3b8"></i>
      <div class="activity-content">
        <b>Belum ada catatan</b><br />
        <small>Masukan pengembangan akan tampil setelah data tersedia.</small>
      </div>
    </div>`;
    return;
  }

  const colors = ["#f37335", "#faa832", "#fec632", "#84cc16", "#38bdf8"];
  const labels = ["1st", "2nd", "3rd", "4th", "5th"];

  activityContainer.innerHTML = improvements
    .map(
      (imp, index) => `<div class="activity-item d-flex">
        <div class="activite-label">${labels[index] || `${index + 1}th`}</div>
        <i class="bi bi-circle-fill activity-badge align-self-start" style="color: ${colors[index % colors.length]}"></i>
        <div class="activity-content">
          <b>${imp.header || "Need to Improve"}</b><br />
          <small>${imp.content || "-"}</small>
        </div>
      </div>`
    )
    .join("");
}

function renderNotFoundState() {
  document.title = "Intern Not Found | Dialogika";
  const breadcrumbName = document.getElementById("breadcrumbName");
  const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
  const fullnameEl = document.querySelector(".card-fullname");
  const jobtitleEl = document.querySelector(".card-jobtitle");
  const aboutTextEl = document.getElementById("aboutText");

  if (breadcrumbName) breadcrumbName.textContent = "Intern Not Found";
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = "Intern Not Found";
  if (fullnameEl) fullnameEl.textContent = "Intern Not Found";
  if (jobtitleEl) jobtitleEl.textContent = "Data tidak ditemukan";
  if (aboutTextEl) {
    aboutTextEl.textContent = "Data profil intern tidak tersedia atau tautan tidak valid.";
  }
}

function renderRatingStars(rating) {
  const ratingStarsEl = document.getElementById("ratingStars");
  if (!ratingStarsEl) return;

  const safeRating = Number(rating || 0);
  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.5;
  let html = "";

  for (let i = 0; i < fullStars; i += 1) {
    html += `<a onclick="return false;"><i class="bi bi-star-fill"></i></a>`;
  }

  if (hasHalf) {
    html += `<a onclick="return false;"><i class="bi bi-star-half"></i></a>`;
  }

  const renderedCount = fullStars + (hasHalf ? 1 : 0);
  for (let i = renderedCount; i < 5; i += 1) {
    html += `<a onclick="return false;"><i class="bi bi-star"></i></a>`;
  }

  ratingStarsEl.innerHTML = html;
}

function renderRadarChart(scoreTalent) {
  const minimumScore = [13, 11, 13, 11, 12, 12];
  const grafikPotensial = [
    scoreTalent.excellentScore,
    scoreTalent.acceptableAttendance,
    scoreTalent.notbadProject,
    scoreTalent.excellentRoutine,
    scoreTalent.moderateRole,
    scoreTalent.noviceInitiative,
  ];

  setTimeout(() => {
    try {
      const chartElement = document.querySelector("#budgetChart");
      if (!chartElement || typeof echarts === "undefined") return;

      echarts.init(chartElement).setOption({
        legend: { data: ["Minimum", "Report"] },
        radar: {
          indicator: [
            { name: "ACH", max: 25 },
            { name: "INT", max: 25 },
            { name: "TW", max: 25 },
            { name: "OC", max: 25 },
            { name: "TL", max: 25 },
            { name: "SCT", max: 25 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              { value: minimumScore, name: "Minimum" },
              { value: grafikPotensial, name: "Report" },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error initializing chart:", error);
    }
  }, 100);
}

function updateAssessmentText(id, score) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = getTextAssessment(score);
  el.style.color = GetBgColorScore(score);
}

function assessment(score) {
  const assignColor = (id, scoreValue) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = scoreValue || "-";
    el.style.color = GetBgColorScore(scoreValue);
  };

  const assignBg = (id, scoreValue) => {
    const el = document.getElementById(id);
    if (el) el.style.backgroundColor = GetBgColorScore(scoreValue);
  };

  assignColor("excellent-score", score.excellentScore);
  assignBg("excellent-score-container", score.excellentScore);

  assignColor("acceptable-score", score.acceptableAttendance);
  assignBg("acceptableAttendanceContainer", score.acceptableAttendance);

  assignColor("notbadProject-score", score.notbadProject);
  assignBg("notbadProjectContainer", score.notbadProject);

  assignColor("excellentRoutine-score", score.excellentRoutine);
  assignBg("excellentRoutineContainer", score.excellentRoutine);

  assignColor("moderateRole-score", score.moderateRole);
  assignBg("moderateRoleContainer", score.moderateRole);

  assignColor("noviceInitiative-score", score.noviceInitiative);
  assignBg("noviceInitiativeContainer", score.noviceInitiative);
}

function normalizeWhatsappUrl(phone) {
  const sanitized = String(phone || "").replace(/\D/g, "");
  return sanitized ? `https://wa.me/${sanitized}` : "";
}

function setMetaContent(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  element.setAttribute("content", value);
}

function getTagClass(tag) {
  switch (tag) {
    case "Completed Intern":
      return "text-bg-success";
    case "Extended Intern":
      return "text-bg-info";
    case "Excellent Talent":
      return "text-bg-warning";
    case "CEO Verified":
      return "text-bg-primary";
    case "Incomplete Intern":
      return "text-bg-danger";
    default:
      return "text-bg-secondary";
  }
}

function GetBgColorScore(score) {
  const number = Number(score);
  if (!number) return "#94a3b8";
  if (number >= 17) return "#006A4E";
  if (number >= 11 && number <= 16) return "#F7B12C";
  return "#E7181A";
}

function getTextAssessment(score) {
  const number = Number(score);
  if (!number) return "Not Available";
  if (number >= 17) return "Outstanding";
  if (number >= 11 && number <= 16) return "Acceptable";
  return "Poor";
}
