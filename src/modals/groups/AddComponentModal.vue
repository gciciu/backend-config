<template>
  <mdb-modal centered v-if="componentModal">
    <mdb-modal-header>
      <mdb-modal-title>Neue Vorlage anlegen</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body class="mx-3">
      <div class="grey-text">
        <mdb-input label="Vorlagenname" icon="file-signature" type="text" v-model="templatename" name="templatename" />
      </div>
    </mdb-modal-body>
    <mdb-modal-footer>
      <mdb-btn color="danger" v-on:click.native="closeComponentModal">Schließen</mdb-btn>
      <mdb-btn color="success" @click.native="saveTemplateName">Speichern</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>
<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbTextarea, mdbIcon, mdbCol, mdbRow,Sticky } from 'mdbvue';
  export default {
    name: 'AddComponentModal',
    components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn,
      mdbInput,
      mdbTextarea,
      mdbIcon,
      mdbCol,
      mdbRow
    },
    props: {
      showComponentModal:{
        type: Boolean,
        default: false
      },
      templatename:''
    },
    data() {
      return {
        componentModal: this.showComponentModal
      }
    },
    directives:{
      'sticky': Sticky
    },
    methods: {
      closeComponentModal() {
        this.showComponentModal = false;
        this.$emit('closeComponentModal');
      },
      saveTemplateName(){
        this.$emit('saveTemplateName',this.templatename);
      }
    },
    watch: {
      showComponentModal(newVal) {
        this.componentModal = newVal;
      }
    }
  }
</script>
