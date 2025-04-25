// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//     newUser: '/',
//   },
//   providers: [
//     // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
//     // while this file is also used in non-Node.js environments
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnChat = nextUrl.pathname.startsWith('/');
//       const isOnRegister = nextUrl.pathname.startsWith('/register');
//       const isOnLogin = nextUrl.pathname.startsWith('/login');

//       if (isLoggedIn && (isOnLogin || isOnRegister)) {
//         return Response.redirect(new URL('/', nextUrl as unknown as URL));
//       }

//       if (isOnRegister || isOnLogin) {
//         return true; // Always allow access to register and login pages
//       }

//       if (isOnChat) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       }

//       if (isLoggedIn) {
//         return Response.redirect(new URL('/', nextUrl as unknown as URL));
//       }

//       return true;
//     },
//   },
// } satisfies NextAuthConfig;
// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//     newUser: '/',
//   },
//   providers: [
//     // Providers will be added in auth.ts
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnChat = nextUrl.pathname.startsWith('/chat/:id'); // Change this if needed
//       const isOnRegister = nextUrl.pathname.startsWith('/register');
//       const isOnLogin = nextUrl.pathname.startsWith('/login');

//       // ✅ Allow access to the homepage `/` without requiring login
//       if (nextUrl.pathname === '/') {
//         return true;
//       }

//       // ✅ Allow access to login and register pages freely
//       if (isOnRegister || isOnLogin) {
//         return true;
//       }

//       // ✅ Restrict `/chat` or other protected routes to logged-in users
//       if (isOnChat) {
//         return isLoggedIn;
//       }

//       // ✅ If the user is logged in, allow access to all pages
//       if (isLoggedIn) {
//         return true;
//       }

//       // 🚀 Redirect unauthenticated users to the login page for protected routes
//       return Response.redirect(new URL('/login', nextUrl as unknown as URL));
//     },
//   },
// } satisfies NextAuthConfig;


// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//     newUser: '/',
//   },
//   providers: [
//     // Providers will be added in auth.ts
//   ],
//   callbacks: {
//     authorized() {
//       // ✅ Allow access to all routes without requiring login
//       return true;
//     },
//   },
// } satisfies NextAuthConfig;
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/', // Keep new users on the homepage
  },
  providers: [
    // Providers will be added in auth.ts
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/chat/:id');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnQuiz = nextUrl.pathname.startsWith('/quiz'); // ✅ Allow this page

      // ✅ Allow access to homepage `/`, login, register, and quiz
      if (nextUrl.pathname === '/' || isOnRegister || isOnLogin || isOnQuiz) {
        return true;
      }

      // ✅ Restrict `/chat` or other protected routes to logged-in users
      if (isOnChat) {
        return isLoggedIn;
      }

      // ✅ If the user is logged in, allow access to all pages
      if (isLoggedIn) {
        return true;
      }

      // 🚀 Redirect unauthenticated users to the login page for protected routes
      return Response.redirect(new URL('/login', nextUrl as unknown as URL));
    },
  },
} satisfies NextAuthConfig;
