import { Component, Inject, OnInit } from '@angular/core';
import { ImageServiceService } from './image-service.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor( @Inject(String) public src: string, @Inject(File) public file: File) {}
}

@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})
export class InputPageComponent implements OnInit {
  selectedFile!: ImageSnippet;
  constructor(private imageService: ImageServiceService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  public processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

}
