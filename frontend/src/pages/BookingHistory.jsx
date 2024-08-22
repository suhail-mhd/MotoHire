import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
  p: 4,
  tab: {
		color: '#f4f4f4'
	},
};

function BookingHistory() {
  const [completedTrips, SetCompletedTrips] = useState([]);
  const [cancelledTrip, setCancelledTrip] = useState([]);
  const [PageRender, setPageRender] = useState(false);
  const [DeleteCarId, setDeleteCarId] = useState();
  //modal
  const [open, setOpen] = React.useState(false);
  const handleClosemodal = () => setOpen(false);
  const [cancelId, setCancelId] = useState();
  //

  const [state, setState] = useState(false);
  const [snack, setSnack] = useState("");
  const [render, setRender] = useState(false);
  const handleClose = () => {
    setState(false);
  };

  // tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //

  const [history, SetHistory] = useState([]);
  // console.log(history);

  const user = localStorage.getItem("userInfo");
  const userId = JSON.parse(user);
  const USERID = userId._id;

  // console.log(USERID);

  const getBookingData = () => {
    axios
      .post("https://moto-hire-backend.onrender.com/api/user/bookingdata", {
        userId: USERID,
      })
      .then((res) => {
        // console.log(res);
        SetHistory(res.data.bookingData);
      });
  };

  const CompletedHistory = () => {
    axios
      .post("https://moto-hire-backend.onrender.com/api/user/completedTrips", {
        userId: USERID,
      })
      .then((res) => {
        // console.log(res);
        SetCompletedTrips(res.data.bookingData);
      });
  };

  const CancelledTrips = () => {
    axios
      .post("https://moto-hire-backend.onrender.com/api/user/cancelledTrips", {
        userId: USERID,
        CardId: DeleteCarId,
      })
      .then((res) => {
        // console.log(res);
        setCancelledTrip(res.data.bookingData);
      });
  };

  const cancelhandler = (id, id2) => {
    // console.log(id ,id2);
    setDeleteCarId(id2);
    setCancelId(id);
    setOpen(true);
  };

  const handleCancel = (id) => {
    // console.log(id);

    axios
      .post(
        `https://moto-hire-backend.onrender.com/api/user/cancel/${cancelId}`
      )
      .then((res) => {
        // console.log(res.data.Message);
        setState(true);
        setSnack(res.data.Message);
      });
    setOpen(false);
    setRender(true);
  };

  useEffect(() => {
    getBookingData();
    CompletedHistory();
    CancelledTrips();
    setPageRender(true);
  }, [render, PageRender]);

  return (
    <div style={{ zIndex: 30, position: "relative" }}>
      <Modal
        open={open}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            textAlign="center"
            component="h2"
          >
            Are you sure want to cancel
          </Typography>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Button onClick={handleCancel}>Yes</Button>
            <Button onClick={() => setOpen(false)}>No</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        // anchorOrigin={{ vertical, horizontal }}
        open={state}
        onClose={handleClose}
        message={snack}
        // key={vertical + horizontal}
      />
      <br />
      <br />
      <br />
      <br />

      {/* <Container>
     
              
          </Container> */}

      <Box sx={{ width: "100%", typography: "body1" }} marginBottom={10}>
        <Typography
          variant="h4"
          component="h6"
          textAlign="center"
          fontFamily="egoe UI"
          style={{ fontWeight: "bold" }}
        >
          Booking History
        </Typography>
        <TabContext value={value} >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#34e89e', // Selected tab underline color
                },
              }}
            >
              <Tab label="Pending" value="1" sx={{ color: '#f4f4f4', '&.Mui-selected': { color: '#34e89e' } }}/>
              <Tab label="Completed" value="2" sx={{ color: '#f4f4f4', '&.Mui-selected': { color: '#34e89e' } }}/>
              <Tab label="Cancelled" value="3" sx={{ color: '#f4f4f4', '&.Mui-selected': { color: '#34e89e' } }}/>
            </TabList>
          </Box>
          <TabPanel value="1">
            {history != 0 ? (
              <Box>
                <Typography
                  variant="h4"
                  component="h6"
                  style={{ fontWeight: "bold" }}
                >
                  Pending Trips
                </Typography>
                <br />
                <br />

                <Grid container spacing={2}>
                  {history.map((obj, index) => {
                    return (
                      <Grid
                        item
                        sm={12}
                        xs={12}
                        md={4}
                        lg={3}
                        xl={3}
                        key={index}
                      >
                        <Card
                          sx={{ minWidth: 275 }}
                          style={{
                            borderRadius: 25,
                            background: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                            backdropFilter: "blur(18px)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            color: "#858585",
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              Car : {obj.carname}
                            </Typography>
                            <br />
                            <Typography>
                              Trip Start : {obj.startDate}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                              Trip End : {obj.endDate}
                            </Typography>
                            <Typography variant="body2">
                              Total Rent : {obj.PayedAmount}
                            </Typography>
                          </CardContent>
                          <CardActions className="d-flex align-items-center justify-content-end">
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                cancelhandler(`${obj._id}`, `${obj.carId}`)
                              }
                            >
                              Cancel Booking <CancelIcon />{" "}
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ) : (
              <Typography
                variant="h4"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                No Pending Trips
              </Typography>
            )}
          </TabPanel>
          <TabPanel value="2">
            {completedTrips != 0 ? (
              <Box>
                <Typography
                  variant="h4"
                  component="h6"
                  style={{ fontWeight: "bold" }}
                >
                  Completed Trips
                </Typography>
                <br />
                <br />
                <Grid container spacing={2}>
                  {completedTrips.map((obj, index) => {
                    return (
                      <Grid
                        item
                        sm={12}
                        xs={12}
                        md={4}
                        lg={3}
                        xl={3}
                        key={index}
                      >
                        <Card
                          sx={{ minWidth: 275 }}
                          style={{
                            borderRadius: 25,
                            background: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                            backdropFilter: "blur(18px)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            color: "#858585",
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              Car : {obj.carname}
                            </Typography>
                            <br />
                            <Typography>
                              Trip Start : {obj.startDate}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                              Trip End : {obj.endDate}
                            </Typography>
                            <Typography variant="body2">
                              Total Rent : {obj.PayedAmount}
                            </Typography>
                          </CardContent>
                          <CardActions className="d-flex align-items-center justify-content-end">
                            <Typography
                              variant="subtitle2"
                              color="#8bc34a"
                              component="div"
                            >
                              Completed
                            </Typography>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ) : (
              <Typography
                variant="h4"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                No Completed Trips
              </Typography>
            )}
          </TabPanel>

          <TabPanel value="3">
            {cancelledTrip != 0 ? (
              <Box>
                <Typography variant="h4" component="h6">
                  Cancelled Trips
                </Typography>
                <br />
                <br />
                <Grid container spacing={2}>
                  {cancelledTrip.map((obj, index) => {
                    return (
                      <Grid
                        item
                        sm={12}
                        xs={12}
                        md={4}
                        lg={3}
                        xl={3}
                        key={index}
                      >
                        <Card
                          sx={{ minWidth: 275 }}
                          style={{
                            borderRadius: 25,
                            background: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                            backdropFilter: "blur(18px)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            color: "#858585",
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              Car : {obj.carname}
                            </Typography>
                            <br />
                            <Typography>
                              Trip Start : {obj.startDate}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                              Trip End : {obj.endDate}
                            </Typography>
                            <Typography variant="body2">
                              Total Rent : {obj.PayedAmount}
                            </Typography>
                          </CardContent>
                          <CardActions className="d-flex align-items-center justify-content-end">
                            <Typography
                              variant="subtitle2"
                              color="error"
                              component="div"
                              
                            >
                              Cancelled
                            </Typography>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ) : (
              <Typography
                variant="h4"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                No cancelled Trips
              </Typography>
            )}
          </TabPanel>
        </TabContext>

        <div className=" d-flex align-items-center justify-content-center ">
          <button className="header__btn btn">
            <Link to="/home">
              <i class="ri-arrow-go-back-line"></i> Back to Home
            </Link>
          </button>
        </div>
      </Box>
    </div>
  );
}

export default BookingHistory;
