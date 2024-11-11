<script setup lang="ts">


import { reactive, ref, watch } from "vue";
const title = ref("");
let toDos: any = reactive([
  {
    title: "New Tasks",
    id: 1,
    items: [],
  },
  {
    title: "Doing Tasks",
    id: 2,
    items: [],
  },
  {
    title: "Done Tasks",
    id: 3,
    items: [],
  },
]);


// Yangi Task qo'shadi
function handelSubmit() {
  if (title.value.length > 0) {
    const payload = {
      title: title.value,
      done: false,
      timestamp: new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes(),
      id: Math.floor(Math.random()*100) + toDos[0].items?.length + 1,
      status: "new",
    };
    toDos[0]?.items?.push(payload);
    console.log(toDos)
    title.value = "";
  } else {
    alert("Title cannot be empty");
  }
}

//  Carni ID si va Parent ID ni saqlab oladi
const DragStart = (event:any, id:any) => {
    event.dataTransfer.setData("cardId", id)
    event.dataTransfer.setData("sourceColumnId", event.target.closest(".desktop").id)
}

//  Reload bolishini oldini oladi
const dragOver = (event:any)=> {
  event.preventDefault();
};

//  Cardlarni boshqa parentga olib otadi
const drop = (event: any, targetId:any) => {
    const cardId = event.dataTransfer.getData("cardId");
    const sourceColumnId = event.dataTransfer.getData("sourceColumnId");
    const sourceItemIndex = toDos.findIndex((item:any) => item.id === parseInt(sourceColumnId))
    const targetItemIndex = toDos.findIndex((item:any) => item.id === targetId)

    if(sourceItemIndex === targetItemIndex){
        return
    }


    if(sourceItemIndex !== -1 && targetItemIndex !== -1){
        const cardToMove = toDos[sourceItemIndex].items?.find((card: any) => card.id === parseInt(cardId))
        const updatedSourceCards = toDos[sourceItemIndex].items?.filter((card:any) => card.id !== parseInt(cardId))
        const updatedTargetCards = [...toDos[targetItemIndex].items, cardToMove]

        const newItems = [...toDos]
        newItems[sourceItemIndex].items = updatedSourceCards
        newItems[targetItemIndex].items = updatedTargetCards

       toDos = newItems
       console.log(toDos)

    }
}

//  Parent ichidagi cardlarni sortlaydi joylarni o'zgartiradi
const sortDrop = (event:any, columnId:any) => {
    const cardId = event.dataTransfer.getData("cardId");
    const itemIndex = toDos.findIndex((item:any) => item.id === columnId);
    const cardIndex = toDos[itemIndex].items.findIndex((card:any) => card.id === parseInt(cardId));

    if (cardIndex === -1) return; // Card not found

    const hoveredCardIndex = event.target.closest(".card").dataset.index;

    if (hoveredCardIndex !== undefined && hoveredCardIndex !== cardIndex.toString()) {
      const updatedCards = [...toDos[itemIndex].items];
      const [movedCard] = updatedCards.splice(cardIndex, 1);
      updatedCards.splice(hoveredCardIndex, 0, movedCard);

      const newItems = [...toDos];
      newItems[itemIndex].items = updatedCards;
      toDos = newItems;
    }

}

const handleDelete = (elementId:any, parentIndex:any) => {
    const updatedItems = [...toDos];
    updatedItems[parentIndex].items = updatedItems[parentIndex].items.filter((item:any) => item.id!== elementId);
    toDos = updatedItems;
}

const handleDone = (element:any, parentIndex:any) => {
    if(element.status == 'new'){
        element.status = 'doing'
        element.timestamp = Date.now()
        toDos[1].items.push(element)
        handleDelete(element.id, parentIndex)
    }else if(element.status == 'doing'){
        element.status = 'done'
        element.timestamp = Date.now()
        toDos[2].items.push(element)
        handleDelete(element.id, parentIndex)
    }else{
        alert('This task is already done')
    }
}

watch(toDos, (_, __) => {
    toDos[0]?.items?.forEach((item:any) => {
        item.status = 'new'
    })
    toDos[1]?.items?.forEach((item:any) => {
        item.status = 'doing'
    })
    toDos[2]?.items?.forEach((item:any) => {
        item.status = 'done'
    })
});
</script>

<template>
  <main>
    <section class="form">
      <div class="container">
        <form class="form-wrapper">
          <label for="title">
            <input name="title" v-model="title" placeholder="Enter your new tasks" />
          </label>
          <button @click.prevent="handelSubmit">Create</button>
        </form>
      </div>
    </section>

    <section id="tasks">
      <div class="container">
        <div class="tasks-wrapper">
          <div
            @dragover.prevent="dragOver"
            @drop="(event) => drop(event, e?.id)"
            class="desktop"
            v-for="(e, i) in toDos"
            :key="e.id"
            :id="e.id"
          >
            <h1>{{ e.title }}</h1>
            <div
              class="card"
              v-for="(element, index) in e.items"
              :data-index="index"
              :key="index"
              :id="element.id"
              draggable="true"
              @dragover.prevent="dragOver"
              @dragstart="(e) => DragStart(e, element.id)"
              @drop="(event) => sortDrop(event, e?.id)"
            >
              <h3>Title: {{ element?.title }}</h3>
              <small>Status: {{ element?.status }}</small>
              <p>Time: {{ element?.timestamp }}</p>
              <strong>ID: {{ element?.id }}</strong>

              <div class="btns">
                <button @click="handleDelete(element.id, i)">Delete</button>
                <button @click="handleDone(element, i)">Task Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  border-radius: 12px;
  background: lightgreen;

  label {
    width: 100%;
  }

  input {
    margin-bottom: 20px;
    width: 100%;
    background: white;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    font-size: 18px;
  }

  button {
    width: 50%;
    padding: 6px 30px;
    border-radius: 12px;
    border: 1px solid white;
    cursor: pointer;
  }
}

.tasks-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.desktop {
  width: 300px;
  border: 1px solid black;
  height: auto;
  padding: 20px;
  border-radius: 12px;
  h1 {
    text-align: center;
  }

  .card {
    position: relative;
    border-radius: 12px;
    background: lightgray;
    margin-top: 20px;
    padding: 10px;
    cursor: grab;

    strong {
      position: absolute;
      top: 12px;
      right: 10px;
    }

    p {
      font-size: 12px;
    }

    .btns {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: start;
      margin-top: 10px;

      button {
        padding: 5px 10px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
      }

      button:first-child {
        background: red;
        color: white;
        transition: all 0.2s linear;

        &:hover {
          background: darkred;
        }
      }

      button:last-child {
        background: green;
        color: white;
        transition: all 0.2s linear;
        &:hover {
          background: darkgreen;
        }
      }
    }
  }
}
</style>
