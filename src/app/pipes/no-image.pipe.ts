import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(images: string): string {
    const pathNoImage = 'assets/img/noimage.png';
    if (!images){
      return pathNoImage;
    }

    if (images.length > 0){
      return images;
    }else{
      return pathNoImage;
    }
  }

}
