export class Cupon{
    constructor(
      public cupon: string,
      public precio: number,
      public limite_asignaciones: number,
      public asignaciones: number,
      public fecha_vencimiento: any
    ){}
  }