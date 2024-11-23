// import React, { useState } from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Container from "../components/Container";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../features/user/userSlice";
// import { FiEdit } from "react-icons/fi";
// import { RiLogoutCircleLine } from "react-icons/ri";

// const profileSchema = yup.object({
//   firstname: yup.string().required("First Name is Required."),
//   lastname: yup.string().required("Last Name is Required."),
//   email: yup
//     .string()
//     .required("Email Address is Required.")
//     .email("Email Should be valid"),
//   mobile: yup.string().required("Mobile No is Required."),
// });

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.auth.user);
//   const [edit, setEdit] = useState(true);
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       firstname: userState?.firstname,
//       lastname: userState?.lastname,
//       email: userState?.email,
//       mobile: userState?.mobile,
//     },
//     validationSchema: profileSchema,
//     onSubmit: (values) => {
//       dispatch(updateProfile(values));
//       setEdit(true);
//     },
//   });

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login"; // or whatever path you want to redirect to
//   };

//   return (
//     <>
//       <BreadCrumb title="My Order" />
//       <Container class1="main-product-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <div className="d-flex justify-content-between align-items-center">
//               <h3 className="my-3">Update Profile</h3>
//               <div>
//                 <FiEdit
//                   className="fs-3 ms-4"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setEdit(false)}
//                 />
//                 <button
//                   onClick={handleLogout}
//                   className="border border-0 bg-transparent text-dark text-uppercase ms-4"
//                   type="button"
//                 >
//                   <RiLogoutCircleLine
//                     className="fs-3"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={formik.handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="example1" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstname"
//                   disabled={edit}
//                   className="form-control"
//                   id="example1"
//                   value={formik.values.firstname}
//                   onChange={formik.handleChange("firstname")}
//                   onBlur={formik.handleBlur("firstname")}
//                 />
//                 <div className="error-message">
//                   {formik.touched.firstname && formik.errors.firstname}
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="example2" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastname"
//                   disabled={edit}
//                   className="form-control"
//                   id="example2"
//                   value={formik.values.lastname}
//                   onChange={formik.handleChange("lastname")}
//                   onBlur={formik.handleBlur("lastname")}
//                 />
//                 <div className="error-message">
//                   {formik.touched.lastname && formik.errors.lastname}
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="exampleInputEmail1" className="form-label">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   disabled={edit}
//                   className="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   value={formik.values.email}
//                   onChange={formik.handleChange("email")}
//                   onBlur={formik.handleBlur("email")}
//                 />
//                 <div className="error-message">
//                   {formik.touched.email && formik.errors.email}
//                 </div>
//                 <div id="emailHelp" className="form-text">
//                   We'll never share your email with anyone else.
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="exampleInputEmail2" className="form-label">
//                   Mobile No
//                 </label>
//                 <input
//                   type="name"
//                   name="mobile"
//                   disabled={edit}
//                   className="form-control"
//                   id="exampleInputEmail2"
//                   aria-describedby="emailHelp"
//                   value={formik.values.mobile}
//                   onChange={formik.handleChange("mobile")}
//                   onBlur={formik.handleBlur("mobile")}
//                 />
//                 <div className="error-message">
//                   {formik.touched.mobile && formik.errors.mobile}
//                 </div>
//                 <div id="emailHelp" className="form-text">
//                   We'll never share your mobile number with anyone else.
//                 </div>
//               </div>

//               {edit === false && (
//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Profile;


import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit, FiUpload } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Card, CardHeader, CardTitle, CardContent, Button, Avatar } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/forms";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required."),
  lastname: yup.string().required("Last Name is Required."),
  email: yup.string().required("Email Address is Required.").email("Email Should be valid"),
  mobile: yup.string().required("Mobile No is Required."),
});

const UserProfile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);
  const [profilePicture, setProfilePicture] = useState(userState?.profilePicture || "/api/placeholder/200/200");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile({ ...values, profilePicture }));
      setEdit(false);
    },
  });

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfilePicture(imageUrl);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <div>
          <FiEdit
            className="fs-3 ms-4"
            style={{ cursor: "pointer" }}
            onClick={() => setEdit(true)}
          />
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-dark text-uppercase ms-4"
          >
            <RiLogoutCircleLine className="fs-3" style={{ cursor: "pointer" }} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <Avatar
            src={profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full cursor-pointer"
            onClick={() => document.getElementById('profilePictureInput').click()}
          />
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              type="text"
              name="firstname"
              disabled={!edit}
              id="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
            />
            <div className="error-message">
              {formik.touched.firstname && formik.errors.firstname}
            </div>
          </div>
          {/* Rest of the form fields remain the same */}
          {edit && (
            <Button type="submit" variant="primary">
              Save
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;