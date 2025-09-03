import dbConnect from "@/lib/mongodb";
import NextAuth from "next-auth";
import AboutProfile from "@/models/aboutProfile";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        await dbConnect();

        // Cari user berdasarkan username
        const user = await AboutProfile.findOne({
          username: credentials.username,
        });
        if (!user) {
          throw new Error("User tidak ditemukan");
        }

        // Cek password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Password salah");
        }

        // Return data user yang disimpan di session
        return {
          id: user._id,
          name: user.nama,
          username: user.username,
          foto: user.foto,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  session: {
    strategy: "jwt", // atau "database" kalau pakai DB
    maxAge: 15 * 60, // 15 menit
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Kalau URL dari login page (callbackUrl), arahkan ke situ
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Kalau eksternal, tetap ke homepage
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
