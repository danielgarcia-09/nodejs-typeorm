import { Request, Response } from "express";
import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname } = req.body;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;

    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOneBy({ id: parseInt(id) });

        if(!user) return res.status(404).json({message: "User not found"});

        return res.json(user);
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { firstname, lastname } = req.body;

    const user = await User.findOneBy({ id: parseInt(id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    // user.firstname = firstname;
    // user.lastname = lastname;

    // await user.save();

    await User.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOneBy({ id: parseInt(id) });

        if(!user) return res.status(404).json({message: "User not found"});

        await User.remove(user);

        return res.sendStatus(204);

    } catch (error) {
        return res.status(500).json(error);
    }
}