
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DatePicker } from '@progress/kendo-react-dateinputs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkin: null,
            checkout: null,
            additionalComments: '',
            success: false
        };
    }
    render() {
        const today = new Date();

        return (
            <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <div className="card-block">
                            <form className="k-form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <legend>Please select dates of your stay:</legend>
                                    <label className="k-form-field">
                                        <span>Check-In</span>
                                        <DatePicker
                                            width="100%"
                                            name="checkin"
                                            required={true}
                                            format="dd-MMM-yyyy"
                                            spinners={true}
                                            min={today}

                                            value={this.state.checkin}
                                            onChange={this.handleChange}
                                            validationMessage={this.state.checkin === null
                                                ? 'Check-In date is required!'
                                                : 'Check-In date cannot be in the past!'}
                                        />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Check-Out</span>
                                        <DatePicker
                                            width="100%"
                                            name="checkout"
                                            required={true}
                                            format="dd-MMM-yyyy"
                                            spinners={true}

                                            valid={(this.state.checkin !== null && this.state.checkout !== null)
                                                && (this.state.checkin.getTime() < this.state.checkout.getTime())}

                                            value={this.state.checkout}
                                            onChange={this.handleChange}
                                            validationMessage={this.state.checkout === null
                                                ? 'Check-Out date is required!'
                                                : 'Check-Out date cannot be before Check-In date!'}
                                        />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Additional Comments</span>
                                        <textarea
                                            className="k-textarea"
                                            style={{ width: '100%' }}
                                            name="additionalComments"
                                            value={this.state.additionalComments}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                </fieldset>
                                <input type="submit" className="k-button k-primary" value="Search" />
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.success && (
                    <div
                        className="alert alert-success"
                        style={{ position: 'absolute' }}
                    >
                        Form submitted!
                    </div>)}
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ success: true });
        setTimeout(() => { this.setState({ success: false }); }, 3000);
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

