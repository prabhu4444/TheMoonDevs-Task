import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "prabhu4" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
        const name = credentials?.name;
        const password = credentials?.password;


        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({name});
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          console.log("user"+user);

          return user;
        }

        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 10*3600
},
pages: {
    signIn: '/'
},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
