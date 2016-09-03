// import {logger} from 'app';

/**
 * Utility class with frequently used functions
 */
export class Util {

  /**
   * Bind properties from one object to another
   */
  static bind(from:any, to:any, props:Array<string>):void {
    for (let prop of props) {
      if (from[prop]) {
        to[prop] = from[prop].bind(from);
      }else {
        console.warn(`unable to bind method ${prop} on '${from.displayName}'`);
      }
    }
  }

}
