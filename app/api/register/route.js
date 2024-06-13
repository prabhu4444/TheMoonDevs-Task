import {User} from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
 
  const body = await req.json();
  const { name, password } = body;
  
  if (!password || password.length < 5) {
    throw new Error('Password must be at least 5 characters long');
  }
  if (!name || !password) {
    throw new Error('Username and password are required.');
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const createdUser = await User.create({ name, password: hashedPassword });

  return Response.json(createdUser);
}
