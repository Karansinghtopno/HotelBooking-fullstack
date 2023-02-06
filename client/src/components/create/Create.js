import React, { useState } from "react";
import classes from "./create.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../index";
import { useSelector } from "react-redux";
const Create = () => {
  //defining states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(null);
  const [review, setReview] = useState(null);
  const [typeError, setTypeError] = useState(false);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const changeImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const acceptableTypes = ["apartment", "penthouse", "bungalow", "villa"];
    if (!acceptableTypes.includes(type)) {
      setTypeError(true);
      setTimeout(() => {
        setTypeError(false);
      }, 5000);
      return;
    }
    try {
      const formData = new FormData();
      let filename = null;
      if (img) {
        filename = Date.now() + img.name;
        formData.append("filename", filename);
        formData.append("image", img);

        await fetch(`${endpoint}/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      }

      const res = await fetch(`${endpoint}/room`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          country,
          type,
          photo: filename,
          price,
          review,
        }),
      });
      const newRoom = await res.json();
      navigate(`/typedetail/${newRoom._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Room</h2>
        <form onSubmit={handleCreateRoom} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input
              type="text"
              className={classes.input}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input
              type="text"
              className={classes.input}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Decription..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Country: </label>
            <input
              type="text"
              className={classes.input}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              placeholder="Country..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Type: </label>
            <input
              type="text"
              className={classes.input}
              onChange={(e) => {
                setType(e.target.value);
              }}
              placeholder="Type..."
            />
          </div>
          <div className={classes.inputWrapperImg}>
            <label className={classes.fileInputLabel} htmlFor="img">
              Image: <span>Upload Here</span>
            </label>
            <input
              type="file"
              filename="img"
              id="img"
              onChange={changeImg}
              style={{ display: "none" }}
            />
            {img && (
              <p className={classes.imageName}>
                {img.name}{" "}
                <AiOutlineCloseCircle
                  className={classes.icon}
                  onClick={() => handleCloseImg()}
                />
              </p>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <input
              type="number"
              step={0.01}
              className={classes.input}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Price..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review: </label>
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              className={classes.input}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              placeholder="Review..."
            />
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.submitBtn}>Create Room</button>
          </div>
        </form>
        {typeError && (
          <div className={classes.errorMessage}>
            Wrong type! Acceptable Types are - apartment, villa, penthouse and
            bungalow
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
