const fetchDataPost = async (url: URL, body: BodyInit) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    return response;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export default fetchDataPost;
