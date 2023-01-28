import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";
import Navbar from "../Navbar";

const schema = Yup.object().shape({
  name: Yup.string(), //.required("Name is required"),
  description: Yup.string(), //.required("Description is required"),
  date: Yup.string(), //.required("Date is required"),
  // yup time validation
  time: Yup.string(),
  //.required("Time is required"),
  price: Yup.string(), //.required("Price is required"),
  duration: Yup.string(), //.required("Duration is required"),
  category: Yup.string(), //.required("Category is required"),
  maxPeople: Yup.string(), //.required("Max people is required"),
});

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const updatedData = Object.keys(data)
      .filter((key) => data[key])
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    console.log(updatedData);

    const cookies = new Cookies();
    const token = cookies.get("token");

    fetch(`http://localhost:3003/myclasses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        console.log(res);
        if (res.status === 413) {
          alert("Zbyt duza ilosc znakow w opisie ");
        } else if (res.status === 200) {
          alert("Zajęcia zostały zedytowane");
          navigate("/myclasses");
        }
      })
      .catch((err) => {
        alert("Zajęcia nie zostały zedytowane");
      });
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="CreateClass">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Edytuj zajęcia!</h1>
          <label>Nazwa zajęć</label>
          <input type="text" {...register("name")} name="name" id="name" />
          <label>Opis zajęć</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            {...register("description")}
          ></textarea>
          <label>Cena</label>
          <input type="text" name="price" id="price" {...register("price")} />
          {errors.price && <p>{errors.price.message}</p>}

          <label>Miasto</label>
          <input type="text" name="city" id="city" {...register("city")} />
          {errors.city && <p>{errors.city.message}</p>}
          <label>Miejsce</label>
          <input type="text" name="place" id="place" {...register("place")} />
          {errors.place && <p>{errors.place.message}</p>}
          <label>Data</label>
          <input
            type="date"
            min={new Date()}
            name="date"
            id="date"
            {...register("date")}
          />
          {errors.date && <p>{errors.date.message}</p>}
          <label>Godzina</label>
          <input type="time" name="time" id="time" {...register("hour")} />
          <label>Czas trwania</label>
          <input
            type="text"
            name="duration"
            id="duration"
            {...register("duration")}
          />
          <label> Maksymalna liczba uczestników</label>
          <input
            type="text"
            name="maxPeople"
            id="max"
            {...register("maxPeople")}
          />
          {errors.maxPeople && <p>{errors.maxPeople.message}</p>}

          <label>Kategoria</label>
          <input
            type="text"
            name="category"
            id="category"
            {...register("category")}
          />
          {errors.category && <p>{errors.category.message}</p>}
          <button
            type="submit"
            id="button"
            className="text-xs bg-blue-900 bg-opacity-70 px-4"
          >
            Edytuj zajęcia
          </button>
        </form>
      </div>
    </>
  );
}