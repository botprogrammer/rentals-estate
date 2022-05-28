import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";

function CreateListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

    let geolocation = {};
    let location;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC00d3rQgDoFm2lIJgCmytsO689qENsP8I`
      );

      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    // <div className='profile'>
    //   <header>
    //     <p className='pageHeader'>Create a Listing</p>
    //   </header>

    //   <main>
    //     <form onSubmit={onSubmit}>
    //       <label className='formLabel'>Sell / Rent</label>
    //       <div className='formButtons'>
    //         <button
    //           type='button'
    //           className={type === 'sale' ? 'formButtonActive' : 'formButton'}
    //           id='type'
    //           value='sale'
    //           onClick={onMutate}
    //         >
    //           Sell
    //         </button>
    //         <button
    //           type='button'
    //           className={type === 'rent' ? 'formButtonActive' : 'formButton'}
    //           id='type'
    //           value='rent'
    //           onClick={onMutate}
    //         >
    //           Rent
    //         </button>
    //       </div>

    //       <label className='formLabel'>Name</label>
    //       <input
    //         className='formInputName'
    //         type='text'
    //         id='name'
    //         value={name}
    //         onChange={onMutate}
    //         maxLength='32'
    //         minLength='10'
    //         required
    //       />

    //       <div className='formRooms flex'>
    //         <div>
    //           <label className='formLabel'>Bedrooms</label>
    //           <input
    //             className='formInputSmall'
    //             type='number'
    //             id='bedrooms'
    //             value={bedrooms}
    //             onChange={onMutate}
    //             min='1'
    //             max='50'
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className='formLabel'>Bathrooms</label>
    //           <input
    //             className='formInputSmall'
    //             type='number'
    //             id='bathrooms'
    //             value={bathrooms}
    //             onChange={onMutate}
    //             min='1'
    //             max='50'
    //             required
    //           />
    //         </div>
    //       </div>

    //       <label className='formLabel'>Parking spot</label>
    //       <div className='formButtons'>
    //         <button
    //           className={parking ? 'formButtonActive' : 'formButton'}
    //           type='button'
    //           id='parking'
    //           value={true}
    //           onClick={onMutate}
    //           min='1'
    //           max='50'
    //         >
    //           Yes
    //         </button>
    //         <button
    //           className={
    //             !parking && parking !== null ? 'formButtonActive' : 'formButton'
    //           }
    //           type='button'
    //           id='parking'
    //           value={false}
    //           onClick={onMutate}
    //         >
    //           No
    //         </button>
    //       </div>

    //       <label className='formLabel'>Furnished</label>
    //       <div className='formButtons'>
    //         <button
    //           className={furnished ? 'formButtonActive' : 'formButton'}
    //           type='button'
    //           id='furnished'
    //           value={true}
    //           onClick={onMutate}
    //         >
    //           Yes
    //         </button>
    //         <button
    //           className={
    //             !furnished && furnished !== null
    //               ? 'formButtonActive'
    //               : 'formButton'
    //           }
    //           type='button'
    //           id='furnished'
    //           value={false}
    //           onClick={onMutate}
    //         >
    //           No
    //         </button>
    //       </div>

    //       <label className='formLabel'>Address</label>
    //       <textarea
    //         className='formInputAddress'
    //         type='text'
    //         id='address'
    //         value={address}
    //         onChange={onMutate}
    //         required
    //       />

    //       {!geolocationEnabled && (
    //         <div className='formLatLng flex'>
    //           <div>
    //             <label className='formLabel'>Latitude</label>
    //             <input
    //               className='formInputSmall'
    //               type='number'
    //               id='latitude'
    //               value={latitude}
    //               onChange={onMutate}
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label className='formLabel'>Longitude</label>
    //             <input
    //               className='formInputSmall'
    //               type='number'
    //               id='longitude'
    //               value={longitude}
    //               onChange={onMutate}
    //               required
    //             />
    //           </div>
    //         </div>
    //       )}

    //       <label className='formLabel'>Offer</label>
    //       <div className='formButtons'>
    //         <button
    //           className={offer ? 'formButtonActive' : 'formButton'}
    //           type='button'
    //           id='offer'
    //           value={true}
    //           onClick={onMutate}
    //         >
    //           Yes
    //         </button>
    //         <button
    //           className={
    //             !offer && offer !== null ? 'formButtonActive' : 'formButton'
    //           }
    //           type='button'
    //           id='offer'
    //           value={false}
    //           onClick={onMutate}
    //         >
    //           No
    //         </button>
    //       </div>

    //       <label className='formLabel'>Regular Price</label>
    //       <div className='formPriceDiv'>
    //         <input
    //           className='formInputSmall'
    //           type='number'
    //           id='regularPrice'
    //           value={regularPrice}
    //           onChange={onMutate}
    //           min='50'
    //           max='750000000'
    //           required
    //         />
    //         {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
    //       </div>

    //       {offer && (
    //         <>
    //           <label className='formLabel'>Discounted Price</label>
    //           <input
    //             className='formInputSmall'
    //             type='number'
    //             id='discountedPrice'
    //             value={discountedPrice}
    //             onChange={onMutate}
    //             min='50'
    //             max='750000000'
    //             required={offer}
    //           />
    //         </>
    //       )}

    //       <label className='formLabel'>Images</label>
    //       <p className='imagesInfo'>
    //         The first image will be the cover (max 6).
    //       </p>
    //       <input
    //         className='formInputFile'
    //         type='file'
    //         id='images'
    //         onChange={onMutate}
    //         max='6'
    //         accept='.jpg,.png,.jpeg'
    //         multiple
    //         required
    //       />
    //       <button type='submit' className='primaryButton createListingButton'>
    //         Create Listing
    //       </button>
    //     </form>
    //   </main>
    // </div>
    <>
      <style>
        {`
        .custom-file-upload {
          border: 1px solid #ccc;
          display: inline-block;
          padding: 8px 14px;
          cursor: pointer;
          margin-right:5%
      }
        .row {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
          }
          
          .row .col-2:last-child .input-group-desc {
            margin-bottom: 0;
          }
          
          .row-space {
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -moz-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
          }
          
          .row-refine {
            margin: 0 -15px;
          }
          
          .row-refine .col-3 .input-group-desc,
          .row-refine .col-9 .input-group-desc {
            margin-bottom: 0;
          }
          
          .col-2 {
            width: -webkit-calc((100% - 30px) / 2);
            width: -moz-calc((100% - 30px) / 2);
            width: calc((100% - 30px) / 2);
          }
          
          @media (max-width: 767px) {
            .col-2 {
              width: 100%;
            }
          }
          
          .form-row {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-align: start;
            -webkit-align-items: flex-start;
            -moz-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            padding: 24px 55px;
          }
          
          .form-row .name {
            width: 188px;
            color: #333;
            font-size: 15px;
            font-weight: 700;
            margin-top: 11px;
          }
          
          .form-row .value {
            width: -webkit-calc(100% - 188px);
            width: -moz-calc(100% - 188px);
            width: calc(100% - 188px);
          }
          
          @media (max-width: 767px) {
            .form-row {
              display: block;
              padding: 24px 30px;
            }
            .form-row .name,
            .form-row .value {
              display: block;
              width: 100%;
            }
            .form-row .name {
              margin-top: 0;
              margin-bottom: 12px;
            }
          }
          
          html {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          
          * {
            padding: 0;
            margin: 0;
          }
          
          *,
          *:before,
          *:after {
            -webkit-box-sizing: inherit;
            -moz-box-sizing: inherit;
            box-sizing: inherit;
          }
          
          body,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          blockquote,
          p,
          pre,
          dl,
          dd,
          ol,
          ul,
          figure,
          hr,
          fieldset,
          legend {
            margin: 0;
            padding: 0;
          }
          
          li > ol,
          li > ul {
            margin-bottom: 0;
          }
          
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          
          fieldset {
            min-width: 0;
            /* [1] */
            border: 0;
          }
          
          button {
            outline: none;
            background: none;
            border: none;
          }
          .page-wrapper {
            min-height: 100vh;
            cursor:default
          }
          
          body {
            font-family: "Open Sans", "Arial", "Helvetica Neue", sans-serif;
            font-weight: 400;
            font-size: 14px;
          }
          
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-weight: 400;
          }
          
          h1 {
            font-size: 36px;
          }
          
          h2 {
            font-size: 30px;
          }
          
          h3 {
            font-size: 24px;
          }
          
          h4 {
            font-size: 18px;
          }
          
          h5 {
            font-size: 15px;
          }
          
          h6 {
            font-size: 13px;
          }
          .bg-blue {
            background: #2c6ed5;
          }
          
          .bg-red {
            background: #fa4251;
          }
          
          .bg-dark {
            background: #1a1a1a;
          }
          
          .bg-gra-01 {
            background: -webkit-gradient(
              linear,
              left bottom,
              left top,
              from(#fbc2eb),
              to(#a18cd1)
            );
            background: -webkit-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
            background: -moz-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
            background: -o-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
            background: linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%);
          }
          
          .bg-gra-02 {
            background: -webkit-gradient(
              linear,
              left bottom,
              right top,
              from(#fc2c77),
              to(#6c4079)
            );
            background: -webkit-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
            background: -moz-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
            background: -o-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
            background: linear-gradient(to top right, #fc2c77 0%, #6c4079 100%);
          }
          
          .bg-gra-03 {
            background: -webkit-gradient(
              linear,
              left bottom,
              right top,
              from(#08aeea),
              to(#b721ff)
            );
            background: -webkit-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
            background: -moz-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
            background: -o-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
            background: linear-gradient(to top right, #08aeea 0%, #b721ff 100%);
          }
          .p-t-100 {
            padding-top: 100px;
          }
          
          .p-t-130 {
            padding-top: 130px;
          }
          
          .p-t-180 {
            padding-top: 180px;
          }
          
          .p-t-45 {
            padding-top: 45px;
          }
          
          .p-t-20 {
            padding-top: 20px;
          }
          
          .p-t-15 {
            padding-top: 15px;
          }
          
          .p-t-10 {
            padding-top: 10px;
          }
          
          .p-t-30 {
            padding-top: 30px;
          }
          
          .p-b-100 {
            padding-bottom: 100px;
          }
          
          .p-b-50 {
            padding-bottom: 50px;
          }
          
          .m-r-45 {
            margin-right: 45px;
          }
          
          .m-r-55 {
            margin-right: 55px;
          }
          
          .m-b-55 {
            margin-bottom: 55px;
          }
          .wrapper {
            margin: 0 auto;
          }
          
          .wrapper--w960 {
            max-width: 960px;
          }
          
          .wrapper--w900 {
            max-width: 900px;
          }
          
          .wrapper--w790 {
            max-width: 790px;
          }
          
          .wrapper--w780 {
            max-width: 780px;
          }
          
          .wrapper--w680 {
            max-width: 680px;
          }
          .btn {
            display: inline-block;
            line-height: 50px;
            padding: 0 30px;
            -webkit-transition: all 0.4s ease;
            -o-transition: all 0.4s ease;
            -moz-transition: all 0.4s ease;
            transition: all 0.4s ease;
            cursor: pointer;
            font-size: 15px;
            text-transform: capitalize;
            font-weight: 700;
            color: #fff;
            font-family: inherit;
          }
          
          .btn--radius {
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          
          .btn--radius-2 {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
          
          .btn--pill {
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
          }
          
          .btn--green {
            background: #57b846;
          }
          
          .btn--green:hover {
            background: #4dae3c;
          }
          
          .btn--blue {
            background: #4272d7;
          }
          
          .btn--blue:hover {
            background: #3868cd;
          }
          
          .btn--blue-2 {
            background: #2c6ed5;
          }
          
          .btn--blue-2:hover {
            background: #185ac1;
          }
          
          .btn--red {
            background: #ff4b5a;
          }
          
          .btn--red:hover {
            background: #eb3746;
          }
          
          /* ==========================================================================
             #DATE PICKER
             ========================================================================== */
          td.active {
            background-color: #2c6ed5;
          }
          
          input[type="date" i] {
            padding: 14px;
          }
          
          .table-condensed td,
          .table-condensed th {
            font-size: 14px;
            font-family: "Roboto", "Arial", "Helvetica Neue", sans-serif;
            font-weight: 400;
          }
          
          .daterangepicker td {
            width: 40px;
            height: 30px;
          }
          
          .daterangepicker {
            border: none;
            -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
            -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
            box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
            display: none;
            border: 1px solid #e0e0e0;
            margin-top: 5px;
          }
          
          .daterangepicker::after,
          .daterangepicker::before {
            display: none;
          }
          
          .daterangepicker thead tr th {
            padding: 10px 0;
          }
          
          .daterangepicker .table-condensed th select {
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            font-size: 14px;
            padding: 5px;
            outline: none;
          }
          
          /* ==========================================================================
             #FORM
             ========================================================================== */
          input,
          textarea {
            outline: none;
            margin: 0;
            border: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            width: 100%;
            font-size: 14px;
            font-family: inherit;
          }
          
          textarea {
            resize: none;
          }
          
          .input-group {
            position: relative;
            margin: 0;
            display:flex;
            align-items:center;
          }
          
          .input--style-6,
          .textarea--style-6 {
            background: transparent;
            line-height: 38px;
            border: 1px solid #cccccc;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            color: #666;
            font-size: 15px;
            -webkit-transition: all 0.4s ease;
            -o-transition: all 0.4s ease;
            -moz-transition: all 0.4s ease;
            transition: all 0.4s ease;
            padding: 0 20px;
          }
          
          .input--style-6::-webkit-input-placeholder,
          .textarea--style-6::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #999;
          }
          
          .input--style-6:-moz-placeholder,
          .textarea--style-6:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #999;
            opacity: 1;
          }
          
          .input--style-6::-moz-placeholder,
          .textarea--style-6::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #999;
            opacity: 1;
          }
          
          .input--style-6:-ms-input-placeholder,
          .textarea--style-6:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #999;
          }
          
          .input--style-6:-ms-input-placeholder,
          .textarea--style-6:-ms-input-placeholder {
            /* Microsoft Edge */
            color: #999;
          }
          
          .textarea--style-6 {
            line-height: 1.2;
            min-height: 120px;
            padding: 10px 20px;
          }
          
          .label--desc {
            font-size: 13px;
            color: #999;
            margin-top: 10px;
          }
          
          @media (max-width: 767px) {
            .label--desc {
              margin-top: 14px;
            }
          }
          
          
          .input-file__info {
            font-size: 15px;
            color: #666;
          }
          
          @media (max-width: 767px) {
            .input-file__info {
              display: block;
              margin-top: 6px;
            }
          }
          
          /* ==========================================================================
             #TITLE
             ========================================================================== */
          .title {
            font-size: 36px;
            font-weight: 700;
            text-align: left;
            color: #fff;
            margin-bottom: 24px;
          }
          
          @media (max-width: 767px) {
            .title {
              padding: 0 15px;
            }
          }
          
          /* ==========================================================================
             #CARD
             ========================================================================== */
          .card {
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            background: #fff;
            border:none
          }
          
          .card-6 {
            background: transparent;
          }
          
          .card-6 .card-heading {
            background: transparent;
          }
          
          .card-6 .card-body {
            background: #fff;
            position: relative;
            padding-bottom: 0;
            -webkit-border-top-left-radius: 3px;
            -moz-border-radius-topleft: 3px;
            border-top-left-radius: 3px;
            -webkit-border-top-right-radius: 3px;
            -moz-border-radius-topright: 3px;
            border-top-right-radius: 3px;
          }
          
          .card-6 .card-body:before {
            bottom: 100%;
            left: 75px;
            border: solid transparent;
            content: "";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(255, 255, 255, 0);
            border-width: 10px;
          }
          
          .card-6 .card-footer {
            background: #fff;
            -webkit-border-bottom-left-radius: 3px;
            -moz-border-radius-bottomleft: 3px;
            border-bottom-left-radius: 3px;
            -webkit-border-bottom-right-radius: 3px;
            -moz-border-radius-bottomright: 3px;
            border-bottom-right-radius: 3px;
            padding: 50px 55px;
          }
          
          @media (max-width: 767px) {
            .card-6 .card-footer {
              padding: 50px 30px;
            }
          }
          .formButton{
            background-color:transparent;
            color: #004274!important;
            border: 1px solid #004274;
          }
          .formButtonActive{
            background-color:#004274!important;
            color: whitesmoke!important;
            border: none;
          }
          `}
      </style>
      <div className="page-wrapper p-t-100 p-b-50">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-heading">
              <h2
                className="title"
                style={{ color: "#004274", textAlign: "center" }}
              >
                Create a Listing
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    className={
                      type === "sale"
                        ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                        : "btn btn--radius-2 btn--blue-2 formButton"
                    }
                    type="submit"
                    style={{ margin: "20px" }}
                    id="type"
                    value="sale"
                    onClick={onMutate}
                  >
                    Sell Property
                  </button>
                  OR
                  <button
                    className={
                      type === "rent"
                        ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                        : "btn btn--radius-2 btn--blue-2 formButton"
                    }
                    type="submit"
                    style={{ margin: "20px" }}
                    id="type"
                    value="rent"
                    onClick={onMutate}
                  >
                    Rent Property
                  </button>
                </div>

                <div className="form-row">
                  <div className="name">Property Name</div>
                  <div className="value">
                    <input
                      className="input--style-6"
                      type="text"
                      name="full_name"
                      id="name"
                      value={name}
                      onChange={onMutate}
                      maxLength="32"
                      minLength="10"
                      required
                    />
                  </div>
                </div>
                <div className="form-row" style={{ display: "flex" }}>
                  <div className="name">Bedrooms</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-6"
                        type="number"
                        id="bedrooms"
                        value={bedrooms}
                        onChange={onMutate}
                        min="1"
                        max="50"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Bathrooms</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-6"
                        type="number"
                        id="bathrooms"
                        value={bathrooms}
                        onChange={onMutate}
                        min="1"
                        max="50"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Parking Spot</div>
                  <div className="value">
                    <button
                      className={
                        parking
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="parking"
                      value={true}
                      onClick={onMutate}
                      style={{ marginRight: "5%" }}
                    >
                      Yes
                    </button>
                    <button
                      className={
                        !parking && parking !== null
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="parking"
                      value={false}
                      onClick={onMutate}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Furnished</div>
                  <div className="value">
                    <button
                      className={
                        furnished
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="furnished"
                      value={true}
                      onClick={onMutate}
                      style={{ marginRight: "5%" }}
                    >
                      Yes
                    </button>
                    <button
                      className={
                        !furnished && furnished !== null
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="furnished"
                      value={false}
                      onClick={onMutate}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Address</div>
                  <div className="value">
                    <div className="input-group">
                      <textarea
                        className="textarea--style-6"
                        type="text"
                        id="address"
                        value={address}
                        onChange={onMutate}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Offer</div>
                  <div className="value">
                    <button
                      className={
                        offer
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="offer"
                      value={true}
                      onClick={onMutate}
                      style={{ marginRight: "5%" }}
                    >
                      Yes
                    </button>
                    <button
                      className={
                        !offer && offer !== null
                          ? "btn btn--radius-2 btn--blue-2 formButtonActive"
                          : "btn btn--radius-2 btn--blue-2 formButton"
                      }
                      type="button"
                      id="offer"
                      value={false}
                      onClick={onMutate}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Regular Price</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-6"
                        type="number"
                        id="regularPrice"
                        value={regularPrice}
                        onChange={onMutate}
                        min="50"
                        max="750000000"
                        required
                      />
                      {type === "rent" && (
                        <p className="formPriceText">
                          <b>$ / Month</b>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {offer && (
                  <div className="form-row">
                    <div className="name">Discounted Price</div>
                    <div className="value">
                      <div className="input-group">
                        <input
                          className="input--style-6"
                          type="number"
                          id="discountedPrice"
                          value={discountedPrice}
                          onChange={onMutate}
                          min="50"
                          max="750000000"
                          required
                        />
                        {type === "rent" && (
                          <p className="formPriceText">
                            <b>$ / Month</b>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-row">
                  <div className="name">Property Images</div>
                  <div className="value">
                    <div className="input-group js-input-file">
                      {/* <label class="custom-file-upload">Choose Files</label> */}
                      <input
                        type="file"
                        className="formInputFile"
                        id="images"
                        onChange={onMutate}
                        max="6"
                        accept=".jpg,.png,.jpeg"
                        multiple
                        required
                      />
                    </div>
                    <div className="label--desc">
                      The first image will be the cover (max 6).
                    </div>
                  </div>
                </div>
                <div
                  className="card-footer"
                  style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn--radius-2 btn--blue-2"
                    type="submit"
                    style={{ backgroundColor: "#004274" }}
                  >
                    Submit Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateListing;
