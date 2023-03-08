import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { BreakPointsEnum } from "../models/common.enum";

@Injectable({
  providedIn: 'root',
})

export class CommonService{

  constructor() { }

  //subjects
  private breakpointSubject = new ReplaySubject<BreakPointsEnum>(1)


  //getters and setters
  getBreakpointSubject = () => {
    return this.breakpointSubject.asObservable();
  }

  setBreakpointSubject = (breakPoint: BreakPointsEnum) => {
    this.breakpointSubject.next(breakPoint)
  }


}
