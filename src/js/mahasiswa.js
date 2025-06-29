var dataMahasiswa = [
    {
      id: 1,
      nama: "Budi Santoso",
      tanggalLahir: "2000-01-15",
      fakultas: "Fakultas Teknik",
      programStudi: "Teknik Informatika",
      semester: 6,
      nilai: {
        algoritma: 85,
        basisData: 88,
        pemrogramanWeb: 90,
      },
      aktif: true,
      organisasi: ["Himpunan Mahasiswa Teknik", "Komunitas Pemrograman"],
    },
    {
      id: 2,
      nama: "Siti Aminah",
      tanggalLahir: "1999-05-10",
      fakultas: "Fakultas Teknik",
      programStudi: "Teknik Informatika",
      semester: 4,
      nilai: {
        algoritma: 85,
        basisData: 80,
        pemrogramanWeb: 90,
      },
      aktif: true,
      organisasi: ["Koperasi Mahasiswa"],
    },
    {
      id: 3,
      nama: "Rudi Hartono",
      tanggalLahir: "1998-12-01",
      fakultas: "Fakultas Teknik",
      programStudi: "Teknik Komputer",
      semester: 8,
      nilai: {
        algoritma: 81,
        basisData: 88,
        pemrogramanWeb: 90,
      },
      aktif: false,
      organisasi: ["Himpunan Mahasiswa Teknik"],
    },
  ];

  //show data mahasiswa
  const showMhs = () => {
    dataMahasiswa.forEach((m) => {
        console.log(`Nama : ${m.nama}, Fakultas : ${m.fakultas}, Program Studi : ${m.programStudi}`);
    });
  };
  showMhs();

  //add data mahasiswa
  const addMhs = (mhs) => {
    dataMahasiswa.push(mhs);
    };
    addMhs({
        id: 4,
        nama: "Ayu Puspita",
        tanggalLahir: "1999-11-10",
        fakultas: "Fakultas Teknik",
        programStudi: "Teknik Informatika",
        semester: 4,
        nilai: {
          algoritma: 85,
          basisData: 88,
          pemrogramanWeb: 90,
        },
        aktif: true,
        organisasi: ["Koperasi Mahasiswa"],
      });
    console.log(dataMahasiswa);

  //update data mahasiswa
  const updateMhs = (id, newData) => {
    dataMahasiswa = dataMahasiswa.map((m) =>
        m.id === id ? { ...m,...newData } : m
    )};
    
    updateMhs(1 ,{semester: 3});
    console.log(dataMahasiswa); 

    //delete data mahasiswa
  const deleteMhs = (id) => {
    dataMahasiswa = dataMahasiswa.filter((m) => m.id !== id);
    };
    deleteMhs(2);
    console.log(dataMahasiswa);

    //total nilai mahasiswa
    const totalNilai = (id) => {
       const mahasiswa = dataMahasiswa.find((m) => m.id === id);
       if(!mahasiswa){
        throw new Error("Mahasiswa tidak ditemukan");
      }

      const { algoritma = 0, basisData = 0, pemrogramanWeb = 0 } = mahasiswa.nilai;
      const total = algoritma + basisData + pemrogramanWeb;
      return total;
    };
    console.log(totalNilai(1));

    //kategoriNilai
    const kategoriNilai = (id) => {
        const total = totalNilai(id);
        return total >= 80 ? "A" :
               total >= 70 ? "B" : 
               total >= 60 ? "C" : 
               total >= 50 ? "D" : "E";
      };
      console.log(kategoriNilai(1));

      //menghitung IPS mahasiswa
      const ips = (id) => {
          const mahasiswa = dataMahasiswa.find((m) => m.id === id);
          if(!mahasiswa){
              throw new Error("Mahasiswa tidak ditemukan");
          }
          const { algoritma = 0, basisData = 0, pemrogramanWeb = 0 } = mahasiswa.nilai; 
          const total = algoritma + basisData + pemrogramanWeb;
          const ips = total / 3;
          return ips;
      }
      console.log(ips(1));

      //clear data mahasiswa
      const clearData = () => {
          dataMahasiswa = [];
      };
      clearData();
      

      var listMahasiswa = [
        {
            nama: "Andi",
            nim: "123456",
            jurusan: "Teknik Informatika",
            status: false
        },
        {
            nama: "Budi",
            nim: "654321",
            jurusan: "Sistem Informasi",
            status: true
        },
        {
            nama: "Citra",
            nim: "789012",
            jurusan: "Teknik Elektro",
            status: true
        }
    ];


    //menampilkan jumlah mahasiswa dalam list mahasiswa
    const jumlahMahasiswa = () => listMahasiswa.length;
    console.log(jumlahMahasiswa());

    //mengurutkan mahasiswa berdasarkan nim
    const urutkanMahasiswa = () => listMahasiswa.sort((a, b) => a.nim - b.nim);
    console.log(urutkanMahasiswa());

    //menampilkan mahasiswa yang aktif
    const mahasiswaAktid = () => {
        return{
            aktif : listMahasiswa.filter((m) => m.status === true),
            tidakAktif : listMahasiswa.filter((m) => m.status === false)
        };
    };
    console.log(mahasiswaAktid());

    //clear data array
    const clearArray = () => {
      listMahasiswa = [];
    }
    clearArray();