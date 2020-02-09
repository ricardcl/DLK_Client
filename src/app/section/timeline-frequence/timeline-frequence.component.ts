import { Component, NgZone, Input } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { etatLogonConnexionSimplifiee, etatTransfertFrequence } from 'src/app/models/checkAnswer';
import { Etat } from 'src/app/models/enumEtat';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-timeline-frequence',
    templateUrl: './timeline-frequence.component.html',
    styleUrls: ['./timeline-frequence.component.css']
})
export class TimelineFrequenceComponent {

    private chart: any = undefined;
    private isComponentInit: boolean = false;

    @Input()
    public listeEtatLogonConnexion: etatLogonConnexionSimplifiee[];
    @Input()
    public listeEtatTransfertFrequence: etatTransfertFrequence[];

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
        if (this.chart !== undefined) {
            this.zone.runOutsideAngular(() => {
                this.chart.dispose();
            });
            this.chart = undefined;
        }
    }

    private timelinesUpdate(): void {
        this.deleteCharts();
        this.zone.runOutsideAngular(() => {

            //explications : https://www.amcharts.com/docs/v4/chart-types/timeline/
            this.chart = am4core.create("chartdiv", am4plugins_timeline.CurveChart);
            this.chart.curveContainer.padding(20, 20, 20, 50); //left padding : a ajuster pour pouvoir afficher le nom de categorie
            this.chart.maskBullets = false;
            this.chart.dateFormatter.inputDateFormat = "dd-MM HH mm ss";
            this.chart.dateFormatter.dateFormat = "dd-MM HH mm ss";
            this.chart.fontSize = 10;
            this.chart.tooltipContainer.fontSize = 10;
            //chart.height = 300;
            this.chart.data = this.majListeEtatLogonConnexion();




            let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis<am4plugins_timeline.AxisRendererCurveY>());
            categoryAxis.dataFields.category = "typeEtat";

            categoryAxis.renderer.grid.template.disabled = false;
            // categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.innerRadius = 10;
            categoryAxis.renderer.radius = 200;

            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.inversed = false;
            categoryAxis.height = 200;
            //categoryAxis.title.text = "Turnover ";
            //categoryAxis.fontWeight = "bold";



            let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis<am4plugins_timeline.AxisRendererCurveX>());
            dateAxis.renderer.minGridDistance = 70;
            dateAxis.baseInterval = { count: 1, timeUnit: "second" };
            dateAxis.renderer.tooltipLocation = 0; //Location within axis cell to show tooltip on. (0-1)0 - show at the start 0.5 - show right in the middle 1 - show at the end
            dateAxis.renderer.tooltipLocation2 = 0; //Location within secondary axis cell to show tooltip on. (0-1)0 - show at the start 0.5 - show right in the middle 1 - show at the end
            dateAxis.renderer.line.strokeDasharray = "1,4";
            dateAxis.renderer.line.strokeOpacity = 0.5;
            dateAxis.tooltip.background.fillOpacity = 0.2;
            dateAxis.tooltip.background.cornerRadius = 5;
            dateAxis.tooltip.label.paddingTop = 7;
            dateAxis.endLocation = 1;
            dateAxis.startLocation = 0;
            dateAxis.strictMinMax = true;


            let labelTemplate = dateAxis.renderer.labels.template;
            labelTemplate.verticalCenter = "middle";
            labelTemplate.fillOpacity = 0.6;
            labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
            labelTemplate.background.fillOpacity = 1;
            labelTemplate.fill = new am4core.InterfaceColorSet().getFor("text");
            labelTemplate.padding(7, 7, 7, 7);


            /** Serie Logon/Connexion */
            let serieLogonConnexion = this.chart.series.push(new am4plugins_timeline.CurveColumnSeries());
            serieLogonConnexion.columns.template.height = am4core.percent(30); //hauteur de la ligne logon/connexion dans le tableau
            serieLogonConnexion.dataFields.openDateX = "fromDate";
            serieLogonConnexion.dataFields.dateX = "toDate";
            serieLogonConnexion.dataFields.categoryY = "typeEtat";
            serieLogonConnexion.baseAxis = categoryAxis;
            serieLogonConnexion.columns.template.propertyFields.fill = "color"; // get color from data
            serieLogonConnexion.columns.template.propertyFields.stroke = "color";
            serieLogonConnexion.columns.template.strokeOpacity = 0;
            serieLogonConnexion.columns.template.fillOpacity = 0.6;
            serieLogonConnexion.clustered = false; //Setting to false will make columns overlap with other series.


            /** icones de frequences */
            let seriesFreq = this.chart.series.push(new am4plugins_timeline.CurveColumnSeries());
            seriesFreq.columns.template.height = am4core.percent(30);

            seriesFreq.dataFields.openDateX = "fromDate";
            seriesFreq.dataFields.dateX = "fromDate";
            seriesFreq.dataFields.categoryY = "typeFreq";
            seriesFreq.baseAxis = categoryAxis;
            seriesFreq.columns.template.propertyFields.fill = "color"; // get color from data
            seriesFreq.columns.template.propertyFields.stroke = "color";
            seriesFreq.columns.template.strokeOpacity = 0;
            seriesFreq.columns.template.fillOpacity = 0.6;
            seriesFreq.clustered = false; //Setting to false will make columns overlap with other series.

            let imageBulletFreq = seriesFreq.bullets.push(new am4plugins_bullets.PinBullet());
            imageBulletFreq.background.radius = 18;
            imageBulletFreq.locationX = 1;
            imageBulletFreq.propertyFields.stroke = "color";
            imageBulletFreq.background.propertyFields.fill = "color";
            imageBulletFreq.image = new am4core.Image();
            imageBulletFreq.image.propertyFields.href = "icon";
            imageBulletFreq.image.scale = 0.7;
            imageBulletFreq.circle.radius = am4core.percent(100);
            imageBulletFreq.background.fillOpacity = 0.8;
            imageBulletFreq.background.strokeOpacity = 0;
            imageBulletFreq.dy = -135;
            imageBulletFreq.background.pointerBaseWidth = 10;
            imageBulletFreq.background.pointerLength = 10
            imageBulletFreq.tooltipText = "{text}";

            seriesFreq.tooltip.pointerOrientation = "up";
            // Setting series flag url
            seriesFreq.dummyData = {
                flag: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI0OC45MTRweCIgaGVpZ2h0PSIyNDguOTE0cHgiIHZpZXdCb3g9IjAgMCAyNDguOTE0IDI0OC45MTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0OC45MTQgMjQ4LjkxNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMDEuNzExLDQ5LjU4M2MtNS40NiwwLTkuODk1LDMuNzcxLTkuODk1LDguNDE5YzAsNC42NTMsNC40MzUsOC40MTksOS44OTUsOC40MTljNS4zMTYsMCw5LjY0My0zLjU2Niw5Ljg3Ni04LjAzMg0KCQkJYzUuMTA1LTEzLjYsNC4xMDYtMjQuMDc4LDMuMDQzLTI5LjEzN2MtMC43NDctMy41MzMtNC4yLTYuMjk1LTcuODUxLTYuMjk1bC0yMy4yNy0wLjAxYy0xLjg1NywwLTMuNTk0LDAuNzI0LTQuOSwyLjAzDQoJCQljLTEuMzgyLDEuMzkxLTIuMTM4LDMuMjc2LTIuMTI5LDUuMzJjMC4wMzgsNS42OTktMS4yMjMsMTMuMzA2LTIuMzA1LDE4Ljc3NmMtMC45MDYtMC4yMzMtMS44NzctMC4zNjQtMi44ODUtMC4zNjQNCgkJCWMtNS40NjEsMC05Ljg5NSwzLjc3MS05Ljg5NSw4LjQyNGMwLDQuNjQ4LDQuNDM4LDguNDE5LDkuODk1LDguNDE5YzUuMDU1LDAsOS4yMTMtMy4yMiw5LjgxOS03LjM3OGwwLjA3NSwwLjAxOQ0KCQkJYzAuMTYzLTAuNjUzLDMuODI2LTE1LjUyMyw0LjA3OS0yNi40NTNsMjAuODk4LDAuMDA5YzAuNjY4LDMuNjE3LDEuMTExLDkuOTgzLTEuMTI0LDE4LjMyMw0KCQkJQzIwMy45ODgsNDkuNzY1LDIwMi44NzgsNDkuNTgzLDIwMS43MTEsNDkuNTgzeiIvPg0KCQk8cGF0aCBkPSJNMzUuODY0LDEzNy44MzJjMi4wMjEsNC4xOTEsNy42NDksNS42NjEsMTIuNTY4LDMuMjk1YzQuNzkzLTIuMzAxLDcuMTQxLTcuMzkzLDUuNDE0LTExLjUxOQ0KCQkJYy0xLjMtMTQuNDcyLTYuNzQ0LTIzLjQ3NS05Ljg5Ni0yNy41NzdjLTIuMjA4LTIuODUyLTYuNTE1LTMuODUxLTkuODA4LTIuMjY0bC0yMC45NjksMTAuMDg1DQoJCQljLTEuNjczLDAuODAzLTIuOTI2LDIuMjA4LTMuNTMzLDMuOTU4Yy0wLjY0NCwxLjg0OS0wLjUwMSwzLjg4MywwLjM5Miw1LjcxN2MyLjUwNCw1LjEyLDQuNjY5LDEyLjUyMiw2LjA2LDE3LjkyMQ0KCQkJYy0wLjkyMSwwLjE4My0xLjg1MSwwLjQ4NS0yLjc1MywwLjkyNWMtNC45MTcsMi4zNjYtNy4yNzMsNy42ODctNS4yNTUsMTEuODc3YzIuMDIxLDQuMTkxLDcuNjQ1LDUuNjY2LDEyLjU2OSwzLjI5NQ0KCQkJYzQuNTQ4LTIuMTg4LDYuOS02LjkwMiw1LjY0Mi0xMC45MDZsMC4wNzctMC4wMTVjLTAuMTMzLTAuNjYyLTMuMjg4LTE1LjY0NC03Ljc5OS0yNS42MDhsMTguODMtOS4wNTQNCgkJCWMyLjE3LDIuOTczLDUuMzM0LDguNTEzLDYuOTM1LDE2Ljk5OGMtMS4wNzYsMC4xNjgtMi4xNTYsMC40OS0zLjIwOCwwLjk5NEMzNi4yMDIsMTI4LjMyLDMzLjg0NiwxMzMuNjQyLDM1Ljg2NCwxMzcuODMyeiIvPg0KCQk8Y2lyY2xlIGN4PSIxMTAuNTY1IiBjeT0iMzguMTM2IiByPSIyMS4wMDQiLz4NCgkJPHBhdGggZD0iTTE0LjMzNywyMzIuODY4aDIyMC4yMzljNy45MjEsMCwxNC4zMzgtNi4yNzIsMTQuMzM4LTE0LjAyMWMwLTcuNzQ3LTYuNDE3LTE0LjAyNC0xNC4zMzgtMTQuMDI0aC02Ny4yNjINCgkJCWMwLjM5My0wLjE0NSwwLjc5NC0wLjI4LDEuMTc2LTAuNTA0YzMuMjkxLTEuOTkzLDQuMzUxLTYuMjc3LDIuMzU3LTkuNTcybC0zOS4yNzgtNjUuMDE3di0zMi4xMQ0KCQkJYzE3Ljg4LDE2LjEzOSwyNi41MjMsNDEuOTg1LDI2LjY3Nyw0Mi40NTdjMC45NTcsMi45NDksMy42OTIsNC44MjUsNi42MzcsNC44MjVjMC43MDUsMCwxLjQzNC0wLjEwNiwyLjEzOC0wLjMzNg0KCQkJYzMuNjczLTEuMTgxLDUuNjgtNS4xMTUsNC40OTQtOC43NzNjLTAuNTg4LTEuODA3LTEyLjY2MS0zOC4yNjEtMzkuOTY5LTU1LjY5N2MtMC4xMTEtOS41MjUtNy44NTItMTcuMjE3LTE3LjQwNi0xNy4yMTdoLTcuMTU5DQoJCQljLTQuNTg3LDAtOC43MzIsMS44MTEtMTEuODQzLDQuNzA5Yy0yMS40NjQtMTUuMzIyLTMxLjc5LTQ2LjE5NC0zMS45NjItNDYuNzE3Yy0xLjE5LTMuNjU0LTUuMTA4LTUuNjctOC43NzQtNC40ODUNCgkJCWMtMy42NzEsMS4xODUtNS42NzgsNS4xMTUtNC40OTIsOC43NzRjMC41ODEsMS44MDEsMTIuNTY0LDM3Ljk4LDM5LjY0Miw1NS41MDF2NTUuNzkxTDc2LjA0NSwxNjAuMTUNCgkJCWMtMS4xMDQsMS45MzctMS4yMTgsNC4yNzktMC4yOTYsNi4zMTlsMTUuNjgxLDM0Ljc1MWMwLjc5MywxLjc2LDIuMjQ1LDIuOTc4LDMuOTE4LDMuNjAzSDE0LjMzNw0KCQkJQzYuNDE5LDIwNC44MjMsMCwyMTEuMTA1LDAsMjE4Ljg0OEMwLDIyNi41OTEsNi40MTksMjMyLjg2OCwxNC4zMzcsMjMyLjg2OHogTTg5LjkxNCwxNjMuOTY4bDEzLjMwMS0yMy4zMzVoMTguNjQ3bDM3LjA0Nyw2MS4zMjUNCgkJCWMwLjg0NSwxLjM5NiwyLjExNCwyLjMzOCwzLjUyOCwyLjg3aC02Mi4xNTZjMC4xMTktMC4wNDcsMC4yNDgtMC4wNjUsMC4zNjctMC4xMTdjMy41MDctMS41ODIsNS4wNzUtNS43MTIsMy40ODktOS4yMjINCgkJCUw4OS45MTQsMTYzLjk2OHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            };

            seriesFreq.legendSettings.labelText = "Series: [bold {#667E93}] transferts frequence[/]";


            /** icones de Logs */
            let seriesLogs = this.chart.series.push(new am4plugins_timeline.CurveColumnSeries());
            seriesLogs.columns.template.height = am4core.percent(30);

            seriesLogs.dataFields.openDateX = "fromDate";
            seriesLogs.dataFields.dateX = "fromDate";
            seriesLogs.dataFields.categoryY = "typeLog";
            seriesLogs.baseAxis = categoryAxis;
            seriesLogs.columns.template.propertyFields.fill = "color"; // get color from data
            seriesLogs.columns.template.propertyFields.stroke = "color";
            seriesLogs.columns.template.strokeOpacity = 0;
            seriesLogs.columns.template.fillOpacity = 0.6;
            seriesLogs.clustered = false; //Setting to false will make columns overlap with other series.

            let imageBulletLog = seriesLogs.bullets.push(new am4plugins_bullets.PinBullet());
            imageBulletLog.background.radius = 18;
            imageBulletLog.locationX = 1;
            imageBulletLog.propertyFields.stroke = "color";
            imageBulletLog.background.propertyFields.fill = "color";
            imageBulletLog.image = new am4core.Image();
            imageBulletLog.image.propertyFields.href = "icon";
            imageBulletLog.image.scale = 0.7;
            imageBulletLog.circle.radius = am4core.percent(100);
            imageBulletLog.background.fillOpacity = 0.8;
            imageBulletLog.background.strokeOpacity = 0;
            imageBulletLog.dy = -5;
            imageBulletLog.background.pointerBaseWidth = 10;
            imageBulletLog.background.pointerLength = 10
            imageBulletLog.tooltipText = "{text}";

            seriesLogs.tooltip.pointerOrientation = "up";
            // Setting series flag url
            seriesLogs.dummyData = {
                flag: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI0OC45MTRweCIgaGVpZ2h0PSIyNDguOTE0cHgiIHZpZXdCb3g9IjAgMCAyNDguOTE0IDI0OC45MTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0OC45MTQgMjQ4LjkxNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMDEuNzExLDQ5LjU4M2MtNS40NiwwLTkuODk1LDMuNzcxLTkuODk1LDguNDE5YzAsNC42NTMsNC40MzUsOC40MTksOS44OTUsOC40MTljNS4zMTYsMCw5LjY0My0zLjU2Niw5Ljg3Ni04LjAzMg0KCQkJYzUuMTA1LTEzLjYsNC4xMDYtMjQuMDc4LDMuMDQzLTI5LjEzN2MtMC43NDctMy41MzMtNC4yLTYuMjk1LTcuODUxLTYuMjk1bC0yMy4yNy0wLjAxYy0xLjg1NywwLTMuNTk0LDAuNzI0LTQuOSwyLjAzDQoJCQljLTEuMzgyLDEuMzkxLTIuMTM4LDMuMjc2LTIuMTI5LDUuMzJjMC4wMzgsNS42OTktMS4yMjMsMTMuMzA2LTIuMzA1LDE4Ljc3NmMtMC45MDYtMC4yMzMtMS44NzctMC4zNjQtMi44ODUtMC4zNjQNCgkJCWMtNS40NjEsMC05Ljg5NSwzLjc3MS05Ljg5NSw4LjQyNGMwLDQuNjQ4LDQuNDM4LDguNDE5LDkuODk1LDguNDE5YzUuMDU1LDAsOS4yMTMtMy4yMiw5LjgxOS03LjM3OGwwLjA3NSwwLjAxOQ0KCQkJYzAuMTYzLTAuNjUzLDMuODI2LTE1LjUyMyw0LjA3OS0yNi40NTNsMjAuODk4LDAuMDA5YzAuNjY4LDMuNjE3LDEuMTExLDkuOTgzLTEuMTI0LDE4LjMyMw0KCQkJQzIwMy45ODgsNDkuNzY1LDIwMi44NzgsNDkuNTgzLDIwMS43MTEsNDkuNTgzeiIvPg0KCQk8cGF0aCBkPSJNMzUuODY0LDEzNy44MzJjMi4wMjEsNC4xOTEsNy42NDksNS42NjEsMTIuNTY4LDMuMjk1YzQuNzkzLTIuMzAxLDcuMTQxLTcuMzkzLDUuNDE0LTExLjUxOQ0KCQkJYy0xLjMtMTQuNDcyLTYuNzQ0LTIzLjQ3NS05Ljg5Ni0yNy41NzdjLTIuMjA4LTIuODUyLTYuNTE1LTMuODUxLTkuODA4LTIuMjY0bC0yMC45NjksMTAuMDg1DQoJCQljLTEuNjczLDAuODAzLTIuOTI2LDIuMjA4LTMuNTMzLDMuOTU4Yy0wLjY0NCwxLjg0OS0wLjUwMSwzLjg4MywwLjM5Miw1LjcxN2MyLjUwNCw1LjEyLDQuNjY5LDEyLjUyMiw2LjA2LDE3LjkyMQ0KCQkJYy0wLjkyMSwwLjE4My0xLjg1MSwwLjQ4NS0yLjc1MywwLjkyNWMtNC45MTcsMi4zNjYtNy4yNzMsNy42ODctNS4yNTUsMTEuODc3YzIuMDIxLDQuMTkxLDcuNjQ1LDUuNjY2LDEyLjU2OSwzLjI5NQ0KCQkJYzQuNTQ4LTIuMTg4LDYuOS02LjkwMiw1LjY0Mi0xMC45MDZsMC4wNzctMC4wMTVjLTAuMTMzLTAuNjYyLTMuMjg4LTE1LjY0NC03Ljc5OS0yNS42MDhsMTguODMtOS4wNTQNCgkJCWMyLjE3LDIuOTczLDUuMzM0LDguNTEzLDYuOTM1LDE2Ljk5OGMtMS4wNzYsMC4xNjgtMi4xNTYsMC40OS0zLjIwOCwwLjk5NEMzNi4yMDIsMTI4LjMyLDMzLjg0NiwxMzMuNjQyLDM1Ljg2NCwxMzcuODMyeiIvPg0KCQk8Y2lyY2xlIGN4PSIxMTAuNTY1IiBjeT0iMzguMTM2IiByPSIyMS4wMDQiLz4NCgkJPHBhdGggZD0iTTE0LjMzNywyMzIuODY4aDIyMC4yMzljNy45MjEsMCwxNC4zMzgtNi4yNzIsMTQuMzM4LTE0LjAyMWMwLTcuNzQ3LTYuNDE3LTE0LjAyNC0xNC4zMzgtMTQuMDI0aC02Ny4yNjINCgkJCWMwLjM5My0wLjE0NSwwLjc5NC0wLjI4LDEuMTc2LTAuNTA0YzMuMjkxLTEuOTkzLDQuMzUxLTYuMjc3LDIuMzU3LTkuNTcybC0zOS4yNzgtNjUuMDE3di0zMi4xMQ0KCQkJYzE3Ljg4LDE2LjEzOSwyNi41MjMsNDEuOTg1LDI2LjY3Nyw0Mi40NTdjMC45NTcsMi45NDksMy42OTIsNC44MjUsNi42MzcsNC44MjVjMC43MDUsMCwxLjQzNC0wLjEwNiwyLjEzOC0wLjMzNg0KCQkJYzMuNjczLTEuMTgxLDUuNjgtNS4xMTUsNC40OTQtOC43NzNjLTAuNTg4LTEuODA3LTEyLjY2MS0zOC4yNjEtMzkuOTY5LTU1LjY5N2MtMC4xMTEtOS41MjUtNy44NTItMTcuMjE3LTE3LjQwNi0xNy4yMTdoLTcuMTU5DQoJCQljLTQuNTg3LDAtOC43MzIsMS44MTEtMTEuODQzLDQuNzA5Yy0yMS40NjQtMTUuMzIyLTMxLjc5LTQ2LjE5NC0zMS45NjItNDYuNzE3Yy0xLjE5LTMuNjU0LTUuMTA4LTUuNjctOC43NzQtNC40ODUNCgkJCWMtMy42NzEsMS4xODUtNS42NzgsNS4xMTUtNC40OTIsOC43NzRjMC41ODEsMS44MDEsMTIuNTY0LDM3Ljk4LDM5LjY0Miw1NS41MDF2NTUuNzkxTDc2LjA0NSwxNjAuMTUNCgkJCWMtMS4xMDQsMS45MzctMS4yMTgsNC4yNzktMC4yOTYsNi4zMTlsMTUuNjgxLDM0Ljc1MWMwLjc5MywxLjc2LDIuMjQ1LDIuOTc4LDMuOTE4LDMuNjAzSDE0LjMzNw0KCQkJQzYuNDE5LDIwNC44MjMsMCwyMTEuMTA1LDAsMjE4Ljg0OEMwLDIyNi41OTEsNi40MTksMjMyLjg2OCwxNC4zMzcsMjMyLjg2OHogTTg5LjkxNCwxNjMuOTY4bDEzLjMwMS0yMy4zMzVoMTguNjQ3bDM3LjA0Nyw2MS4zMjUNCgkJCWMwLjg0NSwxLjM5NiwyLjExNCwyLjMzOCwzLjUyOCwyLjg3aC02Mi4xNTZjMC4xMTktMC4wNDcsMC4yNDgtMC4wNjUsMC4zNjctMC4xMTdjMy41MDctMS41ODIsNS4wNzUtNS43MTIsMy40ODktOS4yMjINCgkJCUw4OS45MTQsMTYzLjk2OHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            };

            seriesLogs.legendSettings.labelText = "Series: log [/]";


            /** Scrollbar 
            this.chart.scrollbarX = new am4core.Scrollbar();
            this.chart.scrollbarX.align = "center"
            this.chart.scrollbarX.width = am4core.percent(75);
            this.chart.scrollbarX.parent =this.chart.bottomAxesContainer;
    


            let cursor = new am4plugins_timeline.CurveCursor();
            this.chart.cursor = cursor;
            cursor.xAxis = dateAxis;
            cursor.yAxis = categoryAxis;
            cursor.lineY.disabled = true;
            cursor.lineX.disabled = true;

            
            categoryAxis.cursorTooltipEnabled = false;

            this.chart.zoomOutButton.disabled = false;
*/

            /** creation dune legende
            chart.legend = new am4charts.Legend();
            chart.legend.useDefaultMarker = true;

            // Remove square from marker template
            let marker = chart.legend.markers.template;
            marker.disposeChildren();

            // Add custom image instead
            let iconDance = marker.createChild(am4core.Image);
            iconDance.width = 40;
            iconDance.height = 40;
            iconDance.verticalCenter = "top";
            iconDance.horizontalCenter = "left";

            // We're going to use an adapter to set href
            iconDance.adapter.add("href", (href, target: any) => {
                //console.log("Monster Munch", href, target, target.dataItem.dataContext.dummyData.flag);
                if (target.dataItem && target.dataItem.dataContext && target.dataItem.dataContext.dummyData) {

                    return target.dataItem.dataContext.dummyData.flag;
                }
                else {
                    return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI0OC45MTRweCIgaGVpZ2h0PSIyNDguOTE0cHgiIHZpZXdCb3g9IjAgMCAyNDguOTE0IDI0OC45MTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0OC45MTQgMjQ4LjkxNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMDEuNzExLDQ5LjU4M2MtNS40NiwwLTkuODk1LDMuNzcxLTkuODk1LDguNDE5YzAsNC42NTMsNC40MzUsOC40MTksOS44OTUsOC40MTljNS4zMTYsMCw5LjY0My0zLjU2Niw5Ljg3Ni04LjAzMg0KCQkJYzUuMTA1LTEzLjYsNC4xMDYtMjQuMDc4LDMuMDQzLTI5LjEzN2MtMC43NDctMy41MzMtNC4yLTYuMjk1LTcuODUxLTYuMjk1bC0yMy4yNy0wLjAxYy0xLjg1NywwLTMuNTk0LDAuNzI0LTQuOSwyLjAzDQoJCQljLTEuMzgyLDEuMzkxLTIuMTM4LDMuMjc2LTIuMTI5LDUuMzJjMC4wMzgsNS42OTktMS4yMjMsMTMuMzA2LTIuMzA1LDE4Ljc3NmMtMC45MDYtMC4yMzMtMS44NzctMC4zNjQtMi44ODUtMC4zNjQNCgkJCWMtNS40NjEsMC05Ljg5NSwzLjc3MS05Ljg5NSw4LjQyNGMwLDQuNjQ4LDQuNDM4LDguNDE5LDkuODk1LDguNDE5YzUuMDU1LDAsOS4yMTMtMy4yMiw5LjgxOS03LjM3OGwwLjA3NSwwLjAxOQ0KCQkJYzAuMTYzLTAuNjUzLDMuODI2LTE1LjUyMyw0LjA3OS0yNi40NTNsMjAuODk4LDAuMDA5YzAuNjY4LDMuNjE3LDEuMTExLDkuOTgzLTEuMTI0LDE4LjMyMw0KCQkJQzIwMy45ODgsNDkuNzY1LDIwMi44NzgsNDkuNTgzLDIwMS43MTEsNDkuNTgzeiIvPg0KCQk8cGF0aCBkPSJNMzUuODY0LDEzNy44MzJjMi4wMjEsNC4xOTEsNy42NDksNS42NjEsMTIuNTY4LDMuMjk1YzQuNzkzLTIuMzAxLDcuMTQxLTcuMzkzLDUuNDE0LTExLjUxOQ0KCQkJYy0xLjMtMTQuNDcyLTYuNzQ0LTIzLjQ3NS05Ljg5Ni0yNy41NzdjLTIuMjA4LTIuODUyLTYuNTE1LTMuODUxLTkuODA4LTIuMjY0bC0yMC45NjksMTAuMDg1DQoJCQljLTEuNjczLDAuODAzLTIuOTI2LDIuMjA4LTMuNTMzLDMuOTU4Yy0wLjY0NCwxLjg0OS0wLjUwMSwzLjg4MywwLjM5Miw1LjcxN2MyLjUwNCw1LjEyLDQuNjY5LDEyLjUyMiw2LjA2LDE3LjkyMQ0KCQkJYy0wLjkyMSwwLjE4My0xLjg1MSwwLjQ4NS0yLjc1MywwLjkyNWMtNC45MTcsMi4zNjYtNy4yNzMsNy42ODctNS4yNTUsMTEuODc3YzIuMDIxLDQuMTkxLDcuNjQ1LDUuNjY2LDEyLjU2OSwzLjI5NQ0KCQkJYzQuNTQ4LTIuMTg4LDYuOS02LjkwMiw1LjY0Mi0xMC45MDZsMC4wNzctMC4wMTVjLTAuMTMzLTAuNjYyLTMuMjg4LTE1LjY0NC03Ljc5OS0yNS42MDhsMTguODMtOS4wNTQNCgkJCWMyLjE3LDIuOTczLDUuMzM0LDguNTEzLDYuOTM1LDE2Ljk5OGMtMS4wNzYsMC4xNjgtMi4xNTYsMC40OS0zLjIwOCwwLjk5NEMzNi4yMDIsMTI4LjMyLDMzLjg0NiwxMzMuNjQyLDM1Ljg2NCwxMzcuODMyeiIvPg0KCQk8Y2lyY2xlIGN4PSIxMTAuNTY1IiBjeT0iMzguMTM2IiByPSIyMS4wMDQiLz4NCgkJPHBhdGggZD0iTTE0LjMzNywyMzIuODY4aDIyMC4yMzljNy45MjEsMCwxNC4zMzgtNi4yNzIsMTQuMzM4LTE0LjAyMWMwLTcuNzQ3LTYuNDE3LTE0LjAyNC0xNC4zMzgtMTQuMDI0aC02Ny4yNjINCgkJCWMwLjM5My0wLjE0NSwwLjc5NC0wLjI4LDEuMTc2LTAuNTA0YzMuMjkxLTEuOTkzLDQuMzUxLTYuMjc3LDIuMzU3LTkuNTcybC0zOS4yNzgtNjUuMDE3di0zMi4xMQ0KCQkJYzE3Ljg4LDE2LjEzOSwyNi41MjMsNDEuOTg1LDI2LjY3Nyw0Mi40NTdjMC45NTcsMi45NDksMy42OTIsNC44MjUsNi42MzcsNC44MjVjMC43MDUsMCwxLjQzNC0wLjEwNiwyLjEzOC0wLjMzNg0KCQkJYzMuNjczLTEuMTgxLDUuNjgtNS4xMTUsNC40OTQtOC43NzNjLTAuNTg4LTEuODA3LTEyLjY2MS0zOC4yNjEtMzkuOTY5LTU1LjY5N2MtMC4xMTEtOS41MjUtNy44NTItMTcuMjE3LTE3LjQwNi0xNy4yMTdoLTcuMTU5DQoJCQljLTQuNTg3LDAtOC43MzIsMS44MTEtMTEuODQzLDQuNzA5Yy0yMS40NjQtMTUuMzIyLTMxLjc5LTQ2LjE5NC0zMS45NjItNDYuNzE3Yy0xLjE5LTMuNjU0LTUuMTA4LTUuNjctOC43NzQtNC40ODUNCgkJCWMtMy42NzEsMS4xODUtNS42NzgsNS4xMTUtNC40OTIsOC43NzRjMC41ODEsMS44MDEsMTIuNTY0LDM3Ljk4LDM5LjY0Miw1NS41MDF2NTUuNzkxTDc2LjA0NSwxNjAuMTUNCgkJCWMtMS4xMDQsMS45MzctMS4yMTgsNC4yNzktMC4yOTYsNi4zMTlsMTUuNjgxLDM0Ljc1MWMwLjc5MywxLjc2LDIuMjQ1LDIuOTc4LDMuOTE4LDMuNjAzSDE0LjMzNw0KCQkJQzYuNDE5LDIwNC44MjMsMCwyMTEuMTA1LDAsMjE4Ljg0OEMwLDIyNi41OTEsNi40MTksMjMyLjg2OCwxNC4zMzcsMjMyLjg2OHogTTg5LjkxNCwxNjMuOTY4bDEzLjMwMS0yMy4zMzVoMTguNjQ3bDM3LjA0Nyw2MS4zMjUNCgkJCWMwLjg0NSwxLjM5NiwyLjExNCwyLjMzOCwzLjUyOCwyLjg3aC02Mi4xNTZjMC4xMTktMC4wNDcsMC4yNDgtMC4wNjUsMC4zNjctMC4xMTdjMy41MDctMS41ODIsNS4wNzUtNS43MTIsMy40ODktOS4yMjINCgkJCUw4OS45MTQsMTYzLjk2OHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==";
                }
            });
 */

        });
    }

    private majListeEtatLogonConnexion(): etatLogonConnexionSimplifiee[] {
  
        let book = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI5Ni45OTkgMjk2Ljk5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjk2Ljk5OSAyOTYuOTk5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDUuNDMyLDM1LjA0OWMtMC4wMDgsMC0wLjAxNywwLTAuMDI1LDBjLTIuODA5LDAtNS40NTEsMS4wOTUtNy40NDYsMy4wODVjLTIuMDE3LDIuMDEyLTMuMTI4LDQuNjkxLTMuMTI4LDcuNTQzDQoJCQkJdjE1OS4zNjVjMCw1Ljg0NCw0Ljc3MywxMC42MSwxMC42NDEsMTAuNjI1YzI0LjczOCwwLjA1OSw2Ni4xODQsNS4yMTUsOTQuNzc2LDM1LjEzNlY4NC4wMjNjMC0xLjk4MS0wLjUwNi0zLjg0Mi0xLjQ2MS01LjM4Mg0KCQkJCUMxMTUuMzIyLDQwLjg0OSw3MC4yMjYsMzUuMTA3LDQ1LjQzMiwzNS4wNDl6Ii8+DQoJCQk8cGF0aCBkPSJNMjYyLjE2NywyMDUuMDQyVjQ1LjY3NmMwLTIuODUyLTEuMTExLTUuNTMxLTMuMTI4LTcuNTQzYy0xLjk5NS0xLjk5LTQuNjM5LTMuMDg1LTcuNDQ1LTMuMDg1Yy0wLjAwOSwwLTAuMDE4LDAtMC4wMjYsMA0KCQkJCWMtMjQuNzkzLDAuMDU5LTY5Ljg4OSw1LjgwMS05My4zNTcsNDMuNTkzYy0wLjk1NSwxLjU0LTEuNDYsMy40MDEtMS40Niw1LjM4MnYxNjYuNzc5DQoJCQkJYzI4LjU5Mi0yOS45MjEsNzAuMDM4LTM1LjA3Nyw5NC43NzYtMzUuMTM2QzI1Ny4zOTQsMjE1LjY1MSwyNjIuMTY3LDIxMC44ODUsMjYyLjE2NywyMDUuMDQyeiIvPg0KCQkJPHBhdGggZD0iTTI4Ni4zNzMsNzEuODAxaC03LjcwNnYxMzMuMjQxYzAsMTQuOTIxLTEyLjE1NywyNy4wODgtMjcuMTAxLDI3LjEyNWMtMjAuOTgzLDAuMDUtNTUuNTgxLDQuMTUzLTgwLjA4NCwyNy4zNDQNCgkJCQljNDIuMzc4LTEwLjM3Niw4Ny4wNTItMy42MzEsMTEyLjUxMiwyLjE3MWMzLjE3OSwwLjcyNCw2LjQ2NC0wLjAyNCw5LjAxMS0yLjA1NGMyLjUzOC0yLjAyNSwzLjk5NC01LjA1MiwzLjk5NC04LjMwMVY4Mi40MjcNCgkJCQlDMjk3LDc2LjU2OCwyOTIuMjMyLDcxLjgwMSwyODYuMzczLDcxLjgwMXoiLz4NCgkJCTxwYXRoIGQ9Ik0xOC4zMzIsMjA1LjA0MlY3MS44MDFoLTcuNzA2QzQuNzY4LDcxLjgwMSwwLDc2LjU2OCwwLDgyLjQyN3YxNjguODk3YzAsMy4yNSwxLjQ1Niw2LjI3NiwzLjk5NCw4LjMwMQ0KCQkJCWMyLjU0NSwyLjAyOSw1LjgyNywyLjc4LDkuMDExLDIuMDU0YzI1LjQ2LTUuODAzLDcwLjEzNS0xMi41NDcsMTEyLjUxMS0yLjE3MWMtMjQuNTAyLTIzLjE5LTU5LjEtMjcuMjkyLTgwLjA4My0yNy4zNDINCgkJCQlDMzAuNDksMjMyLjEzLDE4LjMzMiwyMTkuOTYzLDE4LjMzMiwyMDUuMDQyeiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=";
        let eclair = "assets/images/eclair.png";


        let colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.4;
        let listeFinale: etatLogonConnexionSimplifiee[] = [...<any>this.listeEtatTransfertFrequence];
        let listeEtats: etatLogonConnexionSimplifiee[] = [...<any>this.listeEtatLogonConnexion];

        listeFinale.forEach((element) => {
            element.fromDate = element.dateTransfert;
            element.name = "frequence";
            element.typeFreq = element.name
            element.icon = eclair;

            if (element.frequence !== undefined) {
                element.text = element.frequence;
            }
            else {
                element.text = "fréquence non loggée";
            }
            if (element.isTransfertAcq) {
                element.color = am4core.color("#31AF40").lighten(0);
            }
            else if (element.isTRARTV || element.isFinTRFDL) {
                element.color = am4core.color("#E94343").lighten(0);
            }
            else {
                element.color = am4core.color("#F67B08").lighten(0);
            }

        });

        listeEtats.forEach((element) => {

            if (element.name == "logs") {
                // element.typeLog = element.name ;
                element.icon = book;
                for (let index = 0; index < element.logs.length; index++) {
                    const el = element.logs[index];
                    if (index == 0) {
                        element.text = el;
                    }
                    else {
                        element.text += "\n" + el;
                    }
                }
                element.color = colorSet.getIndex(8).brighten(0);
                element.toDate = element.fromDate;
                element.typeLog = "logs"
                listeFinale.push(element);
            }
        });

        listeEtats.forEach((element) => {
            if (element.name == "logon") {
                if (element.infoEtat == Etat.Logue) {
                    element.color = colorSet.getIndex(0).brighten(0.4);
                }
                else if (element.infoEtat == Etat.NonLogue) {
                    element.color = colorSet.getIndex(6).brighten(0);
                }
                element.typeEtat = "logon";
                element.typeLogon = element.name;
                listeFinale.push(element);
            }

        });

        listeEtats.forEach((element) => {
            if (element.name == "connexion") {
                element.color = colorSet.getIndex(2).brighten(0);
                element.typeEtat = "connexion";
                element.typeConnexion = element.name;
                listeFinale.push(element);
            }
        });


        // console.log("attention la liste finale: ", listeFinale);

        return listeFinale;
        // return this.listeEtatLogonConnexion;
    }

}
