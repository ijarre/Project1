import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

const MovieForm = () => {
  const [daftarMovie, setDaftarMovie] = useContext(MovieContext);
  const [input, setInput] = useState({ title: "", year: 0, duration: 0, rating: 0, genre: "", image_url: "", description: "" });
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (daftarMovie.statusForm === "changeToEdit") {
      axios.get("https://backendexample.sanbersy.com/api/data-movie").then((res) => {
        let dataMovie = res.data;
        setInput({
          title: dataMovie.title,
          year: dataMovie.year,
          duration: dataMovie.duration,
          rating: dataMovie.rating,
          genre: dataMovie.genre,
          image_url: dataMovie.image_url,
          description: dataMovie.description,
        });
      });
    }
  }, [daftarMovie, setDaftarMovie]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubmit = (event) => {
    // menahan submit
    event.preventDefault();

    if (daftarMovie.statusForm === "create") {
      axios
        .post(
          `https://backendexample.sanbersy.com/api/data-movie`,
          { title: input.title, year: input.year, duration: input.duration, rating: input.rating, genre: input.genre, image_url: input.image_url, description: input.description },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          setDaftarMovie({
            statusForm: "create",
            selectedId: 0,
            list: [...daftarMovie.list, { id: res.data.id, title: input.title, year: input.year, duration: input.duration, rating: input.rating, genre: input.genre, image_url: input.image_url, description: input.description }],
          });
        })
        .catch((err) => console.log(err));
    } else if (daftarMovie.statusForm === "edit") {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${daftarMovie.selectedId}`,
          {
            title: input.title,
            year: input.year,
            duration: input.duration,
            rating: input.rating,
            genre: input.genre,
            image_url: input.image_url,
            description: input.description,
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then(() => {
          let dataMovie = daftarMovie.list.find((el) => el.id === daftarMovie.selectedId);
          dataMovie.title = input.title;
          dataMovie.year = input.year;
          dataMovie.duration = input.duration;
          dataMovie.rating = input.rating;
          dataMovie.genre = input.genre;
          dataMovie.image_url = input.image_url;
          dataMovie.description = input.description;

          setDaftarMovie({ statusForm: "create", selectedId: 0, lists: [...daftarMovie.list] });
        });
    }

    setInput({ title: "", year: 0, duration: 0, rating: 0, genre: "", image_url: "", description: "" });
  };
  return (
    <>
      <h1>Form Movie</h1>

      <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
        <div style={{ border: "1px solid #aaa", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ float: "left" }}>Title:</label>
            <input style={{ float: "right" }} type="text" name="title" value={input.title} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Year:</label>
            <input style={{ float: "right" }} type="number" name="year" value={input.year} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Duration</label>
            <input style={{ float: "right" }} type="number" name="duration" value={input.duration} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Rating</label>
            <input style={{ float: "right" }} type="number" name="rating" pattern="[0-9]{1}" value={input.rating} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Genre:</label>
            <input style={{ float: "right" }} type="text" name="genre" value={input.genre} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Image URL:</label>
            <input style={{ float: "right" }} type="text" name="image_url" value={input.image_url} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Description:</label>
            <input style={{ float: "right" }} type="text" name="description" value={input.description} onChange={handleChange} />
            <br />
            <br />

            <div style={{ width: "100%", paddingBottom: "20px" }}>
              <button style={{ float: "right" }}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MovieForm;
