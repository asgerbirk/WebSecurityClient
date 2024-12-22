import NextAuth, {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from 'jwt-decode';
import {parse} from "cookie";

declare module "next-auth" {
    interface User {
        accessToken?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        credentials: "include", // Ensures cookies are sent and received.
                    });

                    if (!response.ok) {
                        console.error("Login failed:", await response.text());
                        return null;
                    }
                    const cookieHeader = response.headers.get('set-cookie');
                    if (!cookieHeader) {
                        throw new Error('Missing cookies in the response');
                    }

                    const cookies = parse(cookieHeader);
                    const accessToken = cookies.accessToken;
                    if (!accessToken) {
                        throw new Error('Access token missing in cookies');
                    }

                    const user = { id: 'user-id', email: credentials?.email };
                    return { ...user, accessToken };
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            }

        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && user.accessToken) {
                // Ensure accessToken exists before assigning
                token.accessToken = user.accessToken;
            }

            if (token.accessToken) {
                // Use type assertion or optional chaining to handle potential undefined
                const decodedToken = jwtDecode<{
                    userId: number;
                    email: string;
                    memberId: number;
                    name: string;
                    role: string;
                    exp: number;
                }>(token.accessToken as string);

                token.userId = decodedToken.userId;
                token.email = decodedToken.email;
                token.memberId = decodedToken.memberId;
                token.name = decodedToken.name;
                token.role = decodedToken.role;
                token.exp = decodedToken.exp;
            }
            return token;
        },
        async session({ session, token }) {
            session.token = token.token; // Raw access token
            session.user.userId = token.userId;
            session.user.email = token.email;
            session.user.memberId = token.memberId;
            session.user.name = token.name;
            session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60, // 24 hours
    }
};

export default NextAuth(authOptions);
