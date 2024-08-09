import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style1 = {
  backgroundColor: "orange",
  padding: "4px",
  borderRadius: "50%",
  position: "absolute",
  marginTop: "4.5rem",
  marginLeft: "-1.5rem",
  color: "#f4f4f4",
  cursor: "pointer",
};

const styleThree = {
  backgroundColor: "orange",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
  textTransform: "none",
};

const style4 = {
  width: "100px",
  height: "100px",
  borderRadius: "100%",
};

function Profile(id) {
  const [propic, serPropic] = useState(true);
  const userid = useParams();
  const [userDataValue, setUserDataValue] = useState({});
  const [updateRes, setUpdateRes] = useState();
  const [snackOpen, snackClose] = useState(false);
  const [render, setRender] = useState(0);
  // console.log(userDataValue);

  // edit form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [district, setDistrict] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  //

  // snackbar
  const SnackClose = () => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    snackClose(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={SnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //

  // password rest modal
  const [passOpen, SetPassOpen] = useState(false);
  const HandlePassOpen = () => SetPassOpen(true);
  const HandlePassClose = () => SetPassOpen(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const PasswordResetHandle = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .patch(
          `https://moto-hire-backend.onrender.com/api/user/passwordreset/${userid.id}`,
          { password }
        )
        .then((res) => {
          console.log(res.data.message);
          setUpdateRes(res.data.message);
          snackClose(true);
        });
      setRender(render + 1);
      SetPassOpen(false);
    } else {
      snackClose(true);
      setUpdateRes("Password Not Matching");
      console.log("Password Not Matching");
    }
  };

  //

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const userData = () => {
    try {
      axios
        .get(
          `https://moto-hire-backend.onrender.com/api/user/getprofileuserdata/${userid.id}`
        )
        .then((res) => {
          setUserDataValue(res.data.user);
          // console.log(res.data);
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setPhone(res.data.user.phone);
          setGender(res.data.user.gender);
          setDistrict(res.data.user.district);
          setAge(res.data.user.age);
          setAddress(res.data.user.address);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const userDataSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email ,phone , gender , district , age ,address);

    try {
      axios
        .patch(
          `https://moto-hire-backend.onrender.com/api/user/userupdate/${userid.id}`,
          {
            name,
            email,
            phone,
            gender,
            district,
            age,
            address,
          }
        )
        .then((res) => {
          // console.log(res.data.message);
          setUpdateRes(res.data.message);
          snackClose(true);
        });
      setRender(render + 1);
      setOpen(false);
    } catch (error) {
      snackClose(false);
      console.log("Error occured while data updating", error);
    }
  };

  useEffect(() => {
    userData();
  }, [render]);

  return (
    <div>
      <br />
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={snackClose}
        message={updateRes}
        action={action}
      />
      <Grid container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Card
            style={{
              position: "relative",
              marginBottom: "2rem",
              width: "auto",
              height: "auto",
              borderRadius: "5px",
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              padding: "30px",
              justify: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent className="d-flex">
              <div>
                {userDataValue.gender === "Male" ? (
                  <Stack>
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src="https://i.pngimg.me/thumb/f/720/1d714a7743.jpg"
                    />
                  </Stack>
                ) : (
                  <Stack>
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src="https://i.pngimg.me/thumb/f/720/2c1660d631.jpg"
                    />
                  </Stack>
                )}
              </div>
              <div style={{ marginLeft: "2rem", marginTop: "2rem" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    fontSize: "14px",
                    marginTop: "-7px",
                    color: "#858585",
                  }}
                >
                  {userDataValue.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    fontSize: "14px",
                    marginTop: "-7px",
                    color: "#858585",
                  }}
                >
                  {userDataValue.email}
                </Typography>
              </div>
            </CardContent>
            <Box>
              <Grid container spacing={1}>
              <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                  <Typography margin="auto">
                    Address: {userDataValue.address}
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                  <Typography margin="auto">
                    Phone: {userDataValue.phone}
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                  <Typography margin="auto">
                    Age: {userDataValue.age}
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                  <Typography margin="auto">
                    Gender: {userDataValue.gender}
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                  <Typography margin="auto">
                    District: {userDataValue.district}
                  </Typography>
                </Grid>
                
              </Grid>
            </Box>
            <Grid container sx={{ justifyContent: "end", display: "flex" }}>
              <Grid item>
                <Box marginTop={4}>
                  {/* <Button
                    variant="contained"
                    sx={{ width: 200, height: 50 }}
                    onClick={handleOpen}
                  >
                    Edit
                  </Button> */}
                  <button
                    className="header__btn btn text-white"
                    onClick={handleOpen}
                  >
                    <i class="ri-edit-line"></i> Edit
                  </button>
                </Box>
              </Grid>
              <Grid item>
                <Box marginTop={4} marginLeft={2}>
                  {/* <Button
                    variant="contained"
                    sx={{ width: 200, height: 50 }}
                    onClick={HandlePassOpen}
                  >
                    Reset Password
                  </Button> */}
                  <button
                    className="header__btn btn text-white"
                    onClick={HandlePassOpen}
                  >
                    <i class="ri-key-2-line"></i> Reset Password
                  </button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Profile
              </Typography>
              <form onSubmit={userDataSubmit}>
                <Container>
                  <Grid container mt={5}>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"  /> */}
                      <TextField
                        label="Name"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ width: "90%" }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      <TextField
                        label="Email"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: "90%" }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      <TextField
                        label="Phone"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ width: "90%" }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      {/* <TextField
                        label="District"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        sx={{ width: "90%" }}
                      /> */}
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel htmlFor="demo-customized-select-native">
                          District
                        </InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          label="district"
                        >
                          <option aria-label="None" value="" />
                          <option>Kottayam</option>
                          <option>Ernakulam</option>
                          <option>Kozhikode</option>
                          <option>Idukki</option>
                          <option>Malappuram</option>
                          <option>kannur</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      {/* <TextField
                        label="Gender"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        sx={{ width: "90%" }}
                      /> */}
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel htmlFor="demo-customized-select-native">
                          Gender
                        </InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          label="gender"
                        >
                          <option aria-label="None" value="" />
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      <TextField
                        label="Address"
                        placeholder="Enter Name"
                        type="text"
                        name="brand"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        sx={{ width: "90%" }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      {/* <TextField
                        label="Age"
                        placeholder="Enter Age"
                        type="number"
                        name="brand"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{ width: "90%" }}
                      /> */}
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel htmlFor="demo-customized-select-native">
                          Age
                        </InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          label="Age"
                        >
                          <option aria-label="None" value="" />
                          <option>18</option>
                          <option>19</option>
                          <option>20</option>
                          <option>21</option>
                          <option>22</option>
                          <option>23</option>
                          <option>24</option>
                          <option>25</option>
                          <option>26</option>
                          <option>27</option>
                          <option>28</option>
                          <option>29</option>
                          <option>30</option>
                          <option>31</option>
                          <option>32</option>
                          <option>33</option>
                          <option>34</option>
                          <option>35</option>
                          <option>36</option>
                          <option>37</option>
                          <option>38</option>
                          <option>39</option>
                          <option>40</option>
                          <option>41</option>
                          <option>42</option>
                          <option>43</option>
                          <option>44</option>
                          <option>45</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="header__btn btn text-white"
                        type="submit"
                        style={{ height: "50px" }}
                      >
                        Submit
                      </button>
                    </Box>
                  </Grid>
                </Container>
              </form>
            </Box>
          </Modal>
        </Grid>
      </Grid>

      {/* password reset modal */}
      <Grid container>
        <Grid item xs={12}>
          <Modal
            open={passOpen}
            onClose={HandlePassClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Reset Your Password
              </Typography>
              <form onSubmit={PasswordResetHandle}>
                <Container>
                  <Grid container mt={5}>
                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      <TextField
                        label="Password"
                        placeholder="Enter Password"
                        type="password"
                        name="brand"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: "90%" }}
                      />
                    </Grid>

                    <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
                      <TextField
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        name="brand"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ width: "90%" }}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="header__btn btn text-white"
                      type="submit"
                      style={{ height: "40px" }}
                    >
                      Reset
                    </button>
                  </Box>
                </Container>
              </form>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      {/*  */}
    </div>
  );
}

export default Profile;
