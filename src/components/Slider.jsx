import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Spinner from "./Spinner";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id}>
              <div
                className="single-slider slider-bg1 hero-overly slider-height d-flex align-items-center slick-slide slick-current slick-active"
                tabIndex={0}
                style={{
                  width: 1519,
                  position: "relative",
                  left: 0,
                  top: 0,
                  zIndex: 999,
                  opacity: 1,
                  backgroundImage: `url(${data.imgUrls[0]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                data-slick-index={0}
                aria-hidden="false"
              >
                <div className="container">
                  <div className="row">
                    <div className="offset-xl-1 col-xxl-5 col-xl-6 col-lg-6 col-md-8">
                      <div className="hero-caption">
                        <span>
                          {data.bedrooms} Bed - {data.bathrooms} Bath - 2200 Sq
                          Ft
                        </span>
                        <h1
                          data-animation="bounceIn"
                          data-delay="0.2s"
                          className=""
                          style={{ animationDelay: "0.2s" }}
                        >
                          {data.name}
                        </h1>
                        <p
                          data-animation="fadeInUp"
                          data-delay="0.4s"
                          className=""
                          style={{ animationDelay: "0.4s" }}
                        >
                          A beautiful house in Ahmedabad
                        </p>
                        <span className="price">
                          ${data.discountedPrice ?? data.regularPrice}{" "}
                          {data.type === "rent" && "/ month"}
                        </span>
                        <a
                          className="btn hero-btn"
                          data-animation="fadeInUp"
                          data-delay="0.7s"
                          tabIndex={0}
                          style={{ animationDelay: "0.7s" }}
                          onClick={() =>
                            navigate(`/category/${data.type}/${id}`)
                          }
                        >
                          View Property
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
