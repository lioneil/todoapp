import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { last, sortBy, isEmpty } from 'lodash';

type Task = {
  id?: int,
  name?: string,
  status?: {
    done: boolean,
  },
};

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useLocalStorage('tasks', []);
  const done = computed(() => tasks.value.filter(task => task.status.done === true));
  const isTasksEmpty = computed(() => isEmpty(tasks.value));
  const isTasksDoneEmpty = computed(() => isEmpty(done.value));

  function make(text: string) {
    return {
      id: (last(sortBy(tasks.value, 'id'))?.id || 0) + 1,
      name: text,
      status: { done: false },
    };
  }

  function add(text: string) {
    if (!isEmpty(text.trim())) {
      tasks.value.push(make(text))
    }
  }

  function toggle(item: Item) {
    item.status.done = !item.status.done;
  }

  function isDone(item: Item) {
    return item.status.done;
  }

  function remove(index: int) {
    tasks.value.splice(index, 1);
  }

  function removeAll() {
    tasks.value = [];
  }

  function removeAllDone() {
    tasks.value = tasks.value.filter((item: Item) => !isDone(item));
  }

  return {
    add,
    toggle,
    tasks,
    done,
    isDone,
    isTasksEmpty,
    isTasksDoneEmpty,
    remove,
    removeAll,
    removeAllDone,
  };
});
