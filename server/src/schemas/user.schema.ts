import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
});