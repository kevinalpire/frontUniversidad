// npm install pdfmake xlsx file-saver

import { Component, ElementRef, Input, OnInit, inject, input, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { MateriaGestionComponent } from '../materia-gestion/materia-gestion.component';
import { Asistencia } from '../../Models/asistencia';
import { MateriaGestionService } from '../../Services/materiaGestion/MateriaGestionService';



@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})


export class DashBoardComponent{

  @Input() id!: number;
  fileName= 'excel.xlsx';
  private materiaGestionServicio = inject(MateriaGestionService);
  public datos : Asistencia[] = [];
  public displayedColumns : string[] = ['fecha','hora', 'docente','materia','carrera'];


  constructor(private router: Router, private elRef: ElementRef){
    this.obtener();
   
  }

  obtener(){

    this.materiaGestionServicio.listarAsistencia().subscribe({
      
      next: (data) => {
        if (data.length > 0) {
          this.datos = data;
        }
      },
      error:(e)=>{
        console.log("error---"+ e.message);
        this.router.navigate(['/login']);
      }
    })
  }
  
  exportexcel() {
    const exportData = this.datos.map(item => ({
      fecha: item.fecha,
      hora: item.hora,
      docente: item.materia_gestion?.docente?.nombre ?? '',
      materia: item.materia_gestion?.materia?.nombre ?? '',
      carrera: item.materia_gestion?.materia?.carrera?.nombre ?? ''
    }));

    const libroExcel = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Datos');
    XLSX.writeFile(libroExcel, this.fileName);
  }

  @ViewChild('impresion', { static: false }) impresion!: ElementRef;

  exportExcelPdf() {
    window.print();
  }
}
