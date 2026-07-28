// Generator Ramalan Jodoh & Statistik Kecocokan Interaktif

const BADGES = {
  romantis: [
    { title: "Takdir Ilahi 💖", min: 95 },
    { title: "Pasangan Soulmate 🌹", min: 90 },
    { title: "Kisah Cinta Novel ✨", min: 85 },
    { title: "Bucin Maksimal 🧸", min: 80 },
    { title: "Jodoh Manis 🍯", min: 75 }
  ],
  kocak: [
    { title: "Komplotan Rebutan Remot 📺", min: 95 },
    { title: "Tom & Jerry Abadi 🐱🐭", min: 90 },
    { title: "Mitra Ghibah & Kuliner 🍜", min: 85 },
    { title: "Pasangan Humor Gelap 😂", min: 80 },
    { title: "Duo Chaos Ceria 🤪", min: 75 }
  ],
  hot: [
    { title: "Chemistry Meledak 🔥", min: 95 },
    { title: "Duo Karismatik 💫", min: 90 },
    { title: "Pasangan Sultan Premium 👑", min: 85 },
    { title: "Daya Tarik Magnetik 🧲", min: 80 },
    { title: "Sensasi Cinta Panas⚡", min: 75 }
  ],
  mistik: [
    { title: "Garis Garis Alam Semesta 🌌", min: 95 },
    { title: "Reinkarnasi Cinta 🌙", min: 90 },
    { title: "Restu Bintang & Galaksi ✨", min: 85 },
    { title: "Aura Kebatinan Cocok 🔮", min: 80 },
    { title: "Jodoh Garis Keras 📜", min: 75 }
  ]
};

const FORTUNES_BY_VIBE = {
  romantis: [
    "Bintang dan galaksi sepakat! Kalian berdua diciptakan untuk saling melengkapi dan tak pernah terpisahkan.",
    "Kombinasi energi kalian sangat hangat. Siap-siap dibilang 'bucin berlebihan' sama teman-teman!",
    "Sekali tatap mata langsung lumer. Hubungan kalian dipenuhi momen romantis seperti di drakor favorit.",
    "Dua hati yang saling menyatu. Yang satu suka ngambek, yang satu jago meluluhkan hati dengan pelukan."
  ],
  kocak: [
    "Kalian berdua kalau ketemu bukannya romantis malah sibuk saling ejek tapi tidak bisa lepas!",
    "Masa depan kalian diwarnai petualangan berburu jajanan malam dan debat nentukan menu makan siang.",
    "Kombinasi nama kalian menghasilkan aura kocak 100%. Teman-teman kalian bakal iri sama keceriaan ini!",
    "Satu pelupa, satu suka piknik. Kalau jalan-jalan pasti ada saja kejadian lucu yang bikin ngakak bareng."
  ],
  hot: [
    "Chemistry kalian berdua bikin ruangan terasa panas! Daya tarik kalian berdua sangat magnetik.",
    "Pasangan berkarisma tinggi. Semua mata pasti tertuju pada kalian berdua saat jalan bersama!",
    "Kombinasi nama kalian memancarkan aura pasangan sultan yang stylish, kompak, dan penuh gairah.",
    "Hubungan kalian penuh petualangan seru dan semangat membara yang tak pernah padam."
  ],
  mistik: [
    "Ramalan kartu takdir menunjukkan aura kalian berdua sudah terikat sejak kehidupan masa lalu.",
    "Semesta mengirim sinyal kuat: perbedaan kalian justru menjadi perekat yang paling kokoh.",
    "Garis tangan dan frekuensi energi kalian 99.9% selaras. Takdir sedang merangkai jalan indah kalian.",
    "Bintang zodiak dan posisi bulan mendukung pasangan ini menuju jenjang kebahagiaan abadi."
  ]
};

export function generateMatchData(userName, candidateName, vibe = 'romantis') {
  const combined = (userName + candidateName + vibe).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  
  const percentage = 78 + Math.abs(hash % 22); // 78 - 99
  
  const chemistry = 82 + Math.abs((hash * 3) % 18);
  const humor = 76 + Math.abs((hash * 7) % 24);
  const kesetiaan = 85 + Math.abs((hash * 11) % 15);
  const hoki = 80 + Math.abs((hash * 13) % 20);

  const selectedBadgeList = BADGES[vibe] || BADGES.romantis;
  const selectedFortunes = FORTUNES_BY_VIBE[vibe] || FORTUNES_BY_VIBE.romantis;

  const badgeObj = selectedBadgeList.find(b => percentage >= b.min) || selectedBadgeList[selectedBadgeList.length - 1];
  const fortuneIndex = Math.abs(hash) % selectedFortunes.length;

  return {
    userName,
    candidateName,
    percentage,
    badge: badgeObj.title,
    fortune: selectedFortunes[fortuneIndex],
    vibe,
    stats: {
      chemistry,
      humor,
      kesetiaan,
      hoki
    }
  };
}
