import { reactive, watch } from "vue";

export let toDos: any = reactive(JSON.parse(localStorage.getItem('tasks')) || [
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

export let DeleteTasks: any = reactive( JSON.parse(localStorage.getItem('deleteTasks')) || [])

export function updadetoDos(data:any){
    toDos = data;
  }

  watch(toDos, (_, __) => {
    toDos[0]?.items?.forEach((item: any) => {
      item.status = "new";
    });
    toDos[1]?.items?.forEach((item: any) => {
      item.status = "doing";
    });
    toDos[2]?.items?.forEach((item: any) => {
      item.status = "done";
    });
    localStorage.setItem('tasks', JSON.stringify(toDos))
  });

  watch(DeleteTasks, (_, __) => {
    localStorage.setItem('deleteTasks', JSON.stringify(DeleteTasks))
  });