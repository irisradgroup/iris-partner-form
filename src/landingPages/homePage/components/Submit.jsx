import React from "react";
import FormTemplate from "../reusable/FormTemplate";

class Confirmation extends FormTemplate {
  state = {
    error: null,
    formData: null,
    request: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const formData = new FormData();
    var api = "https://irisgo.api.irisradgroup.com/api/send_partner/";
    const formArr = [];
    this.props.formContent.forEach((content) =>{
      formArr.push(...content.formContent);
    });
    Object.keys(this.props.data).map((field) =>
      Object.keys(this.props.data[field]).map((key) => {
        formData.append(formArr.find(form=> form.variableName === key).title, this.props.data[field][key]);
      })
    );

    const request = new XMLHttpRequest();
    request.open("POST", api);
    try {
      request.send(formData);
    } catch (error) {
      console.log(error);
    }

    this.setState({ formData, request });
  }

  ref = {};

  render() {
    return (
      <div className="content" data-testid="submit">
        <p className="final-message">
          Thank you for submitting your companies corporate profile. The IRIS
          Team will review and be in touch soon. If chosen to be a certified
          IRIS Smart City Solution Provide, an MOU will be sent for your review
          and signage.
        </p>
        <button>
          <span style={{ marginRight: "15px" }}>
            {this.state.error
              ? "Internal Sever Error"
              : "Request Sent Successfully!"}
          </span>{" "}
        </button>
      </div>
    );
  }
}

export default Confirmation;
