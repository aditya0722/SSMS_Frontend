import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import { PhotoCamera, Email, Person, CalendarToday, Phone, Home } from '@mui/icons-material';

const UserForm = ({ open, handleClose, handleSubmit, initialData }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    dob: '',
    contact: '',
    joiningDate: '',
    role: 'Member',
    userType: 'user',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("data",initialData)
    if (initialData) {
      setUser(initialData);
      if (initialData.image) {
        setPreview(URL.createObjectURL(initialData.image));
      }
    }
    else{
      setUser({
        name: '',
        email: '',
        address: '',
        dob: '',
        contact: '',
        joiningDate: '',
        role: 'Member',
        userType: 'user',
        image: null
      })
    }
  

  }, [initialData,open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = user.name ? "" : "Name is required.";
    tempErrors.email = /.+@.+\.[A-Za-z]+$/.test(user.email) ? "" : "Email is not valid.";
    tempErrors.contact = user.contact ? "" : "Contact is required.";
    tempErrors.dob = user.dob ? "" : "Date of Birth is required.";
    tempErrors.joiningDate = user.joiningDate ? "" : "Joining Date is required.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const handleFormSubmit = () => {
    if (validate()) {
      handleSubmit(user);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <div className="flex items-center justify-evenly mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            {preview ? (
              <img src={preview} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Image
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </div>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={user.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={user.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="number"
            fullWidth
            value={user.contact}
            onChange={handleChange}
            error={!!errors.contact}
            helperText={errors.contact}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={user.address}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            value={user.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="joiningDate"
            label="Joining Date"
            type="date"
            fullWidth
            value={user.joiningDate}
            onChange={handleChange}
            error={!!errors.joiningDate}
            helperText={errors.joiningDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <FormControl fullWidth margin="dense">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <MenuItem value="President">President</MenuItem>
            <MenuItem value="Vice President">Vice President</MenuItem>
            <MenuItem value="Secretary">Secretary</MenuItem>
            <MenuItem value="Vice Secretary">Vice Secretary</MenuItem>
            <MenuItem value="Treasurer">Treasurer</MenuItem>
            <MenuItem value="Vice Treasurer">Vice Treasurer</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>User Type</InputLabel>
          <Select
            name="userType"
            value={user.userType}
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleFormSubmit} color="primary">{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
