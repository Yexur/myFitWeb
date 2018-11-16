import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LocationData, LocationModel } from "../models/export.models";
import { LOCATIONS } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private locationCollection: AngularFirestoreCollection<LocationData>;
    private locations: Observable<LocationModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getLocations(): Observable<LocationModel[]> {
        this.locationCollection =
            this.database.collection(LOCATIONS, ref => ref.orderBy('locationName'));
        this.locations = this.locationCollection.snapshotChanges().pipe(map(locs => {
            return locs.map(loc => {
                const data = loc.payload.doc.data() as LocationData;
                const id = loc.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.locations;
    }

    //TODO log the errors instead of passing to the console
    updateLocation(location: LocationModel) {
        let docData: LocationData = {
            locationName: location.locationName
        };

        let docPath = LOCATIONS + '/' + location.id;
        let docRef = this.database.doc<LocationModel>(docPath).ref;
        docRef.get().then( doc => {
            doc.exists ? docRef.update(docData) : this.database.collection(LOCATIONS).add(docData);
        }).catch(err => {
            console.log(err);
        });
    }
}
