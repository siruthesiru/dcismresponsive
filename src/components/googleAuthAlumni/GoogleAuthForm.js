// import React, { useState } from 'react';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';

// function GoogleAuthForm({ handleGoogleAuth }) {
//   const [selectedRole, setSelectedRole] = useState(''); // Initialize with an empty string

//   const handleChange = (event) => {
//     setSelectedRole(event.target.value);
//   };
//   // console.log(selectedRole);
//   return (
//     <div>
//       <FormControl fullWidth>
//         <InputLabel>Select your role</InputLabel>
//         <Select
//           value={selectedRole}
//           onChange={handleChange}
//         >
//           <MenuItem value="ALUMNI">Alumni</MenuItem>
//           <MenuItem value="COMPANY">Company</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => {
//           console.log("Clicked 'Continue' button");
//           console.log("Selected Role:", selectedRole);
//           handleGoogleAuth(selectedRole);
//         }}
//       >
//         Continue
//       </Button>

//     </div>
    
//   );
  
// }

// export default GoogleAuthForm;