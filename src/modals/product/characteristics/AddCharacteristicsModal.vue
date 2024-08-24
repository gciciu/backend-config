<template>
  <mdb-modal centered v-if="characteristicsModal">
      <mdb-modal-header>
        <mdb-modal-title>Neue Eigenschaft anlegen</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div style="padding-left: 20px;">Eigenschaftname für {{ currentSelectedProperty }}
          <input type="text" style="width: 90%;" v-model="tplProperty" name="tplProperty"></div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="danger" v-on:click.native="closeCharacteristicsModal">Schließen</mdb-btn>
        <mdb-btn color="success" @click.native="saveProperty">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
</template>
<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbTextarea, mdbIcon, mdbCol, mdbRow,Sticky } from 'mdbvue';
  export default {
    name: 'AddCharacteristicsModal',
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
      showCharacteristicsModal:{
        type: Boolean,
        default: false
      },
      currentSelectedGroup: '',
      tplProperty:'',
      currentSelectedProperty: ''

    },
    data() {
      return {
        characteristicsModal: this.showCharacteristicsModal,

      }
    },
    directives:{
      'sticky': Sticky
    },
    methods: {
      closeCharacteristicsModal() {
        this.showCharacteristicsModal = false;
        this.$emit('closeCharacteristicsModal');
      },
      saveProperty(){
        this.$emit('saveProperty', this.tplProperty);
      },
    },
    watch: {
      showCharacteristicsModal(newVal) {
        this.characteristicsModal = newVal;
      }
    }
  }
</script>
