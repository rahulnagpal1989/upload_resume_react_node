import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";
import MultiStepProgressBar from "./MultiStepProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import axios from "axios";

function MasterForm() {
    const[submitFlag, setSubmitFlag] = useState(false);
    const[inputValues, setInputValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        live_in_us: '',
        git_profile: '',
        cv: '',
        cover_letter: '',
        about_you: ''
      });
    const[validation, setValidation] = useState({
        first_name: "",
        email: "",
        live_in_us: "",
        git_profile: "",
        cv: "",
        about_you: "",
    });
    const[currentStep, setCurrentStep] = useState(1);

    const checkValidation = () => {
        let errors = validation;
        const emailCond = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!inputValues.first_name.trim()) {
            errors.first_name = "First name is required";
        } else {
            errors.first_name = "";
        }

        if (!inputValues.email.trim()) {
            errors.email = "Email is required";
        } else if (!inputValues.email.match(emailCond)) {
            errors.email = "Please enter a valid email address";
        } else {
            errors.email = "";
        }

        if (!inputValues.live_in_us.trim()) {
            errors.live_in_us = "Please select Live in US option";
        } else {
            errors.live_in_us = "";
        }

        if (!inputValues.git_profile.trim()) {
            errors.git_profile = "Please enter a Git Profile";
        } else {
            errors.git_profile = "";
        }

        if (!inputValues.cv) {
            errors.cv = "Please upload a CV";
        } else {
            errors.cv = "";
        }

        if (!inputValues.about_you.trim()) {
            errors.about_you = "Please enter About yourself";
        } else {
            errors.about_you = "";
        }

        setValidation(errors);
    };

    useEffect(() => {
        checkValidation();
    }, [inputValues]);

    // Use the submitted data to set the state
    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        if(event.target.type==='file') {
            value = event.target.files[0];
        }
        setInputValues((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        });
    };
        
    // Trigger an alert on form submission
    const handleSubmit = (event) => {
        setSubmitFlag(true);
        event?.preventDefault();
        const formData = new FormData();
        formData.append('first_name', inputValues.first_name);
        formData.append('last_name', inputValues.last_name);
        formData.append('email', inputValues.email);
        formData.append('phone_number', inputValues.phone_number);
        formData.append('live_in_us', inputValues.live_in_us);
        formData.append('git_profile', inputValues.git_profile);
        formData.append('cv', inputValues.cv);
        formData.append('cover_letter', inputValues.cover_letter);
        formData.append('about_you', inputValues.about_you);
        
        axios.post(`${process.env.REACT_APP_API_URL}/post`, formData, 
        {headers: { 'Content-Disposition': `form-data;` }})
        .then(function (response) {
            alert(response.data.message);
            console.log(response);
            // setSubmitFlag(false);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
            setSubmitFlag(false);
        });
    };

  const _next = () => {
    if(currentStep===1) {
        if(validation.first_name!=='') {
            alert(validation.first_name);
            return;
        }
        else if(validation.email!=='') {
            alert(validation.email);
            return;
        }
    } else if(currentStep===2) {
        if(validation.live_in_us!=='') {
            alert(validation.live_in_us);
            return;
        }
        else if(validation.git_profile!=='') {
            alert(validation.git_profile);
            return;
        }
    } else if(currentStep===3) {
        if(validation.cv!=='') {
            alert(validation.cv);
            return;
        }
        else if(validation.about_you!=='') {
            alert(validation.about_you);
            return;
        } else {
            handleSubmit();
        }
    }
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep >= 2 ? setCurrentStep(3) : setCurrentStep(currentStep + 1);
  };

  const _prev = () => {
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep <= 1 ? setCurrentStep(1) : setCurrentStep(currentStep - 1);
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>Upload Resume</CardHeader>
        <CardBody>
          <CardTitle>
            <MultiStepProgressBar currentStep={currentStep} />
          </CardTitle>
          <CardText />
          <Step1
            currentStep={currentStep}
            handleChange={handleChange}
            first_name={inputValues.first_name}
            last_name={inputValues.last_name}
            email={inputValues.email}
            phone_number={inputValues.phone_number}
          />
          <Step2
            currentStep={currentStep}
            handleChange={handleChange}
            live_in_us={inputValues.live_in_us}
            git_profile={inputValues.git_profile}
          />
          <Step3
            currentStep={currentStep}
            handleChange={handleChange}
            cv={inputValues.cv}
            cover_letter={inputValues.cover_letter}
            about_you={inputValues.about_you}
            setInputValues={setInputValues}
          />
        </CardBody>
        <CardFooter>
            {
                (currentStep !== 1) ?
                <Button color="secondary float-left" onClick={_prev}>Previous</Button>
                : null
            }
            {
                (currentStep < 3) ?
                <Button color="primary float-right" onClick={_next}>Next</Button>
                : null
            }
            {
                (currentStep > 2) ?
                <Button color="primary float-right" onClick={_next} disabled={submitFlag===true?true:false}>{submitFlag===false ? 'Submit Resume' : 'Please Wait'}</Button>
                : null
            }
        </CardFooter>
      </Card>
    </Form>
    </>
  );
}

export default MasterForm;
