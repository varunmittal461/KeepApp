import React from "react";
function Footer(){
  const currentYear = new Date().getFullYear();

    return(
      <div>
      <footer><p>copyright © {currentYear}</p></footer>
      </div>
     
    )
}
export default Footer;
