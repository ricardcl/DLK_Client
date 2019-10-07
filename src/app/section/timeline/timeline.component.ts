import { Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { timeUnitDurations } from '@amcharts/amcharts4/.internal/core/utils/Time';
//import am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent {

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 30;
      chart.dateFormatter.inputDateFormat = "dd-MM-yyyy HH mm ss";

      let colorSet = new am4core.ColorSet();
      colorSet.saturation = 0.4;

      chart.data = [

        {
          fromDate: "06-12-2018 08 10 00",
          toDate: "06-12-2018 08 10 00",
          log: "CPCASRES",
          etat: "NON_LOGUE",
          infoEtat: "DemandeLogonEncoursAutoriseeParStpv",
          color: colorSet.getIndex(0).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 10 00",
          toDate: "06-12-2018 08 22 00",
          log: "CPCVNRES",
          etat: "LOGUE",
          infoEtat: "LogonAcceptee",
          color: colorSet.getIndex(1).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 22 00",
          toDate: "06-12-2018 08 30 00",
          log: "CPCOPENLNK",
          etat: "LOGUE",
          infoEtat: "DemandeConnexion",
          color: colorSet.getIndex(1).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 30 00",
          toDate: "06-12-2018 08 35 00",
          log: "CPCCOMSTAT",
          etat: "LOGUE",
          infoEtat: "Deconnexion",
          color: colorSet.getIndex(1).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 35 00",
          toDate: "06-12-2018 08 50 00",
          log: "CPCCOMSTAT",
          etat: "ASSOCIE",
          infoEtat: "Connecte/associe",
          color: colorSet.getIndex(2).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 50 00",
          toDate: "06-12-2018 08 50 00",
          log: "CPCCLOSLNK",
          etat: "LOGUE",
          infoEtat: "DemandeDeconnexion",
          color: colorSet.getIndex(1).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 08 50 00",
          toDate: "06-12-2018 09 50 00",
          log: "CPCCOMSTAT",
          etat: "LOGUE",
          infoEtat: "Deconnexion",
          color: colorSet.getIndex(1).brighten(0),
          name: "etat"
        },

        {
          fromDate: "06-12-2018 09 50 00",
          toDate: "06-12-2018 10 50 00",
          log: "CPCEND",
          etat: "NON_LOGUE",
          infoEtat: "Fin du vol",
          color: colorSet.getIndex(0).brighten(0),
          name: "etat"
        }
      ];

     

      chart.dateFormatter.dateFormat = "dd-MM-yyyy HH mm";
      chart.dateFormatter.inputDateFormat = "dd-MM-yyyy HH mm";


      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "dd-MM-yyyy HH mm";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 30, timeUnit: "minute" }; 
      //.min = new Date(2018, 9, 5, 1, 0, 0, 0).getTime();
      dateAxis.max = new Date("06-12-2018 10 50 00").getTime();      
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;


      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);

      series1.columns.template.tooltipText = " [bold] log : {log}[/]\n fromDate: {fromDate}  \n toDate: {toDate} ";

      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "name";
      series1.columns.template.propertyFields.fill = "color"; // get color from data
      series1.columns.template.propertyFields.stroke = "color";
      series1.columns.template.strokeOpacity = 1;

      var bullet2 = series1.bullets.push(new am4charts.LabelBullet());
      bullet2.interactionsEnabled = false;
      bullet2.label.text = "{etat}";
      bullet2.locationY = 0.5;
      bullet2.label.fill = am4core.color("#ffffff");

      chart.scrollbarX = new am4core.Scrollbar();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}