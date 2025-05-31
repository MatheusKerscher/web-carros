import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <Spin
      fullscreen
      indicator={
        <LoadingOutlined spin style={{ fontSize: "52px", color: "#e11138" }} />
      }
    />
  );
};

export default Spinner;
