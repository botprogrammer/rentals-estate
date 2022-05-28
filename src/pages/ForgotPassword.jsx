import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
	const [email, setEmail] = useState("");

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success("Email was sent");
		} catch (error) {
			toast.error("Could not send reset email");
		}
	};

	return (
		<div
			className="pageContainer"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-evenly",
				flexDirection: "column",
				minHeight: "80vh",
			}}
		>
			<header>
				<h1 className="pageHeader">Reset Your Password</h1>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						className="emailInput"
						placeholder="Email Address"
						id="email"
						value={email}
						onChange={onChange}
						style={{
							marginBottom: "50px",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alighItems: "center",
						}}
					/>
					<Link className="forgotPasswordLink" to="/sign-in">
						Sign In
					</Link>

					<div
						className="signInBar"
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<div>
							<button
								className="signInButton"
								style={{
									width: "100%",
									height: "30",
									border: "none",
									backgroundColor: "#004274",
								}}
							>
								Send Reset Link
								<ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
							</button>
						</div>
					</div>
				</form>
			</main>
		</div>
	);
}

export default ForgotPassword;
