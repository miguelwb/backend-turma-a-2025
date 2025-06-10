import {z} from 'zod';
import { findAll } from '../models/alunosmodel.js';

export const getAllAlunos = async (req, res) => {
    try {
        const alunos = await findAll();
        res.status(200).json(alunos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createAluno = async (req, res) => {
    try {
        const alunoData = req.body;
        const result = await create(alunoData);
        res.status(201).json({ message: "User created successfully", alunoId: result.lastInsertRowld });
    } catch (error) {
        res.status(500).json({ message: "Internal server error - Controller" });
    }
}