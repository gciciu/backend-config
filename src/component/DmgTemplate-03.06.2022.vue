<template>
    <div>
        <mdb-row>
            <mdb-col md="12">
                <p class="lead">Legen Sie hier Ihre Komponentengruppen, Mermale und Merkmalwerte an.</p>
                <router-link  class="hi-icon hi-icon-archive btn btn-black" to="/templatelist">Zurück</router-link>
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
                        </mdb-tbl>
                        <draggable
                                :list="groupnames"
                                :disabled="false"
                                class="list-group"
                                ghost-class="ghost"
                                :move="checkGroupname"
                                @start="dragging = true"
                                @end="dragging = true"
                        >
                            <div
                                    class="list-group-item"
                                    @click="setCurrentSelectedGroup(groupname.name)" v-for="groupname in groupnames" @contextmenu="openDmgRightMenuGroup($event, groupname.id, groupname.name)" v-bind:class="{ liIsActive: currentSelectedGroup == groupname.name }"
                                    :key="groupname.name"
                            >
                                <div class="dmg-table-template">
                                    <div class="dmg-table-template-row">
                                        <div class="dmg-table-template-cell cellWidth78">{{ groupname.name }}</div>
                                        <div class="dmg-table-template-cell">
                                            <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="changeGroupNameModal(groupname.id, groupname.name)" icon="edit"></mdb-btn>
                                            <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deleteGroupTemplate(groupname)" icon="trash"></mdb-btn>
                                            <mdb-btn slot="reference"  color="geccomButtonTransparent"  size="sm" icon="copy"></mdb-btn>
                                            <mdb-btn slot="reference"  color="geccomButtonTransparent"  size="sm" icon="cog"></mdb-btn>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </draggable>
                    </mdb-col>
                    <mdb-col xl="6" class="pb-2">
                        <mdb-tbl hover responsive sm>
                            <mdb-tbl-head>
                                <th><h3>Merkmale</h3></th>
                                <th colspan="3" class="text-right">
                                    <mdb-tooltip :options="{placement: 'top'}">
                                        <span slot="tip">Neues Merkmal anlegen</span>
                                        <mdb-btn color="geccomButtonInfo" slot="reference" @click="openCharacteristicsModal"><mdb-icon icon="plus" /></mdb-btn>
                                    </mdb-tooltip>
                                </th>
                            </mdb-tbl-head>
                        </mdb-tbl>
                        <draggable
                                :list="propertyGroup[currentSelectedGroup]"
                                :disabled="false"
                                class="list-group"
                                ghost-class="ghost"
                                :move="checkMove"
                                @start="dragging = true"
                                @end="dragging = true"
                        >
                            <div
                                    class="list-property-item"
                                    v-for="(property, propertyIndex) in propertyGroup[currentSelectedGroup]"  @contextmenu="openDmgRightMenuProperty($event, property.id, property.name)" @click="setCurrentSelectedProperty(property.name, property.id, property.uniqueId)"
                                    :key="property.name"
                            >
                                <div class="dmg-table-template">
                                    <div class="dmg-table-template-row">
                                        <div class="dmg-table-template-cell cellWidth78">{{ property.name }}</div>
                                        <div v-show="property.name !='Keine Eigenschaft'" class="dmg-table-template-cell cellWidth22">
                                            <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="openCharacteristicsUpdateModal(property)" icon="edit"></mdb-btn>
                                            <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deletePropertyTemplate(property.id)" icon="trash"></mdb-btn>
                                            <mdb-btn slot="reference"  color="geccomButtonTransparent" @click="openCharacteristicsValuesModal" size="sm" icon="copy"></mdb-btn>
                                            <mdb-btn slot="reference"  color="geccomButtonTransparent" @click="openAddCharacteristicsValuesModal(property.id)" size="sm" icon="cog"></mdb-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </draggable>
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
                    <!--
                    <mdb-input placeholder="Bemerkungen" :rows="2" :maxlength="max" v-model="text">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="groupModal" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>-->
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="geccomButtonRed" @click="groupModal = false">Schließen</mdb-btn>
                    <mdb-btn color="geccomButtonGreen" @click.native="saveGroupName">Speichern</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
            <!--    End Modal Group  -->


            <!--    Start Modal Group          -->
            <mdb-modal removeBackdrop side position="bottom-right" v-if="changeGroupModal" @close="changeGroupModal = false">
                <mdb-modal-header>
                    <mdb-modal-title>Gruppe ändern</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-input placeholder="Komponentengruppe" id="changetemplatename" v-model="groupname" name="groupname" class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="groupModal">
                        <mdb-btn color="geccomButtonInfo" size="sm" group  slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                    <!--
                    <mdb-input placeholder="Bemerkungen" :rows="2" :maxlength="max" v-model="text">
                      <mdb-btn color="geccomButtonInfo" size="sm" group id="groupModal" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>-->
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="geccomButtonRed" @click="changeGroupModal = false">Schließen</mdb-btn>
                    <mdb-btn color="geccomButtonGreen" @click.native="saveGroupName">Speichern</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
            <!--    End Modal Group  -->

            <!--    Start Modal Characteristics          -->
            <mdb-modal removeBackdrop side position="bottom-right" v-if="characteristicsModal" @close="characteristicsModal = false">
                <mdb-modal-header>
                    <mdb-modal-title>Neues Merkmal anlegen</mdb-modal-title>
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

            <!--    Start Modal Characteristics          -->
            <mdb-modal removeBackdrop side position="bottom-right" v-if="characteristicsModalUpdate" @close="characteristicsModalUpdate = false">
                <mdb-modal-header>
                    <mdb-modal-title>Merkmal ändern</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-input placeholder="Merkmalname" id="tplPropertUpdate" v-model="tplProperty" name="tplProperty" class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="characteristicsModalUpdate">
                        <mdb-btn color="geccomButtonInfo" size="sm" group id="characteristicsModalUpdate" slot="prepend"  @click.native="openDocuComponentsModal"><mdb-icon icon="info-circle" /></mdb-btn>
                    </mdb-input>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="geccomButtonRed" @click.native="characteristicsModalUpdate = false">Schließen</mdb-btn>
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
                                {{uniqueId}}
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
                                <mdb-card-header color="info-color">Allgemeine Werte</mdb-card-header>
                                <mdb-card-body>
                                    <mdb-row class="d-flex justify-content-center">
                                        <mdb-col xl="2">
                                            <mdb-input placeholder="ID" id="fieldId" v-model="fieldId"  class="mt-0 mb-0" ariaLabel="ID" ariaDescribedBy="fieldIdGroup">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="fieldIdGroup" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="2">
                                            <mdb-input placeholder="Titel" id="fieldTitel" v-model="fieldTitel"  class="mt-0 mb-0" ariaLabel="ID" ariaDescribedBy="fieldTitellabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="fieldTitellabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="2">
                                            <div class="input-group">
                                                <mdb-select search @getValue="getSelectValueDataTypes" :options="dataTypes" class="mt-0 mb-0"  size="sm" />
                                            </div>
                                        </mdb-col>
                                        <mdb-col xl="2">
                                            <mdb-input placeholder="Platzhalter" v-model="fieldValue"  class="mt-0 mb-0" ariaLabel="ID" ariaDescribedBy="valueWertLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="valueWertLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="2">
                                            <mdb-input placeholder="Preis" v-model="fieldPriceValue"  class="mt-0 mb-0" ariaLabel="ID" ariaDescribedBy="fieldPriceWertLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="fieldPriceWertLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="2">
                                            <input type="checkbox" class="form-check-input" v-model="dmgIsbasicPrice" id="dmgisbasicprice" name="dmgisbasicprice">
                                            <label for="dmgisbasicprice">ist Basispreis</label>
                                        </mdb-col>
                                    </mdb-row>
                                </mdb-card-body>
                            </mdb-card>
                        </mdb-col>
                    </mdb-row>

                    <mdb-row class="mb-3">
                        <mdb-col xl="12">
                            <mdb-card>
                                <mdb-card-header color="info-color">Erweiterte Einstellungen</mdb-card-header>
                                <mdb-card-body>
                                    <mdb-row>
                                        <mdb-col xl="2" md="3" sm="12" class="pb-2">
                                            <form-inline>
                                                <span>Pflichtfeld: &nbsp;</span>
                                                <label>Nein&nbsp;<input type="radio" name="active" value="0"  @input="handleRadioRequiredField(0)" :checked="requiredFieldCheckedOff">&nbsp;&nbsp;</label>
                                                <label>Ja &nbsp;<input type="radio" name="active" value="1"  @input="handleRadioRequiredField(1)" :checked="requiredFieldCheckedOn"></label>
                                            </form-inline>
                                        </mdb-col>
                                        <mdb-col xl="2"  md="3" sm="12" class="pb-2">
                                            <form-inline>
                                                <span>Sichtbar: &nbsp;</span>
                                                <label>Nein&nbsp; <input type="radio" name="active" value="0"  @input="handleActiveFieldRadio(0)" :checked="hiddenFieldOff">&nbsp; &nbsp;</label>
                                                <label>Ja&nbsp;<input type="radio" name="active" value="1"  @input="handleActiveFieldRadio(1)" :checked="hiddenFieldOn"></label>
                                            </form-inline>
                                        </mdb-col>
                                        <mdb-col xl="3" md="4" sm="12" lg="3" class="pb-3">
                                            <div class="input-group">
                                                <select v-if="data_type != 'matrix' && (data_type == 'radioBox' || data_type == 'checkBox' || data_type == 'imageList' || data_type == 'selectBox' || data_type == 'font')" class="browser-default custom-select gcm-selectFontSize" v-model="standardValue">
                                                    <option v-for="option in standardValues" v-bind:value="option.value" :selected="option.selected">{{ option.text }}</option>
                                                </select>
                                                <mdb-input v-if="data_type == 'textField'" placeholder="standart Wert" id="fieldDefaultValue" v-model="standardValue"  class="mt-0 mb-0" ariaLabel="ID" ariaDescribedBy="fieldTitellabel">
                                                </mdb-input>
                                            </div>
                                        </mdb-col>
                                        <mdb-col xl="2"  md="3"  lg="2" sm="12" class="pb-1" v-if="data_type == 'imageBox'">
                                            <select class="browser-default custom-select" v-model="propertyToImageBox">
                                                <option >Merkmalauswahl</option>
                                                <option v-for="option in uniqueIdCollection" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                            </select>
                                        </mdb-col>
                                        <mdb-col xl="2"  md="3"  lg="2" sm="12" class="pb-1" v-if="data_type == 'imagecollection'">
                                            <select class="browser-default custom-select" v-model="propertyToImageBox" @change="getRelatedCollection()">
                                                <option >Merkmalauswahl</option>
                                                <option v-for="option in uniqueIdCollection" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                            </select>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="3"  lg="1" sm="6" class="pb-1" v-if="data_type == 'imageBox'">
                                            <mdb-input placeholder="Höhe" v-model="imgWidth"  class="mt-0 mb-1" ariaLabel="ID" ariaDescribedBy="imgWidthLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="imgWidthLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="6" class="pb-1" v-if="data_type == 'imageBox'">
                                            <mdb-input placeholder="Breite" v-model="imgHeight"  class="mt-0 mb-1" ariaLabel="ID" ariaDescribedBy="imgHeightLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="imgHeightLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="6" class="pb-1" v-if="data_type != 'imageBox'">
                                            <mdb-input placeholder="Min Wert" v-model="minValue"  class="mt-0 mb-1" ariaLabel="ID" ariaDescribedBy="minValueLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="minValueLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="6" class="pb-1" v-if="data_type != 'imageBox'">
                                            <mdb-input placeholder="Max Wert" v-model="maxValue"  class="mt-0 mb-1" ariaLabel="ID" ariaDescribedBy="maxValueLabel">
                                                <mdb-btn color="geccomButtonInfo" size="sm" group id="maxValueLabel" slot="prepend"  @click.native="openDocuIdModal = true" class="infoCircleBtn"><mdb-icon icon="info-circle" /></mdb-btn>
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="6" class="pb-1" v-if="data_type != 'imageBox'">
                                            <mdb-input placeholder="Einheit" v-model="unitValue"  class="mt-0 mb-1" ariaLabel="ID" ariaDescribedBy="unitValueLabel">
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="12" class="pb-2">
                                            <input type="checkbox" class="form-check-input" v-model="isDigit" id="dmgisDigit" name="dmgisDigit">
                                            <label for="dmgisDigit">ist Nummer</label>
                                        </mdb-col>
                                    </mdb-row>
                                    <mdb-row>
                                        <mdb-col xl="2"  md="3"  lg="2" sm="12" class="pb-2">
                                            <mdb-input placeholder="Individuelle CSS Klassen" v-model="valueCssClass"  class="mt-0 mb-3" ariaLabel="ID" ariaDescribedBy="valueCssClassLabel">
                                            </mdb-input>
                                        </mdb-col>
                                        <mdb-col xl="2"  md="6" sm="2" class="pb-1">
                                            <input type="checkbox" class="form-check-input" v-model="areMultiplyFields" id="exists_multiplyFields" name="exists_multiplyFields">
                                            <label for="exists_multiplyFields"> Felder multiplizieren</label>
                                        </mdb-col>
                                        <mdb-col xl="3" class="pb-1" v-if="areMultiplyFields">
                                            <mdb-select multiple selectAll search @getValue="getAllPropertyAsOptionlabel" :options="allPropertiesAsMultipleOption"class="mt-0 mb-3 width90"  id="multiplyFields" size="sm" ariaDescribedBy="multiplyFieldslabel" />
                                        </mdb-col>
                                        <mdb-col xl="3" class="pb-1" v-if="areMultiplyFields">
                                            <mdb-select multiple selectAll search @getValue="getRelatedMultipleField" :options="allReletedMultipleOption"class="mt-0 mb-3 width90"  id="relatedMultiplyFields" size="sm" ariaDescribedBy="relatedMultiplyFields" />
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="12" class="pb-2">
                                            <input type="checkbox" class="form-check-input" v-model="isHidden" id="dmgisHidden" name="dmgisHidden">
                                            <label for="dmgisHidden">ist versteckt</label>
                                        </mdb-col>
                                        <mdb-col xl="1"  md="2"  lg="1" sm="12" class="pb-2">
                                            <input type="checkbox" class="form-check-input" v-model="withZoom" id="withZoom" name="withZoom">
                                            <label for="withZoom">mit Zoom</label>
                                        </mdb-col>
                                    </mdb-row>
                                </mdb-card-body>
                            </mdb-card>
                        </mdb-col>
                    </mdb-row>

                    <mdb-row class="mb-3" v-if="data_type != 'imageBox'">
                        <mdb-col xl="12">
                            <mdb-card>
                                <mdb-card-header color="info-color">Berechnungen</mdb-card-header>
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
                                <mdb-card-header color="info-color">Einstellungen für Bilder oder Matrix</mdb-card-header>
                                <mdb-card-body>

                                    <!--START IMAGE VALUES-->
                                    <div v-if="data_type != 'expression' && data_type != 'imageBox'">
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
                                        <mdb-col xl="4" class="pb-2">
                                            <div style="width:100%">
                                                <mdb-file-upload  v-show="templateImage.length == 0" :files="imageUpload"  @change="handleComponentImageChange" class="mt-0 mb-3 width90" />
                                                <img v-show="templateImage != ''" v-bind:src="getImagePath(templateImage)" :width="imgWidth"  :height="imgHeight">
                                                <span v-show="templateImage != ''" class="change-product-x" @click="removeImageComponentItem()"><i class="fas fa-times" aria-hidden="true"></i></span>
                                            </div>
                                        </mdb-col>
                                        <mdb-col xl="4" class="pb-2">
                                            <div style="width:100%">
                                                <mdb-col xl="4">
                                                    <textarea  rows="8" cols="50" v-model="svgContent"></textarea>
                                                </mdb-col>
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
                                <mdb-card-header color="info-color">Produkt Informationen </mdb-card-header>
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
                                                        <span v-for="(lanuage,index) in languages"><span @click="showLanguageDescription(lanuage, 'description')">{{lanuage}}</span> &nbsp;</span>
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
                                                        <span v-for="(lanuage,index) in languages"><span @click="showLanguageDescription(lanuage, 'shortDescription')">{{lanuage}}</span> &nbsp;</span>
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
                    <mdb-row class="mb-3" v-if="data_type === 'selectBox' ||  data_type === 'imageList' || data_type === 'checkBox'|| data_type === 'radioBox' || data_type === 'font'">
                        <mdb-col xl="12">
                            <mdb-card>
                                <mdb-card-header color="info-color">Werteliste</mdb-card-header>
                                <mdb-card-body>
                                    <mdb-row class="d-flex justify-content-center">
                                        <mdb-col xl="12">
                                            <div v-if="data_type === 'selectBox' ||  data_type === 'imageList' || data_type === 'checkBox'|| data_type === 'radioBox' || data_type === 'font'">
                                                <!--<file-drag-drop-instant></file-drag-drop-instant> -->
                                                <div id="container-combined-image">
                                                    <table class="table">
                                                        <tr>
                                                            <td><mdb-input v-model="selectBoxTitle" name="selectBoxTitle"  type="text" placeholder="Titel" /></td>
                                                            <td><mdb-input v-model="selectBoxValue" name="selectBoxValue" type="text" placeholder="Wert" /></td>
                                                            <td><mdb-input v-model="selectBoxMin" name="selectBoxMin"  type="text" placeholder="Min" /></td>
                                                            <td><mdb-input v-model="selectBoxMax" name="selectBoxMax" type="text" placeholder="Max" /></td>
                                                            <td>
                                                                <select v-model="procenttype" class="browser-default custom-select gcm-selectFontSize">
                                                                    <option value="1">Fix Preis</option>
                                                                    <option value="2">Prozentig</option>
                                                                </select>
                                                            </td>
                                                            <td><mdb-input v-model="selectBoxPrice" name="selectBoxPrice" type="number" placeholder="Preis/Prozent" /></td>
                                                            <td class="text-right">
                                                                <mdb-tooltip :options="{placement: 'top'}">
                                                                    <span slot="tip">Neuen Wert anlegen</span>
                                                                    <mdb-btn color="geccomButtonInfo" slot="reference" @click="addNewOptionForm"><mdb-icon icon="plus" /></mdb-btn>
                                                                </mdb-tooltip>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="table table-striped">
                                                        <thead class="thead">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">SKU</th>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Wert</th>
                                                            <th scope="col">Min</th>
                                                            <th scope="col">Max</th>
                                                            <th scope="col">Sichtbar</th>
                                                            <th scope="col">Aufschlagsart</th>
                                                            <th scope="col">Aufschlagskomponente</th>
                                                            <th scope="col">Preis</th>
                                                        </tr>
                                                        </thead>
                                                        <draggable v-model="selectBoxData" tag="tbody">
                                                            <tr v-for="(selectbox,index) in selectBoxData" :key="selectbox.name">
                                                                <td scope="row">{{ index }}</td>
                                                                <td>{{ selectbox.title }}</td>
                                                                <td>{{ selectbox.sku }}</td>
                                                                <td>{{ selectbox.uniqueId }}</td>
                                                                <td>{{ selectbox.value }}</td>
                                                                <td>{{ selectbox.min }}</td>
                                                                <td>{{ selectbox.max }}</td>
                                                                <td>{{ selectbox.configuration_visible }}</td>
                                                                <td>{{ selectbox.configuration_procenttype == 2 ? "Prozentig" : "Fix Preis"}}</td>
                                                                <td>{{ selectbox.reatalted_price_component }}</td>
                                                                <td>{{ selectbox.price }}</td>
                                                                <td width="20%" class="text-right">
                                                                    <mdb-tooltip :options="{placement: 'top'}">
                                                                        <span slot="tip">Wert editieren</span>
                                                                        <mdb-btn color="geccomButtonTransparent" slot="reference" @click="openEditConfigurationOptionModal(index)" icon="edit"></mdb-btn>
                                                                    </mdb-tooltip>

                                                                    <mdb-tooltip :options="{placement: 'top'}">
                                                                        <span slot="tip">Wert löschen</span>
                                                                        <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deletePropertyValueOptionItem(index)" icon="trash"></mdb-btn>
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
                                                        </draggable>
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

                    <!--container-related-image-->
                    <div v-if="data_type === 'imagecollection'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Titel</th>
                                <th>ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(imgBox,index) in selectBoxData">
                                <td>{{ index }}</td>
                                <td>{{imgBox.title}}</td>
                                <td>{{imgBox.related_uniqueId}}</td>
                                <td class="text-right">
                                    <mdb-tooltip :options="{placement: 'top'}">
                                        <span slot="tip">Wert editieren</span>
                                        <mdb-btn color="geccomButtonTransparent" slot="reference" @click="openEditConfigurationImageOptionModal(index)" icon="edit"></mdb-btn>
                                    </mdb-tooltip>

                                    <mdb-tooltip :options="{placement: 'top'}">
                                        <span slot="tip">Wert löschen</span>
                                        <mdb-btn color="geccomButtonTransparent" slot="reference"  @click="deletePropertyValueOptionItem(index)" icon="trash"></mdb-btn>
                                    </mdb-tooltip>

                                    <mdb-tooltip :options="{placement: 'top'}">
                                        <span slot="tip">Wert duplizieren</span>
                                        <mdb-btn slot="reference" color="geccomButtonTransparent" size="sm" icon="copy"></mdb-btn>
                                    </mdb-tooltip>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--container-related-image-->
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
                                <span slot="tip">Neue Regel erstellen</span>
                                <!--<mdb-btn color="geccomButtonInfo" slot="reference" @click="addNewRule()"><mdb-icon icon="plus" /> Neue Regel erstellen</mdb-btn>-->
                                <mdb-btn color="geccomButtonGreen" @click="addNewRule()" icon="plus">Neue Regel erstellen</mdb-btn>
                            </mdb-col>
                        </mdb-row>
                    </div>
                </mdb-modal-header>
                <mdb-modal-body>
                    <div v-for="(ruleItem, newRuleIndex) in newRule">
                        <mdb-row>
                            <mdb-col md="10">
                                <mdb-collapse :toggleTag="['button']" :togglers="1" :toggleClass="['btn btn-geccomButtonGreen ripple-parent']" :toggleText="[`${currentSelectedProperty} Regel ${newRuleIndex+1}` ]">
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
                                                <mdb-col md="12">
                                                    <div class="float-right">
                                                        <mdb-btn color="blue-grey" @click="addRowCondition(newRuleIndex)" size="sm" icon="plus"> Neue Bedingung</mdb-btn>
                                                        <mdb-btn color="blue-grey" @click="addRowConditionGroup" size="sm" icon="plus"> Neue Gruppe</mdb-btn>
                                                    </div>
                                                </mdb-col>
                                            </mdb-row>
                                            <mdb-row class="ruleRow gcm-hoverableRow"  v-for="(inputCond, conditionIndex) in ruleItem.condition">
                                                <mdb-col md="12" v-if="conditionIndex != 0">
                                                    <mdb-btn-group>
                                                        <div class="dmg-radio-toolbar">
                                                            <input type="radio" v-model="newRule[newRuleIndex].condition[conditionIndex].relationalCondition" :id="`condition_button_${ruleItem.id}_${inputCond.id}_or`" :name="`condition_button_${ruleItem.id}_${inputCond.id}_or`" value="or">
                                                            <label :for="`condition_button_${ruleItem.id}_${inputCond.id}_or`">OR</label>
                                                            <input type="radio" v-model="newRule[newRuleIndex].condition[conditionIndex].relationalCondition"  :id="`condition_button_${ruleItem.id}_${inputCond.id}_and`" :name="`condition_button_${ruleItem.id}_${inputCond.id}_and`" value="and">
                                                            <label :for="`condition_button_${ruleItem.id}_${inputCond.id}_and`">AND</label>
                                                            <input type="radio" v-model="newRule[newRuleIndex].condition[conditionIndex].relationalCondition"  :id="`condition_button_${ruleItem.id}_${inputCond.id}_compare`" :name="`condition_button_${ruleItem.id}_${inputCond.id}_compare`" value="compare">
                                                            <label :for="`condition_button_${ruleItem.id}_${inputCond.id}_compare`">Vergleich</label>
                                                        </div>
                                                    </mdb-btn-group>
                                                </mdb-col>
                                                <mdb-col md="2">
                                                    <div class="gcm-conditionBorder"></div>
                                                    <select class="browser-default custom-select" v-model="newRule[newRuleIndex].condition[conditionIndex].parentUniqueId" :id="`condition_model_${ruleItem.id}_${inputCond.id}`" @change="onChangePropertyRule(newRule[newRuleIndex].condition[conditionIndex].parentUniqueId, newRuleIndex, conditionIndex)">
                                                        <option disabled>Merkmalauswahl</option>
                                                        <option v-for="option in allProperties" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                                    </select>
                                                </mdb-col>
                                                <mdb-col md="1">
                                                    <select v-model="newRule[newRuleIndex].condition[conditionIndex].operationCondition"  @change="onChangeSetNullOperationTerm(newRuleIndex,conditionIndex)" class="browser-default custom-select gcm-selectFontSize">
                                                        <option value="0">Operatoren</option>
                                                        <option value="1">+</option>
                                                        <option value="2">-</option>
                                                        <option value="3">*</option>
                                                        <option value="4">/</option>
                                                    </select>
                                                </mdb-col>
                                                <mdb-col md="2" v-if="newRule[newRuleIndex].condition[conditionIndex].operationCondition != null">
                                                    <div class="gcm-conditionBorder"></div>
                                                    <select class="browser-default custom-select" v-model="newRule[newRuleIndex].condition[conditionIndex].operationTerm" :id="`condition_operationTerm_model_${ruleItem.id}_${inputCond.id}`">
                                                        <option disabled>Merkmalauswahl</option>
                                                        <option v-for="option in allProperties" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                                    </select>
                                                </mdb-col>
                                                <mdb-col md="2">
                                                    <select class="browser-default custom-select" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionBy" :id="`condition_model_${ruleItem.id}_${inputCond.id}`">
                                                        <option disabled>Bedingungen</option>
                                                        <option value="1">Hat einen der Werte</option>
                                                        <option value="2">Hat keinen der Werte</option>
                                                        <option value="3">Hat keinen Wert</option>
                                                        <option value="4">Hat einen beliebigen Wert</option>
                                                        <option value="5">Konponente ist inaktive</option>
                                                        <option value="6">Konponente ist aktive</option>
                                                        <option value="7">Liefern unselected</option>
                                                        <option value="8">Einblenden wenn einen der Werte</option>
                                                        <option value="9">Hat der Wert größer als</option>
                                                        <option value="13">Hat der Wert kleiner als</option>
                                                        <option value="10">Hat der Wert größer gleich als</option>
                                                        <option value="14">Hat der Wert kleiner gleich als</option>
                                                        <option value="11">Hat der Wert größer als das Merkmal</option>
                                                        <option value="12">Hat der Wert kleiner als das Merkmal</option>

                                                    </select>
                                                </mdb-col>
                                                <mdb-col md="2">
                                                    <mdb-form-inline class="gcm-ruleCheckbox">
                                                        <div v-for="(propertyItemValue, propertyItemValueIndex) in newRule[newRuleIndex].condition[conditionIndex].conditionValue">
                                                            <div v-if="newRule[newRuleIndex].condition[conditionIndex].dataType == 'radioBox' || newRule[newRuleIndex].condition[conditionIndex].dataType == 'checkBox' || newRule[newRuleIndex].condition[conditionIndex].dataType == 'imageList' || newRule[newRuleIndex].condition[conditionIndex].dataType == 'selectBox'">
                                                                <input type="checkbox" class="form-check-input" :id="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionValue[propertyItemValueIndex].value" :value="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`">
                                                                <label class="form-check-label" :for="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`">{{propertyItemValue.name}}</label>
                                                            </div>
                                                            <div v-else-if="newRule[newRuleIndex].condition[conditionIndex].dataType == 'textField' && newRule[newRuleIndex].condition[conditionIndex].conditionBy == 1">
                                                                min <input type="text" class="form-check-input" :id="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionValue[propertyItemValueIndex].min">
                                                                max <input type="text" class="form-check-input" :id="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionValue[propertyItemValueIndex].max">
                                                            </div>
                                                            <div v-else-if="newRule[newRuleIndex].condition[conditionIndex].dataType == 'textField'  && (newRule[newRuleIndex].condition[conditionIndex].conditionBy == 4  || newRule[newRuleIndex].condition[conditionIndex].conditionBy == 9 || newRule[newRuleIndex].condition[conditionIndex].conditionBy == 13|| newRule[newRuleIndex].condition[conditionIndex].conditionBy == 14)">
                                                                Wert <input type="text" class="form-check-input" :id="`${ruleItem.id}_${inputCond.id}_${propertyItemValue.name}`" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionValue[propertyItemValueIndex].min">
                                                            </div>
                                                            <div v-else-if="newRule[newRuleIndex].condition[conditionIndex].dataType == 'textField'  && (newRule[newRuleIndex].condition[conditionIndex].conditionBy == 11 || newRule[newRuleIndex].condition[conditionIndex].conditionBy == 12)">
                                                                <select class="browser-default custom-select" v-model="newRule[newRuleIndex].condition[conditionIndex].conditionValue[propertyItemValueIndex].name" :id="`condition_model_${ruleItem.id}_${inputCond.id}`" @change="onChangePropertyRule(newRule[newRuleIndex].condition[conditionIndex].parentUniqueId, newRuleIndex, conditionIndex)">
                                                                    <option disabled>Merkmalauswahl</option>
                                                                    <option v-for="option in allProperties" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </mdb-form-inline>

                                                </mdb-col>
                                                <mdb-col md="1">
                                                    <mdb-btn color="geccomButtonRed" @click="deleteRowCondition(newRuleIndex, conditionIndex)" size="sm" icon="trash"></mdb-btn>
                                                </mdb-col>
                                            </mdb-row>
                                        </div>
                                    </mdb-card>
                                    <hr>
                                    <mdb-card class="card-body">
                                        <mdb-card-title class="gcm-cardTitle">Restriktion</mdb-card-title>
                                        <div class="container-fluid gcm-container-fluid">
                                            <mdb-row class="gcm-hoverableRow">
                                                <mdb-col md="6">
                                                    <mdb-form-inline class="gcm-ruleCheckbox">
                                                        <div v-for="(propertyItemAllowedValue, propertyItemAllowedValueIndex) in newRule[newRuleIndex].allowedValues">
                                                            <input type="checkbox" class="form-check-input" :id="`${ruleItem.id}_${propertyItemAllowedValue.name}`" v-model="newRule[newRuleIndex].allowedValues[propertyItemAllowedValueIndex].value" :value="`${ruleItem.id}_${propertyItemAllowedValue.name}`">
                                                            <label class="form-check-label" :for="`${ruleItem.id}_${propertyItemAllowedValue.name}`">{{propertyItemAllowedValue.name}}</label>
                                                        </div>
                                                    </mdb-form-inline>
                                                </mdb-col>
                                                <mdb-col md="2">
                                                    <div><input type="text" class="form-check-input" v-model="newRule[newRuleIndex].conditionalEvent"></div>
                                                </mdb-col>
                                            </mdb-row>
                                        </div>
                                    </mdb-card>
                                    <hr>
                                </mdb-collapse>
                            </mdb-col>
                            <mdb-col md="2" class="gcm-colHeight">
                                <mdb-btn color="geccomButtonRed" @click="deleteNewRule(newRuleIndex)" size="sm" icon="trash">Regel löschen</mdb-btn>
                            </mdb-col>
                        </mdb-row>
                    </div>

                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="geccomButtonRed" @click="ruleModal = false">Schließen</mdb-btn>
                    <mdb-btn color="geccomButtonGreen" @click.native="saveRule()">Speichern</mdb-btn>
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
                        <iframe class="embed-responsive-item" src="http://support.dmg-software.de:8080" allowfullscreen></iframe>
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
                    <mdb-btn color="geccomButtonRed" @click="confirmDeletePropertyValueOptionItem">Löschen</mdb-btn>
                    <mdb-btn color="geccomButtonGreen" @click.native="confirmDeleteCharacteristicsModal = false">Abbrechen</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>

            <!-- END MODAL DELETE CHARACTERISTICS -->


            <!-- START MODAL SETTINGS CHARACTERISTICS -->

            <mdb-modal size="fluid"  v-if="settingsCharacteristicsModal" @close="settingsCharacteristicsModal = false" class="text-left">
                <mdb-modal-header center :close="false">
                    <p class="heading"><h2 class="display-5">Merkmalwerte Einstellungen</h2></p>
                </mdb-modal-header>
                <mdb-modal-body>

                    <mdb-row class="mb-3">
                        <mdb-col xl="12">
                            <mdb-card>
                                <mdb-card-header color="info-color">Machen Sie hier Ihre Einstellungen</mdb-card-header>
                                <mdb-card-body>
                                    <mdb-row class="d-flex justify-content-center">
                                        <mdb-col xl="12">
                                            <table class="table">
                                                <tbody>
                                                <tr>
                                                    <td><mdb-input type="text" placeholder="Titel" v-model="configuration_title" /></td>
                                                    <td><mdb-input type="text" placeholder="Wert" v-model="configuration_value" /></td>
                                                    <td><mdb-input type="text" placeholder="Min" v-model="configuration_min" /></td>
                                                    <td><mdb-input type="text" placeholder="Max" v-model="configuration_max" /></td>
                                                    <td>
                                                        <select v-model="configuration_procenttype" class="browser-default custom-select gcm-selectFontSize">
                                                            <option value="1">Fix Preis</option>
                                                            <option value="2">Prozentig</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="hidden" id="uniqueid" name="uniqueid" v-model="configuration_uniqueid">
                                                        <mdb-input type="number" placeholder="Preis" v-model="configuration_price" /></td>
                                                    <td>
                                                        <select v-model="configuration_visible" class="browser-default custom-select gcm-selectFontSize">
                                                            <option value="0">Nein</option>
                                                            <option value="1">Ja</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select v-show="configuration_procenttype =='Prozentig'" v-model="reatalted_price_component" class="browser-default custom-select gcm-selectFontSize">
                                                            <option v-for="option in allProperties" v-bind:value="option.uniqueId" >{{ option.name }}</option>
                                                        </select>
                                                    </td>
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
                                            <mdb-file-upload v-show="configuration_image_name == undefined || configuration_image_name == ''" :files="imageUpload"  ref="productBaseImage" @change="handleImageChange" class="mt-0 mb-3" />
                                            <img v-show="configuration_image_name != ''" v-bind:src="getImagePath(configuration_image_name)" :width="configuration_image_width"  :height="configuration_image_height">
                                            <span v-show="configuration_image_name != ''" class="change-product-x" @click="removeImageItem()"><i class="fas fa-times" aria-hidden="true"></i></span>
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
                                                    <ckeditor v-model="configurationPropertyAdditionalInformation" :config="editorConfig"></ckeditor>
                                                </mdb-col>
                                                <mdb-col xl="4" class="pb-2">
                                                    <h3>Svg</h3>
                                                    <div style="width:100%">
                                                        <mdb-col xl="4">
                                                            <textarea  rows="8" cols="50" v-model="configuration_svgContent"></textarea>
                                                        </mdb-col>
                                                    </div>
                                                </mdb-col>
                                            </mdb-row>
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


            <!-- START MODAL Related Bild SETTINGS CHARACTERISTICS -->

            <mdb-modal size="fluid"  v-if="settingsImageCharacteristicsModal" @close="settingsImageCharacteristicsModal = false" class="text-left">
                <mdb-modal-header center :close="false">
                    <p class="heading"><h2 class="display-5">Merkmalwerte Einstellungen</h2></p>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-row class="mb-3">
                        <mdb-col xl="12">
                            <mdb-card>
                                <mdb-card-header color="info-color">Machen Sie hier Ihre Einstellungen</mdb-card-header>
                                <mdb-card-body>
                                    <mdb-row class="d-flex justify-content-center">
                                        <mdb-col xl="12">
                                            <table class="table">
                                                <tbody>
                                                <tr>
                                                    <td>{{configuration_related_image_title}}</td>
                                                    <td></td>
                                                    <input type="hidden" id="related_uniqueid" name="uniqueid" v-model="configuration_related_image_uniqueid">
                                                    <input type="hidden" id="related_image_uniqueid" name="uniqueid" v-model="current_image_configuration_uniqueid">
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table class="table">
                                                <tbody>
                                                <tr>
                                                    <td><mdb-input  type="text" placeholder="Bildbreite" v-model="configuration_related_image_width" /></td>
                                                    <td><mdb-input  type="text" placeholder="Bildhöhe" v-model="configuration_related_image_height" /></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <mdb-file-upload v-show="configuration_related_image_name == undefined || configuration_related_image_name == ''" :files="imageUpload"  ref="productBaseImage" @change="handleRelatedImageChange" class="mt-0 mb-3" />
                                            <img v-show="configuration_related_image_name != ''" v-bind:src="getImagePath(configuration_related_image_name)" :withd="configuration_related_image_width"  :height="configuration_related_image_height">
                                            <span v-show="configuration_related_image_name != ''" class="change-product-x" @click="removeRelatedImageItem()"><i class="fas fa-times" aria-hidden="true"></i></span>
                                        </mdb-col>
                                    </mdb-row>
                                </mdb-card-body>
                            </mdb-card>
                        </mdb-col>
                    </mdb-row>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="geccomButtonRed" @click="saveOptionRelatedImageConfiguration">Speichern</mdb-btn>
                    <mdb-btn color="geccomButtonGreen" @click.native="settingsImageCharacteristicsModal = false">Abbrechen</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>

            <!-- END MODAL Related Bild SETTINGS CHARACTERISTICS -->

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
            <ul id="right-click-menu" tabindex="-1" ref="dmgRightMenuGroup" v-on:blur="closeDmgRightMenuGroup"  v-if="dmgRightMenuGroup" v-bind:style="{top:dmgMenuTopGroup, left:dmgMenuLeftGroup}">
                <li style="text-align: center">Gruppen</li>
                <li @click="onCopyGroup"><small>{{ currentSelectedGroup}} kopieren</small></li>
                <li v-if="dmgRightMenuCopyGroupStatus" @click="onPasteGroup()"><small>{{ copingGroupNameComponent()}} hinzufügen</small></li>
                <li @click="onPastePropertyByGroup"><small>{{ getNameOfPastePropertyByGroup()}} hinzufügen</small></li>
            </ul>
            <ul id="right-click-menu" tabindex="-1" ref="dmgRightMenuProperty" v-on:blur="closeDmgRightMenuProperty"  v-if="dmgRightMenuProperty" v-bind:style="{top:dmgMenuTopProperty, left:dmgMenuLeftProperty}">
                <li style="text-align: center">Eigenschaften</li>
                <li @click="onCopyProperty()"><small>{{currentSelectedProperty}} kopieren</small></li>
                <li @click="onPasteProperty"><small>{{propertyNameCopied}} hinzufügen</small></li>
            </ul>
        </mdb-row>
        <mdb-modal size="fluid" success v-if="languageFileAdditionalPopup" @close="languageFileAdditionalPopup = false" class="text-center">
            <mdb-modal-header center :close="false">
                <p class="heading">Edit {{selectedLanguageField}} in {{selectedLanguage}} </p>
            </mdb-modal-header>
            <mdb-modal-body>
                <div style="padding-left: 20px;">
                    <ckeditor v-model="languageContent[selectedLanguage][selectedLanguageField]" :config="editorConfig"></ckeditor>
                </div>
            </mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn color="geccomButtonRed" @click="saveLanguageContent()">Speichern</mdb-btn>
                <mdb-btn color="geccomButtonGreen" @click.native="languageFileAdditionalPopup = false">Abbrechen</mdb-btn>
            </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
  import { mdbFormInline,mdbSwitch,mdbCollapse, mdbBtn, mdbModal,mdbBtnGroup, mdbBtnToolbar, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, Popover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody,mdbCard, mdbCardBody,mdbJumbotron,mdbSelect,FormInline,mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbCardTitle, mdbCardText,  mdbCardHeader} from 'mdbvue';
  import { cloneDeep, tap, set } from 'lodash'
  import FileCsvUpload from '@/datatypes/FileCsvUpload'
  import FileDragDropInstant from '@/datatypes/FileDragDropInstant'
  import ConfigSelect from '@/datatypes/ConfigSelect'
  import axios from 'axios';
  import mdbWysiwyg from 'mdb-wysiwyg';
  import draggable from 'vuedraggable';
  import brace from 'brace';
  import { Ace as AceEditor, Split as SplitEditor } from 'vue2-brace-editor';
  import 'brace/mode/javascript';
  import 'brace/theme/chrome';
  import Fullscreen from "vue-fullscreen/src/component.vue";
  import mdbFileUpload from 'mdb-file-upload';

  const obj = {};

  export default {
    name: 'dmg-template',
    components: {
      draggable,
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
      if(typeof(dmgRestApiUrl) != "undefined") {
        this.restApiDomain = dmgRestApiUrl;
      }

      if(typeof(dmgShopBaseUrl) != "undefined") {
        this.gcmShopBaseUrl = dmgShopBaseUrl;
      }

      if(typeof(dmgUserId) != "undefined") {
        this.customerId = dmgUserId;
      }
      this.fetchProperty(localStorage.getItem('selectedTemplateId'));
    },
    data () {
      return {
        keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        ruleModal:false,
        productModal: this.showProduct,
        svgContent:'',
        menuOptions: ["Merkmal kopieren","Mekmal hinzufügen"],
        dataTypes: [
          { text: 'Datentypen', value: null, disabled: true},
          { text: 'Checkbox', value: 'checkBox' },
          { text: 'Liste mit Bilder', value: 'imageList' },
          { text: 'Expression', value: 'expression' },
          { text: 'Matrix', value: 'matrix' },
          { text: 'ProductAttribute', value: 'productAttribute' },
          { text: 'Radio', value: 'radioBox' },
          { text: 'Select', value: 'selectBox'},
          { text: 'Share', value: 'share' },
          { text: 'Text2Image', value: 'text2image' },
          { text: 'TextArea', value: 'textArea' },
          { text: 'TextField', value: 'textField'},
          { text: 'Font', value: 'font'},
          { text: 'Upload', value: 'upload'},
          { text: 'Bild', value: 'imageBox'},
          { text: 'Bilder', value: 'imagecollection'},
          { text: 'Designer', value: 'designer'},
          { text: 'Hidden', value: 'hidden'},
        ],
        standardValues: [
          { text: 'Standardwert auswählen', value: '', disabled: true, selected: true },
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
        allPropertiesAsMultipleOption: [
          { text: 'Felder auswählen', value: '', disabled: true, selected: true },
        ],
        allReletedMultipleOption: [
          { text: 'Felder auswählen', value: '', disabled: true, selected: true },
        ],
        currentSelectedGroupCopy: null,
        allPropertiesForOption: [],
        propertyItemValues : [],
        restApiDomain: localStorage.getItem('restApiDomain'),
        dragAndDropCapable: false,
        customerId: localStorage.getItem('customerId'),
        selectedTemplate: localStorage.getItem('selectedTemplateName'),
        selectedTemplateId: localStorage.getItem('selectedTemplateId'),
        selectedTemplateFolder: localStorage.getItem('selectedTemplateName').replace(/\s+/g,"_"),
        templates: (obj[localStorage.getItem('selectedTemplateName')] = {groups: null, property: null, propertyValue: null}, obj),
        basePathRestApi: localStorage.getItem('basePath'),
        basePathImg: 'https://api.dmg-software.de/api/getImagePath/',
        conditionValue: {uniqueId: null, name: null, value:null, min:null, max: null},
        allowedValues: {uniqueId : null, name: null, value:null},
        conditionItem: {
          id: null, propertyId: null, propertyName: null, relationalCondition: null, operationCondition: null, operationTerm:null, conditionBy: null , conditionValue:[]
        },
        configuration_visible: false,
        ruleItem: {id: null, condition: null, allowedValues: [], conditionalEvent:null},
        allRules :[] ,
        imgRelatedCollection: [],
        tpls : {},
        uniqueIdCollection: [],
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
        dmgRightMenuProperty: false,
        dmgRightMenuGroup: false,
        dmgMenuTopGroup: 0,
        dmgMenuLeftGroup:0,
        dmgMenuTopProperty: 0,
        dmgMenuLeftProperty:0,
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
        currentSelectedUniqueId: '',
        propertyNameCopied: '',
        tplProperty: '',
        changingPropertyId: 0,
        docuIdModal:false,
        groupModal: false,
        characteristicsModal: false,
        characteristicsModalUpdate: false,
        characteristicsValuesModal: false,
        matrixModal: false,
        configuratorModal:false,
        matrixDataView: {},
        matrixDataViewHeader: {},
        selectBoxData: [],
        selectBoxDataBuffer: [],
        selectBoxPosition:1,
        selectBoxPrice: '',
        currentPropertyIdOnCopy: null,
        selectBoxValue: '',
        selectBoxTitle: '',
        selectBoxMax: '',
        selectBoxMin: '',
        configurationData: {},
        configuration_js_id: '',
        configuration_uniqueid: null,
        configuration_title: '',
        configuration_min: '',
        configuration_max: '',
        configuration_price: null,
        configuration_procenttype: '1',
        reatalted_price_component: null,
        configuration_value: '',
        configuration_image:null,
        configuration_image_name:'',
        configuration_image_width: '',
        configuration_image_height: '',
        configuration_position_y: '',
        configuration_position_x: '',
        configuration_sku: '',
        configuration_index: 0,
        configuration_related_image_index: 0,
        configuration_related_image_name: '',
        configuration_related_image_title: '',
        configuration_related_image_width: 0,
        configuration_related_image_height: 0,
        configuration_related_image_uniqueid: '',
        current_image_configuration_uniqueid: '',
        settingsImageCharacteristicsModal: false,
        deleteCharacteristicsModal: false,
        confirmDeleteCharacteristicsModal: false,
        deleteOptionRelaredImageItemIndex: null,
        confirmDeleteRelatedImageCharacteristicsModal: false,
        settingsCharacteristicsModal: false,
        matrixViewModal: false,
        eyeGroup: false,
        max: 80,
        text: '',
        matrixFiles: [],
        fieldValue:'',
        fieldPriceValue:'',
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
        configurationPropertyAdditionalInformation: '',
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
        gcmShopBaseUrl: 'https://holzplatte.de',
        minValue: '',
        maxValue: '',
        unitiValue: '',
        procenttype: '1',
        changingGroupId: 0,
        unitValue: '',
        changeGroupModal: false,
        propertyToImageBox: '',
        imgWidth: '',
        imgHeight: '',
        isDigit: null,
        areMultiplyFields: false,
        multiplyFields: '',
        relatedMultiplyFields: '',
        uniqueId: '',
        dmgIsbasicPrice: 0,
        configuration_svgContent:'',
        isHidden: null,
        withZoom: null,
        groupnameNameToCopy: '',
        propertyNameRightClicked:'',
        propertyNameTarget: '',
        selectedCompareFiled: '',
        checkboxItem: {
          checkboxVlues: []
        },
        languageContent:[],
        languageFileds: [{"description": ''}, {"shortDescription": ''}],
        languages:['en','ro'],
        selectedLanguage:"en",
        selectedLanguageField:"",
        editorData: '',
        languageFileAdditionalPopup: false,
        editorConfig: {
          // The configuration of the editor.
        }
      }
    },
    addTpl: {
    },
    methods: {
      onPastePropertyByGroup() {
        this.copyPropertyComponent();
      },
      onCopyGroup() {
        localStorage.setItem('copingGroupName', this.currentSelectedGroup);
        localStorage.setItem('copingTemplateName', localStorage.getItem('selectedTemplateName'));
        localStorage.setItem('copingTemplateId', localStorage.getItem('selectedTemplateId'));
      },
      dmgRightMenuCopyGroupStatus() {
        return localStorage.getItem('copingGroupName').length > 0;
      },
      onPasteGroup() {
        console.log("copy:"+this.currentSelectedGroupCopy);
        this.copyGroupComponent();
        this.dmgRightMenuGroup = false;
      },
      onCopyProperty() {
        localStorage.setItem('currentPropertyId', this.currentPropertyIdOnCopy);
        localStorage.setItem('currentGroupId', this.currentSelectedGroup);
        localStorage.setItem('currentTemplateId', this.selectedTemplateId);
        localStorage.setItem('propertyNameCopied', this.propertyNameRightClicked);
        this.propertyNameCopied = this.propertyNameRightClicked;
        this.dmgRightMenuGroup = false;
        this.dmgRightMenuProperty = false;
      },
      onPasteProperty:function() {
        this.copyPropertyComponent();
      },
      setDmgRightMenuProperty: function(top, left) {
        this.dmgMenuTopProperty = top + 'px';
        this.dmgMenuLeftProperty = left + 'px';
      },
      closeDmgRightMenuProperty() {
        this.dmgRightMenuProperty = false;
      },
      openDmgRightMenuProperty(e, propertyId, propertyName) {
        this.currentPropertyIdOnCopy = propertyId;
        this.dmgRightMenuProperty = true;
        this.currentSelectedProperty = propertyName;
        this.propertyNameRightClicked = propertyName;
        let obj = e.target
        let objSet = obj.getBoundingClientRect();
        //console.log(objSet);
        this.$nextTick(function() {
          this.$refs.dmgRightMenuProperty.focus();
          this.setDmgRightMenuProperty(objSet.top, objSet.width+200)
          this.setDmgRightMenuProperty(objSet.top, objSet.width+200)
          e.preventDefault();
        }.bind(this));
      },
      setDmgRightMenuGroup: function(top, left) {
        this.dmgMenuTopGroup = top + 'px';
        this.dmgMenuLeftGroup = left + 'px';
      },
      closeDmgRightMenuGroup() {
        this.dmgRightMenuGroup = false;
      },
      openDmgRightMenuGroup(e, groupId, groupnameName) {
        this.dmgRightMenuGroup = true;
        this.currentSelectedGroup = groupnameName;
        this.groupnameNameToCopy = groupnameName;
        this.currentSelectedGroupCopy = groupId;
        let obj = e.target
        let objSet = obj.getBoundingClientRect();
        //console.log(objSet);
        //console.log("groupId:"+groupId);
        this.$nextTick(function() {
          this.$refs.dmgRightMenuGroup.focus();
          this.setDmgRightMenuGroup(objSet.top, objSet.width-200)
          e.preventDefault();
        }.bind(this));
      },
      copingGroupNameComponent() {
        return localStorage.getItem('copingGroupName');
      },
      copyGroupComponent() {
        let self = this;
        let copingTemplateName = this.encode(JSON.stringify(localStorage.getItem('copingTemplateName')));
        let encodedCopingGroupName = this.encode(JSON.stringify(localStorage.getItem('copingGroupName')));
        let encodedTargetTemplateName = this.encode(JSON.stringify(localStorage.getItem('selectedTemplateName')));

        axios.post(this.restApiDomain+'/api/dmgCopyGroupValue', {
          encodedCopingGroupName:  encodedCopingGroupName,
          customerId: this.customerId,
          targetTemplateName: encodedTargetTemplateName,
          copingTemplateName: copingTemplateName,
          copingTemplateId: localStorage.getItem('copingTemplateId')
        },{headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            self.fetchProperty(localStorage.getItem('selectedTemplateId'));
          }, (error)  =>  {
            console.log(error);
          });
      },
      copyPropertyComponent() {
        let self = this;

        let encodedString = this.encode(JSON.stringify(this.selectedTemplate));
        axios.post(this.restApiDomain+'/api/dmgCopyPropertyValue', {
          propertyValueId:  localStorage.getItem('currentPropertyId'),
          customerId: this.customerId,
          selectedPropertyId: this.currentSelectedGroupCopy,
          templateId: localStorage.getItem('currentTemplateId'),
          tplName: encodedString
        },{headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            self.fetchProperty(localStorage.getItem('selectedTemplateId'));
          }, (error)  =>  {
            console.log(error);
          });
      },
      checkMove() {
        /*
        let self = this;
        let positionIndex = 0;
        Object.values(self.propertyGroup[self.currentSelectedGroup]).forEach(function (keyObj) {
          self.propertyGroup[self.currentSelectedGroup][positionIndex].position = positionIndex;
          positionIndex++;
        });
        console.log(JSON.stringify(self.propertyGroup[self.currentSelectedGroup]));
        let encodedPropertyRecord = this.encode(JSON.stringify(self.propertyGroup[self.currentSelectedGroup]));
        axios.post(this.restApiDomain + '/api/templateAllProperty', {
          customerId: this.customerId,
          tplData: encodedPropertyRecord
        }, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        .then(function (response) {

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
        */
      },
      checkGroupname(){

      },
      getRelatedCollection() {
        let self = this;

        //uniqueIdCollection
        let propertyValId = this.findPropertyIdByUniueId(this.propertyToImageBox);
        axios.get(this.restApiDomain+"/api/propertyVal/"+propertyValId)
          .then((response)  => {
            self.selectBoxData = [];
            let encodedPropValItem = self.decode(response.data['propValItem']);
            let imgRelatedCollectionLocal = JSON.parse(encodedPropValItem);
            if(imgRelatedCollectionLocal.data_type == "radioBox"
              || imgRelatedCollectionLocal.data_type == "selectBox" || imgRelatedCollectionLocal.data_type == "imageList"
              || imgRelatedCollectionLocal.data_type == "checkBox" || imgRelatedCollectionLocal.data_type == "font"
            ) {
              let additionalDataImg= JSON.parse(this.decode(imgRelatedCollectionLocal.additionalData));
              additionalDataImg.forEach(function (itemValueObj, itemValueObjIndex) {
                let storedItem = self.findAdditionalItemByUniqueId(itemValueObj.uniqueId);
                if(storedItem == null) {
                  self.selectBoxData.push({"title": itemValueObj.title, "related_uniqueId": itemValueObj.uniqueId, "uniqueId": null, image: '', width: '', height: ''}) ;
                } else {
                  self.selectBoxData.push({"title": itemValueObj.title, "related_uniqueId": itemValueObj.uniqueId, "uniqueId": storedItem.uniqueId, image: storedItem.image, width: storedItem.width, height: storedItem.height}) ;
                }
              });
            }
          });
      },
      findAdditionalItemByUniqueId(uniqueId) {
        let relatedUniqueItem = null;

        this.selectBoxDataBuffer.forEach(function (itemValueBuffer, itemValueBufferIndex) {
          if(itemValueBuffer.related_uniqueId == uniqueId) {
            relatedUniqueItem = itemValueBuffer;
          }
        });

        return relatedUniqueItem;
      },
      saveOptionRelatedImageConfiguration() {
        if(this.current_image_configuration_uniqueid == ''){
          this.current_image_configuration_uniqueid =  Date.now();
        }

        this.configurationData =
          {
            "title": this.configuration_related_image_title, "image": this.configuration_related_image_name, 'related_uniqueId':this.configuration_related_image_uniqueid, "width" : this.configuration_related_image_width,
            "height": this.configuration_related_image_height, "uniqueId": this.current_image_configuration_uniqueid
          };

        this.selectBoxData[this.configuration_related_image_index] = this.configurationData;
        this.settingsImageCharacteristicsModal = false;
      },
      getNameOfPastePropertyByGroup() {
        return localStorage.getItem('propertyNameCopied');
      },
      getItemConditionValue(savedValues, parentUniqueId) {
        let self = this;
        let itemValues = [];
        let propertyValueItem = this.getAllPropertyValues(parentUniqueId);
        let additionalData = JSON.parse(this.decode(propertyValueItem.additionalData));

        if(propertyValueItem != null) {
          additionalData.forEach(function (itemValueObj) {
            let itemPosition = self.getItemFromCollectionByUniqueId(itemValueObj, savedValues);
            if(itemPosition == null) {
              itemValues.push(
                {
                  uniqueId: itemValueObj.uniqueId,
                  name: itemValueObj.value,
                  value: false
                }
              );
            } else {
              itemValues.push(
                {
                  uniqueId: itemValueObj.uniqueId,
                  name: itemValueObj.value,
                  value: itemPosition.value
                }
              );
            }
          });
        }

        return itemValues;
      },
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
      getAllPropertyValues(parentUniqueId) {
        let allProps = null;
        Object.entries(this.allPropertyValues).forEach(([key, objectValue]) => {
          if(objectValue.uniqueId == parentUniqueId) {
            allProps = objectValue;
          }
        });
        return allProps;
      },
      onChangePropertyRule(parentUniqueId, rowId, columnId) {
        let self = this;
        let itemValues = [];
        //newRule[newRuleIndex].condition[conditionIndex].conditionBy
        //self.newRule[rowId].condition[columnId].conditionBy
        let keyObj = this.getAllPropertyValues(parentUniqueId);
        if(parentUniqueId == keyObj.uniqueId && (keyObj.data_type == "radioBox"
          || keyObj.data_type == "selectBox" || keyObj.data_type == "imageList" || keyObj.data_type == "checkBox" || keyObj.data_type == "font")
        ) {
          let additionalData = JSON.parse(this.decode(keyObj.additionalData));
          if(additionalData != null) {
            additionalData.forEach(function (itemValueObj) {
              itemValues.push(
                {
                  uniqueId: itemValueObj.uniqueId,
                  name: itemValueObj.value,
                  value: false
                }
              );
            });
            self.newRule[rowId].condition[columnId].uniqueId = this.currentSelectedUniqueId;
            //self.newRule[rowId].condition[columnId].propertyParentId = keyObj.parentId ;
            self.newRule[rowId].condition[columnId].parentUniqueId = keyObj.uniqueId ;
            self.newRule[rowId].condition[columnId].dataType = keyObj.data_type ;
            self.newRule[rowId].condition[columnId].conditionValue = itemValues;
          }
        } else if(keyObj.data_type == "textField" && self.newRule[rowId].condition[columnId].conditionBy == 11 || keyObj.data_type == "textField" && self.newRule[rowId].condition[columnId].conditionBy == 12){
          //self.newRule[rowId].condition[columnId].propertyId = keyObj.propertyId;
          //self.newRule[rowId].condition[columnId].propertyParentId = keyObj.parentId ;
          self.newRule[rowId].condition[columnId].uniqueId = this.currentSelectedUniqueId;
          self.newRule[rowId].condition[columnId].parentUniqueId = keyObj.uniqueId ;
          self.newRule[rowId].condition[columnId].dataType = keyObj.data_type ;
          let tmpConditionValue = this.newRule[rowId].condition[columnId].conditionValue[0].name;
          self.newRule[rowId].condition[columnId].conditionValue = [];
          self.newRule[rowId].condition[columnId].conditionValue.push({
            uniqueId: this.currentSelectedUniqueId,
            name: tmpConditionValue,
            value: false
          });
        } else if(keyObj.data_type == "textField"){
          //self.newRule[rowId].condition[columnId].propertyId = keyObj.propertyId;
          //self.newRule[rowId].condition[columnId].propertyParentId = keyObj.parentId ;
          self.newRule[rowId].condition[columnId].uniqueId = this.currentSelectedUniqueId;
          self.newRule[rowId].condition[columnId].parentUniqueId = keyObj.uniqueId ;
          self.newRule[rowId].condition[columnId].dataType = keyObj.data_type ;
          self.newRule[rowId].condition[columnId].conditionValue = [];
          self.newRule[rowId].condition[columnId].conditionValue.push({min: null, max:null});
        }
        //console.log(JSON.stringify(self.newRule[rowId].condition[columnId]));
      },
      onChangeConditionType(conditionType) {
        //console.log("conditionType:::"+conditionType);
        //console.log("conditionTypes:::"+JSON.stringify(this.conditionTypes));
      },
      selectPropertyForRule(selectValue) {
        //console.log("sasa"+selectValue);
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
        let self = this;
        let allowedValues =[];
        this.selectBoxData.forEach(function (itemValueObj) {
          allowedValues.push(
            {
              uniqueId: itemValueObj.uniqueId,
              name: itemValueObj.value,
              value: false
            }
          );
        });
        if(this.selectBoxData.length == 0) {
          allowedValues.push(
            {
              uniqueId: this.currentSelectedUniqueId,
              name: this.currentSelectedProperty,
              value: false
            }
          );
        }
        this.newRule.push({
          id: this.newRule.length,
          condition: [],
          allowedValues: allowedValues
        });
      },
      addRowCondition(index) {
        this.newRule[index].condition.push({
          id: this.newRule[index].condition.length, parentUniqueId: null, uniqueId: null, propertyName: null, relationalCondition:null, operationCondition: null, operationTerm:null, conditionBy: null , conditionValue:[]
        });
        //console.log("kokoko-:::"+JSON.stringify(this.newCondition));
        //console.log("newRule-:::"+JSON.stringify(this.newRule));
      },
      deleteNewRule(index) {
        console.log(JSON.stringify(this.allRules));
        this.newRule.splice(index,1)
      },
      deleteRowConditionGroup(index) {
        this.newConditionGroup.splice(index,1)
      },
      deleteRowCondition(newRuleIndex,conditionIndex) {
        this.newRule[newRuleIndex].condition.splice(conditionIndex,1)
      },
      addRowConditionGroup() {
        this.newConditionGroup.push({
          one: ''
        })
      },
      getImagePath(imgName) {
        return this.gcmShopBaseUrl+"/"+imgName;
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
      removeKeys(obj, keys) {
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
      deletePropertyValueOptionItem(deleteOptionItemIndex) {
        this.confirmDeleteCharacteristicsModal = true;
        this.deleteOptionItemIndex = deleteOptionItemIndex;
      },
      deletePropertyValueImageOptionItem(deleteOptionItemIndex) {
        this.confirmDeleterelatedImageCharacteristicsModal = true;
        this.deleteOptionItemIndex = deleteOptionItemIndex;
      },
      confirmDeleteRelatedImagePropertyOptionItem() {
        this.selectBoxData.splice(this.deleteOptionRelaredImageItemIndex,1);
        this.confirmDeleteCharacteristicsModal = false;
      },
      confirmDeletePropertyValueOptionItem() {
        let self = this;
        Object.entries(this.selectBoxData).forEach(([key, propertyObj]) => {
          if(self.deleteOptionItemIndex == key) {
            self.selectBoxData.splice(key,1);
          }
        });
        this.confirmDeleteCharacteristicsModal = false;
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
      toggleConfigurationAdditionalInformation () {
        this.$refs['configurationFullscreenAdditionalInformationEditor'].toggle()
      },
      fullscreenChangeAdditionalInformation (fullscreenAdditionalInformationEditor) {
        this.fullscreenAdditionalInformationEditor = fullscreenAdditionalInformationEditor;
      },
      configurationFullscreenChangeAdditionalInformation (configurationFullscreenAdditionalInformationEditor) {
        this.configurationFullscreenAdditionalInformationEditor = configurationFullscreenAdditionalInformationEditor;
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
      getItemsFromProperty(newRuleIndex, conditionIndex, value) {
        let self= this;
        let itemValues = null ;
        //console.log("ASASASAS:::"+newRuleIndex+"--"+conditionIndex+"--"+value);
        //console.log("ZZZ"+JSON.stringify(this.newRule[newRuleIndex].condition[conditionIndex].conditionValue));
        Object.values(self.allPropertyValues).forEach(function (keyObj) {
          if(value == keyObj.name && (keyObj.data_type == "radioBox"
            || keyObj.data_type == "selectBox" || keyObj.data_type == "imageList" || keyObj.data_type == "checkBox" || keyObj.data_type == "font")
          ) {
            let additionalData = JSON.parse(this.decode(keyObj.additionalData));
            if(additionalData != null) {
              additionalData.forEach(function (itemValueObj) {
                self.newRule[newRuleIndex].condition[conditionIndex].conditionValue.push(
                  {
                    uniqueId: itemValueObj.uniqueId,
                    name: itemValueObj.value,
                    value: false
                  }
                )
              });
            }
          }
        });

        return itemValues;
      },
      getPropertyNameBy(id) {
        let self = this;
        let propertyName = '';

        Object.values(this.allProperties).forEach(function (keyObj) {
          if(keyObj.id == id) {
            propertyName = keyObj.name;
          }
        });
        return propertyName;
      },
      handleRelatedImageChange(uploadedFiles) {
        let self = this;

        for (let i = 0; i < uploadedFiles.length; i++) {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            let formData = new FormData();

            formData.append('name', uploadedFiles[i].name);
            formData.append('imageBlob', reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            axios.post(self.gcmShopBaseUrl+"/widgets/uploadfile/dmgImgFile",
              formData
            ).then(function(response) {
              self.configuration_related_image_name = response.data.data.imagePath;
            })
              .catch(function(error) {
                console.log('FAILURE!!'+error);
              });
          });
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      handleImageChange(uploadedFiles) {
        let self = this;

        for (let i = 0; i < uploadedFiles.length; i++) {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            let formData = new FormData();

            formData.append('name', uploadedFiles[i].name);
            formData.append('imageBlob', reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            axios.post(self.gcmShopBaseUrl+"/widgets/uploadfile/dmgImgFile",
              formData
            ).then(function(response) {
              self.configuration_image_name = response.data.data.imagePath;
            })
              .catch(function(error) {
                console.log('FAILURE!!'+error);
              });
          });
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      handleComponentImageChange(uploadedFiles) {
        let self = this;

        for (let i = 0; i < uploadedFiles.length; i++) {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            let formData = new FormData();

            formData.append('name', uploadedFiles[i].name);
            formData.append('imageBlob', reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
            axios.post(self.gcmShopBaseUrl+"/widgets/uploadfile/dmgImgFile",
              formData
            ).then(function(response) {
              self.templateImage = response.data.data.imagePath;
            })
              .catch(function(error) {
                console.log('FAILURE!!'+error);
              });
          });
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      goToSettingsCharacteristicsModal(indexConfig) {
        this.configuration_index = indexConfig;
        this.settingsCharacteristicsModal = true;
      },
      removeImageComponentItem() {
        this.templateImage = "";
      },
      removeImageItem() {
        this.configuration_image_name = "";
      },
      removeRelatedImageItem() {
        this.configuration_related_image_name = "";
      },
      saveOptionConfiguration() {
        // let configurationPropertyAdditionalInformation = this.$refs.configurationPropertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML;
        let configurationPropertyAdditionalInformation = this.configurationPropertyAdditionalInformation;
        //console.log("UIUIU");
        this.configurationData =
          {
            "price": this.configuration_price, 'title': this.configuration_title,"min": this.configuration_min,"max": this.configuration_max, 'value':this.configuration_value, "uniqueId" : this.configuration_uniqueid,"configuration_visible":this.configuration_visible,
            "image_name": this.configuration_image_name, "image_width": this.configuration_image_width, "configuration_svgContent": this.configuration_svgContent, "image_height": this.configuration_image_height, "reatalted_price_component":this.reatalted_price_component,
            "position_x": this.configuration_position_x, "position_y": this.configuration_position_y, "sku": this.configuration_sku, "configuration_procenttype": this.configuration_procenttype,
            "additionalInformation": configurationPropertyAdditionalInformation
          };
        //console.log(JSON.stringify(this.configurationData));
        //this.selectBoxData[this.configuration_index].configuration = this.configurationData;
        this.selectBoxData[this.configuration_index] = this.configurationData;
        this.settingsCharacteristicsModal = false;
      },
      findPropertyIdByUniueId(uniqueId) {
        let propertyId = null;
        this.uniqueIdCollection.forEach(function (itemValueObj, itemValueObjIndex) {
          if(itemValueObj.uniqueId == uniqueId) {
            propertyId = itemValueObj.id;
          }
        })

        return propertyId
      },
      fetchProperty(selectedTemplateId) {
        let self = this;
        let dataTypes  = this.dataTypes;
        let currentSelectedProperty = this.currentSelectedProperty;

        axios.get(this.restApiDomain+"/api/tplproperies/"+selectedTemplateId)
          .then((response)  =>  {
            this.loading = false;
            let encodedProperties = self.decode(response.data['properties']);
            let encodedGroups = "";
            let encodedpropertyValue = "";
            let encodedUniqueIds = "";

            if(typeof response.data['groups'] != "undefined") {
              encodedGroups = self.decode(response.data['groups']);
              self.propertyGroup = JSON.parse(encodedProperties);
            }

            if(typeof response.data['propertyValue'] != "undefined") {
              encodedpropertyValue = self.decode(response.data['propertyValue']);
              self.propertiesValue = JSON.parse(encodedpropertyValue);
            }

            if(typeof response.data['uniqueIds'] != "undefined") {
              encodedUniqueIds = self.decode(response.data['uniqueIds']);
              self.uniqueIdCollection = JSON.parse(encodedUniqueIds);
            }

            let basePath = response.data['basePath'];

            self.groupnames = JSON.parse(encodedGroups);

            /*
                        Object.keys(self.propertyGroup).forEach(function (keyObj) {
                         // Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
                          Object(self.propertyGroup[keyObj]).forEach(function (keyObj1) {
                            self.allProperties.push(keyObj1);
                            self.allPropertiesForOption.push({"text": keyObj1.name, "value": keyObj1.id , selected: false});
                          });
                        });*/

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
                  let decodedString = JSON.parse(self.decode(dataMatrixDB[key]));
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
                let selectBocDecodedString = JSON.parse(self.decode(dataSelectDB));
                self.propertiesValue[self.currentSelectedProperty].selectBox = selectBocDecodedString;
              }
            }

            self.allPropertyValues = self.propertiesValue;

          }, (error)  =>  {
            console.log(error);
            this.allTemplate = false;
          });
      },
      onChangeSetNullOperationTerm(newRuleIndex,conditionIndex) {
        if(this.newRule[newRuleIndex].condition[conditionIndex].operationCondition == 0) {
          this.newRule[newRuleIndex].condition[conditionIndex].operationTerm = null;
          this.newRule[newRuleIndex].condition[conditionIndex].operationCondition = null;
        }
      },
      getSelectValueDataTypes(value, text) {
        this.data_type = value;
        //this.clearAllFileds();
      },
      getStandardValue(value, text) {
        //if(dataType == 'radioBox' || dataType == 'checkBox' || dataType == 'imageList' || dataType == 'selectBox' || dataType == 'font'){
        this.standardValue = text;
        //console.log("QQQ::"+dataType+"KKK"+text)
        //}
      },
      selectOptionAllPropertyAsOption(selectedFields) {
        this.allPropertiesAsMultipleOption.forEach(option => {
          selectedFields.forEach(oselectedOtion => {
            if(oselectedOtion == option.value) {
              option.selected = true;
            }
          });
        });
      },
      selectOptionRelatedOption(selectedFields) {
        this.allReletedMultipleOption.forEach(option => {
          selectedFields.forEach(oselectedOtion => {
            if(oselectedOtion == option.value) {
              option.selected = true;
            }
          });
        });
      },
      getAllPropertyAsOptionlabel(value, text) {
        this.multiplyFields = value;
      },
      getRelatedMultipleField(value, text) {
        this.relatedMultiplyFields = value;
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
      showLanguageDescription(language, fileName) {
        this.selectedLanguage = language;
        this.selectedLanguageField = fileName;
        this.languageFileAdditionalPopup = true;
      },
      saveLanguageContent() {
        let self = this;
        let requestParam = {[this.selectedLanguageField] : this.languageContent[this.selectedLanguage][this.selectedLanguageField]};
        var encodedPropertyValueRecord = this.encode(JSON.stringify(requestParam));
        axios.post(this.restApiDomain+'/api/templatePropertyValueLanguage', {
          languageContent: encodedPropertyValueRecord,
          language:this.selectedLanguage,
          languageContentId: this.languageContent[this.selectedLanguage]["id"],
          selectedPropertyValueId: this.propertiesValue[this.currentSelectedProperty].id,
        },{
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            //console.log("QQQQWWW:propertyId::"+JSON.stringify(response.data));
            self.languageFileAdditionalPopup = false;
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
      addNewOptionForm: function() {
        let indexSelectBox = 0;
        if(this.selectBoxData.length != 0) {
          indexSelectBox = Object.keys(this.selectBoxData).length;
          console.log(indexSelectBox);
        }

        // this.selectBoxData[indexSelectBox] = {title: this.selectBoxTitle, value: this.selectBoxValue, price :this.selectBoxPrice, configuration: null};
        this.selectBoxData[indexSelectBox] = {uniqueId: Date.now(),title: this.selectBoxTitle, min: this.selectBoxMin, max: this.selectBoxMax, value: this.selectBoxValue, price :this.selectBoxPrice, procenttype: this.procenttype};
        if(this.selectBoxTitle != null) {
          this.standardValues[parseInt(this.standardValues.length)]= { text: this.selectBoxTitle, value: this.selectBoxValue };
        }
        console.log(JSON.stringify(this.selectBoxData));
        //this.$emit('update-select-box', this.selectBox);
        this.selectBoxValue = '';
        this.selectBoxTitle = '';
        this.selectBoxMin = '';
        this.selectBoxMax = '';
        this.selectBoxPrice = '';
        this.procenttype = '';
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
        this.changingGroupId = 0;
        this.groupModal = true
      },
      openCharacteristicsUpdateModal(propertyItem) {
        this.tplProperty = propertyItem.name;
        this.changingPropertyId = propertyItem.id;
        this.characteristicsModalUpdate = true;
      },
      openCharacteristicsModal() {
        this.characteristicsModal = true;
      },

      openAddCharacteristicsValuesModal(propertyId) {
        this.allPropertiesAsMultipleOption.forEach(option => {
          option.selected = false;
        });
        this.clearAllFileds();
        this.characteristicsValuesModal = true;
        this.newRule = [];
        this.fetchPropertyValue(propertyId);
      },
      changeGroupNameModal(groupId, groupnameName) {
        this.changingGroupId = groupId;
        this.groupname = groupnameName;
        this.changeGroupModal = true;
      },
      openCharacteristicsValuesModal(propertyId) {
        this.characteristicsValuesModal = true;
        this.clearAllFileds();
        this.fetchPropertyValue(propertyId);
      },
      openEditConfigurationOptionModal(index) {
        this.settingsCharacteristicsModal = true;
        //console.log("this.selectBoxData[index]::"+JSON.stringify(this.selectBoxData[index]));
        this.configuration_index = index;
        this.configuration_uniqueid = this.selectBoxData[index].uniqueId;
        this.configuration_title = this.selectBoxData[index].title;
        this.configuration_min = this.selectBoxData[index].min;
        this.configuration_max = this.selectBoxData[index].max;
        this.configuration_value = this.selectBoxData[index].value;
        this.configuration_price = this.selectBoxData[index].price;
        this.configuration_procenttype = this.selectBoxData[index].configuration_procenttype;

        this.configuration_sku = this.selectBoxData[index].sku;
        this.configuration_image_name = this.selectBoxData[index].image_name;
        this.configuration_image_width = this.selectBoxData[index].image_width;
        this.configuration_svgContent = this.selectBoxData[index].configuration_svgContent;
        this.configuration_image_height = this.selectBoxData[index].image_height;
        this.configuration_position_x = this.selectBoxData[index].position_x;
        this.configuration_position_y = this.selectBoxData[index].position_y;
        this.configurationPropertyAdditionalInformation =  this.selectBoxData[index].additionalInformation;
        //setTimeout(function(){ this.$refs.configurationPropertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML =  this.selectBoxData[index].additionalInformation;}, 2550);
        // this.$refs.configurationPropertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML =  this.selectBoxData[index].additionalInformation;
        //this.configuration_value = selectbox.
        //this.fetchPropertyValue(propertyId);
      },
      openEditConfigurationImageOptionModal(index) {
        this.settingsImageCharacteristicsModal = true;
        this.configuration_related_image_index = index;
        this.configuration_related_image_name = this.selectBoxData[index].image;
        this.configuration_related_image_title = this.selectBoxData[index].title;
        this.configuration_related_image_width = this.selectBoxData[index].width;
        this.configuration_related_image_height = this.selectBoxData[index].height;
        this.configuration_related_image_uniqueid = this.selectBoxData[index].related_uniqueId;
        this.current_image_configuration_uniqueid = this.selectBoxData[index].uniqueId;
      },
      openCreateConfigurationOptionModal(propertyId) {
        this.characteristicsValuesModal = true;
        this.fieldTitel = this.propertiesValue[this.currentSelectedProperty].titel;
        this.fieldId = this.propertiesValue[this.currentSelectedProperty].name;
        this.data_type = this.propertiesValue[this.currentSelectedProperty].data_type;
        this.activeField = this.propertiesValue[this.currentSelectedProperty].visible;
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
        let self = this;
        axios.get(this.restApiDomain+"/api/properiesByGroup/templateId/"+templateId+"/groupName/"+groupName)
          .then((response)  =>  {
            this.loading = false;
            var encodedproperties = self.decode(response.data['properties']);
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
      getItemFromCollectionByUniqueId(newItem, list) {
        let result = null;
        list.forEach((propertyObj, index) => {
          if(propertyObj.uniqueId == newItem.uniqueId) {
            result = propertyObj;
          }
        });

        return result;
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
      alreadyInList(newItem, list) {
        let result = false;
        Object.entries(list).forEach(([key, propertyObj]) => {
          if(propertyObj.text == newItem) {
            result = true;
          }
        });

        return result;
      },
      setCurrentSelectedProperty(currentSelectedProperty, currentSelectedPropertyIndex, currentUniqueId, event) {
        this.currentSelectedProperty = currentSelectedProperty;
        this.currentSelectedPropertyIndex = currentSelectedPropertyIndex;
        this.currentSelectedUniqueId = currentUniqueId;
        //this.fetchPropertyValue(currentSelectedPropertyIndex);
      },
      fetchPropertyValueCondition(propertyValueId) {
        let self = this;
        axios.get(this.restApiDomain+"/api/propertyValueCondition/"+self.customerId+"/"+self.propertiesValue[self.currentSelectedProperty].id)
          .then((response)  =>  {
            if(typeof (response.data['propertyValueCondition']) != "undefined" && response.data['propertyValueCondition'] != null) {
              let decodePropertyValueCondition = self.decode(response.data['propertyValueCondition']);

              //self.newRule = JSON.parse(decodePropertyValueCondition);
              self.newRule = JSON.parse(decodePropertyValueCondition);
              self.newRule.forEach(function (itemValueObj, itemValueObjIndex) {
                itemValueObj.condition.forEach(function (conditionItem, conditionItemIndex) {
                  let conditionValueLocal = self.getItemConditionValue(conditionItem.conditionValue ,conditionItem.parentUniqueId);
                  self.newRule[itemValueObjIndex].condition[conditionItemIndex].conditionValue = conditionValueLocal;
                })
              })
            }
          });
      },
      fetchPropertyValue(currentSelectedPropertyIndex) {
        // let dataTypes = this.dataTypes;
        let self = this;
        axios.get(this.restApiDomain+"/api/properiesValue/propertyId/"+currentSelectedPropertyIndex+"/templateId/"+this.selectedTemplateId)
          .then((response)  =>  {
            this.loading = false;

            let entcodedAllTemplateIds = self.decode(response.data['allTemplateIds']);
            if(response.data['basePathImg'] !== undefined) {
              self.basePathImg =  self.decode(response.data['basePathImg']);
            }

            self.standardValues =  [
              { text: 'Standardwert auswählen', value: '', disabled: true, selected: true },
            ];
            self.standardValue = '';

            let entcodedAllMatrixes = self.decode(response.data['allMatrixes']);
            let allTemplateIds = JSON.parse(entcodedAllTemplateIds);
            self.combiValues  = allTemplateIds;
            self.matrixSelectDimensionX = allTemplateIds;
            self.matrixSelectDimensionY = allTemplateIds;
            //this.chooseMatrixValue = JSON.parse(entcodedAllMatrixes);
            /*this.matrixSelectDimensionX = this.combiValue;
            this.matrixSelectDimensionY = this.combiValue;*/

            self.allProperties = [];
            self.allPropertiesForOption = [];
            self.allPropertiesAsMultipleOption = [
              { text: 'Felder auswählen', value: '', disabled: true, selected: true },
            ];

            self.allReletedMultipleOption = [
              { text: 'Felder auswählen', value: '', disabled: true, selected: true },
            ];

            Object.keys(self.propertyGroup).forEach(function (keyObj) {
              // Object.entries(this.chooseMatrixValue).forEach(([key, propertyObj]) => {
              Object(self.propertyGroup[keyObj]).forEach(function (keyObj1) {
                self.allProperties.push(keyObj1);
                self.allReletedMultipleOption.push({"text": keyObj1.name, "value": keyObj1.uniqueId , selected: false});
                self.allPropertiesAsMultipleOption.push({"text": keyObj1.name, "value": keyObj1.uniqueId , selected: false});
              });
            });

            self.propertiesValue = {};
            // propertyValue null
            if(response.data['propertyValue'].length != 0) {
              let encodedpropertyValue = self.decode(response.data['propertyValue']);
              this.propertiesValue = JSON.parse(encodedpropertyValue);

              self.languages.forEach((propertyObj, index) => {
                self.languageContent[propertyObj] = self.languageFileds;
                if(typeof self.propertiesValue[self.currentSelectedProperty]["languages"] != "undefined") {
                  if(self.propertiesValue[self.currentSelectedProperty]["languages"][propertyObj] != "undefined") {
                    self.languageContent[propertyObj] = self.propertiesValue[self.currentSelectedProperty]["languages"][propertyObj];
                  }
                }
              });

              if (self.propertiesValue != null && self.propertiesValue != undefined &&
                self.propertiesValue[self.currentSelectedProperty].matrix != null
              ) {
                let dataMatrixDB = self.propertiesValue[self.currentSelectedProperty].matrix;
                let dataMatrix = {};
                let chooseMatrixValue = [];
                Object.keys(dataMatrixDB).forEach(function (key) {
                  let decodedString = JSON.parse(self.decode(dataMatrixDB[key]));
                  dataMatrix[key] = decodedString;
                  chooseMatrixValue.push({text: key, value: key});
                });

                self.chooseMatrixValue = self.chooseMatrixValue.concat(chooseMatrixValue);
                self.propertiesValue[self.currentSelectedProperty].matrix = dataMatrix;
                self.matrixCollection = dataMatrix;
                let entcodedRelations = self.decode(self.propertiesValue[self.currentSelectedProperty].relations);
                self.matrixAttachedToProperty = JSON.parse(entcodedRelations);
              } else {
                self.propertiesValue[self.currentSelectedProperty].matrix = null;
              }

              if (self.propertiesValue != null && self.propertiesValue != undefined &&
                self.propertiesValue[self.currentSelectedProperty].additionalData != null
              ) {
                let dataSelectDB = self.propertiesValue[self.currentSelectedProperty].additionalData;
                let selectBocDecodedString = JSON.parse(self.decode(dataSelectDB));
                self.propertiesValue[self.currentSelectedProperty].additionalData = selectBocDecodedString;
                self.selectBoxData = selectBocDecodedString;
                self.selectBoxDataBuffer= selectBocDecodedString;

                Object.entries(self.selectBoxData).forEach(([key, propertyObj]) => {
                  //let alreadyExists = self.alreadyInList(propertyObj.title, self.standardValues);
                  //if(! alreadyExists) {
                  self.standardValues.push({text: propertyObj.title, value: propertyObj.value});
                  // }

                  if (self.propertiesValue[self.currentSelectedProperty].defaultValue == propertyObj.title) {
                    self.selectOptionStandardValue(key);
                  }
                });
              }
              {
                self.propertiesValue[self.currentSelectedProperty].additionalData = null;
              }

              Object.entries(self.dataTypes).forEach(([key, propertyObj]) => {
                if (self.propertiesValue[self.currentSelectedProperty].data_type == propertyObj.value) {
                  self.selectOption(key);
                }
              });

              self.fieldTitel = self.propertiesValue[self.currentSelectedProperty].titel;
              self.fieldId = self.propertiesValue[self.currentSelectedProperty].name;
              self.uniqueId = self.propertiesValue[self.currentSelectedProperty].uniqueId;
              self.data_type = self.propertiesValue[self.currentSelectedProperty].data_type;
              self.templateImage = self.propertiesValue[self.currentSelectedProperty].image;
              self.fieldValue = self.propertiesValue[self.currentSelectedProperty].value;
              self.fieldPriceValue = self.propertiesValue[self.currentSelectedProperty].price;
              self.activeField = self.propertiesValue[self.currentSelectedProperty].visible;
              self.standardValue = self.propertiesValue[self.currentSelectedProperty].defaultValue;
              self.hiddenField = !!parseInt(self.activeField);

              if (self.hiddenField) {
                self.hiddenFieldOn = true;
                self.hiddenFieldOff = false;
              } else {
                self.hiddenFieldOff = true;
                self.hiddenFieldOn = false;
              }

              self.propertyToImageBox = self.propertiesValue[self.currentSelectedProperty].propertyToImageBox;

              if (
                self.propertiesValue[self.currentSelectedProperty].multiplyFields != null
                && self.propertiesValue[self.currentSelectedProperty].multiplyFields != ""
                && self.propertiesValue[self.currentSelectedProperty].multiplyFields != '[""]'
              ) {
                let multiplyFieldsLocal = this.decode(self.propertiesValue[self.currentSelectedProperty].multiplyFields);
                if(multiplyFieldsLocal != '[""]') {
                  self.multiplyFields = JSON.parse(multiplyFieldsLocal);
                  if (self.isObject(self.multiplyFields)) {
                    self.selectOptionAllPropertyAsOption(self.multiplyFields);
                    self.areMultiplyFields = true;
                  }
                }
              }

              if (
                self.propertiesValue[self.currentSelectedProperty].relatedMultiplyFields != null
                && self.propertiesValue[self.currentSelectedProperty].relatedMultiplyFields != ""
                && self.propertiesValue[self.currentSelectedProperty].relatedMultiplyFields != '[""]'

              ) {
                let relatedMultiplyFieldsLocal = this.decode(self.propertiesValue[self.currentSelectedProperty].relatedMultiplyFields);
                if(relatedMultiplyFieldsLocal != '[""]') {
                  self.relatedMultiplyFields = JSON.parse(relatedMultiplyFieldsLocal);
                  if (self.isObject(self.relatedMultiplyFields)) {
                    self.selectOptionRelatedOption(self.relatedMultiplyFields);
                  }
                }
              }

              self.imgWidth = self.propertiesValue[self.currentSelectedProperty].imgWidth;
              self.imgHeight = self.propertiesValue[self.currentSelectedProperty].imgHeight;
              self.minValue = self.propertiesValue[self.currentSelectedProperty].minValue;
              self.maxValue = self.propertiesValue[self.currentSelectedProperty].maxValue;
              self.isDigit = self.propertiesValue[self.currentSelectedProperty].isDigit;
              self.svgContent = self.propertiesValue[self.currentSelectedProperty].svg;
              self.isHidden = parseInt(self.propertiesValue[self.currentSelectedProperty].hidden);
              self.withZoom = parseInt(self.propertiesValue[self.currentSelectedProperty].zoom);
              self.dmgIsbasicPrice = self.propertiesValue[self.currentSelectedProperty].dmgIsbasicPrice;
              self.unitValue = self.propertiesValue[self.currentSelectedProperty].unitValue;
              self.valueCssClass = self.propertiesValue[self.currentSelectedProperty].cssClass;
              self.valueBreite = self.propertiesValue[self.currentSelectedProperty].valueWidth;
              self.valueHoehe = self.propertiesValue[self.currentSelectedProperty].valueHeight;
              self.expression = self.propertiesValue[self.currentSelectedProperty].expression;
              self.valuePosX = self.propertiesValue[self.currentSelectedProperty].valuePosX;
              self.valuePosY = self.propertiesValue[self.currentSelectedProperty].valuePosY;
              self.operatorCombi = self.propertiesValue[self.currentSelectedProperty].operatorCombi;
              //this.value = this.propertiesValue[this.currentSelectedProperty].value;
              self.requiredField = self.propertiesValue[self.currentSelectedProperty].mandatory_field;
              self.requiredFieldChecked = !!parseInt(self.requiredField);
              if (self.requiredFieldChecked) {
                self.requiredFieldCheckedOn = true;
                self.requiredFieldCheckedOff = false;
              } else {
                self.requiredFieldCheckedOff = true;
                self.requiredFieldCheckedOn = false;
              }

              this.$refs.propertyInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML = self.propertiesValue[self.currentSelectedProperty].description;
              this.$refs.propertyAdditionalInformation.$el.querySelector('.mdb-wysiwyg-textarea').innerHTML = self.propertiesValue[self.currentSelectedProperty].short_description;

              self.fetchPropertyValueCondition(self.propertiesValue[self.currentSelectedProperty].id);
              //this.loadImageFormURL();
              //console.log("QQQQQQ::"+JSON.stringify(this.propertiesValue));
            } // propertyValue null

          }, (error)  =>  {
            console.log(error);
            this.allTemplate = false;
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
      saveRule() {
        let self = this;
        let propertyConditionEncodedString = this.encode(JSON.stringify(this.newRule));

        axios.post(this.restApiDomain + '/api/propertyValueCondition', {
          customerId: self.customerId,
          propertyCondition: propertyConditionEncodedString,
          propertyValueId: self.propertiesValue[self.currentSelectedProperty].id
        }, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
          .then(function (response) {
            console.log(response);
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
        this.newRule = [];
        this.ruleModal= false;
      },
      saveGroupName() {
        //this.groupnames.push(this.groupname);
        let self = this;
        let localGroupname = this.groupname;
        this.currentSelectedGroup = this.groupname;
        //this.templates[this.selectedTemplate].groups = this.groupnames
        let localPositionGroup = 0;
        if(this.propertyGroup.length != undefined) {
          localPositionGroup = this.propertyGroup.length+1;
        }

        let encodedString = this.encode(JSON.stringify({tplName:this.selectedTemplate, groupName: this.groupname, positionGroup: localPositionGroup, groupId: this.changingGroupId}));
        axios.post(this.restApiDomain+'/api/templategroup', {
          customerId: this.customerId,
          tplData: encodedString
        },{
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }})
          .then(function (response) {
            /*
            self.groupnames.push({"id":response.data.id,"name":response.data.groupName});
            self.propertyGroup[localGroupname] = [{'id':response.data.id, 'name':response.data.propertyName}];*/
            self.fetchProperty(self.selectedTemplateId);
            self.changeGroupModal = false;
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
        this.groupname = "";
        this.groupModal = false;
        this.allTemplate[this.selectedTemplate] = this.templates;
      },
      saveProperty(selectedGroup) {
        let self = this;
        // var selectedGroupKey = selectedGroup.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
        //Object.entries(this.properties[selectedGroup]).forEach(([key, propertyObj]) => {
        //console.log(JSON.stringify(this.propertyGroup[selectedGroup]));
        if(this.propertyGroup[selectedGroup] == undefined) {
          let propertyRecord = {'id': 0, 'name': self.tplProperty,"position": 0};
          let encodedPropertyRecord = this.encode(JSON.stringify({
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
          let propertyIndex = this.changingPropertyId;
          if (self.propertyGroup[selectedGroup][0].name == 'Keine Eigenschaft') {
            propertyIndex = parseInt(this.propertyGroup[selectedGroup][0].id);
          }

          let propertyRecord = {'id': propertyIndex, 'name': self.tplProperty,"position": (this.propertyGroup[selectedGroup].length+1)};
          let encodedPropertyRecord = this.encode(JSON.stringify({
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
              } else if(self.changingPropertyId == response.data.id) {
                self.propertyGroup[self.currentSelectedGroup].forEach(function (itemObj) {
                  if(itemObj.id == response.data.id) {
                    self.currentSelectedProperty = response.data.name;
                    itemObj.name = response.data.name;
                  }
                });
              }
              else {
                self.propertyGroup[selectedGroup].push({'id': response.data.id, 'name': response.data.name});
                self.currentSelectedProperty = response.data.name;
              }
              self.characteristicsModalUpdate = false;
              self.changingPropertyId = 0;
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
        if(this.uniqueId == ''){
          this.uniqueId =  Date.now();
        }

        let self = this;
        // var selectedGroupKey = selectedGroup.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
        if(this.matrixCollection == undefined) {
          this.matrixCollection = {};
        }
        //this.templates[this.selectedTemplate].propertyValue = this.propertiesValue;

        this.currentSelectedProperty = selectedProperty;
        //console.log("OPOPOP::"+JSON.stringify(this.multiplyFields));
        let multiplyFieldsLocal = this.encode(JSON.stringify(this.multiplyFields));
        let relatedMultiplyFieldsLocal = this.encode(JSON.stringify(this.relatedMultiplyFields));
        let propertyValueItem = {uniqueId: this.uniqueId, fieldId: this.fieldId, titel: this.fieldTitel, expression: this.expression, imageUploadName: this.templateImage, position: this.fieldPosition, valueCssClass: this.valueCssClass, maxValue: this.maxValue, minValue: this.minValue, multiplyFields:  multiplyFieldsLocal,
          chooseValueForMatrix: this.chooseValueForMatrix, matrixOperatorX : this.matrixOperatorX, matrixOperatorY: this.matrixOperatorY, propertyInformation: propertyInformation, relations: this.matrixAttachedToProperty, unitValue: this.unitValue, propertyToImageBox: this.propertyToImageBox,
          propertyAdditionalInformation: propertyAdditionalInformation, standardValue: this.standardValue, valueBreite: this.valueBreite, valueHoehe: this.valueHoehe, valuePosX: this.valuePosX, valuePosY: this.valuePosY, imgWidth: this.imgWidth, imgHeight: this.imgHeight, relatedMultiplyFields: relatedMultiplyFieldsLocal,
          operatorCombi: this.operatorCombi, dataTyp : this.data_type, mandatory_field: this.requiredField, fieldActive: this.activeField, fieldValue: this.fieldValue, price: this.fieldPriceValue, matrix: this.matrixCollection, additionalData: this.selectBoxData, isDigit: this.isDigit, svg: this.svgContent, hidden: this.isHidden, zoom: this.withZoom, dmgIsbasicPrice: this.dmgIsbasicPrice};

        var encodedPropertyValueRecord = this.encode(JSON.stringify(propertyValueItem));
        var encodedSelectedProperty =  this.encode(this.currentSelectedProperty);
        var encodedSelectedTemplate =  this.encode(this.selectedTemplate);
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
        this.uniqueId = '';
        this.allPropertiesAsMultipleOption = [{ text: 'Felder auswählen', value: '', disabled: true, selected: true }];
        this.chooseValueForMatrix = [];
        this.minValue = '';
        this.maxValue = '';
        this.isDigit = 0;
        this.svgContent = '';
        this.isHidden = 0;
        this.withZoom = 0;
        this.unitValue = '';
        this.matrixOperatorX = '';
        this.matrixOperatorY = '';
        this.propertyInformation = '';
        this.matrixAttachedToProperty ='';
        this.propertyAdditionalInformation = '';
        this.multiplyFields = '';
        this.relatedMultiplyFields = '';
        this.standardValue = null;
        this.valueBreite = '';
        this.valueHoehe ='';
        this.valuePosX = '';
        this.valuePosY= '';
        this.operatorCombi ='';
        this.data_type ='';
        this.requiredField = false;
        this.areMultiplyFields = false;
        this.activeField = false;
        this.fieldValue ='';
        this.fieldPriceValue ='';
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
      propertyGroup: {
        handler: function (val, oldVal) {
          //console.log('a thing ww changed'+JSON.stringify(val[this.currentSelectedGroup]));
          if(typeof val[this.currentSelectedGroup] != "undefined") {
            if(val[this.currentSelectedGroup].length > 0) {
              let encodedPropertyRecord = this.encode(JSON.stringify(val[this.currentSelectedGroup]));
              axios.post(this.restApiDomain + '/api/templateAllProperty', {
                customerId: this.customerId,
                tplData: encodedPropertyRecord
              }, {
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                }
              })
                .then(function (response) {

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
          }
        },
        deep: true
      },
      groupnames: {
        handler: function (val, oldVal) {
          //console.log('a thing changed'+this.selectedTemplateId);
          let encodedPropertyRecord = '';
          if(val.length > 0) {
            encodedPropertyRecord = this.encode(JSON.stringify(val));
            axios.post(this.restApiDomain + '/api/templateAllGroups', {
              customerId: this.customerId,
              templateId: this.selectedTemplateId,
              tplData: encodedPropertyRecord
            }, {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              }
            })
              .then(function (response) {

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

        },
        deep: true
      },
      /*
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
            }
          });
        });
        console.log("newConditionModel"+JSON.stringify(this.newConditionModel));
      },*/
    },
  };
</script>
<style>
    .liIsActive{
        background: #33B5E6 !important;
        cursor: pointer;
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
        color: #33B5E6;
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
        color: #33B5E6;
    }
    .success-color {
        background-color: #33b5e5 !important;
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
        #background: #EEEEEE;
    }
    .gcm-ruleCheckbox div label{
        top: 0;
    }
    .ruleRow{
        margin-left: 25px;
    }
    .gcm-hoverableRow:hover{
        #background: #D8D8D8;
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
        background-color: #33B5E6;
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
    .dmg-radio-toolbar input[type="radio"] {
        display: none;
    }
    .dmg-radio-toolbar label {
        position: relative;
        cursor: pointer;
        display: inline-block;
        background-color: #ddd;
        text-align: center;
        padding: 4px 2px;
        font-size: 12px;
        margin:2px ;
        width:70px;
        cursor: pointer;
    }

    .dmg-radio-toolbar input[type="radio"]:checked+label {
        background-color: #bbb;
    }

    .list-group-item:first-child, :not(.list-group-item) + .list-group-item { border-top: 0px solid #000000;}

    .list-group-item {
        padding: 0px !important;
        border-right: 0px;
        border-left: 0px;
    }
    .list-property-item:first-child, :not(.list-group-item) + .list-group-item { border-top: 0px solid #000000;}

    .list-property-item {
        width: 100%;
        padding: 2px;
        border-left: 0px solid #000000;
        border-right: 0px solid #000000;
    }
    .dmg-table-template {
        display: table;
        #border-spacing: 0.5em;
        width: 100%;
    }

    .dmg-table-template-row {display: table-row; }
    .dmg-table-template-cell {display: table-cell;  border-right: 0px solid #000000;}
    .cellWidth78 {
        width: 78%;
    }
    .cellWidth22 {
        width: 22%;
    }
    .cellWidth80 {
        width: 80%;
    }

    [type="radio"]:not(:checked), [type="radio"]:checked {
        position: inherit !important;
        opacity: inherit !important;
    }
    #right-click-menu{
        background: #FAFAFA;
        border: 1px solid #BDBDBD;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
        display: block;
        list-style: none;
        margin: 0;
        padding: 0;
        position: absolute !important;
        width: 250px;
        z-index: 999999;
    }

    #right-click-menu li {
        border-bottom: 1px solid #E0E0E0;
        margin: 0;
        padding: 5px 35px;
    }

    #right-click-menu li:last-child {
        border-bottom: none;
    }

    #right-click-menu li:hover {
        background: #33B5E6;
        color: #FAFAFA;
    }

    .input-group>.custom-file, .input-group>.custom-select, .input-group>.form-control, .input-group>.form-control-plaintext {
        width: 100% !important;
    }
</style>
