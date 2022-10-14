import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      ok: true,
      data: users,
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

        const users = await prisma.user.findUnique(
            {
                where: {
                id: id,
                },
            }
        );
        res.json({
            ok: true,
            data: users,
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
    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });
    res.json({
      ok: true,
      data: user,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};


export const login = async (req, res) => {

  try {
    // Obtener usuario
    const { email, password } = req.body;

    // Validar usuario
    if (!(email && password)) {
      res.status(400).send("Se requiere todos los campos.");
    }
    // Validar si el usuario ya existe en la bd
    const user = await prisma.user.findFirst({ 
      where: { email }
     });

    if (user && (password == user.password)) {
      // Usuario
      return res.status(200).json(`Bienvenido a api de musicas estimado ${user.name}`);
    }
    return res.status(400).send("Datos incorrectos.");
  } catch (err) {
    console.log(err);
  }
  // Logica de inicio de sesion(Fin)
};