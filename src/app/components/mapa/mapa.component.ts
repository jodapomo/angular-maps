import { Component, OnInit } from '@angular/core';
import { Marker } from '../../classes/marker.class';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  markers: Marker[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(  private snackBar: MatSnackBar,
                public dialog: MatDialog ) {

    if ( localStorage.getItem('markers') ) {
      this.markers = JSON.parse( localStorage.getItem('markers'));
    }

  }

  ngOnInit() {
  }

  addMarker( event ) {

    const coords: { lat: number, lng: number } = event.coords;

    const newMarker = new Marker( coords.lat, coords.lng );

    this.markers.push( newMarker );

    this.saveStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000});

  }

  deleteMarker( i: number ) {

    this.markers.splice( i, 1);

    this.saveStorage();

    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000});

  }

  editMarker( marker: Marker ) {

    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {title: marker.title, desc: marker.desc}
    });

    dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
        return;
      }

      marker.title = result.title;
      marker.desc = result.desc;

      this.saveStorage();

      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000});

    });

  }

  saveStorage() {

    localStorage.setItem('markers', JSON.stringify(this.markers));

  }

}
