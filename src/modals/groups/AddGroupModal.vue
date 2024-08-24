<template>
  <mdb-modal centered v-if="groupModal">
    <mdb-modal-header>
      <mdb-modal-title>Neue Gruppe anlegen</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>

      <mdb-input placeholder="Gruppenname" id="groupname" v-model="groupname" name="groupname" class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="groupModal">
        <mdb-btn color="geccomButtonInfo" size="sm" group id="groupModal" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
      </mdb-input>


    </mdb-modal-body>
    <mdb-modal-footer>
      <mdb-btn color="danger" v-on:click.native="closeGroupModal">Schließen</mdb-btn>
      <mdb-btn color="primary" @click.native="saveGroupName">Speichern</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>
<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbTextarea, mdbIcon, mdbCol, mdbRow,Sticky } from 'mdbvue';
  export default {
    name: 'AddGroupModal',
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
      showGroupModal:{
        type: Boolean,
        default: false
      },
      groupname:''
    },
    data() {
      return {
        groupModal: this.showGroupModal
      }
    },
    directives:{
      'sticky': Sticky
    },
    methods: {
      closeGroupModal() {
        this.showGroupModal = false;
        this.$emit('closeGroupModal');
      },
      saveGroupName(){
        this.$emit('saveGroupName',this.groupname);
      }
    },
    watch: {
      showGroupModal(newVal) {
        this.groupModal = newVal;
      }
    }
  }
</script>
