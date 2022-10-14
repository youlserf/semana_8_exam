import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
  try {
    const songs = await prisma.song.findMany();
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

        const songs = await prisma.song.findUnique(
            {
                where: {
                id: id,
                },
            }
        );
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

export const create = async (req, res) => {
  try {
    const { body } = req;
    const song = await prisma.song.create({
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
