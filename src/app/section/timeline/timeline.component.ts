import { Component, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { etatLogonConnexionSimplifiee } from 'src/app/models/checkAnswer';
import { Etat } from 'src/app/models/enumEtat';
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

  @Input()
  public listeEtatLogonConnexion: etatLogonConnexionSimplifiee[];
  constructor(private zone: NgZone) { }


  private majListeEtatLogonConnexion(listeEtatLogonConnexion: etatLogonConnexionSimplifiee[]): etatLogonConnexionSimplifiee[] {
    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    listeEtatLogonConnexion.forEach((element, index) => {

      if (element.name == "logon") {
        if (element.infoEtat == Etat.Logue) {
          element.color = colorSet.getIndex(0).brighten(0.4);
        }
        else if (element.infoEtat == Etat.NonLogue) {
          element.color = colorSet.getIndex(6).brighten(0);
        }
      }
      if (element.name == "connexion") {
        element.color = colorSet.getIndex(2).brighten(0);
      }
    });
    return listeEtatLogonConnexion;
  }

  

  ngOnChanges() {
    console.log("ngAfterViewInit");
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv2", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 30;
      chart.dateFormatter.inputDateFormat = "dd-MM HH mm ss";
      chart.dateFormatter.dateFormat = "dd-MM HH mm ss";

      chart.height = 300;




      chart.data = this.majListeEtatLogonConnexion(this.listeEtatLogonConnexion);



      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      // categoryAxis.renderer.height = am4core.percent(80);
      categoryAxis.height = 200;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "dd-MM HH mm ss";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 1, timeUnit: "second" };
      //.min = new Date(2018, 9, 5, 1, 0, 0, 0).getTime();
      // dateAxis.min = new Date("27-09-2018 08 40 00").getTime();
      // dateAxis.min =  new Date(this.listeEtatLogonConnexion[0].toDate).getTime();
      // dateAxis.max = new Date(this.listeEtatLogonConnexion[this.listeEtatLogonConnexion.length-1].toDate).getTime();
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;


      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText = " [bold] etat : {infoEtat}[/]\n fromDate: {fromDate}  \n toDate: {toDate} ";

      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "name";
      series1.columns.template.propertyFields.fill = "color"; // get color from data
      series1.columns.template.propertyFields.stroke = "color";
      series1.columns.template.strokeOpacity = 1;
      series1.clustered = false;

      let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{infoEtat}";
      bullet1.locationY = 0.5;
      bullet1.label.fill = am4core.color("#ffffff");


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
