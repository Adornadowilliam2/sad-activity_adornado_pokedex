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

  // List of types for the select input
  const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];

  const onCreate = (e) => {
    e.preventDefault();

    const inputName = document
      .getElementById("input_name")
      .value.trim()
      .toLowerCase();
    const selectedType = document
      .getElementById("input_type")
      .value.toLowerCase();

    fetch("https://heroku-azure.vercel.app/api/user/")
      .then((res) => res.json())
      .then((data) => {
        // 1. Find the Pokemon
        const foundPokemon = data.find(
          (p) => p.name.toLowerCase() === inputName,
        );

        if (!foundPokemon) {
          notyf.error("Pokemon name not found in database.");
          return;
        }

    
        const validTypes =
          foundPokemon.type2?.map((t) => t.toLowerCase()) || [];
        const isTypeMatch = validTypes.includes(selectedType);

        if (!isTypeMatch) {
          notyf.error(
            `Invalid: ${foundPokemon.name} is not ${selectedType}. Valid: ${validTypes.join(", ")}`,
          );
          return;
        }

        // 4. SUCCESS
        const newPokemon = {
          id: Date.now().toString(),
          title: foundPokemon.name,
          body: selectedType,
          image: foundPokemon.image,
          color: foundPokemon.color,
          type: foundPokemon.type,
          weakness: foundPokemon.weakness,
          resistance: foundPokemon.resistance,
        };

        setPokemons((prev) => [newPokemon, ...prev]);
        notyf.success("Created Successfully!");
        handleConfetti();
        setShowCreateForm(true);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        notyf.error("Check your internet or API link.");
      });
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
    newResistance,
  ) => {
    const tempPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return {
          ...pokemon,
          title: newTitle,
          body: newBody,
          image: newImage,
          color: newColor,
          type: newType,
          weakness: newWeakness,
          resistance: newResistance,
        };
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
    const saved = localStorage.getItem("pokemons");
    if (saved) {
      setPokemons(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <div className="gap-1rem d-flex justify-content-center">
        <div className="d-flex align-item-center gap-1rem margin-10px flex-wrap justify-content-center">
   
            <img
              src={header}
              alt="pokedex header"
              width="200px"
              className="img-header"
            />
    
          <button
            className="blue-button"
            onClick={() => setShowCreateForm(!showcreateForm)}
          >
            {showcreateForm ? (
              "Back to Pokedex"
            ) : (
              <>
                <FontAwesomeIcon icon={faSearch} />
                <span style={{ marginLeft: 5 }}>Check Pokedex</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showcreateForm ? (
        <div className="d-flex flex-wrap justify-content-center">
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              {...pokemon}
              onEdit={onEdit}
              onDelete={onDelete}
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
                  <h1 className="text-align-center">Pokedex</h1>
                  <div className="mt-1">
                    <input
                      required
                      placeholder="Pokemon Name"
                      type="text"
                      id="input_name"
                    />
                  </div>
                  <div className="mt-1">
                    {/* Changed from Textarea to Select */}
                    <select
                      id="input_type"
                      required
                      className="select-input"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="">Select Type</option>
                      {pokemonTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div>
                      <button
                        className="m-auto d-block btn"
                        style={{
                          background: "rgb(19, 119, 181)",
                          color: "white",
                          marginTop: 15,
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
