import { Button, Divider, Form, Input } from "antd";
import React from "react";
import InputText from "./input-text";

const InputConfig = {
  text: ["label", "min", "max", "placeHolder", "isRequire", "regex"],
};

const DynamicContent = ({
  type = "text",
  content,
  onCancel = { setState: () => {}, defaultValue: null },
}) => {
  let config = InputConfig[type];

  return (
    <Form name="nestedForm" layout="vertical">
      <Form.Item
        name={"label"}
        label={"Label Name"}
        rules={[{ required: true }]}
      >
        <InputText />
      </Form.Item>
      {config.includes() ? (
        <Form.Item
          name={"placeHolder"}
          label={"place holder"}
          rules={[{ required: true }]}
        >
          <InputText defaultValue={content.placeHolder} />
        </Form.Item>
      ) : null}
      <Divider />
      <Form.Item>
        <Button
          htmlType="reset"
          onClick={() => onCancel.setState(onCancel.defaultValue)}
        >
          Cancel
        </Button>
        <Button htmlType="submit">Ok</Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicContent;
