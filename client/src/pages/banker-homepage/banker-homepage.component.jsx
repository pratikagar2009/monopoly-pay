import React, { useState } from "react";
import "./banker-homepage.style.css";
import allTicketDetails from "../../components/cards/allTicketDetails";
import players from "../../components/cards/players";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BankerHomePage = () => {
  const [characters, updateCharacters] = useState(allTicketDetails);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <div className="banker-home-page">
      <div className="header">
        <div className="header-content">
          <h1>Monopoly Pay</h1>
        </div>
      </div>
      <div className="bank">
        <div className="player-bank-details">
            <div className="players">
            {players.map((player) => (
                <div className='player-column'>
                  {player.name}
                </div>
              ))}
            </div>
        </div>
        <div className="ticket-cards">
          {/* <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src=""
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
          </Card.Body>
        </Card> */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <img src={thumb} alt={`${name} Thumb`} />
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
export default BankerHomePage;
