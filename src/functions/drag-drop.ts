import { toDos, DeleteTasks, updadetoDos } from "../constans";

export const handleDone = (element: any, parentIndex: any) => {
    if (element.status == "new") {
      element.status = "doing";
      element.timestamp = Date.now();
      toDos[1].items.push(element);
      handleDelete(element.id, parentIndex, 'subtitle');
    } else if (element.status == "doing") {
      element.status = "done";
      element.timestamp = Date.now();
      toDos[2].items.push(element);
      handleDelete(element.id, parentIndex, 'subtitle');
    } else {
      alert("This task is already done");
    }
  };
  
export  const handleDelete = (elementId: any, parentIndex: any, title:any = 'title') => {
    const updatedItems: any = [...toDos];
    if(title == 'title'){
      const deleteItem = toDos[parentIndex].items.filter((item: any) => item.id == elementId)
      DeleteTasks.push(...deleteItem);
    }

    updatedItems[parentIndex].items = updatedItems[parentIndex].items.filter(
      (item: any) => item.id !== elementId
    );
    
    updadetoDos(updatedItems) ;
  };
  
  //  Carni ID si va Parent ID ni saqlab oladi
export  const DragStart = (event: any, id: any) => {
    event.dataTransfer.setData("cardId", id);
    event.dataTransfer.setData("sourceColumnId", event.target.closest(".desktop").id);
  };
  
  //  Parent ichidagi cardlarni sortlaydi joylarni o'zgartiradi
export  const sortDrop = (event: any, columnId: any) => {
    const cardId = event.dataTransfer.getData("cardId");
    const itemIndex = toDos.findIndex((item: any) => item.id === columnId);
    const cardIndex = toDos[itemIndex].items.findIndex(
      (card: any) => card.id === parseInt(cardId)
    );
  
    if (cardIndex === -1) return; // Card not found
  
    const hoveredCardIndex = event.target.closest(".card").dataset.index;
  
    if (hoveredCardIndex !== undefined && hoveredCardIndex !== cardIndex.toString()) {
      const updatedCards = [...toDos[itemIndex].items];
      const [movedCard] = updatedCards.splice(cardIndex, 1);
      updatedCards.splice(hoveredCardIndex, 0, movedCard);
  
      const newItems = [...toDos];
      newItems[itemIndex].items = updatedCards;
      updadetoDos(newItems)
    }
  };
  
export  const dragOver = (event: any) => {
    event.preventDefault();
  };

  //  Cardlarni boshqa parentga olib otadi
export const drop = (event: any, targetId: any) => {
  const cardId = event.dataTransfer.getData("cardId");
  const sourceColumnId = event.dataTransfer.getData("sourceColumnId");
  const sourceItemIndex = toDos.findIndex(
    (item: any) => item.id === parseInt(sourceColumnId)
  );
  const targetItemIndex = toDos.findIndex((item: any) => item.id === targetId);

  if (sourceItemIndex === targetItemIndex) {
    return;
  }

  if (sourceItemIndex !== -1 && targetItemIndex !== -1) {
    const cardToMove = toDos[sourceItemIndex].items?.find(
      (card: any) => card.id === parseInt(cardId)
    );
    const updatedSourceCards = toDos[sourceItemIndex].items?.filter(
      (card: any) => card.id !== parseInt(cardId)
    );
    const updatedTargetCards = [...toDos[targetItemIndex].items, cardToMove];

    const newItems = [...toDos];
    newItems[sourceItemIndex].items = updatedSourceCards;
    newItems[targetItemIndex].items = updatedTargetCards;

    updadetoDos(newItems);
  }
};

export const backCard = (card:any) => {
  let data = [...DeleteTasks]
  if(card.status == 'new'){
    toDos[0].items.push(card);
  }else if(card.status == "doing"){
    toDos[1].items.push(card);
  }else if(card.status == "done"){
    toDos[2].items.push(card);
  }
  data = data.filter((item: any) => item.id!== card.id)

}