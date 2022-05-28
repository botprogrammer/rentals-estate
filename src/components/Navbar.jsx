import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const auth = getAuth();

	const [user, setUser] = useState(auth.currentUser);

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
	};

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	return (
		<>
			<div className="header-area">
				<div className="main-header">
					<div className="header-top header-sticky">
						<div className="container">
							<div className="d-flex align-items-center justify-content-between flex-wrap position-relative">
								<div className="left-side d-flex align-items-center">
									<div className="logo">
										<a href="index_1.html">
											<img
												data-cfsrc="assets/img/logo/xlogo.png.pagespeed.ic.9pAfkm5loV.png"
												alt=""
												style={{ display: "none", visibility: "hidden" }}
											/>
											<noscript>
												&lt;img
												src="images/xlogo.png.pagespeed.ic.9pAfkm5loV.png"
												alt&gt;
											</noscript>
										</a>
									</div>
									<div className="main-menu d-none d-lg-block">
										<nav>
											<ul id="navigation">
												<li onClick={() => navigate("/")}>
													<a>Explore</a>
												</li>
												<li onClick={() => navigate("/offers")}>
													<a>Offers</a>
												</li>
												<li onClick={() => navigate("/profile")}>
													<a>Profile</a>
												</li>
												<li onClick={() => navigate("/category/sell")}>
													<a>Sell</a>
												</li>
												<li onClick={() => navigate("/category/rent")}>
													<a>Rent</a>
												</li>
											</ul>
										</nav>
									</div>
								</div>
								{auth.currentUser ? (
									<div className="header-right-btn f-right">
										<a
											onClick={() => navigate("/forgot-password")}
											className="btn_1"
											style={{ marginRight: "20px" }}
										>
											Forgot Password
										</a>
										<a
											onClick={onLogout}
											className="btn_1"
											style={{ marginRight: "20px" }}
										>
											Logout
										</a>
									</div>
								) : (
									<div className="header-right-btn f-right">
										{/* <a href="#" className="header-btn2">
									  Call Us: <span>+10 (78) 356 3276</span>
									</a> */}
										<a
											onClick={() => navigate("/sign-up")}
											className="btn_1"
											style={{ marginRight: "20px" }}
										>
											Sign Up
										</a>
										<a onClick={() => navigate("/sign-in")} className="btn_1">
											Sign In
										</a>
									</div>
								)}

								<div className="col-12">
									<div className="mobile_menu d-block d-lg-none" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
