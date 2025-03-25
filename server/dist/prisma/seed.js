"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.favorite.deleteMany({});
    await prisma.song.deleteMany({});
    const songs = [
        {
            title: "Shape of You",
            artist: "Ed Sheeran",
            duration: "3:54",
            albumArt: "https://example.com/shape-of-you.jpg",
        },
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            duration: "3:20",
            albumArt: "https://example.com/blinding-lights.jpg",
        },
        {
            title: "Stay With Me",
            artist: "Sam Smith",
            duration: "2:52",
            albumArt: "https://example.com/stay-with-me.jpg",
        },
        {
            title: "Bad Guy",
            artist: "Billie Eilish",
            duration: "3:14",
            albumArt: "https://example.com/bad-guy.jpg",
        },
        {
            title: "Uptown Funk",
            artist: "Mark Ronson ft. Bruno Mars",
            duration: "4:30",
            albumArt: "https://example.com/uptown-funk.jpg",
        },
    ];
    for (const song of songs) {
        await prisma.song.create({
            data: song,
        });
    }
    console.log("Database has been seeded with sample songs");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map