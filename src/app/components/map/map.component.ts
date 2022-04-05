import { Component, ElementRef, OnInit , QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapService } from './map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined
  @ViewChild('mapSearchField') searchField: ElementRef | undefined
  title = 'Front';
 
  mapOptions: google.maps.MapOptions = {
    zoom: 14,
    mapTypeControl: false, 
    streetViewControl: false,
    fullscreenControl: false
  }

  @ViewChildren(MapInfoWindow)
  infoWindowsView!: QueryList<MapInfoWindow>;

  userList: any[] = [];
  error: string = "";
  markers = this.userList;
  center!: google.maps.LatLngLiteral; 
  USER_KEY = 'tchat-user';
  userMessages: any[] = [];
  User: any = null;

  constructor( private _mapService: MapService) { }

  ngOnInit(): void {
    this._mapService.getUsers()
    .subscribe(
          data => {
              this.userList = data;
              console.log(this.userList)
           

          },
          error => {
              this.error = error.error;
          },
      );

      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
  }

        

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
const searchBox = new google.maps.places.SearchBox(
  this.searchField?.nativeElement);
  this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
    this.searchField?.nativeElement);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if(places?.length === 0){
          return;
        }

        const bounds = new google.maps.LatLngBounds();

        places?.forEach(place => {
          if(!place.geometry || !place.geometry.location){
            return;
          }
          if(place.geometry.viewport){
            bounds.union(place.geometry.viewport);
          }else{
            bounds.extend(place.geometry.location);
          }
        });

        this.map?.fitBounds(bounds);
      })


}


getBounds(markers: any){
  let north;
  let south;
  let east;
  let west;


  for (let marker of markers){
    
    north = north !== undefined ? Math.max(north, marker.Latitude) : marker.Latitude;
    south = south !== undefined ? Math.min(south, marker.Latitude) : marker.Latitude;
    east = east !== undefined ? Math.max(east, marker.Longitude) : marker.Longitude;
    west = west !== undefined ? Math.min(west, marker.Longitude) : marker.Longitude
  };

  const bounds = { north, south, east, west };

  return bounds;
}


selectUser(user: any) {
  this.User = user;
  console.log(this.User)
  window.sessionStorage.removeItem(this.USER_KEY);
  window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  this._mapService.getMessages(user)
  .subscribe(
        data => {
            this.userMessages = data;
            this._mapService.messageOfUser.next(this.userMessages);
           
        },
        error => {
            this.error = error.error;
        },
    );

  

    this._mapService.onListUsersUpdated.next(user);
   
}

}
