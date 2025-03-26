import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a default user
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "user@example.com",
      name: "Default User",
    },
  });

  // Create some sample songs
  const songs = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      releaseYear: 2017,
      duration: 233000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
      popularity: 90,
      spotifyId: "7qiZfU4dY1lWllzX7mPBI3",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      releaseYear: 2020,
      duration: 200000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      popularity: 88,
      spotifyId: "0VjIjW4GlUZAMYd2vXMi3b",
    },
    {
      title: "Dance Monkey",
      artist: "Tones and I",
      album: "The Kids Are Coming",
      releaseYear: 2019,
      duration: 210000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd6c3cd2bbc8928",
      popularity: 85,
      spotifyId: "2XU0oxnq2qxCpomAAuJY8K",
    },
  ];

  // Add these songs to your existing seed data array
  const moreSongs = [
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      releaseYear: 1975,
      duration: 354000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da",
      popularity: 95,
      spotifyId: "7tFiyTwD0nx5a1eklYtX2J",
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      releaseYear: 1982,
      duration: 294000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97",
      popularity: 93,
      spotifyId: "5ChkMS8OtdzJeqyybCc9R5",
    },
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      releaseYear: 1991,
      duration: 301000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf",
      popularity: 91,
      spotifyId: "5ghIJDpPoe3CfHMGu71E6T",
    },
    {
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      album: "Uptown Special",
      releaseYear: 2014,
      duration: 270000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273e4c03df7ef67457008add358",
      popularity: 90,
      spotifyId: "32OlwWuMpZ6b0aN2RZOeMS",
    },
    {
      title: "Despacito",
      artist: "Luis Fonsi ft. Daddy Yankee",
      album: "VIDA",
      releaseYear: 2017,
      duration: 229000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c",
      popularity: 89,
      spotifyId: "6habFhsOp2NvshLv26DqMb",
    },
    {
      title: "Rolling in the Deep",
      artist: "Adele",
      album: "21",
      releaseYear: 2011,
      duration: 228000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300",
      popularity: 88,
      spotifyId: "1c8gk2PeTE04A1pIDH9YMk",
    },
    {
      title: "Lose Yourself",
      artist: "Eminem",
      album: "8 Mile",
      releaseYear: 2002,
      duration: 326000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273cb66bcc14c6f857c127d5969",
      popularity: 87,
      spotifyId: "7w9bgPAmPTtrkt6koHzMtI",
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      releaseYear: 1971,
      duration: 183000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273d750ac0bc5fcf2b5fe8271b0",
      popularity: 86,
      spotifyId: "7pKfPomDEeI4TPT6EOYjn9",
    },
    {
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      releaseYear: 1987,
      duration: 356000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273bdba586eb69c503f7ff7d7e4",
      popularity: 85,
      spotifyId: "7o2CTH4ctstm8TNelqjb51",
    },
    {
      title: "Superstition",
      artist: "Stevie Wonder",
      album: "Talking Book",
      releaseYear: 1972,
      duration: 252000,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273e0529ec5ec9e4f7fb3383f0d",
      popularity: 84,
      spotifyId: "1qiQduM84n03JYHuKbVnvY",
    },
  ];

  // Merge with your existing songs array
  const allSongs = [...songs, ...moreSongs];

  for (const song of allSongs) {
    await prisma.song.upsert({
      where: { spotifyId: song.spotifyId },
      update: song,
      create: song,
    });
  }

  console.log("Database has been seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
