<style>
  /* Style the tab */
  .tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }

  /* Style the buttons that are used to open the tab content */
  .tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
  }

  /* Change background color of buttons on hover */
  .tab button:hover {
    background-color: #ddd;
  }

  /* Create an active/current tablink class */
  .tab button.active {
    background-color: #ccc;
  }

  /* Style the tab content */
  .tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  }

  .input-group-text {
    background-color: transparent;
    border: none;
  }
  .btnDropdown{
    margin-top: 0px !important;
    width: 100% !important;
    text-align: left;
  }
  .dropdown-menu {
    width: 100%;
  }
  .dropdown {
    width: 89%;
  }
  .md-form input[type=text]:focus:not([readonly]) + label, .md-form input[type=password]:focus:not([readonly]) + label, .md-form input[type=email]:focus:not([readonly]) + label, .md-form input[type=url]:focus:not([readonly]) + label, .md-form input[type=time]:focus:not([readonly]) + label, .md-form input[type=date]:focus:not([readonly]) + label, .md-form input[type=datetime-local]:focus:not([readonly]) + label, .md-form input[type=tel]:focus:not([readonly]) + label, .md-form input[type=number]:focus:not([readonly]) + label, .md-form input[type=search-md]:focus:not([readonly]) + label, .md-form input[type=search]:focus:not([readonly]) + label, .md-form textarea.md-textarea:focus:not([readonly]) + label {
    color: #a4b874;
  }
  .md-form.input-group label {
    top: 15px;
  }
  .addOnIcon{
    margin-top: -30px;
  }
  .input-group-append {
    margin-left: -1px;
    height: 20px;
    width: 20px;
  }
  .input-group-append > .input-group-text.md-addon > span > button{
    padding: 0;
    margin: 0;
  }
  .checkboxAddon, .radioAddon{
    margin-left: -60px;
  }
  .radioForm .md-form label.active {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    font-size: 1rem;
  }
</style>
<template>
  <div class="container">
    <div  class="tab">
      <div v-for="(group, index) in groups">
        <button class="tablinks" @click="openTab(group)">{{group}}</button>
      </div>
    </div>
    <div ref="declareJsVariables"></div>
    <div ref="insertExpression"></div>
    <div ref="insertMatrix"></div>
    <div v-for="(groupName, groupIndex) in groups">
      <!-- Tab content -->
      <div :id="groupName" class="tabcontent">
        <div v-for="(property, key, propertyIndex) in propertyGroup[groupName]" :set="item = getPropertyValueById(property.id)">

          <div v-if="item.data_type == 'textField'">

            <mdb-input class="mb-0 mt-5" :value="item.value" :label="item.titel" size="sm" @change="calculateMatrixEvent">
                <span class="input-group-text md-addon" slot="append">
                    <mdb-tooltip material trigger="hover" :options="{placement: 'top'}" v-if="item.short_description.length">
                      <span slot="tip">{{item.short_description}}</span>
                      <mdb-btn slot="reference" flat><mdb-icon icon="info-circle" size="sm"  aria-hidden="true" /></mdb-btn>
                    </mdb-tooltip>
                </span>
            </mdb-input>
            <p class="text-break itemDescription">{{item.description}}</p>
          </div>

          <div v-else-if="item.data_type == 'matrix'">
            {{addMatrices(item.matrix)}}
          </div>

          <div v-else-if="item.data_type == 'select'">
            <label class="mb-0 mt-5"> {{item.titel}}</label>
            <div class="input-group mb-3 mt-0">
              <mdb-dropdown>
                <mdb-dropdown-toggle color="primary" slot="toggle" class="btnDropdown">Bitte auswählen ...</mdb-dropdown-toggle>
                <mdb-dropdown-menu color="primary">
                  <mdb-dropdown-item v-for="optionItem in item.selectBox" v-bind:value="optionItem.value"> {{optionItem.title}}</mdb-dropdown-item>
                </mdb-dropdown-menu>
              </mdb-dropdown>

              <span class="input-group-text md-addon" slot="append">
                   <mdb-tooltip material trigger="hover" :options="{placement: 'top'}"  v-if="item.short_description.length">
                    <span slot="tip">{{item.short_description}}</span>
                    <mdb-btn slot="reference" flat class="addOnIcon"><mdb-icon icon="info-circle" size="sm"  aria-hidden="true" /></mdb-btn>
                  </mdb-tooltip>
                </span>
            </div>
            <p class="text-break itemDescription">{{item.description}}</p>

          </div>
          <div v-else-if="item.data_type == 'expression'">
            {{executeExpressionString(item.expression)}}
          </div>
          <div v-else-if="item.data_type == 'imagelist'">
            <mdb-form-inline>

              <div v-for="imgItem in item.imageList">
                <input type="radio" :name="item.name" :id="imgItem.value" class="listWithImageRadio" />
                <label :for="imgItem.value" :set="imagePath = getImagePath(imgItem)" class="listWithImageLabel">
                  <img :src="imagePath" :width="imgItem.image_width"  :height="imgItem.image_height"  alt="ALT TEXT" />
                </label>
              </div>
            </mdb-form-inline>

            <p> {{item.description}}</p>
          </div>
          <div v-else-if="item.data_type == 'check'">

            <mdb-form-inline>
              <mdb-input type="checkbox" class="mb-0 mt-2" v-for="(checkItem, checkIndex) in item.checkBox" :value="checkItem.value" :id="checkItem.value" :name="checkItem.value" :label="checkItem.value"  >
                <span class="input-group-text md-addon checkboxAddon" slot="append">
                   <mdb-tooltip material trigger="hover" :options="{placement: 'top'}"  v-if="item.short_description.length">
                    <span slot="tip">{{item.short_description}}</span>
                    <mdb-btn slot="reference" flat><mdb-icon icon="info-circle" size="sm"  aria-hidden="true" /></mdb-btn>
                  </mdb-tooltip>
                </span>
              </mdb-input>
            </mdb-form-inline>
            <p class="text-break itemDescription">{{item.description}}</p>
          </div>

          <div v-else-if="item.data_type == 'radio'">

            <mdb-form-inline class="radioForm">
              <mdb-input type="radio"
                         v-for="(radioItem, radioIndex) in item.radioBox"
                         :set="radioId = getRadioIdById(item.name,radioIndex)"
                         :id="radioId"
                         :name="item.name"
                         :value="radioItem.value"
                         :label="radioItem.value"
                         @input="handleRadio"
                         class="mb-0 mt-2"
              >
                   <span class="input-group-text md-addon radioAddon" slot="append">

                   <mdb-tooltip material trigger="hover" :options="{placement: 'top'}"  v-if="item.short_description.length">
                    <span slot="tip">{{item.short_description}}</span>
                    <mdb-btn slot="reference" flat><mdb-icon icon="info-circle" size="sm"  aria-hidden="true" /></mdb-btn>
                  </mdb-tooltip>

                </span>
              </mdb-input>
            </mdb-form-inline>

            <p> {{item.description}}</p>

          </div>
        </div>
      </div>
    </div>

    <div :set="item = declareMatrices()">
    </div>

  </div>
</template>
<script>
  import { mdbTab, mdbTabItem, mdbTabContent, mdbTabPane, mdbContainer, mdbCol, mdbRow, mdbIcon, mdbTabs,mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbBtn, mdbInput,mdbFormInline,mdbFileInput,mdbTooltip} from 'mdbvue';
  import axios from 'axios';
  export default {
    name: 'TabPage',
    components: {
      mdbTab,
      mdbTabItem,
      mdbTabContent,
      mdbTabPane,
      mdbContainer,
      mdbCol,
      mdbRow,
      mdbIcon,
      mdbTabs,
      mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbBtn,mdbInput,mdbFormInline,mdbFileInput,mdbTooltip
    },
    mounted() {
      axios.get(this.restApiDomain+"/api/loadTemplate/templateId/403/customerId/2")
              .then((response)  =>  {
                let entcodedGroup = atob(response.data.groups);
                this.groups = JSON.parse(entcodedGroup);

                let entcodedPropertyGroup = atob(response.data.property);
                this.propertyGroup = JSON.parse(entcodedPropertyGroup);

                let entcodedPropertyValue = atob(response.data.propertyValue);
                this.propertyValue = JSON.parse(entcodedPropertyValue);

                this.imgPath = atob(response.data.imgPath);
                Object.entries(this.propertyValue).forEach(([key, propertyObj]) => {
                  this.createNewVariable(propertyObj.name, propertyObj.value);
                  if(propertyObj.matrix != undefined && propertyObj.matrix != null) {
                    let dataMatrixDB = propertyObj.matrix;
                    let dataMatrix = {};

                    if(dataMatrixDB != undefined) {
                      Object.keys(dataMatrixDB).forEach(function (key) {
                        let decodedString = JSON.parse(dataMatrixDB[key]);
                        dataMatrix[key] = decodedString;
                      });
                      this.propertyValue[key].matrix = dataMatrix;
                    }
                  }

                  if(propertyObj.imageList != undefined && propertyObj.imageList != null) {
                    this.propertyValue[key].imageList = JSON.parse(propertyObj.imageList);
                  }

                  if(propertyObj.radioBox != undefined && propertyObj.radioBox != null) {
                    this.propertyValue[key].radioBox = JSON.parse(propertyObj.radioBox);
                  }

                  if(propertyObj.selectBox != undefined && propertyObj.selectBox != null) {
                    this.propertyValue[key].selectBox = JSON.parse(propertyObj.selectBox);
                  }

                  if(propertyObj.checkBox != undefined && propertyObj.checkBox != null) {
                    this.propertyValue[key].checkBox = JSON.parse(propertyObj.checkBox);
                  }
                });

                this.declareVariableString();

              }, (error)  =>  {
                console.log(error);
              });
    },
    data() {
      return {
        pillsActive: 0,
        verticalWithin: 0,
        customerId: localStorage.getItem('customerId'),
        restApiDomain: 'https://api.dmg-software.de',
        //restApiDomain: 'http://127.0.0.1:8000',
        templateName : "Vorlage fue etwas 29",
        templateId : 403,
        groups: [],
        propertyGroup: {},
        propertyValue: [],
        allTemplateIds: [],
        allVariables:{},
        allMatrices:{},
        imgPath: '',
      };
    },
    methods: {
      handleRadio(){
        //function body
      },
      debugt(q) {
        console.log(typeof(q));
      },
      calculateMatrixEvent() {

      },
      getRadioIdById(id, index) {
        return id+""+index;
      },getCheckIdById(id, index) {
        return id+""+index;
      },
      addMatrices(itemMatrix) {
        let createMatrixVariableString ="";
        let allMatrices = this.allMatrices;
        let i = this.allMatrices.length;

        Object.keys(itemMatrix).forEach(function (key) {
          if (allMatrices[key] == undefined) {
            //allMatrices[i++] = key;
            allMatrices[key] = itemMatrix[key];
          }
        });
        //console.log("ZUZUZUZU::"+JSON.stringify(allMatrices));
        this.allMatrices = allMatrices;
      },
      executeExpressionString(textJs) {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('language', 'javascript');
        let inlineScript = document.createTextNode(textJs);
        script.appendChild(inlineScript);
        this.$refs.insertExpression.insertAdjacentElement('afterend', script);
      },
      executeJavascriptVariableString(textJs) {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('language', 'javascript');
        let inlineScript = document.createTextNode(textJs);
        script.appendChild(inlineScript);
        this.$refs.insertExpression.insertAdjacentElement('afterend', script);
      },
      getImagePath(imgItem) {
        let srcPath = '';
        if(imgItem.image_name != undefined && imgItem.image_name.length != 0 ) {
          srcPath = this.imgPath+this.customerId+"/"+"templateId/"+this.templateId+"/image/"+imgItem.image_name;
        }
        return srcPath;
      },
      createNewVariable(name, value) {
        if(name != undefined) {
          this.allVariables[name] = value;
        }
      },
      existsMatrix(name) {
        let isMatrix = false;
        let allMatrices = this.allMatrices;
        if(allMatrices[name] != undefined) {
          isMatrix = true;
        }
        return isMatrix;
      },
      declareMatrices() {
        if(JSON.stringify(this.allMatrices) !="{}") {
          // console.log("KOKOKOZUZUZU"+JSON.stringify(this.allMatrices));
          this.executeJavascriptVariableString('var globalMatrices = '+ JSON.stringify(this.allMatrices)+";");
        }
      },
      declareVariableString() {
        let createVariableString = '';
        Object.entries(this.allVariables).forEach(([key, value]) => {
          if(value == undefined) {
            return;
          }
          if(createVariableString.length == 0) {
            createVariableString += "var "+key+ " = "+ value;
          } else {
            createVariableString += ", "+key+ " = "+ value;
          }
        });

        if(createVariableString.length != 0) {
          createVariableString += ";";
          this.executeExpressionString(createVariableString);
        }
      },
      insertExpression() {

      },

      getPropertyValueById(id) {
        let propertyValueObj = {};
        let propeValue = {};
        propertyValueObj = this.propertyValue[id];
        //console.log("zuzusasa-::::"+JSON.stringify(propertyValueObj));
        if(typeof propertyValueObj !== 'undefined') {
          propeValue = propertyValueObj;
        }

        return propeValue;
      },
      openTab(tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
      },
    }
  }

</script>

<style>
  .listWithImageRadio {
    position: absolute;
    left: -9999px;
  }

  .listWithImageRadio:checked + label.listWithImageLabel>img {
    border: 1px solid #000000;
  }
  label.listWithImageLabel:hover {
    cursor: pointer;
  }
  .form-inline label {
    margin: 10px;
  }

</style>
