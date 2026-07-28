// Generator Ramalan Jodoh & Statistik Kecocokan

const BADGES = [
  { title: "Takdir Ilahi 💖", min: 95 },
  { title: "Pasangan Sultan 👑", min: 90 },
  { title: "Belahan Jiwa Sejati ✨", min: 85 },
  { title: "Cinta Kasur & Remot TV 📺", min: 80 },
  { title: "Tom & Jerry Seru 🐱🐭", min: 75 }
];

const FORTUNES = [
  "Bintang dan galaksi sepakat! Kalian bakal sering rebutan makanan tapi tidak pernah bisa berpisah lebih dari 2 jam.",
  "Tingkat kehaluan kalian berdua sama tingginya. Kalau gabung, dunia bisa gonjang-ganjing karena romantisnya kebangetan!",
  "Awalnya mungkin suka gengsi-gengsian, tapi sekali jadian bakal nempel kayak stiker promosi toko di kaca minimarket.",
  "Kombinasi nama kalian memancarkan energi jodoh 99,9%! Masa depan penuh dengan kuliner malam dan tawa bareng.",
  "Dua hati yang saling melengkapi! Yang satu pelupa, yang satu siap mengingatkan. Pasangan impian alam semesta!",
  "Ramalan kartu cinta menunjukkan hubungan kalian dipenuhi kejutan manis dan liburan impian yang tak terduga."
];

export function generateMatchData(userName, candidateName) {
  // Simple hash to get semi-deterministic high match percentage (between 78% and 99%)
  const combined = (userName + candidateName).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  
  const percentage = 78 + Math.abs(hash % 22); // 78 - 99
  
  const chemistry = 80 + Math.abs((hash * 3) % 20);
  const humor = 75 + Math.abs((hash * 7) % 25);
  const kesetiaan = 85 + Math.abs((hash * 11) % 15);
  const hoki = 80 + Math.abs((hash * 13) % 20);

  const badgeObj = BADGES.find(b => percentage >= b.min) || BADGES[BADGES.length - 1];
  const fortuneIndex = Math.abs(hash) % FORTUNES.length;

  return {
    userName,
    candidateName,
    percentage,
    badge: badgeObj.title,
    fortune: FORTUNES[fortuneIndex],
    stats: {
      chemistry,
      humor,
      kesetiaan,
      hoki
    }
  };
}
