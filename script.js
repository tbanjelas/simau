// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  
  // Interaksi Hero Section - Perubahan teks saat diklik
  const hero = document.querySelector("#beranda");
  hero.addEventListener("click", () => {
    alert("Selamat datang di Taman Baca Anjelas! Semoga Anda menikmati waktu di sini.");
  });

  // Form Kontak Submit Event
  const kontakForm = document.querySelector("#kontak form");
  if (kontakForm) {
    kontakForm.addEventListener("submit", (event) => {
      event.preventDefault();  // Mencegah halaman refresh saat form disubmit
      
      // Ambil data dari input form
      const name = document.querySelector("#kontak input[name='name']").value;
      const email = document.querySelector("#kontak input[name='email']").value;
      const message = document.querySelector("#kontak textarea[name='message']").value;

      // Validasi form
      if (name && email && message) {
        alert(`Terima kasih, ${name}! Pesan Anda telah kami terima.`);
        kontakForm.reset(); // Reset form setelah submit berhasil
      } else {
        alert("Silakan isi semua field.");
      }
    });
  }

  // Smooth Scroll untuk Navigasi
  const navLinks = document.querySelectorAll("header nav ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Menambahkan sedikit offset untuk ruang header
        behavior: "smooth"
      });
    });
  });

  // Image Hover Effect (Galeri dan Karya Anak)
  const galleryImages = document.querySelectorAll("#galeri img, #karya img");
  galleryImages.forEach(image => {
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.05)";
      image.style.transition = "transform 0.3s ease-in-out";
    });
    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });
  });

});
