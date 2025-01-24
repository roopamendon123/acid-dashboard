import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SubSink } from 'subsink';

import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType
} from 'angular-gridster2';
import {GridsterComponent, GridsterItemComponent} from 'angular-gridster2';
import { DashboardService } from '../dashboard.service';
import { PlotlyService } from '../plotly.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, GridsterComponent, GridsterItemComponent, MatGridListModule, MatSidenavModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatCheckboxModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

//dashboardService = inject(DashboardService);
options: GridsterConfig;
dashboard: Array<GridsterItem>;
private subs = new SubSink();

constructor(private dashboardService: DashboardService, private plotService: PlotlyService){
this.options = {};
this.dashboard = [    { cols: 2, rows: 1, y: 0, x: 0 }];
}

ngOnInit(): void {

  this.options = {
    gridType: GridType.Fit,
    compactType: CompactType.None,
    margin: 10,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 200,
    minCols: 1,
    maxCols: 100,
    minRows: 1,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: false,
    displayGrid: DisplayGrid.Always,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  this.dashboard = [
    { cols: 2, rows: 1, y: 0, x: 0
    },
    { cols: 2, rows: 2, y: 0, x: 0 },
    { cols: 2, rows: 1, y: 0, x: 2 },
  ];

  this.dashboardService.getAllPlots().subscribe((entry) => {
    console.log('data', entry);
  });

  // testing mock start..

  let x:number[] = [1,2,3,4,5];
  let y:number[] = [1,2,3,4,5];
  this.plotService.plotLine("","plot",x,y);
  this.plotService.plotBox("boxplot");
  this.plotService.plotHeatMap("heatmap");

  // testing mock data
}

changedOptions(): void {
  if (this.options.api && this.options.api.optionsChanged) {
    this.options.api.optionsChanged();
  }
}

removeItem($event: MouseEvent | TouchEvent, item: GridsterItem): void {
  $event.preventDefault();
  $event.stopPropagation();
  this.dashboard.splice(this.dashboard.indexOf(item), 1);
}

addItem(): void {
  this.dashboard.push({ x: 0, y: 0, cols: 2, rows: 1 });
}

editPlot(): void {

const mockdata = {
    "display_layout":{
        "x":10,
        "y":10
    }
}; //testing mock

this.subs.add(
  this.dashboardService.updatePlot(mockdata).subscribe((entry) =>{
  if(entry){
    console.log('Update sucessful');
  } else {
    console.log('Error');
  }
}));
}

deletePlot(): void{
  let id = '1234'; //testing mock
  this.subs.add(
    this.dashboardService.deletePlot(id).subscribe((entry) =>{
    if(entry){
      console.log('Delete sucessful');
    } else {
      console.log('Error');
    }
  }));
}

ngOnDestroy(){
  if (this.subs) {
    this.subs.unsubscribe();
  }
}

}
