import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddCarousel } from "../Components/HomePage/AddCarousel";
import { PopularEvents } from "../Components/HomePage/PopularEvents";
import { PremierEvents } from "../Components/HomePage/PremierEvents";
import { RecommendedEvents } from "../Components/HomePage/RecommendedEvents";
import { getEvents, getPopularEvents } from "../Redux/app/actions";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    height: "auto",
    width: "300px",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
  },
}));

export const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getPopularEvents());
  }, [dispatch]); // Fixed useEffect dependency warning

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const feedback_submit = async () => {
    let name = document.getElementById("name").value;
    let feed = document.getElementById("feed").value;

    try {
      await fetch("http://chomspro.herokuapp.com/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, feed }),
      });
      alert("Thank you for your feedback!");
      handleClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#16161D", minHeight: "100vh" }}>
      <AddCarousel />

      <button
        style={{
          cursor: "pointer",
          margin: "20px",
          height: 90,
          width: 90,
          fontSize: 24,
          color: "white",
          backgroundColor: "#f84464",
          borderRadius: "50%",
          border: "5px solid greenyellow",
          outline: "none",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={handleOpen}
      >
        Rate Us
      </button>

      <PremierEvents />
      <RecommendedEvents />
      <PopularEvents />

      {/* Modal for Feedback Form */}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3><b>How would you rate the website?</b></h3>

            <TextField 
              label="Name" 
              id="name" 
              name="name" 
              placeholder="Your name" 
              fullWidth 
              margin="normal"
            />
            <TextField 
              label="Feedback" 
              id="feed" 
              name="feed" 
              placeholder="Your feedback" 
              fullWidth 
              margin="normal" 
              multiline 
              rows={4} 
            />

            <button
              onClick={feedback_submit}
              style={{
                width: "100%",
                marginTop: "20px",
                height: 50,
                fontSize: 18,
                color: "white",
                backgroundColor: "#f84464",
                borderRadius: 10,
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Submit Rating
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
