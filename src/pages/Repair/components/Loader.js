import Loader from "react-js-loader";

const LoadingProgress = () => {
    return <div className="d-flex align-items-center justify-content-center">
    <Loader
      type="spinner-default"
      bgColor={"#872ff7"}
      title={"spinner-default"}
      color={"#FFFFFF"}
      size={35}
    />
  </div>
}

export default LoadingProgress;