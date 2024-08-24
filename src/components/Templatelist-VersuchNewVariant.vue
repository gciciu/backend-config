<template>
  <div class="container-fluid">
    <p class="lead">Hier legen Sie schnell und einfach, Ihre gewünschte Komponente an.</p>
    <hr class="my-4" />
    <mdb-row class="d-flex justify-content-center">
      <input type="file" ref="dmgImportFile" @change="onDmgImportFilePicked($event)" style="display: none">
      <mdb-btn color="blue-grey" @click="$refs.dmgImportFile.click()" class="px-2" icon="arrow-up">
        Komponente importieren
      </mdb-btn>
      <mdb-btn color="geccomButtonGreen" class="px-2" icon="plus" v-on:click.native="openComponentModal">
        Komponente anlegen
      </mdb-btn>
    </mdb-row>
    <br />
    <br />
    <br />
    <div id="wrapper">
      <div id="template-list-block">
            <h6 class="text-left">Bereits vorhandene Komponente</h6>
            <vue-good-table
                    :sort-options="{
                    enabled: true,
                  }"
                    :columns="columns"
                    :rows="templates"
                    :search-options="{
                    enabled: true,
                    placeholder: 'Tabelle durchsuchen',
                  }"
                    :pagination-options="dmgPagination">

              <template slot="table-row" slot-scope="props">
                   <span v-if="props.column.field == 'id'" class="template-row-item" v-bind:class="{tplselected : (props.row.id == selectedTemplateId), tplselected: (props.row.id == selectedTemplateId)}" @click="chooseComponent(props.row)">
                      {{props.row.originalIndex + 1}}
                   </span>
                  <span  v-else-if="props.column.field == 'name'" class="template-row-item" v-bind:class="{tplselected : (props.row.id == selectedTemplateId), tplselected: (props.row.id == selectedTemplateId)}"  @click="chooseComponent(props.row)">
                   {{props.row.name}}
                  </span>
                  <span  v-else-if="props.column.field == 'date'" class="template-row-item" v-bind:class="{tplselected : (props.row.id == selectedTemplateId), tplselected: (props.row.id == selectedTemplateId)}"  @click="chooseComponent(props.row)">
                    {{props.row.date}}
                  </span>
                  <span v-else-if="props.column.field == 'comment'" class="template-row-item" v-bind:class="{tplselected : (props.row.id == selectedTemplateId), tplselected: (props.row.id == selectedTemplateId)}"  @click="chooseComponent(props.row)">
                    {{props.row.remark}}
                  </span>
                  <span v-else-if="props.column.field == 'aktionen'">
                        <mdb-tooltip :options="{placement: 'top'}">
                            <span slot="tip">Komponente löschen</span>
                             <mdb-btn slot="reference" @click.native="deleteTemplate(props.row.id)" color="geccomButtonTransparent" size="sm" icon="trash" iconRight></mdb-btn>
                        </mdb-tooltip>
                        <mdb-tooltip :options="{placement: 'top'}">
                          <span slot="tip">Komponente duplizieren</span>
                          <mdb-btn slot="reference" @click.native="duplicateComponent(props.row.id)" color="geccomButtonTransparent" size="sm" icon="copy" iconRight></mdb-btn>
                        </mdb-tooltip>
                        <mdb-tooltip :options="{placement: 'top'}">
                          <span slot="tip">Komponente export</span>
                          <mdb-btn slot="reference" @click.native="exportComponent(props.row.id, props.row.name)" color="geccomButtonTransparent" size="sm" icon="file-export" iconRight></mdb-btn>
                        </mdb-tooltip>
                        <mdb-tooltip :options="{placement: 'top'}">
                          <span slot="tip">Komponente Einstellungen</span>
                          <mdb-btn slot="reference" @click.native="editTemplateItem(props.row)" color="geccomButtonTransparent" size="sm" icon="cog" iconRight></mdb-btn>
                        </mdb-tooltip>
                   </span>
              </template>
            </vue-good-table>
      </div>
      <div id="template-block">
        <DmGTemplate v-if="selectedTemplateId != null" v-model="selectedTemplateId" :selected-template-id="selectedTemplateId"></DmGTemplate>
      </div>

        <!-- Start Component Modal-->
        <mdb-modal removeBackdrop side position="bottom-right" v-if="componentModal" @close="componentModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Neue Komponente anlegen</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <mdb-input placeholder="Komponentenname" id="templatename" name="templatename" v-model="templatename"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="componentModalField">
              <mdb-btn color="geccomButtonInfo" size="sm" group id="componentModalField" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
            </mdb-input>

          </mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="geccomButtonRed" @click.native="componentModal = false">Schließen</mdb-btn>
            <mdb-btn color="geccomButtonGreen" @click.native="saveTemplateName">Speichern</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
        <!-- End Componenet Modal -->
        <!-- Start Component Modal-->
        <mdb-modal removeBackdrop side position="bottom-right" v-if="componentUpdateModal" @close="componentUpdateModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Komponente änderen</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <mdb-input placeholder="Komponentenname" id="updatetemplatename" name="updatetemplatename" v-model="templatename"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="componentModalField">
              <mdb-btn color="geccomButtonInfo" size="sm" group id="componentUpdateModalField" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
            </mdb-input>

          </mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="geccomButtonRed" @click.native="componentUpdateModal = false">Schließen</mdb-btn>
            <mdb-btn color="geccomButtonGreen" @click.native="updateTemplateName">Speichern</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
        <!-- End Componenet Modal -->

        <!--    Start Modal Doku  Components  -->
        <mdb-modal class="modalOptionValues" v-if="docuComponentsModal" @close="docuComponentsModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Komponente Dokumentations Artikel</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>

            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src="https://support.dmg-software.de" allowfullscreen></iframe>
            </div>
          </mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="geccomButtonRed" @click.native="docuComponentsModal = false">Schließen</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
        <!--    End Modal Doku Components -->
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<style>
  .template-row-item {
    cursor: pointer;
    width: 100%;
    display: block;
  }
  #wrapper {
    display: flex;
    width: 100%;
    //border: 1px solid black;
  }
  #template-list-block {
    width: 40%;
    //border: 1px solid red;
  }
  #template-block {
    width: 60%;
    border-left: 1px solid black;
    //border: 1px solid green;
  }
  .dropdown-content li > a, .dropdown-content li > span {
    font-size: 0.9rem;
    color: #000000;
    display: block;
    padding: 0.5rem;
  }
  .pagination.pg-blue .page-item.active .page-link {
    background-color: #33B5E6;
  }
  .modalCloseButton{
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px !important;
    font-size: 20px !important;
    color: #ff2800 !important;
  }
    .tplselected {
        background: #33B5E6;
    }
</style>

<script>
import { mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, Popover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbCardGroup, mdbCardImage,
  mdbCardTitle, mdbCardBody, mdbCardText, mdbCard, mdbView, mdbDatatable,waves,mdbSideNav, mdbSideNavNav, mdbSideNavCat, mdbSideNavItem, mdbMask, mdbJumbotron} from 'mdbvue';
//import Navigation from '@/navigation/Navigation.vue';
import axios from 'axios';
import mdbTableEditor from 'mdb-table-editor';
import DmGTemplate from '@/component/DmgTemplate.vue';
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
//import dmghelper from './mixins/dmghelper.js';
export default {
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbTooltip,
    Popover,
    mdbInput,
    mdbTextarea,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon, mdbCardGroup, mdbCardImage,
    mdbCardTitle, mdbCardBody, mdbCardText, mdbCard, mdbView, mdbDatatable,mdbSideNav, mdbSideNavNav, mdbSideNavCat, mdbSideNavItem, mdbMask,mdbJumbotron,DmGTemplate,mdbTableEditor,VueGoodTable
  },
  async mounted() {
    if(typeof(dmgRestApiUrl) != "undefined") {
      this.restApiDomain = dmgRestApiUrl;
    }

    if(typeof(dmgUserId) != "undefined") {
      this.customerId = dmgUserId;
    }

    localStorage.setItem('restApiDomain', this.restApiDomain);
    localStorage.setItem('customerId', this.customerId);
    let tplDataLoading = await this.fetchTemplates();
    //this.dmgPagination.setCurrentPage = 2;
    //console.log(":::"+this.dmgPagination.setCurrentPage);
  },
  //mixins: [dmghelper],
  props: {
    showHome: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      dmgPagination:{
        enabled: true,
        mode: 'records',
        perPage: 195,
        position: 'bottom',
        perPageDropdown: [15, 30, 80],
        dropdownAllowAll: true,
        nextLabel: 'vor',
        prevLabel: 'zurück',
        rowsPerPageLabel: '',
        setCurrentPage:1,
        ofLabel: 'of',
        pageLabel: 'Seite', // for 'pages' mode
        allLabel: 'Alle',
      },
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        }/*,
        {
          label: 'Bemerkung',
          field: 'comment',
          sort: 'asc'
        }*/,
        {
          label:'Erstellt am',
          field: 'date',
          sort:'asc'
        },      {
          label:'Aktionen',
          field: 'aktionen',
          sort:'asc'
        },
      ],
      componentUpdateModal:false,
      componentModal:false,
      docuComponentsModal:false,
      showProduct: false,
      homeModal: this.showHome,
      templatename: '',
      selectedTemplate: null,
      selectedTemplateId: null,
      templates:[], //JSON.parse(localStorage.getItem('allTemplates') || '[]'),
      data: [],
      //restApiDomain: 'https://api.dmg-software.de',
      //restApiDomain: 'https://api.derproduktkonfigurator.de',
      //restApiDomain: 'http://127.0.0.1:8000',
      //restApiDomain: 'https://api.derproduktkonfigurator.de',
      //customerId: 2,//508391,
      //customerId: 508391, // gals-technik
      //customerId: 528606,
      //customerId: 528606, // grabsteine
      customerId: 639646,//my
      //customerId: 428398, //Dm
      tplId: 0,
      dmgCurrentPage: 1,
      //restApiDomain: 'https://api.derproduktkonfigurator.de',
      restApiDomain: 'https://api.produkt-konfigurator24.de',
      //restApiDomain: 'https://api.glas-technik.ch',
      //restApiDomain: 'http://127.0.0.1:8000',
    }
  },
  methods: {
    /*
    searchFuncByName(row, col, cellValue, searchTerm){
        let isFindedTheWord = false;
        console.log("col.field:"+col.field);
        console.log("col.field11:"+ eval(col.field == "title"));
       // console.log("cellValue:"+cellValue);
        if(col.field == "title") {
            console.log("cellValue:"+JSON.stringify(row));
            console.log("searchTerm:"+searchTerm);
            if(cellValue.includes(searchTerm)) {
                isFindedTheWord = true;
            }
        }
        return isFindedTheWord;
    },
        updateCoachStatus(selectedTemplateId){
      this.$emit("selectedTemplateId", selectedTemplateId) ;
    },
    */

    forceFileDownload(response, exportFileName) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', exportFileName+".json");
      document.body.appendChild(link);
      link.click()
    },
    fetchTemplates() {
      let self = this;
      return axios.get(this.restApiDomain+"/api/alltpls/"+this.customerId)
              .then((response)  =>  {
                this.loading = false;
                var encodedString = this.decode(response.data['tpl']);
                // console.log('ttt:'+encodedString);
                localStorage.setItem('allTemplates', encodedString);
                self.templates = JSON.parse(encodedString);
                //console.log(JSON.stringify(templates));
                self.chooseComponent(self.templates[0]);
              }, (error)  =>  {
                console.log(error);
              });
    },
    duplicateComponent(templateId) {
      let self = this;
      axios.get(this.restApiDomain+"/api/dmgDuplicateTpl/templateId/"+templateId+"/customerId/"+this.customerId)
      .then((response)  =>  {
        self.fetchTemplates();
      }, (error)  =>  {
        console.log(error);
      });
    },
    exportComponent(templateId, exportFileName) {
      let self = this;
      axios.get(this.restApiDomain+"/api/dmgExportTpl/templateId/"+templateId+"/customerId/"+this.customerId)
      .then((response)  =>  {
        //self.fetchTemplates();
        self.forceFileDownload(response, exportFileName);
      }, (error)  =>  {
        console.log(error);
      });
    },
    chooseComponent(selectedComponent){
      this.selectedTemplateId = selectedComponent.id;
      localStorage.setItem('selectedTemplateId', selectedComponent.id);
      localStorage.setItem('selectedTemplateName', selectedComponent.name);
      /*
      this.$router.push(
          {
            path: '/dmgTemplate',
          }
      )*/
    },
    editTemplateItem(tplRow) {
      this.templatename = tplRow.name;
      this.tplId = tplRow.id;
      this.componentUpdateModal = true
    },

    deleteTemplate(templateId) {
      let self = this;
      axios.get(this.restApiDomain+"/api/deleteTpl/templateId/"+templateId)
              .then((response)  =>  {
                self.fetchTemplates();
              }, (error)  =>  {
                console.log(error);
              });
    },
    toggleLeftSideNav() {
      this.toggleA = !this.toggleA;
    },
    redirectToTpl () {
      this.$router.push(
              {
                path: '/dmgTemplate',
              }
      )
    },
    goToEdit(selectedTpl) {
      this.$router.push(
              {
                path: '/dmgTemplate',
              }
      )
    },
    setCurrentSelectedTpl(selectedTpl) {
      this.selectedTemplate = selectedTpl;
      localStorage.setItem('selectedTemplateName', selectedTpl);
    },
    openComponentModal() {
      this.componentModal = true
      this.tplId = 0;
    },
    openDocuComponentsModal() {
      this.docuComponentsModal = true
    },

    closeModalHome() {
      this.showHome = false;
      this.$emit('closeModalHome');
    },
    openModalProduct() {
      console.log("Product MODAL");
      this.showProduct= true;
    },
    closeModalProduct() {
      this.showProduct = false;
    },
    saveTemplateName() {
      this.selectedTemplate = this.templatename;
      let encodedString = this.encode(JSON.stringify(this.templatename));
      let localRouter = this.$router;
      axios.post(this.restApiDomain+'/api/tpls', {
        tplId: this.tplId,
        customerId: this.customerId,
        tplName: encodedString
      },{headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }})
              .then(function (response) {
                localStorage.setItem('selectedTemplateName', response.data.name);
                localStorage.setItem('selectedTemplateId', response.data.id);
                localRouter.push(
                        {
                          path: '/dmgTemplate',
                        }
                )
              })
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.headers);
                }
                else if (error.request) {
                  console.log(error.request);
                }
                else {
                  console.log(error.message);
                }
                console.log(error.config);
              });
    },
    onDmgImportFilePicked(e) {
      let self = this;
      const files = e.target.files;
      let filename = files[0].name;

      const fr = new FileReader();
      fr.onload = e => {
        const tplEncodedString = e.target.result;
        axios.post(this.restApiDomain + '/api/dmgImportTpl', {
          customerId: self.customerId,
          jsonString: tplEncodedString,
        }, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        .then(function (response) {
          self.fetchTemplates();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.headers);
          }
          else if (error.request) {
            console.log(error.request);
          }
          else {
            console.log(error.message);
          }
          console.log(error.config);
        });
      }
      fr.readAsText(files.item(0));
    },
    updateTemplateName() {
      let self = this;
      let encodedString =  this.encode(JSON.stringify(this.templatename));
      axios.post(this.restApiDomain+'/api/tpls', {
        tplId: this.tplId,
        customerId: this.customerId,
        tplName: encodedString
      },{headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }})
              .then(function (response) {
                self.fetchTemplates();
              })
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.headers);
                }
                else if (error.request) {
                  console.log(error.request);
                }
                else {
                  console.log(error.message);
                }
                console.log(error.config);
              });
    },
    encode(input) {
      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;

      input = this._utf8_encode(input);

      while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
      }

      return output;
    },
    decode(inputStr) {
      let output = "";
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;

      if(typeof(inputStr) == "undefined") {
        return ;
      }

      if(inputStr.length == 0) {
        return ;
      }
      inputStr = inputStr.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < inputStr.length) {

        enc1 = this.keyStr.indexOf(inputStr.charAt(i++));
        enc2 = this.keyStr.indexOf(inputStr.charAt(i++));
        enc3 = this.keyStr.indexOf(inputStr.charAt(i++));
        enc4 = this.keyStr.indexOf(inputStr.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }

      output = this._utf8_decode(output);

      return output;

    },
    _utf8_encode(enCodeString) {
      if(enCodeString.length == 0) {
        return;
      }
      let stringRp = enCodeString.replace(/\r\n/g, "\n");
      let utftext = "";

      for (let n = 0; n < stringRp.length; n++) {
        let c = stringRp.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }

      return utftext;
    },
    _utf8_decode(utftext) {
      let string = "";
      let i = 0;
      let c = 0, c1 = 0, c2 = 0, c3 = 0;

      while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        }
        else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        }
        else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }

      return string;
    }
  },
  mixins: [waves],
  watch: {
    showHome(newVal) {
      this.homeModal = newVal;
    }
  }
};
</script>
