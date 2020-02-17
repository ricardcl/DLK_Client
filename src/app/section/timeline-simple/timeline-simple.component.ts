import { Component, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

import { etatLogonConnexionSimplifiee } from 'src/app/models/checkAnswer';
import { Etat } from 'src/app/models/enumEtat';
// Themes 
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-timeline-simple',
  templateUrl: './timeline-simple.component.html',
  styleUrls: ['./timeline-simple.component.css']
})
export class TimelineSimpleComponent {

  private chart2: am4charts.XYChart = undefined;
  private isComponentInit: boolean = false;

  @Input()
  public listeEtatLogonConnexion: etatLogonConnexionSimplifiee[];

  constructor(private zone: NgZone) { }

  ngOnChanges() {
    if (this.isComponentInit) {
      this.timelinesUpdate();
    }
  }

  ngOnDestroy() {
    this.deleteCharts();
    this.isComponentInit = false;
  }

  ngAfterViewInit() {
    if (!this.isComponentInit) {
      this.timelinesUpdate();
      this.isComponentInit = true;
    }
  }

  private deleteCharts(): void {
    if (this.chart2 !== undefined) {
      this.zone.runOutsideAngular(() => {
        this.chart2.dispose();
      });
      this.chart2 = undefined;
    }
  }

  private timelinesUpdate(): void {
    this.deleteCharts();
    this.zone.runOutsideAngular(() => {

      this.chart2 = am4core.create("chartdivSimple", am4charts.XYChart);
      this.chart2.hiddenState.properties.opacity = 0; // this creates initial fade-in
      this.chart2.paddingRight = 30;
      this.chart2.dateFormatter.inputDateFormat = "dd-MM HH mm ss";
      this.chart2.dateFormatter.dateFormat = "dd-MM HH mm ss";
      this.chart2.height = 300;
      this.chart2.data = this.majListeEtatLogonConnexion(this.listeEtatLogonConnexion);



      let categoryAxis = this.chart2.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "typeEtat";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      // categoryAxis.renderer.height = am4core.percent(80);
      categoryAxis.height = 200;


      let dateAxis = this.chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "dd-MM HH mm ss";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 1, timeUnit: "second" };
      //.min = new Date(2018, 9, 5, 1, 0, 0, 0).getTime();
      // dateAxis.min = new Date("27-09-2018 08 40 00").getTime();
      // dateAxis.min =  new Date(this.listeEtatLogonConnexion[0].toDate).getTime();
      // dateAxis.max = new Date(this.listeEtatLogonConnexion[this.listeEtatLogonConnexion.length-1].toDate).getTime();
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;


      let series1 = this.chart2.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      //Tooltiptext : informations s'affichant au survol de la timeline
      series1.columns.template.tooltipText = " [bold] etat : {infoEtat}[/]\n Début: {fromDate}  \n Fin: {toDate} ";

      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "name";
      series1.columns.template.propertyFields.fill = "color"; // get color from data
      series1.columns.template.propertyFields.stroke = "color";
      series1.columns.template.strokeOpacity = 1;
      series1.clustered = false;  //Setting to false will make columns overlap with other series.

      //Bullet : Description s'affichant sur la timeline
      let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "[bold] {infoEtat}";
      bullet1.locationY = 0.5;
      bullet1.label.fill = am4core.color("#ffffff");
    });
  }


  private majListeEtatLogonConnexion(listeEtatLogonConnexion: etatLogonConnexionSimplifiee[]): etatLogonConnexionSimplifiee[] {
    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;
    // console.log("liste AVANT : ", listeEtatLogonConnexion);
    //let liste: etatLogonConnexionSimplifiee[] = listeEtatLogonConnexion.slice();
    let liste: etatLogonConnexionSimplifiee[] = [...<etatLogonConnexionSimplifiee[]>listeEtatLogonConnexion];

    liste.forEach((element, index) => {

      if (element.name == "logon") {
        element.typeEtat = "logon";
        if (element.infoEtat == Etat.Logue) {
          element.color = colorSet.getIndex(0).brighten(0.4);
        }
        else if (element.infoEtat == Etat.NonLogue) {
          element.color = colorSet.getIndex(6).brighten(0);
        }
      }
      if (element.name == "connexion") {
        element.typeEtat = "connexion";
        element.color = colorSet.getIndex(2).brighten(0);
      }
    });
    return liste;
  }

}
