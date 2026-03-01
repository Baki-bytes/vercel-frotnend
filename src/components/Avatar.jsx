import React from "react";
import tinycolor from "tinycolor2"


export const NameAvatar = ({ name="", size = 35 }) => {
    if (!name) return null;

  const stringToColor = (str = "") => {
     let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    // Force the RGB value to be between 180 and 255 (light range)
    const value = (hash >> (i * 8)) & 0xff;
    const lightValue = Math.floor((value + 180) / 2); // 180–255 range
    color += ("00" + lightValue.toString(16)).slice(-2);
  }
    return color;
  };
  const bgColor=stringToColor(name);
  const textColor = tinycolor(bgColor).darken(35).toHexString();;

  const getInitials = (str = "") => {
    return str
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      style={{
        backgroundColor: stringToColor(name),
        color: textColor,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        /*fontWeight: "bold",*/
        fontSize: size / 2,
        textTransform: "uppercase",
      }}
    >
      {getInitials(name)}
    </div>
  );
};
