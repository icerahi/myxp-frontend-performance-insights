export const getColor = (value) => {
  if (((value) => 0) && value <= 49) {
    return {
      textColor: "rgb(204,0,0)",
      pathColor: "rgb(255,51,51)",
      backgroundColor: "rgb(255,235,235)",
      trailColor: "rgb(255,235,235)",
    };
  } else if (((value) => 50) && value <= 89) {
    return {
      textColor: "rgb(199,63,15)",
      pathColor: "rgb(255,170,51)",
      backgroundColor: "rgb(255,247,235)",
      trailColor: "rgb(255,247,235)",
    };
  } else if (((value) => 90) && value <= 100) {
    return {
      textColor: "rgb(40,155,41)",
      pathColor: "rgb(7,205,106)",
      backgroundColor: "rgb(230,250,240)",
      trailColor: "rgb(230,250,240)",
    };
  }
};
