import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

export default function Card({
  onEdit,
  onDelete,
  id,
  title,
  body,
  image,
  color,
  type,
  weakness,
  resistance,
}) {
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [dialog, setDialog] = useState(false);
  const random = Math.floor(Math.random() * 100);
  const randomNumber = random < 10 ? random + 20 : random;
  const [numberHP, setNumberHP] = useState(randomNumber);
  const notyf = new Notyf();
  const onSave = () => {
    const newTitle = document.getElementById("new_name").value;
    const newBody = document.getElementById("new_type").value;

    fetch("https://heroku-azure.vercel.app/api/user")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((item) =>
          item.name.includes(newTitle.toLowerCase()),
        );

        if (filterData.length == 0) {
          notyf.error("Pokemon name does not exist.");
          return;
        }

        const image = filterData[0].image;
        const color = filterData[0].color;
        const type = filterData[0].type;
        const weakness = filterData[0].weakness;
        const resistance = filterData[0].resistance;

        if (newTitle && newBody) {
          onEdit(
            id,
            newTitle,
            newBody,
            image,
            color,
            type,
            weakness,
            resistance,
          );
          setEditMode(false);
          setDialog(false);
        } else {
          notyf.error("All fields are required.");
        }
      })
      .catch(() => {
        notyf.error("Failed to fetch Pokémon data.");
      });
  };

  const backgroundColor =
    color && color.length > 1
      ? `linear-gradient(${color[0]}, ${color[1]})`
      : `linear-gradient(${color[0]}, gray)`;
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
  return (
    <main>
      <div
        className="card"
        style={{
          border: "10px solid yellow",
          width: "300px",
          backgroundImage: backgroundColor,
          boxShadow: "inset 0 4px 6px black",
          borderRadius: "10px",
          margin: "10px",
          outline: "1px solid gold",
          cursor: "pointer",
        }}
        onClick={() => setDialog(true)}
      >
        <div
          className="element"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginLeft: "20px",
              textShadow:
                "1px 1px 2px gray, -1px -1px 2px aliceblue, 1px -1px 2px aliceblue, -1px 1px 2px aliceblue",
            }}
          >
            {title[0].toUpperCase() + title.slice(1)}
          </p>

          <div
            className="element-hp"
            style={{ display: "inline-flex", marginRight: "10px" }}
          >
            <p
              style={{
                color: "red",
                textShadow:
                  "1px 1px 2px gray, -1px -1px 2px aliceblue, 1px -1px 2px aliceblue, -1px 1px 2px aliceblue",
              }}
            >
              HP <span style={{ fontSize: "25px" }}>{numberHP}</span>
            </p>
            <img
              src={type}
              width="25px"
              style={{
                marginLeft: "10px",
                mixBlendMode: "multiply",
                objectFit: "contain",
                height: "25px",
                padding: "0",
                margin: "0",
              }}
              alt="HP Icon"
            />
          </div>
        </div>

        <img
          src={image}
          alt={title}
          width="250px"
          style={{
            borderTop: "10px solid yellow",
            borderLeft: "10px solid gold",
            borderBottom: "10px solid goldenrod",
            borderRight: "10px solid yellow",
            display: "block",
            margin: "auto",
            height: "180px",
            backgroundColor: "white",
          }}
        />
        <div className="content" style={{ margin: "10px" }}>
          <div
            className="border"
            style={{
              width: "250px",
              display: "block",
              margin: "auto",
              backgroundImage:
                "linear-gradient(to left, gold, yellow, goldenrod, gold, yellow, goldenrod)",
              height: "10px",
              transform: "skew(-20deg)",
            }}
          ></div>
          <div className="desc" style={{ display: "flex" }}>
            <img
              src={type}
              width="30px"
              style={{
                mixBlendMode: "multiply",
                objectFit: "contain",
                height: "30px",
                padding: "0",
                margin: "10px 0 0 5px",
                borderTop: "5px solid yellow",
                borderLeft: "5px solid gold",
                borderBottom: "5px solid goldenrod",
                borderRight: "5px solid yellow",
                borderRadius: "50px",
                boxShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.3), 4px 4px 8px rgba(0, 0, 0, 0.2), 6px 6px 12px rgba(0, 0, 0, 0.1), 8px 8px 16px rgba(0, 0, 0, 0.05)",
              }}
              alt="HP Icon"
            />
            <p style={{ fontSize: "10px", lineHeight: "1rem", padding: "5px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              dolor molestias ut eum voluptatibus error distinctio quos velit
              blanditiis modi, id aperiam? Voluptates veritatis numquam vero
              voluptatibus et aliquid hic.
            </p>
          </div>
          <hr />
          <div
            className="details"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <p className="type">
              Type: {body[0].toUpperCase() + body.slice(1)}
            </p>
            <p className="weakness">Weakness: {weakness}</p>
            <p className="resistance">Resistance: {resistance}</p>
          </div>

          <p
            style={{ textAlign: "center", fontSize: "10px", marginTop: "10px" }}
          >
            1995-2024 Nintendo Creatures, GAMEFREAK
          </p>
        </div>
      </div>
      <Dialog open={!!deleteDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete this Card?</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: !!deleteDialog ? "flex" : "none",
          }}
        >
          <Button
            onClick={() => setDeleteDialog(null)}
            style={{
              border: "2px solid blue",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onDelete(id)}
            color="error"
            style={{
              border: "2px solid red",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!editMode}>
        <Box style={{ margin: "10px" }}>
          <Typography>Pokemon Name:</Typography>
          <TextField
            defaultValue={title}
            id="new_name"
            placeholder={title}
            required
          />
        </Box>
        <Box style={{ margin: "10px" }}>
          <Typography>Pokemon Type:</Typography>
          <TextField
            defaultValue={body}
            placeholder={body}
            id="new_type"
            required
          />
        </Box>
        <Button
          style={{ background: "#007bff", color: "white", margin: "10px" }}
          onClick={onSave}
        >
          Submit
        </Button>
      </Dialog>
      <Dialog open={!!dialog}>
        <Button
          style={{
            background: "red",
            color: "white",
            margin: "10px",
            gap: "5px",
          }}
          onClick={() => setDeleteDialog(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </Button>
        <Button
          style={{
            background: "orange",
            color: "white",
            margin: "10px",
            gap: "5px",
          }}
          onClick={() => setEditMode(true)}
        >
          <FontAwesomeIcon icon={faPen} />
          Edit
        </Button>
        <Button
          onClick={() => setDialog(false)}
          style={{ background: "#007bff", color: "white", margin: "10px" }}
        >
          Cancel
        </Button>
      </Dialog>
    </main>
  );
}
