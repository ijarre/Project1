import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space, Popconfirm } from "antd";
import { GameContext } from "../context/GameContext";

// -FILTER -SORT -SEARCH

const GameCRUD = () => {
  const [daftarGame, setDaftarGame] = useContext(GameContext);

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    if (daftarGame.list === null) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-game")
        .then((res) => {
          setDaftarGame({
            ...daftarGame,
            list: res.data.map((el) => {
              return {
                id: el.id,
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
          alert(JSON.stringify(err.response.data));
        });
    }
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Release",
      dataIndex: "release",
      key: "release",
      sorter: (a, b) => a.release - b.release,
    },

    {
      title: "Platforn",
      key: "platform",
      dataIndex: "platform",
      sorter: (a, b) => a.platform - b.platform,
    },
    {
      title: "Gameplay",
      key: "genre",
      dataIndex: "genre",
    },
    {
      title: "Image URL",
      key: "image_url",
      dataIndex: "image_url",
      ellipsis: true,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = (e) => {
    console.log(e);
  };

  return (
    <>
      <Table columns={columns} dataSource={daftarGame.list} />;
    </>
  );
};

export default GameCRUD;
