import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
/**
 * Component which encapsulate an 'input type file tag' in order to change the look of this component.
 * Remember that is not possible to directly change style on a 'input' tag.
 */
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

  /* -- Attributs -- */
  /**
   * Select the real file input in the component template
   */
  @ViewChild('hiddenInput')
  private hiddenInput : any; 
  /* -- -- */

  constructor() {}

  ngOnInit() {}

  /* -- Public methods -- */
  public clearInputContent () : void {
    if (this.hiddenInput !== undefined) {
      this.hiddenInput.nativeElement.value = '';
    }
  }
  /* -- -- */

  /* -- Private methods -- */
  private raiseOnChangeEvent (inputFiles : [File]) : void {
    this.onChange.emit(inputFiles);
  }

  private filterPath (path : string) : string {
    return path.replace(/.*[\/\\]/, '');
  }
  /* -- -- */
}
