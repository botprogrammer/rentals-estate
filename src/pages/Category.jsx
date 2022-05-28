import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);

	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get reference
				const listingsRef = collection(db, "listings");

				// Create a query
				const q = query(
					listingsRef,
					where("type", "==", params.categoryName),
					orderBy("timestamp", "desc"),
					limit(3)
				);

				// Execute query
				const querySnap = await getDocs(q);

				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisible);

				const listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch listings");
			}
		};

		fetchListings();
	}, [params.categoryName]);

	// Pagination / Load More
	const onFetchMoreListings = async () => {
		try {
			// Get reference
			const listingsRef = collection(db, "listings");

			// Create a query
			const q = query(
				listingsRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(10)
			);

			// Execute query
			const querySnap = await getDocs(q);

			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchedListing(lastVisible);

			const listings = [];

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings((prevState) => [...prevState, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error("Could not fetch listings");
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<div className="slider-area">
							<div className="single-slider slider-bg4 hero-overly slider-height2 d-flex align-items-center">
								<div className="container">
									<div className="row">
										<div className="col-xxl-5 col-xl-6 col-lg-12 col-md-10">
											<div className="hero-caption hero-caption2">
												<h1>
													{params.categoryName === "rent"
														? "Places for rent"
														: "Places for sale"}
												</h1>
												<p>
													{params.categoryName === "rent"
														? "Get started by choosing from some of our best rental properties."
														: "Get started by choosing from some of our best selling properties."}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section className="blog_area top-padding">
							<div className="container">
								<div className="row">
									<div className="col-lg-12 mb-5 mb-lg-0">
										{listings.map((listing) => (
											<div className="blog_left_sidebar">
												<ListingItem
													listing={listing.data}
													id={listing.id}
													key={listing.id}
												/>
											</div>
										))}
										{/* <article className="blog_item">
                        <div className="blog_item_img">
                          <img
                            className="card-img rounded-0"
                            data-cfsrc="assets/img/blog/single_blog_2.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="card-img rounded-0"
                            src="images/single_blog_2.jpg" alt&gt;
                          </noscript>
                          <a href="#" className="blog_item_date">
                            <h3>15</h3>
                            <p>Jan</p>
                          </a>
                        </div>
                        <div className="blog_details">
                          <a
                            className="d-inline-block"
                            href="blog_details.html"
                          >
                            <h2
                              className="blog-head"
                              style={{ color: "#2d2d2d" }}
                            >
                              Google inks pact for new 35-storey office
                            </h2>
                          </a>
                          <p>
                            That dominion stars lights dominion divide years for
                            fourth have don't stars is that he earth it first
                            without heaven in place seed it second morning
                            saying.
                          </p>
                          <ul className="blog-info-link">
                            <li>
                              <a href="#">
                                <i className="fa fa-user" /> Travel, Lifestyle
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-comments" /> 03 Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                      <article className="blog_item">
                        <div className="blog_item_img">
                          <img
                            className="card-img rounded-0"
                            data-cfsrc="assets/img/blog/single_blog_3.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="card-img rounded-0"
                            src="images/single_blog_3.jpg" alt&gt;
                          </noscript>
                          <a href="#" className="blog_item_date">
                            <h3>15</h3>
                            <p>Jan</p>
                          </a>
                        </div>
                        <div className="blog_details">
                          <a
                            className="d-inline-block"
                            href="blog_details.html"
                          >
                            <h2
                              className="blog-head"
                              style={{ color: "#2d2d2d" }}
                            >
                              Google inks pact for new 35-storey office
                            </h2>
                          </a>
                          <p>
                            That dominion stars lights dominion divide years for
                            fourth have don't stars is that he earth it first
                            without heaven in place seed it second morning
                            saying.
                          </p>
                          <ul className="blog-info-link">
                            <li>
                              <a href="#">
                                <i className="fa fa-user" /> Travel, Lifestyle
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-comments" /> 03 Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                      <article className="blog_item">
                        <div className="blog_item_img">
                          <img
                            className="card-img rounded-0"
                            data-cfsrc="assets/img/blog/single_blog_4.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="card-img rounded-0"
                            src="images/single_blog_4.jpg" alt&gt;
                          </noscript>
                          <a href="#" className="blog_item_date">
                            <h3>15</h3>
                            <p>Jan</p>
                          </a>
                        </div>
                        <div className="blog_details">
                          <a
                            className="d-inline-block"
                            href="blog_details.html"
                          >
                            <h2
                              className="blog-head"
                              style={{ color: "#2d2d2d" }}
                            >
                              Google inks pact for new 35-storey office
                            </h2>
                          </a>
                          <p>
                            That dominion stars lights dominion divide years for
                            fourth have don't stars is that he earth it first
                            without heaven in place seed it second morning
                            saying.
                          </p>
                          <ul className="blog-info-link">
                            <li>
                              <a href="#">
                                <i className="fa fa-user" /> Travel, Lifestyle
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-comments" /> 03 Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                      <article className="blog_item">
                        <div className="blog_item_img">
                          <img
                            className="card-img rounded-0"
                            data-cfsrc="assets/img/blog/single_blog_5.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="card-img rounded-0"
                            src="images/single_blog_5.jpg" alt&gt;
                          </noscript>
                          <a href="#" className="blog_item_date">
                            <h3>15</h3>
                            <p>Jan</p>
                          </a>
                        </div>
                        <div className="blog_details">
                          <a
                            className="d-inline-block"
                            href="blog_details.html"
                          >
                            <h2
                              className="blog-head"
                              style={{ color: "#2d2d2d" }}
                            >
                              Google inks pact for new 35-storey office
                            </h2>
                          </a>
                          <p>
                            That dominion stars lights dominion divide years for
                            fourth have don't stars is that he earth it first
                            without heaven in place seed it second morning
                            saying.
                          </p>
                          <ul className="blog-info-link">
                            <li>
                              <a href="#">
                                <i className="fa fa-user" /> Travel, Lifestyle
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-comments" /> 03 Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article> */}
										<nav className="blog-pagination justify-content-center d-flex">
											{lastFetchedListing && (
												<button
													className="btn btn-primary"
													onClick={onFetchMoreListings}
													style={{ marginBottom: "50px" }}
												>
													Load More
												</button>
											)}
										</nav>
									</div>
								</div>
							</div>
						</section>
					</main>

					{/* <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )} */}
				</>
			) : (
				<h1 style={{ textAlign: "center", marginTop: "200px" }}>
					No listings for {params.categoryName} for now!
				</h1>
			)}
			{/* <main>
        <div className="slider-area">
          <div className="single-slider slider-bg4 hero-overly slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xxl-5 col-xl-6 col-lg-8 col-md-10">
                  <div className="hero-caption hero-caption2">
                    <h1>
                      {params.categoryName === "rent"
                        ? "Places for rent"
                        : "Places for sale"}
                    </h1>
                    <p>
                      {params.categoryName === "rent"
                        ? "Get started by choosing from some of our best rental properties."
                        : "Get started by choosing from some of our best selling properties."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="blog_area top-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                <div className="blog_left_sidebar">
                  <article className="blog_item">
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        data-cfsrc="assets/img/blog/single_blog_1.jpg"
                        alt=""
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img class="card-img rounded-0"
                        src="images/single_blog_1.jpg" alt&gt;
                      </noscript>
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="blog_details.html">
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          Google inks pact for new 35-storey office
                        </h2>
                      </a>
                      <p>
                        That dominion stars lights dominion divide years for
                        fourth have don't stars is that he earth it first
                        without heaven in place seed it second morning saying.
                      </p>
                      <ul className="blog-info-link">
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Travel, Lifestyle
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments" /> 03 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <article className="blog_item">
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        data-cfsrc="assets/img/blog/single_blog_2.jpg"
                        alt=""
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img class="card-img rounded-0"
                        src="images/single_blog_2.jpg" alt&gt;
                      </noscript>
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="blog_details.html">
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          Google inks pact for new 35-storey office
                        </h2>
                      </a>
                      <p>
                        That dominion stars lights dominion divide years for
                        fourth have don't stars is that he earth it first
                        without heaven in place seed it second morning saying.
                      </p>
                      <ul className="blog-info-link">
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Travel, Lifestyle
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments" /> 03 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <article className="blog_item">
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        data-cfsrc="assets/img/blog/single_blog_3.jpg"
                        alt=""
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img class="card-img rounded-0"
                        src="images/single_blog_3.jpg" alt&gt;
                      </noscript>
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="blog_details.html">
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          Google inks pact for new 35-storey office
                        </h2>
                      </a>
                      <p>
                        That dominion stars lights dominion divide years for
                        fourth have don't stars is that he earth it first
                        without heaven in place seed it second morning saying.
                      </p>
                      <ul className="blog-info-link">
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Travel, Lifestyle
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments" /> 03 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <article className="blog_item">
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        data-cfsrc="assets/img/blog/single_blog_4.jpg"
                        alt=""
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img class="card-img rounded-0"
                        src="images/single_blog_4.jpg" alt&gt;
                      </noscript>
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="blog_details.html">
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          Google inks pact for new 35-storey office
                        </h2>
                      </a>
                      <p>
                        That dominion stars lights dominion divide years for
                        fourth have don't stars is that he earth it first
                        without heaven in place seed it second morning saying.
                      </p>
                      <ul className="blog-info-link">
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Travel, Lifestyle
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments" /> 03 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <article className="blog_item">
                    <div className="blog_item_img">
                      <img
                        className="card-img rounded-0"
                        data-cfsrc="assets/img/blog/single_blog_5.jpg"
                        alt=""
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img class="card-img rounded-0"
                        src="images/single_blog_5.jpg" alt&gt;
                      </noscript>
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="blog_details.html">
                        <h2 className="blog-head" style={{ color: "#2d2d2d" }}>
                          Google inks pact for new 35-storey office
                        </h2>
                      </a>
                      <p>
                        That dominion stars lights dominion divide years for
                        fourth have don't stars is that he earth it first
                        without heaven in place seed it second morning saying.
                      </p>
                      <ul className="blog-info-link">
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Travel, Lifestyle
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments" /> 03 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <nav className="blog-pagination justify-content-center d-flex">
                    <ul className="pagination">
                      <li className="page-item">
                        <a href="#" className="page-link" aria-label="Previous">
                          <i className="ti-angle-left" />
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link" aria-label="Next">
                          <i className="ti-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget search_widget">
                    <form action="#">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Keyword"
                          />
                          <div className="input-group-append d-flex">
                            <button className="boxed-btn2" type="button">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </aside>
                  <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
                      Category
                    </h4>
                    <ul className="list cat-list">
                      <li>
                        <a href="#" className="d-flex">
                          <p>Resaurant food</p>
                          <p>(37)</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Travel news</p>
                          <p>(10)</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Modern technology</p>
                          <p>(03)</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Product</p>
                          <p>(11)</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Inspiration</p>
                          <p>21</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Health Care (21)</p>
                          <p>09</p>
                        </a>
                      </li>
                    </ul>
                  </aside>
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title" style={{ color: "#2d2d2d" }}>
                      Recent Post
                    </h3>
                    <div className="media post_item">
                      <img
                        data-cfsrc="assets/img/post/post_1.jpg"
                        alt="post"
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img src="images/post_1.jpg" alt="post"&gt;
                      </noscript>
                      <div className="media-body">
                        <a href="blog_details.html">
                          <h3 style={{ color: "#2d2d2d" }}>
                            From life was you fish...
                          </h3>
                        </a>
                        <p>January 12, 2019</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img
                        data-cfsrc="assets/img/post/post_2.jpg"
                        alt="post"
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img src="images/post_2.jpg" alt="post"&gt;
                      </noscript>
                      <div className="media-body">
                        <a href="blog_details.html">
                          <h3 style={{ color: "#2d2d2d" }}>
                            The Amazing Hubble
                          </h3>
                        </a>
                        <p>02 Hours ago</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img
                        data-cfsrc="assets/img/post/post_3.jpg"
                        alt="post"
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img src="images/post_3.jpg" alt="post"&gt;
                      </noscript>
                      <div className="media-body">
                        <a href="blog_details.html">
                          <h3 style={{ color: "#2d2d2d" }}>
                            Astronomy Or Astrology
                          </h3>
                        </a>
                        <p>03 Hours ago</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img
                        data-cfsrc="assets/img/post/post_4.jpg"
                        alt="post"
                        style={{ display: "none", visibility: "hidden" }}
                      />
                      <noscript>
                        &lt;img src="images/post_4.jpg" alt="post"&gt;
                      </noscript>
                      <div className="media-body">
                        <a href="blog_details.html">
                          <h3 style={{ color: "#2d2d2d" }}>
                            Asteroids telescope
                          </h3>
                        </a>
                        <p>01 Hours ago</p>
                      </div>
                    </div>
                  </aside>
                  <aside className="single_sidebar_widget tag_cloud_widget">
                    <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
                      Tag Clouds
                    </h4>
                    <ul className="list">
                      <li>
                        <a href="#">project</a>
                      </li>
                      <li>
                        <a href="#">love</a>
                      </li>
                      <li>
                        <a href="#">technology</a>
                      </li>
                      <li>
                        <a href="#">travel</a>
                      </li>
                      <li>
                        <a href="#">restaurant</a>
                      </li>
                      <li>
                        <a href="#">life style</a>
                      </li>
                      <li>
                        <a href="#">design</a>
                      </li>
                      <li>
                        <a href="#">illustration</a>
                      </li>
                    </ul>
                  </aside>
                  <aside className="single_sidebar_widget instagram_feeds">
                    <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
                      Instagram Feeds
                    </h4>
                    <ul className="instagram_row flex-wrap">
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_5.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_5.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_6.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_6.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_7.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_7.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_8.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_8.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_9.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_9.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            className="img-fluid"
                            data-cfsrc="assets/img/post/post_10.jpg"
                            alt=""
                            style={{ display: "none", visibility: "hidden" }}
                          />
                          <noscript>
                            &lt;img class="img-fluid" src="images/post_10.jpg"
                            alt&gt;
                          </noscript>
                        </a>
                      </li>
                    </ul>
                  </aside>
                  <aside className="single_sidebar_widget newsletter_widget">
                    <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
                      Newsletter
                    </h4>
                    <form action="#">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter email'"
                          placeholder="Enter email"
                          required=""
                        />
                      </div>
                      <button
                        className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </form>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main> */}
		</>
	);
}

export default Category;
