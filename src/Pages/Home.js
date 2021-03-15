import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { GameContext } from "../context/GameContext";
import { Card, Col, Row } from "antd";

function Home() {
  const [daftarMovie, setDaftarMovie] = useContext(MovieContext);
  const [daftarGame, setDaftarGame] = useContext(GameContext);
  const { Meta } = Card;

  useEffect(() => {
    if (daftarMovie.list === null) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-movie")
        .then((res) => {
          setDaftarMovie({
            ...daftarMovie,
            list: res.data.map((el) => {
              return {
                description: el.description,
                duration: el.duration,
                genre: el.genre,
                image_url: el.image_url,
                rating: el.rating,
                review: el.review,
                title: el.title,
                year: el.year,
              };
            }),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (daftarGame.list === null) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-game")
        .then((res) => {
          setDaftarGame({
            ...daftarGame,
            list: res.data.map((el) => {
              return {
                genre: el.genre,
                image_url: el.image_url,
                singlePlayer: el.singlePlayer,
                multiplayer: el.multiplayer,
                name: el.name,
                platform: el.platform,
                release: el.release,
              };
            }),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // console.log(daftarMovie.list, daftarGame);

  return (
    <>
      <h1>Movies</h1>
      <Row>
        {daftarMovie.list !== null &&
          daftarMovie.list.map((item) => {
            return (
              <>
                <Col span={6}>
                  <Card hoverable cover={<img alt="example" src={item.image_url} mode="horizontal" />}>
                    <Meta title={item.title} description={`${item.rating}/10`} />
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
      <br />
      <br />
      <br />
      <br />
      <h1>Games</h1>
      <Row>
        {daftarGame.list !== null &&
          daftarGame.list.map((item) => {
            return (
              <>
                <Col span={6}>
                  <Card hoverable cover={<img alt="example" src={item.image_url} mode="horizontal" />}>
                    <Meta title={item.name} description={`${item.rating}/10`} />
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
    </>
  );
}

export default Home;
