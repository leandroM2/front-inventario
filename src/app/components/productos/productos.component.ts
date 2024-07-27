import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../model/productos_model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CategoryModel } from 'src/app/model/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { SupplierModel } from 'src/app/model/proveedores_model';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {
   //instanciamos el modelo
   listproducts: ProductModel [] = [];
   //declarmos otra lista para filtrar
   filteredCategories: any[] = [];
   filterTerm: string = '';
   listcategorias: CategoryModel[] = [];
   listProveedores: SupplierModel[] = [];
   responseMessage: any;
   //creamos un formGroup
   formProduct: FormGroup = new FormGroup({});
   //instanciamos el servicio
   constructor(private productService: ProductosService,
    private categoriasService: CategoryService,
    private proveedoresService: ProveedoresService,
    private mensajesService: MensajesService,
    ) {
   }
   
 
   isUpdate: boolean = false;
 
   ngOnInit(): void {
     this.list(); 
     this.listacategorias();
     this.listaproveedores();
     //definir las propiedades del formgroup
     this.formProduct = new FormGroup({
       id: new FormControl(''),
       nombre: new FormControl(''),
       color: new FormControl(''),
       precio: new FormControl(''),
       stock: new FormControl(''),
       estado: new FormControl(''),
       categoryId: new FormControl(''),
       categoryNombre: new FormControl(''),
       supplierId: new FormControl(''),
       supplierRazonSocial: new FormControl(''),
       supplierRuc: new FormControl(''),
       supplierContacto: new FormControl(''),
     })
   }
 
   //funcion para listar
   list(){
     this.productService.getProducts().subscribe(resp=>{
       if(resp){
         this.listproducts = resp;
       }
     });
     const filterInput = document.getElementById('filter') as HTMLInputElement;
       if (filterInput) {
      filterInput.value = '';
    }
   }

   filterCategories(): void {
    const term = this.filterTerm.toLowerCase();
    this.listproducts = this.listproducts.filter(product => 
      product.nombre.toLowerCase().includes(term)
    );
  }

   save(){
     this.productService.saveProduct(this.formProduct.value).subscribe((resp:any)=>{
       if(resp){
         this.responseMessage = resp.mensaje;
         this.mensajesService.AbrirMensaje(this.responseMessage,"check");
         this.list();
         this.formProduct.reset();
         this.stockcero();
       }
      },
      (error:any) => {
        this.responseMessage = error.error.mensaje;
        this.mensajesService.AbrirMensaje(this.responseMessage, "error");
     });
   }
 
   update(){
     this.productService.updateProduct(this.formProduct.value).subscribe((resp:any)=>{
       if(resp){
        this.responseMessage = resp.mensaje;
        this.mensajesService.AbrirMensaje(this.responseMessage,"check"); 
         this.list();
         this.newProduct();
       }
     },
     (error:any) => {
      this.responseMessage = error.error.mensaje;
      this.mensajesService.AbrirMensaje(this.responseMessage, "error");
    });
  }
 
   delete(id: any){
    const eliminar = confirm("¿Estas seguro de eliminar este producto?");
    if (eliminar){
     this.productService.deleteProduct(id).subscribe((resp:any)=>{
       if(resp){
        this.responseMessage = resp.mensaje;
        this.mensajesService.AbrirMensaje(this.responseMessage,"check");
        this.list();
       }
     },
     (error:any) => {
      this.responseMessage = error.error.mensaje;
      this.mensajesService.AbrirMensaje(this.responseMessage, "error");
    });
  }
  }
 
 
   newProduct(){
     this.isUpdate = false;
     this.formProduct.reset();
     const cat = document.getElementById("cat") as HTMLSelectElement
     const prov = document.getElementById("prov") as HTMLSelectElement
     cat.selectedIndex = 0;
     prov.selectedIndex = 0;

   }
   
   selectItem(item: any) {
     this.isUpdate = true;
     this.formProduct.controls['id'].setValue(item.id);
     this.formProduct.controls['nombre'].setValue(item.nombre);
     this.formProduct.controls['color'].setValue(item.color);
     this.formProduct.controls['precio'].setValue(item.precio);
     this.formProduct.controls['stock'].setValue(item.stock);
     this.formProduct.controls['estado'].setValue(item.estado);
     this.formProduct.controls['categoryId'].setValue(item.categoryId);
     this.formProduct.controls['categoryNombre'].setValue(item.categoryNombre);
     this.formProduct.controls['supplierId'].setValue(item.supplierId);
     this.formProduct.controls['supplierRazonSocial'].setValue(item.supplierRazonSocial);
     this.formProduct.controls['supplierRuc'].setValue(item.supplierRuc);
     this.formProduct.controls['supplierContacto'].setValue(item.supplierContacto);

     var final = document.getElementById('final') as HTMLInputElement;
     //var mas = document.getElementById('mas') as HTMLInputElement;

     final.value = item.stock;
     //mas.focus;
   }

   stockcero(){
    this.formProduct.controls['stock'].setValue(0);
   }

   suma(){

    
    var mas = document.getElementById('mas') as HTMLInputElement;

    var final = document.getElementById('final') as HTMLInputElement;

    //var stockfinal = document.getElementById('stockfinal') as HTMLInputElement;
    
    var masValue: number = parseInt(mas.value);

    var finalValue: number = parseInt(final.value);

    var stockfinal = finalValue+masValue;

    this.formProduct.controls['stock'].setValue(stockfinal);

   }

   generatePDF() {
    const DATA = document.getElementById('tableToPDF') as HTMLDivElement;
    const doc = new jsPDF('landscape', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    const filtro1 = document.getElementById('start') as HTMLInputElement;
    const filtro2 = document.getElementById('end') as HTMLInputElement;
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 50;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      doc.setFontSize(16);
      doc.text('Productos de Grupo DNX', 20, 30);
      return doc;

    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_DetallesSalida.pdf`);
    });
  }

  listacategorias(){
    this.categoriasService.getCategory().subscribe(resp=>{
      if(resp){
        this.listcategorias = resp;
      }
    });
  }

  listaproveedores(){
    this.proveedoresService.getSuppliers().subscribe(resp=>{
      if(resp){
        this.listProveedores = resp;
      }
    });
  } 
  
 }
