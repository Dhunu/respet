// "use server";

// import { cookies } from "next/headers";

// export async function login(values: { username: string; password: string }) {
//     const { username, password } = values;
//     const res = await fetch("http://127.0.0.1:8001/api/token/pair", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();

//     console.log(data);

//     if (!res.ok) {
//         return {
//             status: 401,
//             body: {
//                 success: false,
//                 message: "Invalid username or password",
//             },
//         };
//     }

//     cookies().set("access_token", data.access, {
//         httpOnly: true,
//         maxAge: data.expires_in,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV !== "development",
//     });

//     return {
//         status: 200,
//         body: {
//             success: true,
//             message: "Logged in successfully",
//         },
//     };
// }
