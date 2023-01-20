import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import {Row, Col} from 'react-bootstrap';

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
        <p>Show us your previous work</p>
        <div id={"step"+props.currentStep} style={{textAlign:"initial"}}>
            <Row>
                <Col>
                    <FormGroup>
                    <Label>Do you live in the US? <span className="red">*</span></Label>
                    <br/>
                    <Input
                        type="radio"
                        name="live_in_us"
                        id="live_in_us_no"
                        placeholder="Select Do you live in the US?"
                        required={true}
                        checked={props.live_in_us==='No' ? true : false}
                        value={'No'} // Prop: The first name input data
                        onChange={props.handleChange} // Prop: Puts data into the state
                    /> <Label for="live_in_us_no">No</Label>&nbsp;&nbsp;
                    <Input
                        type="radio"
                        name="live_in_us"
                        id="live_in_us_yes"
                        placeholder="Select Do you live in the US?"
                        required={true}
                        checked={props.live_in_us==='Yes' ? true : false}
                        value={'Yes'} // Prop: The first name input data
                        onChange={props.handleChange} // Prop: Puts data into the state
                    /> <Label for="live_in_us_yes">Yes</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="git_profile">Git profile <span className="red">*</span></Label>
                    <Input
                        type="text"
                        name="git_profile"
                        id="git_profile"
                        placeholder="Enter your Git Profile"
                        required={true}
                        value={props.git_profile} // Prop: The first name input data
                        onChange={props.handleChange} // Prop: Puts data into the state
                    />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    </>
  );
};

export default Step2;
