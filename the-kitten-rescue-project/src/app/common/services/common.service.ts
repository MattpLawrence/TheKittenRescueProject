import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BreakPointsEnum } from "../models/common.enum";

@Injectable({
  providedIn: 'root',
})

export class CommonService{

  constructor() { }

  //subjects
  private breakpointSubject = new BehaviorSubject<BreakPointsEnum>(0)


  //getters and setters
  getBreakpointSubject = () => {
    return this.breakpointSubject.asObservable();
  }

  setBreakpointSubject = (breakPoint: BreakPointsEnum) => {
    this.breakpointSubject.next(breakPoint)
  }


}
