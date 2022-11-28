import "./Mascot.style.scss";

const Mascot = ({ ...props }) => {
  return (
    <div
      {...props}
      className={`${props.className} mascot`}
      aria-label="Mascot logo for Lost in Translation"
    >
      <div>
        <img
          src="/images/Logo.png"
          alt="Smiling robot in open embrace"
          className="mascot_robot"
        />
        <img
          src="/images/Splash.svg"
          alt="White cloud"
          className="mascot_cloud"
        />
      </div>
    </div>
  );
};

export default Mascot;
