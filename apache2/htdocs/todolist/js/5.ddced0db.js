(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"8b24":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("q-page",{staticClass:"flex flex-center q-pa-lg"},[s("div",{staticClass:"row full-width"},[s("div",{staticClass:"col-md-4 col-sm-3 col-1"}),s("div",{staticClass:"col-md-4 col-sm-6 col-10 q-gutter-sm"},[s("q-card",{staticClass:"bg-primary",attrs:{dark:""}},[s("q-card-section",[s("div",{staticClass:"row"},[s("div",{staticClass:"col text-h4"},[t._v("\n              Tarefas\n            ")]),s("div",{staticClass:"col text-right"},[s("q-btn",{attrs:{size:"lg",dense:"",flat:"",round:"",icon:"add"},on:{click:function(a){return t.dialogTarefa()}}})],1)])])],1),t._l(t.tasks,(function(a,i){return s("q-card",{key:i,staticClass:"bg-grey-3",attrs:{bordered:""}},[s("q-card-section",[s("div",{staticClass:"row items-center no-wrap"},[s("div",{staticClass:"col"},[s("div",{staticClass:"text-h6"},[t._v(t._s(a.title))])]),s("div",{staticClass:"col-auto"},[s("q-btn",{attrs:{color:"grey-7",round:"",flat:"",icon:"more_vert"}},[s("q-menu",{attrs:{cover:"","auto-close":""}},[s("q-list",[s("q-item",{staticClass:"text-primary",attrs:{clickable:""},on:{click:function(s){return t.dialogTarefa(a.id)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-icon",{attrs:{name:"edit"}})],1),s("q-item-section",[t._v("Editar Tarefa")])],1),s("q-item",{staticClass:"text-red",attrs:{clickable:""},on:{click:function(s){return t.confirmExcluirTarefa(a.id)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-icon",{attrs:{name:"delete"}})],1),s("q-item-section",[t._v("Excluir Tarefa")])],1)],1)],1)],1)],1)])]),s("q-card-section",{domProps:{innerHTML:t._s(a.description.replace(/\n/,"<br>"))}})],1)})),this.tasks.length?t._e():s("q-card",[s("q-card-section",{staticClass:"text-h6 text-center text-grey-6"},[t._v("\n          Nenhuma Tarefa Cadastrada!\n        ")])],1)],2),s("div",{staticClass:"col-md-4 col-sm-3 col-1"})]),s("q-dialog",{attrs:{persistent:""},model:{value:t.dialogExcluir,callback:function(a){t.dialogExcluir=a},expression:"dialogExcluir"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("q-avatar",{attrs:{icon:"signal_wifi_off",color:"primary","text-color":"white"}}),s("span",{staticClass:"q-ml-sm"},[t._v("Deseja realmente excluir a tarefa?")])],1),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancelar",color:"primary"},on:{click:t.limparDialogTarefa}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Excluir",color:"red"},on:{click:function(a){return t.excluirTarefa()}}})],1)],1)],1),s("q-dialog",{attrs:{persistent:""},model:{value:t.dialogAdicionarEditar,callback:function(a){t.dialogAdicionarEditar=a},expression:"dialogAdicionarEditar"}},[s("q-card",{staticStyle:{width:"94%","max-width":"400px"}},[s("q-card-section",{staticClass:"bg-primary text-white"},[t._v("\n        "+t._s(t.cardFunction)+" Tarefa\n      ")]),s("q-card-section",[s("q-input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"Id"},model:{value:t.idTask,callback:function(a){t.idTask=a},expression:"idTask"}}),s("q-input",{attrs:{label:"Título",autofocus:0===t.idTask},model:{value:t.taskTitle,callback:function(a){t.taskTitle=a},expression:"taskTitle"}}),s("q-input",{attrs:{type:"textarea",label:"Descrição"},model:{value:t.taskDescription,callback:function(a){t.taskDescription=a},expression:"taskDescription"}})],1),s("q-separator"),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",color:"red",label:"Cancelar"},on:{click:t.limparDialogTarefa}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",color:"primary",label:"gravar"},on:{click:t.gravarTarefa}})],1)],1)],1)],1)},e=[],r=s("f3e3"),c=s.n(r),o=(s("6762"),s("2fdb"),s("bc3a")),n=s.n(o),l={name:"PageIndex",data:function(){return{backUrl:location.href.includes("8080")?"http://localhost:3000/":"http://localhost/todolist-api/",tasks:[],idTask:0,taskTitle:"",taskDescription:"",dialogExcluir:!1,dialogAdicionarEditar:!1,cardFunction:"Adicionar"}},methods:{messageAlert:function(t){this.$q.notify({message:t,color:"red"})},messageConfirmation:function(t){this.$q.notify({message:t,color:"green"})},getTasks:function(){var t=this;n.a.get(this.backUrl+"tasks").then((function(a){200===a.status&&a.data.tasks?(a.data.tasks.length||t.messageAlert("Nenhuma tarefa cadastrada!"),t.tasks=a.data.tasks):t.messageAlert("Houve um problema na requisição!")})).catch((function(a){t.messageAlert(a)}))},confirmExcluirTarefa:function(t){this.idTask=t,this.dialogExcluir=!0},dialogTarefa:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.dialogAdicionarEditar=!0,t){this.cardFunction="Editar";var a=this.tasks.filter((function(a,s){return a.id===t})),s=c()(a,1),i=s[0],e=i.title,r=i.description;this.idTask=t,this.taskTitle=e,this.taskDescription=r}else this.cardFunction="Adicionar",this.limparDialogTarefa();return!1},excluirTarefa:function(){var t=this;n.a.delete(this.backUrl+"tasks/"+this.idTask).then((function(a){204===a.status?(t.messageConfirmation("Tarefa excluída com sucesso!"),t.getTasks()):t.messageAlert("Houve um problema na requisição!")})).catch((function(a){t.messageAlert(a)}))},gravarTarefa:function(){var t=this;if(!this.taskTitle.trim().length||!this.taskDescription.trim().length)return this.messageAlert("Preencha todos os campos!"),void setTimeout((function(){t.dialogTarefa(t.idTask)}),1e3);this.idTask?n.a.put(this.backUrl+"tasks/"+this.idTask,{title:this.taskTitle,description:this.taskDescription}).then((function(a){200===a.status?(t.messageConfirmation("Tarefa atualizada com sucesso!"),t.getTasks()):t.messageAlert("Houve um problema na requisição!")})).catch((function(a){t.messageAlert(a)})):n.a.post(this.backUrl+"tasks/",{title:this.taskTitle,description:this.taskDescription}).then((function(a){201===a.status?(t.messageConfirmation("Tarefa adicionada com sucesso!"),t.getTasks()):t.messageAlert("Houve um problema na requisição!")})).catch((function(a){t.messageAlert(a)}))},limparDialogTarefa:function(){return this.idTask=0,this.taskTitle="",this.taskDescription="",!1}},created:function(){this.getTasks()}},d=l,u=s("2877"),m=Object(u["a"])(d,i,e,!1,null,null,null);a["default"]=m.exports}}]);