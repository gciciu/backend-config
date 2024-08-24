
<template>

  <mdb-row>
    <mdb-col md="12">
      <p class="lead">Legen Sie hier Ihre Komponentengruppen, Mermale und Merkmalwerte an.</p>
      <hr class="my-4" />
      <mdb-row class="d-flex justify-content-center">
        <mdb-col xl="6" class="pb-2">
          <mdb-tbl hover responsive sm>
            <mdb-tbl-head>
              <th><h3>Gruppe</h3></th>
              <th class="text-right" colspan="3">

                <mdb-tooltip :options="{placement: 'top'}">
                  <span slot="tip">Neue Gruppe anlegen</span>
                  <mdb-btn color="geccomButtonInfo" slot="reference" @click="openGroupModal"><mdb-icon icon="plus" /></mdb-btn>
                </mdb-tooltip>
              </th>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr @click="setCurrentSelectedGroup(groupname.name)" v-for="groupname in groupnames" v-bind:class="{ liIsActive: currentSelectedGroup == groupname.name }">
                <td>{{ groupname.name }}</td>
                <td>
                  <mdb-tooltip :options="{placement: 'top'}">
                    <span v-if="!eyeGroup" slot="tip">Gruppe ausblenden</span>
                    <span v-if="eyeGroup" slot="tip">Gruppe einblenden</span>

                    <mdb-btn color="geccomButtonTransparent"  slot="reference" @click="eyeGroup = true" v-if="!eyeGroup"><mdb-icon far  icon="eye" /></mdb-btn>
                    <mdb-btn color="geccomButtonTransparent" slot="reference" @click="eyeGroup = false" v-if="eyeGroup"><mdb-icon far  icon="eye-slash" /></mdb-btn>
                  </mdb-tooltip>
                </td>
                <td class="text-right">
                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Gruppe editieren</span>
                    <mdb-btn color="geccomButtonTransparent" slot="reference" @click="openCharacteristicsValuesModal" icon="edit"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Gruppe löschen</span>
                    <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deleteGroupTemplate(groupname)" icon="trash"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Gruppe duplizieren</span>
                    <mdb-btn slot="reference" color="geccomButtonTransparent" size="sm" icon="copy"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Gruppe Einstellungen</span>
                    <mdb-btn slot="reference" color="geccomButtonTransparent"  size="sm" icon="cog"></mdb-btn>
                  </mdb-tooltip>

                  <!--
                          <mdb-dropdown btn-group split dropleft>
                            <mdb-dropdown-toggle slot="toggle" color="primary" class="px-3"><mdb-icon icon="cog" /></mdb-dropdown-toggle>
                            <mdb-dropdown-menu dropleft>
                              <a @click="openCharacteristicsValuesModal" class="dropdown-item"><mdb-icon icon="edit" /> Gruppe editieren</a>
                              <div class="dropdown-divider"></div>
                              <a  @click="deleteCharacteristicsModal = true"  class="dropdown-item"><mdb-icon icon="trash" /> Gruppe löschen</a>
                            </mdb-dropdown-menu>
                          </mdb-dropdown>
                  -->

                </td>
              </tr>
            </mdb-tbl-body>

          </mdb-tbl>
        </mdb-col>
        <mdb-col xl="6" class="pb-2">
          <mdb-tbl hover responsive sm>
            <mdb-tbl-head>
              <th><h3>Merkmale</h3></th>
              <th>&nbsp;</th>
              <th class="text-right">

                <mdb-tooltip :options="{placement: 'top'}">
                  <span slot="tip">Neues Merkmal anlegen</span>

                  <mdb-btn color="geccomButtonInfo" slot="reference" @click="openCharacteristicsModal"><mdb-icon icon="plus" /></mdb-btn>
                </mdb-tooltip>

              </th>
            </mdb-tbl-head>
            <mdb-tbl-body>

              <tr v-for="property in propertyGroup[currentSelectedGroup]" @click="setCurrentSelectedProperty(property.name, property.id)">
                <td>{{ property.name }}</td>

                <td>
                  <mdb-tooltip :options="{placement: 'top'}">
                    <span v-if="!eyeGroup" slot="tip">Merkmal ausblenden</span>
                    <span v-if="eyeGroup" slot="tip">Merkmal einblenden</span>

                    <mdb-btn color="geccomButtonTransparent"  slot="reference" @click="eyeGroup = true" v-if="!eyeGroup"><mdb-icon far  icon="eye" /></mdb-btn>
                    <mdb-btn color="geccomButtonTransparent" slot="reference" @click="eyeGroup = false" v-if="eyeGroup"><mdb-icon far  icon="eye-slash" /></mdb-btn>
                  </mdb-tooltip>
                </td>

                <td class="text-right">
                  <mdb-tooltip :options="{placement: 'top'}" v-if="property.name != null">
                    <span slot="tip">Merkmal bearbeiten</span>
                    <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="openCharacteristicsModal(property.id)" icon="edit"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Merkmal löschen</span>
                    <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deletePropertyTemplate(property.id)" icon="trash"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Merkmal duplizieren</span>
                    <mdb-btn slot="reference"  color="geccomButtonTransparent" @click="openCharacteristicsValuesModal" size="sm" icon="copy"></mdb-btn>
                  </mdb-tooltip>

                  <mdb-tooltip :options="{placement: 'top'}">
                    <span slot="tip">Merkmal Einstellungen</span>
                    <mdb-btn slot="reference"  color="geccomButtonTransparent" @click="openAddCharacteristicsValuesModal(property.id)" size="sm" icon="cog"></mdb-btn>
                  </mdb-tooltip>

                  <!--

                                                <mdb-dropdown btn-group split dropleft>
                                                  <mdb-dropdown-toggle slot="toggle" color="primary" class="px-3"><mdb-icon icon="cog" /></mdb-dropdown-toggle>
                                                  <mdb-dropdown-menu dropleft>
                                                    <a @click="openCharacteristicsValuesModal" class="dropdown-item"><mdb-icon icon="edit" /> Werte editieren</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a  @click="deleteCharacteristicsModal = true"  class="dropdown-item"><mdb-icon icon="trash" /> Merkmal löschen</a>
                                                  </mdb-dropdown-menu>
                                                </mdb-dropdown>
                  -->

                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-col>
      </mdb-row>
    </mdb-col>

    <!--    Start Modal Group          -->
    <mdb-modal removeBackdrop side position="bottom-right" v-if="groupModal" @close="groupModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Neue Gruppe anlegen</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-input placeholder="Komponentengruppe" id="templatename" v-model="groupname" name="groupname" class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="groupModal">
          <mdb-btn color="geccomButtonInfo" size="sm" group  slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
        </mdb-input>
        <mdb-input placeholder="Bemerkungen" :rows="2" :maxlength="max" v-model="text">
          <mdb-btn color="geccomButtonInfo" size="sm" group id="groupModal" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
        </mdb-input>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click="groupModal = false">Schließen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="saveGroupName">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Group  -->


    <!--    Start Modal Characteristics          -->
    <mdb-modal removeBackdrop side position="bottom-right" v-if="characteristicsModal" @close="characteristicsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Neues Merkmal anlegen für {{ currentSelectedProperty }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-input placeholder="Merkmalname" id="tplProperty" v-model="tplProperty" name="tplProperty" class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="characteristicsModal">
          <mdb-btn color="geccomButtonInfo" size="sm" group id="characteristicsModal" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
        </mdb-input>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click.native="characteristicsModal = false">Schließen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="saveProperty(currentSelectedGroup)">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Characteristics  -->


    <!--    Start Modal Matrix          -->
    <mdb-modal centered v-if="matrixModal" @close="matrixModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Matrix Data</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div style="padding-left: 20px;">
          <table>
            <tr v-for="csv in matrixDataView">
              <td>{{csv.x}}</td>
              <td>{{csv.y}}</td>
              <td>{{csv.value}}</td>
            </tr>
          </table>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click.native="matrixModal = false">Schließen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="saveProperty(currentSelectedGroup)">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Matrix  -->


    <!--    Start Modal Characteristics    Values      -->
    <mdb-modal class="modalOptionValues" size="lg" centered v-if="characteristicsValuesModal" @close="characteristicsValuesModal = false">

      <mdb-modal-header>
        <mdb-modal-title>Komponente:  {{ selectedTemplate }} | Merkmal: {{ currentSelectedProperty }}</mdb-modal-title>
        <mdb-btn  flat class="pull-right modalCloseButton" size="lg"  @click.native="characteristicsValuesModal = false">
          x
        </mdb-btn>
      </mdb-modal-header>

      <mdb-modal-body>
        <div class="container-fluid">
<mdb-row>
        <mdb-col class="mb-6">
          <h2 class="display-5">Merkmal Einstellungen</h2>
        </mdb-col>
  <mdb-col class="mb-6">
          <mdb-tooltip :options="{placement: 'top'}">
            <span slot="tip">Regelliste</span>
            <mdb-btn color="geccomButtonGreen" slot="reference" @click="ruleList()" icon="list-alt" class="float-right">Regeln</mdb-btn>
          </mdb-tooltip>
        </mdb-col>
</mdb-row>
        </div>
        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Allgemeine Werte</mdb-card-header>
              <mdb-card-body>
                <mdb-row class="d-flex justify-content-center">
                  <mdb-col xl="3" class="pb-2">
                    <mdb-input placeholder="ID" id="fieldId" v-model="fieldId"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="fieldIdGroup">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="fieldIdGroup" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                  </mdb-col>
                  <mdb-col xl="3" class="pb-2">
                    <mdb-input placeholder="Titel" id="fieldTitel" v-model="fieldTitel"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="fieldTitellabel">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="fieldTitellabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                  </mdb-col>
                  <mdb-col xl="3" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <mdb-btn color="geccomButtonInfo" size="sm" group slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>
                      <mdb-select search @getValue="getSelectValueDataTypes" :options="dataTypes" class="mt-0 mb-3 width90"  size="sm" />
                    </div>
                  </mdb-col>
                  <mdb-col xl="3" class="pb-2">
                    <mdb-input placeholder="Wert" v-model="fieldValue"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="valueWertLabel">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="valueWertLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Erweiterte Einstellungen</mdb-card-header>
              <mdb-card-body>
                <mdb-row>
                  <mdb-col xl="3" md="6" sm="12" class="pb-2">
                    <form-inline>
                      <label><mdb-btn color="geccomButtonInfo" size="sm" group id="requiredLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>Pflichtfeld: </label>
                      <mdb-input type="radio"
                                 id="requiredYes"
                                 name="required"
                                 value="1"
                                 label="Ja"
                                 @input="handleRadioRequiredField(1)"
                                 v-model="requiredField"
                                 :checked=requiredFieldCheckedOn
                      />
                      <mdb-input type="radio"
                                 id="requiredNo"
                                 name="required"
                                 value="0"
                                 label="Nein"
                                 @input="handleRadioRequiredField(0)"
                                 v-model="requiredField"
                                 :checked=requiredFieldCheckedOff
                      />

                    </form-inline>
                  </mdb-col>
                  <mdb-col xl="3"  md="6" sm="12" class="pb-2">

                    <form-inline>
                      <label><mdb-btn color="geccomButtonInfo" size="sm" group id="activeLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>Sichtbar: </label>
                      <mdb-input type="radio"
                                 id="avtiveYes"
                                 name="active"
                                 value="1"
                                 label="Ja"
                                 @input="handleActiveFieldRadio(1)"
                                 v-model="activeField"
                                 :checked=hiddenFieldOn
                      />
                      <mdb-input type="radio"
                                 id="activeNo"
                                 name="active"
                                 value="0"
                                 label="Nein"
                                 @input="handleActiveFieldRadio(0)"
                                 v-model="activeField"
                                 :checked=hiddenFieldOff
                      />
                    </form-inline>
                  </mdb-col>

                  <mdb-col xl="3" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend" v-if="data_type != 'matrix' && (data_type == 'radio' || data_type == 'check' || data_type == 'imagelist' || data_type == 'select')">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="standardValuelabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>
                      <mdb-select v-if="data_type != 'matrix' && (data_type == 'radio' || data_type == 'check' || data_type == 'imagelist' || data_type == 'select')" search @getValue="getStandardValue" :options="standardValues" v-model="standardValue" class="mt-0 mb-3 width90"  id="standardValue" size="sm" ariaDescribedBy="standardValuelabel" />
                      <div v-if="data_type != 'matrix' && data_type == 'textField'">
                        <mdb-input placeholder="Standard Wert" id="standardValueTextField" v-model="standardValue"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="fieldTitellabel">
                          <mdb-btn color="geccomButtonInfo" size="sm" group id="standardValueTitellabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                        </mdb-input>
                      </div>
                    </div>
                  </mdb-col>
                  <mdb-col xl="3" class="pb-2">
                    <mdb-input placeholder="Individuelle CSS Klassen" v-model="valueCssClass"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="valueCssClassLabel">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="valueCssClassLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Berechnungen</mdb-card-header>
              <mdb-card-body>
                <mdb-row>

                  <mdb-col xl="3" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="combiValuelabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>
                      <mdb-select multiple selectAll search @getValue="getCombiValuelabel" :options="combiValues" v-model="combiValue" class="mt-0 mb-3 width90"  id="combiValue" size="sm" ariaDescribedBy="combiValuelabel" />
                    </div>
                  </mdb-col>
                  <mdb-col xl="3"  md="6" sm="12" class="pb-2">
                    <form-inline>
                      <label><mdb-btn color="geccomButtonInfo" size="sm" group slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>Operatoren: </label>
                      <mdb-input type="radio"
                                 id="plusOperator"
                                 name="operatorCombi"
                                 value="plusOperator"
                                 label="+"
                                 @input="handleRadio"
                                 v-model="operatorCombi"
                      />
                      <mdb-input type="radio"
                                 id="minusOperator"
                                 name="operatorCombi"
                                 value="minusOperator"
                                 label="-"
                                 @input="handleRadio"
                                 v-model="operatorCombi"
                      />
                      <mdb-input type="radio"
                                 id="multiplyOperator"
                                 name="operatorCombi"
                                 value="multiplyOperator"
                                 label="*"
                                 @input="handleRadio"
                                 v-model="operatorCombi"
                      />
                      <mdb-input type="radio"
                                 id="operatorCombi"
                                 name="operatorCombi"
                                 value="divideOperator"
                                 label="/"
                                 @input="handleRadio"
                                 v-model="operatorCombi"
                      />

                      <mdb-input type="radio"
                                 id="rormulaOperator"
                                 name="activeField"
                                 value="activeNo"
                                 label="Formel anwenden"
                                 @input="handleRadio"
                                 v-model="activeField"
                      />

                    </form-inline>
                  </mdb-col>
                  <mdb-col xl="6" class="pb-2">
                    <fullscreen ref="fullscreenAceEditor" @change="fullscreenChangeAce" style="height:150px;">
                      <AceEditor
                        :fontSize="14"
                        :showPrintMargin="true"
                        :showGutter="true"
                        :highlightActiveLine="true"
                        mode="javascript"
                        theme="chrome"
                        v-model="expression"
                        :onChange="onChangeExpression"
                        name="editor"
                        :editorProps="{$blockScrolling: true}"
                        height="100%"
                        width="100%"
                      />
                    </fullscreen>
                    <button type="button" @click="toggleAce" ><mdb-icon icon="expand" /></button>
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Einstellungen für Bilder oder Matrix</mdb-card-header>
              <mdb-card-body>

                <!--START IMAGE VALUES-->
                <div v-if="data_type != 'expression'">
                  <mdb-row>
                    <mdb-col xl="3" class="pb-2">
                      <mdb-input placeholder="Breite"  v-model="valueBreite"  class="mt-0 mb-3" ariaLabel="valueBreite" ariaDescribedBy="valueBreite">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="valueBreite" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </mdb-input>
                    </mdb-col>
                    <mdb-col xl="3" class="pb-2">
                      <mdb-input placeholder="Höhe"  v-model="valueHoehe"  class="mt-0 mb-3" ariaLabel="valueHoehe" ariaDescribedBy="valueHoehe">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="valueHoehe" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </mdb-input>
                    </mdb-col>
                    <mdb-col xl="3" class="pb-2">
                      <mdb-input placeholder="Position X"  v-model="valuePosX"  class="mt-0 mb-3" ariaLabel="valuePosX" ariaDescribedBy="valuePosX">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="valuePosX" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </mdb-input>
                    </mdb-col>
                    <mdb-col xl="3" class="pb-2">
                      <mdb-input placeholder="Position Y"  v-model="valuePosY"  class="mt-0 mb-3" ariaLabel="valuePosY" ariaDescribedBy="valuePosY">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="valuePosY" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </mdb-input>
                    </mdb-col>
                  </mdb-row>
                </div>

                <mdb-row>
                  <mdb-col xl="12" class="pb-2">

                    <div style="width:100%">
                      <mdb-file-upload  v-show="templateImage.length == 0" :files="imageUpload"  @change="handleImageChange" class="mt-0 mb-3 width90" />
                      <img v-bind:src="getImagePath(templateImage)" >
                    </div>
                  </mdb-col>
                </mdb-row>
                <!--END IMAGE VALUES-->

                <mdb-row v-if="data_type == 'matrix'">
                  <mdb-col xl="12" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <mdb-btn color="geccomButtonInfo" size="sm" group slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>
                      <div>
                        <FileCsvUpload @update-matrix="updateMatrix"></FileCsvUpload>
                      </div>
                      <div v-if="isObject(propertiesValue[currentSelectedProperty])">
                        <mdb-tbl bordered hover v-if="propertiesValue[currentSelectedProperty].matrix !== undefined">
                          <mdb-tbl-head>
                            <tr>
                              <th>#</th>
                              <th>CSV Name</th>
                              <th>Actions</th>
                            </tr>
                          </mdb-tbl-head>
                          <mdb-tbl-body>
                            <tr v-for="matrixKey in Object.keys(propertiesValue[currentSelectedProperty].matrix)" class="file-listing">
                              <th scope="row"><mdb-icon icon="file-csv" /></th>
                              <td>{{ matrixKey }}</td>
                              <td>
                                <mdb-tooltip :options="{placement: 'top'}">
                                  <span slot="tip">CSV löschen</span>
                                  <mdb-btn color="geccomButtonTransparent" slot="reference"  v-on:click="removeFile( matrixKey )" icon="trash"></mdb-btn>
                                  <mdb-btn color="geccomButtonTransparent" slot="reference"  v-on:click="goToMatrixView(propertiesValue[currentSelectedProperty]['matrix'][matrixKey])" icon="edit"></mdb-btn>
                                </mdb-tooltip>
                              </td>
                            </tr>
                          </mdb-tbl-body>
                        </mdb-tbl>
                      </div>
                    </div>
                  </mdb-col>
                </mdb-row>

                <!--START MATRIX VALUES-->
                <div v-if="data_type == 'matrix'">
                  <table class="table">
                    <tbody>
                    <tr>
                      <td><mdb-select search @getValue="getChooseValueForMatrix" :options="chooseMatrixValue" v-model="chooseValueForMatrix" class="mt-0 mb-3 width90"  size="sm" ariaDescribedBy="fieldTypeslabel" /></td>
                      <td><mdb-select search @getValue="getChooseMatrixPriceCalculation" :options="setMatrixPriceCalculation" v-model="matrixPriceCalculation" class="mt-0 mb-3 width90"  size="sm" ariaDescribedBy="fieldTypeslabel" /></td>
                      <td><mdb-select search @getValue="getMatrixDimensionXValue" :options="matrixSelectDimensionX" v-model="matrixDimensionX" class="mt-0 mb-3 width90"  size="sm" ariaDescribedBy="fieldTypeslabel" /></td>
                      <td><mdb-select search @getValue="setMatrixOperatorXValue" :options="setMatrixSelectOperatorX" v-model="matrixOperatorX" class="mt-0 mb-3 width90"  size="sm" ariaDescribedBy="fieldTypeslabel" /></td>
                      <td><mdb-select search @getValue="getMatrixDimensionYValue" :options="matrixSelectDimensionY" v-model="matrixDimensionY" class="mt-0 mb-3 width90"  size="sm" ariaDescribedBy="fieldTypeslabel" /></td>
                      <td><mdb-select search @getValue="setMatrixOperatorYValue" :options="setMatrixSelectOperatorY" v-model="matrixOperatorY" class="mt-0 mb-3 width90"  size="sm" /></td>
                      <td class="text-right">
                        <mdb-tooltip :options="{placement: 'top'}">
                          <span slot="tip">Neuen Wert anlegen</span>
                          <mdb-btn color="geccomButtonInfo" slot="reference" @click="addNewMatrixOptionForm"><mdb-icon icon="plus" /></mdb-btn>
                        </mdb-tooltip>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <mdb-row v-for="(attachedMatrix, attachedMatrixIndex) in matrixAttachedToProperty">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td>{{attachedMatrix.matrixName}}</td>
                        <td>{{attachedMatrix.matrixPriceCalculation}}</td>
                        <td>{{attachedMatrix.matrixDimensionX}}</td>
                        <td>{{attachedMatrix.matrixOperatorX}}</td>
                        <td>{{attachedMatrix.matrixDimensionY}}</td>
                        <td>{{attachedMatrix.matrixOperatorY}}</td>
                        <td class="text-right">
                          <mdb-tooltip :options="{placement: 'top'}">
                            <span slot="tip">Wert editieren</span>
                            <mdb-btn color="geccomButtonTransparent" slot="reference" @click="openEditConfigurationOptionModal(index)" icon="edit"></mdb-btn>
                          </mdb-tooltip>

                          <mdb-tooltip :options="{placement: 'top'}">
                            <span slot="tip">Wert löschen</span>
                            <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deleteAttachedMatrixItem(attachedMatrixIndex)" icon="trash"></mdb-btn>
                          </mdb-tooltip>

                          <mdb-tooltip :options="{placement: 'top'}">
                            <span slot="tip">Wert duplizieren</span>
                            <mdb-btn slot="reference" color="geccomButtonTransparent" size="sm" icon="copy"></mdb-btn>
                          </mdb-tooltip>

                          <mdb-tooltip :options="{placement: 'top'}">
                            <span slot="tip">Wert Einstellungen</span>
                            <mdb-btn slot="reference" color="geccomButtonTransparent" @click="goToSettingsCharacteristicsModal(index)" size="sm" icon="cog"></mdb-btn>
                          </mdb-tooltip>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </mdb-row>
                </div>
                <!--END MATRIX VALUES-->

              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Produkt Informationen</mdb-card-header>
              <mdb-card-body>
                <mdb-row>
                  <mdb-col xl="6"  md="6" sm="12" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <mdb-btn color="geccomButtonInfo" size="sm" group slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>

                      <mdb-row>
                        <mdb-col xl="12">
                          <h3>Informationen</h3>
                        </mdb-col>
                      </mdb-row>
                    </div>
                    <mdb-row>
                      <mdb-col xl="12">
                        <fullscreen ref="fullscreenInformationEditor" @change="fullscreenChangeInformation">
                          <mdb-wysiwyg ref="propertyInformation"></mdb-wysiwyg>
                        </fullscreen>
                        <button type="button" @click="toggleInformation" ><mdb-icon icon="expand" /></button>
                      </mdb-col>
                    </mdb-row>
                  </mdb-col>

                  <mdb-col xl="6"  md="6" sm="12" class="pb-2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <mdb-btn color="geccomButtonInfo" size="sm" group slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                      </div>
                      <mdb-row>
                        <mdb-col xl="12">
                          <h3>Zusätzliche Informationen</h3>
                        </mdb-col>
                      </mdb-row>
                    </div>
                    <mdb-row>
                      <mdb-col xl="12">
                        <fullscreen ref="fullscreenAdditionalInformationEditor" @change="fullscreenChangeAdditionalInformation">
                          <mdb-wysiwyg ref="propertyAdditionalInformation"></mdb-wysiwyg>
                        </fullscreen>
                        <button type="button" @click="toggleAdditionalInformation" ><mdb-icon icon="expand" /></button>
                      </mdb-col>
                    </mdb-row>
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col class="mt-5">
            <h2 class="display-5">Merkmalwerte Einstellungen</h2>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-3" v-if="data_type === 'select' ||  data_type === 'imagelist' || data_type === 'check'|| data_type === 'radio'">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Werteliste  combined image, radio, checkbox, select</mdb-card-header>
              <mdb-card-body>
                <mdb-row class="d-flex justify-content-center">
                  <mdb-col xl="12">
                    <div v-if="data_type === 'select' ||  data_type === 'imagelist' || data_type === 'check'|| data_type === 'radio'">
                      <!--<file-drag-drop-instant></file-drag-drop-instant> -->
                      <div id="container-combined-image">
                        <table class="table">
                          <tbody>
                          <tr>
                            <td><mdb-input v-model="selectBoxTitle" name="selectBoxTitle"  type="text" placeholder="Titel" /></td>
                            <td><mdb-input v-model="selectBoxValue" name="selectBoxValue" type="text" placeholder="Wert" /></td>
                            <td><mdb-input v-model="selectBoxPrice" name="selectBoxPrice" type="number" placeholder="Preis" /></td>
                            <td class="text-right">
                              <mdb-tooltip :options="{placement: 'top'}">
                                <span slot="tip">Neuen Wert anlegen</span>
                                <mdb-btn color="geccomButtonInfo" slot="reference" @click="addNewOptionForm"><mdb-icon icon="plus" /></mdb-btn>
                              </mdb-tooltip>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <thead>
                          <tr>
                            <th>#</th>
                            <th>Titel</th>
                            <th>Wert</th>
                            <th>Preis</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(selectbox,index) in selectBoxData">
                            <td>{{ index }}</td>
                            <td>{{selectbox.title}}</td>
                            <td>{{selectbox.value}}</td>
                            <td>{{selectbox.price}}</td>
                            <td class="text-right">
                              <mdb-tooltip :options="{placement: 'top'}">
                                <span slot="tip">Wert editieren</span>
                                <mdb-btn color="geccomButtonTransparent" slot="reference" @click="openEditConfigurationOptionModal(index)" icon="edit"></mdb-btn>
                              </mdb-tooltip>

                              <mdb-tooltip :options="{placement: 'top'}">
                                <span slot="tip">Wert löschen</span>
                                <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deletePropertyOptionItem(index)" icon="trash"></mdb-btn>
                              </mdb-tooltip>

                              <mdb-tooltip :options="{placement: 'top'}">
                                <span slot="tip">Wert duplizieren</span>
                                <mdb-btn slot="reference" color="geccomButtonTransparent" size="sm" icon="copy"></mdb-btn>
                              </mdb-tooltip>

                              <mdb-tooltip :options="{placement: 'top'}">
                                <span slot="tip">Wert Einstellungen</span>
                                <mdb-btn slot="reference" color="geccomButtonTransparent" @click="goToSettingsCharacteristicsModal(index)" size="sm" icon="cog"></mdb-btn>
                              </mdb-tooltip>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-else-if="data_type == 'expression'">
                      <fullscreen ref="fullscreenAceEditorMatrix" @change="fullscreenChangeAceMatrix" style="height:150px;">
                        <AceEditor
                          v-model="expression"
                          :fontSize="14"
                          :showPrintMargin="true"
                          :showGutter="true"
                          :highlightActiveLine="true"
                          mode="javascript"
                          theme="chrome"
                          :onChange="onChange"
                          name="editor"
                          :editorProps="{$blockScrolling: true}"
                          height="100%"
                          width="100%"
                        />
                      </fullscreen>
                      <button type="button" @click="toggleAceMatrix"><mdb-icon icon="expand" /></button>
                    </div>
                    <!--
                    <div v-else-if="data_type === 'matrix'">
                      <mdb-file-upload height="500"/>
                    </div> -->
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed"  @click.native="characteristicsValuesModal = false">Schließen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="savePropertyValue(currentSelectedProperty)">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Characteristics Values  -->

    <!--    Start Modal Rule          -->
    <mdb-modal class="modalOptionValues" size="lg" centered v-if="ruleModal" @close="ruleModal = false">
      <mdb-modal-header>
        <div class="container-fluid">
          <mdb-row>
            <mdb-col sm="6">
              <mdb-modal-title>Neue Regel erstellen</mdb-modal-title>
            </mdb-col>
            <mdb-col sm="6">
              <mdb-tooltip :options="{placement: 'top'}" class="float-right">
                <span slot="tip">Neue Regel erstellen</span>
                <!--<mdb-btn color="geccomButtonInfo" slot="reference" @click="addNewRule()"><mdb-icon icon="plus" /> Neue Regel erstellen</mdb-btn>-->
                <mdb-btn color="geccomButtonGreen" @click="addNewRule()" icon="plus">Neue Regel erstellen</mdb-btn>
              </mdb-tooltip>
            </mdb-col>
          </mdb-row>
        </div>
      </mdb-modal-header>
      <mdb-modal-body>

        <div v-for="(ruleItem, index) in newRule">
          <mdb-row>
          <mdb-col md="10">
                <mdb-collapse :toggleTag="['button']" :togglers="1" :toggleClass="['btn btn-geccomButtonGreen ripple-parent']" :toggleText="[`${currentSelectedProperty} Regel ${index+1}` ]">
                  <mdb-card class="card-body">
                    <mdb-card-title class="gcm-cardTitle">
                      <mdb-row>
                      <mdb-col md="10">
                      Bedingung
                      </mdb-col>
                      <mdb-col md="2">
                      <select class="browser-default custom-select gcm-selectFontSize">
                        <option disabled>Typ</option>
                        <option value="1">Restriktion</option>
                        <option value="2">Vorbelegung von Min und Max für Mengen</option>
                        <option value="3">Vorbelegung von Werten</option>
                        <option value="4">Meldung</option>
                      </select>
                      </mdb-col>
                      </mdb-row>
                    </mdb-card-title>
                    <div class="container-fluid gcm-container-fluid">
                      <mdb-row>
                        <mdb-col md="6">
                          <mdb-btn-group>
                            <mdb-btn size="sm" color="blue-grey" @click.native="toggleActiveStateAnd" :active="activeAnd">und</mdb-btn>
                            <mdb-btn size="sm" color="blue-grey" @click.native="toggleActiveStateOr" :active="activeOr">oder</mdb-btn>
                          </mdb-btn-group>
                        </mdb-col>
                        <mdb-col md="6">
                          <div class="float-right">
                            <mdb-btn color="blue-grey" @click="addRowCondition(index)" size="sm" icon="plus"> Neue Bedingung</mdb-btn>
                            <mdb-btn color="blue-grey" @click="addRowConditionGroup" size="sm" icon="plus"> Neue Gruppe</mdb-btn>
                          </div>
                        </mdb-col>
                      </mdb-row>
                      <mdb-row class="ruleRow gcm-hoverableRow"  v-for="(inputCond, index) in newCondition">
                        <mdb-col md="2">
                          <div class="gcm-conditionBorder"></div>
                          <select class="browser-default custom-select" v-model="newConditionModel[getConditionIndex(ruleItem.id,inputCond.id)].value"  :id="`condition_model_${ruleItem.id}_${inputCond.id}`" @change="onChangePropertyRule(newConditionModel[getConditionIndex(ruleItem.id,inputCond.id)].value, ruleItem.id, inputCond.id)">
                            <option disabled>Merkmalauswahl</option>
                            <option v-for="option in allProperties" >{{ option.name }}</option>
                          </select>
                        </mdb-col>
                        <mdb-col md="2">
                          <select class="browser-default custom-select" v-model="conditionTypes[getConditionTypeIndex(ruleItem.id,inputCond.id)].value" :id="`condition_model_${ruleItem.id}_${inputCond.id}`" @change="onChangeConditionType(conditionTypes[getConditionTypeIndex(ruleItem.id,inputCond.id)].value)">
                            <option disabled>Bedingungen</option>
                            <option value="1">Hat einen der Werte</option>
                            <option value="2">Hat keinen der Werte</option>
                            <option value="3">Hat keinen Wert</option>
                            <option value="4">Hat einen beliebigen Wert</option>
                          </select>
                        </mdb-col>
                        <mdb-col md="7">
                          <mdb-form-inline class="gcm-ruleCheckbox">
                            <div v-for="(propertyItemValue, index) in getPropertyItemValue(ruleItem.id,inputCond.id)">
                              <input type="checkbox" class="form-check-input" :id="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.title}`" v-model="checkboxItem.checkboxVlues" :value="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.title}`">
                              <label class="form-check-label" :for="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.title}`">{{propertyItemValue.title}}</label>
                            </div>
                          </mdb-form-inline>
                        </mdb-col>
                        <mdb-col md="1">
                          <mdb-btn color="geccomButtonRed" @click="deleteRowCondition" size="sm" icon="trash"></mdb-btn>
                        </mdb-col>
                      </mdb-row>
                    </div>
                  </mdb-card>
                  <hr>
                  <mdb-card class="card-body">
                    <mdb-card-title class="gcm-cardTitle">Restriktion</mdb-card-title>
                    <div class="container-fluid gcm-container-fluid">
                      <mdb-row>
                        <mdb-col md="10">
                      <mdb-collapse :toggleTag="['button']" :togglers="1" :toggleClass="['btn btn-blue-grey btn-sm ripple-parent']" :toggleText="['Gruppenname']">
                        <mdb-row class="gcm-hoverableRow">
                          <mdb-col md="6">
                            <mdb-input type="checkbox" class="gcm-checkboxMargin" id="checkbox111" name="check1" label="Merkmal 777" />
                            <mdb-input type="checkbox" class="gcm-checkboxMargin" id="checkbox2323" name="check2" label="Merkmal 888" />
                          </mdb-col>
                          <mdb-col md="6">
                            <mdb-collapse :toggleTag="['button']" :togglers="1" :toggleClass="['btn btn-blue-grey btn-sm ripple-parent']" :toggleText="['Merkmalwerte']">
                                <input type="checkbox" class="form-check-input" id="materialIndeterminate2" checked>
                                <label class="form-check-label" for="materialIndeterminate2">Material indeterminate</label>
                              <br><br>
                            </mdb-collapse>
                          </mdb-col>
                        </mdb-row>
                      </mdb-collapse>
                        </mdb-col>
                        <mdb-col md="2">
                        <mdb-btn color="blue-grey" size="sm">restriktion für alle setzen</mdb-btn>
                        </mdb-col>
                      </mdb-row>
                    </div>
                  </mdb-card>
                </mdb-collapse>
          </mdb-col>
            <mdb-col md="2" class="gcm-colHeight">
              <mdb-btn color="geccomButtonRed" @click="deleteNewRule" size="sm" icon="trash">Regel löschen</mdb-btn>
            </mdb-col>
        </mdb-row>
        </div>

      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click="ruleModal = false">Schließen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="saveGroupName">Speichern</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Rule  -->



    <!--    Start Modal Doku  Id       -->
    <mdb-modal class="modalOptionValues" v-if="docuIdModal" @close="mdocuIdModalodal = false">
      <mdb-modal-header>
        <mdb-modal-title>Modal title</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>

        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" src="http://support.geccom-media.de:8080" allowfullscreen></iframe>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click.native="docuIdModal = false">Schließen</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--    End Modal Doku Id -->

    <!-- START MODAL DELETE CHARACTERISTICS -->

    <mdb-modal danger v-if="confirmDeleteCharacteristicsModal" @close="confirmDeleteCharacteristicsModal = false" class="text-center">
      <mdb-modal-header center :close="false">
        <p class="heading">Wollen Sie das Merkmal wirklich löschen?</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click="confirmDeletePropertyOptionItem">Löschen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="confirmDeleteCharacteristicsModal = false">Abbrechen</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- END MODAL DELETE CHARACTERISTICS -->


    <!-- START MODAL SETTINGS CHARACTERISTICS -->

    <mdb-modal size="fluid"  v-if="settingsCharacteristicsModal" @close="settingsCharacteristicsModal = false" class="text-left">
      <mdb-modal-header center :close="false">
        <p class="heading"><h2 class="display-5"><span class="geccomTextColor supportFontSize"><img src="../assets/geccom-icon.png" class="img-fluid geccomIcon">geccom</span>Merkmalwerte Einstellungen</h2></p>
      </mdb-modal-header>
      <mdb-modal-body>

        <mdb-row class="mb-3">
          <mdb-col xl="12">
            <mdb-card>
              <mdb-card-header color="success-color">Machen Sie hier Ihre Einstellungen</mdb-card-header>
              <mdb-card-body>
                <mdb-row class="d-flex justify-content-center">
                  <mdb-col xl="12">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td><mdb-input type="text" placeholder="Titel" v-model="configuration_title" /></td>
                        <td><mdb-input type="text" placeholder="Wert" v-model="configuration_value" /></td>
                        <td><mdb-input type="number" placeholder="Preis" v-model="configuration_price" /></td>
                        <td><mdb-input type="text" placeholder="SKU" v-model="configuration_sku" /></td>
                      </tr>
                      </tbody>
                    </table>
                    <table class="table">
                      <tbody>
                      <tr>
                        <td><mdb-input  type="text" placeholder="Bildbreite" v-model="configuration_image_width" /></td>
                        <td><mdb-input  type="text" placeholder="Bildhöhe" v-model="configuration_image_height" /></td>
                        <td><mdb-input  type="number" placeholder="Bildposition X" v-model="configuration_position_x" /></td>
                        <td><mdb-input  type="text" placeholder="Bildposition Y" v-model="configuration_position_y" /></td>
                      </tr>
                      </tbody>
                    </table>
                    <mdb-file-upload v-show="configuration_image_name == undefined" :files="imageUpload"  ref="productBaseImage" @change="handleImageChange" class="mt-0 mb-3" />
                    <img v-bind:src="getImagePath(configuration_image_name)" :withd="configuration_image_width"  :height="configuration_image_height">
                  </mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click="saveOptionConfiguration">Speichern</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="settingsCharacteristicsModal = false">Abbrechen</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- END MODAL SETTINGS CHARACTERISTICS -->


    <!-- START MODAL SETTINGS CHARACTERISTICS -->

    <mdb-modal size="fluid" success v-if="matrixViewModal" @close="matrixViewModal = false" class="text-center">
      <mdb-modal-header center :close="false">
        <p class="heading">Matrix Data</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <div style="padding-left: 20px;">
          <table >
            <tr v-for="csv in matrixDataView">
              <td>{{csv.x}}</td>
              <td>{{csv.y}}</td>
              <td>{{csv.value}}</td>
            </tr>
          </table>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="geccomButtonRed" @click="goToDelete(groupname)">Löschen</mdb-btn>
        <mdb-btn color="geccomButtonGreen" @click.native="matrixViewModal = false">Abbrechen</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- END MODAL SETTINGS CHARACTERISTICS -->


  </mdb-row>
</template>
<script>
  import { mdbFormInline,mdbSwitch,mdbCollapse, mdbBtn, mdbModal,mdbBtnGroup, mdbBtnToolbar, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, Popover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody,mdbCard, mdbCardBody,mdbJumbotron,mdbSelect,FormInline,mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbCardTitle, mdbCardText,  mdbCardHeader} from 'mdbvue';
  import { cloneDeep, tap, set } from 'lodash'
  import FileCsvUpload from '@/datatypes/FileCsvUpload'
  import FileDragDropInstant from '@/datatypes/FileDragDropInstant'
  import ConfigSelect from '@/datatypes/ConfigSelect'
  import axios from 'axios';
  import mdbWysiwyg from 'mdb-wysiwyg';
  import brace from 'brace';
  import { Ace as AceEditor, Split as SplitEditor } from 'vue2-brace-editor';
  import 'brace/mode/javascript';
  import 'brace/theme/chrome';
  import Fullscreen from "vue-fullscreen/src/component.vue";
  import mdbFileUpload from 'mdb-file-upload';

  const obj = {};

  export default {
    components: {
      mdbFormInline,
      mdbSwitch,
      mdbCollapse,
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
      mdbIcon,
      FileDragDropInstant,
      FileCsvUpload,
      ConfigSelect,
      mdbBtnGroup, mdbBtnToolbar, mdbTbl, mdbTblHead, mdbTblBody,mdbCard,mdbCardBody,mdbJumbotron,mdbSelect,FormInline,mdbWysiwyg,AceEditor,
      SplitEditor,mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbCardTitle, mdbCardText,  mdbCardHeader,Fullscreen,mdbFileUpload
    },
    props: {
      showProduct: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      this.fetchProperty(localStorage.getItem('selectedTemplateId'));
    },
    data () {
      return {
        ruleModal:false,
        productModal: this.showProduct,
        dataTypes: [
          { text: 'Datentypen', value: null, disabled: true},
          { text: 'Checkbox', value: 'check' },
          { text: 'Liste mit Bilder', value: 'imagelist' },
          { text: 'Expression', value: 'expression' },
          { text: 'Matrix', value: 'matrix' },
          { text: 'ProductAttribute', value: 'productAttribute' },
          { text: 'Radio', value: 'radio' },
          { text: 'Select', value: 'select'},
          { text: 'Share', value: 'share' },
          { text: 'Text2Image', value: 'text2image' },
          { text: 'TextArea', value: 'textArea' },
          { text: 'TextField', value: 'textField' }
        ],
        standardValues: [
          { text: 'Standardwert', value: null, disabled: true, selected: true },
        ],
        combiValues: [
          { text: 'Combi', value: null, disabled: true},
        ],
        matrixSelectDimensionX: [
          { text: 'Dimension X', value: null, disabled: true, selected: true },
        ],
        setMatrixSelectOperatorX: [
          { text: 'Dimension X Operator', value: null, disabled: true, selected: true },
          { text: 'genaue Übereinstimmung', value: 'genaueUebereinstimmung' },
          { text: 'nächstgrößere Zahl', value: 'naechstGroessereZahl' },
          { text: 'nächstkleinere Zahl', value: 'naechstKleinereZahl' }
        ],
        matrixSelectDimensionY: [
          { text: 'Dimension Y', value: null, disabled: true, selected: true },
        ],
        setMatrixSelectOperatorY: [
          { text: 'Dimension Y Operator', value: null, disabled: true, selected: true },
          { text: 'genaue Übereinstimmung', value: 'genaueUebereinstimmung' },
          { text: 'nächstgrößere Zahl', value: 'naechstGroessereZahl' },
          { text: 'nächstkleinere Zahl', value: 'naechstKleinereZahl' }
        ],
        setMatrixPriceCalculation: [
          //{ text: 'Preisberechnung', value: 'Preisberechnung', disabled: true, selected: true },
          { text: 'Berechnung nach Preis', value: 'price' },
          { text: 'Berechnung nach Wert * Preis', value: 'pricevalue' },
        ],
        chooseMatrixValue: [
          { text: 'Matrix laden', value: null, disabled: true, selected: true },
        ],
        propertyItemValues : [],
        restApiDomain: localStorage.getItem('restApiDomain'),
        dragAndDropCapable: false,
        customerId: localStorage.getItem('customerId'),
        selectedTemplate: localStorage.getItem('selectedTemplate'),
        selectedTemplateId: localStorage.getItem('selectedTemplateId'),
        selectedTemplateFolder: localStorage.getItem('selectedTemplate').replace(/\s+/g,"_"),
        templates: (obj[localStorage.getItem('selectedTemplate')] = {groups: null, property: null, propertyValue: null}, obj),
        basePathRestApi: localStorage.getItem('basePath'),
        basePathImg: 'https://api.dmg-software.de/api/getImagePath/',
        conditionValue: {name: null, value:null, min:null, max: null},
        allowedValues: {name: null, value:null},
        conditionItem: {
          id: null, propertyId: null, propertyName: null, conditionBy: null , conditionValue:[], allowedValues: []
        },
        ruleItem: {id: null, condition: null},
        allRules :[] ,
        tpls : {},
        allTemplate: {},
        uploadPercentage: 0,
        matrixCollection: {},
        matrixDimensionY: '',
        matrixDimensionX: '',
        deleteOptionItemIndex: null,
        groupnames: [],
        properties: {},
        propertyGroup: {},
        propertiesValue: {},
        allProperties:[],
        encodedTemplate:{},
        lightbox:false,
        requiredField: '',
        requiredFieldChecked: false,
        requiredFieldCheckedOn: '',
        requiredFieldCheckedOff: '',
        activeField: '',
        hiddenFieldOn: '',
        hiddenFieldOff: '',
        fieldPosition: 0,
        valueField: '',
        fieldTitel: '',
        data_type: '',
        groupname: '',
        combiValue: '',
        modal: false,
        currentSelectedGroup: '',
        currentSelectedProperty: '',
        tplProperty: '',
        docuIdModal:false,
        groupModal: false,
        characteristicsModal: false,
        characteristicsValuesModal: false,
        matrixModal: false,
        configuratorModal:false,
        matrixDataView: {},
        matrixDataViewHeader: {},
        selectBoxData: [],
        selectBoxPosition:1,
        selectBoxPrice: '',
        selectBoxValue: '',
        selectBoxTitle: '',
        configurationData: {},
        configuration_js_id: '',
        configuration_title: '',
        configuration_price: null,
        configuration_value: '',
        configuration_image:null,
        configuration_image_name:'',
        configuration_image_width: '',
        configuration_image_height: '',
        configuration_position_y: '',
        configuration_position_x: '',
        configuration_sku: '',
        configuration_index: 0,
        deleteCharacteristicsModal: false,
        confirmDeleteCharacteristicsModal: false,
        settingsCharacteristicsModal: false,
        matrixViewModal: false,
        eyeGroup: false,
        max: 80,
        text: '',
        matrixFiles: [],
        fieldValue:'',
        handleRadio: null,
        valueHoehe: '',
        valueBreite:'',
        valuePosX:'',
        valuePosY:'',
        valueCssClass:'',
        plusOperator:'',
        minusOperator:'',
        multiplyOperator:'',
        divideOperator:'',
        allMatrixes: [],
        allTemplateIds: [],
        expression:'',
        imageUpload: [],
        imageUploadName: [],
        operatorCombi: '',
        propertyInformation: '',
        propertyAdditionalInformation: '',
        standardValue: '',
        matrixOperatorX: '',
        matrixOperatorY: '',
        fieldId: '',
        matrixAttachedToProperty: [],
        templateImage: '',
        matrixPriceCalculation: '',
        newCondition: [],
        newConditionGroup:[],
        newRule:[],
        activeAnd: false,
        activeOr: false,
        newConditionModel: [],
        newConditionValue: [],
        allPropertyValues: {},
        conditionTypes:[],
        checkboxItem: {
          checkboxVlues: []
        },
      }
    },
    addTpl:{
    },
    methods: {
      getPropertyItemValue(ruleItemId, inputCondId) {
        if(this.propertyItemValues[this.getConditionPropertyItemValuesIndex(ruleItemId, inputCondId)] != undefined) {
          return this.propertyItemValues[this.getConditionPropertyItemValuesIndex(ruleItemId, inputCondId)].value;
        } else {
          return [];
        }
      },
      containsObject(propertyId, rule) {
        let x;
        for (x= 0 ; x < this.newConditionModel.length; x++) {
          if (this.newConditionModel[x].column == rule && this.newConditionModel[x].row  == propertyId) {
            return true;
          }
        }

        return false;
      },
      getConditionIndex(row, column) {
        return this.newConditionModel.findIndex(c => c.row == row && c.column == column);
      },
      getConditionPropertyItemValuesIndex(row, column) {
        return this.propertyItemValues.findIndex(c => c.row == row && c.column == column);
      },
      getConditionTypeIndex(row, column) {
        return this.conditionTypes.findIndex(c => c.row == row && c.column == column);
      },
      getCheckboxVluesIndex(row, column) {
        return this.checkboxVlues.findIndex(c => c.row == row && c.column == column);
      },
      onChangePropertyRule(value, rowId, columnId) {
        let propertyItemValues = this.getItemsFromProperty(value);
        let propertyItemId = this.getConditionPropertyItemValuesIndex(rowId, columnId);
        if(propertyItemId != -1) {
          this.propertyItemValues[propertyItemId] = {row:rowId, column:columnId, value: propertyItemValues};
        } else {
          this.propertyItemValues.push({row:rowId, column:columnId, value: propertyItemValues});
        }
        console.log(JSON.stringify(this.propertyItemValues));
        console.log("propertyItemValues:::"+JSON.stringify(this.propertyItemValues));
      },
      onChangeConditionType(conditionType) {

        console.log("conditionType:::"+conditionType);
        console.log("conditionTypes:::"+JSON.stringify(this.conditionTypes));
      },
      selectPropertyForRule(selectValue) {
        console.log("sasa"+selectValue);
      },
      toggleActiveStateAnd() {
        this.activeAnd = true;
        this.activeOr = false;
      },
      toggleActiveStateOr() {
        this.activeAnd = false;
        this.activeOr = true;
      },
      addNewRule() {
          /*console.log("KOKO::"+this.currentSelectedProperty+"_"+this.allRules.length);
          this.allRules.push({
            propertyId: this.currentSelectedPropertyIndex,
            property: this.currentSelectedProperty+"_"+this.allRules.length,
            rule:[]
          })*/
        this.newRule.push({
          id: this.newRule.length,
          condition: []
        });
        console.log("KOKO::"+JSON.stringify(this.newRule));
      },
      addRowCondition(index) {
        /*
        this.newCondition.push({
          rule: this.newCondition.length+1
        })*/
        /*
        this.allRules.push({
          rule: this.newCondition.length+1
        })*/

        this.newCondition.push({
          id: this.newCondition.length, propertyId: null, propertyName: null, conditionBy: null , conditionValue:[], allowedValues: []
        });

        console.log("kokoko-:::"+JSON.stringify(this.newCondition));
      },
      deleteNewRule(index) {
        this.allRules.splice(index,1)
      },
      deleteRowConditionGroup(index) {
        this.newConditionGroup.splice(index,1)
      },
      deleteRowCondition(index) {
        this.newCondition.splice(index,1)
      },
      addRowConditionGroup() {
        this.newConditionGroup.push({
          one: ''
        })
      },
      getImagePath(imgName) {
        let srcPath = '';
        if(imgName != undefined && imgName.length != 0 ) {
          srcPath = this.basePathImg+this.customerId+"/"+"templateId/"+this.selectedTemplateId+"/image/"+imgName;
        }
        return srcPath;
      },
      isObject: function(o) {
        return typeof o == "object"
      },
      handleRadioRequiredField(newValue) {
        this.requiredField = newValue;
      },
      handleActiveFieldRadio(newValue) {
        this.activeField = newValue;
      },
      removeFile( removingKey ){
        Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
          if(propertyObj.text == removingKey) {
            this.chooseMatrixValue.splice(key,1);
          }
        });

        Object.entries(this.propertiesValue[this.currentSelectedProperty].matrix).forEach(([key, propertyObj]) => {
          if(removingKey == key){
            this.removeKeys(this.propertiesValue[this.currentSelectedProperty].matrix, key);
          }
        });
      },
      goToDeleteOption() {

      },
      removeKeys(obj, keys){
        var index;
        for (var prop in obj) {
          // important check that this is objects own property
          // not from prototype prop inherited
          if(obj.hasOwnProperty(prop)){
            switch(typeof(obj[prop])){
              case 'string':
                index = keys.indexOf(prop);
                if(index > -1){
                  delete obj[prop];
                }
                break;
              case 'object':
                index = keys.indexOf(prop);
                if(index > -1){
                  delete obj[prop];
                }else{
                  this.removeKeys(obj[prop], keys);
                }
                break;
            }
          }
        }
      },
      deletePropertyOptionItem(deleteOptionItemIndex) {
        this.confirmDeleteCharacteristicsModal = true;
        this.deleteOptionItemIndex = deleteOptionItemIndex;
      },
      confirmDeletePropertyOptionItem() {
        Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
          if(this.deleteOptionItemIndex == key) {
            this.selectBoxData.splice(key,1);
          }
        });
        this.confirmDeleteCharacteristicsModal = false;
      },
      deleteAttachedMatrixItem(item) {
        this.matrixAttachedToProperty.splice(item,1);
      },
      getSelectValue(data_type){
        console.log(data_type);
      },
      toggleAce () {
        this.$refs['fullscreenAceEditor'].toggle()
      },
      fullscreenChangeAce (fullscreenAceEditor) {
        this.fullscreenAceEditor = fullscreenAceEditor;
      },
      toggleInformation () {
        this.$refs['fullscreenInformationEditor'].toggle()
      },
      fullscreenChangeInformation (fullscreenInformationEditor) {
        this.fullscreenInformationEditor = fullscreenInformationEditor
      },
      toggleAdditionalInformation () {
        this.$refs['fullscreenAdditionalInformationEditor'].toggle()
      },
      fullscreenChangeAdditionalInformation (fullscreenAdditionalInformationEditor) {
        this.fullscreenAdditionalInformationEditor = fullscreenAdditionalInformationEditor
      },
      onChangeExpression(newValue) {
        this.expression = newValue;
      },
      handleMatrixChange(v) {
        this.matrixFiles = v;
      },
      selectOption(key) {
        this.dataTypes.forEach(option => {
          option.selected = false;
        });
        this.$set(this.dataTypes[key], 'selected', true);
        this.dataTypes.sort();
      },
      getChooseMatrixPriceCalculation(newValue) {
        console.log("newValue:::"+newValue);
        this.matrixPriceCalculation = newValue;
      },
      selectOptionStandardValue(key) {
        this.standardValues.forEach(option => {
          option.selected = false;
        });
        this.$set(this.standardValues[key], 'selected', true);
        this.standardValues.sort();
      },
      goToMatrixView(matrixData) {
        this.matrixDataView = matrixData;
        this.matrixViewModal = true;
      },
      getItemsFromProperty(value) {
        let self= this;
        let itemValues = null ;
        Object.values(self.allPropertyValues).forEach(function (keyObj) {
          if(value == keyObj.name && (keyObj.data_type == "radio"
              || keyObj.data_type == "select" || keyObj.data_type == "imagelist" || keyObj.data_type == "check")
          ) {
            itemValues = JSON.parse(atob(keyObj.additionalData));
          }
        });
        return itemValues;
      },
      getPropertyNameBy(id){
        let self = this;
        let propertyName = '';

        Object.values(this.allProperties).forEach(function (keyObj) {
            if(keyObj.id == id) {
              propertyName = keyObj.name;
            }
        });
        return propertyName;
      },
      handleImageChange(imageFile) {
        //this.$refs['preview'+parseInt( i )][0].src = reader.result;
        for (let i = 0; i < imageFile.length; i++) {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            let formData = new FormData();
            let imageUniqueName = Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)+'-'+imageFile[i].name;
            this.templateImage = imageUniqueName;
            this.configuration_image_name = imageUniqueName;
            formData.append('name', imageUniqueName);
            //formData.append('template', this.selectedTemplate.replace(/\s+/g, "_"));
            formData.append('directory', this.customerId);
            formData.append('templateId', this.selectedTemplateId);
            formData.append('imageBlob', reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            axios.post(this.restApiDomain+'/api/image',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(response) {
              //console.log('SUCCESS!!'+JSON.stringify(response));
            })
              .catch(function() {
                console.log('FAILURE!!');
              });
          });
          reader.readAsDataURL(imageFile[i])
        }

        //this.$emit('update-upload-option-image-name', imageUniqueName);
      },
      goToSettingsCharacteristicsModal(indexConfig) {
        this.configuration_index = indexConfig;
        this.settingsCharacteristicsModal = true;
      },
      saveOptionConfiguration() {
        this.configurationData =
          {
            "price": this.configuration_price, 'title': this.configuration_title, 'value':this.configuration_value,
            "image_name": this.configuration_image_name, "image_width": this.configuration_image_width, "image_height": this.configuration_image_height,
            "position_x": this.configuration_position_x, "position_y": this.configuration_position_y, "sku": this.configuration_sku
          };
        //this.selectBoxData[this.configuration_index].configuration = this.configurationData;
        this.selectBoxData[this.configuration_index] = this.configurationData;
        this.settingsCharacteristicsModal = false;
      },
      fetchProperty(selectedTemplateId) {
        let self = this;
        let dataTypes  = this.dataTypes;
        let currentSelectedProperty = this.currentSelectedProperty;

        axios.get(this.restApiDomain+"/api/tplproperies/"+selectedTemplateId)
          .then((response)  =>  {
            this.loading = false;
            let encodedProperties = atob(response.data['properties']);
            let encodedGroups = atob(response.data['groups']);
            let encodedpropertyValue = atob(response.data['propertyValue']);
            let basePath = response.data['basePath'];

            self.groupnames = JSON.parse(encodedGroups);
            self.propertyGroup = JSON.parse(encodedProperties);
            self.propertiesValue = JSON.parse(encodedpropertyValue);

            Object.keys(self.propertyGroup).forEach(function (keyObj) {
              Object(self.propertyGroup[keyObj]).forEach(function (keyObj1) {
                self.allProperties.push(keyObj1);
              });
            });

            console.log(JSON.stringify(this.allProperties));

            if(JSON.stringify(self.groupnames) != "[]") {
              self.currentSelectedGroup = self.groupnames[0].name;
            }

            if(JSON.stringify(self.groupnames) != "[]") {
              self.currentSelectedProperty = self.propertyGroup[self.currentSelectedGroup][0].name;
            }

            if(self.propertiesValue != null && this.propertiesValue != undefined &&
                    self.propertiesValue[self.currentSelectedProperty] != null
            ) {
              let dataMatrixDB = self.propertiesValue[self.currentSelectedProperty].matrix;
              let dataMatrix = {};

              if(dataMatrixDB != undefined) {
                Object.keys(dataMatrixDB).forEach(function (key) {
                  let decodedString = JSON.parse(atob(dataMatrixDB[key]));
                  dataMatrix[key] = decodedString;
                });
                self.propertiesValue[self.currentSelectedProperty].matrix = dataMatrix;
              }
            }

            if(self.propertiesValue != null &&  self.propertiesValue != undefined &&
                    self.propertiesValue[self.currentSelectedProperty] != null
            ) {
              let dataSelectDB = self.propertiesValue[self.currentSelectedProperty].selectBox;
              if(dataSelectDB != undefined) {
                let selectBocDecodedString = JSON.parse(atob(dataSelectDB));
                self.propertiesValue[self.currentSelectedProperty].selectBox = selectBocDecodedString;
              }
            }

            self.allPropertyValues = self.propertiesValue;
          }, (error)  =>  {
            console.log(error);
            this.allTemplate = false;
          });
      },
      getSelectValueDataTypes(value, text) {
        this.data_type = value;
      },
      getStandardValue(value, text) {
        this.standardValue = value;
      },
      getCombiValuelabel(value, text) {
        this.combiValue = value;
      },
      getChooseValueForMatrix(value, text) {
        this.chooseValueForMatrix= value;
        /*
        if(value != null) {
          Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
            if(value == propertyObj.value) {
              this.chooseMatrixValue.splice( key, 1);
              console.log(value);
            }
          });
        }*/
      },
      getMatrixDimensionXValue(value, text) {
        this.matrixDimensionX = value;
      },
      getMatrixDimensionYValue(value, text) {
        this.matrixDimensionY = value;
      },
      setMatrixOperatorXValue(value, text) {
        this.matrixOperatorX = value;
      },
      setMatrixOperatorYValue(value, text) {
        this.matrixOperatorY = value;
      },
      chooseValueForMatrix() {

      },
      addNewOptionForm: function() {
        let indexSelectBox = 0;
        if(this.selectBoxData.length != 0) {
          indexSelectBox = Object.keys(this.selectBoxData).length;
          console.log(indexSelectBox);
        }

        // this.selectBoxData[indexSelectBox] = {title: this.selectBoxTitle, value: this.selectBoxValue, price :this.selectBoxPrice, configuration: null};
        this.selectBoxData[indexSelectBox] = {title: this.selectBoxTitle, value: this.selectBoxValue, price :this.selectBoxPrice};
        if(this.selectBoxTitle != null) {
          this.standardValues[parseInt(this.standardValues.length)]= { text: this.selectBoxTitle, value: this.selectBoxValue };
        }

        //this.$emit('update-select-box', this.selectBox);
        this.selectBoxValue = '';
        this.selectBoxTitle = '';
        this.selectBoxPrice = '';
      },
      addNewMatrixOptionForm: function() {
        this.matrixAttachedToProperty.push({matrixName: this.chooseValueForMatrix, matrixDimensionX: this.matrixDimensionX, matrixOperatorX :this.matrixOperatorX, matrixDimensionY: this.matrixDimensionY, matrixOperatorY: this.matrixOperatorY, matrixPriceCalculation: this.matrixPriceCalculation});
        //this.$emit('update-select-box', this.selectBox);
      },
      getDataTypesValue(value, text) {
        console.log(value);
      },
      ruleList() {
        /*
        console.log("KOkKO:"+this.currentSelectedProperty);
        console.log("KOkKO:"+this.currentSelectedPropertyIndex);
        this.newRule.push({
          propertyId: this.currentSelectedPropertyIndex,
          rule: []
        });*/
        this.ruleModal = true
      },
      openGroupModal() {
        this.groupModal = true
      },
      openCharacteristicsModal() {
        console.log("koko::");
        this.characteristicsModal = true
      },

      openAddCharacteristicsValuesModal(propertyId) {
        this.characteristicsValuesModal = true;
        this.clearAllFileds();
        this.fetchPropertyValue(propertyId);
      },
      openCharacteristicsValuesModal(propertyId) {
        this.characteristicsValuesModal = true;
        this.clearAllFileds();
        this.fetchPropertyValue(propertyId);
      },
      openEditConfigurationOptionModal(index) {
        this.settingsCharacteristicsModal = true;
        console.log("this.selectBoxData[index]::"+JSON.stringify(this.selectBoxData[index]));
        this.configuration_index = index;
        this.configuration_title = this.selectBoxData[index].title;
        this.configuration_value = this.selectBoxData[index].value;
        this.configuration_price = this.selectBoxData[index].price;

        this.configuration_sku = this.selectBoxData[index].sku;
        this.configuration_image_name = this.selectBoxData[index].image_name;
        this.configuration_image_width = this.selectBoxData[index].image_width;
        this.configuration_image_height = this.selectBoxData[index].image_height;
        this.configuration_position_x = this.selectBoxData[index].position_x;
        this.configuration_position_y = this.selectBoxData[index].position_y;

        //this.configuration_value = selectbox.
        //this.fetchPropertyValue(propertyId);
      },
      openCreateConfigurationOptionModal(propertyId) {
        this.characteristicsValuesModal = true;
        this.fieldTitel = this.propertiesValue[this.currentSelectedProperty].titel;
        this.fieldId = this.propertiesValue[this.currentSelectedProperty].name;
        this.data_type = this.propertiesValue[this.currentSelectedProperty].data_type;
        this.visible = this.propertiesValue[this.currentSelectedProperty].visible;
        this.fetchPropertyValue(propertyId);
      },
      openDocuIdModal() {
        this.docuIdModal = true
      },
      closeModalProduct() {
        this.showProduct = false;
        this.$emit('closeModalProduct');
      },
      setCurrentSelectedGroup(selectedGroup) {
        this.currentSelectedGroup = selectedGroup;
        this.fetchPropertyByGroup(this.selectedTemplateId, selectedGroup);
        if(JSON.stringify(this.propertyGroup[selectedGroup]) != undefined) {
          this.currentSelectedProperty = this.propertyGroup[selectedGroup][0];
        } else {
          this.currentSelectedProperty = null;
        }
      },
      fetchPropertyByGroup(templateId, groupName) {
        axios.get(this.restApiDomain+"/api/properiesByGroup/templateId/"+templateId+"/groupName/"+groupName)
          .then((response)  =>  {
            this.loading = false;
            var encodedproperties = atob(response.data['properties']);
            this.properties= JSON.parse(encodedproperties);
          }, (error)  =>  {
            console.log(error);
            this.allTemplate = false;
          });
      },
      updateMatrix(passMatrix) {
        self = this;
        let matrixArray = [];
        if(passMatrix != undefined) {
          Object.entries(passMatrix).forEach(([key, propertyObj]) => {
            this.matrixCollection [key] = propertyObj;
            if(!this.isTheKeyAlreadyInChooseMatrixValue(key)) {
              this.chooseMatrixValue = this.chooseMatrixValue.concat({text: key, value:key });
            }
          });
          self.propertiesValue[this.currentSelectedProperty]= {matrix: this.matrixCollection};
        }
      },
      isTheKeyAlreadyInChooseMatrixValue(newItem) {
        let result = false;
        Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
          if(propertyObj.value == newItem) {
            result = true;
          }
        });

        return result;
      },
      setCurrentSelectedProperty(currentSelectedProperty, currentSelectedPropertyIndex) {
        this.currentSelectedProperty = currentSelectedProperty;
        this.currentSelectedPropertyIndex = currentSelectedPropertyIndex;
        //this.fetchPropertyValue(currentSelectedPropertyIndex);
      },
      fetchPropertyValue(currentSelectedPropertyIndex) {
        // let dataTypes = this.dataTypes;
        axios.get(this.restApiDomain+"/api/properiesValue/propertyId/"+currentSelectedPropertyIndex+"/templateId/"+this.selectedTemplateId)
          .then((response)  =>  {
            this.loading = false;

            var entcodedAllTemplateIds =  atob(response.data['allTemplateIds']);

            if(response.data['basePathImg'] !== undefined) {
              this.basePathImg =  atob(response.data['basePathImg']);
            }

            var entcodedAllMatrixes =  atob(response.data['allMatrixes']);
            let allTemplateIds = JSON.parse(entcodedAllTemplateIds);
            this.combiValues  = allTemplateIds;
            this.matrixSelectDimensionX = allTemplateIds;
            this.matrixSelectDimensionY = allTemplateIds;
            //this.chooseMatrixValue = JSON.parse(entcodedAllMatrixes);
            /*this.matrixSelectDimensionX = this.combiValue;
            this.matrixSelectDimensionY = this.combiValue;*/

            if(response.data['propertyValue'].length == 0) {
              this.propertiesValue = {};
              return;
            }

            var encodedpropertyValue = atob(response.data['propertyValue']);
            this.propertiesValue = JSON.parse(encodedpropertyValue);
            if(this.propertiesValue != null && this.propertiesValue != undefined &&
              this.propertiesValue[this.currentSelectedProperty].matrix != null
            ) {
              let dataMatrixDB = this.propertiesValue[this.currentSelectedProperty].matrix;
              let dataMatrix = {};
              let chooseMatrixValue = [];
              Object.keys(dataMatrixDB).forEach(function (key) {
                var decodedString = JSON.parse(atob(dataMatrixDB[key]));
                dataMatrix[key] = decodedString;
                chooseMatrixValue.push({text: key, value: key });
              });

              this.chooseMatrixValue = this.chooseMatrixValue.concat(chooseMatrixValue);
              this.propertiesValue[this.currentSelectedProperty].matrix = dataMatrix;
              this.matrixCollection = dataMatrix;
              var entcodedRelations =  atob(this.propertiesValue[this.currentSelectedProperty].relations);
              this.matrixAttachedToProperty = JSON.parse(entcodedRelations);
            } else {
              this.propertiesValue[this.currentSelectedProperty].matrix = null;
            }

            if(this.propertiesValue != null &&  this.propertiesValue != undefined &&
              this.propertiesValue[this.currentSelectedProperty].additionalData != null
            ) {
              let dataSelectDB = this.propertiesValue[this.currentSelectedProperty].additionalData;
              let selectBocDecodedString = JSON.parse(atob(dataSelectDB));
              this.propertiesValue[this.currentSelectedProperty].additionalData = selectBocDecodedString;
              this.selectBoxData = selectBocDecodedString;

              Object.entries(this.selectBoxData).forEach(([key, propertyObj]) => {
                this.standardValues.push({text:propertyObj.title, value:propertyObj.value});
                if(this.propertiesValue[this.currentSelectedProperty].value == this.standardValue) {
                  this.selectOptionStandardValue(key);
                }
              });

            } {
              this.propertiesValue[this.currentSelectedProperty].additionalData = null;
            }

            Object.entries(this.dataTypes).forEach(([key, propertyObj]) => {
              if(this.propertiesValue[this.currentSelectedProperty].data_type == propertyObj.value) {
                this.selectOption(key);
              }
            });

            this.fieldTitel = this.propertiesValue[this.currentSelectedProperty].titel;
            this.fieldId = this.propertiesValue[this.currentSelectedProperty].name;
            this.data_type = this.propertiesValue[this.currentSelectedProperty].data_type;
            this.templateImage = this.propertiesValue[this.currentSelectedProperty].image;
            this.fieldValue = this.propertiesValue[this.currentSelectedProperty].value;
            this.activeField = this.propertiesValue[this.currentSelectedProperty].visible;
            this.standardValue = this.propertiesValue[this.currentSelectedProperty].defaultValue;
            this.hiddenField = !! parseInt(this.activeField);

            if(this.hiddenField) {
              this.hiddenFieldOn = true;
              this.hiddenFieldOff = false;
            } else {
              this.hiddenFieldOff = true;
              this.hiddenFieldOn = false;
            }

            this.valueCssClass = this.propertiesValue[this.currentSelectedProperty].cssClass;
            this.valueBreite = this.propertiesValue[this.currentSelectedProperty].valueWidth;
            this.valueHoehe = this.propertiesValue[this.currentSelectedProperty].valueHeight;
            this.expression = this.propertiesValue[this.currentSelectedProperty].expression;
            this.valuePosX = this.propertiesValue[this.currentSelectedProperty].valuePosX;
            this.valuePosY = this.propertiesValue[this.currentSelectedProperty].valuePosY;
            this.operatorCombi = this.propertiesValue[this.currentSelectedProperty].operatorCombi;
            //this.value = this.propertiesValue[this.currentSelectedProperty].value;
            this.requiredField = this.propertiesValue[this.currentSelectedProperty].mandatory_field;
            this.requiredFieldChecked = !!parseInt(this.requiredField);
            if(this.requiredFieldChecked) {
              this.requiredFieldCheckedOn = true;
              this.requiredFieldCheckedOff = false;
            } else {
              this.requiredFieldCheckedOff = true;
              this.requiredFieldCheckedOn =false;
            }

            this.$refs.propertyInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML= this.propertiesValue[this.currentSelectedProperty].description;
            this.$refs.propertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML = this.propertiesValue[this.currentSelectedProperty].short_description;

            //this.loadImageFormURL();
            //console.log("QQQQQQ::"+JSON.stringify(this.propertiesValue));

          }, (error)  =>  {
            console.log(error);
            this.allTemplate = false;
          });
      },
      async loadImageFormURL() {
        let img = new Image();
        img.src = "http://127.0.0.1/Symfony4-REST-API/public/assets/template-images/Vorlage_fue_etwas_30/57yq7e846-xpw072edt-20151224_153006.jpg";
        this.imageUpload[0] = img;
        // let responseImage = await fetch("http://127.0.0.1/Symfony4-REST-API/public/assets/template-images/Vorlage_fue_etwas_30/57yq7e846-xpw072edt-20151224_153006.jpg?time=" + (new Date()).getTime());
        //console.log("KOKOKOKOKRURURURURURURU"+responseImage.blob());
        // let imgData = await responseImage.blob();

        //   this.imageUpload[1] = responseImage;
        /*
          reader.addEventListener('load', () => {
             // this.$refs[`image${0}`].src = reader.result;
              //this.imageUpload[0] =
              console.log("ZUZUZUZ:::");
          });
          reader.readAsDataURL(imgData)*/
      },
      saveGroupName() {
        //this.groupnames.push(this.groupname);
        var self = this;
        let localGroupname = this.groupname;
        this.currentSelectedGroup = this.groupname;
        //this.templates[this.selectedTemplate].groups = this.groupnames;
        let encodedString = btoa(JSON.stringify({tplName:this.selectedTemplate, groupName: this.groupname}));
        axios.post(this.restApiDomain+'/api/templategroup', {
          customerId: this.customerId,
          tplData: encodedString
        },{
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            self.groupnames.push({"id":response.data.id,"name":response.data.groupName});
            self.propertyGroup[localGroupname] = [{'id':response.data.id, 'name':response.data.propertyName}];
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
        this.allTemplate[this.selectedTemplate] = this.templates;
      },
      saveProperty(selectedGroup) {
        var self = this;
        // var selectedGroupKey = selectedGroup.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
        //Object.entries(this.properties[selectedGroup]).forEach(([key, propertyObj]) => {
        if(this.propertyGroup[selectedGroup] == undefined) {
          let propertyRecord = {'id': 0, 'name': self.tplProperty};
          var encodedPropertyRecord = btoa(JSON.stringify({
            tplName: this.selectedTemplate,
            groupName: selectedGroup,
            propertyRecord: propertyRecord
          }));
          axios.post(this.restApiDomain + '/api/templateProperty', {
            customerId: this.customerId,
            tplData: encodedPropertyRecord
          }, {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            }
          })
            .then(function (response) {
              if(self.groupnames.length == 0) {
                self.groupnames.push({"id":response.data.id,"name":response.data.groupName});
              }
              self.propertyGroup[response.data.groupName] =[{'id': response.data.id, 'name': response.data.name}];
              self.currentSelectedGroup= response.data.groupName;
              self.currentSelectedProperty= response.data.name;
            })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log(error.message);
              }
              console.log(error.config);
            });
        } else {
          let propertyIndex = 0;
          if (self.propertyGroup[selectedGroup][0].name == 'Keine Eigenschaft') {
            propertyIndex = parseInt(this.propertyGroup[selectedGroup][0].id);
          }

          let propertyRecord = {'id': propertyIndex, 'name': self.tplProperty};
          var encodedPropertyRecord = btoa(JSON.stringify({
            tplName: this.selectedTemplate,
            groupName: selectedGroup,
            propertyRecord: propertyRecord
          }));
          axios.post(this.restApiDomain + '/api/templateProperty', {
            customerId: this.customerId,
            tplData: encodedPropertyRecord
          }, {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            }
          })
            .then(function (response) {
              if (self.propertyGroup[selectedGroup][0].name == 'Keine Eigenschaft') {
                self.propertyGroup[selectedGroup] = [{'id': response.data.id, 'name': response.data.name}];
                self.currentSelectedProperty = response.data.name;
              } else {
                self.propertyGroup[selectedGroup].push({'id': response.data.id, 'name': response.data.name});
                self.currentSelectedProperty = response.data.name;
              }
            })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log(error.message);
              }
              console.log(error.config);
            });
        }
        //this.currentSelectedGroup = selectedGroup;
        this.tplProperty ='';
        this.templates[this.selectedTemplate].property = this.propertyGroup;
      },
      savePropertyValue(selectedProperty) {
        let propertyInformation = this.$refs.propertyInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML;
        let propertyAdditionalInformation = this.$refs.propertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML;

        var self = this;
        // var selectedGroupKey = selectedGroup.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
        if(this.matrixCollection == undefined) {
          this.matrixCollection = {};
        }
        //this.templates[this.selectedTemplate].propertyValue = this.propertiesValue;

        this.currentSelectedProperty = selectedProperty;
        let propertyValueItem = {fieldId: this.fieldId, titel: this.fieldTitel, expression: this.expression, imageUploadName: this.templateImage, position: this.fieldPosition, valueCssClass: this.valueCssClass,
          chooseValueForMatrix: this.chooseValueForMatrix, matrixOperatorX : this.matrixOperatorX, matrixOperatorY: this.matrixOperatorY, propertyInformation: propertyInformation, relations: this.matrixAttachedToProperty,
          propertyAdditionalInformation: propertyAdditionalInformation, standardValue: this.standardValue, valueBreite: this.valueBreite, valueHoehe: this.valueHoehe, valuePosX: this.valuePosX, valuePosY: this.valuePosY,
          operatorCombi: this.operatorCombi, dataTyp : this.data_type, mandatory_field: this.requiredField, fieldActive: this.activeField, fieldValue: this.fieldValue, matrix: this.matrixCollection, additionalData: this.selectBoxData};

        var encodedPropertyValueRecord = btoa(JSON.stringify(propertyValueItem));
        var encodedSelectedProperty = btoa(this.currentSelectedProperty);
        var encodedSelectedTemplate = btoa(this.selectedTemplate);
        axios.post(this.restApiDomain+'/api/templatePropertyValue', {
          customerId: this.customerId,
          tplData: encodedPropertyValueRecord,
          //selectedProperty: encodedSelectedProperty,
          selectedPropertyId: this.currentSelectedPropertyIndex,
          tplName: encodedSelectedTemplate
        },{
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            //console.log("QQQQWWW:propertyId::"+JSON.stringify(response.data));
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
        this.clearAllFileds();
        this.characteristicsValuesModal = false;
      },
      clearAllFileds() {
        this.fieldId = '';
        this.fieldTitel = '';
        this.expression= '';
        this.imageUploadName='';
        this.fieldPosition= '';
        this.valueCssClass= '';
        this.chooseValueForMatrix = [];
        this.matrixOperatorX = '';
        this.matrixOperatorY = '';
        this.propertyInformation = '';
        this.matrixAttachedToProperty ='';
        this.propertyAdditionalInformation = '';
        this.standardValue ='';
        this.valueBreite = '';
        this.valueHoehe ='';
        this.valuePosX = '';
        this.valuePosY= '';
        this.operatorCombi ='';
        this.data_type ='';
        this.requiredField = '';
        this.activeField = '';
        this.fieldValue ='';
        this.matrixCollection = {};
        this.selectBoxData =[];
        this.matrixAttachedToProperty = [];
        this.chooseMatrixValue =[{ text: 'Matrix laden', value: null, disabled: true, selected: true }];
      },
      deleteGroupTemplate(row) {
        let selectedTemplateId = this.selectedTemplateId;
        axios.get(this.restApiDomain+"/api/deleteGroup/groupName/"+row.name+"/templateId/"+this.selectedTemplateId)
          .then((response)  =>  {
            this.fetchProperty(selectedTemplateId);
          }, (error)  =>  {
            console.log(error);
          });
      },
      deletePropertyTemplate(propertyId) {
        let selectedTemplateId = this.selectedTemplateId;
        axios.get(this.restApiDomain+"/api/deleteProperty/propertyId/"+propertyId)
          .then((response)  =>  {
            this.fetchProperty(selectedTemplateId);
          }, (error)  =>  {
            console.log(error);
          });
      },
      editorInit: function () {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/javascript')    //language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/javascript') //snippet
      },
    },
    watch: {
      showProduct(newVal) {
        this.productModal = newVal;
      },
      hiddenFieldOn(newVal) {
        this.hiddenFieldOn = newVal;
      },
      hiddenFieldOff(newVal) {
        this.hiddenFieldOff = newVal;
      },
      'checkboxItem.checkboxVlues': {
        handler: function (after, before) {
          console.log("watch:::flOption.getFilterData"+JSON.stringify(after));
        },
        deep: true
      },
      newRule(newVal) {
        let self = this;
        console.log("TTT22222"+JSON.stringify(this.newRule));
        console.log("TTT22222"+JSON.stringify(this.newCondition));
        this.newRule.forEach(rule => {
          this.newCondition.forEach(condition => {
            if (self.containsObject(rule.id, condition.id) === false) {
              this.newConditionModel.push({
                row: rule.id,
                column: condition.id,
                value: ""
              });
              this.conditionTypes.push({
                row: rule.id,
                column: condition.id,
                value: "1"
              });
             /* this.checkboxVlues.push({
                row: rule.id,
                column: condition.id,
                element:null,
                value: false
              });*/
            }
          });
        });
        console.log("newConditionModel"+JSON.stringify(this.newConditionModel));
      },
      newCondition(newVal) {
        let self = this;
        console.log("TTT11111"+JSON.stringify(this.newRule));
        console.log("TTT11111"+JSON.stringify(this.newCondition));
        this.newRule.forEach(rule => {
          this.newCondition.forEach(condition => {
            if (self.containsObject(rule.id, condition.id) === false) {
              this.newConditionModel.push({
                row: rule.id,
                column: condition.id,
                value: ""
              });
              this.conditionTypes.push({
                row: rule.id,
                column: condition.id,
                value: "1"
              });
              /*this.checkboxVlues.push({
                row: rule.id,
                column: condition.id,
                value: false
              });*/
            }
          });
        });
        console.log("newConditionModel"+JSON.stringify(this.newConditionModel));
      },
    },
  };
</script>
<style>
  .liIsActive{
    background: #67B9B3;
  }
  .input-group-append, .input-group-prepend {
    display: -ms-flexbox !important;
    display: -webkit-box !important;
  }
  .width90{
    width: 90%;
  }
  .input-group {
    display: -ms-flexbox !important;
    display: -webkit-box !important;
  }
  .form-inline .form-check {
    margin-right: -40px;
  }

  .liIsActive{
    cursor: pointer;
  }
  @media (min-width: 768px){

    .modal .modal-dialog.modal-bottom-right {
      bottom: 2.15em;
      right: 3.75em;
    }
  }

  .dropleft .dropdown-toggle::before {

    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
  }
  .btn-primary.dropdown-toggle {
    background-color: transparent!important;
    border: none;
    box-shadow: none;
    color: #000000;
  }
  .btn-primary.dropdown-toggle:hover, .btn-primary.dropdown-toggle:focus {
    background-color: transparent !important;
    color: #a4b874;
  }
  .dropdown .dropdown-menu .dropdown-item:hover, .dropdown .dropdown-menu .dropdown-item:active, .dropup .dropdown-menu .dropdown-item:hover, .dropup .dropdown-menu .dropdown-item:active, .dropleft .dropdown-menu .dropdown-item:hover, .dropleft .dropdown-menu .dropdown-item:active, .dropright .dropdown-menu .dropdown-item:hover, .dropright .dropdown-menu .dropdown-item:active {
    -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    background-color: #A4B87B;
    border-radius: 0.125rem;
    -webkit-transition: all 0.1s linear;
    transition: all 0.1s linear;
  }
  .white-text, .card.card-cascade .view.view-cascade.gradient-card-header, .dropdown .dropdown-menu .dropdown-item:hover, .dropdown .dropdown-menu .dropdown-item:active, .dropup .dropdown-menu .dropdown-item:hover, .dropup .dropdown-menu .dropdown-item:active, .dropleft .dropdown-menu .dropdown-item:hover, .dropleft .dropdown-menu .dropdown-item:active, .dropright .dropdown-menu .dropdown-item:hover, .dropright .dropdown-menu .dropdown-item:active, .side-nav, .side-nav .search-form .form-control, .md-toast-message a, .md-toast-message label, .md-toast-close-button, #toast-container > div, .picker__list-item--selected, .picker__list-item--selected:hover, .picker--focused .picker__list-item--selected, .picker--time .picker__button--clear:hover, .picker--time .picker__button--clear:focus, .picker--time .picker__button--clear:hover:before, .picker--time .picker__button--clear:focus:before, .picker__date-display, .picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary, .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary, .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary, .clockpicker-display .clockpicker-display-column #click-am.text-primary, .clockpicker-display .clockpicker-display-column #click-pm.text-primary, .darktheme .picker__box .picker__date-display .clockpicker-display, .darktheme .picker__box .picker__date-display .clockpicker-display .clockpicker-span-am-pm, .darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick, .darktheme .picker__box .picker__footer button, .picker__box .picker__header .picker__date-display, .picker__box .picker__table .picker__day--outfocus, .picker__box .picker__table .picker__day--selected, .picker__box .picker__table .picker__day--selected:hover, .picker__box .picker__table .picker--focused {
    color: inherit;
  }

  .md-form input[type=text]:focus:not([readonly]) + label, .md-form input[type=password]:focus:not([readonly]) + label, .md-form input[type=email]:focus:not([readonly]) + label, .md-form input[type=url]:focus:not([readonly]) + label, .md-form input[type=time]:focus:not([readonly]) + label, .md-form input[type=date]:focus:not([readonly]) + label, .md-form input[type=datetime-local]:focus:not([readonly]) + label, .md-form input[type=tel]:focus:not([readonly]) + label, .md-form input[type=number]:focus:not([readonly]) + label, .md-form input[type=search-md]:focus:not([readonly]) + label, .md-form input[type=search]:focus:not([readonly]) + label, .md-form textarea.md-textarea:focus:not([readonly]) + label {
    color: #a4b874;
  }

  .success-color {
    background-color: #67B9B3 !important;
  }
  .previews, .error-overlay {
    position: absolute;
    z-index: 3;
    background-color: #fff;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    cursor: pointer;
  }
  .single-preview {
    border-radius: 20px;
    overflow: hidden;
    width: 180px !important;
    height: 180px;
    position: relative;
    display: block;
    z-index: 10;
    margin-right: 5px;
  }
  .remove-file-btn {
    position: absolute;
    top: auto !important;
    bottom: 10px !important;
    right: 10px;
    padding: .5rem 1.6rem;
    font-size: .64rem;
    background-color: #ff3547!important;
    color: #fff!important;
    border: 0;
    border-radius: .125rem;
    text-transform: uppercase;
    line-height: 1.5;
  }
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent !important;
    -webkit-transition: .3s;
    transition: .3s;
  }

  .mdb-wysiwyg-container {
    display: block;
    border: 1px solid #ededed;
    border-radius: 3px 3px 0 0;
    height: 100%;
  }

  .mdb-wysiwyg-textarea {
    display: block;
    padding: 15px;
    width: 100%;
    min-height: 100% !important;
    border: 0;
    outline: none;
    resize: none;
    background: #fff;
  }
  .gcm-cardTitle {
    margin-bottom: .75rem;
    background: #BBBBBB;
    padding: 15px;
  }
  .gcm-container-fluid {
    width: 98.6%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: 25px;
    background: #EEEEEE;
  }
  .gcm-ruleCheckbox div label{
    top: 0;
  }
  .ruleRow{
    margin-left: 25px;
  }
  .gcm-hoverableRow:hover{
    background: #D8D8D8;
    cursor: pointer;
  }
  .gcm-checkboxMargin{
    margin-top: -25px !important;
  }
  /*.collapse-item[data-v-2d7bb3a4] {
    overflow: hidden !important;
    padding: 0;
    -webkit-transition: height 0.5s !important;
    transition: height 0.5s !important;
    position: relative !important;
    padding-bottom: 25px;
    margin-bottom: 59px;
    position: relative;
    height: 300px !important;
  }*/
  .switch label input[type=checkbox]:checked + .lever:after {
    background-color: #a4b874;
    left: 1.5rem;
  }
  .gcm-selectFontSize{
    font-size: 14px;
  }
  .collapse.show.collapse-item{
    width: 115%;
  }
  .gcm-colHeight{
    height: 0;
  }
  div.gcm-conditionBorder{
    border-left: 1px solid #000000;
    height: 20px;
    border-bottom: 1px solid #000000;
    width: 14px;
    position: absolute;
    left: 0;
    top: 0;
  }
  div.gcm-conditionBorderDynamic{
    border-left: 1px solid #000000;
    height: 55px;
    border-bottom: 1px solid #000000;
    width: 14px;
    position: absolute;
    left: 0;
    top: -38px;
  }
</style>
