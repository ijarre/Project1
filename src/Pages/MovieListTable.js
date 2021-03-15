import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/UserContext";

const DaftarBuahList = () => {
  const [daftarMovie, setDaftarMovie] = useContext(MovieContext);
  const [user] = useContext(UserContext);

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
  }, [setDaftarMovie, daftarMovie]);

  const handleEdit = (event) => {
    let idDataMovie = parseInt(event.target.value);
    setDaftarMovie({ ...daftarMovie, selectedId: idDataMovie, statusForm: "changeToEdit" });
  };

  const handleDelete = (event) => {
    let idDataMovie = parseInt(event.target.value);

    let newLists = daftarMovie.list.filter((el) => el.id !== idDataMovie);

    axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idDataMovie}`, { headers: { Authorization: "Bearer " + user.token } }).then((res) => {
      console.log(res);
    });

    setDaftarMovie({ ...daftarMovie, list: [...newLists] });
  };

  return (
    <>
      <h1>Daftar Harga Buah</h1>
      <table>
        <thead>
          <tr>
            <th>Deskripsi</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Berat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftarMovie.lists !== null &&
            daftarMovie.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.weight / 1000} Kg</td>
                  <td>
                    <button onClick={handleEdit} value={item.id}>
                      Edit
                    </button>
                    &nbsp;
                    <button onClick={handleDelete} value={item.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default DaftarBuahList;
