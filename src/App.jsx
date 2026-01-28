import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import header from "./media/pokedex.png";

function App({ handleConfetti }) {
  const [showcreateForm, setShowCreateForm] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const notyf = new Notyf();
  const onCreate = (e) => {
    e.preventDefault();

    const title = document.getElementById("input_name").value;
    const body = document.getElementById("input_type").value;
    const d = new Date();

    fetch("https://pokemon-api.pokemon-api.workers.dev/")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((item) =>
          item.name.includes(title.toLowerCase())
        );
        if (title && filterData.length > 0) {
          const image = filterData[0].image;
          const color = filterData[0].color;
          const type = filterData[0].type;
          const weakness = filterData[0].weakness;
          const resistance = filterData[0].resistance;
          setPokemons((prevPokemons) => [
            {
              id:
                d.getDate() +
                "" +
                d.getHours() +
                "" +
                d.getMinutes() +
                "" +
                d.getSeconds() +
                "" +
                d.getMilliseconds(),
              title,
              body,
              image,
              color,
              type,
              weakness,
              resistance,
            },
            ...prevPokemons,
          ]);
          notyf.success("Created Successfully!");
          handleConfetti();
        } else {
          alert("Pokemon not found");
        }
      });

    setShowCreateForm(true);
  };

  const onDelete = (id) => {
    const tempPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
    setPokemons(tempPokemons);
    saveChanges(tempPokemons);
    notyf.success("Deleted Successfully!");
  };

  const onEdit = (
    id,
    newTitle,
    newBody,
    newImage,
    newColor,
    newType,
    newWeakness,
    newResistance
  ) => {
    const tempPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        pokemon.title = newTitle;
        pokemon.body = newBody;
        pokemon.image = newImage;
        pokemon.color = newColor;
        pokemon.type = newType;
        pokemon.weakness = newWeakness;
        pokemon.resistance = newResistance;
      }
      return pokemon;
    });
    setPokemons(tempPokemons);
    notyf.success("Updated Successfully!");
  };

  const saveChanges = (p = pokemons) => {
    localStorage.setItem("pokemons", JSON.stringify(p));
  };

  useLayoutEffect(() => {
    if (pokemons.length > 0) {
      saveChanges();
    }
  }, [pokemons]);

  useEffect(() => {
    if (localStorage.getItem("pokemons")) {
      setPokemons(JSON.parse(localStorage.getItem("pokemons")));
    }
  }, []);

  return (
    <div>
      <div className="gap-1rem d-flex justify-content-center">
        {/* main content */}
        <div className="d-flex align-item-center gap-1rem margin-10px flex-wrap">
          <h1 className="text-align-center">
            <img
              src={header}
              alt="pokedex header"
              width="200px"
              className="img-header"
            />
          </h1>
          <button
            className="blue-button"
            onClick={() => setShowCreateForm(!showcreateForm)}
          >
           {showcreateForm ? ("Back to Pokedex" ) : (<>  <FontAwesomeIcon icon={faSearch} /> <span style={{ marginLeft: 5 }}>Check Pokedex</span> </>)}
          </button>
        </div>
      </div>
      {showcreateForm ? (
        <div className="d-flex flex-wrap justify-content-center">
          {/* Card area */}
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              title={pokemon.title}
              body={pokemon.body}
              onEdit={onEdit}
              onDelete={onDelete}
              image={pokemon.image}
              color={pokemon.color}
              type={pokemon.type}
              weakness={pokemon.weakness}
              resistance={pokemon.resistance}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="container">
            <div className="cover d-flex justify-content-center">
              <div className="pokeball">
                <div className="part"></div>
                <div className="part d-flex justify-content-center align-item-center">
                  <div className="sm-circle"></div>
                </div>
              </div>
            </div>
            <div className="cover d-flex justify-content-center">
              <div className="pokedex">
                <form onSubmit={onCreate}>
                  <h1 className="text-align-center">Pokedev</h1>
                  <div className="mt-1">
                    <input
                      required
                      placeholder="Pokemon Name"
                      type="text"
                      id="input_name"
                    />
                  </div>
                  <div className="mt-1">
                    <textarea
                      required
                      placeholder="Pokemon Type"
                      id="input_type"
                    ></textarea>
                    <div>
                      <button
                        className="m-auto d-block btn"
                        style={{
                          background: "rgb(19, 119, 181)",
                          color: "white",
                          marginTop: 3,
                        }}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                        <span style={{ margin: 2 }}>Create</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
