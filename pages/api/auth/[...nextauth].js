import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../../../lib/api";
import bcrypt from 'bcrypt'

const authoptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req){
        const { tel, password } = credentials
        // perform login logic, query db for user
        const user = await getUser(tel);
        // console.log(user)
        if(!user){
          throw new Error("You haven't registered yet!")
        }else{
          if(!password){
            throw new Error("You haven't entered your password yet!")
          }
          return { token: await signInUser(password, user) }
        }
      }
    })
  ],
  // refetchInterval: 12 * 60 * 60,
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signup: '/login',
    newUser: '/login'
  }
}

const signInUser = async (password, user) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    throw new Error("Your password is not correct!")
  }else{
    return user
  }
}

export default NextAuth(authoptions);