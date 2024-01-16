import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  trigger_alert: number | undefined,
  upper_bound: number,
  lower_bound: number,
  timestamp: Date
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row{
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) /2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) /2;
    const ratio = priceABC/priceDEF;
    const upperBound = 1 + 0.5;
    const lowerBound = 1 - 0.5;
    return serverResponds.map((el: any) => {
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio: ratio,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio | undefined,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp | serverRespond[1].timestamp
      };
    })
  }
}
