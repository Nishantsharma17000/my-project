import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          deserunt sapiente quasi reprehenderit, vitae quisquam provident
          maiores error ea dolore dicta obcaecati, aut nemo repellat voluptas
          autem libero tenetur dolores.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt cum
          blanditiis rerum, eos nemo repellat velit veniam numquam fugit
          explicabo nostrum architecto ipsum doloremque aut eveniet
          exercitationem excepturi incidunt temporibus.
        </p>
      </div>
    </div>
  );
};
export default DescriptionBox;