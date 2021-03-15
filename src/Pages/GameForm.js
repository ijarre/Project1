import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GameContext } from "../context/GameContext";
import { UserContext } from "../context/UserContext";

const GameForm = () => {
  const [daftarGame, setDaftarGame] = useContext(GameContext);
  const [input, setInput] = useState({ name: "", genre: 0, release: 0, platform: 0, singlePlayer: null, multiplayer: null, image_url: "" });
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (daftarGame.statusForm === "changeToEdit") {
      axios.get("https://backendexample.sanbersy.com/api/data-game").then((res) => {
        let dataGame = res.data;
        setInput({
          name: dataGame.name,
          genre: dataGame.genre,
          release: dataGame.release,
          platform: dataGame.platform,
          singlePlayer: dataGame.singlePlayer,
          multiplayer: dataGame.multiplayer,
          image_url: dataGame.image_url,
        });
      });
    }
  }, [daftarGame, setDaftarGame]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "name": {
        setInput({ ...input, name: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "release": {
        setInput({ ...input, release: event.target.value });
        break;
      }
      case "platform": {
        setInput({ ...input, platform: event.target.value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: event.target.value });
        break;
      }
      case "multiplayer": {
        setInput({ ...input, multiplayer: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
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

    if (daftarGame.statusForm === "create") {
      axios
        .post(
          `https://backendexample.sanbersy.com/api/data-movie`,
          { name: input.name, genre: input.genre, release: input.release, platform: input.platform, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, image_url: input.image_url },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          setDaftarGame({
            statusForm: "create",
            selectedId: 0,
            list: [
              ...daftarGame.list,
              { id: res.data.id, name: input.name, genre: input.genre, release: input.release, platform: input.platform, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, image_url: input.image_url },
            ],
          });
        })
        .catch((err) => console.log(err));
    } else if (daftarGame.statusForm === "edit") {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${daftarGame.selectedId}`,
          {
            name: input.name,
            genre: input.genre,
            release: input.release,
            platform: input.platform,
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            image_url: input.image_url,
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then(() => {
          let dataGame = daftarGame.list.find((el) => el.id === daftarGame.selectedId);
          dataGame.name = input.name;
          dataGame.genre = input.genre;
          dataGame.release = input.release;
          dataGame.platform = input.platform;
          dataGame.singlePlayer = input.singlePlayer;
          dataGame.multiplayer = input.multiplayer;
          dataGame.image_url = input.image_url;

          setDaftarGame({ statusForm: "create", selectedId: 0, lists: [...daftarGame.list] });
        });
    }

    setInput({ name: "", genre: 0, release: 0, platform: 0, genre: "", image_url: "" });
  };
  return (
    <>
      <h1>Game Form</h1>

      <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
        <div style={{ border: "1px solid #aaa", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ float: "left" }}>Title:</label>
            <input style={{ float: "right" }} type="text" name="name" value={input.name} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Year:</label>
            <input style={{ float: "right" }} type="number" name="genre" value={input.genre} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>release</label>
            <input style={{ float: "right" }} type="number" name="release" value={input.release} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Rating</label>
            <input style={{ float: "right" }} type="number" name="platform" pattern="[0-9]{1}" value={input.platform} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Single Player:</label>
            <input style={{ float: "right" }} type="text" name="singlePlayer" value={input.singlePlayer} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Multi Player:</label>
            <input style={{ float: "right" }} type="text" name="multiplayer" value={input.multiplayer} onChange={handleChange} />
            <br />
            <br />
            <label style={{ float: "left" }}>Image URL:</label>
            <input style={{ float: "right" }} type="text" name="image_url" value={input.image_url} onChange={handleChange} />
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

export default GameForm;
