import mongoose, { HydratedDocument, Model, model } from "mongoose";

export interface IUser{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

type USerModel = Model<IUser>

const userSchema = new mongoose.Schema<IUser, USerModel>({
    first_name: String,
    last_name: String,
    email: String,
    password: String
})

export type HydratedUserDoc = HydratedDocument<IUser>
export const User = model<IUser, USerModel>('User', userSchema)