import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <>
      <div className="login-38">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 form-section">
              <div className="form-inner">
                <a href="login-38.html" className="logo">
                  <img src="assets/img/logos/logo-2.png" alt="logo" />
                </a>
                <h3>Create An Account</h3>
                <form onSubmit={onSubmit}>
                  <div className="form-group form-box">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      id="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group form-box">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group form-box">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={onChange}
                    />
                  </div>
                  {/* <div className="checkbox form-group form-box">
                    <div className="checkbox clearfix">
                      <div className="form-check checkbox-theme">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          I agree to the
                          <a href="#" className="terms">
                            terms of service
                          </a>
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="form-group clearfix">
                    <button type="submit" className="btn-md btn-theme w-100">
                      Sign Up
                    </button>
                  </div>
                  <div className="extra-login clearfix">
                    <span>Or Sign Up With</span>
                  </div>
                </form>
                <OAuth />

                <Link to="/sign-in" className="registerLink">
                  Sign In Instead
                </Link>
                <div className="clearfix" />
                <p>
                  Already a member? <a href="login-38.html">Login here</a>
                </p>
              </div>
            </div>
            <div className="col-lg-6 bg-img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
