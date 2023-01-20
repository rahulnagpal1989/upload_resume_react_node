import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import {Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <>
        <p>Upload your CV in word or pdf format</p>
        <div id={"step"+props.currentStep} style={{textAlign:"initial"}}>
            <Row>
                <Col>
                    <FormGroup>
                    <Label for="cv">Upload CV <span className="red">*</span></Label>
                    <Input
                        type="file"
                        name="cv"
                        id="cv"
                        placeholder="Upload your CV"
                        required={true}
                        // value={props.cv} // Prop: The first name input data
                        accept=".doc,.docx,.pdf"
                        onChange={props.handleChange} // Prop: Puts data into the state
                    />
                    {props?.cv?.name ? (<><span style={{color:"green"}}>{props.cv.name}</span> <span onClick={()=>{document.getElementById('cv').value='';props.setInputValues((prevalue) => {return {...prevalue,'cv': ''}});}} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faTimes} /></span></>) : ''}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="cover_letter">Upload Cover Letter</Label>
                    <Input
                        type="file"
                        name="cover_letter"
                        id="cover_letter"
                        placeholder="Upload you cover letter"
                        // value={props.cover_letter} // Prop: The first name input data
                        accept=".doc,.docx,.pdf"
                        onChange={props.handleChange} // Prop: Puts data into the state
                    />
                    {props?.cover_letter?.name ? (<><span style={{color:"green"}}>{props.cover_letter.name}</span> <span onClick={()=>{document.getElementById('cover_letter').value='';props.setInputValues((prevalue) => {return {...prevalue,'cover_letter': ''}});}} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faTimes} /></span></>) : ''}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                    <Label for="about_you">About <span className="red">*</span></Label>
                    <Input
                        type="textarea"
                        name="about_you"
                        id="about_you"
                        placeholder="Enter About yourself"
                        required={true}
                        value={props.about_you} // Prop: The first name input data
                        onChange={props.handleChange} // Prop: Puts data into the state
                    />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    </>
  );
};

export default Step3;
