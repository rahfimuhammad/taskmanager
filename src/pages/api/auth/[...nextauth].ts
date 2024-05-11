import { signIn } from "@/libs/user.service";
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn(email)
                
                if(user) {
                    if(user.password === password) {
                        return user 
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        jwt({ token, account, profile, user }: any) {
            if(account?.provider === "credentials") {
                token.email = user.email
                token.id = user.id
            }
            return token
        },
        async session({ session, token} : any) {
            if("email" in token) {
                session.user.email = token.email
            }
            if("id" in token) {
                session.user.id = token.id
            }
            return session
        }
    },
    // pages: {
    //     signIn: "/auth/login"
    // }
}

export default NextAuth(authOptions);