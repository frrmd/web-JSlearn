export const pathData = {
  "js-basics": {
    title: "JS Basics",
    description: "Fondasi utama JavaScript untuk pemula.",
    lessons: [
      { top: "Variables", detail: "Belajar let, const, dan var." },
      { top: "Data Types", detail: "String, Number, Boolean, dan Null." },
      { top: "Operators", detail: "Penjumlahan, Pengurangan, dan Logika." }
    ],
    color: "bg-[#58CC02]"
  },
  "loops-arrays": {
    title: "Loops & Arrays",
    description: "Mengelola data banyak dengan perulangan.",
    lessons: [
      { top: "Array Methods", detail: "Push, Pop, Map, dan Filter." },
      { top: "For Loops", detail: "Mengulang kode dengan hitungan pasti." },
      { top: "While Loops", detail: "Mengulang selama kondisi benar." }
    ],
    color: "bg-[#1CB0F6]"
  },
  "dom-manipulation": {
    title: "DOM Manipulation",
    description: "Menghubungkan JS dengan tampilan HTML.",
    lessons: [
      { top: "Selectors", detail: "getElementById dan querySelector." },
      { top: "Event Listeners", detail: "Menangani klik dan input user." },
      { top: "Style Change", detail: "Mengubah CSS lewat JavaScript." }
    ],
    color: "bg-[#CE82FF]"
  },
  // INI MATERI BARU YANG DI-UNLOCK
  "async-fetch": {
    title: "Async & Fetch",
    description: "Mengambil data dari server secara asinkron.",
    lessons: [
      { top: "Promises", detail: "Belajar then, catch, dan alur asinkron." },
      { top: "Async/Await", detail: "Menulis kode asinkron yang lebih rapi." },
      { top: "Fetch API", detail: "Mengambil data dari API luar." }
    ],
    color: "bg-[#FF9600]" // Warna Orange
  },
  "react-hooks": {
    title: "React Hooks",
    description: "Mengelola state dan efek samping di React.",
    lessons: [
      { top: "useState", detail: "Menyimpan data dinamis dalam komponen." },
      { top: "useEffect", detail: "Menjalankan efek samping seperti fetch data." },
      { top: "Custom Hooks", detail: "Membuat logic reusable sendiri." }
    ],
    color: "bg-[#00C2E0]" // Warna Cyan
  },
  "nodejs-express": {
    title: "Node.js Express",
    description: "Membangun backend dan API dengan JavaScript.",
    lessons: [
      { top: "Routing", detail: "Membuat endpoint GET, POST, PUT, DELETE." },
      { top: "Middleware", detail: "Menambahkan fungsi di tengah request." },
      { top: "Database", detail: "Menghubungkan server dengan MongoDB/SQL." }
    ],
    color: "bg-[#2AAA46]" // Warna Hijau Gelap
  }
};