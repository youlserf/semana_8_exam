import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
  try {
    const songs = await prisma.playlist.findMany();
    res.json({
      ok: true,
      data: songs,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

export const findById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const song = await prisma.playlist.findUnique(
          {
              where: {
              id: id,
              },
          }
      );

        const songsUsers = await prisma.playlist.findMany(
            {
                where: {
                userId: song.userId,
                },
                include: {
                  song: true
                },
            }
        );

        delete song.songId

        song.songs = songsUsers.map(s => {
          delete s.userId;
          delete s.songId;
          delete s.id;
          delete s.name;
          return s;
        } )

        res.json({
            ok: true,
            data: song,
        });
    } catch (error) {
        res.json({
            ok: false,
            data: error.message,
        });
    }
  };

export const create = async (req, res) => {
  try {
    const { body } = req;
    const song = await prisma.playlist.create({
      data: {
        ...body,
      },
    });
    res.json({
      ok: true,
      data: song,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};
