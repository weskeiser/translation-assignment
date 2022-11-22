import ArrowBtn from "features/common/ArrowBtn";

const Main = () => {
  return (
    <div>
      <form>
        <div className="login-middle-keyboard">
          <img
            src="/images/Keyboard.png"
            alt="Keyboard icon"
          />
        </div>
        <input
          type="text"
          name="query"
          placeholder="Write something..."
        />
      </form>
      <ArrowBtn />
    </div>
  );
};

export default Main;
