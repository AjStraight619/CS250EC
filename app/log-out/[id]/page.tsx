const handleLogout = async (id: string) => {
  const response = await fetch(`/api/log-out${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return response.json();
  } else {
    console.log("Status: " + response.status);
  }
};

const Logout = async ({ params }: any) => {
  // grab id from url and pass to handleLogout
  const logout = await handleLogout(params.id);
  // grab message and cookieHeader from response
  const { message, cookieHeader } = logout;
  return (
    <div>
      <div>
        {message} {cookieHeader}
      </div>
    </div>
  );
};

export default Logout;
