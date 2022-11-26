const useAuth = ({ setAuth }: { setAuth: any }) => {
  const token = localStorage.getItem("app42token");

  if (!token) {
    setAuth(false);
    return <p>failed</p>;
  }

  return <div>useAuth</div>;
};

export default useAuth;
