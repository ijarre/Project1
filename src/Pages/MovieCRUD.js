import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space, Popconfirm } from "antd";
import { MovieContext } from "../context/MovieContext";

// -FILTER -SORT -SEARCH

const MovieCRUD = () => {
  const [daftarMovie, setDaftarMovie] = useContext(MovieContext);

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    if (daftarMovie.list === null) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-movie")
        .then((res) => {
          setDaftarMovie({
            ...daftarMovie,
            list: res.data.map((el) => {
              return {
                id: el.id,
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
          alert(JSON.stringify(err.response.data));
        });
    }
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },

    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Genre",
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
      title: "Description",
      key: "description",
      dataIndex: "description",
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
      <Table columns={columns} dataSource={daftarMovie.list} />;{console.log(daftarMovie)}
    </>
  );
};

export default MovieCRUD;
