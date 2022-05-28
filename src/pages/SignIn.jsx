import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

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

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate("/");
			}
		} catch (error) {
			toast.error("Bad User Credentials");
		}
	};

	return (
		<>
			<div className="login-38">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-6 form-section">
							<div className="form-inner">
								<h3>Sign Into Your Account</h3>
								<form onSubmit={onSubmit}>
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
									<div className="form-group form-box clearfix">
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
                    <div className="form-check checkbox-theme">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="forgot-password-38.html"
                      className="forgot-password"
                    >
                      Forgot Password
                    </a>
                  </div> */}
									<div className="form-group clearfix">
										<button type="submit" className="btn-md btn-theme w-100">
											Sign Up
										</button>
									</div>
									<div className="extra-login clearfix">
										<span>Or Login With</span>
									</div>
								</form>
								<div className="clearfix" />
								<OAuth />

								<Link to="/sign-up" className="registerLink">
									Sign Up Instead
								</Link>
								<p>
									Don't have an account?{" "}
									<a href="register-38.html" className="thembo">
										{" "}
										Register here
									</a>
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

export default SignIn;
