import { Link } from "react-router-dom";

function ListingItem({ listing, id, onEdit, onDelete }) {
	return (
		// <li className='categoryListing'>
		//   <Link
		//     to={`/category/${listing.type}/${id}`}
		//     className='categoryListingLink'
		//   >
		//     <img
		//       src={listing.imgUrls[0]}
		//       alt={listing.name}
		//       className='categoryListingImg'
		//     />
		//     <div className='categoryListingDetails'>
		//       <p className='categoryListingLocation'>{listing.location}</p>
		//       <p className='categoryListingName'>{listing.name}</p>

		//       <p className='categoryListingPrice'>
		//         $
		//         {listing.offer
		//           ? listing.discountedPrice
		//               .toString()
		//               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		//           : listing.regularPrice
		//               .toString()
		//               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
		//         {listing.type === 'rent' && ' / Month'}
		//       </p>
		//       <div className='categoryListingInfoDiv'>
		//         <img src={bedIcon} alt='bed' />
		//         <p className='categoryListingInfoText'>
		//           {listing.bedrooms > 1
		//             ? `${listing.bedrooms} Bedrooms`
		//             : '1 Bedroom'}
		//         </p>
		//         <img src={bathtubIcon} alt='bath' />
		//         <p className='categoryListingInfoText'>
		//           {listing.bathrooms > 1
		//             ? `${listing.bathrooms} Bathrooms`
		//             : '1 Bathroom'}
		//         </p>
		//       </div>
		//     </div>
		//   </Link>

		//   {onDelete && (
		//     <DeleteIcon
		//       className='removeIcon'
		//       fill='rgb(231, 76,60)'
		//       onClick={() => onDelete(listing.id, listing.name)}
		//     />
		//   )}

		//   {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
		// </li>
		<div
			className="card mb-4"
			style={{ background: "transparent", border: "none" }}
		>
			<div className="card-body">
				<div className="blog_item">
					<Link
						to={`/category/${listing.type}/${id}`}
						className="categoryListingLink"
					>
						<div className="blog_item_img">
							<img
								className="card-img rounded-0"
								src={listing.imgUrls[0]}
								alt={listing.name}
							/>
							<noscript>
								&lt;img class="card-img rounded-0" src={listing.imgUrls[0]}
								alt&gt;
							</noscript>
							<a className="blog_item_date">
								<h3>15</h3>
								<p>Jan</p>
							</a>
						</div>
						<div className="blog_details">
							<Link
								className="d-inline-block"
								to={`/category/${listing.type}/${id}`}
								style={{ display: "flex" }}
							>
								<h2 className="blog-head" style={{ color: "#2d2d2d" }}>
									{listing.name}
								</h2>
								<p
									className="blog-head"
									style={{
										color: "green",
										fontWeight: "bold",
										display: "flex",
										marginBottom: "0",
									}}
								>
									${" "}
									{listing.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									{listing.type === "rent" && " / Month"}
									&nbsp;&nbsp;&nbsp;&nbsp;
									{listing.offer ? (
										<p
											style={{
												color: "red",
												fontWeight: "bold",
												fontStyle: "italic",
												textDecoration: "line-through",
											}}
										>
											$
											{listing.regularPrice
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											{listing.type === "rent" && " / Month"}
										</p>
									) : (
										""
									)}
								</p>
							</Link>
							<p>
								That dominion stars lights dominion divide years for fourth have
								don't stars is that he earth it first without heaven in place
								seed it second morning saying.
							</p>
							<ul className="blog-info-link">
								<li>
									<Link to={`/category/${listing.type}/${id}`}>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												marginRight: "20px",
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-house"
												viewBox="0 0 16 16"
											>
												<path
													fill-rule="evenodd"
													d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
												/>
												<path
													fill-rule="evenodd"
													d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
												/>
											</svg>
											&nbsp;&nbsp;
											{listing.location}
										</div>
									</Link>
								</li>
								<li>
									<Link to={`/category/${listing.type}/${id}`}>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												marginRight: "20px",
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 640 512"
												width="16"
												height="16"
												fill="currentColor"
											>
												<path d="M168 304C216.5 304 256 264.5 256 216S216.5 128 168 128S80 167.5 80 216S119.5 304 168 304zM168 176c21.1 0 40 18 40 40C208 238 189.1 256 168 256C145.1 256 128 238 128 216C128 194 145.1 176 168 176zM528 128h-224C295.2 128 288 135.2 288 144v192H48v-280C48 42.75 37.25 32 24 32S0 42.75 0 55.1V456C0 469.3 10.75 480 23.1 480S48 469.3 48 456V384h544v72C592 469.3 602.7 480 616 480S640 469.3 640 456V240C640 178.1 589.9 128 528 128zM592 336h-256v-160h192c35.25 0 64 28.75 64 64V336z" />
											</svg>
											&nbsp;&nbsp;
											{listing.bedrooms > 1
												? `${listing.bedrooms} Bedrooms`
												: "1 Bedroom"}
										</div>
									</Link>
								</li>
								<li>
									<Link to={`/category/${listing.type}/${id}`}>
										<div style={{ display: "flex", alignItems: "center" }}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												width="16"
												height="16"
												fill="currentColor"
											>
												<path d="M464 320c-8.844 0-16 7.156-16 16v32c0 44.11-35.89 80-80 80h-224C99.89 448 64 412.1 64 368v-32C64 327.2 56.84 320 48 320S32 327.2 32 336v32c0 30.4 12.27 57.93 32 78.13V496C64 504.8 71.16 512 80 512C88.84 512 96 504.8 96 496v-27.23C110.6 475.8 126.8 480 144 480h224c17.24 0 33.39-4.242 48-11.23V496c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16v-49.87c19.73-20.2 32-47.74 32-78.13v-32C480 327.2 472.8 320 464 320zM496 256H64V61.25C64 45.13 77.13 32 93.25 32C100.1 32 108.5 35.13 113.9 40.56l25.32 25.32C121.6 93.88 124.8 131.3 149.2 155.7l12.88 12.88C158.9 174.6 159.6 182.2 164.7 187.3C167.8 190.4 171.9 192 176 192s8.188-1.562 11.31-4.688l96-96c6.25-6.25 6.25-16.38 0-22.62c-5.104-5.104-12.69-5.811-18.74-2.582L251.7 53.22C237.5 39.07 218.1 32 200.5 32C187 32 173.6 35.83 161.9 43.26L136.6 17.94C125 6.375 109.6 0 93.25 0C59.48 0 32 27.47 32 61.25v194.8L16 256C7.164 256 0 263.2 0 272S7.164 288 16 288h480C504.8 288 512 280.8 512 272S504.8 256 496 256zM171.8 75.85C179.5 68.21 189.6 64 200.5 64s20.96 4.207 28.61 11.85l12.23 12.23L184.1 145.3L171.8 133.1C156.1 117.3 156.1 91.62 171.8 75.85z" />
											</svg>
											&nbsp;&nbsp;
											{listing.bathrooms > 1
												? `${listing.bathrooms} Bathrooms`
												: "1 Bathroom"}
										</div>
									</Link>
								</li>
							</ul>
						</div>
					</Link>
					<div
						className="edbutn"
						style={{ display: "flex", justifyContent: "center" }}
					>
						{onDelete && (
							<div style={{ textAlign: "center" }}>
								<button
									className="btn btn-danger removeIcon"
									onClick={() => onDelete(listing.id, listing.name)}
									style={{
										margin: "50px",
										backgroundColor: "#dc3545",
									}}
								>
									Delete this Item
								</button>
							</div>
						)}
						{onEdit && (
							<div style={{ textAlign: "center" }}>
								<button
									className="btn btn-danger removeIcon"
									onClick={() => onEdit(id)}
									style={{
										margin: "50px",
										backgroundColor: "#dc3545",
									}}
								>
									Edit this Item
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingItem;
