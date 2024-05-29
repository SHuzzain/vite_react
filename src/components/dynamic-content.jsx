//@ts-check

import { Button, Divider, Form, Input, Switch } from "antd";
import React from "react";
import InputText from "./input-text";

const InputConfig = {
  text: [
    "label",
    "min",
    "max",
    "placeHolder",
    "isRequire",
    "regex",
    "errorMessage",
  ],
};

const DynamicContent = ({
  type = "text",
  content,
  onCancel = { setState: (value = {}) => value, defaultValue: {} },
}) => {
  let config = InputConfig[type] ?? [];
  const form = Form.useFormInstance();
  const isRequire = Form.useWatch("isRequire", form);
  return (
    <Form name="nestedForm" layout="vertical">
      {/* label */}
      {config.includes("placeHolder") ? (
        <Form.Item
          name={"label"}
          label={"Label Name"}
          rules={[{ required: true }]}
        >
          <InputText />
        </Form.Item>
      ) : null}

      {/* place holder */}
      {config.includes("placeHolder") ? (
        <Form.Item
          name={"placeHolder"}
          label={"place holder"}
          rules={[{ required: false }]}
        >
          <InputText defaultValue={content.placeHolder} />
        </Form.Item>
      ) : null}

      {/* min value */}
      {config.includes("min") ? (
        <Form.Item name={"min"} label={"Min"} rules={[{ required: false }]}>
          <InputText />
        </Form.Item>
      ) : null}

      {/* max value */}
      {config.includes("min") ? (
        <Form.Item name={"max"} label={"Max"} rules={[{ required: false }]}>
          <InputText />
        </Form.Item>
      ) : null}

      {config.includes("regex") ? (
        <Form.Item
          name={"regex"}
          label={"Regex pattern"}
          rules={[{ required: false }]}
        >
          <InputText />
        </Form.Item>
      ) : null}

      {config.includes("regex") ? (
        <Form.Item
          name={"regex"}
          label={"Regex pattern"}
          rules={[{ required: false }]}
        >
          <InputText />
        </Form.Item>
      ) : null}

      {config.includes("errorMessage") ? (
        <Form.Item
          name={"errorMessage"}
          label={"Error Message"}
          rules={[
            {
              required: isRequire,
            },
          ]}
        >
          <InputText defaultValue={content.errorMessage} />
        </Form.Item>
      ) : null}

      {config.includes("isRequire") ? (
        <Form.Item
          name={"isRequire"}
          label={"Required"}
          rules={[{ required: false }]}
          valuePropName="checked"
        >
          <Switch size="small" />
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
