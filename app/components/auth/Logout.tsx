import LogoutButton from "../LogoutButton";

// Modify LogoutButton to accept an 'id' prop
const Logout = ({ id }: any) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("api/session", {
  //       method: "GET",
  //       headers: {
  //         Cookie: cookies()
  //           .getAll()
  //           .map(({ name, value }) => `${name}=${value}`)
  //           .join("; "),
  //       },
  //     });
  //     if (!res.ok) {
  //       console.log(res.status);
  //     } else {
  //       const data = await res.json();
  //       const { id } = data.user;
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleLogout = async () => {
    "use server";
    const response = await fetch(`http://localhost:3001/api/log-out/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log("Status: " + response.status);
    }
  };

  return (
    <div className="mr-3">
      <LogoutButton id={id} handleLogout={handleLogout} />
    </div>
  );
};

export default Logout;
