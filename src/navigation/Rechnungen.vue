<template>


  <mdb-container>
    <mdb-row>
      <mdb-col>

        <mdb-jumbotron class="my-5">
          <h1 class="display-4"><span class="geccomTextColor supportFontSize"><img src="../assets/geccom-icon.png" class="img-fluid geccomIcon">geccom</span>Rechnung</h1>
          <p class="lead">Hier finden Sie Ihre Rechnungsübersicht.</p>
          <hr class="my-4" />

          <mdb-row>
            <mdb-col class="pb-2">
              <mdb-tbl hover responsive sm>
                <mdb-tbl-body>

                  <mdb-datatable
                    :data="data"
                    striped
                    bordered
                  />
                </mdb-tbl-body>

              </mdb-tbl>
            </mdb-col>


          </mdb-row>

        </mdb-jumbotron>

      </mdb-col>
    </mdb-row>
  </mdb-container>


</template>


<script>
  import { mdbDatatable } from 'mdbvue';
  export default {
    name: 'DatatablePage',
    components: {
      mdbDatatable
    },
    data() {
      return {
        data: {
          columns: [
            {
              label: 'Name',
              field: 'name',
              sort: 'asc'
            },
            {
              label: 'Rechnungsdatum',
              field: 'date',
              sort: 'asc'
            },
            {
              label: 'Rechnungspreis',
              field: 'price',
              sort: 'asc'
            },
            {
              label: 'Rechnungsdownload',
              field: 'download',
              sort: 'asc'
            },
          ],
          rows: [
            {
              name: 'Tiger Nixon',
              date: '2011/04/25',
              price: '$320',
              download: ''
            },
            {
              name: 'Garrett Winters',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            },
            {
              name: 'Ashton Cox',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            },
            {
              name: 'Cedric Kelly',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            },
            {
              name: 'Airi Satou',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            },
            {
              name: 'Brielle Williamson',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            },
            {
              name: 'Herrod Chandler',
              date: '2011/04/25',
              price: '$320',
              download: 'PFAD'
            }
          ]
        }
      }
    }
  }
</script>
