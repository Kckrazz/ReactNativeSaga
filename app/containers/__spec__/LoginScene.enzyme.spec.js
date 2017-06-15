import React from "react";
import { shallow, mount } from "enzyme";
import { LoginScene } from "../LoginScene";
import { expect } from "chai";
import { Input, Spinner, Button } from "native-base";
import sinon from "sinon";

describe("Login Scene", () => {
  const props = {
    busy: false,
    authenticated: false,
    error: null
  };
  let wrapper, email, password, submit;
  beforeEach(() => {
    wrapper = shallow(<LoginScene {...props} />);
    email = wrapper.find(Input).first();
    password = wrapper.find(Input).last();
    submit = wrapper.find(Button).last();
    expect(wrapper.length).to.equal(1);
    expect(email).to.have.length(1);
    expect(password).to.have.length(1);
    expect(submit).to.have.length(1);
  });

  test("Should Render Spinner when busy", () => {
    let props = { ...props, busy: true };
    const wrapper = shallow(<LoginScene {...props} />);
    expect(
      wrapper.contains(<Spinner color="black" style={{ marginTop: -40 }} />)
    ).to.equal(true);
  });
  test("Should Render Spinner when  not busy", () => {
    expect(
      wrapper.contains(<Spinner color="black" style={{ marginTop: -40 }} />)
    ).to.equal(false);
  });
  test("renders input field with placeholder", function() {
    expect(email.props().placeholder).to.eql("EMAIL");
    expect(password.props().placeholder).to.eql("PASSWORD");
  });

  describe("when text changes", function() {
    // beforeEach(function () {

    // });

    it("Login Button should be enabled on correct validation ", function() {
      email.simulate("changeText", "suyog@ajaka.aka");
      password.simulate("changeText", "admin@123");
      wrapper.update();
      submit = wrapper.find(Button).last();
      expect(submit.node.props.disabled).to.equal(false);
    });
    it("Login Button should be disabled on no input", function() {
      email.simulate("changeText", "");
      password.simulate("changeText", "");
      wrapper.update();
      submit = wrapper.find(Button).last();
      expect(submit.node.props.disabled).to.equal(true);
    });
    it("Login Button should be disabled on unformatted email", function() {
      email.simulate("changeText", "suyogkraaa@asd");
      password.simulate("changeText", "admin@123");
      wrapper.update();
      submit = wrapper.find(Button).last();
      expect(submit.node.props.disabled).to.equal(true);
    });
  });
});
