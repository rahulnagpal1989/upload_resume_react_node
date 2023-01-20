import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import {Row, Col} from 'react-bootstrap';

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <p>How can we reach you?</p>
      <div id={"step"+props.currentStep} style={{textAlign:"initial"}}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="first_name">First Name <span className="red">*</span></Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter your First Name"
                required={true}
                value={props.first_name} // Prop: The first name input data
                onChange={props.handleChange} // Prop: Puts data into the state
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter your Last Name"
                value={props.last_name} // Prop: The last name input data
                onChange={props.handleChange} // Prop: Puts data into the state
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email">Email <span className="red">*</span></Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your Email"
                required={true}
                value={props.email} // Prop: The email input data
                onChange={props.handleChange} // Prop: Puts data into the state
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                type="text"
                name="phone_number"
                id="phone_number"
                placeholder="Enter your Phone Number"
                value={props.phone_number} // Prop: The phone number input data
                onChange={props.handleChange} // Prop: Puts data into the state
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Step1;
