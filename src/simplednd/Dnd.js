import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const dataa = [
  { id: "1", content: "item-1" },
  { id: "2", content: "item-2" },
  { id: "3", content: "item-3" },
  { id: "4", content: "item-4" },
  { id: "5", content: "item-5" },
  { id: "6", content: "item-6" },
];

const record = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "seagreen",
  padding: 8,
  width: 250,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 16,
  margin: "0 0 8px",
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

export const Dnd = () => {
  const [item, setitem] = useState([]);

  useEffect(() => {
    setitem(dataa);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const recorderitems = record(
      item,
      result.source.index,
      result.destination.index
    );
    setitem(recorderitems);
  };

  return (
    <div className="flex justify-center mt-16">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={item.length > 0 ? item[0].id : "default"}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {item.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="border-2 border-teal-500"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
