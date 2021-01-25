import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'


const Signin = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })

    // to get name - it will be values.name etc
    // The below line will destructure them. So to get name I can ask for 'name' itself instead of 'values.name'
    const {name, email, password, error, success, loading, didRedirect} = values

    // Higher order function to update all the keys in 'values'
    const handleChange = (name) => 
        // event will first find out the key i.e email, password etc. Then sent it over to 'name' - and will update that key only
        (event) => {
            // setValue will first get the values from above. Then set error to false, then update the keys.
            setValues({...values, error: false, [name]: event.target.value})
        }
    
    // const onSubmit = (event) => {
    //     // So that it doesnt refresh the screen
    //     event.preventDefault()
    //     //loading all the values
    //     setValues({...values, erorr:false})
    //     // api call from helpers
    //     signup({name, email, password})
    //     .then(data => {
    //         console.log("DATA", data)
    //         // quick way to check if the backend has accepted the new user - it would not return the email otherwise
    //         // PS: have not sanitized the data
    //         if (data.email === email) {
    //             // reset the form to all blank. First to get all the values and then set it.
    //             setValues({
    //                 ...values,
    //                 name: "",
    //                 email: "",
    //                 password: "",
    //                 error: "",
    //                 success: true
    //             })
    //         } else {
    //             // if backend has sent any errors, i set the error and success flags accordingly
    //             // PS: I could also push the error message to the UI..currently i am not doing it.
    //             setValues({
    //                 ...values,
    //                 error: true,
    //                 success: false
    //             })
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    // style (display) will only appear depending on success value.
                     style={{ display: success ? "": "none"}}
                    >
                        New account created Successfully, Please 
                        {/* The Link will take you to all the routes in the Routes.js */}
                        <Link to="/signin"> login now.</Link> 
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                     style={{ display: error ? "": "none"}}
                    >
                        Check all fields again.
                    </div>
                </div>
            </div>
        )
    }
    
    const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                             type="text"
                             className="form-control" 
                             value={email} 
                             onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                             type="password"
                             className="form-control" 
                             value={password} 
                             onChange={handleChange("password")}
                            />
                        </div>
                        <button
                         className="btn btn-success btn-block"
                         onClick={()=>{}}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }



    return (
        <Base title="Signin Page" description="T-shirt store">
            {SignInForm()}
        <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin