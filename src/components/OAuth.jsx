import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

document.getElementById("googlesvgpath");

function OAuth() {
	const navigate = useNavigate();
	const location = useLocation();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate("/");
		} catch (error) {
			toast.error("Could not authorize with Google");
		}
	};

	return (
		// <div className='socialLogin'>
		//   <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
		//   <button className='socialIconDiv' onClick={onGoogleClick}>
		//     <img className='socialIconImg' src={googleIcon} alt='google' />
		//   </button>
		// </div>
		// ////////////////////
		// ////////////////////
		// <div className="social-buttons">
		//   <a href="#" className="social-button social-button-facebook">
		//     <i className="fa fa-facebook" />
		//   </a>
		//   <a href="#" className="social-button social-button-twitter">
		//     <i className="fa fa-twitter" />
		//   </a>

		//   <a href="#" className="social-button social-button-linkedin">
		//     <i className="fa fa-linkedin" />
		//   </a>
		<div>
			<a
				href="#"
				className="social-button social-button-google"
				onClick={onGoogleClick}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 488 512"
					style={{ padding: 15, color: "red" }}
				>
					<path
						id="googlesvgpath"
						style={{ fill: "red" }}
						d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
					/>
				</svg>
			</a>
		</div>
	);
}

export default OAuth;
