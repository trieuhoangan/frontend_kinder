import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http:HttpClient) { }
  public uploadImage(image: File): Observable<Object> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/api/v1/image-upload', formData);
  }
}
