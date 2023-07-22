const config = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      token: token,
    },
  };
  return {
    config: config,
  };
};

export { config };
