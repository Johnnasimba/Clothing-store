import React, {Component} from 'react';
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
        }
        
       
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            email: '',
            password: ''
        })
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    render() { 
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password </span>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                    <label>Email</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                    <label>password</label>

                    <input type="submit" value="submit form" />
                </form>
            </div>
          );
    }
}
 
export default SignIn;