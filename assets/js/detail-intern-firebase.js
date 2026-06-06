import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyzzEYbJkkl-N8snrQf14qvj8De4YliV0",
    authDomain: "pre-dialogika.firebaseapp.com",
    projectId: "pre-dialogika",
    storageBucket: "pre-dialogika.firebasestorage.app",
    messagingSenderId: "343771410480",
    appId: "1:343771410480:web:32881c9868522090237df5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        console.error("No user ID provided in URL");
        document.querySelector('.card-fullname').innerText = "Intern Not Found";
        return;
    }

    try {
        // Fetch User Data. We need to query interns_resume where user_id == userId OR maybe userId is the document ID.
        // Wait, in data-intern-card.js, querySnapshot.forEach(doc => doc.data().user_id).
        // Let's assume we can fetch all and find the matching one, or use a query. 
        // For simplicity and since we don't have query imported, we'll fetch all and filter (or we can just import query, where).
        const querySnapshot = await getDocs(collection(db, "interns_resume"));
        let internData = null;
        querySnapshot.forEach((docSnap) => {
            if (docSnap.data().user_id === userId || docSnap.id === userId) {
                internData = docSnap.data();
            }
        });

        if (!internData) {
            document.querySelector('.card-fullname').innerText = "Intern Not Found";
            return;
        }

        // Fetch positions map
        const positionsSnapshot = await getDocs(collection(db, "positions"));
        const positionsMap = {};
        positionsSnapshot.forEach((docSnap) => {
            positionsMap[docSnap.id] = docSnap.data().name || docSnap.id;
        });

        const positionName = positionsMap[internData.position] || internData.position || "Intern";

        // Update basic info
        document.querySelector('title').innerText = `${internData.name || 'Intern'} | ${positionName} | Dialogika`;
        const breadcrumbLast = document.querySelector('.breadcrumbs ol li:last-child');
        if (breadcrumbLast) breadcrumbLast.innerText = internData.name;
        const breadcrumbTitle = document.querySelector('.breadcrumbs h2');
        if (breadcrumbTitle) breadcrumbTitle.innerText = internData.name;

        document.querySelector('.card-fullname').innerHTML = `${internData.name || "Unknown"} <i class="bi bi-patch-check-fill text-primary"></i>`;
        document.querySelector('.card-jobtitle').innerText = positionName;
        document.querySelector('.card-avatar').src = internData.photo || "../assets/img/portofolio/default.webp";
        
        // About me desc
        const descEl = document.querySelector('.card-desc');
        if (descEl) {
            const desc = internData.description || "";
            descEl.innerHTML = `${desc.slice(0, 150)}<span class="dots">...</span><span class="readMore">Read more</span><span class="moreText">${desc.slice(150)}<span class="readLess">&laquo;Read Less</span></span>`;
        }

        // WhatsApp and Supervisor Buttons
        const waBtn = document.querySelector('button[onclick*="wa.me"]');
        if (waBtn && internData.phone) waBtn.setAttribute('onclick', `location.href='https://wa.me/${internData.phone.replace(/\D/g, "")}';`);

        const emailBtn = document.querySelector('button[onclick*="mailto:"]');
        if (emailBtn) {
            const refEmail = (internData.appraisal && internData.appraisal.referenceEmail) ? internData.appraisal.referenceEmail : "admin@dialogika.co";
            emailBtn.setAttribute('onclick', `location.href='mailto:${refEmail}';`);
        }

        // Social Links
        const socialContainer = document.querySelector('.card-social');
        if (socialContainer) {
            let socialHTML = "";
            if (internData.instagram) {
                socialHTML += `<a href="${internData.instagram}" target="_blank"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0" /><path d="M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0" /><path d="M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0" /></svg></a>`;
            }
            if (internData.linkedin) {
                socialHTML += `<a href="${internData.linkedin}" target="_blank"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z" /></svg></a>`;
            }
            socialContainer.innerHTML = socialHTML;
        }

        // Populate Scores (ACH, INT, TW, OC, TL, SCT)
        const coreScores = (internData.appraisal && internData.appraisal.core) ? internData.appraisal.core : {};
        const scoreTalent = {
            excellentScore: coreScores.ach || 0,
            acceptableAttendance: coreScores.int || 0,
            notbadProject: coreScores.tw || 0,
            excellentRoutine: coreScores.oc || 0,
            moderateRole: coreScores.tl || 0,
            noviceInitiative: coreScores.sct || 0,
        };

        const ach = getTextAssessment(scoreTalent.excellentScore);
        const int = getTextAssessment(scoreTalent.acceptableAttendance);
        const tw = getTextAssessment(scoreTalent.notbadProject);
        const oc = getTextAssessment(scoreTalent.excellentRoutine);
        const tl = getTextAssessment(scoreTalent.moderateRole);
        const sct = getTextAssessment(scoreTalent.noviceInitiative);

        document.getElementById("text-ach").innerText = ach;
        document.getElementById("text-int").innerText = int;
        document.getElementById("text-tw").innerText = tw;
        document.getElementById("text-oc").innerText = oc;
        document.getElementById("text-tl").innerText = tl;
        document.getElementById("text-sct").innerText = sct;

        document.getElementById("text-ach").style.color = GetBgColorScore(scoreTalent.excellentScore);
        document.getElementById("text-int").style.color = GetBgColorScore(scoreTalent.acceptableAttendance);
        document.getElementById("text-tw").style.color = GetBgColorScore(scoreTalent.notbadProject);
        document.getElementById("text-oc").style.color = GetBgColorScore(scoreTalent.excellentRoutine);
        document.getElementById("text-tl").style.color = GetBgColorScore(scoreTalent.moderateRole);
        document.getElementById("text-sct").style.color = GetBgColorScore(scoreTalent.noviceInitiative);

        assessment(scoreTalent);

        // Talent Notes and Achievement
        const notesCard = document.querySelector('.card-title:contains("Talent Notes")')?.nextElementSibling || document.querySelectorAll('.card-body')[7]?.querySelector('a'); 
        // We will target specific text container instead of messy DOM query. Let's just find the parent card-title containing "Talent Notes"
        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            if (title.innerText.includes("Talent Notes")) {
                const notesBody = title.parentElement.querySelector('a') || title.parentElement.querySelector('p');
                if (notesBody) {
                    notesBody.innerText = (internData.appraisal && internData.appraisal.talentNotes) ? internData.appraisal.talentNotes : "-";
                }
            } else if (title.innerText.includes("Talent Achievement")) {
                const achievementBody = title.parentElement.querySelector('ul');
                if (achievementBody) {
                    const txt = (internData.appraisal && internData.appraisal.talentAchievement) ? internData.appraisal.talentAchievement : "";
                    const items = txt.split('\n').filter(i => i.trim() !== "");
                    achievementBody.innerHTML = items.map(item => `<li style="margin-bottom: 10px">${item.replace(/^- /, '')}</li>`).join('');
                }
            }
        });

        // Need to Improve
        const activityContainer = document.querySelector('.activity');
        if (activityContainer) {
            const improvements = (internData.appraisal && Array.isArray(internData.appraisal.needToImprove)) ? internData.appraisal.needToImprove : [];
            let improveHTML = "";
            const colors = ['#f37335', '#faa832', '#fec632', '#fec632', '#fec632'];
            const labels = ['1st', '2nd', '3rd', '4th', '5th'];
            
            improvements.forEach((imp, i) => {
                improveHTML += `<div class="activity-item d-flex">
                    <div class="activite-label">${labels[i] || (i+1)+'th'}</div>
                    <i class="bi bi-circle-fill activity-badge align-self-start" style="color: ${colors[i%colors.length]}"></i>
                    <div class="activity-content">
                    <b>${imp.header || "Need to Improve"}</b><br />
                    <small>${imp.content || ""}</small>
                    </div>
                </div>`;
            });
            activityContainer.innerHTML = improveHTML;
        }

        // Radar Chart
        const minimumScore = [13, 11, 13, 11, 12, 12];
        const grafikPotensial = [
            scoreTalent.excellentScore,
            scoreTalent.acceptableAttendance,
            scoreTalent.notbadProject,
            scoreTalent.excellentRoutine,
            scoreTalent.moderateRole,
            scoreTalent.noviceInitiative
        ];

        setTimeout(() => {
            try {
              const chartElement = document.querySelector("#budgetChart");
              if (chartElement && typeof echarts !== 'undefined') {
              var budgetChart = echarts.init(chartElement).setOption({
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
                  series: [{
                      name: "Budget vs spending",
                      type: "radar",
                      data: [
                        { value: minimumScore, name: "Minimum" },
                        { value: grafikPotensial, name: "Report" },
                      ],
                    }],
                });
            }
          } catch (error) {
            console.error("Error initializing chart:", error);
          }
          }, 100);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// utils
function assessment(score) {
    const assignColor = (id, scoreValue) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = scoreValue;
            el.style.color = GetBgColorScore(scoreValue);
        }
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

function GetBgColorScore(score) {
    const number = Number(score);
    if (!number) return "black";

    if (number >= 17) return "#006A4E"; 
    if (number >= 11 && score <= 16) return "#F7B12C"; 
    if (number <= 10) return "#E7181A"; 
}

function getTextAssessment(score) {
    const number = Number(score);
    if (!number) return "black";

    if (number >= 17) return "Outstanding";
    if (number >= 11 && score <= 16) return "Acceptable";
    if (number <= 10) return "Poor";
}
