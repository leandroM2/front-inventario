export class KardexModel {
    id: string = '';
    fecha: Date = new Date();
    tipoPago: string='';
    factura: string='';
    estado: boolean = false;
    tipoMov: string = '';
    persona: string = '';
    archivesId: string = '';
    detalles: {
      id: number;
      producto: string;
      productId: number;
      cantidad: number;
      precioVenta: number;
      saldo: number;
      total: number;
    }[] = [
      {
        id: 0,
        productId: 0,
        producto: '',
        cantidad: 0,
        precioVenta: 0.0,
        saldo:0,
        total: 0.0
      }
    ];
  }
  