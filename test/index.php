<?php
// Nama file untuk menyimpan jumlah tampilan
$counter_file = "profile_views.txt";

// Baca jumlah tampilan dari file
$views = (int)file_get_contents($counter_file);

// Tambah 1 ke jumlah tampilan
$views++;

// Simpan kembali jumlah tampilan yang diperbarui
file_put_contents($counter_file, $views);

// Tampilkan jumlah tampilan di profil
echo "Profile Views: $views";
?>
