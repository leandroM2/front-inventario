import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	ngAfterViewInit() { }

	constructor(private router:Router,
		private authService: AuthService
	) {
	}

	accionUser(){
		this.router.navigate(['dashboard/usuarios']);
	}
	

	accionCategory(){
		this.router.navigate(['dashboard/categorias']);
	}
	
	accionProducts(){
		this.router.navigate(['dashboard/productos']);
	}

	accionProveedores(){
		this.router.navigate(['dashboard/proveedores']);
	}

	accionClientes(){
		this.router.navigate(['dashboard/clientes']);
	}

	accionentradas(){
		this.router.navigate(['dashboard/entradas']);
	}

	accionsalidas(){
		this.router.navigate(['dashboard/salidas']);
	}

	accionsalidasDetalle(){
		this.router.navigate(['dashboard/salidasDetalle']);
	}

	accionEntradasDetalle(){
		this.router.navigate(['dashboard/entradasDetalle']);
	}

	accionGraficos(){
		this.router.navigate(['dashboard/Graficos']);
	}

	accionKardex(){
		this.router.navigate(['dashboard/kardex']);
	}

	accionServicioTecnico(){
		this.router.navigate(['dashboard/servicio']);
	}

	cerrarSesion(): void {
		this.authService.clearToken();
	}


}
