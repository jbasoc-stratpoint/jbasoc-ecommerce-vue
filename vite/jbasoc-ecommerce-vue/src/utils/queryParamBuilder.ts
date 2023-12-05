const PARAM_GENERATOR = {
  paramBuilder: (query: string, array) => {
    let queryParams = "";

    array.forEach((element) => {
      console.log(element);
      const param = `&${query}${element}`;
      queryParams += param;
    });

    console.log(queryParams);
    return queryParams;
  },
  //write bunch of methods like the above
};

export default PARAM_GENERATOR;
