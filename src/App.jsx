import { Button, Form, Layout, Menu, Space } from "antd";
import React, { useCallback, useState } from "react";
import DynamicStructure from "./components/dynamic-structure";
import ModalPopUp from "./components/modal-pop";
import DynamiContent from "./components/dynamic-content";
const { Sider, Content } = Layout;

const InputConfig = [
  {
    label: "Text",
    value: "",
    type: "text",
    key: "1",
    placeHolder: "Text Here...",
    isRequire: false,
    errorMessage: "This field require",
    min: "",
    max: "",
  },
  {
    label: "Number",
    value: "",
    type: "number",
    key: "2",
    placeHolder: "Number Here...",
    required: false,
    errorMessage: "This field require",
    min: "",
    max: "",
  },
];

const INIT_VALUE = {
  modal: false,
  selectItem: {},
};

const App = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState(INIT_VALUE);

  let users = form.getFieldValue("users") ?? [];

  const handleModalOk = (add, values) => {
    const { key, ...restField } = values;
    if (restField) {
      add({ ...restField, id: Date.now().toString() });
      setState(INIT_VALUE);
    }
  };

  return (
    <div className="flex items-center m-auto py-10 h-full container">
      <Layout className="h-full">
        <Sider theme="dark" className="h-full text-white">
          <Menu
            onClick={(item) =>
              setState({
                selectItem: InputConfig[item.key - 1],
                modal: true,
              })
            }
          >
            {InputConfig.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Form
              form={form}
              onFinish={(data) => console.log(data)}
              name="dynamic_form_nest_item"
              autoComplete="off"
              className="size-full"
              initialValues={{
                users: [],
              }}
            >
              <Form.List name="users">
                {(fields, { add, remove }, meta) => (
                  <>
                    {fields.length
                      ? fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              label={users[name].label}
                              rules={[
                                {
                                  required: users[name].isRequire,
                                  message: users[name]?.errorMessage,
                                  min: users[name]?.min,
                                  max: users[name]?.max,
                                  pattern: users[name]?.regex,
                                },
                              ]}
                            >
                              <DynamicStructure
                                type={users[name].type}
                                key={users[name].id}
                              />
                            </Form.Item>
                          </Space>
                        ))
                      : null}
                    <ModalPopUp
                      footer={null}
                      onCancel={() => setState(INIT_VALUE)}
                      destroyOnClose
                      title={"Content"}
                      isModalOpen={state.modal}
                    >
                      <Form.Provider
                        onFormFinish={(name, { values }) => {
                          if (name === "nestedForm") {
                            handleModalOk(add, {
                              ...state.selectItem,
                              ...values,
                            });
                          }
                        }}
                      >
                        <DynamiContent
                          onCancel={{
                            setState: setState,
                            defaultValue: INIT_VALUE,
                          }}
                          type={state.selectItem?.type}
                          content={state.selectItem}
                        />
                      </Form.Provider>
                    </ModalPopUp>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
