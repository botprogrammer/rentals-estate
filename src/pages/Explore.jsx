import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import sectionImage from "../assets/images/explore/section-bg1.jpg";
import property1 from "../assets/images/explore/property1.svg";
import property2 from "../assets/images/explore/property2.svg";
import property3 from "../assets/images/explore/property3.svg";
import property4 from "../assets/images/explore/property4.svg";
import githubIcon from "../assets/images/explore/github.svg";
import instagramIcon from "../assets/images/explore/instagram.svg";
import linkedinIcon from "../assets/images/explore/linkedin.svg";
import globeIcon from "../assets/images/explore/globe.svg";

function Explore() {
	return (
		<>
			<main>
				<section
					className="slider-area"
					style={{ padding: "50px auto", marginBottom: "50px" }}
				>
					<div className="slider-active slick-initialized slick-slider">
						<div className="slick-list draggable">
							<div className="slick-track" style={{ opacity: 1, width: 1519 }}>
								<Slider />
							</div>
						</div>
					</div>
				</section>
				<section
					className="categories-area section-bg"
					style={{ marginBottom: "50px" }}
				>
					<div className="container">
						<div className="row align-items-center">
							<div className="col-xl-4">
								<div className="section-tittle section-tittle3 mb-20">
									<h2>
										Explore
										<br /> by Property Type
									</h2>
									<p>
										Get started by choosing from one of our pre-built page
										templates to showcase your properties
									</p>
									<Link to="/category/rent" className="btn mt-30">
										View All Property
									</Link>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-0">
								<div className="single-cat text-center mb-10">
									<div className="cat-icon">
										<img
											src={property1}
											alt=""
											data-pagespeed-url-hash={2012948110}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Home &amp; Appartment</a>
										</h5>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-0">
								<div className="single-cat text-center mb-10">
									<div className="cat-icon">
										<img
											src={property2}
											alt=""
											data-pagespeed-url-hash={2307448031}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Vila</a>
										</h5>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-0">
								<div className="single-cat text-center mb-10">
									<div className="cat-icon">
										<img
											src={property3}
											alt=""
											data-pagespeed-url-hash={2601947952}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Studio</a>
										</h5>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-0">
								<div className="single-cat text-center mb-10">
									<div className="cat-icon">
										<img
											src={property4}
											alt=""
											data-pagespeed-url-hash={2896447873}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Office</a>
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					className="services-area section-img-bg2"
					data-background={sectionImage}
					style={{
						backgroundImage: "url(" + sectionImage + ")",
						marginBottom: "50px",
					}}
				>
					<div className="container">
						<div className="row">
							<div className="col-xl-12 ">
								<div className="section-tittle section-tittle2  text-center mb-40">
									<h2>How we help people?</h2>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 p-0">
								<div className="single-cat mb-10 text-center">
									<div className="cat-icon">
										<img
											src="assets/img/icon/services1.svg"
											alt=""
											data-pagespeed-url-hash={1056735717}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Sell home or office</a>
										</h5>
										<p>
											Get started by choosing from one of our pre-built page
											templates to showcase your properties
										</p>
									</div>
								</div>
							</div>
							<div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 p-0">
								<div className="single-cat mb-10 text-center">
									<div className="cat-icon">
										<img
											src="assets/img/icon/services2.svg"
											alt=""
											data-pagespeed-url-hash={1351235638}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Rent home or office</a>
										</h5>
										<p>
											Get started by choosing from one of our pre-built page
											templates to showcase your properties
										</p>
									</div>
								</div>
							</div>
							<div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 p-0">
								<div className="single-cat mb-10 text-center">
									<div className="cat-icon">
										<img
											src="assets/img/icon/services3.svg"
											alt=""
											data-pagespeed-url-hash={1645735559}
											onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
										/>
									</div>
									<div className="cat-cap">
										<h5>
											<a href="#">Find next</a>
										</h5>
										<p>
											Get started by choosing from one of our pre-built page
											templates to showcase your properties
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="visit-tailor-area fix">
					<div className="tailor-details">
						<h2>Subscribe Newsletter</h2>
						<p>
							Get started by choosing from one of our pre-built page templates
							to showcase your properties
						</p>
						<div className="subscribe-now">
							<input type="text" placeholder="Enter your email" />
							<button className="submit-btn2">Subscribe</button>
						</div>
					</div>
					<div className="tailor-offers" />
				</div>
			</main>
			<footer>
				<div className="footer-wrapper">
					<div className="footer-area footer-padding">
						<div className="container">
							<div className="row justify-content-between">
								<div className="col-xl-3 col-lg-3 col-md-6 col-sm-8">
									<div className="single-footer-caption mb-50">
										<div className="single-footer-caption mb-30">
											<div className="footer-logo mb-35">
												<a href="index_1.html">
													<img
														data-cfsrc="assets/img/logo/xlogo2_footer.png.pagespeed.ic.s6xy6VHN_v.png"
														alt=""
														style={{ display: "none", visibility: "hidden" }}
													/>
													<noscript>
														&lt;img
														src="images/xlogo2_footer.png.pagespeed.ic.s6xy6VHN_v.png"
														alt&gt;
													</noscript>
												</a>
											</div>
											<div className="footer-tittle">
												<div className="footer-pera">
													<p>
														Rentals Project made by Pranav Goswami. You can
														visit any of my below profile!
													</p>
												</div>
												<ul className="footer-social">
													<li>
														<a href="https://www.instagram.com/p03_goswami/">
															<img src={instagramIcon} alt="" />
														</a>
													</li>
													<li>
														<a href="https://www.linkedin.com/in/pranav-goswami-9b501b191/">
															<img src={linkedinIcon} alt="" />
														</a>
													</li>
													<li>
														<a href="https://github.com/botprogrammer">
															<img src={githubIcon} alt="" />
														</a>
													</li>
													<li>
														<a href="https://pranavgoswami.netlify.app/">
															<img src={globeIcon} alt="" />
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
									<div className="single-footer-caption mb-50">
										<div className="footer-tittle">
											<h4>Navigation</h4>
											<ul>
												<li>
													<Link to="/">Home</Link>
												</li>
												<li>
													<Link to="/offers">Offers</Link>
												</li>
												<li>
													<Link to="/profile">Profile</Link>
												</li>
												<li>
													<Link to="/category/sell">Sell</Link>
												</li>
												<li>
													<Link to="/category/rent">Rent</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
									<div className="single-footer-caption mb-50">
										<div className="footer-tittle">
											<h4>Services</h4>
											<ul>
												<li>
													<a href="#">Drone Mapping</a>
												</li>
												<li>
													<a href="#"> Real State</a>
												</li>
												<li>
													<a href="#">Commercial</a>
												</li>
												<li>
													<a href="#">Construction</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
									<div className="single-footer-caption mb-50">
										<div className="footer-tittle">
											<h4>Support</h4>
											<ul>
												<li>
													<a href="#">Drone Mapping</a>
												</li>
												<li>
													<a href="#"> Real State</a>
												</li>
												<li>
													<a href="#">Commercial</a>
												</li>
												<li>
													<a href="#">Construction</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-8">
									<div className="single-footer-caption mb-50">
										<div className="footer-tittle mb-50">
											<h4>Contact Me</h4>
											<ul>
												<li>
													<a href="https://www.instagram.com/p03_goswami/">
														Instagram
													</a>
												</li>
												<li>
													<a href="https://www.linkedin.com/in/pranav-goswami-9b501b191/">
														Linkedin
													</a>
												</li>
												<li>
													<a href="https://github.com/botprogrammer">Github</a>
												</li>
												<li>
													<a href="https://pranavgoswami.netlify.app/">
														Portfolio
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom-area">
						<div className="container">
							<div className="footer-border">
								<div className="row">
									<div className="col-xl-12 ">
										<div className="footer-copy-right text-center">
											<p>
												Copyright © All rights reserved | Designed and Created
												by
												<a href="https://pranavgoswami.netlify.app/">
													{" "}
													Pranav Goswami
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Explore;
