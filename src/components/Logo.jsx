import Tilt from "react-parallax-tilt";
import brain from "../assets/images/brain.png"

const Logo = () => {
  return (
    <div className="ma4 mt0 center">
      <Tilt className="tilt br4 center">
        <img src={brain} alt="brain logo" />
      </Tilt>
    </div>
  );
};
export default Logo;

