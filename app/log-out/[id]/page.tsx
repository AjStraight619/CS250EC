// import LogoutButton from "@/app/components/auth/Logout";
// import { cookies } from "next/headers";

// export const handleLogout = async (id: string) => {
//   console.log(id);
//   const response = await fetch(`http://localhost:3001/api/log-out/${id}`, {
//     method: "DELETE",
//     headers: {
//       Cookie: cookies()
//         .getAll()
//         .map(({ name, value }) => `${name}=${value}`)
//         .join("; "),
//     },
//   });
//   if (response.ok) {
//     return response.json();
//   } else {
//     console.log("Status: " + response.status);
//   }
// };

// const Logout = async ({ params }: any) => {
//   console.log("These is the id, in the logout", params.id);
//   return (
//     <div>
//       <div>
//         <LogoutButton id={params.id} handleLogout={handleLogout} />
//       </div>
//     </div>
//   );
// };

// export default Logout;
