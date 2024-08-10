import { Box, Container, Typography, Grid, Paper, Button, CardMedia } from "@mui/material";
import Helmet from "../components/Helmet/Helmet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate, useParams } from "react-router-dom";
import Coupon from "../components/Coupon/Coupon";
import axios from "axios";
import { Icon } from "@iconify/react";
import Chip from "@mui/material/Chip";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RAZKEYID = "rzp_test_NpEuHqzQeFGBVN";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function BookingPage(id) {
  const navigate = useNavigate();
  const [pay, SetPay] = useState(false);
  const [map, setMap] = useState(false);
  const id2 = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const [pageRender, setPageRender] = useState(false);

  const IDinfo = id2.id;
  // console.log(IDinfo);

  const user = localStorage.getItem("userInfo");
  const userId = JSON.parse(user);
  const USERNAME = userId.name;
  const USERID = userId._id;
  const USEREMAIL = userId.email;
  const USERPHONE = userId.phone;

  // console.log(USEREMAIL);

  // Payment modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //

  const start = useSelector((state) => state.date);
  const end = useSelector((state) => state.endDate);
  const cardata = useSelector((state) => state.car);
  const totalAmount = useSelector((state) => state.Total);
  const discountAmount = useSelector((state) => state.Discount);
  const disAllData = useSelector((state) => state.DisAll);
  const CouponMsg = useSelector((state) => state.msg);

  // console.log(CouponMsg);
  // console.log(discountAmount);

  // console.log(disAllData);

  const couponId = disAllData._id;
  const couponCode = disAllData.CouponCode;
  const carName = cardata.brand;

  // console.log(couponId , couponCode ) ;

  const disAmount = totalAmount - discountAmount;

  const amount = discountAmount ? disAmount : totalAmount;

  // console.log(amount);

  // razorpay

  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load . Are you online?");
      return;
    }

    const data = await axios.post(
      "https://moto-hire-backend.onrender.com/api/user/razorpay"
    );

    // console.log(data);

    // const amount = data.amount

    // console.log(amount);

    const options = {
      key: RAZKEYID,
      currency: data.currency,
      amount: amount * 100,
      order_id: data.id,
      name: "MotoHire Car Booking",
      description: "Your Car has been booked",
      handler: function(response) {
        axios
          .post(
            `https://moto-hire-backend.onrender.com/api/user/razorpaysuccess/${id2.id}`,
            {
              start,
              end,
              USERNAME,
              USERID,
              carName,
              amount,
              USEREMAIL,
              couponId,
              couponCode,
            }
          )
          .then((res) => {
            // console.log(res.data.message);
            navigate("/bookingsuccess");
          });

        // alert("transaction successfull")
      },
      prefill: {
        name: USERNAME,
        email: USEREMAIL,
        phone_number: USERPHONE,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const successPaypalHandle = (paymentResult) => {
    console.log(paymentResult);
    axios
      .post(
        `https://moto-hire-backend.onrender.com/api/user/razorpaysuccess/${id2.id}`,
        {
          start,
          end,
          USERNAME,
          USERID,
          carName,
          amount,
          USEREMAIL,
          couponId,
          couponCode,
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        navigate("/bookingsuccess");
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setPageRender(true);
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        "https://moto-hire-backend.onrender.com/api/user/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `http://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
  }, [pageRender]);

  return (
    <Helmet title="booking">
      <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
        <Container>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Payment Options
              </Typography>
              <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={showRazorpay}
                  sx={{ width: "100%", height: 50 }}
                >
                  {" "}
                  <Icon icon="simple-icons:razorpay" /> Razorpay
                </Button>

                <Box mt={2}>
                  <PayPalScriptProvider>
                    <PayPalButtons
                      amount={amount}
                      onSuccess={successPaypalHandle}
                    />
                  </PayPalScriptProvider>
                </Box>
              </Box>
            </Box>
          </Modal>

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
                <Typography
                  variant="h4"
                  component="h6"
                  fontFamily="Helvetica Neue"
                >
                  Booking Details
                </Typography>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 27,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{color:"#0f3443"}}>
                            {cardata.brand} {cardata.model}
                          </p>
                        </Box>
                      </Grid>
                      <CardMedia
                        component="img"
                        height="140"
                        style={{ height: "auto", objectFit: "contain" }}
                        alt="Image Loaded Failed"
                        image={cardata.imgUrl}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                      
                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{ color: "#858585" }}>Customer:</p>
                          <p>{USERNAME}</p>
                        </Box>
                      </Grid>

                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{ color: "#858585" }}>Trip Start:</p>
                          <p>{start}</p>
                        </Box>
                      </Grid>
                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{ color: "#858585" }}>Trip End:</p>
                          <p>{end}</p>
                        </Box>
                      </Grid>

                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{ color: "#858585" }}>Pickup Location:</p>
                          <p>{cardata.location}</p>
                        </Box>
                      </Grid>

                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            paddingTop: 3,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          <p style={{ color: "#858585" }}>Our HelpLine:</p>
                          <p>+91 9526103163</p>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                      <Box
                        sx={{
                          justifyContent: "end",
                          display: "flex",
                          paddingTop: 2,
                        }}
                      >
                        {CouponMsg ===
                        "You Have already applied this coupon" ? (
                          <Chip
                            sx={{ color: "red" }}
                            label="You Have already applied this coupon"
                          />
                        ) : null}
                        {CouponMsg === "Coupon Applied Successfully" ? (
                          <Chip
                            sx={{ color: "green" }}
                            label="Coupon Applied Successfully"
                          />
                        ) : null}
                      </Box>
                      {discountAmount ? (
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            paddingTop: 2,
                          }}
                        >
                          <Typography
                            variant="p"
                            component="h6"
                            style={{ textDecoration: "line-through" }}
                          >
                            Total Amount: {totalAmount}/-
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            paddingTop: 2,
                          }}
                        >
                          <Typography variant="h5" component="h4">
                            <span style={{ fontWeight: "bold" }}>
                              Total Amount:
                            </span>{" "}
                            {totalAmount}/-
                          </Typography>
                        </Box>
                      )}

                      {discountAmount ? (
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            paddingTop: 2,
                          }}
                        >
                          <Typography variant="p" component="h6">
                            Discount Amount : {discountAmount}/-
                          </Typography>
                        </Box>
                      ) : null}

                      {discountAmount ? (
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            paddingTop: 2,
                          }}
                        >
                          <Typography variant="h5" component="h5">
                            <span style={{ fontWeight: "bold" }}>
                              Offered Amount :
                            </span>{" "}
                            {{ discountAmount } ? disAmount : { totalAmount }}/-
                          </Typography>
                        </Box>
                      ) : null}

                      <Box
                        sx={{
                          justifyContent: "end",
                          display: "flex",
                          paddingTop: 2,
                        }}
                      >
                        <Button onClick={handleOpen}>
                          Proceed To Checkout
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          sx={{ marginLeft: 2 }}
                          onClick={() => SetPay(true)}
                        >
                          Apply Coupon
                        </Button>
                      </Box>
                    </Grid>

                    {pay ? <Coupon pay={pay} SetPay={SetPay} /> : null}
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* <Typography variant="h4" component="h6" fontFamily="Helvetica Neue">
            Booking Details
          </Typography>
          <Box mt={2} height={160}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12} md={6} lg={3} xl={3}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h5" component="h5">
                      Car: {cardata.brand}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item sm={12} xs={12} md={6} lg={3} xl={3}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h5" component="h5">
                      Customer: {USERNAME}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item sm={12} xs={12} md={6} lg={3} xl={3}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h6" component="h5">
                      Trip Start: {start}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item sm={12} xs={12} md={6} lg={3} xl={3}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h6" component="h5">
                      Trip End: {end}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h6 " component="h5" textAlign="center">
                      Pickup Location: {cardata.location}{" "}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                <Paper elevation={3} sx={{ minHeight: 144 }}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: 6,
                    }}
                  >
                    <Typography variant="h6" component="h5">
                      Our HelpLine: +91 9526103163
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                <Box sx={{justifyContent:'end',display:'flex',paddingTop:2}} >
          {CouponMsg === 'You Have already applied this coupon' ? <Chip sx={{color:"red"}} label="You Have already applied this coupon" />  :  null }
          {CouponMsg === 'Coupon Applied Successfully' ?   <Chip sx={{color:"green"}} label="Coupon Applied Successfully" /> : null}
          </Box>
                {discountAmount ? (
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      paddingTop: 2,
                    }}
                  >
                    <Typography
                      variant="p"
                      component="h6"
                      style={{ textDecoration: "line-through" }}
                    >
                      Total Amount:{" "}
                      {totalAmount}/-
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      paddingTop: 2,
                    }}
                  >
                    <Typography variant="h5" component="h4">
                      <span style={{ fontWeight: "bold" }}>Total Amount:</span>{" "}
                      {totalAmount}/-
                    </Typography>
                  </Box>
                )}

                {discountAmount ? (
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      paddingTop: 2,
                    }}
                  >
                    <Typography variant="p" component="h6">
                      Discount Amount : {discountAmount}/-
                    </Typography>
                  </Box>
                ) : null}

                {discountAmount ? (
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      paddingTop: 2,
                    }}
                  >
                    <Typography variant="h5" component="h5">
                     <span style={{ fontWeight: "bold" }}>Offered Amount :</span> {" "}
                      {{ discountAmount } ? disAmount : { totalAmount }}/-
                    </Typography>
                  </Box>
                ) : null}

                <Box
                  sx={{ justifyContent: "end", display: "flex", paddingTop: 2 }}
                >
                  <Button onClick={handleOpen}>Proceed To Checkout</Button>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ marginLeft: 2 }}
                    onClick={() => SetPay(true)}
                  >
                    Apply Coupon
                  </Button>
                </Box>
              </Grid>

              {
        pay ?
        <Coupon pay={pay} SetPay={SetPay} />
        :
        null
      }
            </Grid>
          </Box> */}
        </Container>
      </div>
    </Helmet>
  );
}

export default BookingPage;
