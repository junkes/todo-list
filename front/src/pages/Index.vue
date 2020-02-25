<template>
  <q-page class="flex flex-center q-pa-lg">

    <div class="row full-width">
      <div class="col-md-4 col-sm-3 col-1"></div>
      <div class="col-md-4 col-sm-6 col-10 q-gutter-sm">
        <q-card class="bg-primary" dark>
          <q-card-section>
            <div class="row">
              <div class="col text-h4">
                Tarefas
              </div>
              <div class="col text-right">
                <q-btn @click="dialogTarefa()" size="lg" dense flat round icon="add"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card v-for="(task, index) in tasks" v-bind:key="index" bordered class="bg-grey-3">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{task.title}}</div>
              </div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable @click="dialogTarefa(task.id)" class="text-primary">
                        <q-item-section avatar><q-icon name="edit" /></q-item-section>
                        <q-item-section>Editar Tarefa</q-item-section>
                      </q-item>
                      <q-item clickable @click="confirmExcluirTarefa(task.id)" class="text-red">
                        <q-item-section avatar><q-icon name="delete" /></q-item-section>
                        <q-item-section>Excluir Tarefa</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-html="task.description.replace(/\n/gm, '<br>')" />
        </q-card>
        <q-card v-if="!this.tasks.length">
          <q-card-section class="text-h6 text-center text-grey-6">
            Nenhuma Tarefa Cadastrada!
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-3 col-1"></div>
    </div>
    <q-dialog v-model="dialogExcluir" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Deseja realmente excluir a tarefa?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="limparDialogTarefa" flat label="Cancelar" color="primary" v-close-popup />
          <q-btn @click="excluirTarefa()" flat label="Excluir" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogAdicionarEditar" persistent>
      <q-card style="width:94%; max-width: 400px;">
        <q-card-section class="bg-primary text-white">
          {{cardFunction}} Tarefa
        </q-card-section>

        <q-card-section>
          <q-input label="Id" v-show="false" v-model="idTask" />
          <q-input label="Título" v-model="taskTitle" :autofocus="idTask === 0" />
          <q-input type="textarea" v-model="taskDescription" label="Descrição" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn @click="limparDialogTarefa" v-close-popup flat color="red" label="Cancelar" />
          <q-btn @click="gravarTarefa" v-close-popup flat color="primary" label="gravar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      backUrl: location.href.includes('8080') ? 'http://localhost:3000/' : 'http://localhost/todolist-api/',
      tasks: [],
      idTask: 0,
      taskTitle: '',
      taskDescription: '',
      dialogExcluir: false,
      dialogAdicionarEditar: false,
      cardFunction: 'Adicionar'
    }
  },
  methods: {
    messageAlert (msg) {
      this.$q.notify({
        message: msg,
        color: 'red'
      })
    },
    messageConfirmation (msg) {
      this.$q.notify({
        message: msg,
        color: 'green'
      })
    },
    getTasks () {
      if (!location.href.includes('localhost')) this.backUrl = 'http://64.227.10.30/todolist-api/'
      axios.get(this.backUrl + 'tasks')
        .then(response => {
          if (response.status === 200 && response.data.tasks) {
            if (!response.data.tasks.length) {
              this.messageAlert('Nenhuma tarefa cadastrada!')
            }
            this.tasks = response.data.tasks
          } else {
            this.messageAlert('Houve um problema na requisição!')
          }
        })
        .catch(err => {
          this.messageAlert(err)
        })
    },
    confirmExcluirTarefa (id) {
      this.idTask = id
      this.dialogExcluir = true
    },
    dialogTarefa (id = 0) {
      this.dialogAdicionarEditar = true
      if (id) {
        this.cardFunction = 'Editar'
        const [{ title, description }] = this.tasks.filter((task, index) => task.id === id)
        this.idTask = id
        this.taskTitle = title
        this.taskDescription = description
      } else {
        this.cardFunction = 'Adicionar'
        this.limparDialogTarefa()
      }
      return false
    },
    excluirTarefa () {
      axios.delete(this.backUrl + 'tasks/' + this.idTask)
        .then(response => {
          if (response.status === 204) {
            this.messageConfirmation('Tarefa excluída com sucesso!')
            this.getTasks()
          } else {
            this.messageAlert('Houve um problema na requisição!')
          }
        })
        .catch(err => {
          this.messageAlert(err)
        })
    },
    gravarTarefa () {
      if (!this.taskTitle.trim().length || !this.taskDescription.trim().length) {
        this.messageAlert('Preencha todos os campos!')
        setTimeout(() => {
          this.dialogTarefa(this.idTask)
        }, 1000)
        return
      }
      if (this.idTask) {
        axios.put(this.backUrl + 'tasks/' + this.idTask, {
          title: this.taskTitle,
          description: this.taskDescription
        })
          .then(response => {
            if (response.status === 200) {
              this.messageConfirmation('Tarefa atualizada com sucesso!')
              this.getTasks()
            } else {
              this.messageAlert('Houve um problema na requisição!')
            }
          })
          .catch(err => {
            this.messageAlert(err)
          })
      } else {
        axios.post(this.backUrl + 'tasks/', {
          title: this.taskTitle,
          description: this.taskDescription
        })
          .then(response => {
            if (response.status === 201) {
              this.messageConfirmation('Tarefa adicionada com sucesso!')
              this.getTasks()
            } else {
              this.messageAlert('Houve um problema na requisição!')
            }
          })
          .catch(err => {
            this.messageAlert(err)
          })
      }
    },
    limparDialogTarefa () {
      this.idTask = 0
      this.taskTitle = ''
      this.taskDescription = ''
      return false
    }
  },
  created () {
    this.getTasks()
  }
}
</script>
