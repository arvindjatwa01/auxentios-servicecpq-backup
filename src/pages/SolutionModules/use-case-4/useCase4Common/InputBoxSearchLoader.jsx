import Loader from "react-js-loader";

const InputBoxSearchLoader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Loader
        type="box-rectangular"
        bgColor={"#872ff7"}
        title={"Loading"}
        color={"#FFFFFF"}
        size={35}
      />
    </div>
  );
};

export default InputBoxSearchLoader;
