import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  /* -- Component I/O -- */
  /**
   * Title of the input
   */
  @Input()
  public placeholder : string = '';

  /**
   * True if the input can select several files, false overwise
   */
  @Input()
  public multiple : boolean = false;

  /**
   * Raise an event when the user has just selected files
   */
  @Output()
  public onChange = new EventEmitter<[File]> ();
  /* -- -- */

  constructor() { }

  ngOnInit() {
  }

  public raiseOnChangeEvent (inputFiles : [File]) : void {
    this.onChange.emit(inputFiles);
  }

  public filterPath (path : string) : string {
    return path.replace(/.*[\/\\]/, '');
  }

  public clearInput () : void {
    // TODO
  }

}
