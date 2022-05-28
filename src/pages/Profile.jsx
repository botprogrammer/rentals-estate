import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

function Profile() {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, "listings");

			const q = query(
				listingsRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc")
			);

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

		fetchUserListings();
	}, [auth.currentUser.uid]);

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in fb
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// Update in firestore
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Could not update profile details");
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onDelete = async (listingId) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", listingId));
			const updatedListings = listings.filter(
				(listing) => listing.id !== listingId
			);
			setListings(updatedListings);
			toast.success("Successfully deleted listing");
		}
	};

	const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

	return (
		<section style={{ backgroundColor: "#eee" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-4">
						<div className="card mb-4">
							<div className="card-body text-center">
								<h5 className="my-3">{auth.currentUser.displayName}</h5>
								<p className="text-muted mb-1">{auth.currentUser.email}</p>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary ms-1"
										style={{ marginRight: 10 }}
										onClick={() => {
											changeDetails && onSubmit();
											setChangeDetails((prevState) => !prevState);
										}}
									>
										{changeDetails ? "Done" : "Update"}
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={onLogout}
									>
										Logout
									</button>
								</div>
							</div>
						</div>
						<Link
							to="/create-listing"
							className="btn btn-primary"
							style={{ width: "100%", margin: "auto" }}
						>
							Sell Your Property
						</Link>
					</div>
					<div className="col-lg-8">
						<div className="card mb-4">
							<form>
								<div className="card-body">
									<div className="row">
										<div className="col-sm-3">
											<p className="mb-0">Name</p>
										</div>
										<div className="col-sm-9">
											<input
												type="text"
												id="name"
												className="text-muted mb-0"
												disabled={!changeDetails}
												value={name}
												onChange={onChange}
											/>
										</div>
									</div>
									<hr />
									<div className="row">
										<div className="col-sm-3">
											<p className="mb-0">Email</p>
										</div>
										<div className="col-sm-9">
											<input
												type="text"
												id="email"
												className="text-muted mb-0"
												disabled={!changeDetails}
												value={email}
												onChange={onChange}
											/>
										</div>
									</div>
									<hr />
									<div className="row">
										<div className="col-sm-3">
											<p className="mb-0">Phone</p>
										</div>
										<div className="col-sm-9">
											<p className="text-muted mb-0">(123) 456-7891</p>
										</div>
									</div>
									<hr />
									<div className="row">
										<div className="col-sm-3">
											<p className="mb-0">Mobile</p>
										</div>
										<div className="col-sm-9">
											<p className="text-muted mb-0">(098) 765-4321</p>
										</div>
									</div>
									<hr />
								</div>
							</form>
						</div>
					</div>
					{!loading && listings?.length > 0 && (
						<>
							<h1 style={{ textAlign: "center", margin: "50px auto" }}>
								My Listings
							</h1>
							<div className="col-lg-12">
								<div className="card mb-4">
									<div className="card-body">
										{listings.map((listing) => (
											<ListingItem
												key={listing.id}
												listing={listing.data}
												id={listing.id}
												onDelete={() => onDelete(listing.id)}
												onEdit={() => onEdit(listing.id)}
											/>
										))}
										<hr />
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default Profile;
