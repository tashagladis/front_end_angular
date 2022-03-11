import { Component, OnInit , QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined
  
  title = 'Front';
  center= { lat: 38.9987208, lng: -77.2538699 }

  mapOptions: google.maps.MapOptions = {
    zoom: 14,
    mapTypeControl: false, 
    streetViewControl: false,
    fullscreenControl: false
  }
marker1 = { position: { lat: 48.9474367, lng: 2.2324249 }, info: "6 Pl. François Rabelais 95100 Argenteuil, France" };
marker2 = { position: { lat: 48.9501279, lng: 2.2226746 }, info: "Rue Guy Môquet 95100 Argenteuil, France"};
marker3 = { position: { lat: 48.9502528, lng: 2.2330048}, info: "Rue Louis Lherault 95100 Argenteuil, France" };

markers = [this.marker1, this.marker2, this.marker3];


  @ViewChildren(MapInfoWindow)
  infoWindowsView!: QueryList<MapInfoWindow>;

openInfoWindow(marker: MapMarker, windowIndex: number) {
  /// stores the current index in forEach
  let curIdx = 0;
  this.infoWindowsView.forEach((window: MapInfoWindow) => {
    if (windowIndex === curIdx) {
      window.open(marker);
      curIdx++;
    } else {
      curIdx++;
    }
  });
}


ngAfterViewInit(){
  const bounds = this.getBounds(this.markers);
  this.map?.googleMap?.fitBounds(bounds);
}


getBounds(markers: any){
  let north;
  let south;
  let east;
  let west;

  for (const marker of markers){
    north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
    south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
    east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
    west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
  };

  const bounds = { north, south, east, west };

  return bounds;
}

}
