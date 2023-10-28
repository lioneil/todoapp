<script setup lang="ts">
import { useTasksStore } from '~/store/tasks';
import { computed, nextTick } from 'vue';

const task = ref('');
const $store = useTasksStore();

function thenClear(fn: Function) {
	fn();
	task.value = '';
	scrollToBottom();
}

function scrollToBottom() {
	nextTick(() => {
		const $screen = document.querySelector('[data-screen-content]');
		$screen.scrollTo({
	    left: 0,
	    top: $screen.scrollHeight,
	    behavior: 'smooth'
	  });
	});
}
</script>

<template>
  <v-container class="todo-screen">
    <v-row justify="center">
    	<v-col cols="12" class="text-center">
  			<h1 class="text-h3 font-weight-bold text-white">Todo List</h1>
    	</v-col>
      <v-col cols="12" lg="6">
        <v-card elevation="10">
		    	<v-card-title class="text-right bg-grey-lighten-4">
		    		<v-chip
				      class="ma-2"
				      color="primary"
				      text-color="white"
				    >
				      Tasks
				      <template v-slot:append>
					      <v-badge
			            color="primary"
			            :content="$store.tasks.length || 0"
			            inline
			          ></v-badge>
				      </template>
				    </v-chip>

				    <v-chip
				      class="ma-2"
				      color="primary"
				      text-color="white"
				    >
				      Tasks Done
				      <template v-slot:append>
					      <v-badge
			            color="primary"
			            :content="$store.done.length || 0"
			            inline
			          ></v-badge>
				      </template>
				    </v-chip>

				    <v-chip
				    	v-if="!$store.isTasksDoneEmpty"
							prepend-icon="mdi-delete"
				      class="ma-2"
				      color="error"
				      label
				      text-color="white"
				      @click="$store.removeAllDone"
				    >
				      Tasks Done
				    </v-chip>

				    <v-chip
							prepend-icon="mdi-delete"
				      class="ma-2"
				      color="error"
				      label
				      text-color="white"
				      @click="$store.removeAll"
				    >
				      Tasks All
				    </v-chip>
		    	</v-card-title>

		    	<v-card-text data-screen-content class="pt-4">
		    		<template v-if="$store.isTasksEmpty">
							<div class="text-center text-disabled py-5">You don't have any todo list.</div>
		    		</template>
		    		<template v-else>
		    			<template v-for="(item, i) in $store.tasks">
	      				<v-hover v-slot="{ isHovering, props }">
			      			<v-card
			      				:key="i"
			      				border
			      				class="mb-3"
			      				v-bind="props"
			      				@click="$store.toggle(item)"
			      			>
			      				<v-card-text class="pa-1">
			      					<v-list-item>
    						        <template v-slot:prepend>
		      								<v-icon
		      									:color="$store.isDone(item) ? 'grey' : 'green'"
		      									icon="mdi-check-circle"
		      									size="28"
      										></v-icon>
		      							</template>

  							        <v-list-item-title
  							        	:class="{ 'completed': $store.isDone(item) }"
							        	>
  							        	{{ item.name }}
  							        </v-list-item-title>

  							        <template v-slot:append>
			      							<v-btn
			      								v-show="isHovering"
				                    color="error"
				                    variant="text"
				                    icon
				                    size="small"
				                    class="btn-delete"
				                    @click.stop="$store.remove(i)"
				                  >
			                  		<v-icon>mdi-delete</v-icon>
				                  </v-btn>
				               	</template>
			      					</v-list-item>
			      				</v-card-text>
			      			</v-card>
					  		</v-hover>
	      			</template>
					  </template>
		    	</v-card-text>

		    	<v-card-text class="bg-grey-lighten-4">
		    		<v-text-field
		    			v-model="task"
							autofocus
							clear-icon="mdi-close-circle"
							single-line
							variant="outlined"
				      hide-details="auto"
				      label="New task"
				      rounded
          		base-color="primary"
          		bg-color="white"
          		clearable
          		color="primary"
          		@click:append-inner="thenClear(() => $store.add(task))"
          		@keyup.enter="thenClear(() => $store.add(task))"
				    >
				    	<template v-slot:append-inner>
				    		<v-icon
				    			size="42"
				    			color="primary"
				    			@click.stop="thenClear(() => $store.add(task))"
				    		>mdi-plus-circle</v-icon>
				    	</template>
				    </v-text-field>
		    	</v-card-text>
		    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
